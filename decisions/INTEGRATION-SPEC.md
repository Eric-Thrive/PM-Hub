# Linear ↔ PM-Hub Integration Spec

## Problem

Decisions made in PM conversations evaporate. Linear tracks *what* we're doing but not *why* we decided to do it that way. Six months from now, nobody can answer "why did we choose Aptible?" or "why is licensing deferred?" without re-litigating from scratch.

## Solution

Two systems, one integration pattern:

```
Linear (tactical spine)          PM-Hub (knowledge store)
┌─────────────────────┐         ┌─────────────────────────┐
│ THR-52              │         │ decisions/               │
│ Status: Done        │         │   DR-007--aptible.md     │
│ Assignee: Soham     │  link   │     Context              │
│ Priority: High      │ ──────► │     Decision             │
│ Links:              │         │     Alternatives          │
│   📎 DR-007         │         │     Consequences          │
│   📎 FERPA analysis │         │     Related: THR-52 ◄────┤
└─────────────────────┘         └─────────────────────────┘
```

Linear holds status, assignments, priority. PM-Hub holds reasoning, alternatives, context. They cross-reference each other.

---

## Integration Touchpoints

### 1. Linear → PM-Hub (link attachments on issues)

**Mechanism:** Linear's link attachment feature. Each issue can carry named URLs pointing to PM-Hub files.

**URL pattern:**
```
https://github.com/Eric-Thrive/PM-Hub/blob/main/decisions/DR-XXX--slug.md
```

**When to add links:**
- When a DR is created that relates to an existing issue
- When a spec or research doc in PM-Hub is produced for an issue
- When closing an issue that involved a non-obvious decision

**Link title convention:**
```
📋 DR-007: Aptible for FERPA/HIPAA hosting
📄 Spec: FERPA compliance architecture
📊 Research: Scoring approach analysis
```

Emoji prefix makes the link type scannable in Linear's UI.

### 2. PM-Hub → Linear (issue references in decision records)

**Mechanism:** `Issues:` field in the DR frontmatter. Plain text references like `THR-52, THR-108`.

**Why not hyperlinks?** Linear issue URLs are workspace-specific and long. `THR-52` is grep-friendly, readable, and Linear's MCP tools can look up any issue by identifier. If someone reading the DR on GitHub wants to check Linear, they search `THR-52`.

### 3. INDEX.md → Linear (discovery layer)

The INDEX.md includes an `Issues` column. This enables:
- "What decisions relate to THR-52?" → grep INDEX.md
- "What decisions relate to compliance?" → scan tags column
- PM copilot reads INDEX at session start, cross-references against active Linear issues

---

## Workflow: Creating a Decision Record

This is what happens during a conversation when a decision is made:

```
1. Eric and Claude work through a problem
2. Decision is reached
3. Claude says: "That's a DR-worthy decision. Want me to capture it?"
4. Eric: "Yes" (or Claude just does it if the pattern is clear)
5. Claude:
   a. Drafts the DR file (context, decision, alternatives, consequences)
   b. Adds entry to INDEX.md
   c. Commits to PM-Hub
   d. Adds link attachment to relevant Linear issue(s)
   e. Mentions in conversation: "Captured as DR-009, linked to THR-52"
```

**Step 5d in detail — adding the link to Linear:**

```
Linear:update_issue(
  id: "<issue-uuid>",
  links: [{
    url: "https://github.com/Eric-Thrive/PM-Hub/blob/main/decisions/DR-009--slug.md",
    title: "📋 DR-009: Decision title here"
  }]
)
```

**Important:** The `links` parameter on `update_issue` **replaces** existing links. So the workflow is:
1. `get_issue` to read existing links
2. Append the new link to the existing list
3. `update_issue` with the full list

---

## Workflow: Checking Decisions at Session Start

```
1. Clone PM-Hub, read handoff.md (existing workflow)
2. Read decisions/INDEX.md
3. If today's work touches issues referenced in existing DRs:
   - Note the relevant decisions
   - Don't re-litigate settled questions
   - Reference DR-XXX when the decision is relevant
4. If context has changed that might invalidate a DR:
   - Flag it: "DR-007 assumed Aptible, but [new info]. Should we revisit?"
```

---

## Workflow: Finding a Decision

**From Linear (team member looking at an issue):**
THR-52 → see link attachment → click → reads DR-007 on GitHub

**From PM-Hub (searching for why):**
Open INDEX.md → scan by product, tags, or issues column → click through to DR

**From conversation (Claude looking up context):**
```bash
grep -i "scoring" PM-Hub/decisions/INDEX.md
# or
grep -rl "THR-52" PM-Hub/decisions/
```

---

## What Gets a Decision Record

**Always:**
- Architecture or infrastructure choices (hosting, database, framework)
- Product scope decisions (what's in/out of MVP, feature cuts)
- Process or tooling changes (how we work, what tools we use)
- Compliance-related choices (FERPA, HIPAA, data handling)
- Assessment design choices (instrument selection, scoring methodology)

**Never:**
- Bug fixes (just close the issue)
- Routine task completion
- Meeting scheduling
- Opinions that aren't binding decisions

**Judgment call:**
- Prioritization choices (usually yes if it means deferring something significant)
- UX decisions (yes if it affects user-facing behavior at scale)
- Team process tweaks (yes if it changes how people work)

---

## Labels

Add a `decision-record` label in Linear. Apply it to any issue that has a linked DR. This enables:
- Filtering: "Show me all issues with documented decision rationale"
- Audit: "Which major issues lack decision documentation?"

---

## Non-Goals

- **Automated sync** — No webhook or bot. Claude adds links during conversations. Manual is fine at this team size.
- **Bidirectional embedding** — We don't embed Linear issue details in DRs or DR content in Linear descriptions. Cross-reference via links and IDs.
- **DR approval workflow** — Eric approves in conversation. No PR review process needed for a 3-person team.
- **Backfill** — Start forward-only. Backfill old decisions opportunistically when they come up in conversation, not as a dedicated project.

---

## File Locations

| Artifact | Location |
|----------|----------|
| Decision records | `PM-Hub/decisions/DR-XXX--slug.md` |
| Index | `PM-Hub/decisions/INDEX.md` |
| Template | `PM-Hub/decisions/TEMPLATE.md` |
| This spec | `PM-Hub/decisions/INTEGRATION-SPEC.md` |
| Linear workflow conventions | `PM-Hub/context/linear-workflow.md` |

---

## Open Questions

1. ~~**Link replacement risk:**~~ **RESOLVED.** Tested on THR-52. `get_issue` returns existing links in `attachments[]`. The read-append-write pattern works. Each attachment has `id`, `title`, `url`.

2. **GitHub private repo visibility:** Soham and Elizabeth need GitHub access to PM-Hub for links to work. Confirm they've been invited.

3. **DR numbering gaps:** If a DR is retracted, do we leave the gap or renumber? Recommendation: leave the gap (same as deleted Linear issues keep their IDs).

---

*Created: 2026-02-22. Author: Eric + PM Copilot.*
