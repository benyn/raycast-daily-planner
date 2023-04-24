import { open, openCommandPreferences, openExtensionPreferences, showToast, Toast } from "@raycast/api";
import { createCalendars } from "../api/eventkit";

export const COMMAND_PREFERENCES_ERROR = "CommandPreferencesError";

export function showCalendarNotFoundToast(missingCalendarNames: string[]): Promise<Toast> {
  return showToast({
    style: Toast.Style.Failure,
    title: "Calendar Not Found",
    message: `Calendar${missingCalendarNames.length === 1 ? "" : "s"} titled ${missingCalendarNames
      .map((name) => '"' + name + '"')
      .join(", ")} not found in your database.`,
    primaryAction: {
      title: "Create New Calendar" + (missingCalendarNames.length === 1 ? "" : "s"),
      onAction: (toast) =>
        void Promise.all([toast.hide(), createCalendars(missingCalendarNames).then((id) => open(`ical://${id}`))]),
    },
    secondaryAction: {
      title: "Open Raycast Settings",
      onAction: (toast) => void Promise.all([toast.hide(), openExtensionPreferences()]),
    },
  });
}

export function showInvalidExtensionPreferencesToast(
  title: string,
  message: string,
  secondaryAction?: Toast.ActionOptions
): Promise<Toast> {
  return showToast({
    style: Toast.Style.Failure,
    title,
    message,
    primaryAction: {
      title: "Open Raycast Settings",
      onAction: () => void openExtensionPreferences(),
    },
    secondaryAction,
  });
}

export function showInvalidCommandPreferencesToast(title: string, message: string): Promise<Toast> {
  return showToast({
    style: Toast.Style.Failure,
    title,
    message,
    primaryAction: {
      title: "Open Raycast Settings",
      onAction: () => void openCommandPreferences(),
    },
  });
}
