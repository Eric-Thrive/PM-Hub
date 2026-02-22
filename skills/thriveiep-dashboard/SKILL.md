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

This skill has **3 gated phases**. Complete each phase fully before advancing.
Skipping steps produces an incomplete or misleading dashboard.

## Phase 1: Gather Data

Fetch from every source below. After fetching, fill in the verification
checklist. Do NOT proceed to Phase 2 until every required source shows ✅.

Read `references/data-gathering.md` for the detailed protocol, calendar IDs,
query syntax, and classification rules for each source.

### Source checklist

After gathering, confirm each source inline using this format:

```
## Gather Verification
- [x] Dates computed (today, week label, M2 days, M3 days)
- [x] PM-Hub priorities read (context/priorities.md)
- [x] Linear: In Progress issues fetched
- [x] Linear: Todo issues fetched
- [x] Linear: Done last 48h fetched
- [x] Calendar: eric@thriveiep.com fetched
- [x] Calendar: falkeeric@gmail.com fetched
- [x] Calendar: efalkemit@gmail.com fetched (or noted empty)
- [x] Calendar: dremilyinglesi@gmail.com fetched (or noted empty)
- [x] Gmail: unread important + primary fetched
- [x] Slack: #general and #thriveiep-dev last 24h checked
- [x] HubSpot: pipeline + recent activity fetched
- [ ] Notion To-Dos: open items fetched   ← OPTIONAL, skip if tool errors
```

**Required sources** (mark ✅ or ⚠️ with reason):
Dates, PM-Hub, Linear (all 3 queries), Calendar (eric@thriveiep.com at minimum),
Gmail, HubSpot.

**Best-effort sources** (mark ✅ or ⏭️ skipped):
Personal/MIT/Emily calendars, Slack, Notion To-Dos.

If a required source fails, note the error and retry once. If it fails again,
mark ⚠️ and proceed — but flag it in the dashboard text summary so Eric knows.

If HubSpot returns no data or errors, set networking status to "unknown" and
note it in the text summary. Do not silently omit the networking nudge logic.

---

## ⛔ GATE: Phase 1 → Phase 2

Before proceeding, confirm:
1. The verification checklist above is filled in (in your response text)
2. All required sources show ✅ or ⚠️ with explanation
3. You have enough data to compare against priorities

---

## Phase 2: Review Priorities (requires Eric's input)

This phase compares live data against `context/priorities.md` and proposes
updates. **Present findings to Eric and wait for confirmation before Phase 3.**

### Steps

1. Read `context/priorities.md` from PM-Hub
2. Compare against live Linear data — identify:
   - Items marked done in Linear but still unchecked in priorities
   - New blockers surfaced from Linear, Gmail, Slack, or Calendar
   - Focus shifts driven by milestone countdowns
   - Issues that changed state since priorities were last updated
3. **Present a lightweight update proposal to Eric:**
   - What changed and why
   - Proposed additions/removals to "This Week's Focus"
   - Any new blockers to flag
   - If nothing changed, say so — some days are stable
4. Wait for Eric's response (approval, edits, or "skip")
5. If approved: update `context/priorities.md`, commit and push to PM-Hub
6. If "skip": proceed with current priorities as-is

### Focus Pick curation

After priorities are confirmed (or skipped), curate 3 Focus Picks using the
algorithm in `references/focus-pick-logic.md`. These must reflect the
**updated** priorities, not stale data.

---

## ⛔ GATE: Phase 2 → Phase 3

Do NOT proceed to Phase 3 until Eric has responded to the priorities review.
If Eric says "skip" or "just show me the dashboard", that counts as approval
to proceed with current priorities.

---

## Phase 3: Render Dashboard

### Template: v3 dark-theme (canonical)

The template is ~500 lines. It uses inline styles, a dark color scheme, tiered
issue accordions, a clickable calendar grid, Notion To-Dos accordion, and an
embedded Claude chat sidebar. **Do not redesign or restyle.** (See DR-003.)

### Rendering strategy (avoids truncation)

```bash
# 1. Copy template to output location
cp /home/claude/PM-Hub/skills/thriveiep-dashboard/templates/dashboard-template.jsx \
   /mnt/user-data/outputs/thriveiep-dashboard.jsx
```

Then use `str_replace` to swap each data constant one at a time. The v3
template uses these data blocks between `// ─── DATA` and `// ─── END DATA ───`:

| Constant | Shape | Notes |
|----------|-------|-------|
| `ISSUES_INITIAL` | `[{ id, title, status, priority, due, project, labels }]` | All active Linear issues |
| `COMPLETED_INITIAL` | `[{ id, title, completedAt }]` | Done in last 48h |
| `EVENTS` | `[{ day: 0-6, time, end, name, type, loc? }]` | Calendar events, day 0 = Sunday |
| `NOTION_TODOS` | `[{ title, status, assign, due, url }]` | From priorities checklist |
| `FOCUS_PICKS` | `[{ id, title, reason, project, tag, due }]` | 3 curated picks |
| `DAYS` | `["Sun DD", "Mon DD", ...]` | 7 entries for the week |
| `TODAY` | `new Date("YYYY-MM-DDT12:00:00")` | Current date |

Each `str_replace` targets from `const NAME = ` through the closing `];` or `)`.

Also update:
- The comment line: `// ─── DATA (LIVE - February 22, 2026) ───` → today's date
- The header subtitle: `Week of Feb 22 – 28, 2026` → current week
- Milestone countdown values (M2 days, M3 days) in the countdown section
- Chat system prompt date in `sendChat`

**Event type mapping:** Use these `type` values that match `TYPE_COLORS`:
`team`, `client`, `tutoring`, `work`, `gtm`, `personal`

**Issue priority values:** `Urgent`, `High`, `Medium`, `Normal`, `Low`
(maps to tier logic: Urgent → overdue, High → thisWeek, etc.)

### After rendering

1. Call `present_files` on `/mnt/user-data/outputs/thriveiep-dashboard.jsx`
   — this renders it as an interactive React artifact in the chat
2. Provide a brief text summary (see format below)

### Text summary format

```
Good morning! Here's your dashboard for [date].

**Focus Picks:**
1. [Pick 1 — why it's priority]
2. [Pick 2 — why it's priority]
3. [Pick 3 — why it's priority]

**Calendar:** [N] events today, [notable ones]
**Issues:** [N] active, [N] todo, [N] completed last 48h
**Milestone:** M2 in [N] days, M3 in [N] days
**Networking:** [status — healthy / nudge needed / unknown]
[⚠️ Data gaps: list any sources that failed, if any]
```

---

## Data Source Reference

| Source | Tool | Required? | What to Fetch |
|--------|------|-----------|---------------|
| PM-Hub | bash (git) | ✅ Yes | templates/dashboard-template.jsx (v3 dark-theme), context/priorities.md |
| Linear | Linear MCP | ✅ Yes | In Progress, Todo, Done (last 48h) |
| Google Calendar | list_gcal_events | ✅ Yes (work cal) | Today + this week, all 4 calendars |
| Gmail | search_gmail_messages | ✅ Yes | Unread important + primary |
| HubSpot | HubSpot MCP | ✅ Yes | Pipeline deals, recent activity |
| Slack | Slack MCP | Best-effort | #general, #thriveiep-dev last 24h |
| Notion To-Dos | Notion MCP | Optional | Open items from To-Do database |

For detailed query syntax and calendar IDs: read `references/data-gathering.md`
For event classification rules: read `references/event-classification.md`
For focus pick algorithm: read `references/focus-pick-logic.md`
