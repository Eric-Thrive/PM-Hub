# DR-026: Norms registry stores pre-transformed values with full provenance metadata

**Date:** 2026-02-17
**Status:** Accepted
**Product:** C2A
**Issues:** THR-197, THR-205

## Context

Seven C2A instruments have published normative data (BPNSFS, CAAS-SF, BRS, IRI, CFS, ADEXI, GMS), but using these norms requires instrument-specific transformations: three instruments need score reflection (ADEXI, BPNSFS frustration subscales, GMS amotivation/external regulation) so that high scores universally indicate positive outcomes, and IRI requires reanchoring from the published 0–4 Likert to C2A's 1–5 scale with gender-pooled norms. The question was whether to store raw published norms and apply transformations at runtime, or pre-apply transformations in the norms files.

## Decision

Norms registry JSON files store pre-transformed M/SD values — reflection and reanchoring are already applied. Each file includes full provenance: original published values, transformation formulas, source citations, population metadata, and worked T-score examples for implementation verification.

Specific transformations baked into the files:

- **ADEXI** — All subscales reflected: `reflected_mean = 6 - raw_mean` (scale max + 1 = 6). SDs unchanged. WM: 1.97→4.03, Inh: 2.14→3.86, Full: 2.03→3.97.
- **BPNSFS** — Frustration subscales only reflected: `reflected_mean = 6 - raw_mean`. Satisfaction subscales pass through unchanged.
- **GMS** — Amotivation + External Regulation reflected: `reflected_mean = 8 - raw_mean` (scale max + 1 = 8). Intrinsic Motivation unchanged. RAI computed on original unreflected scores.
- **IRI** — Davis (1980/83) 0–4 norms pooled across gender (N=1161), converted to item-means, then +1.0 reanchoring offset. PT: M=3.48 (SD=0.69), EC: M=3.91 (SD=0.60).
- **CFS** — Only sum-scored instrument (M=55, SD=7 on 12–72 range). No reflection needed.

A master `norms-index.json` declares per-instrument configuration: normalization tier, score level (item-mean vs sum), reflection flags, and the 5-tier category thresholds.

## Alternatives Considered

- **Store raw published norms, transform at runtime** — Rejected because it distributes transformation logic across the normalization service code and the norms data, making errors harder to catch. With pre-transformed values, the normalization service is a simple T-score formula applied uniformly. The T-score examples in each file serve as integration test fixtures.
- **Single monolithic norms file** — Rejected because per-instrument files are independently updatable and keep provenance metadata co-located with the data it describes.

## Consequences

The normalization service implementation is simple: load norms file, apply `T = 50 + 10 × ((score - mean) / sd)`, map to display scale. All complexity is front-loaded into the norms files where it can be audited by a psychometrician. Trade-off: if the reflection or reanchoring formulas change, the norms files must be regenerated (but this is unlikely — these are published instrument properties). The `tScoreExample` in each file serves as a built-in sanity check.

## Related Decisions

- Builds on: DR-006 (dual scoring), DR-016 (MEAN scoring override), DR-025 (normalization at profile-gen)
- Constrains: Any new norm-referenced instrument must follow this file format

## Related Artifacts

- `packages/assessment-engine/data/norms/norms-index.json`
- `packages/assessment-engine/data/norms/{adexi,bpnsfs,brs,caas-sf,cfs,gms,iri}.json`

## Source

THR-197 norms registry conversation, 2026-02-17. Eric provided resolved decisions on IRI reanchoring, ADEXI/BPNSFS/GMS reflection, and pooled gender norms. JSON files drafted and validated in that session.
