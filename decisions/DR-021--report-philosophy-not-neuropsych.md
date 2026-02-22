# DR-021: C2A reports must be short, chunked, and empowering — NOT neuropsych-style

**Date:** 2026-02-10
**Status:** Accepted
**Product:** C2A
**Issues:** THR-133, THR-22, THR-201

## Context

During the Feb 10 NLU kickoff, the team discussed what the C2A report should look and feel like. The natural instinct — given Eric's background in assessment at MIT, UCSF Dyslexia Center, and Carroll School — might be to produce comprehensive neuropsychological-style reports with clinical detail. However, C2A serves a fundamentally different audience: post-secondary students and career coaches who need actionable, accessible information.

The NLU pilot targets 15 students with neurodivergent profiles transitioning to post-secondary education. These students need to feel empowered by their results, not overwhelmed.

## Decision

C2A reports follow a "short, chunked, empowering" philosophy:

- **Short:** No multi-page clinical narratives. Information is concise and scannable.
- **Chunked:** Content is organized by the Four Coaching Lenses (EF Engine, Durable Skills, SDT Fuel, Contextual Enablers), not by instrument or subscale. Students consume one lens at a time.
- **Empowering:** Strengths are celebrated (Strong/Very Strong skills get encouragement narratives). Challenges are framed as coachable, not deficits. Language is 8th-grade reading level for student view.

Two distinct deliverables are separated by timeline:
1. **Profile/results report** — delivered at M3 (March 15), showing where students stand
2. **Intervention recommendations** — delivered later, building on 49 intervention cards across 8 skill domains with 14-day trial cycles

## Alternatives Considered

- **Neuropsych-style comprehensive report** — Rejected. Too clinical, too long, would overwhelm students and coaches. Appropriate for diagnostic evaluations, not for coaching.
- **Simple dashboard with no narrative** — Rejected. Numbers alone don't tell students what to DO. The coached interpretation is the value-add.
- **AI-generated personalized narratives** — Deferred to post-pilot. Templates are clinically auditable and faster to validate for M3.

## Consequences

- Report renderer (THR-201) builds student view and coach view as separate HTML variants
- Student view uses plain-language descriptions; coach view adds clinical detail
- Template library (THR-198) needs both student-facing and coach-facing text for every skill × category combination
- Profile simulation script (THR-203) is the validation mechanism — generate synthetic profiles, review templates, iterate
- Intervention recommendations are a separate future deliverable, not crammed into the M3 report

## Related Decisions

- Builds on: DR-017 (three-layer measurement architecture), DR-018 (configurable reporting schema)
- Constrains: THR-198 (template library must support dual voice), THR-201 (HTML renderer must produce two view variants)

## Related Artifacts

- Dashboard mock: https://eric-thrive.github.io/C2A-battery-211/
- NLU kickoff transcript (Feb 10)
- 49 intervention cards document (Google Docs)

## Source

Feb 10 NLU kickoff transcript; confirmed in multiple subsequent conversations (Feb 11, Feb 12, Feb 17).
