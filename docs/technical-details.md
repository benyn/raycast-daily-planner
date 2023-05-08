---
layout: default
title: Technical Details
nav_order: 9
---

# Technical Details

## Data Sources

- **Local Databases for Calendar, Reminders, and Things**: Reminders/Things to-dos and calendar events are fetched only from the databases on your machine, without accessing cloud data. To ensure you're working with the latest up-to-date data, **sync your local app databases by launching your to-do list apps and Calendar**—using the [Split Screen To-Dos and Calendar](split-screen) command or otherwise—before starting time blocking.
- **Cloud Databases for Todoist, Toggl, and Clockify**: Todoist tasks and Toggl/Clockify time entries are fetched directly from the service provider servers using their APIs.

## To-Do, Block, and Time Entry Visibility

- **Selected List**: Time blocks and time entries are displayed only if the associated to-dos are displayed on the selected list.
- **Today's Blocks and Time Entries**: Blocks and time entries scheduled for today appear in the Today list if the [Update Start/Due Date on Time Blocking](block-time#update-startdue-date-on-time-blocking) and [Update Start/Due Date on Timer Start](track-time#update-startdue-date-on-timer-start) options are enabled. If either option is disabled or to-dos are moved out of the Today list after scheduling blocks or starting timers, the blocks and time entries will not appear in the Today list.
- **Non-Today Blocks and Time Entries**: View blocks scheduled for tomorrow and coming days by selecting the "Upcoming" list. View all scheduled blocks for a to-do within a 14-day period using "Show Details" action. Use [Generate Productivity Reports](generate-productivity-reports) for all blocks and time tracking results.
- **Completed To-Dos**: Removed from the Today list by to-do list apps. Find blocks and time entries for completed tasks in the Completed (Reminders) or Logbook (Things) list or by launching the [Generate Productivity Reports](generate-productivity-reports) command.

### Calendar Integration

- **Fetching Interval**: Events for the next 7 days are fetched for time blocking, allowing you to plan your week.
- **Duplicate Calendar Names**: If multiple calendars share the same name, events from all these calendars will be fetched. Time blocks and time entries are created in the first of the calendars that share the same name.
- **Recurring Time Blocks**: Creating recurring time blocks inside the extension is not supported, but they will be shown if created outside the extension. Deleting a block belonging to a recurring event series will delete only the first instance of the series.

### URLs in Calendar Events

- **URL as Identifier**: The URL within each calendar event serves as the identifier for time/task blocks (or Calendar time entries when using calendar-based time tracking). Manually editing the URL could render the calendar event unrecognizable as a block or time entry.
  - _Time Block_: URL links to the task in the source to-do list app.
  - _Task Block_: URL contains IDs of small tasks grouped under the task block and, when clicked, launches the [Block Time for To-Dos](block-time) command.
  - _Break Block_: URL launches the [Track Time for To-Dos](track-time) command, presenting a prompt to stop any running timer.
- **URL Variations**: Acceptable if they conform to the to-do list app's URL schemes (e.g., `todoist://` and `https://todoist.com/` are interchangeable for Todoist tasks).
- **Off-extension Time Blocking/Tracking**: Calendar events created outside the extension will be recognized as long as their URLs are correct. Duplicate and rearrange blocks in the Calendar app for visual scheduling. On iOS/iPadOS, use Shortcuts as an alternative for mobile time blocking/tracking. See the [Shortcuts for iOS/iPadOS](https://github.com/benyn/raycast-daily-planner#-shortcuts-for-iosipados) section in the repository README.
- **Title Sync**: To re-sync out-of-sync to-do, time block, and time entry titles, make sure the URL remains intact and use the “Edit To-Do” action. For Toggl/Clockify, time entries cannot embed to-do URLs, so to-do ID and time entry ID matching records are cached for 14 days, limiting the re-sync to this period."
