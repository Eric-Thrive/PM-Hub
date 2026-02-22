# DR-023: Template-driven deterministic interpretations at M3 (no LLM)

**Date:** 2026-02-17
**Status:** Accepted
**Product:** C2A
**Issues:** THR-133, THR-198, THR-199, THR-203

## Context

Profile reports need to translate raw scores into meaningful text: what does a "Low" Resilience score mean for this student? What should a coach do about it? The system needs to generate narrative interpretations for 12 durable skills across 5 category levels, contextualized by EF patterns and motivation state. Two approaches were considered: LLM-generated personalized narratives vs. deterministic template lookup.

## Decision

M3 uses deterministic template-driven interpretations:

- **Score ranges map to pre-written paragraphs** — each skill × category combination has authored student-facing and coach-facing text
- **DDx pattern matching is rule-based** — the 4-step diagnostic sequence (EF tier → skill category → ARC state → GMS cascade check) produces one of 12 strategy types per skill, each with a pre-authored coaching recommendation
- **Templates are validated via simulation** — THR-203 generates 8-12 synthetic student archetypes and runs them through the full pipeline to produce HTML reports for human review
- **No LLM calls in the profile generation pipeline** — deterministic, auditable, reproducible

The template approach provides:
- **Clinical auditability** — every piece of text can be reviewed, version-controlled, and approved
- **Reproducibility** — same inputs always produce same outputs
- **Speed** — no API calls, instant generation
- **Compliance** — no student data sent to external LLM services

Hypothetical DDx at M3 (general coaching strategies based on score patterns). Targeted intervention recommendations deferred to M15.

## Alternatives Considered

- **LLM-generated personalized narratives** — Deferred to post-pilot. Richer output but: (a) harder to validate clinically at scale, (b) non-deterministic outputs complicate QA, (c) FERPA concern about sending assessment data to external APIs, (d) slower to generate. Appropriate enhancement after pilot validates the template structure.
- **No interpretive text, just scores and charts** — Rejected. Numbers alone don't tell students or coaches what to DO. The coached interpretation is the value proposition.

## Consequences

- THR-198 (template library) needs comprehensive coverage: 12 skills × 5 categories × 2 voices (student/coach) = 120+ text templates, plus DDx-specific coaching strategy templates
- THR-203 (simulation script) is the critical validation loop — generate synthetic profiles, review output, refine templates, regenerate
- Template authoring is a significant content creation task — Eric will pre-populate by simulating profiles
- Templates stored as JSON files in `packages/assessment-engine/data/templates/skills/`, loadable at runtime without code changes
- Post-pilot path: LLM synthesis layer on top of template structure, using templates as guardrails/examples

## Related Decisions

- Builds on: DR-021 (report philosophy), DR-022 (HTML delivery)
- Constrains: THR-199 (DDx engine must be deterministic rule-based)

## Related Artifacts

- DDx Engine Design doc (PM-Hub)
- C2A Profile Generation Requirements doc (PM-Hub)
- Dashboard mock with DDx worked examples: https://eric-thrive.github.io/C2A-battery-211/

## Source

Feb 17 conversation on profile generation sub-issues. Eric chose templates explicitly: "decision 2 I want to do templates." Also referenced the diagnostic guide/worked examples at C2A-battery-211 as the template model.
