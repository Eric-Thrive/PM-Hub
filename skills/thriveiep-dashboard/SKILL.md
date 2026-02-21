---
name: thriveiep-dashboard
description: >
  Generate Eric's ThriveIEP morning dashboard as an interactive React artifact.
  Fetches live data from Linear, Google Calendar, Notion, Gmail, and HubSpot.
  Curates 3 priority-driven Focus Picks. Renders an interactive dashboard with
  checkboxes, milestone countdowns, copy-to-clipboard, and persistent state.
  Use this skill when Eric says "/update", "morning dashboard", "morning briefing",
  "what's on today", "daily dashboard", "start my day", "show me my dashboard",
  or asks about today's priorities, schedule, or focus items. Also trigger on
  "what should I work on", "what's happening today", or any request for a
  consolidated view of current work status across tools.
---

# ThriveIEP Morning Dashboard

This skill orchestrates data from 6+ sources into an interactive React artifact
that serves as Eric's daily command center.

## ⚠️ Critical: Use the Canonical Template

**Do NOT design a new dashboard layout.** The canonical React artifact template
lives in PM-Hub at:

```
skills/thriveiep-dashboard/templates/dashboard-template.jsx
```

Read it via terminal at session start:
```bash
cat /home/claude/PM-Hub/skills/thriveiep-dashboard/templates/dashboard-template.jsx
```

Then:
1. Populate the data constants at the top of the file with today's live data
2. **Save the populated file as `/mnt/user-data/outputs/thriveiep-dashboard.jsx`** — this renders it as an interactive React artifact in the conversation
3. Present the file using `present_files` so the user sees the live artifact
4. Do not alter the component structure, styling, or tab layout

The template defines: `META`, `FOCUS_PICKS`, `CALENDAR_TODAY`, `CALENDAR_UPCOMING`,
`ACTIVE_ISSUES`, `TODO_ISSUES`, `COMPLETED`, `GMAIL`, `NOTION_FOCUS`, `STANDUP_TEXT`.
These are the only sections Claude should modify.

---

## Workflow Overview

### Phase 1: Gather & Review
1. **Gather data** from all sources (see `references/data-gathering.md`)
2. **Read current priorities** from PM-Hub (`context/priorities.md`)
3. **Compare priorities against live data** — identify:
   - Completed items that should be marked done or removed
   - New blockers surfaced from Linear, Gmail, or Calendar
   - Focus shifts driven by milestone countdowns (M2/M3 days remaining)
   - Issues that have changed state since priorities were last updated
4. **Present a proposed priorities update to Eric** — show what changed and why,
   ask for confirmation or adjustments. Keep this lightweight: some days nothing
   changes, other days approaching milestones reshuffle everything.
5. **Commit updated priorities** to PM-Hub (`context/priorities.md`) and push

### Phase 2: Generate Dashboard
6. **Read template** from PM-Hub (`skills/thriveiep-dashboard/templates/dashboard-template.jsx`)
7. **Classify and sort** events, issues, and tasks
8. **Curate Focus Picks** using the algorithm (see `references/focus-pick-logic.md`) —
   these should now reflect the **updated** priorities, not stale data
9. **Populate** the template data constants with live data
10. **Save as artifact** — write the populated JSX to `/mnt/user-data/outputs/thriveiep-dashboard.jsx` and call `present_files` to render it as an interactive React artifact
11. **Provide** a brief text summary alongside the artifact

## Data Sources

| Source | Tool | What to Fetch |
|--------|------|--------------|
| PM-Hub | bash (git) | skills/thriveiep-dashboard/templates/dashboard-template.jsx, context/priorities.md |
| Linear | Linear MCP | Active issues, completed (last 48h), relations |
| Google Calendar | list_gcal_events | Today + this week |
| Notion Priorities | Notion MCP | "This Week's Focus", "Blockers" sections |
| Notion To-Dos | Notion MCP | Open items from To-Do database |
| Gmail | search_gmail_messages | Unread important, action-needed |
| HubSpot | HubSpot MCP | Pipeline deals, recent activity, stale contacts |

For the complete data-gathering sequence: read `references/data-gathering.md`

## Template Data Sections to Populate

### META
```js
const META = {
  date: "Friday, February 20, 2026",   // today's full date
  weekLabel: "Week of Feb 17",           // current week label
  m2Days: 9,                             // days until M2 (Mar 1)
  m3Days: 23,                            // days until M3 (Mar 15)
};
```

### FOCUS_PICKS
3 items using the Focus Pick algorithm (see `references/focus-pick-logic.md`).
Each has: `icon`, `title`, `source`, `sourceUrl`, `why`.

### CALENDAR_TODAY / CALENDAR_UPCOMING
From Google Calendar. Classify events per `references/event-classification.md`.
Include `zoom` link if present in event description. Include `alert` if there's
a relevant Slack/Gmail note about the event.

### ACTIVE_ISSUES / TODO_ISSUES
From Linear. Active = In Progress. Todo = Todo status, assigned to Eric or team.
Include: `id`, `title`, `priority`, `milestone`, `assignee`, `url`, `due` (if set).

### COMPLETED
Linear issues completed in last 48h. Include: `id`, `title`, `when`.

### GMAIL
From Gmail search. Unread important messages. Include: `from`, `subject`, `preview`, `tag`, `action`.
`tag`: "Action", "FYI", "Test", "Reply". `action: true` if needs response.

### NOTION_FOCUS
From the **updated** `context/priorities.md` "This Week's Focus" section (after Phase 1 review).
Each item: `text`, `done` (boolean). Mark `done: true` if the corresponding Linear issue is completed.

### STANDUP_TEXT
Auto-generated standup based on COMPLETED + today's top priorities.
Format:
```
Yesterday: [completed issues summary]
Today: [top 3 focus items]
Blockers: [None / list]
```

## Dashboard Tabs (defined in template — do not change)

- **Today** — Focus Picks, Calendar, Blockers banner
- **Issues** — In Progress + Todo with checkboxes
- **Notion Focus** — This Week's Focus checklist
- **Gmail** — Unread important messages
- **Standup** — Completed last 48h + copyable standup draft

## Text Summary

In addition to the artifact, provide a brief text summary:
```
Good morning! Here's your dashboard for [date].

**Focus Picks:**
1. [Pick 1 — why it's priority]
2. [Pick 2 — why it's priority]
3. [Pick 3 — why it's priority]

**Calendar:** [N] events today, [notable ones]
**Issues:** [N] active, [N] completed yesterday
**Milestone:** M2 in [N] days
```

For event classification rules: read `references/event-classification.md`
For focus pick algorithm: read `references/focus-pick-logic.md`
For data gathering sequence: read `references/data-gathering.md`
