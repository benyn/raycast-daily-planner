---
layout: default
title: Configuration
nav_order: 2
---

# Configuration

## To-Do List Integration

The Daily Planner extension supports integration with three popular to-do list applications: **Reminders**, **Things**, and **Todoist**. Choose one app as your primary task manager and optionally select up to two additional apps to import tasks from.

- **Primary To-Do App** (required): The extension will create new tasks in this app by default. It will also adopt this app's keyboard shortcut schema. This is also the app that is displayed in split screen mode in the “Split Screen To-Dos and Calendar” command.
- **Additional To-Do Apps** (optional, up to 2): Choose other task managers to import existing tasks from. The app icon next to each task will indicate the source of imported tasks. The tasks will be displayed in the order their source apps are selected.
- **Todoist API Token** (required only if selecting Todoist): Enter your Todoist API token to enable integration. Find your API token in the Todoist web app under [Settings > Integrations > Developer](https://todoist.com/app/settings/integrations/developer).

## Calendar Integration

The Daily Planner extension puts all your time blocks on a single calendar but can also reference additional calendars to detect scheduling conflicts.

- **Time Block Calendar** (required): This is the calendar where scheduled time blocks will be placed. If there is no calendar that has the name entered, you will be prompted to create it when launching a command.
- **Event Calendars** (optional): The extension will check these calendars for events when suggesting time block schedules to avoid conflicts. You also will receive a reminder of any detected conflicts when scheduling a time block. Calendar events are accessed locally and not shared externally.

## Time Tracking

Enable time tracking to log time spent on tasks. Choose between built-in calendar time tracking or integration with a dedicated time tracking service like Toggl or Clockify.

- **Time Tracking App** (optional): Select "Calendar" for basic but complete offline and privacy-protected time tracking on your calendar. Or, choose "Toggl" or "Clockify" to integrate with their time tracking service and sync projects and tags. Leave the “Calendar for Time Tracking” and “Time Tracking Service API Key” fields blank to disable time tracking.
- **Calendar for Time Tracking** (required only if selecting Calendar time tracking): This is the calendar where time entries will be logged. If there is no calendar that has the name entered, you will be prompted to create it when launching a command.
- **Time Tracking Service API Key** (required only if selecting Toggl or Clockify): Enter your API key or access token to enable integration with the selected time tracking service. Find your API key from [Toggl Track Profile](https://track.toggl.com/profile) or [Clockify Profile Settings](https://app.clockify.me/user/settings).
- **Sync Projects/Tags** (optional, only if selecting Toggl or Clockify): Enable to sync projects and tags from your task manager to the time tracking service. Syncing will occur incrementally as you start timers for tasks associated with projects or tags.
