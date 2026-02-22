# DR-024: Four report views — student-first, coach second, admin/research deferred

**Date:** 2026-02-10
**Status:** Accepted
**Product:** C2A
**Issues:** THR-133, THR-201, THR-22

## Context

THR-133 required defining who sees what in the C2A report system. Different stakeholders need different information: students need empowerment and action steps, coaches need clinical detail and coaching strategies, administrators need aggregate trends, and researchers need raw data access. Building all four simultaneously would delay the pilot.

From the NLU kickoff: "Two distinct deliverables: (a) Profile/results report, (b) Intervention recommendations (separate timeline). Must support vocabulary translation across institutional frameworks."

## Decision

Four report views in strict priority order, with only the first two built for M3:

1. **Student view** (Priority #1, M3) — Deep collaboration Eric + Elizabeth. Strengths-based, 8th-grade reading level, Four Coaching Lenses layout, action plan integration. This is the primary product deliverable.
2. **Coach/advisor view** (Priority #2, M3) — Extended student view with clinical flags, DDx details, raw scores, normalization metadata. Same HTML artifact with additional sections.
3. **Admin view** — Lower priority, deferred. Aggregate dashboards, cohort analytics, program effectiveness.
4. **Research view** — Future state. Raw data export, psychometric analysis support, instrument validation data.

Student view drives all design decisions. The coach view is additive, never replacing student-facing content.

Primary use cases confirmed:
- **A) Coach view** — "Show me this student's journey: assessments → interventions → outcomes over time"
- **B) Student view** — "See your own growth and what's worked for you"
- Coach annotations dropped from initial scope

## Alternatives Considered

- **Coach-first design** — Rejected. The product philosophy is "designed through the student, not around them." If the student view isn't compelling, the product fails regardless of coach tools.
- **All four views simultaneously** — Rejected. Over-engineering for 15-student pilot. Admin and research views can wait.
- **Single combined view** — Rejected. Students shouldn't see clinical flags or raw scores. Coaches need detail students don't.

## Consequences

- THR-201 HTML renderer produces two variants (student, coach), not four
- Elizabeth collaboration on student view is critical path — UX/design drives the template authoring
- Coach view is a superset — any change to student view automatically flows to coach view
- Vocabulary translation framework (LE3 → America Succeeds → employer) lives in DR-018 (configurable reporting schema) but only the LE3 mapping is active for M3
- Admin and research views become post-pilot features, informed by what the pilot reveals about stakeholder needs

## Related Decisions

- Builds on: DR-021 (report philosophy), DR-018 (configurable reporting schema)
- Constrains: THR-201 (only two view variants needed at M3)

## Source

Feb 10 NLU kickoff transcript (priority order defined). Jan 29 conversation (student view as primary use case, coach annotations dropped). Feb 17 conversations (confirmed HTML dual-view approach).
