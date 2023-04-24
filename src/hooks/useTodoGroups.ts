import { useCachedPromise, useSQL } from "@raycast/utils";
import { useMemo } from "react";
import {
  activeSourceIds,
  getRemindersDBPath,
  getThingsDBPath,
  getTodoistProjects,
  listsQuery,
  todoGroupsQuery,
  todoSourceId,
} from "../api/todo-source";
import { groupToMap } from "../helpers/group";
import { TodoGroup, TodoSourceId } from "../types";

function useRemindersLists({ execute }: { execute?: boolean }) {
  const path = getRemindersDBPath();
  const { isLoading, data, error } = useSQL<TodoGroup>(path, listsQuery, {
    execute: execute !== false,
  });
  return { isLoadingReminders: isLoading, remindersData: data, remindersError: error };
}

function useThingsAreasAndProjects({ execute }: { execute?: boolean }) {
  const path = getThingsDBPath();
  const { isLoading, data, error } = useSQL<TodoGroup>(path, todoGroupsQuery, {
    execute: execute !== false,
  });
  return { isLoadingThings: isLoading, thingsData: data, thingsError: error };
}

function useTodoistProjects({ execute }: { execute?: boolean }) {
  const { isLoading, data, error } = useCachedPromise(getTodoistProjects, [], {
    execute: execute !== false,
  });
  return { isLoadingTodoist: isLoading, todoistData: data, todoistError: error };
}

function getTieredTodoGroups(todoGroups: TodoGroup[] | undefined, sourceId: TodoSourceId): TodoGroup[] {
  const groupedTodoGroups = groupToMap(todoGroups, "parentId");
  // Things areas and projects that do not belong to any areas are grouped under `null`.
  // Reminders data have no `parentId` hence `undefined`.
  const topLevelTodoGroups = groupedTodoGroups.get(null) ?? groupedTodoGroups.get(undefined);
  const tieredTodoGroups = topLevelTodoGroups?.map((group) => {
    const subgroups = groupedTodoGroups.get(group.id);
    // Keep only two tiers and flatten the rest. Currently, this is needed only for Todoist.
    if (subgroups && sourceId === todoSourceId.todoist) {
      for (let maybeParents = [...subgroups]; maybeParents.length > 0; ) {
        const nextMaybeParents: TodoGroup[] = [];
        for (const maybeParent of maybeParents) {
          const children = groupedTodoGroups.get(maybeParent.id);
          if (children) {
            nextMaybeParents.push(...children);
            const i = subgroups.indexOf(maybeParent);
            subgroups.splice(i + 1, 0, ...children);
          }
        }
        maybeParents = nextMaybeParents;
      }
    }
    return { ...group, subgroups };
  });
  return tieredTodoGroups ?? [];
}

export default function useTodoGroups(options?: { execute?: boolean }): {
  todoGroups: Map<TodoSourceId, TodoGroup[]> | undefined;
  tieredTodoGroups: Map<TodoSourceId, TodoGroup[]> | undefined;
  todoGroupsError: Error | undefined;
  isLoadingTodoGroups: boolean;
} {
  const { isLoadingReminders, remindersData, remindersError } = useRemindersLists({
    execute: activeSourceIds.includes(todoSourceId.reminders) && options?.execute !== false,
  });

  const { isLoadingThings, thingsData, thingsError } = useThingsAreasAndProjects({
    execute: activeSourceIds.includes(todoSourceId.things) && options?.execute !== false,
  });

  const { isLoadingTodoist, todoistData, todoistError } = useTodoistProjects({
    execute: activeSourceIds.includes(todoSourceId.todoist) && options?.execute !== false,
  });

  // `tieredTodoGroups` are used in forms and `MoveSubmenu`.
  const { todoGroups, tieredTodoGroups } = useMemo(() => {
    const sourceTodoGroups: Record<TodoSourceId, TodoGroup[] | undefined> = {
      [todoSourceId.reminders]: remindersData,
      [todoSourceId.things]: thingsData,
      [todoSourceId.todoist]: todoistData,
    };

    const todoGroups = new Map<TodoSourceId, TodoGroup[]>(
      activeSourceIds.map((sourceId) => [sourceId, sourceTodoGroups[sourceId] ?? []])
    );
    const tieredTodoGroups = new Map<TodoSourceId, TodoGroup[]>(
      activeSourceIds.map((sourceId) => [sourceId, getTieredTodoGroups(sourceTodoGroups[sourceId], sourceId)])
    );
    return { todoGroups, tieredTodoGroups };
  }, [remindersData, thingsData, todoistData]);

  return {
    todoGroups,
    tieredTodoGroups,
    todoGroupsError: remindersError ?? thingsError ?? todoistError,
    isLoadingTodoGroups: isLoadingReminders || isLoadingThings || isLoadingTodoist,
  };
}
