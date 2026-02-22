# DR-002: Use Claude.ai Skills (zip upload) for PM copilot capabilities

**Date:** 2026-02-20
**Status:** Accepted
**Product:** General
**Issues:** —

## Context

The PM copilot needed persistent capabilities across conversations — morning dashboard generation, session handoff protocols, Linear workflow conventions, and core project context. Claude.ai supports Skills as uploadable zip folders (SKILL.md + optional references/) that auto-trigger based on semantic matching against the description field.

## Decision

Build four skills as the PM copilot system: `thriveiep-pm-core` (team, products, milestones, resource IDs), `thriveiep-dashboard` (morning briefing with live data), `thriveiep-session-handoff` (session continuity protocol), and `thriveiep-linear` (issue management conventions). Each skill is GitHub-first — reads PM-Hub via terminal, falls back to Notion only when no PAT available. Skills are maintained in `PM-Hub/skills/` and packaged as zips for upload.

## Alternatives Considered

- **Project instructions only** — Rejected because too much content for the instruction field; skills provide modular, auto-triggered loading
- **MCP servers** — Rejected because Claude.ai doesn't support custom MCP servers (only pre-built connectors); Claude Code could use them but not the primary workflow surface
- **Single monolithic skill** — Rejected because auto-triggering works better with focused, well-described skills

## Consequences

Skills must be re-uploaded when updated (manual step). Skill descriptions must be precise for reliable auto-triggering. Dashboard skill requires canonical template file to prevent Claude from redesigning the UI each time.

## Related Decisions

- Builds on: DR-001 (GitHub-first architecture)

## Related Artifacts

- `PM-Hub/skills/` (skill source files)
- `PM-Hub/dashboard/dashboard-template.jsx` (canonical dashboard template)

## Source

Sessions 22 and 25, 2026-02-20. Skills system design and build.
