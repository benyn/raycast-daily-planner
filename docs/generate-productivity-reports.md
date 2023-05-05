---
layout: default
title: Generate Productivity Reports
nav_order: 5
---

# Generate Productivity Reports

## Video Walkthrough

## Report Item Status

### With Time Tracking & Grouping

When the "Time Tracking App" is set up correctly, and the "Group by Spontaneity" option is enabled, the productivity report displays item statuses based on the following criteria:

| Item Status               | Todo Status  | Time Blocked?[^1]      | Time Tracked? |
| ------------------------- | ------------ | ---------------------- | ------------- |
| Completed as Scheduled    | ✅ Completed | 📅 Yes                 | ⏱️ / ⬚ Either |
| Completed Spontaneously   | ✅ Completed | ⬚ No                   | ⏱️ / ⬚ Either |
| Progressing as Scheduled  | ⬜️ Open     | 📅 Yes                 | ⏱️ Yes        |
| Progressing Spontaneously | ⬜️ Open     | ⬚ No                   | ⏱️ Yes        |
| Upcoming                  | ⬜️ Open     | 📅 Future[^2]          | ⬚ No          |
| Missed                    | ⬜️ Open     | 📅 Past[^3] / ⬚ No[^4] | ⬚ No          |

[^1]: Time Blocked indicates whether the to-do was scheduled as a time block, as part of a task block containing one or more to-dos, or not scheduled at all.
[^2]: The to-do is scheduled, and it's before the scheduled time.
[^3]: The to-do is scheduled, and it's past the scheduled time.
[^4]: Only if the “Show Unscheduled & Open To-Dos" option is checked.

### With Time Blocks Only

When the "Time Tracking App" is not set up, or the "Group by Spontaneity" option is disabled, the productivity report displays item statuses based on the following criteria:

| Item Status | Todo Status  | Time Blocked?[^1] |
| ----------- | ------------ | ----------------- |
| Completed   | ✅ Completed | 📅 Yes            |
| Progressing | ⬜️ Open     | 📅 Past[^3]       |
| Upcoming    | ⬜️ Open     | 📅 Future[^2]     |
| Missed      | ⬜️ Open     | ⬚ No[^4]          |

## Tracked Time Allocation

Time tracked for task blocks is distributed evenly among the to-dos within the task blocks. When there are multiple time entries for a task block or if a task block is scheduled multiple times, the allocation of tracked time depends on the Time Tracking App:

- **Calendar (URL-based allocation)**: The total tracked time from all entries with the same URL is divided equally among the to-dos embedded in that URL.
- **Toggl/Clockify (title-based allocation)**: The total tracked time from all entries with the same title is allocated to the to-dos within the task blocks that share the same title. The allocation is weighted by the duration of each time block.

## Meetings & Other Calendar Events

In the Other group, up to four types of subgroups may appear, if such blocks or events are present:

- **Break Blocks**: Break blocks scheduled using the extension.
- **Personal Events**: Calendar events without organizers or attendees.
- **Meetings**: Calendar events you organized or were invited to.
- **Open Task Blocks**: Task blocks scheduled without any associated to-dos. These cannot be created within the extension, but can be created by manually editing the calendar event URL.

Any time entries that are not associated with any to-dos or events won't be included in productivity reports.

## Command Preferences

- **Exclude Weekends**: Exclude to-dos, calendar events, and time entries occurring on Saturdays and Sundays from the reports. If `true`, nothing will show up in the reports even if you specifically set the report period to a weekend day. The default is `false`.
- **Show Unscheduled & Open To-Dos**: Include incomplete to-dos that have not been assigned a time block or tracked in the generated reports. The default is `false`.
- **Group To-Dos by Spontaneity**: Group to-dos based on whether they were completed as scheduled (with assigned time/task blocks) or spontaneously (without assigned time/task blocks). The default is `true`.
