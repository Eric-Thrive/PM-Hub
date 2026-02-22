# DR-003: Dashboard skill must use canonical template, never redesign

**Date:** 2026-02-20
**Status:** Accepted
**Product:** General
**Issues:** —

## Context

The morning dashboard artifact kept getting redesigned by Claude on each render — different layouts, dark mode experiments, structural changes. This made the output unpredictable and broke Eric's workflow. The root cause was that the skill had no template reference, so Claude generated the UI from scratch each time.

## Decision

Store a canonical JSX template at `PM-Hub/dashboard/dashboard-template.jsx`. The dashboard skill's first step is to `cat` this template file, then populate only the data constants (calendar events, Linear issues, Gmail items, focus picks) without altering structure, styling, or layout. The template is the single source of truth for dashboard appearance.

## Alternatives Considered

- **Inline the template in the skill** — Rejected because skill files have size limits and template updates would require re-uploading the skill
- **Describe the layout in prose** — Rejected because Claude still generated variations; a concrete template eliminates ambiguity
- **Use a hosted HTML page** — Rejected because the artifact rendering in Claude.ai chat is the desired UX

## Consequences

Dashboard appearance is stable and predictable. Template changes require updating `dashboard-template.jsx` in PM-Hub (but not the skill zip). Any UX improvements must go through the template, not ad-hoc prompting.

## Related Decisions

- Builds on: DR-002 (skills architecture)

## Related Artifacts

- `PM-Hub/dashboard/dashboard-template.jsx`
- `PM-Hub/skills/thriveiep-dashboard/SKILL.md`

## Source

Session 26, 2026-02-20. Debugging dashboard redesign bug.
