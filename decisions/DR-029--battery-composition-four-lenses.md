# DR-029: 14-instrument battery organized by 4 coaching lenses with 3-timepoint longitudinal design

**Date:** 2026-02-16
**Status:** Accepted
**Product:** C2A
**Issues:** THR-12, THR-21, THR-32

## Context

The C2A assessment platform needed a psychometric battery that measures durable skills, executive function, motivation, and contextual factors for neurodivergent college students within an SDT (Self-Determination Theory) framework. The battery evolved through multiple iterations — starting with ~10 instruments (121 items, including SRQ-L-16 and CFI), then being refined as instruments were replaced, added, or rescoped based on psychometric validity, licensing feasibility, and construct coverage.

Key constraints: instruments should be free for research use (licensing deferred post-pilot per DR-008), measure constructs mappable to NLU's LE3 12 Durable Skills framework, and support longitudinal change detection across a semester.

## Decision

Final battery: **14 core instruments + 2 optional contextual instruments** yielding **144 items** from a full bank, administered across **3 timepoints** (T1, T2, T3) with different instrument subsets per timepoint. Organized by 4 coaching lenses:

**Lens 1 — Executive Function (26 items):** ADEXI-WM (7), ADEXI-Inh (7), CFS (12)

**Lens 2 — Durable Skills (71 items):** MSLQ-CT (5), SFCQ (10), BRS (6), CAAS-SF (12), IRI-PT+EC (14), SPCC (12), C2A-NBS-6 (6), RQM-6 (6)

**Lens 3 — Motivation & Psychological Needs (34 items):** BPNSFS-24 (24), GMS-Bookends (10)

**Lens 4 — Contextual Factors (13 items, T3 only):** LCQ-6 (6), TPS-7 (7)

**Timepoint design:**
- T1 (baseline): 131 items / 12 instruments — delivered in 3 "sprints"
- T2 (mid-semester): 59 items / 7 instruments — change-sensitive subset only
- T3 (end-semester): 134 items / 13 instruments — full re-administration + contextual measures

Two instruments (NBS-6, RQM-6) are ThriveIEP-custom R&D instruments.

## Alternatives Considered

- **Original 10-instrument / 121-item battery** — Included SRQ-L-16 (replaced by LCQ-6 for brevity and SDT alignment) and CFI (replaced by CFS after licensing concerns and better EF coverage). MSLQ-CT, SFCQ, NBS-6, RQM-6, and GMS-Bookends were added to close construct coverage gaps.
- **Shorter battery (~80 items)** — Rejected because it would leave critical coverage gaps in the EF→Durable Skills crosswalk, which is the primary clinical differentiator.
- **Conversational/chatbot-based assessment delivery** — Considered but rejected for psychometric validity concerns; validated instruments require standardized item presentation.

## Consequences

T1 at 131 items requires ~25-35 minutes, which is manageable in a single session when broken into 3 sprints with breaks (per Elizabeth's Calm Quest UX pattern). T2 at 59 items is a quick mid-check. T3 at 134 items parallels T1 for longitudinal comparison with the addition of contextual measures.

The battery provides the EF→Durable Skills crosswalk that is C2A's primary clinical differentiator — coaches can see whether a student's durable skill struggle is rooted in executive function patterns, motivation/autonomy deficits, or contextual factors. The 4-lens organization maps directly to the DDx (differential diagnosis) pattern matching system.

Two custom instruments (NBS-6, RQM-6) lack published norms and use linear fallback normalization (Tier 2 per DR-026).

## Related Decisions

- Implements: DR-006 (dual scoring), DR-009 (5 response formats), DR-016 (MEAN scoring)
- Enables: DR-017 (three-layer measurement), DR-018 (configurable reporting), DR-025/026/027 (normalization)
- Constrained by: DR-008 (licensing deferred — all instruments must be pilot-safe)

## Related Artifacts

- Perplexity report (all items): [Google Doc](https://docs.google.com/document/d/1BSr7L9RId7YOf9IixuS707dsC5G1bBJUBBmojGNzwYA/edit)
- Scoring Engine Architecture: Notion page `3094659c-b96d-8152-80ac-e19f30fee6ef`
- C2A Student User Journey Map v3.1: [Google Doc](https://docs.google.com/document/d/1diyJu3FEvwhFjp4sl0QoNB7TuHCqTyaXffWsdm6f9lo/edit)
- `packages/assessment-engine/data/instruments/` — JSON definitions per instrument

## Source

Battery composition evolved across multiple conversations Jan 22–Feb 16, 2026. Original battery recommended Jan 22 (conversation: "Battery for measuring durable skills and executive function development"). Refined through instrument research sessions, finalized at 14+2 instruments on Feb 16 when THR-21 was updated. Eric drove instrument selection based on psychometric expertise; Elizabeth validated UX feasibility of item count.
