---
name: thriveiep-dashboard
description: >
  Generate Eric's ThriveIEP morning dashboard as an interactive React artifact.
  Fetches live data from PM-Hub, Linear, Google Calendar, Gmail, and HubSpot.
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

## Workflow Overview

1. **Gather data** from all sources (see `references/data-gathering.md`)
2. **Classify and sort** events, issues, and tasks
3. **Curate Focus Picks** using the algorithm (see `references/focus-pick-logic.md`)
4. **Render** an interactive React artifact with tabs and persistent state
5. **Provide** a text summary alongside the artifact

## Data Sources

| Source | Tool | What to Fetch |
|--------|------|---------------|
| PM-Hub Priorities | Terminal (read file) | "This Week's Focus", "Blockers" from `context/priorities.md` |
| Linear | Linear MCP | Active issues, completed (last 48h), relations |
| Google Calendar | list_gcal_events | 4 calendars, week view |
| Notion To-Dos | Notion MCP | Open items from To-Do database |
| Gmail | search_gmail_messages | Unread important, action-needed |
| HubSpot | HubSpot MCP | Pipeline deals, recent activity, stale contacts |

For the complete data-gathering sequence: read `references/data-gathering.md`

## Dashboard Tabs

The artifact renders as a tabbed React component:

### Today (Default Tab)
- **Focus Picks** (3 items): Curated highest-priority actions
- **Calendar**: Today + tomorrow's schedule, classified by type
- **Milestone Countdown**: Days remaining to M2, M3
- **Gmail Highlights**: Unread important messages needing action
- **Networking Nudge**: If 5+ days since last HubSpot outreach

### Issues
- Active issues sorted by product weight × priority
- Recently completed (last 48h) for standup context
- Blocked issues highlighted

### Documents & Artifacts
- Project → document tree from Work Product Log
- Status indicators (current / draft / superseded)
- Links to source (PM-Hub / Linear)

### Dependencies
- Critical path graph for current milestone
- Blocked-by / blocks relations from Linear
- Visual directed graph with status coloring

### Pipeline & Networking
- HubSpot deal pipeline by stage
- Stale contacts (no outreach in 5+ days)
- Suggested outreach actions
- Recent activity feed

### Team (Shared View)
- Per-person work cards (from Linear "In Progress")
- Milestone burndown bars
- Shared calendar (team meetings only)
- Uses `window.storage` with `shared: true`

## Artifact Design

The React artifact should include:
- **Checkboxes** on all actionable items (focus picks, issues, to-dos, gmail)
- **Strikethrough/dim** on checked items
- **Sticky action bar**: "Copy Checked", "Copy All", "Clear All"
- **Toast notifications** on copy
- **Persistent state** via `window.storage.set('dashboard-YYYY-MM-DD', state)`
- **Tailwind styling** with clean, professional look
- **Tab navigation** across all sections

For event classification rules: read `references/event-classification.md`
For focus pick algorithm: read `references/focus-pick-logic.md`
For data gathering sequence: read `references/data-gathering.md`

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
