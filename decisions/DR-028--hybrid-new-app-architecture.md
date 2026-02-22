# DR-028: Build C2A as a new application, adapting patterns from Accommodation Engine

**Date:** 2026-01-26
**Status:** Accepted
**Product:** C2A
**Issues:** THR-12, THR-20, THR-27

## Context

ThriveIEP had an existing Accommodation Engine application (document analysis → report generation) and needed to build C2A (survey → scoring → profile generation) for the NLU pilot launching March 1. The question was whether to extend the existing codebase, build greenfield, or take a hybrid approach.

The Accommodation Engine had significant tech debt: 734MB of assets, 50+ `any` types in TypeScript, large monolithic files, and a fundamentally different data flow (document upload → OCR → AI analysis vs. survey delivery → psychometric scoring → profile generation).

## Decision

Build C2A as a new application with its own codebase, adapting proven infrastructure patterns from the Accommodation Engine. Not a fork — a new project that reuses architectural patterns.

**Patterns adapted:** Drizzle ORM + PostgreSQL setup, session-based auth middleware, OpenAI service wrappers, deployment configuration.

**Built fresh:** C2A-specific schema (assessment_responses, profiles, interventions), survey delivery UI, scoring engine, profile generation, normalization service.

## Alternatives Considered

- **Extend Accommodation Engine** — Rejected because core data flows are fundamentally different, and the tech debt overhead would add ~1-2 weeks to the timeline. Schema needs (survey responses, psychometric profiles) don't map onto the document/case model.
- **Full greenfield** — Rejected because it duplicates solved infrastructure problems (auth, DB setup, deployment). The hybrid approach gets a clean codebase without re-solving infrastructure.

## Consequences

C2A has a purpose-built codebase free of Accommodation Engine tech debt, with ~4 week estimated timeline to MVP (vs. ~5-6 weeks if extending AE). The two applications share an Aptible hosting environment and deployment patterns but are independently deployable.

This means two codebases to maintain, but the different data models and user flows justify the separation. The Accommodation Engine continues to serve TriTogether and other accommodation-focused clients without C2A concerns bleeding in.

## Related Decisions

- Enables: DR-007 (Aptible hosting — shared infrastructure), DR-013 (port AE first, then build C2A)
- Constrains: Any shared library extraction must be explicit, not implicit coupling

## Related Artifacts

- THR-20 issue description contains the full decision rationale
- `packages/` directory structure in C2A codebase

## Source

THR-20 architecture evaluation, 2026-01-26. Eric evaluated three options and chose hybrid based on timeline analysis and tech debt assessment.
