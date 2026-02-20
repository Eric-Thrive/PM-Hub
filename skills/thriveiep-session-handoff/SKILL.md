---
name: thriveiep-session-handoff
description: >
  Session handoff protocol for ThriveIEP PM Copilot sessions. Use at the END
  of substantive conversations to write structured session notes to Notion.
  Also use at session START to fetch and read previous handoff notes for context.
  Triggers on: "wrap up", "session notes", "handoff", "save session",
  "what did we cover", "check the last session", "end of session", or when
  starting a new session that references previous work. Also trigger when Eric
  says "let's wrap up" or when a conversation has produced significant deliverables
  and is winding down. Maintains a rolling 5-session window in Notion.
---

# ThriveIEP Session Handoff Protocol

This skill ensures continuity between PM Copilot sessions. Every substantive
session gets documented so the next session can pick up without context loss.

## Session Start Protocol

When starting a new session or when Eric references previous work:

1. Fetch the Session Handoff Notes page: `3094659c-b96d-81d1-be9a-ecbdb9e9aee2`
2. Read the most recent entry for context
3. Note any "Pickup for next session" items and proactively mention them
4. If Eric says "check the last session" — fetch and summarize the latest entry

## Session End Protocol

When wrapping up a substantive session:

### 1. Write Session Entry

Use this exact format:

```markdown
## Session N — YYYY-MM-DD (Brief Descriptive Title)
**Focus:** One-line summary of the session's main thread

**What we did:**
- Accomplishment 1 with specific details (issue numbers, file names)
- Accomplishment 2
- Accomplishment 3

**Key decisions:**
- Decision 1 and rationale
- Decision 2 and rationale

**Artifacts produced:**
- File/document name — brief description (location: Notion/GitHub/Linear)
- Commit hash or Linear comment reference where applicable

**Pickup for next session:**
- Most important next step
- Other pending items
- Any blockers or dependencies to track
```

### 2. Maintain Rolling Window

Keep only the 5 most recent sessions. When adding Session N:
- If there are already 5 entries, drop the oldest one
- Condense the second-oldest to a brief 2-3 line summary
- The most recent 2-3 sessions get full detail

### 3. Update Work Product Log (for significant deliverables)

If the session produced significant deliverables (specs, data files, design docs),
also add an entry to the Work Product Log:
- Notion database: `3094659cb96d816eb4a4fad4d3482a6d`
- Include: title, description, date, related Linear issues, location

### 4. Push to GitHub (if artifacts were created)

If structured artifacts were created or updated during the session:
1. Eric provides GitHub token (ask if not already provided)
2. Clone/pull PM-Hub repo
3. Add/update files in appropriate directory
4. Commit with Linear issue reference: `[THR-XXX] Brief description`
5. Push to origin/main
6. Note committed files in the session handoff entry

## Session Numbering

Sessions are numbered sequentially. Check the most recent entry to determine
the next number. If the page shows "Session 22", the next entry is "Session 23".

## Edge Cases

- **Short conversations** (quick questions, single lookups): No handoff needed
- **Multi-topic sessions**: Use the most impactful topic for the title; list all
  topics in "What we did"
- **Interrupted sessions**: Write what was accomplished; note the interruption
  point in "Pickup for next session"
- **Token rotation**: If GitHub token was provided this session, note that it
  was used (but never record the token itself)
