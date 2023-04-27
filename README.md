# Daily Planner
Daily Planner is a [Raycast](https://www.raycast.com) extension designed to help you take control of your time and optimize your productivity. Time block your day, track time spent on tasks, and analyze your time usage—all from the convenience of your macOS launcher. Stay focused and on track with a running timer and task title displayed in the menu bar.
## 🌟 Features
- **Block Time for To-Dos**: Schedule focus time blocks for tasks from your favorite to-do list apps like Reminders, Things, or Todoist.
- **Track Time for To-Dos**: Track time spent on tasks using Toggl or Clockify, or directly on your calendar. Compare actual time spent with the time blocks you've budgeted for each task.
- **Generate Productivity Reports**: Build customizable reports on blocked and tracked time to uncover productivity patterns and optimize your workflow. Discover how much time you're spending on meetings and other events.
- **Show Menu Bar Timer**: Stay focused with a running timer and associated task title displayed in the macOS Menu.
- **Split Screen To-Dos and Calendar**: Arrange your primary to-do app (Reminders, Things, or Todoist) and macOS Calendar app side by side for a convenient view of your daily tasks and scheduled events. Relaunch the command to restore the to-do app and Calendar window positions and sizes to their original state.

## 🚀 Advantages
- **Seamless To-Do List App Integration**: Continue using your favorite to-do list apps like **Reminders**, **Things**, and **Todoist**—no need to migrate data or learn new systems.
- **Local Calendar Integration**: Your calendar is access locally and securely using macOS frameworks, keeping your data safe without sending it to the cloud.
- **Flexible Time Tracking Options**: Choose from a range of time tracking options, such as using your calendar for a fully-offline, privacy-first experience, or integrating with a popular app like Toggl or Clockify. Or, simply skip time tracking if it's not your thing.
- **Effortless Free Time Finder**: Daily Planner quickly locates available times in your schedule based on natural language input, helping you to rapidly schedule and reschedule time blocks without sifting through calendar events.
- **Natural Language Date Interval Input**: Schedule your time blocks using concise natural language phrases such as “1h”, “2-3p”, or “90 minutes early next week”. Use natural language for report generation as well, like “last 5 weeks” or “late afternoon”.
- **Offline-first and Privacy-focused**: Opt for apps that don't rely on network APIs—Reminders, Things, and Calendar—for complete offline functionality and data processing on your device.
- **Efficient Keyboard Navigation**: Time block your day with just a few keystrokes, eliminating the need to manually copy and paste data.

## 🎯 Getting Started
1. Download [Raycast](https://www.raycast.com) if you haven’t already.
2. Install [Daily Planner Extension](https://www.raycast.com/benyn/daily-planner).
3. When you launch any of the five commands, you’ll be asked to choose your primary to-do list app and the calendar to use for time blocking. Enter an existing calendar name if you already have a calendar you can use for time blocking. If not, you’ll see a prompt that lets you create a calendar with the name you entered.
4. If you wish to use time tracking, you'll need to provide a few more details. When you launch the "Track Time for To-Dos" command for the first time, you'll be prompted to enter these data points in the Raycast Extension Settings. Start by selecting your preferred method (Calendar, Toggl, or Clockify). If you choose Calendar, enter the name of the calendar for time tracking, ideally different from the one used for Time Blocking Calendar. If you opt for Toggl or Clockify, input the corresponding API key.
5. Time block your day, track time, review your productivity, and repeat!

## 🔧 Configuration
### Extension Preferences
#### To-Do List Integration
The Daily Planner extension supports integration with three popular to-do list applications: **Reminders**, **Things**, and **Todoist**. Choose one app as your primary task manager and optionally select up to two additional apps to import tasks from.

- **Primary To-Do App** (required): The extension will create new tasks in this app by default. It will also adopt this app's keyboard shortcut schema. This is also the app that is displayed in split screen mode in the “Split Screen To-Dos and Calendar” command.
- **Additional To-Do Apps** (optional, up to 2): Choose other task managers to import existing tasks from. The app icon next to each task will indicate the source of imported tasks. The tasks will be displayed in the order their source apps are selected.
- **Todoist API Token** (required only if selecting Todoist): Enter your Todoist API token to enable integration. Find your API token in the Todoist web app under [Settings > Integrations > Developer](https://todoist.com/app/settings/integrations/developer).

#### Calendar Integration
The Daily Planner extension puts all your time blocks on a single calendar but can also reference additional calendars to detect scheduling conflicts.  

- **Time Block Calendar** (required): This is the calendar where scheduled time blocks will be placed. If there is no calendar that has the name entered, you will be prompted to create it when launching a command.  
- **Event Calendars** (optional): The extension will check these calendars for events when suggesting time block schedules to avoid conflicts. You also will receive a reminder of any detected conflicts when scheduling a time block. Calendar events are accessed locally and not shared externally.

#### Time Tracking
Enable time tracking to log time spent on tasks. Choose between built-in calendar time tracking or integration with a dedicated time tracking service like Toggl or Clockify.

- **Time Tracking App** (optional): Select "Calendar" for basic but complete offline and privacy-protected time tracking on your calendar. Or, choose "Toggl" or "Clockify" to integrate with their time tracking service and sync projects and tags. Leave the “Calendar for Time Tracking” and “Time Tracking Service API Key” fields blank to disable time tracking.  
- **Calendar for Time Tracking** (required only if selecting Calendar time tracking): This is the calendar where time entries will be logged. If there is no calendar that has the name entered, you will be prompted to create it when launching a command.
- **Time Tracking Service API Key** (required only if selecting Toggl or Clockify): Enter your API key or access token to enable integration with the selected time tracking service.  Find your API key from [Toggl Track Profile](https://track.toggl.com/profile) or [Clockify Profile Settings](https://app.clockify.me/user/settings).
- **Sync Projects/Tags** (optional, only if selecting Toggl or Clockify): Enable to sync projects and tags from your task manager to the time tracking service. Syncing will occur incrementally as you start timers for tasks associated with projects or tags.

### Command Preferences
#### Block Time for To-Dos
- **Default Time Block Duration**: Default length for blocks (calendar events) created for to-dos. The default is "1 hour".
- **Working Hours Start Time**: The earliest time of the day at which time block scheduling suggestions should start. The default is "9:00 AM".
- **Working Hours End Time**: The latest time of the day at which time block scheduling suggestions should end. The default is "5:00 PM".
- **Time Block Alert Timing**: Your preferred timing for alerts about upcoming time blocks. The alerts will come from the macOS Calendar app, not Raycast. The default is ""2 minutes before".
- **Task Block Name**: Default title for a calendar event representing a block of time set aside for multiple small tasks. You can change the name of task blocks in the Calendar app. Task blocks will be grouped by title. Time entries created before a name change won’t be updated. The default is "Task Block".
- **Update Start/Due Date on Time Blocking**: If a task is time-blocked for a date earlier than its start date (Reminders/Things) or due date (Todoist), update the start/due date. If time-blocked for a later date, the start/due date always remains unchanged. The default is `true`.

#### Track Time for To-Dos
- **Update Start/Due Date on Timer Start**: If a timer for a task is started earlier than its start date (Reminders/Things) or due date (Todoist), update the start/due date. If started later, the start/due date always remains unchanged. The default is `true`.

#### Generate Productivity Reports
- **Exclude Weekends**: Exclude to-dos, calendar events, and time entries occurring on Saturdays and Sundays from the reports. If `true`, nothing will show up in the reports even if you specificially set the report period to a weekend day. The default is `false`.
- **Show Unscheduled & Open To-Dos**: Include incomplete to-dos that have not been assigned a time block or tracked in the generated reports. The default is `false`.
- **Group To-Dos by Spontaneity**: Group to-dos based on whether they were completed as scheduled (with assigned time/task blocks) or spontaneously (without assigned time/task blocks). The default is `true`.

#### Show Menu Bar Timer  
- **Hide Timer Title**: Display the timer in the menu bar without the title so it takes up less space. The default is `false`.

#### Split Screen To-Dos and Calendar
- **Window Size Ratio**: Specify the ratio between the widths of the to-do app window and the calendar window when displayed side by side. The default is `1:1`.

## 💡 Usage Notes
### Data Sources
- **Local Databases for Calendar, Reminders, and Things**: Reminders/Things to-dos and calendar events are fetched only from the databases on your machine, without accessing cloud data. To ensure you're working with the latest up-to-date data, **sync your local app databases by launching your to-do list apps and Calendar**—using the "Split Screen To-Dos and Calendar" command or otherwise—before starting time blocking.
- **Cloud Databases for Todoist, Toggl, and Clockify**: Todoist tasks and Toggl/Clockify time entries are fetched directly from the service provider servers using their APIs.

### To-Do, Block, and Time Entry Visibility
- **Selected List**: Time blocks and time entries are displayed only if the associated to-dos are displayed on the selected list.
- **Today's Blocks and Time Entries**: Blocks and time entries scheduled for today appear in the Today list if the "Update Start/Due Date on Time Blocking" and "Update Start/Due Date on Timer Start" options are enabled. If either option is disabled or to-dos are moved out of the Today list after scheduling blocks or starting timers, the blocks and time entries will not appear in the Today list.
- **Non-Today Blocks and Time Entries**: View blocks scheduled for tomorrow and coming days by selecting the "Upcoming" list. View all scheduled blocks for a to-do within a 14-day period using "Show Details" action. Use "Generate Productivity Reports" for all blocks and time tracking results.
- **Completed To-Dos**: Removed from the Today list by to-do list apps. Find blocks and time entries for completed tasks in the Completed (Reminders) or Logbook (Things) list or by launching the “Generate Productivity Reports” command.

### URLs in Calendar Events
- **URL as Identifier**: The URL within each calendar event serves as the identifier for time/task blocks (or Calendar time entries when using calendar-based time tracking). Manually editing the URL could render the calendar event unrecognizable as a block or time entry.
  - *Time Block*: URL links to the task in the source to-do list app.
  - *Task Block*: URL contains IDs of small tasks grouped under the task block and, when clicked, launches the “Block Time for To-Dos” command.
  - *Break Block*: URL launches the "Track Time for To-Dos" command, presenting a prompt to stop any running timer.
- **URL Variations**: Acceptable if they conform to the to-do list app's URL schemes (e.g., `todoist://` and `https://todoist.com/` are interchangeable for Todoist tasks).
- **Off-extension Time Blocking/Tracking**: Calendar events created outside the extension will be recognized as long as their URLs are correct. Duplicate and rearrange blocks in the Calendar app for visual scheduling. On iOS/iPadOS, use Shortcuts as an alternative for mobile time blocking/tracking. See the “Complementary Shortcuts” section below.
- **Title Sync**: To re-sync out-of-sync to-do, time block, and time entry titles, make sure the URL remains intact and use the “Edit To-Do” action. For Toggl/Clockify, time entries cannot embed to-do URLs, so to-do ID and time entry ID matching records are cached for 14 days, limiting the re-sync to this period."

### Calendar Integration
- **Fetching Interval**: Events for the next 7 days are fetched for time blocking, allowing you to plan your week.
- **Duplicate Calendar Names**: If multiple calendars share the same name, events from all these calendars will be fetched. Time blocks and time entries are created in the first of the calendars that share the same name.
- **Recurring Time Blocks**: Creating recurring time blocks inside the extension is not supported, but they will be shown if created outside the extension. Deleting a block belonging to a recurring event series will delete only the first instance of the series.

### App-specific Notes
#### Reminders
- **Tags**: Displayed but not editable due to Apple API limitations.
- **Subtasks**: Converted to standalone Reminders when the parent Reminder is moved to a different list.
- **Due date**: Retains any time components, if changed.
- **Start date**: Used for organizing to-dos without altering due dates. Not visible in the Reminders app but supported internally. Time components added to or removed from the due date in the Reminders app may cause a start date shift of ±1 day.

#### Things
- **To-do order**: Matches Things order when the "Group to-dos in the Today list by project or area" option is unchecked in Things Settings.
- **Checklist items**: Displayed in the Details view, but not editable due to Things AppleScript and x-callback-url limitations.

#### Todoist
- **Due date**: Loses any time components, if changed.
- **Sections**: Currently not supported.
- **Reporting period**: Limited to a maximum of 10 consecutive weeks to reduce API usage. Not restricted to the past 10 weeks.
- **Uncompleted tasks**: May appear as completed if uncompleted over two weeks ago and not re-completed.

#### Toggl
- **Default workspace**: New entries created only in default workspace.
- **Deleted time entries**: May be inadvertently restored when associated to-dos are edited due to Toggl API limitations, despite existing safeguards implemented in the extension. Report edge cases if found.

#### Clockify
- **Default workspace**: New entries created only in default workspace.

### Project and Tag Sync
- **One-way sync**: From to-do list apps to Toggl/Clockify only.
- **Incremental sync**: Projects/tags synced to Toggl/Clockify only when timer started for to-do.
- **Projects only**: Areas not synced for Things users.
- **Private by default**: New projects in Toggl/Clockify are private.
- **Name-matching**: Projects/tags matched by name only. Update names manually in both apps to avoid duplication.

### Productivity Reports
- **Todoist reporting period limit**: Max 10 weeks, as detailed above. No limits for Reminders or Things to-dos.

### Menu Bar Timer
- **In-extension changes only**: Only modifications made within the extension are reflected in the menu bar timer, which uses local cache to minimize resource consumption. Changes made outside the extension, e.g., directly in Toggl/Clockify, will not be reflected.
- **To-do timers only**: Non-to-do timers initiated outside the extension not displayed.
- **Timer duration**: Menu bar timer displays the duration of the most recent time entry or the sum of timers paused/resumed in the menu bar, which may differ from the cumulative duration of all time entries recorded on the current date, as shown in the Track Time for To-Dos command.
- **Remaining time blocks**: Start timer by clicking a time block.
- **Project/tag sync not supported**: Projects/tags not synced when timer started in the menu bar.

### Split Screen To-Dos and Calendar
- **Primary to-do app only**: Additional to-do apps not launched or rearranged by the command.
- **Frontmost windows**: Only frontmost window of each app used for split screen.
- **Calendar view**: Changed to Day View on initial launch, and restored previous view (except Year) when relaunched.
- **App window size and position**: Restored to original positions and sizes on relaunch.
- **Multi-display support**: Apps displayed on the screen where the mouse cursor is located, like Raycast window.

## 📚 Shortcuts for iOS/iPadOS
Use these Shortcuts when you are on mobile and can’t use Raycast. 
- [Start To-Do Timer](https://www.icloud.com/shortcuts/3dfdc2108a354ad1860a8117e239a633) (supports Reminders/Things only due to Todoist Shortcuts limitations)
- [Stop Running Timer](https://www.icloud.com/shortcuts/986cea63d5814ef284a1a274b8f52fb0)
- [Schedule your Reminders in your Calendar](https://www.reddit.com/r/shortcuts/comments/12yio7h/schedule_your_reminders_in_your_calendar/) (authored by [u/Silver-Finding-6233](https://www.reddit.com/user/Silver-Finding-6233/) and not directly compatible with the Daily Planner Raycast extension; a modified, compatible version can be provided if there’s enough demand)

## 💫 Inspirations
- [“Deep Work”](https://calnewport.com/writing/#books) by Cal Newport
- [“Four Thousand Weeks”](https://www.oliverburkeman.com/books) by Oliver Burkeman
- [Sunsama](https://www.sunsama.com)
- [Reclaim](https://reclaim.ai)
- [Benjamin Franklin’s daily schedule](https://www.theatlantic.com/politics/archive/2011/04/picture-of-the-day-benjamin-franklins-daily-schedule/237615/)