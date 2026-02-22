---
name: thriveiep-session-handoff
description: >
  Session and knowledge management protocol for ThriveIEP PM Copilot — handles
  deliverable tracking, decision capture, and session continuity. Decisions don't
  just happen in PM Copilot conversations — they happen in meetings, email threads,
  and Slack. This skill applies to all of them. Three responsibilities run
  throughout every conversation:
  (1) Save every deliverable to PM-Hub and link it to a Linear issue immediately.
  (2) Capture decision records when significant decisions are made — whether in
  this conversation or surfaced from meeting transcripts, Gmail, Slack, or calendar notes.
  (3) Write structured handoff notes at session end.
  Use this skill at session START to clone PM-Hub and load context. Use DURING
  sessions whenever you create a file, make a decision, or capture research.
  Use at session END to write handoff notes. Also trigger AFTER the morning
  routine — reviewing Gmail, Slack, and Calendar often surfaces decisions that
  need to be captured. Triggers on: "wrap up", "session notes", "handoff",
  "save session", "what did we cover", "end of session", "let's wrap up",
  starting a new session, referencing previous work, producing any file output,
  or when reviewing external communications that contain decisions or deliverables.
---

# ThriveIEP Session & Knowledge Management Protocol

This skill keeps work traceable and decisions preserved. Every file connects
to a Linear issue so the team can find it. Every significant decision gets
recorded with full reasoning so nobody has to re-litigate it later. Session
handoffs maintain continuity across conversations.

## Reference files

Read these when you need the specific conventions — they contain templates,
tables, and mechanical details that would clutter this file:

| File | Read when... |
|------|-------------|
| `references/file-placement.md` | Saving a deliverable — has the directory mapping table, link conventions, and knowledge note criteria |
| `references/decision-records.md` | Capturing a decision — has the DR template, what qualifies, numbering rules, and Linear integration steps |
| `references/versioning.md` | Creating or updating a deliverable — has changelog format, minor vs major rules, and when to fork |

---

## Part 1: During Session — Deliverables

Every file you create or significantly update gets three things: saved to the
right place in PM-Hub, versioned with a changelog header, and linked to a
Linear issue. This happens at creation time, not at session end — if the
session is interrupted, the work is still traceable.

### Workflow

1. **Save the file** to the correct PM-Hub directory.
   → Read `references/file-placement.md` for the directory mapping.

2. **Add a changelog header** to the file (new files get v1.0, updates get a new row).
   → Read `references/versioning.md` for the format and minor/major rules.

3. **Link to Linear.** Find the relevant THR-XX issue and attach a link.
   → Read `references/file-placement.md` for link conventions and the
   read-append-write pattern for attachments.

4. **If no issue exists:** Ask Eric — "This doesn't map to an existing issue.
   Want me to create one?" If he declines, note it as unlinked in the handoff.

5. **If it's research or exploration** (not tied to a product task): save to
   `knowledge/` instead. No Linear issue needed unless it leads to actionable
   work — then create an issue and update the `Promoted To` column in the
   knowledge INDEX.

6. **Commit and push** after each deliverable. Don't batch to session end.
   Use descriptive messages: `[THR-XX] Add scoring pipeline spec` or
   `[DR-010] Hybrid knowledge management`.

---

## Part 2: At Decision Points — Decision Records

Decisions evaporate. They happen in PM Copilot conversations, but also in
meetings, email threads, Slack discussions, and calls. When a significant
decision is made — or discovered — capture it so the team can answer "why
did we do it this way?" months later without re-litigating.

### Sources of decisions

Decisions surface from multiple channels. Watch for them in all of these:

- **This conversation** — the most obvious case
- **Morning routine** — Gmail, Slack, and Calendar review often reveals
  decisions that were made asynchronously (e.g., Elizabeth confirming scope
  in an email, Soham proposing an architecture change in Slack)
- **Meeting transcripts** — decisions made verbally in standups, stakeholder
  calls, or planning sessions
- **Email threads** — especially with external partners (NLU, Prepare to Bloom)
- **Slack threads** — team discussions that reach a conclusion

After the morning routine is a natural moment to scan for decisions that
need capturing. If something DR-worthy surfaces during Gmail/Slack/Calendar
review, flag it immediately rather than waiting.

### Workflow

1. **Recognize it.** Watch for architecture choices, scope decisions, process
   changes, compliance decisions, assessment design choices, or prioritization
   that defers something significant.

2. **Flag it:** "That's a DR-worthy decision. Want me to capture it?" Or just
   capture it if the pattern is clear and Eric has given general consent.
   For decisions found in external sources, summarize what you found and
   confirm with Eric before creating the DR.

3. **Draft, save, link.**
   → Read `references/decision-records.md` for the template, numbering, file
   location, and Linear integration steps.
   For external decisions, note the source in the DR's Source field (e.g.,
   "Email thread between Elizabeth and NLU, 2026-02-20" or "Slack #dev
   discussion, 2026-02-19").

4. **Mention in conversation:** "Captured as DR-XXX, linked to THR-XX."

---

## Part 3: Session Start

When starting a new session or when Eric references previous work:

1. Get GitHub token from memory edits.
2. Clone PM-Hub: `git clone https://<token>@github.com/Eric-Thrive/PM-Hub.git`
3. Read `sessions/handoff.md` for context.
4. Note any "Pickup for next session" items and proactively mention them.
5. If token is missing or expired, ask Eric for a fresh one.

---

## Part 4: Session End

### Pre-close checklist

Before writing handoff notes, verify:
- [ ] All deliverables saved to correct PM-Hub directory
- [ ] All deliverables have changelog headers
- [ ] All deliverables linked to Linear issues (or noted as unlinked with reason)
- [ ] Decisions captured as DRs (or flagged as not DR-worthy)
- [ ] Research/exploration in `knowledge/` if worth preserving
- [ ] Work product log updated for significant deliverables
- [ ] All PM-Hub changes committed and pushed

### Write session entry

```markdown
## Session N — YYYY-MM-DD (Brief Descriptive Title)
**Focus:** One-line summary

**What we did:**
- Accomplishment with specifics (issue numbers, file names)

**Key decisions:**
- Decision and rationale (DR-XXX if captured)

**Artifacts produced:**
- File — PM-Hub path (Linear: THR-XX)

**Knowledge captured:**
- KB-XXX: Topic (if any)

**Pickup for next session:**
- Next steps, pending items, blockers
```

### Rolling window

Keep 5 most recent sessions. When adding a new one, drop the oldest and
condense the second-oldest to 2-3 lines.

### Save

1. Update `sessions/handoff.md`
2. Update `logs/work-product-log.md` if significant deliverables were produced
3. Commit: `[Session N] Brief description`
4. Push to origin/main

---

## Edge cases

- **Short conversations** (quick questions, single lookups): no handoff needed
- **Multi-topic sessions**: use the most impactful topic for the title
- **Interrupted sessions**: write what was accomplished, note the interruption
- **Eric declines to create an issue**: note the unlinked deliverable in handoff
