# DR-016: Use MEAN scoring for all instruments, overriding published SUM methods

**Date:** 2026-02-10
**Status:** Accepted
**Product:** C2A
**Issues:** THR-132, THR-32, THR-140

## Context

Several C2A instruments (ADEXI, CFS) have published scoring methods that use SUM aggregation. Others use MEAN. When subscale scores from different instruments are rolled up into LE3 durable skill constructs (Stage 4 of the pipeline), they need to be comparable. A sum-scored subscale with range 7–35 cannot be meaningfully averaged with a mean-scored subscale with range 1–5 without normalization.

## Decision

All 14 instruments use MEAN scoring (item-mean per subscale), overriding published SUM for ADEXI and CFS. This keeps all raw subscale scores on their respective Likert scale range (e.g., 1.0–5.0 for 5-point instruments), enabling direct cross-subscale comparison before normalization. The scoring specs encode this decision in the `method: "MEAN"` field.

Exception: GMS-Bookends retains its RAI weighted composite total (`2×IM + 0×ER + -2×Amot`, range -14 to +14) as a separate total score alongside MEAN-scored subscales, because the RAI has specific clinical interpretation.

## Alternatives Considered

- **Preserve published scoring methods (SUM where published, MEAN elsewhere)** — Rejected because it creates non-comparable subscale scores. A SUM score of 28 on ADEXI-WM (range 7–35) and a MEAN score of 3.2 on CAAS-SF (range 1–5) can't be meaningfully combined without additional transformation. Using MEAN everywhere avoids this.
- **SUM scoring with post-hoc range normalization** — Rejected because it adds an unnecessary transformation step. MEAN scoring produces inherently comparable values (all on their Likert scale range) without needing a range correction.
- **Standardized (z-score) raw subscales before rollup** — Considered as an alternative to MEAN, but requires normative data. At pilot launch, published norms aren't available for all instruments. MEAN scoring provides interpretable cross-subscale comparability without requiring norms.

## Consequences

- All raw subscale scores are on interpretable Likert ranges (1.0–5.0, 1.0–6.0, 1.0–7.0, or 0–100 for SPCC)
- Published clinical cutoffs for ADEXI and CFS (which reference SUM scores) cannot be directly applied. Clinical flags use scale-mean equivalents instead (e.g., ADEXI cutoff converted from SUM threshold to MEAN threshold by dividing by item count).
- When reporting to external researchers or comparing to published norms, a simple multiplication by item count converts back to published SUM values
- The `construct_mapping` rollup (Stage 4) can directly weight and average subscale means across instruments

## Source

- https://claude.ai/chat/11301e03-b9ea-4b19-be60-d95311493c0a (scoring specs build, Feb 10)
