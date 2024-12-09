---
title: Track Time for To-Dos
sidebar:
  order: 2
---

Track time spent on tasks using Toggl or Clockify, or directly on your calendar. Compare actual time spent with the time blocks you've budgeted for each task.

## Video Walkthrough

<video src="/raycast-daily-planner/assets/track-time.mp4" title="Show Menu Bar Timer video walk-through" controls poster="/raycast-daily-planner/assets/track-time.png">
  Your browser does not support the video tag.
</video>

## Project and Tag Sync

- **One-way sync**: From to-do list apps to Toggl/Clockify only.
- **Incremental sync**: Projects/tags synced to Toggl/Clockify only when timer started for to-do.
- **Projects only**: Areas not synced for Things users.
- **Private by default**: New projects in Toggl/Clockify are private.
- **Name-matching**: Projects/tags matched by name only. Update names manually in both apps to avoid duplication.

## Command Preferences

### Update Start/Due Date on Timer Start

If a timer for a task is started earlier than its start date (Reminders/Things) or due date (Todoist), update the start/due date. If started later, the start/due date always remains unchanged. The default is `true`.
