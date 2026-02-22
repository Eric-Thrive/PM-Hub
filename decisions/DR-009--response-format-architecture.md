# DR-009: Preserve original published response formats per instrument (5 distinct UI formats)

**Date:** 2026-02-21
**Status:** Accepted
**Product:** C2A
**Issues:** THR-32

## Context

The C2A 14-instrument battery was assumed to have 3-4 response formats (5-point Likert, 7-point Likert, 0-100 slider). During UI implementation planning, detailed review of published instruments revealed 5 distinct formats with instrument-specific anchor wording that varies even within the same scale-point count. The question was whether to standardize formats for UI simplicity or preserve original published formats for psychometric validity.

Key constraints:
- BPNSFS-24 and GMS-Bookends are primary SDT outcome instruments — precision matters for detecting change in a 15-student pilot
- CFS (Martin & Rubin, 1995) was published with a 6-point scale intentionally omitting the neutral midpoint
- The Perplexity items reference doc incorrectly listed BPNSFS as 1-5; the published Chen et al. (2015) version is 1-7
- Each instrument within the same point count uses different anchor wording (e.g., "Definitely not true" vs "Strongly Disagree" vs "Does not describe me well" — all 5-point)

## Decision

Preserve all original published response formats. The battery uses 5 distinct response formats:

1. **5-point agreement/ability Likert** (46 items): ADEXI, BRS, CAAS-SF, IRI — fully labeled, instrument-specific anchors
2. **6-point agreement Likert** (12 items): CFS — fully labeled, no neutral midpoint
3. **7-point true/agree Likert** (52 items): BPNSFS-24, GMS-Bookends, MSLQ-CT, LCQ-6, TPS-7 — endpoint-only labels
4. **5-point frequency Likert** (12 items): C2A-NBS-6, RQM-6 — fully labeled (Never→Very often)
5. **0-100 competence slider** (12 items): SPCC — endpoint labels + numeric display

Additional sub-decisions:
- 7-point scales display **endpoint-only labels** (positions 1 and 7 labeled, 2-6 show numbers only) — per original validation studies, avoids anchoring artifacts
- 5-point and 6-point scales display **all labels** — respondents can hold 5-6 categories in working memory
- SPCC slider defaults to **50** (not 0) to avoid low-anchor bias
- SFCQ format remains TBD (Thomas et al. published 7-pt, some adaptations use 5-pt) — UI component built configurable

## Alternatives Considered

- **Standardize all to 5-point Likert** — Rejected. Would require converting BPNSFS (loses satisfaction/frustration distinction at "3"), GMS (loses amotivation floor detection), and CFS (adds artificial midpoint to forced-choice design). Loses ~40% measurement resolution on 7-point instruments. Only defensible if pilot goal is "prove assessment works at all" rather than "demonstrate measurable SDT outcome shifts."
- **Standardize to 5-point except SPCC** — Rejected for same reasons above regarding BPNSFS/GMS precision.
- **Convert only contextual enablers (LCQ-6, TPS-7) to 5-point** — Considered viable but rejected as unnecessary complexity. These are T3-only instruments (13 items total), and keeping them at 7-point means the 7-point UI component serves 52 items instead of 39. Not worth creating a special case for 13 items.

## Consequences

- Soham needs to build **3 reusable UI components**: LikertScale (configurable for 5/6/7 points with full or endpoint-only labeling), CompetenceSlider (0-100), InstrumentBlock (container wrapper)
- Each instrument requires its own label array in config — no shared "default Likert" labels
- Scoring normalization must account for different scale ranges when computing cross-instrument composites
- The Response Format Reference doc (`C2A_Response_Format_Reference.docx`) serves as the authoritative UI spec

## Related Decisions

- Builds on: DR-006 (dual scoring approach — normalization must handle different input ranges)
- Builds on: DR-008 (licensing deferred — preserving original formats avoids creating unvalidated derivatives)

## Related Artifacts

- [C2A Response Format Reference](../c2a/docs/C2A_Response_Format_Reference.md) — complete UI spec with label arrays per instrument
- [Perplexity report all items](https://docs.google.com/document/d/1BSr7L9RId7YOf9IixuS707dsC5G1bBJUBBmojGNzwYA/edit) — master item listing (source doc)
- [C2A Score Reference v2.0](https://docs.google.com/spreadsheets/d/1P6MuHlYD_V5NjScgldNRotDjURmWRg1o/edit) — scoring spec spreadsheet

## Source

PM Copilot Session 29, 2026-02-21. Scale standardization analysis prompted by UI implementation planning.
