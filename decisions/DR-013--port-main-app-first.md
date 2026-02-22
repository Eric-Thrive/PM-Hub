# DR-013: Port main app to Aptible first, then build C2A on top

**Date:** 2026-01-27
**Status:** Accepted
**Product:** General
**Issues:** THR-52, THR-108, THR-130

## Context

ThriveIEP has three products (Accommodation Engine, PI Redactor, C2A Assessment) all needing compliance-grade hosting. C2A was being built from scratch while the existing products were running on Railway (compute) + Replit Neon (Postgres). The team needed to decide whether to build C2A on fresh infrastructure or migrate the existing app first.

## Decision

Port the main ThriveIEP app (Accommodation Engine + PI Redactor) from Railway/Replit Neon to Aptible first, then build C2A on top of the existing app's infrastructure. C2A uses the main app's existing user creation system, RBAC, and database — extending it with new roles (Student, Coach) rather than creating a parallel system.

## Alternatives Considered

- **Build C2A on separate infrastructure** — Rejected because it would create infrastructure sprawl, duplicate user management, and double compliance work across two platforms
- **Build C2A first, migrate existing products later** — Rejected because the main app already has working auth, RBAC, and user management that C2A needs; migrating first gives C2A a running start
- **Keep existing products on Railway, only C2A on Aptible** — Rejected because all products need compliance-grade hosting and maintaining two hosting environments increases operational burden

## Consequences

All three products share a single compliance foundation — FERPA/HIPAA work done once benefits everything. C2A gets existing auth/RBAC infrastructure instead of building from scratch. Migration creates a temporary blocker (Soham must complete the Aptible migration before C2A can deploy to production), but the sequencing is faster overall. Dependency order: THR-108 (migrate) → THR-130 (test deployment) → C2A production deployment.

## Related Decisions

- Builds on: DR-007 (Aptible as target platform)
- Constrains: C2A development can proceed in parallel but production deployment is blocked until main app migration is complete

## Related Artifacts

- THR-108 (Migrate ThriveIEP app to Aptible)
- THR-130 (Aptible deployment testing)
- THR-52 description (strategy section)

## Source

THR-52 issue creation on 2026-01-27 and subsequent conversations. Strategy documented directly in the THR-52 issue description: "Port main app first, then build C2A on top."
