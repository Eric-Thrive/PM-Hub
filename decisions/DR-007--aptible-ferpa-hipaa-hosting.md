# DR-007: Migrate to Aptible for FERPA/HIPAA compliant hosting

**Date:** 2026-02-10
**Status:** Accepted
**Product:** General
**Issues:** THR-52, THR-108, THR-130

## Context

C2A handles student educational records (FERPA) and the Accommodation Engine processes psychological evaluation data (HIPAA). The existing hosting infrastructure lacked compliance-grade controls: audit logging, encryption at rest, access controls, and BAA coverage. Retrofitting compliance onto the existing platform would require more effort than migrating.

## Decision

Migrate all ThriveIEP applications to Aptible, a compliance-focused PaaS that provides HIPAA BAA, SOC 2 controls, encrypted databases, and audit logging out of the box. Soham executed the full migration including backend FERPA compliance components.

## Alternatives Considered

- **Retrofit existing hosting** — Rejected because infrastructure-level compliance (encryption, audit logs, access controls) is harder to bolt on than to build on a compliant platform
- **AWS with manual compliance setup** — Rejected because the team is too small to maintain compliance infrastructure manually; Aptible handles this as a managed service
- **Separate hosting per compliance regime** — Rejected because Aptible covers both FERPA and HIPAA, avoiding infrastructure sprawl

## Consequences

All three products benefit from the same compliance foundation — no per-product compliance work needed. Aptible adds hosting cost but eliminates compliance engineering overhead. Database credentials managed through Aptible's access control system (Eric needs credentials from Soham for schema migration work).

## Related Decisions

- Constrains: All new services deploy to Aptible

## Related Artifacts

- `context/product-context.md` (architecture overview)

## Source

Team discussions, early February 2026. Soham completed migration Feb 10-13.
