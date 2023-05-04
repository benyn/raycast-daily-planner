---
layout: default
title: Show Menu Bar Timer
nav_order: 6
---

# Show Menu Bar Timer

## Video Walkthrough

- **Remaining time blocks**: Start timer by clicking a time block.

## Limitations

- **In-extension changes only**: Only modifications made within the extension are reflected in the menu bar timer, which uses local cache to minimize resource consumption. Changes made outside the extension, e.g., directly in Toggl/Clockify, will not be reflected.
- **To-do timers only**: Non-to-do timers initiated outside the extension not displayed.
- **Timer duration**: Menu bar timer displays the duration of the most recent time entry or the sum of timers paused/resumed in the menu bar, which may differ from the cumulative duration of all time entries recorded on the current date, as shown in the Track Time for To-Dos command.
- **Project/tag sync not supported**: Projects/tags not synced when timer started in the menu bar.

## Command Preferences

- **Hide Timer Title**: Display the timer in the menu bar without the title so it takes up less space. The default is `false`.
