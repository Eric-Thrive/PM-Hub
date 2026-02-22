# DR-027: Five-tier interpretive categories mapped to standard score equivalents on a 1–100 display scale

**Date:** 2026-02-17
**Status:** Accepted
**Product:** C2A
**Issues:** THR-197, THR-198, THR-133

## Context

C2A profiles display all assessment scores on a unified 1–100 visual scale. Needed interpretive categories that are: (a) meaningful to students and coaches (not clinical jargon), (b) psychometrically anchored to established score distributions, and (c) consistent across both T-score-normed and linearly-scaled instruments. A Perplexity research report on normalization strategies across multi-instrument batteries (BASC-3, Conners, BRIEF) informed the approach.

## Decision

Five interpretive categories mapped to T-score bands, standard score equivalents, and the 1–100 display scale:

| Category | Display Range | T-Score Band | Standard Score Equivalent |
|----------|--------------|-------------|--------------------------|
| Low | < 25 | < 35 | < 75 SS (> 1.5 SD below mean) |
| Needs Focus | 25–42 | 35–45 | 75–92 SS |
| Developing | 42–58 | 45–55 | 92–108 SS (within ~0.5 SD) |
| Strong | 58–75 | 55–65 | 108–125 SS |
| Very Strong | > 75 | > 65 | > 125 SS (> 1.5 SD above mean) |

The T-score to display scale formula: `displayScore = ((T - 20) / 60) × 99 + 1`, clamped to 1–100. This maps the practical T-score range of 20–80 onto the full display scale.

Category labels use strengths-based language ("Needs Focus" not "Weak," "Developing" not "Below Average") aligned with the C2A philosophy of empowering rather than pathologizing (DR-021). Thresholds are configurable in the norms registry index file, enabling future tuning based on pilot data.

For linearly-scaled instruments (Tier 2), the same display thresholds apply, but the interpretation carries lower confidence because "50" means "midpoint of possible range" rather than "population average." This is noted in profile metadata.

## Alternatives Considered

- **Three tiers (Low / Average / High)** — Rejected as too coarse; doesn't differentiate between a student who is slightly below average vs. significantly struggling.
- **Standard score display (mean=100, SD=15)** — Rejected because scores above 100 suggest clinical/IQ testing to a lay audience. The 1–100 scale reads as a percentage-like metric which is more intuitive for students.
- **Percentile-based categories** — Rejected because percentile ranks distort distributions (compress the middle, exaggerate extremes) and make cross-instrument averaging statistically inappropriate for construct rollups.
- **Neuropsych-style categories (Impaired / Low Average / Average / High Average / Superior)** — Rejected because clinical language conflicts with C2A's strengths-based, student-empowering philosophy (DR-021).

## Consequences

Provides consistent interpretive framework across all 14 instruments regardless of normalization method. Enables: the interpretation template library (THR-198) to key off category labels, profile reports to use consistent language, and coaches to discuss results using shared vocabulary. Trade-off: the same thresholds may not be equally meaningful for all constructs (e.g., "Needs Focus" on amotivation is very different from "Needs Focus" on career adaptability) — the interpretation templates must add construct-specific context.

## Related Decisions

- Builds on: DR-006 (dual scoring), DR-021 (report philosophy), DR-025 (normalization at profile-gen)
- Informs: THR-198 (interpretation templates), THR-133 (report dimensions)

## Related Artifacts

- `packages/assessment-engine/data/norms/norms-index.json` (category thresholds in `categoryThresholds` field)

## Source

THR-22 decomposition conversation, 2026-02-17. Categories derived from Perplexity research report on multi-instrument battery normalization, adapted with strengths-based language per C2A design philosophy.
