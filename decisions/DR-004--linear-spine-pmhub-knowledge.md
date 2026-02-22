# DR-004: Linear is the tactical spine, PM-Hub is the knowledge store

**Date:** 2026-02-21
**Status:** Accepted
**Product:** General
**Issues:** —

## Context

The team needed to decide where different types of PM information live. Linear handles issue tracking well (status, assignee, priority, sprints) but poorly handles long-form reasoning, research, and decision rationale. PM-Hub handles knowledge well (version-controlled markdown, searchable, linkable) but isn't a task tracker.

## Decision

Linear remains the authoritative system for tactical work: issues, status, assignments, milestones, sprints. PM-Hub stores the knowledge layer: decision records, research artifacts, specs, and technical documentation. The two systems connect via links — Linear issues link to relevant PM-Hub files (decision records, specs, research), and PM-Hub files reference Linear issue IDs (THR-XX).

## Alternatives Considered

- **Everything in Linear** — Rejected because Linear's description fields aren't suited for long-form reasoning, versioning, or cross-referencing
- **Everything in PM-Hub** — Rejected because GitHub Issues is a poor substitute for Linear's purpose-built project management
- **Notion as the knowledge layer** — Rejected per DR-001 (reliability and access issues)

## Consequences

Decision records, specs, and research go to PM-Hub with Linear issue links. Linear issues include links back to relevant PM-Hub files. This creates a two-system lookup pattern: check Linear for "what's happening," check PM-Hub for "why we decided this."

## Related Decisions

- Builds on: DR-001 (PM-Hub as primary)

## Related Artifacts

- `PM-Hub/decisions/` (this directory)
- `PM-Hub/context/linear-workflow.md`

## Source

Session 27, 2026-02-21. Architecture discussion on decision tracking and knowledge management.
