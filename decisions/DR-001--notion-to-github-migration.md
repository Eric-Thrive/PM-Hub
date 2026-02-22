# DR-001: Migrate all PM context from Notion to GitHub PM-Hub

**Date:** 2026-02-20
**Status:** Accepted
**Product:** General
**Issues:** —

## Context

PM context was scattered across Notion pages that Claude.ai accessed via MCP. This created several problems: Notion MCP was unreliable (rate limits, slow fetches), context was invisible to Claude Code sessions, and there was no version control on PM documents. The team needed a single source of truth accessible from both Claude.ai (via terminal/bash) and Claude Code (native git).

## Decision

Move all PM context to the private GitHub repo `Eric-Thrive/PM-Hub`. Notion becomes a legacy fallback only — used when GitHub PAT is unavailable. All PM files are markdown, committed with descriptive messages, and accessible via `git clone` with a daily-rotated PAT stored in Claude memory edits.

## Alternatives Considered

- **Keep Notion as primary** — Rejected because MCP access was unreliable and Notion couldn't serve Claude Code sessions
- **Use Google Drive** — Rejected because no version control, poor markdown support, and Claude's Drive access is read-only for docs
- **Local files only** — Rejected because not accessible across devices or shareable with team

## Consequences

Enables version-controlled PM knowledge accessible from any Claude surface. Requires daily PAT rotation (minor overhead). Team members (Soham, Elizabeth) need GitHub access to PM-Hub. Notion pages become stale over time and should not be treated as authoritative.

## Related Decisions

- Constrains: All future PM documentation goes to PM-Hub, not Notion

## Related Artifacts

- [PM-Hub repo](https://github.com/Eric-Thrive/PM-Hub)
- [Updated project instructions](Claude.ai project settings)

## Source

Session 23, 2026-02-20. Strategic discussion about PM tooling architecture.
