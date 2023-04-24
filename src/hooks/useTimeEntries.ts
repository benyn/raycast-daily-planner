import { open, Toast } from "@raycast/api";
import { MutatePromise, useCachedPromise, useSQL } from "@raycast/utils";
import { useMemo } from "react";
import { CALENDAR_DB, getCalItemQuery, toEpochBasedDates } from "../api/calendar-sql";
import { timeTracker } from "../api/time-tracker";
import { AUTHORIZATION_ERROR } from "../api/time-tracker/common";
import { now } from "../helpers/datetime";
import { showInvalidExtensionPreferencesToast } from "../helpers/errors";
import { TimeEntry } from "../types";

interface UseTimeEntryOption {
  from?: Date;
  to?: Date;
  calendarName?: string;
  url?: string;
  description?: string;
  runningTimerOnly?: boolean;
  execute?: boolean;
}

const calendar = "calendar";
const toggl = "Toggl";
const clockify = "Clockify";

function useCalendarTimeEntries(
  { from, to, calendarName, url, runningTimerOnly }: Omit<UseTimeEntryOption, "description">,
  options: { execute: boolean }
) {
  const query = calendarName
    ? getCalItemQuery({
        calendars: [calendarName],
        url,
        runningTimerOnly,
        interval: from ? { start: from.getTime(), end: to?.getTime() ?? now.getTime() } : undefined,
        blocksOnly: true,
        asTimeEntries: true,
      })
    : "";
  const { data, error, isLoading, revalidate } = useSQL<TimeEntry>(CALENDAR_DB, query, options);
  const timeEntries = useMemo(() => data?.map<TimeEntry>((entry) => toEpochBasedDates(entry)), [data]);

  return {
    calData: timeEntries,
    calError: error,
    isLoadingCal: isLoading,
    revalidateCal: revalidate,
  };
}

function useFetchedTimeEntries(
  filter: Omit<UseTimeEntryOption, "calendarName" | "url">,
  options: { initialData?: TimeEntry[]; keepPreviousData?: boolean; execute: boolean }
) {
  const { data, error, isLoading, revalidate, mutate } = useCachedPromise(
    async (filter: Omit<UseTimeEntryOption, "calendarName" | "url">) => {
      if (typeof timeTracker !== "string" && timeTracker.getTimeEntries) {
        return timeTracker.getTimeEntries(filter);
      }
    },
    [filter],
    options
  );

  return {
    fetched: data,
    fetchedError: error,
    isLoadingFetched: isLoading,
    revalidateFetched: revalidate,
    mutateFetched: mutate,
  };
}

// `interval` is of type `TimeValueInterval` because reporting periods must be represented in `string` thanks to
// `List.Dropdown.Item.value` and time value numbers are safer for type casting.
export default function useTimeEntries(
  app: string,
  filter: UseTimeEntryOption
): {
  timeEntries: TimeEntry[] | undefined;
  timeEntriesError: Error | undefined;
  showTimeEntriesErrorToast: (() => Promise<Toast>) | undefined;
  isLoadingTimeEntries: boolean;
  revalidateTimeEntries: (() => Promise<TimeEntry[]>) | (() => void) | undefined;
  mutateTimeEntries: MutatePromise<TimeEntry[] | undefined> | undefined;
} {
  const { calData, calError, isLoadingCal, revalidateCal } = useCalendarTimeEntries(filter, {
    execute: filter.execute !== false && app === calendar && !!filter.calendarName,
  });

  const { fetched, fetchedError, isLoadingFetched, revalidateFetched, mutateFetched } = useFetchedTimeEntries(filter, {
    keepPreviousData: false,
    execute: filter.execute !== false && (app === toggl || app === clockify),
  });

  const showErrorToast =
    fetchedError && fetchedError instanceof Error && fetchedError.name === AUTHORIZATION_ERROR
      ? () =>
          showInvalidExtensionPreferencesToast(`Failed to fetch latest data from ${app}`, fetchedError.message, {
            title: `Open ${app === "Toggl" ? "Toggle Track Profile" : "Clockify Profile Settings"} Page`,
            onAction: () =>
              void open(app === "Toggl" ? "https://track.toggl.com/profile" : "https://app.clockify.me/user/settings"),
          })
      : undefined;

  // Use `revalidateTimeEntries` for all 3 sources and `mutateTimeEntries` for Toggl and Clockify
  // - optimistic updates are preferred since it can take up to 4 sequential network API calls in the worst case.
  // - But, `useSQL` and `useCachedPromise` `MutatePromise` type parameters are incompatible. Plus, SQL is fast.
  return {
    timeEntries: calData ?? fetched,
    timeEntriesError: calError ?? fetchedError,
    showTimeEntriesErrorToast: showErrorToast,
    isLoadingTimeEntries:
      (app === calendar && isLoadingCal) || ((app === toggl || app === clockify) && isLoadingFetched),
    revalidateTimeEntries:
      app === calendar ? revalidateCal : app === toggl || app === clockify ? revalidateFetched : undefined,
    mutateTimeEntries: app === toggl || app === clockify ? mutateFetched : undefined,
  };
}
