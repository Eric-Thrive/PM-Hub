# DR-014: Six-stage sequential scoring pipeline architecture

**Date:** 2026-02-11
**Status:** Accepted
**Product:** C2A
**Issues:** THR-132, THR-140

## Context

C2A assessment battery (14 instruments, 144 items) requires a scoring pipeline that transforms raw survey responses into student profiles. The pipeline must handle diverse scoring methods (Likert means, RAI weighted composites, matrix scoring), reverse-scored items, cross-instrument construct rollups, and clinical flag detection. Needed a clear architecture that could be built incrementally and tested at each stage boundary.

## Decision

Implement a 6-stage sequential pipeline:

1. **Item scoring** — Apply reverse scoring where specified, capture raw values per item
2. **Subscale aggregation** — MEAN scoring for all instruments (overriding published SUM for ADEXI and CFS for cross-subscale comparability), plus RAI weighted composite for GMS
3. **Normalization** — Linear min-max initially: `((score - min) / (max - min)) * 99 + 1`; later replaced with T-score normalization for 7 norm-referenced instruments (see DR-006)
4. **Reliability-weighted construct rollup** — Cronbach's α weighted mean mapping subscale scores to 12 LE3 durable skills via `construct_mapping` fields in scoring JSON specs
5. **Clinical flags** — Threshold-based alerts: GMS Amotivation ≥ 4.0, BPNSFS frustration subscales ≥ 5.0, BRS clinical cutoffs
6. **Profile assembly** — Compose scored, normalized, flagged data into structured profile object for rendering

Each stage has typed inputs/outputs, enabling independent testing and future stage replacement (e.g., swapping Stage 3 normalization approach without touching other stages).

## Alternatives Considered

- **Monolithic scoring function** — Rejected because the battery's diversity (14 instruments, 5+ scoring methods) would create an unmaintainable single function. Staged approach enables testing each transformation independently.
- **Event-driven / async pipeline** — Rejected as overengineered for batch scoring of ~144 items. Sequential processing completes in milliseconds. Async adds complexity without benefit at pilot scale.
- **Separate scoring per instrument, then merge** — Rejected because construct rollup (Stage 4) requires cross-instrument data. Instruments can't be scored in isolation when the goal is skill-level profiles that draw from multiple instruments.

## Consequences

- Each stage boundary is a natural test surface — property tests validate stage-to-stage contracts
- Stage 3 was intentionally designed to be swappable, enabling the DR-006 dual normalization upgrade without touching Stages 1-2 or 4-6
- Stage 4 construct rollup initially used a hardcoded `construct-map.ts` (mapping skills to primary instruments only). Later deprecated in favor of reading `construct_mapping` from scoring JSON specs at runtime, enabling cross-instrument contributions to each skill score
- Clinical flags (Stage 5) operate on post-normalization data, so flag thresholds are in instrument-native scale units, not display-scale units

## Source

- https://claude.ai/chat/c31ced88-be1a-4d4b-a945-ddefbcc7fa2a (THR-140 build session, Feb 12)
- https://claude.ai/chat/6863ee5b-4b80-4538-84db-afcc9841b234 (THR-131/132 overview, Feb 11)
- Notion Scoring Engine Architecture doc
