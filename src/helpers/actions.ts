import { getPreferenceValues, launchCommand, LaunchType, showToast, Toast } from "@raycast/api";
import { MutatePromise } from "@raycast/utils";
import { differenceInCalendarDays } from "date-fns";
import { TodoFormData, updateTodo } from "../api/todo-source";
import { CacheableTimeEntry, TimeEntry, TodoSourceId } from "../types";
import { cachePausedTimer, cacheRunningTimer, getCachedRunningTimer, updateRunningTimerTitle } from "./cache";
import { TodoItem } from "./todoList";

const { isSyncingProjects, isSyncingTags } = getPreferenceValues<{
  isSyncingProjects: boolean;
  isSyncingTags: boolean;
}>();

export async function callFunctionShowingToasts<T>({
  fn,
  initTitle,
  successTitle,
  successMessage,
  successPrimaryAction,
  successSecondaryAction,
  failureTitle,
}: {
  fn: () => Promise<T>;
  initTitle: string;
  successTitle: string;
  successMessage?: string | ((result: T) => string | undefined);
  successPrimaryAction?: Toast.ActionOptions | ((result: T) => Toast.ActionOptions);
  successSecondaryAction?: Toast.ActionOptions | ((result: T) => Toast.ActionOptions);
  failureTitle: string;
  withPop?: boolean;
}): Promise<T> {
  const toast = await showToast({ title: initTitle, style: Toast.Style.Animated });
  try {
    const result = await fn();

    toast.title = successTitle;
    toast.message = typeof successMessage === "function" ? successMessage(result) : successMessage;
    toast.style = Toast.Style.Success;
    toast.primaryAction =
      typeof successPrimaryAction === "function" ? successPrimaryAction(result) : successPrimaryAction;
    toast.secondaryAction =
      typeof successSecondaryAction === "function" ? successSecondaryAction(result) : successSecondaryAction;

    return result;
  } catch (error) {
    toast.title = failureTitle;
    toast.message = error instanceof Error ? error.message : String(error);
    toast.style = Toast.Style.Failure;
    throw error;
  }
}

export function findRunningTimeEntry(timeEntries: TimeEntry[] | null | undefined): TimeEntry | undefined {
  return timeEntries?.find(({ end }) => !end);
}

// Update todo's `startDate` if it's missing or later than `refDate` so the to-do shows up on the right list.
// If `startDate` is not supported (Todoist), `dueDate` is adjusted. Preference values (`isReschedulingOnTimeblocking`,
// `isReschedulingOnTimeTracking`) should be checked before calling this function.
export async function updateStartDateIfLaterThan(
  { sourceId, todoId, startDate }: TodoItem,
  refDate: Date | number,
  revalidateTodos: (sourceId?: TodoSourceId) => Promise<void>
) {
  if (!startDate || differenceInCalendarDays(startDate, refDate) > 0) {
    const newStartDate = typeof refDate === "object" ? refDate : new Date(refDate);
    await updateTodo[sourceId](todoId, { startDate: newStartDate });
    await revalidateTodos(sourceId);
  }
}

// Converts the given form data into a `timeTracker.startTimer()` and `timeTracker.updateTodoTimeEntries()` parameter.
export function toTimeEntryValues({ title, group, tags }: TodoFormData | Partial<TodoFormData>) {
  return {
    description: title,
    projectName: isSyncingProjects && group?.type === "project" ? group.title : undefined,
    tagNames: isSyncingTags ? tags?.map(({ name }) => name) : undefined,
  };
}

// A vehicle for conditional mutation/revalidation.
// Either mutateTimeEntries (for Toggl & Clockify) or revalidateTimeEntries (all 3) should be called,
// and at least one of these should be available.
export async function updateTimeEntry<T extends TimeEntry | undefined>(
  update: Promise<T>,
  {
    optimisticUpdate,
    mutateTimeEntries,
    mutateDetailTimeEntries,
    revalidateTimeEntries,
    url,
  }: {
    optimisticUpdate?: (data: TimeEntry[] | undefined) => TimeEntry[] | undefined;
    mutateTimeEntries?: MutatePromise<TimeEntry[] | undefined, TimeEntry[] | undefined, T>;
    mutateDetailTimeEntries?: MutatePromise<TimeEntry[] | undefined, TimeEntry[] | undefined, T>;
    revalidateTimeEntries: (() => Promise<TimeEntry[]>) | (() => void) | undefined;
    url?: string;
  }
): Promise<T> {
  let result: T;
  let runningTimeEntry: TimeEntry | undefined = undefined;

  if (mutateTimeEntries) {
    [result] = await Promise.all([
      mutateTimeEntries(update, { optimisticUpdate }),
      mutateDetailTimeEntries ? mutateDetailTimeEntries(update, { optimisticUpdate }) : Promise.resolve(),
    ]);
  } else {
    result = await update;
    if (revalidateTimeEntries) {
      const timeEntries = await revalidateTimeEntries();
      // Update running timer title only if 1) `result` isn't a new time entry, and 2) running time entry exists.
      // `revalidateTimeEntries()` is of type `() => void` for Toggl & Clockify, but returns an array of time entries.
      runningTimeEntry = timeEntries?.find(({ end }) => !end);
      if (!(typeof result === "object" && !Array.isArray(result)) && runningTimeEntry) {
        updateRunningTimerTitle(runningTimeEntry.title);
      }
    }
  }

  // Update the cached running time entry, which is currently used solely by the menu bar command.
  // - When a new timer is started, `TimeTracker.startTimer()` returns a `TimeEntry`. Combine it with `url` to create a
  //   `CacheableTimeEntry` and cache it.
  // - When a running timer is updated or deleted, `TimeTracker` methods don't return anything useful mainly due to API
  //   limitations, e.g., Toggl bulk edit API returns time entry ids only.
  //   - If `calendarTimeTracker` is in use, any cached running timer title will be updated based on the returned data
  //     from `revalidateTimeEntries()`. Beware, raw, revalidated `TimeEntry`s should not be cached because their `start`
  //     and `end` values are `timeIntervalSinceReferenceDate` values, not JavaScript epoch-based time values.
  //   - If Toggl or Clockify is in use, the menu bar running timer can't be updated here because `mutateTimeEntries()`,
  //     unlike `revalidateTimeEntries()`, doesn't return an updated set of data.
  //
  // TODO: Make this less janky.
  if (typeof result === "object") {
    if (!Array.isArray(result)) {
      if (url) {
        // `TimeTracker.startTimer()`
        const cacheableTimeEntry: CacheableTimeEntry = { ...result, url };
        cacheRunningTimer(cacheableTimeEntry);
      }
    } else {
      if (!runningTimeEntry) {
        // `TimeTracker.deleteTimeEntries()`
        const cached = getCachedRunningTimer();
        if (cached && result.includes(cached.id)) {
          cacheRunningTimer(null);
        }
      }
    }
  } else if (result === undefined) {
    // `TimeTracker.stopTimer()`
    cacheRunningTimer(null);
  }

  cachePausedTimer(null);

  await launchCommand({ name: "show-menu-bar-timer", type: LaunchType.Background });

  return result;
}
