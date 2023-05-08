---
layout: default
title: Block Time for To-Dos
nav_order: 3
---

# Block Time for To-Dos

## What is Time Blocking?

Time blocking, also known as Timeboxing, is a productivity technique that gained popularity through Cal Newport's book "Deep Work." It's about scheduling blocks of time to focus on individual tasks. Time blocking isn't about feeling constrained; instead, it encourages thoughtfulness and adaptability. The main goal is not to follow a strict plan but to build a simple habit that helps you regularly check in and ask yourself, "What's the best way to use my time right now?"

To learn more and see it in action, watch this video[^1]:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eff9h1WYxSo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[^1]: Newport's preference for paper-based time blocking is a bit ironic, considering his impressive background as an MIT-trained computer science professor. Of course, there's value in taking a break from our screens and embracing the simplicity of pen and paper. That said, how about we craft a digital complement to pen and paper time blocking and save a few trees in the process?

## Video Walkthrough

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="assets/block-time.mp4" title="Show Menu Bar Timer video walk-through" controls>
    Your browser does not support the video tag.
  </video>
</div>

## Block Types

There are three types of blocks that can be scheduled using the Daily Planner extension:

- _Time Block_: A calendar event designated for a single to-do item.
- _Task Block_: A calendar event designated for multiple "small" to-do items[^2].
- _Break Block_: A calendar event reserved for relaxation without any associated to-dos.

The "Block Time" action schedules _Time Blocks_. To create a new _Task Block_, or add a to-do to an existing _Task Block_, use the "Add to Task Block" action. To create a _Break Block_, use the "Add Break Block" action.

[^2]: In "Deep Work," Cal Newport recommends 30 minutes as the minimum length of a block. For smaller tasks, he suggests batching them into _task blocks_.

### Editing Task Blocks

To-dos can be removed or moved between _Task Blocks_ using the "Remove from Task Block" or "Move to Another Task Block"[^3] actions. If you use Calendar for time tracking, altering a Task Block after starting its timer may break the link between the time entry and the Task Block. To fix this, copy the Task Block URL and paste it into the time entry's URL field in Calendar.

Scheduled task blocks can be renamed in the Calendar app. Task blocks will be grouped by title. If time entries had already been created for the renamed task block, remember to manually change the title of those time entries since they won't be automatically synced.

To rename a scheduled task block using your keyboard only, follow these steps:

1. Select the task block you want to rename in the list.
2. Use the "Open in Calendar" action (keyboard shortcut: Shift-Command-O).
3. This will open the corresponding calendar event in the Calendar app.
4. Press Tab to focus on the event title field.
5. Edit the title and press Enter to save the changes.

[^3]: The "Move to Another Task Block" action is available only if multiple _Task Blocks_ with the same title are scheduled on the same day.

## Time Finder

Time Finder helps you find available time slots based on your preferences.

### Initial Criteria

It initially suggests slots that are:

- From now through the next 7 days
- Of the duration set by the ["Default Time Block Duration"](#default-time-block-duration) setting
- Within your working hours (between ["Working Hours Start Time"](#working-hours-start-time) and ["Working Hours End Time"](#working-hours-end-time))
- Free from conflicts with events on your ["Time Block Calendar"](extension-settings#time-block-calendar) or any of the ["Event Calendars"](extension-settings#event-calendars) configured in Raycast Settings.

### Custom Search Criteria

To find time slots that meet your criteria, enter natural language expressions like:

- Durations: "1.5h", "90 min"[^4]
- Time or time ranges: "3p"[^5], "3-4p", "9-10:30 am"[^6], "late afternoon", "early evening"
- Date or date ranges: "tmr", "wed", "wed - fri" (includes Thursday), "wed or fri" (skips Thursday), "next week", "in 3 days"
- Date & time ranges: "3-4p today", "fri 9-10", "this afternoon"
- Time & durations: "3p 1.5h", "90 mins from 3 pm", "1.5h before 3pm"
- Date & durations: "2h tmr", "1.5h wed or fri"
- Date, time, & durations: "1.5h tmr afternoon", "friday morning 45 min"

The extension prioritizes time slots that meet the initial criteria. If your calendar is fully booked and no suitable time slots match the given criteria, you may see "No Results." To override settings and conflicting events, use "date & time range expressions". For instance, if you want to schedule a time block that starts in the past or ignore an existing event, use "9-10am today" rather than just "9-10am."

[^4]: For minutes, use "min" as the shortest unit, since the parser doesn't recognize "m" as a time unit, likely due to confusion with meters.
[^5]: If no duration is specified, the ["Default Time Block Duration"](#default-time-block-duration) setting is applied.
[^6]: Note that "p" is recognized as "pm" but "a" is not recognized as "am".

## Time Blocking Tips

- **Sync First**: Launch the Calendar app, and if you're using Reminders or Things, launch those as well before running the "Block Time for To-Dos" command to sync the latest data from the cloud. The ["Split Screen To-Dos and Calendar"](split-screen.md) action will be useful for this purpose, as it launches your primary to-do list app and Calendar app if they aren't already running.
- **Use Calendar for visual scheduling**: You can schedule, reschedule, duplicate, or delete time/task/break blocks using your mouse in the Calendar app. Just remember to hit the "Refresh" (Command-R) action or relaunch the command to update the latest data afterward.
- **Access calendar events with Raycast My Schedule**: Calendar events that aren't time/task/break blocks won't appear in the list, but you can easily access them using your keyboard through Raycast's built-in [My Schedule](https://www.raycast.com/extensions/calendar) command.

## Command Preferences

### Default Time Block Duration

Default length for blocks (calendar events) created for to-dos. The default is "1 hour".

### Working Hours Start Time

The earliest time of the day at which time block scheduling suggestions should start. The default is "9:00 AM".

### Working Hours End Time

The latest time of the day at which time block scheduling suggestions should end. The default is "5:00 PM".

### Time Block Alert Timing

Your preferred timing for alerts about upcoming time blocks. The alerts will come from the macOS Calendar app[^7], not Raycast. The default is "2 minutes before".

### Task Block Name

Default title for a calendar event representing a block of time set aside for multiple small tasks. Time entries created before a name change won’t be updated. The default is "Task Block".

### Break Block Name

Default title for a calendar event representing a block of time set aside for relaxation. The default is "Break".

### Update Start/Due Date on Time Blocking

If a task is time-blocked for a date earlier than its start date (Reminders/Things) or due date (Todoist), update the start/due date. If time-blocked for a later date, the start/due date always remains unchanged. The default is `true`.

[^7]: If you've chosen the [Alerts notification style](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac#:~:text=Select%20a%20notification%20style%3A,screen%20until%20you%20dismiss%20them.) for Calendar in macOS System Settings, notifications stay on screen until dismissed. To dismiss them with your keyboard from Raycast, create a copy of the [Dismiss Notifications script command](https://github.com/raycast/script-commands/blob/master/commands/system/dismiss-notifications.applescript) by following Raycast's [Create your own Script Commands guide](https://github.com/raycast/script-commands#create-your-own-script-commands).

---
