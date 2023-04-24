import { getPreferenceValues, LaunchProps } from "@raycast/api";
import { useMemo, useState } from "react";
import { isTaskBlock } from "./api/todo-source";
import BlockTimeActions from "./components/BlockTimeActions";
import TaskBlockActions from "./components/TaskBlockActions";
import TaskBlockTodoList from "./components/TaskBlockTodoList";
import TodoList from "./components/TodoList";
import TodoListDropdown, { initialList } from "./components/TodoListDropdown";
import { restOfTodayAndNextSevenDays, today, todayAndNextSevenDays } from "./helpers/datetime";
import { showCalendarNotFoundToast, showInvalidCommandPreferencesToast } from "./helpers/errors";
import { getAvailableTimes, getOffHours } from "./helpers/interval";
import { buildTodoList, isTaskBlockItem, todoState } from "./helpers/todoList";
import useCalendars from "./hooks/useCalendars";
import useEvents from "./hooks/useEvents";
import useTodoGroups from "./hooks/useTodoGroups";
import useTodos from "./hooks/useTodos";
import useTodoTags from "./hooks/useTodoTags";
import { Block } from "./types";

interface Preferences {
  blockCalendar: string;
  eventCalendars: string;
  defaultBlockDuration: string;
  workingHoursStart: string;
  workingHoursEnd: string;
}

const { blockCalendar, eventCalendars, defaultBlockDuration, workingHoursStart, workingHoursEnd } =
  getPreferenceValues<Preferences>();

export const calendars = eventCalendars ? [blockCalendar, ...eventCalendars.split(",")] : [blockCalendar];
export const defaultDuration = parseInt(defaultBlockDuration);
export const [offHours, prefError] = getOffHours(workingHoursStart, workingHoursEnd, restOfTodayAndNextSevenDays);

function BlockTime(isLoadingCalendars: boolean) {
  const [list, setList] = useState(initialList);

  const { todos, isLoadingTodos, revalidateTodos } = useTodos({ list });
  const { todoGroups, tieredTodoGroups, isLoadingTodoGroups } = useTodoGroups();
  const { todoTags, isLoadingTodoTags } = useTodoTags();
  const [isLoadingBlocks, blocks, revalidateBlocks] = useEvents<Block>({
    calendars: [blockCalendar],
    interval: list.isToday ? today : todayAndNextSevenDays,
    blocksOnly: true,
  });
  const taskBlocks = useMemo(() => blocks?.filter(isTaskBlock), [blocks]);

  const sectionedTodoItems = useMemo(
    () =>
      buildTodoList(todos, blocks, null, todoGroups, todoTags, [
        todoState.notTimeblocked,
        todoState.timeblocked,
        todoState.completed,
        todoState.canceled,
      ]),
    [todos, blocks, todoGroups, todoTags]
  );

  const [isLoadingUpcomingEvents, upcomingEvents, revalidateUpcomingEvents] = useEvents({
    calendars,
    interval: restOfTodayAndNextSevenDays,
  });

  const availableTimes = useMemo(() => getAvailableTimes(upcomingEvents, offHours), [upcomingEvents]);
  if (prefError) {
    void showInvalidCommandPreferencesToast("Invalid Working Hours", prefError.message);
  }

  return (
    <TodoList
      sectionedListItems={sectionedTodoItems}
      listName={list.title}
      showSourceIcon={!list.sourceId}
      isTodayList={list.isToday ?? false}
      isLoading={isLoadingCalendars || isLoadingTodos || isLoadingTodoGroups || isLoadingTodoTags || isLoadingBlocks}
      tieredTodoGroups={tieredTodoGroups}
      todoTags={todoTags}
      revalidateTodos={revalidateTodos}
      revalidateUpcomingEvents={revalidateUpcomingEvents}
      searchBarAccessory={<TodoListDropdown list={list} setList={setList} />}
      getPrimaryActions={(item) => (
        <>
          {isTaskBlockItem(item) ? (
            <TaskBlockActions
              rootTaskBlockItem={item}
              showSourceIcon={!list.sourceId}
              isTodayList={list.isToday ?? false}
              tieredTodoGroups={tieredTodoGroups}
              todoTags={todoTags}
              revalidateRootTodos={revalidateTodos}
              revalidateRootBlocks={revalidateBlocks}
            />
          ) : null}

          <BlockTimeActions
            item={item}
            taskBlocks={taskBlocks}
            isLoadingUpcomingEvents={isLoadingUpcomingEvents}
            upcomingEvents={upcomingEvents}
            availableTimes={availableTimes}
            defaultDuration={defaultDuration}
            revalidateTodos={revalidateTodos}
            revalidateBlocks={revalidateBlocks}
            revalidateUpcomingEvents={revalidateUpcomingEvents}
          />
        </>
      )}
    />
  );
}

export default function Command({ launchContext }: LaunchProps<{ launchContext: { ids: string[] } }>) {
  // If necessary, show permission view or calendar name error message. A post-comma space in `eventCalendars` may be
  // the leading cause of errors, but cannot be trimmed since leading/trailing spaces are allowed in calendar names.
  const { isLoadingCalendars, missingCalendarNames, permissionView } = useCalendars(calendars);
  if (!permissionView && missingCalendarNames && missingCalendarNames.length > 0) {
    void (async () => await showCalendarNotFoundToast(missingCalendarNames))();
  }

  return permissionView
    ? permissionView
    : launchContext?.ids && launchContext.ids.length > 0
    ? TaskBlockTodoList(launchContext.ids)
    : BlockTime(isLoadingCalendars);
}
