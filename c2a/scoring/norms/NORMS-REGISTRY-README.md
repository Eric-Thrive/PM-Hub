# C2A Norms Registry — Claude Code Handoff

## What this is

These 8 JSON files (`norms-index.json` + 7 instrument files) are the **published norms registry** for THR-197 (Normalization Service), a dependency of THR-22 (Profile Generation Engine). They live at `packages/assessment-engine/data/norms/` and are consumed at profile-generation time to convert raw scores into a unified 1–100 display scale.

## Two-tier normalization strategy

### Tier 1: T-score normalization (7 instruments with published norms)
- ADEXI, CFS, BRS, CAAS-SF, IRI, BPNSFS, GMS
- Formula: `T = 50 + 10 × ((X - M_pub) / SD_pub)`
- Then map to 1–100 display scale with 5 categories

### Tier 2: Linear min-max scaling (5 R&D instruments without norms)
- SPCC, LCQ-6, Team Psych Safety, NBS-6, RQM-6
- Formula: `display = ((X - scale_min) / (scale_max - scale_min)) × 99 + 1`
- Same 5 category thresholds apply

### Category thresholds (both tiers)
| Category    | Display Range |
|-------------|---------------|
| Low         | 1 – 24        |
| Needs Focus | 25 – 42       |
| Developing  | 42 – 58       |
| Strong      | 58 – 75       |
| Very Strong | 75 – 100      |

## Reflection logic

All instruments are oriented so **high = positive**. Three instruments require reflection before T-score conversion:

- **ADEXI**: `6 - raw` on ALL subscales (original: high = more EF difficulty)
- **BPNSFS**: `6 - raw` on frustration subscales ONLY (satisfaction unchanged)
- **GMS**: `8 - raw` on amotivation + external regulation (intrinsic motivation unchanged)

## IRI reanchoring

Davis (1980/83) norms use 0–4 Likert. C2A uses 1–5. Conversion:
1. Published sum-score norms → pooled gender (weighted by N)
2. Convert to item-mean
3. Add +1.0 reanchoring offset
4. SDs unchanged (linear shift)

Result: PT M=3.48, SD=0.69; EC M=3.91, SD=0.60

## GMS special handling

The RAI (Relative Autonomy Index) is computed on **ORIGINAL (unreflected)** scores:
`RAI = 2×IM + 0×ER + -2×Amot` (range: -14 to +14)

## File inventory

```
norms-index.json    # Master registry — instrument configs, category thresholds
adexi.json          # EF (reflected) — Holst & Thorell 2018, N=105
cfs.json            # Cognitive flexibility (sum-scored) — Martin & Rubin 1995, N=200
brs.json            # Resilience (+ clinical cutoffs) — Smith et al. 2008, N=844
caas-sf.json        # Career adaptability (4 subscales + total) — Maggiori et al. 2015, N=2800
iri.json            # Empathy (reanchored, pooled gender) — Davis 1980/83, N=1161
bpnsfs.json         # SDT needs (frustration reflected) — Chen et al. 2015, N=298
gms.json            # Motivation bookends (amot + extreg reflected) — Guay et al. 2003, N=360
```

## Pipeline context

The scoring engine (THR-140) stores **raw scores** only. Normalization happens at **render time** (profile generation). The normalization service:
1. Loads raw subscale scores from DB
2. Applies reflections where needed
3. Applies T-score (Tier 1) or linear min-max (Tier 2)
4. Maps to 1–100 display scale
5. Assigns category label
6. Returns `{ displayScore, tScore, category, percentile }` per subscale

## Linear issues

- **THR-197** — Normalization Service (these files are the data dependency)
- **THR-22** — Profile Generation Engine (parent)
- **THR-196** — Profile schema
- **THR-198** — Interpretation templates (uses category labels from these norms)

## Open threads

- SPCC cutoffs file not yet created (Tier 1.5 candidate — McCroskey's published categorical cutoffs)
- NBS-6/RQM-6 scale definitions TBD (custom R&D instruments)
- Tier 2 instruments will migrate to Tier 1 as pilot data accumulates (N ≥ 50 for local norming)
- Category thresholds may be refined after pilot data analysis
- Gender-specific IRI norms available for future refinement (currently pooled)
