---
layout: default
title: Show Menu Bar Timer
nav_order: 6
---

# Show Menu Bar Timer

Know what you're supposed to be doing at every moment! A running timer and associated task title in the macOS Menu Bar keep you focused.

## Video Walkthrough

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="assets/show-menu-bar-timer.mp4" title="Show Menu Bar Timer video walk-through" controls poster="assets/show-menu-bar-timer.png">
    Your browser does not support the video tag.
  </video>
</div>

## Activation

Run the "Show Menu Bar Timer" command in Raycast to activate the menu bar timer. Alternatively, click the "Activate" button under Raycast Settings > Extensions > Daily Planner > Show Menu Bar Timer. To hide the menu bar timer, simply press the "Deactivate" button in Raycast Settings.

## Limitations

- **In-extension changes only**: The menu bar timer reflects modifications made within the extension only, using local cache to minimize resource consumption. External changes, e.g., those made in Toggl/Clockify, won't be shown.
- **To-do timers only**: Timers not associated with any to-dos are not displayed.
- **Timer duration**: The menu bar timer shows the most recent time entry duration or the sum of paused/resumed timers, which may differ from the total duration of all time entries for the current date as shown in the [Track Time for To-Dos](track-time) command.
- **Project/tag sync not supported**: Projects and tags are not synced when a timer is started in the menu bar.
- **Remaining time blocks only**: In the Start Timer section, only current or upcoming time blocks are listed. Unlike in [Block Time for To-Dos](block-time), past time blocks with incomplete associated to-dos aren't displayed. Start a timer by clicking a time block.

## Command Preferences

### Hide Timer Title

Display the timer in the menu bar without the title so it takes up less space. The default is `false`.
