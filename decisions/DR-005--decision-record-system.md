# DR-005: Capture decisions as structured records in PM-Hub with real-time workflow

**Date:** 2026-02-21
**Status:** Accepted
**Product:** General
**Issues:** —

## Context

Key decisions made during Claude.ai PM sessions were being lost — the reasoning, alternatives considered, and constraints that led to choices evaporated when conversations ended. Six months later, nobody could answer "why did we decide X?" without re-litigating from scratch. Deliverables (docs, specs) survive if downloaded, but the thinking behind them doesn't.

## Decision

Create a `decisions/` directory in PM-Hub with structured decision records (DR-XXX--slug.md). Each record captures: context, decision, alternatives considered, consequences, related decisions, related artifacts, and source conversation. An INDEX.md provides a searchable table with tags for semantic lookup. Records are written in real-time during conversations (while context is fresh), not extracted after the fact.

## Alternatives Considered

- **Session-end extraction** — Rejected because context degrades over long conversations; decisions made early get summarized poorly
- **Periodic retrospective** — Rejected because it relies on memory and discipline; decisions fall through cracks
- **Linear comments** — Rejected because not searchable, not version-controlled, and reasoning gets buried in comment threads
- **Notion database** — Rejected per DR-001

## Consequences

PM copilot reads INDEX.md at session start to check for related prior decisions before re-litigating. Creates institutional memory that survives beyond individual sessions. Adds a small overhead per decision (drafting the DR), but prevents much larger cost of re-debating settled questions. Decision records become guardrails for future conversations.

## Related Decisions

- Builds on: DR-001 (PM-Hub as primary), DR-004 (Linear spine + PM-Hub knowledge)

## Related Artifacts

- `PM-Hub/decisions/TEMPLATE.md`
- `PM-Hub/decisions/INDEX.md`

## Source

Session 27, 2026-02-21. Architecture discussion on decision tracking.
