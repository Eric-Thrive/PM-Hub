# DR-026: Norms registry stores pre-transformed values with full provenance metadata

**Date:** 2026-02-17
**Status:** Accepted
**Product:** C2A
**Issues:** THR-197, THR-205

## Context

Ten C2A instruments have published normative data. The original seven (BPNSFS, CAAS-SF, BRS, IRI, CFS, ADEXI, GMS) were identified first; subsequent research confirmed that MSLQ-CT (Pintrich et al., 1991/1993), SFCQ (Thomas et al., 2015; N=3,526), and SPCC (McCroskey & McCroskey, 1988) also have usable published norms, upgrading them from Tier 2 (linear fallback) to Tier 1 (norm-referenced).

Several instruments require transformations before norms can be applied: three need score reflection (ADEXI, BPNSFS frustration subscales, GMS amotivation/external regulation) so that high scores universally indicate positive outcomes, and IRI requires reanchoring from the published 0–4 Likert to C2A's 1–5 scale with gender-pooled norms. The question was whether to store raw published norms and apply transformations at runtime, or pre-apply transformations in the norms files.

> **⚠️ VERIFY (added 2026-02-22):** Confirm that MSLQ-CT, SFCQ, and SPCC norms JSON files were actually created and committed to the codebase at `packages/assessment-engine/data/norms/`. The Perplexity research confirming norms availability is documented, but the conversation where M/SD values were extracted and applied could not be located during DR backfill. Check the codebase before treating these three as fully implemented.

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

**Updated tier breakdown (as of 2026-02-22):**

- **Tier 1 — Norm-referenced (10 instruments):** ADEXI, BRS, BPNSFS, CAAS-SF, CFS, GMS, IRI + MSLQ-CT, SFCQ, SPCC
- **Tier 1.5 — Criterion-referenced (2 instruments):** LCQ-6 (context-specific, change-over-time), TPS-7 (relative comparison only, no formal norms)
- **Tier 2 — Linear fallback (2 instruments):** NBS-6, RQM-6 (custom/R&D)

SPCC is a unique case — already on a 0–100 scale with McCroskey's published cutoffs (Low <59, Normal 59–86, High >87) and subscale M/SDs available.

## Related Decisions

- Builds on: DR-006 (dual scoring), DR-016 (MEAN scoring override), DR-025 (normalization at profile-gen)
- Constrains: Any new norm-referenced instrument must follow this file format

## Related Artifacts

- `packages/assessment-engine/data/norms/norms-index.json`
- `packages/assessment-engine/data/norms/{adexi,bpnsfs,brs,caas-sf,cfs,gms,iri}.json` (confirmed)
- `packages/assessment-engine/data/norms/{mslq-ct,sfcq,spcc}.json` (⚠️ verify existence in codebase)

## Source

THR-197 norms registry conversation, 2026-02-17. Eric provided resolved decisions on IRI reanchoring, ADEXI/BPNSFS/GMS reflection, and pooled gender norms. JSON files drafted and validated in that session. Tier reclassification based on Perplexity research confirming published norms for MSLQ-CT, SFCQ, and SPCC (date TBD — conversation not located during DR backfill 2026-02-22).
