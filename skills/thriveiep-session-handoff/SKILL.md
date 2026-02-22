---
name: thriveiep-session-handoff
description: >
  Session management protocol for ThriveIEP PM Copilot. Three responsibilities:
  (1) DURING sessions: link every deliverable (file, spec, DR) to its Linear issue
  at creation time — if no issue exists, ask Eric before creating one.
  (2) AT DECISION POINTS: capture decision records when significant decisions are made.
  (3) AT SESSION END: write structured handoff notes to PM-Hub.
  Also use at session START to clone PM-Hub and read previous handoff notes.
  Triggers on: "wrap up", "session notes", "handoff", "save session",
  "what did we cover", "check the last session", "end of session", or when
  starting a new session that references previous work. Also trigger when Eric
  says "let's wrap up" or when a conversation has produced significant deliverables
  and is winding down. Maintains a rolling 5-session window in PM-Hub.
---

# ThriveIEP Session & Knowledge Management Protocol

This skill ensures three things: deliverables are always traceable to Linear issues,
decisions are captured with full reasoning, and session continuity is maintained.

---

## Part 1: During Session — Deliverable & Knowledge Tracking

### Every deliverable gets linked

Whenever you create or significantly update a file (spec, analysis, template, data file,
skill, DR, knowledge note), immediately:

1. **Identify the relevant Linear issue.** Check if the work relates to an existing THR-XX.
2. **If issue exists:** Add a link attachment to the issue.
   - `get_issue` → read existing links → append new link → `update_issue`
   - Link title convention:
     - `📋 DR-XXX: Title` for decision records
     - `📄 Spec: Title` for specs and design docs
     - `📊 Research: Title` for analysis and research
     - `📁 File: filename` for other deliverables
   - URL: `https://github.com/Eric-Thrive/PM-Hub/blob/main/path/to/file.md`
3. **If no issue exists:** Ask Eric: "This doesn't map to an existing issue. Want me to create one?"
   - If yes: create issue following Linear conventions, then attach the link.
   - If no: note it in the session handoff as an unlinked deliverable.
4. **If the work is general research/exploration** (not tied to a product task):
   - Write to `knowledge/KB-XXX--slug.md` in PM-Hub
   - Add entry to `knowledge/INDEX.md`
   - No Linear issue needed unless it leads to actionable work
   - If it does lead to action: create a Linear issue, update the `Promoted To` column

### Knowledge capture criteria

**Goes to `knowledge/`:**
- Tool evaluations (e.g., "Claude Code workflow patterns")
- Research on approaches or technologies
- Reference material worth revisiting
- Exploratory analysis that isn't a decision

**Does NOT need knowledge capture:**
- Quick factual lookups
- Routine task discussion
- Anything already captured as a DR or in a spec

---

## Part 2: At Decision Points — Decision Record Capture

### Recognizing a DR-worthy decision

Watch for decisions that meet ANY of these criteria:
- Architecture or infrastructure choices
- Product scope decisions (what's in/out)
- Process or tooling changes
- Compliance-related choices
- Assessment design choices (instruments, scoring, methodology)
- Prioritization that defers something significant

### Capture workflow

When a decision is reached:

1. **Flag it:** "That's a DR-worthy decision. Want me to capture it?"
   (Or just capture it if the pattern is obvious and Eric has given general consent.)

2. **Draft the DR** using this template structure:
   ```markdown
   # DR-XXX: [Decision as clear statement]

   **Date:** YYYY-MM-DD
   **Status:** Accepted
   **Product:** C2A | Accommodation Engine | PI Redactor | General
   **Issues:** THR-XX, THR-XX

   ## Context
   What situation prompted this decision? Constraints, deadlines, stakeholder needs.

   ## Decision
   What we chose and why.

   ## Alternatives Considered
   - **[Option A]** — Why rejected
   - **[Option B]** — Why rejected

   ## Consequences
   What this enables. What it constrains. What follow-on work it creates.

   ## Related Decisions
   - Builds on / Supersedes / Constrains: DR-XXX

   ## Related Artifacts
   - [Document name](PM-Hub path or link)

   ## Source
   Conversation date and brief description.
   ```

3. **Save to PM-Hub:**
   - File: `decisions/DR-XXX--slug.md`
   - Update `decisions/INDEX.md`
   - Commit with message: `[DR-XXX] Decision title`

4. **Link to Linear** (using the deliverable linking workflow from Part 1):
   - Add `📋 DR-XXX: Title` link attachment to all related issues
   - Apply `decision-record` label to those issues

5. **Mention in conversation:** "Captured as DR-XXX, linked to THR-XX."

### DR numbering

Check `decisions/INDEX.md` for the next available number. Never reuse numbers.
If a DR is retracted, leave the gap.

---

## Part 3: Session Start Protocol

When starting a new session or when Eric references previous work:

1. Get GitHub token from memory edits
2. Clone PM-Hub: `git clone https://<token>@github.com/Eric-Thrive/PM-Hub.git`
3. Read `sessions/handoff.md` for context
4. Note any "Pickup for next session" items and proactively mention them
5. If token is missing/expired: ask Eric for a fresh one

---

## Part 4: Session End Protocol

When wrapping up a substantive session:

### 1. Pre-close checklist

Before writing handoff notes, verify:
- [ ] All deliverables created this session are linked to Linear issues
- [ ] Any decisions made are captured as DRs (or flagged as not DR-worthy)
- [ ] Any research/exploration is in `knowledge/` if worth preserving
- [ ] Work product log is updated for significant deliverables

### 2. Write Session Entry

Use this exact format:

```markdown
## Session N — YYYY-MM-DD (Brief Descriptive Title)
**Focus:** One-line summary of the session's main thread

**What we did:**
- Accomplishment 1 with specific details (issue numbers, file names)
- Accomplishment 2
- Accomplishment 3

**Key decisions:**
- Decision 1 and rationale (DR-XXX if captured)
- Decision 2 and rationale

**Artifacts produced:**
- File/document name — brief description (Linear: THR-XX | PM-Hub path)
- Commit hash or Linear comment reference where applicable

**Knowledge captured:**
- KB-XXX: Topic (if any research/exploration was documented)

**Pickup for next session:**
- Most important next step
- Other pending items
- Any blockers or dependencies to track
```

### 3. Maintain Rolling Window

Keep only the 5 most recent sessions. When adding Session N:
- If there are already 5 entries, drop the oldest one
- Condense the second-oldest to a brief 2-3 line summary
- The most recent 2-3 sessions get full detail

### 4. Save to PM-Hub

1. Update `sessions/handoff.md` in the cloned PM-Hub repo
2. Update `logs/work-product-log.md` if significant deliverables were produced
3. Commit: `[Session N] Brief description`
4. Push to origin/main

## Session Numbering

Sessions are numbered sequentially. Check the most recent entry in
`sessions/handoff.md` to determine the next number.

## Edge Cases

- **Short conversations** (quick questions, single lookups): No handoff needed
- **Multi-topic sessions**: Use the most impactful topic for the title
- **Interrupted sessions**: Write what was accomplished; note the interruption point
- **No Linear issue and Eric declines to create one**: Note the unlinked deliverable in handoff
