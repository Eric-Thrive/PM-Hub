# DR-019: Distributed construct mapping — embedded in scoring JSONs, not a standalone file

**Date:** 2026-02-10
**Status:** Accepted
**Product:** C2A
**Issues:** THR-131, THR-32, THR-140

## Context

The construct mapping (which subscales contribute to which LE3 durable skills) needed a home in the codebase. The initial implementation used a hardcoded `construct-map.ts` file that mapped each skill to a single primary instrument. This missed cross-instrument contributions — e.g., Adaptability is informed by CFI, CAAS-SF, and BRS subscales, but `construct-map.ts` only linked it to one.

Meanwhile, the scoring spec JSON files (THR-32) were being built with per-instrument `construct_mapping` fields that declared which skills each subscale contributes to. This created two competing sources of truth.

## Decision

The `construct_mapping` field in each instrument's `.scoring.json` file is the **authoritative source of truth** for the subscale-to-skill rollup. The mapping is distributed across 14 scoring spec files rather than centralized in a standalone file.

At runtime, the scoring engine (Stage 4 construct rollup) reads `construct_mapping` from every scoring JSON via the `InstrumentRegistryImpl`, inverts the direction (subscale→skill becomes skill→subscale_sources), and combines contributing subscales from multiple instruments using reliability-weighted aggregation.

The hardcoded `construct-map.ts` is deprecated.

## Alternatives Considered

- **Standalone `construct-map.json` file** — A single centralized JSON mapping all skills to all subscale sources. Rejected because it duplicates information already present in the scoring specs and creates a synchronization problem — any time a scoring spec's construct mapping changes, the standalone file must also be updated. Embedding the mapping in the scoring spec keeps it colocated with the instrument it describes.
- **Keep `construct-map.ts` and add cross-instrument mappings** — Rejected because TypeScript hardcoding loses the JSON-driven configurability principle (DR-015). The whole point of the data-driven architecture is that psychometric changes don't require code changes.
- **Database-driven mapping table** — Deferred. For v1, JSON files are sufficient. A database-backed mapping would be needed if customers are allowed to create custom frameworks via UI (see DR-018).

## Consequences

- 84 total subscale→skill mappings are spread across 14 scoring JSON files — complete crosswalk coverage of all 12 LE3 skills
- `InstrumentRegistryImpl` must parse and expose `construct_mapping` fields
- Adding a new instrument to the battery automatically makes its skill mappings available to the construct rollup — no separate registration step
- Cross-instrument contributions are captured: skills with strong depth (8-11 sources like Adaptability, Collaboration) get richer rollups than thin skills (3 sources like Networking)
- The distributed approach means there's no single place to see "all mappings for skill X" without querying the registry — a tradeoff vs the standalone file approach

## Related Decisions

- Builds on: DR-015 (two-file instrument architecture), DR-018 (configurable reporting schema)
- Supersedes: Hardcoded `construct-map.ts` (deprecated)

## Source

- https://claude.ai/chat/11301e03-b9ea-4b19-be60-d95311493c0a (scoring specs session, construct mapping validation showing 12/12 coverage, Feb 10)
- https://claude.ai/chat/901b4341-ec03-448b-8a05-8411dcf179ee (Session 9, construct map prerequisite — "Stage 4 must be updated to read construct_mapping from scoring JSONs at runtime", Feb 19)
