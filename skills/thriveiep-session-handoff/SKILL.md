---
name: thriveiep-session-handoff
description: >
  Session handoff protocol for ThriveIEP PM Copilot sessions. Use at the END
  of substantive conversations to write structured session notes to PM-Hub (GitHub).
  Also use at session START to clone PM-Hub and read previous handoff notes.
  Triggers on: "wrap up", "session notes", "handoff", "save session",
  "what did we cover", "check the last session", "end of session", or when
  starting a new session that references previous work. Also trigger when Eric
  says "let's wrap up" or when a conversation has produced significant deliverables
  and is winding down. Maintains a rolling 5-session window in PM-Hub.
---

# ThriveIEP Session Handoff Protocol

This skill ensures continuity between PM Copilot sessions. Every substantive
session gets documented so the next session can pick up without context loss.

## Session Start Protocol

When starting a new session or when Eric references previous work:

1. Get GitHub token from memory edits
2. Clone PM-Hub: `git clone https://<token>@github.com/Eric-Thrive/PM-Hub.git`
3. Read `sessions/handoff.md` for context
4. Note any "Pickup for next session" items and proactively mention them
5. If token is missing/expired: ask Eric for a fresh one
6. If no token available: fetch Notion fallback `3094659c-b96d-81d1-be9a-ecbdb9e9aee2`

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
- File/document name — brief description (location: PM-Hub/Linear)
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

### 3. Save to PM-Hub

1. Update `sessions/handoff.md` in the cloned PM-Hub repo
2. Commit: `[Session N] Brief description`
3. Push to origin/main

### 4. Update Work Product Log (for significant deliverables)

If the session produced significant deliverables (specs, data files, design docs),
also update `logs/work-product-log.md` in PM-Hub with:
- Date
- What was created/updated
- What changed and why
- Key decisions
- Open threads

Commit together with the handoff update.

## Session Numbering

Sessions are numbered sequentially. Check the most recent entry in
`sessions/handoff.md` to determine the next number.

## Edge Cases

- **Short conversations** (quick questions, single lookups): No handoff needed
- **Multi-topic sessions**: Use the most impactful topic for the title; list all
  topics in "What we did"
- **Interrupted sessions**: Write what was accomplished; note the interruption
  point in "Pickup for next session"
- **No GitHub token**: Fall back to Notion `3094659c-b96d-81d1-be9a-ecbdb9e9aee2`
  for both read and write. Note in the entry that it needs syncing to PM-Hub.
