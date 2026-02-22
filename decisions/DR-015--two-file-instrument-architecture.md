# DR-015: Two-file instrument architecture (definition + scoring spec, modeled on FHIR pattern)

**Date:** 2026-02-10
**Status:** Accepted
**Product:** C2A
**Issues:** THR-132, THR-32

## Context

Each psychometric instrument needs both its item definitions (what to ask) and scoring rules (how to score). These serve different consumers: the survey UI reads items and response formats; the scoring engine reads aggregation methods, reverse scoring flags, clinical bands, and construct mappings. Needed to decide whether to combine these or separate them, and whether to adopt an existing standard (FHIR Questionnaire, CDISC ODM, REDCap) or build a custom schema.

## Decision

Separate each instrument into two companion JSON files, modeled on the FHIR Questionnaire/QuestionnaireResponse separation pattern:

- **`{instrument}.json`** — Immutable published definition: item text, subscale groupings, response format (scale type, points, anchors), reverse scoring flags. This is the psychometric "source of truth" and should not be modified.
- **`{instrument}.scoring.json`** — Scoring specification: aggregation method per subscale (MEAN, SUM, RAI), score ranges, clinical cutoff bands, reverse item IDs, and `construct_mapping` declaring which subscales contribute to which LE3 durable skills.

Custom JSON schema ("ASSesJSON") rather than adopting FHIR or CDISC directly. Schema documented in `instrument_schema_v2.md`.

## Alternatives Considered

- **Single combined file per instrument** — Rejected because item definitions are immutable published content while scoring rules evolve (e.g., switching from SUM to MEAN, adding construct mappings). Separation enforces this boundary and allows scoring rule updates without touching validated item definitions.
- **FHIR Questionnaire resource (full adoption)** — Rejected after deep research. FHIR handles Likert and continuous scales well, but lacks native support for reverse scoring, subscale-level aggregation methods, clinical cutoff bands, and cross-instrument construct mapping. Would require extensive custom extensions, adding complexity without interoperability benefit at startup scale.
- **CDISC ODM** — Rejected as overkill for a 14-instrument EdTech battery. Designed for multi-site clinical trials with regulatory submission requirements ThriveIEP doesn't have.
- **REDCap data dictionary format** — Rejected because it handles item definition well but has no scoring layer at all. Would still need a custom scoring spec format.

## Consequences

- Adopted the FHIR *pattern* (separation of concerns) without the FHIR *format* (XML/JSON-FHIR verbosity). Best of both worlds: clean architecture, minimal overhead.
- `InstrumentRegistryImpl` loads both files at runtime and provides typed access to items, subscales, scoring rules, and construct mappings
- Total of 84 subscale→skill construct mappings encoded across the battery's scoring specs
- All 14 instruments use MEAN scoring (overriding published SUM for ADEXI and CFS) for cross-subscale comparability in the profile engine — this decision is encoded in the scoring specs, not the definitions
- Future instruments added by creating two new JSON files and registering them — no code changes required

## Related Decisions

- DR-009 (response format architecture) — preserves 5 distinct UI formats in definition files
- DR-006 (dual scoring approach) — normType field lives in scoring specs

## Source

- https://claude.ai/chat/f0dce03c-4a40-4aa8-9f69-7d26905fbc8e (FHIR/standard research, Feb 10)
- https://claude.ai/chat/11301e03-b9ea-4b19-be60-d95311493c0a (scoring specs build, Feb 10)
