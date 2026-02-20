# Priorities

> **How Claude Should Use This Page**
>
> This is the source of truth for what matters right now. Always check this page.
>
> **Before starting any task:**
> 1. Check "This Week's Focus" — is the request aligned?
> 2. Check "Blockers" — is anything preventing progress?
> 3. Note hard deadlines (March 1 MVP, Jan 31 Phase 0)
>
> **When suggesting work:**
> - Pull from Linear for tactical details (issues, status, timeline)
> - Prioritize items on the critical path (C2A MVP)
> - Flag if a suggestion conflicts with current priorities

---

## Current Quarter Focus

*Last updated: February 10, 2026*

### Primary Focus

**C2A Profile MVP for NLU Design Partner** — $50K contract, hard deadline March 1

C2A (Cognition to Action) provides Executive Function + Durable Skills profiles with personalized intervention recommendations for college advising/coaching.

First customer: **National Louis University** (BA in Organizational Leadership students)

---

## Product Dashboard

| Product | Status | Owner | Linear Project |
|---------|--------|-------|---------------|
| **C2A / LE3 Assessment** | 🔴 Critical Path | Eric | LE3 Assessment |
| **Accommodation Engine** | 🟡 Lower Priority | Soham + Eric | Accommodation Engine |
| **PI Redactor** | 🟢 Stable | Soham + Eric | PI Redactor |
| **Bloom Report** | 🟡 Lower Priority | Eric | Bloom Report |

**For tactical details (issues, timeline, who's doing what) → check Linear**

---

## Key Milestones (SOW-Aligned)

### C2A / LE3 Assessment — NLU Contract

| Milestone | Date | Key Deliverables |
|-----------|------|-----------------|
| **M1: Phase 1 Complete** | Feb 15 | Kickoff done, infra scaffolded, FERPA architecture |
| **M2: Assessment MVP** ⭐ | March 1 | Students can take assessment battery (T1: 144 items / 14 instruments across 3 sprints) |
| **M3: Pilot Profiles** | March 15 | Profile generation working, 15 students receive C2A Profiles |
| **M4: Phase 2 Complete** | March 31 | Recommendations engine, Advisor/Coach view, coach orientation |
| **M5: Phase 3 Ready** | April 30 | Admin dashboard, infrastructure scaled for 750 profiles |

---

## Blockers

*None currently.*

---

## Future Requirements

| Requirement | Needed For | Owner | Linear Issues |
|-------------|-----------|-------|--------------|
| Instrument licensing | Commercial distribution (post-pilot) | Eric | THR-17, THR-18, THR-19 |

---

## This Week's Focus

*Week of: February 17, 2026*

**Eric's Priorities:**
- [ ] Continue C2A M2 backend: Scoring service, RBAC, coach routes (THR-172)
- [ ] C2A M2 frontend: Student frontend layout/onboarding (THR-176), Survey engine (THR-179)
- [ ] Scope and decompose M3 profile work (THR-22) — define profile delivery format, break into buildable issues
- [ ] Project scaffolding (THR-27, due Feb 18)
- [ ] Get DB credentials from Soham (THR-181) — blocker for schema migration
- [ ] Wed: Coach journey mapping session with Elizabeth
- [ ] Prep MVP vs post-MVP decision list for Wed coach journey session
- [ ] Build Soham audit todo list for new FERPA UI he built

**Soham's Priorities:**
- [ ] RBAC roles — Student and Advisor (THR-111, due Feb 19)
- [ ] FERPA compliance UI spec (THR-149, spec due Wed Feb 19)
- [ ] Provide Aptible DB credentials to Eric (THR-181)
- [ ] Report prompt updates: learner language, pronouns, PII (THR-151)

**Elizabeth:**
- [ ] Wed: Coach journey mapping session with Eric
- [ ] C2A UX mockups iteration (THR-93)
- [ ] Schedule and prepare NLU kickoff meeting (THR-134)
- [ ] Deep-dive walkthrough of assessment instruments with Eric

**Completed Last Week (Feb 10–16):**
- [x] Design scoring engine architecture (THR-132) ✅
- [x] Define C2A report dimensions (THR-133) ✅ Reviewed with Elizabeth
- [x] FERPA/HIPAA architecture (THR-52) ✅
- [x] Design NLU assessment app (THR-12) ✅
- [x] Build TypeScript scoring engine (THR-140) ✅
- [x] Construct mapping definitions (THR-131) ✅
- [x] C2A M2: Database schema (THR-155) ✅
- [x] C2A M2: InstrumentRegistry + battery seed (THR-160) ✅
- [x] C2A M2: Student assessment API routes (THR-165) ✅
- [x] C2A M2: Admin routes (THR-164) ✅
- [x] C2A M2: Timepoint service (THR-163) ✅
- [x] Scoring engine implementation (THR-31) ✅
- [x] Database schema design (THR-28) ✅
- [x] Sent Elizabeth full assessment instrument questions ✅
- [x] Soham follow-up: Aptible upgrade, C2A schema, DB credentials ✅
- [x] Soham: All FERPA backend complete (THR-109, 110, 141, 142, 143, 145) ✅
- [x] Soham: Aptible migration (THR-108, THR-130) ✅

---

## Recent Context / Updates

*Feb 13, 2026:*
- Soham check-in: Aptible migration fully complete. All FERPA backend done. Reviewed K-12 report work. Created 5 new issues from meeting. THR-149 updated: spec-first process.
- Elizabeth reviewed report mockups in dimensions meeting. "My Fuel / My Engine / My Environment" metaphor confirmed. Pillars must align with NLU's durable skills framework.
- Assessment design/delivery must be significant section of NLU kickoff. Elizabeth needs assessment instrument deep-dive before kickoff deck work.
- Soham management: structured 2x/day check-ins with written checklist.

*Feb 10, 2026:*
- NLU internal kickoff completed with Elizabeth. Report strategy: short, chunked, empowering. Assessment MVP target: first week of March. Recommendation engine target: April 1.
- Created Linear issues from transcript: THR-132 through THR-136.
- Hannah (TriTogether) confirmed Accommodation Engine migration working smoothly.

*Feb 5, 2026:*
- Refreshed Priorities page for week of Feb 3. Added Bloom Report to Product Dashboard.

*Jan 29, 2026:*
- Migrated PM context from local files to Notion PM Hub. Created ThrivePM References folder in Google Drive.

---

*Migrated from Notion: February 20, 2026*
