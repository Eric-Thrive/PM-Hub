---
name: thriveiep-linear
description: >
  ThriveIEP Linear issue management conventions. Use when creating, updating,
  or triaging Linear issues. Includes naming conventions, required fields,
  milestone alignment, label taxonomy, state management rules, and the
  search-before-create guardrail. Also use when discussing sprint planning,
  issue decomposition, or status updates. Triggers on: "create an issue",
  "add to Linear", "THR-", "sprint", "backlog", issue triage, milestone planning,
  or when referencing Linear workflow states. Use this skill even for casual
  mentions of issues or when Eric asks about issue status or prioritization.
---

# ThriveIEP Linear Conventions

These conventions ensure consistent issue management across the team.
Following them prevents duplicate issues, malformed tickets, and priority drift.

## The Golden Rule: Search Before Creating

ALWAYS search Linear for existing or related issues before creating a new one.
Use `Linear:list_issues` with relevant keywords. Check both active and backlog.
If a related issue exists, update it or create a sub-issue rather than a duplicate.

## Issue Creation

### Required Fields
Every new issue must have:
- **Title:** Action-oriented, starts with a verb. Add `[C2A]` prefix when context
  disambiguation is needed.
- **State:** Default to `Backlog` unless actively starting work
- **Priority:** See priority mapping below
- **Assignee:** Usually Eric unless explicitly delegated
- **Project:** One of the four product projects (see pm-core milestones)

### Optional Fields
- **Due date:** Only when there's an actual deadline
- **Estimate:** 1-5 scale (1=trivial, 5=epic)
- **Milestone:** M1-M5 when tied to NLU contract deliverables
- **Labels:** See label taxonomy below
- **Parent issue:** For sub-tasks of a larger epic

### Naming Examples

Good:
- `Implement T-score normalization for ADEXI`
- `[C2A] Build profile generation engine`
- `Fix FERPA consent flow redirect`

Bad:
- `Normalization stuff`
- `Work on profiles`
- `Bug`

## Priority Mapping

| Priority | Meaning | When to Use |
|----------|---------|------------|
| 1 (Urgent) | Blocking other work or a deadline | Active blockers, production issues |
| 2 (High) | Critical path for current milestone | M2/M3 deliverables, 1-2 week horizon |
| 3 (Normal) | Important but not time-critical | Planned work, next sprint |
| 4 (Low) | Nice to have, backlog material | Tech debt, future enhancements |
| 0 (None) | Not yet triaged | Newly created, needs prioritization |

## State Management

| State | Meaning | Rules |
|-------|---------|-------|
| Backlog | Defined but not yet ready to work | Default for new issues. Use generously. |
| Todo | Ready to start, all prerequisites met | Move here only when actually ready |
| In Progress | Actively being worked on | Only 2-3 items per person at a time |
| In Review | Awaiting review or feedback | Elizabeth review, code review, etc. |
| Done | Completed and verified | Move here when fully finished |
| Cancelled | Won't do | Add a comment explaining why |

**Key rule:** Backlog → Todo only when prerequisites are met and the work is
genuinely next up. Don't use Todo as a second backlog.

## Label Taxonomy

| Label | Use For |
|-------|---------|
| bug | Defects, broken behavior |
| feature | New functionality |
| tech-debt | Refactoring, cleanup, infrastructure |
| documentation | Specs, design docs, READMEs |
| compliance | FERPA, privacy, security |
| licensing | Instrument licensing, legal |
| blocked | Waiting on external dependency |

## Milestone Alignment

| Milestone | Target Date | Key Issues |
|-----------|------------|------------|
| M1 | Feb 15, 2026 | ✅ Complete |
| M2 | Mar 1, 2026 | Assessment MVP — survey UI, data pipeline, T1 administration |
| M3 | Mar 15, 2026 | Profile generation (THR-22), normalization (THR-197) |
| M4 | Mar 31, 2026 | Recommendations engine, coach view |
| M5 | Apr 30, 2026 | Admin dashboard, scaling to 750 |

## Issue Decomposition

When an issue is too large (estimate > 3), decompose it:
1. Create the parent issue as an epic
2. Break into sub-issues, each with estimate 1-2
3. Each sub-issue should be completable in a single work session
4. Link sub-issues as children of the parent
5. Add dependency relations (blockedBy/blocks) where order matters

For detailed label and state reference: read `references/labels-and-states.md`
