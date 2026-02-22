# DR-006: Use T-scores for norm-referenced instruments, linear min-max scaling for research instruments

**Date:** 2026-02-15
**Status:** Accepted
**Product:** C2A
**Issues:** THR-132, THR-140

## Context

The C2A assessment battery contains 14 instruments from two categories: published norm-referenced instruments with established psychometric norms (e.g., ADEXI, BPNSFS, IRI) and custom/research instruments without published norms (e.g., C2A NBS-6, RQM-6, LCQ-6). These need different scoring approaches to maintain psychometric validity while producing comparable pillar-level scores.

## Decision

Norm-referenced instruments use published T-score conversions (mean=50, SD=10) via norm tables stored in `c2a/scoring/norms/`. Research instruments use linear min-max scaling to a 0-100 range. Both produce scores that can be composited at the pillar level. The scoring pipeline handles this via a `normType` field in each instrument's scoring spec: `"t_score"` triggers norm lookup, `"linear"` triggers min-max calculation.

## Alternatives Considered

- **T-scores for everything** — Rejected because research instruments lack the normative samples needed for valid T-score conversion
- **Raw scores only** — Rejected because subscales with different ranges (e.g., 5-25 vs 6-42) can't be meaningfully compared or composited
- **Percentile ranks** — Rejected because they distort distributions and make pillar-level averaging statistically inappropriate

## Consequences

Enables flexible battery composition — new instruments can be added as either type without restructuring the pipeline. Norm tables must be maintained as JSON files and updated if new normative data is published. Pillar scores aggregate across both scoring types, which is statistically defensible but should be noted in profile reports.

## Related Decisions

- Constrains: Future instrument additions must declare normType

## Related Artifacts

- `c2a/scoring/norms/` (norm table JSON files)
- `c2a/scoring/specs/` (instrument and scoring spec files)
- `c2a/scoring/specs/instrument_schema_v4.md`

## Source

Sessions ~15-18, mid-February 2026. Scoring engine architecture design.
