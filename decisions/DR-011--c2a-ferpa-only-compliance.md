# DR-011: C2A requires FERPA compliance only (not HIPAA)

**Date:** 2026-01-31
**Status:** Accepted
**Product:** C2A
**Issues:** THR-52, THR-80

## Context

Early infrastructure planning assumed C2A needed HIPAA compliance, which drove decisions toward expensive hosting tiers ($500-1500/month), formal BAAs with every vendor, and complex compliance engineering. During hosting evaluation, Eric identified that C2A handles student educational records (FERPA) — not protected health information (HIPAA). The Accommodation Engine handles psych-ed documents and does need HIPAA, but C2A does not.

## Decision

Scope C2A compliance to FERPA only. FERPA requires "reasonable security measures" and contractual data handling agreements, but does not require a formal BAA. This means Aptible's free/starter tier provides sufficient compliance coverage for C2A, and stateless GPU providers like Modal need only SOC 2 and standard data processing terms (not a BAA).

HIPAA compliance remains a requirement for the Accommodation Engine, which uses Aptible's Production plan with BAA.

## Alternatives Considered

- **Apply HIPAA to all products uniformly** — Rejected because it unnecessarily increases costs ($499/month for Aptible Production plan) and adds compliance overhead for a product that doesn't handle health data
- **Defer compliance scoping** — Rejected because the cost difference between FERPA and HIPAA hosting was 10-50x and needed to inform infrastructure decisions immediately

## Consequences

C2A hosting drops from ~$500-1500/month (HIPAA tier) to ~$0-50/month (FERPA on Aptible free tier + Modal). Simplifies vendor evaluation — Modal's SOC 2 and stateless architecture are sufficient without a formal BAA. However, if C2A ever ingests health data (e.g., disability documentation beyond educational records), this decision must be revisited. The compliance boundary between C2A and Accommodation Engine must be clearly documented.

## Related Decisions

- Builds on: DR-007 (Aptible migration)
- Constrains: DR-010 (split architecture cost model depends on FERPA-only scope)

## Related Artifacts

- THR-80 (Research FERPA compliance requirements)
- NLU Design Partner Agreement (Exhibit A — FERPA requirements)

## Source

Conversation on 2026-01-31: [GPU vs HIPAA-compliant PaaS trade-offs](https://claude.ai/chat/5737e103-dff0-4035-a4ae-1b6352aa6e06). Eric's realization mid-conversation: "I actually just need FERPA not HIPAA so Aptible is free." This changed the entire cost model.
