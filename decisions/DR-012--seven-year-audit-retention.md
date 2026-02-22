# DR-012: 7-year audit log retention with append-only storage

**Date:** 2026-01-29
**Status:** Accepted
**Product:** General
**Issues:** THR-52, THR-95, THR-109

## Context

FERPA requires maintaining records of access "for as long as the education records are maintained." Ed-tech industry practice ranges from 3-7 years. The team needed to define a retention period and storage strategy for audit logs that would satisfy FERPA requirements and support future HIPAA compliance for the Accommodation Engine.

## Decision

Retain audit logs for 7 years minimum. Use append-only storage (PostgreSQL with RULEs preventing UPDATE/DELETE on the audit table) to ensure tamper-proof records. Log three categories of events: PII views, report generation, and bulk exports. Start with internal-only access to audit logs, but architect for potential school/auditor self-service access in the future.

## Alternatives Considered

- **3-year retention (FERPA minimum)** — Rejected because 7 years provides better protection, aligns with longer institutional records cycles, and anticipates future HIPAA requirements (which mandate 6 years)
- **Mutable audit log table** — Rejected because compliance auditors expect tamper-proof records; append-only with PostgreSQL RULEs provides this without external tooling
- **Third-party audit logging service** — Not evaluated in depth; keeping logs in-database is simpler at current scale and avoids additional vendor relationships

## Consequences

Append-only audit tables will grow over time — need to plan for archival or partitioning at scale (not a concern at pilot volumes). All FERPA compliance features (consent tracking, data export, amendment workflows, disclosure accounting) depend on this audit infrastructure as a foundation. Future real-time alerting for suspicious access patterns can be layered on top of the same audit data.

## Related Decisions

- Builds on: DR-007 (Aptible provides infrastructure-level audit logs; this covers application-level logging)
- Constrains: All data access endpoints must emit audit events before this is complete

## Related Artifacts

- THR-109 (Wire up audit logging to database)
- THR-145 (FERPA disclosure accounting)

## Source

Conversation on 2026-01-29: [Issue review — FERPA compliance audit logging](https://claude.ai/chat/a968dfa5-d9b1-486e-b67e-6a75c931f264). Eric chose 7-year retention over 3-year minimum, confirmed scope to PII views/report generation/bulk exports, and deferred real-time alerts as future enhancement.
