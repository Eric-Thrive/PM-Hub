# C2A Framework Definitions

Authoritative source files for the LE3 (Learn, Engage, Excel, Experience) durable skills framework.

## Files

| File | Description | Linear Issue | Status |
|---|---|---|---|
| `le3_graduate_pillars.framework.json` | Master framework definition — 12 LE3 skills, 4 pillars, DDx dimensions, coaching lenses, instrument registry | THR-199 Step 1 | Current (v2.0) |
| `le3-construct-map.ts` | TypeScript construct mapping — reliability-weighted subscale→skill rollup + DDx dimension passthrough | THR-199 Step 2 | Current |

## Notes

- These files supersede the earlier `ref3` taxonomy. See THR-199 and THR-131 for reconciliation history.
- The framework JSON is the single source of truth. The construct map is derived from it.
- Named `le3-construct-map.ts` (not generic `construct-map.ts`) so future framework mappings (America Succeeds, NACE) get parallel files.
