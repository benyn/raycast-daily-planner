import { useCachedPromise, useSQL } from "@raycast/utils";
import { useMemo } from "react";
import { activeSourceIds, getThingsDBPath, getTodoistTags, tagsQuery, todoSourceId } from "../api/todo-source";
import { TodoSourceId, TodoTag } from "../types";

function useThingsTags({ execute }: { execute?: boolean }) {
  const path = getThingsDBPath();
  const { isLoading, data, error } = useSQL<TodoTag>(path, tagsQuery, {
    execute: execute !== false,
  });
  const tags = useMemo(() => new Map(data?.map(({ id, name }) => [id, name])), [data]);
  return { isLoadingThings: isLoading, thingsTags: tags, thingsError: error };
}

function useTodoistTags({ execute }: { execute?: boolean }) {
  const { isLoading, data, error } = useCachedPromise(getTodoistTags, [], {
    execute: execute !== false,
  });
  const tags = useMemo(() => new Map(data), [data]);
  return { isLoadingTodoist: isLoading, todoistTags: tags, todoistError: error };
}

export default function useTodoTags(options?: { execute?: boolean }): {
  todoTags: Map<TodoSourceId, Map<string, string>> | undefined;
  todoTagsError: Error | undefined;
  isLoadingTodoTags: boolean;
} {
  const { isLoadingThings, thingsTags, thingsError } = useThingsTags({
    execute: activeSourceIds.includes(todoSourceId.things) && options?.execute !== false,
  });

  const { isLoadingTodoist, todoistTags, todoistError } = useTodoistTags({
    execute: activeSourceIds.includes(todoSourceId.todoist) && options?.execute !== false,
  });

  const tags = useMemo(
    () =>
      new Map<TodoSourceId, Map<string, string>>([
        [todoSourceId.things, thingsTags],
        [todoSourceId.todoist, todoistTags],
      ]),
    [thingsTags, todoistTags]
  );

  return {
    todoTags: tags,
    todoTagsError: thingsError ?? todoistError,
    isLoadingTodoTags: isLoadingThings || isLoadingTodoist,
  };
}
