# Retroactive Design Record Triage

> **Purpose:** Track which resolved Linear issues need retroactive DRs extracted from past conversations.  
> **Updated:** 2026-02-22  
> **Workflow:** Search past chats → extract decisions → create DR files → link to Linear → check off below.

---

## HIGH Priority — Architecture/Strategy Decisions

| Done | Issue | Title | Existing DRs | New DRs Created | Notes |
|:----:|-------|-------|-------------|----------------|-------|
| ✅ | THR-52 | BLOCKER: Architect HIPAA/FERPA compliant system | DR-007 | DR-010, 011, 012, 013 | 5 DRs total. Full proof-of-concept. |
| ✅ | THR-132 | Design scoring engine architecture for C2A | DR-006 | DR-014, 015, 016, 017 | 5 DRs total. Pipeline, file architecture, MEAN override, 3-layer model. |
| ✅ | THR-131 | Reporting schema / construct mapping (Layer 1→2) | DR-017 | DR-018, 019, 020 | 4 DRs total. Configurable schema, distributed mapping, coverage gaps. |
| ✅ | THR-133 | Define C2A report dimensions and info architecture | — | DR-021, 022, 023, 024 | 4 DRs: report philosophy, HTML delivery, template-driven interp, four-view hierarchy. |
| ✅ | THR-197 | Normalization service (norm-referenced + linear fallback) | DR-006 | DR-025, 026, 027 | 4 DRs total. Architectural separation, norms registry design, interpretive categories. |
| ⬜ | THR-12 | Design NLU assessment app | — | — | Foundational design: requirements, wireframes, data model, LE3 integration. |
| ⬜ | THR-32 | Instrument definition files (JSON) | DR-009 | — | ASSesJSON schema decisions. DR-015 may partially cover via two-file architecture. |
| ⬜ | THR-140 | Build TypeScript scoring engine for C2A | DR-006 (partial) | — | Language choice (TS over Python), JSON-driven config. May be covered by DR-014/015/016. |

## MEDIUM Priority — Worth a Quick Search

| Done | Issue | Title | Existing DRs | New DRs Created | Notes |
|:----:|-------|-------|-------------|----------------|-------|
| ⬜ | THR-29 | Student and advisor authentication (MVP) | — | — | Auth approach: magic links vs passwords, token-based access. |
| ⬜ | THR-151 | Update report prompts (learner language, pronouns, PII) | — | — | PII withheld from OpenAI calls decision. |
| ⬜ | THR-111 | Add Student and Advisor roles to RBAC | — | — | Role naming, hierarchy. Low priority. |
| ⬜ | THR-81 | Create custom report schema for Prepare to Bloom | — | — | First custom report type. Product-specific. |
| ⬜ | THR-108 | Migrate ThriveIEP app to Aptible | DR-007, 013 | — | Strategy captured. Implementation details less critical. |
| ⬜ | THR-95 | FERPA Compliance Audit Logging | DR-012 | — | Strategy captured. Implementation in issue. |

## LOW Priority — Skip (Implementation / Operational)

<details>
<summary>37 issues — pure implementation, bug fixes, coordination, or already covered by existing DRs</summary>

| Issue | Title | Why Skip |
|-------|-------|----------|
| THR-176 | Implement student frontend | Spec execution |
| THR-179 | Implement survey engine (frontend) | Spec execution |
| THR-172 | Implement scoring service, RBAC, coach routes | Spec execution |
| THR-207 | Student survey UX and database scoring check | QA/coordination |
| THR-155 | Database schema (enums, tables, migration) | Schema from spec |
| THR-160 | InstrumentRegistry and default battery seed | Spec execution |
| THR-165 | Student assessment API routes | Spec execution |
| THR-164 | Admin routes (timepoint CRUD + assignment) | Spec execution |
| THR-163 | Implement timepoint service | Spec execution |
| THR-149 | FERPA compliance UI components | UI for existing backend |
| THR-154 | Change "advisor" role to "coach" | Naming change |
| THR-150 | Fix post-secondary print report formatting | Bug fix |
| THR-153 | Rename repo to "accommodation-engine" | Rename task |
| THR-181 | Sync with Soham: Get Aptible database URL | Coordination |
| THR-141 | Session idle timeout middleware (30-min) | Spec execution |
| THR-142 | FERPA right-to-access: Data export workflow | Spec execution |
| THR-143 | FERPA right-to-amend: Amendment workflow | Spec execution |
| THR-145 | FERPA disclosure accounting | Spec execution |
| THR-109 | Wire up audit logging to database | Implementation of DR-012 |
| THR-110 | Add consent tracking table and UI | Spec execution |
| THR-116 | Obtain Lovable code from Elizabeth | Coordination |
| THR-135 | Verify dev server and push to production | Deployment |
| THR-129 | Railway Dev Environment test | Testing |
| THR-128 | Remove Markdown Dependencies | Tech debt cleanup |
| THR-127 | Fix PDF Printing (Railway) | Bug fix |
| THR-122 | Generate Bloom Report for Emily F | Client work |
| THR-103 | Merge refactoring branch into main | Git housekeeping |
| THR-40 | Review RFP from Slack | Research/review |
| THR-85 | Prep for Bloom meeting | Meeting prep |
| THR-63 | Resend report draft email to Shayna | Email task |
| THR-126 | Create C2A roadmap image for Elizabeth | Deliverable |
| THR-30 | Survey delivery UI component | UI implementation |
| THR-27 | Project scaffolding and infrastructure setup | Setup task |
| THR-28 | Database schema design and implementation | Schema from THR-140 types |
| THR-31 | Scoring engine implementation | Covered by THR-140/DR-014 |
| THR-130 | Aptible Deployment Testing | Execution of DR-007 |

</details>

---

## Summary

| Metric | Count |
|--------|-------|
| Total resolved issues triaged | 51 |
| HIGH priority | 8 |
| MEDIUM priority | 6 |
| LOW priority (skip) | 37 |
| **Issues complete** | **5 of 8 HIGH** |
| **DRs created (retroactive)** | **18** (DR-010 through DR-027) |
| **DRs created (all time)** | **27** (DR-001 through DR-027) |
