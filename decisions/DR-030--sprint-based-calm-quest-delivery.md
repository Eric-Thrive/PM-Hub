# DR-030: Sprint-based assessment delivery with Calm Quest UX pattern

**Date:** 2026-02-16
**Status:** Accepted
**Product:** C2A
**Issues:** THR-12, THR-30, THR-179, THR-176

## Context

T1 requires students to complete 131 items across 12 instruments in a single assessment session. A 131-item continuous survey would cause fatigue, abandonment, and reduced data quality — especially for the target population of neurodivergent students who may have executive function challenges that make sustained attention to monotonous tasks particularly difficult.

The "Jayla" design persona (representing a neurodivergent NLU student) informed the UX approach. Elizabeth developed the C2A Student User Journey Map v3.1 with human-centered design principles specifically addressing assessment fatigue, autonomy support, and psychological safety.

## Decision

T1 assessment is delivered in **3 sprints** (T1a: ~48 items, T1b: ~47 items, T1c: ~36 items) using a "Calm Quest" UX pattern. Each sprint is a self-contained chunk with:

- Progress visualization within and across sprints
- Mid-sprint breaks with micro-celebrations at sprint completion
- Save & Exit capability at any point with session resume
- Auto-save on each response (no lost work)
- A "Why We Ask" expandable section for transparency
- Sprint Complete reward cards before returning to the Learner Home dashboard

The student experience flows through 5 phases: Safe Entry (auth + consent) → Learner Home (dashboard + sprint selection) → Assessment Loop (item rendering + breaks) → Sprint Completion (rewards + return) → Battery Completion (staged results reveal + feedback touchpoint).

## Alternatives Considered

- **Single continuous survey** — Rejected due to fatigue risk, especially for neurodivergent population. Research shows response quality degrades after ~50 items without breaks.
- **Conversational/chatbot delivery** — Rejected for psychometric validity reasons: validated instruments require standardized item presentation. Chatbot wrapping introduces response bias.
- **Instrument-by-instrument delivery** — Rejected because 12 separate assessment sessions creates scheduling/compliance burden. Sprints group instruments by theme (lens) for coherent experience.

## Consequences

The sprint structure adds UI complexity (sprint state management, progress tracking across sprints, resume logic) but significantly improves completion rates and data quality. The Lovable wireframe provides the UX foundation (shadcn/ui components, mobile-first layout), with production implementation handling the actual instrument rendering from JSON definitions and database persistence.

Save & Exit + auto-save means students can complete assessment across multiple sittings if needed, reducing the "must finish now" pressure that disproportionately affects students with executive function challenges.

## Related Decisions

- Implements: DR-029 (battery composition defines what goes in each sprint)
- Enables: DR-009 (response formats rendered within sprint context)
- Related: DR-021 (report philosophy — student empowerment extends to the assessment experience itself)

## Related Artifacts

- C2A Student User Journey Map v3.1: [Google Doc](https://docs.google.com/document/d/1diyJu3FEvwhFjp4sl0QoNB7TuHCqTyaXffWsdm6f9lo/edit)
- Lovable wireframe repo: `https://github.com/ThriveIEP/learn-profile-builder`

## Source

Elizabeth's C2A Student User Journey Map v3.1 (February 2026), reviewed in conversation Feb 16, 2026. Sprint structure derived from HCD principles for neurodivergent assessment contexts. Eric validated psychometric acceptability of sprint breaks between instruments.
