# DR-025: Normalization is a profile-generation concern, not a scoring pipeline stage

**Date:** 2026-02-17
**Status:** Accepted
**Product:** C2A
**Issues:** THR-197, THR-22, THR-140

## Context

The six-stage scoring pipeline (DR-014) includes a Stage 3 "Normalization" step that initially performed linear min-max scaling. When the decision was made to support norm-referenced T-scores for 7 instruments alongside linear fallback for 5 (DR-006), the question arose whether to upgrade Stage 3 with dual-mode normalization or separate normalization into its own service.

Key constraint: normalization strategy is expected to evolve — published norms may be updated, local norms will be added once pilot N ≥ 100, and category thresholds may be tuned. The scoring engine should remain stable while normalization improves.

## Decision

Normalization lives as a standalone NormalizationService at profile-generation time, not inside the scoring pipeline. The scoring engine stores raw scores and item-level data only. The normalization service:

1. Loads the norms registry JSON files at runtime
2. Applies T-score conversion (Tier 1) or linear min-max (Tier 2) per instrument
3. Maps to the 1–100 display scale
4. Assigns interpretive category labels
5. Attaches normalization metadata (method, source, population) to each score

This means norms can be updated, new normalization modes can be added, and category thresholds can be tuned — all without re-running the scoring pipeline or touching stored assessment data.

Architecture:

```
Scoring Engine (THR-140/M2)          Profile Generation (THR-22/M3)
┌──────────────────────┐           ┌──────────────────────────────┐
│ Stores:              │           │ At render time:              │
│  - raw scores        │  ──────▶  │  - loads norms registry      │
│  - item-level data   │           │  - applies T-score (Tier 1)  │
│                      │           │    or linear (Tier 2)        │
│ Does NOT normalize   │           │  - maps to 1-100 display     │
│                      │           │  - applies category labels   │
└──────────────────────┘           │  - handles reflections       │
                                   │  - renders HTML profile      │
                                   └──────────────────────────────┘
```

## Alternatives Considered

- **Upgrade scoring pipeline Stage 3 to dual-mode** — Rejected because it couples normalization evolution to the scoring engine. Every norms update would require touching a critical path component. Also makes the scoring engine responsible for decisions it shouldn't own (display semantics, category labels).
- **Store both raw and normalized scores, normalize at ingest** — Rejected because it would require re-scoring all assessments whenever norms change. Profile-gen-time normalization means historical assessments automatically benefit from updated norms.

## Consequences

The scoring engine becomes simpler — it stores raw data and leaves interpretation to the profile layer. This enables: progressive local norming (add a third tier when N ≥ 100), A/B testing of category thresholds, and per-customer normalization strategies (e.g., institution-specific norms). Trade-off: profile generation has a runtime dependency on the norms registry files, and normalization adds latency at render time (negligible for 14 instruments).

## Related Decisions

- Builds on: DR-006 (dual scoring approach), DR-014 (six-stage pipeline)
- Enables: Future local norming (third tier), per-institution norms

## Related Artifacts

- `packages/assessment-engine/data/norms/` (norms registry JSON files)
- `packages/assessment-engine/src/normalization-service.ts` (implementation)

## Source

THR-22 decomposition conversation, 2026-02-17. Decision point (a) vs (b): add normalization service between scoring output and profile template engine, or upgrade scoring engine Stage 3. Chose (a).
