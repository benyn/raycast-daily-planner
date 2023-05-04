---
layout: default
title: Reminders
parent: App-Specific Notes
nav_order: 1
---

# Reminders

- **Tags**: Displayed but not editable due to Apple API limitations.
- **Subtasks**: Converted to standalone Reminders when the parent Reminder is moved to a different list.
- **Due date**: Retains any time components, if changed.
- **Start date**: Used for organizing to-dos without altering due dates. Not visible in the Reminders app but supported internally. Time components added to or removed from the due date in the Reminders app may cause a start date shift of ±1 day.
