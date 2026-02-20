# C2A Norms Registry

Published norms data for the C2A normalization service (THR-197). Two-tier strategy:
- **Tier 1 (T-score):** 7 instruments with published norms → T-score conversion
- **Tier 2 (Linear min-max):** 5 R&D instruments without published norms → linear 1-100 scaling

## Files

| File | Instrument | Tier | Source | N |
|---|---|---|---|---|
| `norms-index.json` | Master registry | — | All sources | — |
| `adexi.json` | ADEXI (EF) | 1 | Holst & Thorell 2018 | 105 |
| `cfs.json` | Cognitive Flexibility Scale | 1 | Martin & Rubin 1995 | 200 |
| `brs.json` | Brief Resilience Scale | 1 | Smith et al. (clinical cutoffs) | 844 |
| `caas-sf.json` | Career Adapt-Abilities (Short) | 1 | Maggiori et al. 2015 | 2800 |
| `iri.json` | Interpersonal Reactivity Index | 1 | Davis 1980/83 (pooled gender) | 1161 |
| `bpnsfs.json` | Basic Psych Needs (SDT) | 1 | Chen et al. 2015 | 298 |
| `gms.json` | Global Motivation Scale | 1 | Guay et al. 2003 | 360 |

## Key Decisions

- All instruments oriented so **high = positive** (reflections applied to ADEXI, BPNSFS frustration, GMS amotivation/external regulation)
- IRI: pooled gender norms, item-mean level, +1.0 reanchoring offset (Davis 0-4 → C2A 1-5)
- CFS is the only sum-scored instrument; all others use item-mean
- RAI (GMS) computed on unreflected scores
- Category thresholds: Low (<25), Needs Focus (25-42), Developing (42-58), Strong (58-75), Very Strong (>75)

Target path in app repo: `packages/assessment-engine/data/norms/`
