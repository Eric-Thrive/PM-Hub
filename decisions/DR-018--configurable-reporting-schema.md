# DR-018: Configurable reporting schema — same subscale scores serve multiple customer frameworks

**Date:** 2026-02-09
**Status:** Accepted
**Product:** C2A
**Issues:** THR-131, THR-22

## Context

The C2A assessment battery produces instrument subscale scores (Layer 1) that are psychometrically stable — the scoring algorithm doesn't change regardless of who the customer is. However, different customers need these same scores composed into different higher-order skill frameworks for reporting:

- NLU uses the LE3 Graduate Pillars Framework (12 durable skills across 4 pillars)
- A future K-12/policy customer might need America Succeeds alignment (10 domains)
- An employer customer might want role-relevant composites (e.g., "Client-facing effectiveness")

The question was whether to hardcode the LE3 mapping or build a configurable layer.

## Decision

The mapping between subscale scores and reportable constructs is defined as a **customer-configurable reporting schema** — a JSON definition file that the profile generation engine (THR-22) reads at runtime. One schema per customer framework. The schema specifies per-construct: primary indicators, constraint indicators, supporting indicators, intervention logic rules, and SDT outcome predictions.

For the NLU pilot (v1), only the LE3 12-skill schema is implemented. But the architecture supports swapping in alternative frameworks without changing the scoring pipeline.

## Alternatives Considered

- **Hardcode LE3 mappings** — Rejected because the same battery is designed to serve multiple institutional frameworks. Hardcoding would require rewriting the profile engine for each new customer. The assessment battery was explicitly designed around instrument coverage breadth (84 subscale→skill mappings across 10 instruments) to support framework flexibility.
- **Let customers define mappings via UI** — Deferred. For v1, schema files are authored by the ThriveIEP team. A future admin UI could allow institutional researchers to create custom mappings, but the underlying architecture is the same JSON schema.

## Consequences

- Profile engine (THR-22) must be framework-agnostic — it reads the schema, not hardcoded skill lists
- New customer onboarding requires creating a new schema JSON, not code changes
- The `construct_mapping` fields embedded in scoring specs (DR-015) provide the raw subscale→skill vocabulary; the reporting schema adds the interpretive layer (roles, weights, intervention logic)
- Schema validation is needed to ensure every referenced subscale ID exists in the scoring specs

## Related Decisions

- Builds on: DR-015 (two-file instrument architecture), DR-017 (three-layer measurement)
- Constrains: THR-22 (profile engine must consume schema at runtime)

## Source

- https://claude.ai/chat/6863ee5b-4b80-4538-84db-afcc9841b234 (THR-131 overview, Feb 11)
- https://claude.ai/chat/11301e03-b9ea-4b19-be60-d95311493c0a (scoring specs with construct_mapping, Feb 10)
- Linear THR-131 description (architecture diagram: Layer 1 → construct mapping → Layer 2 → profile engine → reports)
