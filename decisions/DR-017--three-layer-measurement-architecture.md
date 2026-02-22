# DR-017: Three-layer measurement architecture (Direct Skills → Contextual Enablers → SDT Outcomes)

**Date:** 2026-02-11
**Status:** Accepted
**Product:** C2A
**Issues:** THR-132, THR-131

## Context

The C2A battery's 14 instruments measure qualitatively different things — some measure individual skills directly, some measure environmental conditions, and some measure motivational outcomes. These need to be organized into a coherent interpretive framework that reflects the Cognition-to-Action causal model. The scoring engine architecture (THR-132) had to decide how to structure these instruments conceptually and in the data model, because the layers serve different purposes in the student profile.

## Decision

Organize the battery into three functional layers reflecting the C2A causal model:

- **Layer 1 — Direct Skill Measurement (Intervention Targets):** ADEXI (WM + Inhibition), CFS, CAAS-SF, BRS, IRI (PT+EC), SPCC, MSLQ-CT, SFCQ, NBS-6, RQM-6. These instrument subscale scores are rolled up via the construct map to produce the 12 LE3 durable skill scores. These are the skills coaches can directly target for intervention.
- **Layer 2 — Contextual Enablers (Environmental Conditions):** LCQ-6 (autonomy support), TPS-7 (psychological safety). These measure the student's environment, not individual skills. Reported separately — never rolled into skill scores. Administered only at T3 to capture the effect of the coaching intervention on context.
- **Layer 3 — Self-Determination Outcomes (Evidence of Skill Impact):** BPNSFS-24 (autonomy/competence/relatedness satisfaction+frustration), GMS-Bookends (intrinsic/external regulation/amotivation). These are outcome measures that should improve as durable skills develop. Used for DDx pattern interpretation and longitudinal validation, not as intervention targets.

The scoring pipeline processes all three layers, but only Layer 1 feeds into the construct rollup (Stage 4). Layers 2 and 3 are scored independently and used for contextual interpretation in the profile engine.

## Alternatives Considered

- **Flat structure — all instruments contribute equally to skill scores** — Rejected because LCQ-6 and TPS-7 measure environment (not individual skills), and BPNSFS/GMS measure motivational outcomes (not actionable targets). Rolling them into skill scores would conflate cause and effect.
- **Two layers (skills vs. everything else)** — Rejected because Layers 2 and 3 serve distinct interpretive roles. Context instruments inform "what's going on around the student" while SDT instruments inform "is the student thriving." Collapsing them loses the causal interpretation that powers the DDx system.
- **Four layers (adding Executive Function as separate from Durable Skills)** — This is the Four Coaching Lenses display framework (EF, Durable Skills, Motivation, Context), which is used for profile rendering. But at the measurement architecture level, EF instruments (ADEXI, CFS) contribute directly to skill scores via construct mapping, so they belong in Layer 1. The four-lens rendering is a display concern, not a scoring concern.

## Consequences

- `construct_mapping` in scoring specs only exists for Layer 1 instruments — Layer 2/3 instruments have no construct mappings
- Layer 2 instruments (LCQ-6, TPS-7) are T3-only, reducing T1/T2 burden while capturing coaching impact
- The DDx pattern matching engine uses all three layers: Layer 1 scores identify where skills are weak, Layer 2 explains environmental context, Layer 3 validates whether the student's motivation profile matches expected patterns
- Profile rendering uses the Four Coaching Lenses model (EF, Durable Skills, Motivation, Context) which cross-cuts the measurement layers — EF lens draws from Layer 1, Context lens from Layer 2, Motivation lens from Layer 3

## Source

- https://claude.ai/chat/901b4341-ec03-448b-8a05-8411dcf179ee (Session 9, measurement architecture, Feb 19)
- https://claude.ai/chat/6863ee5b-4b80-4538-84db-afcc9841b234 (THR-131/132 overview, Feb 11)
