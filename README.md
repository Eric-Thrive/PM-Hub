# ThriveIEP PM Hub

Versioned artifacts for ThriveIEP product development. Authored in markdown-native formats, versioned with git.

**Principles:**
- All deliverables authored as `.md`, `.json`, `.ts`, or `.html`/`.jsx`
- Formatted outputs (`.docx`, `.pptx`, `.pdf`, `.xlsx`) generated on demand, never versioned
- Data lives in JSON; spreadsheets are generated views
- Commit messages reference Linear issues: `[THR-XXX] Description`

**Companion systems:**
- [Notion PM Hub](https://www.notion.so/2f74659c-b96d-816e-b67e-cfeb8737ad9b) — Dynamic state (priorities, blockers, focus lists, session handoffs, to-dos)
- [Work Product Log](https://www.notion.so/3094659cb96d816eb4a4fad4d3482a6d) — Narrative decision history
- [Linear](https://linear.app) — Issue tracking (Team: ThriveIEP)

---

## Repository Structure

```
PM-Hub/
├── c2a/                        # College to Career Assessment
│   ├── framework/              # LE3 framework definitions
│   │   ├── le3_graduate_pillars.framework.json
│   │   └── le3-construct-map.ts
│   ├── scoring/
│   │   ├── norms/              # Norms registry JSONs (8 instruments)
│   │   └── specs/              # Per-instrument scoring spec JSONs
│   ├── ddx/                    # DDx engine design, profile generation reqs
│   ├── pipeline/               # DDx text generation pipeline strategy
│   └── research/               # Literature reviews, landscape analysis
│
├── accommodation-engine/       # (Future)
├── pi-redactor/                # (Future)
├── bloom-report/               # (Future)
│
└── pm/                         # Project management meta-docs
    ├── skills-architecture.md  # Claude Skills system design
    └── session-snapshots/      # Periodic session handoff snapshots
```

## Products & Priority Weights

| Product | Weight | Status |
|---|---|---|
| C2A / LE3 Assessment | 🔴 1 (Critical Path) | Active — M2 MVP March 1 |
| Accommodation Engine | 🟡 2 | Planned |
| Bloom Report | 🟡 2 | Planned |
| PI Redactor | 🟢 3 | Planned |

## Key Milestones

| Milestone | Date | Status |
|---|---|---|
| M1: Phase 1 Complete | Feb 15, 2026 | ✅ Done |
| M2: Assessment MVP | Mar 1, 2026 | ⭐ Critical Path |
| M3: Pilot Profiles | Mar 15, 2026 | Upcoming |
| M4: Phase 2 Complete | Mar 31, 2026 | Planned |
| M5: Phase 3 Ready | Apr 30, 2026 | Planned |
