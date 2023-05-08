---
layout: default
title: Split Screen To-Dos and Calendar
nav_order: 7
---

# Split Screen To-Dos and Calendar

Toggle between a split-screen view of To-Dos and Calendar with just a single keystroke.

- When first launched, the "Split Screen To-Dos and Calendar" command opens your primary to-do list app and Calendar side in a split-screen view.
- When launched again, it reverts the window sizes and positions back to the original state.

## Video Walkthrough

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="assets/split-screen.mp4" title="Show Menu Bar Timer video walk-through" controls>
    Your browser does not support the video tag.
  </video>
</div>

## Functionality Details

- **Primary to-do app only**: Additional to-do apps not launched or rearranged by the command.
- **Frontmost windows**: Only frontmost window of each app used for split screen.
- **Calendar view**: Changed to Day View on initial launch, and restored previous view (except Year) when relaunched.
- **Multi-display support**: Apps displayed on the screen where the mouse cursor is located, like Raycast window.

## Command Preferences

### Window Size Ratio

Specify the ratio between the widths of the to-do app window and the calendar window when displayed side by side. The default is `1:1`.
