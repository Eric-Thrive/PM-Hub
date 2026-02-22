# DR-020: Coverage gap classification — direct vs. composite/inferred constructs

**Date:** 2026-02-09
**Status:** Accepted
**Product:** C2A
**Issues:** THR-131

## Context

The C2A battery was designed to measure the 12 LE3 durable skills, but not all skills have equally strong psychometric coverage. Some skills are directly measured by validated instruments (e.g., Empathy via IRI), while others must be inferred from combinations of subscales that measure related but not identical constructs. The reporting schema needed to transparently classify this distinction rather than present all 12 skills as equally well-measured.

## Decision

Classify each construct's measurement quality using a coverage rating system and label constructs accordingly:

- **9 of 12 skills** have direct or strong measurement (★★★★☆ to ★★★★★): Creative Problem Solving, Curiosity, Adaptability, Initiative, Empathy, Communication, Resilience, Collaboration, Social Awareness
- **Critical Thinking** (★★☆☆☆): Inferred from cognitive capacity indicators (CFS + ADEXI) rather than direct behavioral measurement. Labeled as **composite/inferred construct**.
- **Networking** (★☆☆☆☆): Latent composite from SPCC stranger/acquaintance items + CAAS-Curiosity. Only 3 subscale sources. Labeled as **prerequisite-based construct** — measures preconditions for networking behavior, not networking itself.
- **Relationship Building** (★☆☆☆☆): Latent composite from IRI empathy + SPCC dyad items. Labeled as **prerequisite-based construct**.

For v1, gap constructs (Networking, Relationship Building, Critical Thinking) supplement psychometric measurement with self-assessment rubric items and coach observation rather than adding more instruments.

## Alternatives Considered

- **Add supplementary instruments** for gap constructs (e.g., a networking behavior scale, a critical thinking assessment) — Rejected for v1 due to administration time constraints (~35 min target) and licensing complexity. The battery already has 14 instruments. Noted as a future enhancement if specific customer demand materializes.
- **Drop gap constructs from reporting** — Rejected because all 12 LE3 skills must appear in NLU reports per the institutional framework agreement. Transparent labeling is preferred over omission.
- **Report gap constructs without disclaimers** — Rejected because presenting a ★☆☆☆☆ construct with the same confidence as a ★★★★★ construct would be psychometrically irresponsible. Coaches need to know which scores are solid vs. approximate.

## Consequences

- Profile reports include a measurement quality indicator per skill
- Coach training must cover the distinction between direct and inferred constructs
- Gap constructs are candidates for supplementary instrument additions in future battery versions
- The DDx blocker analysis can still operate on gap constructs — the EF/ARC/cascade framework applies regardless of measurement depth — but coaches should interpret with appropriate caution
- America Succeeds framework alignment (future) has different constructs that may have different coverage gaps

## Related Decisions

- Builds on: DR-018 (configurable reporting schema), DR-019 (distributed construct mapping)

## Source

- https://claude.ai/chat/a5edcef9-8ae1-4dbe-99d4-36d647e30eb3 (battery design session, crosswalk coverage matrix showing all 12 skills, Jan 22)
- https://claude.ai/chat/11301e03-b9ea-4b19-be60-d95311493c0a (construct mapping validation — Networking at 3 sources, Feb 10)
- Linear THR-131 description (coverage notes: "9 of 12 skills have direct or strong measurement")
