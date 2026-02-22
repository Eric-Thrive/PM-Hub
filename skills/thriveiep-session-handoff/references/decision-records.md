# Decision Record Reference

## DR template

Use this structure when creating a new decision record:

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

## File location

- Files: `decisions/DR-XXX--slug.md`
- Index: `decisions/INDEX.md`
- Template: `decisions/TEMPLATE.md`

## Numbering

Check `decisions/INDEX.md` for the next available number. Never reuse numbers.
If a DR is retracted, leave the gap.

## What gets a decision record

**Always:**
- Architecture or infrastructure choices
- Product scope decisions (what's in/out)
- Process or tooling changes
- Compliance-related choices
- Assessment design choices (instruments, scoring, methodology)
- Prioritization that defers something significant

**Never:**
- Bug fixes
- Routine task completion
- Meeting scheduling
- Opinions that aren't binding decisions

**Judgment call:**
- Prioritization choices (usually yes if it defers something significant)
- UX decisions (yes if it affects user-facing behavior at scale)
- Team process tweaks (yes if it changes how people work)

## Linear integration

After saving a DR to PM-Hub:
1. Add `📋 DR-XXX: Title` link attachment to all related Linear issues
2. Apply `decision-record` label to those issues
3. Mention in conversation: "Captured as DR-XXX, linked to THR-XX."
