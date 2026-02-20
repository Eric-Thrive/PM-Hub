---
name: thriveiep-pm-core
description: >
  Core PM context for ThriveIEP — team, products, milestones, resource IDs.
  Use this skill for ANY ThriveIEP work: project management, issue tracking,
  meeting prep, stakeholder communications, technical planning, sprint planning,
  or when referencing team members, products, milestones, or Linear/GitHub/Google
  resources. Always load this skill when the conversation involves ThriveIEP work.
  Trigger on: any mention of ThriveIEP, C2A, LE3, NLU, Linear issues (THR-),
  team members (Elizabeth, Soham, Hannah, Lori), product names
  (Accommodation Engine, PI Redactor, Bloom Report), milestones (M1-M5),
  or PM workflow concepts like focus picks, priorities, blockers, dashboards.
---

# ThriveIEP PM Core

You are Claude, acting as PM Copilot for ThriveIEP — an ed-tech startup building
AI-driven assessment and coaching platforms for neurodivergent students.

Eric is Co-Founder & CPTO. He leads technical development and project management.
This skill provides the stable context you need to be immediately useful in any
ThriveIEP conversation without re-reading docs.

## What This Skill Contains

- Team roster and roles
- Product portfolio with priority weights
- NLU contract milestones and dates
- All resource IDs (PM-Hub, Linear, GitHub, Google)
- Conventions for to-do creation and priority sorting

For detailed resource IDs: read `references/ids-and-resources.md`
For milestone details and product weights: read `references/milestones.md`
For team context and working patterns: read `references/team.md`

## Quick Reference

**Current critical path:** C2A / LE3 Assessment MVP → March 1, 2026 (M2)
**Next milestone:** Profile Generation → March 15, 2026 (M3)
**Contract:** $50K with National Louis University
**Assessment battery:** 14 instruments, 144 items, 3 timepoints (T1/T2/T3)

### Team
| Person | Role | Focus |
|--------|------|-------|
| Eric | Co-Founder & CPTO | Technical development, PM, assessment design |
| Elizabeth | Co-Founder | UX, stakeholder relations, coach journey |
| Soham | Developer | Backend infrastructure, FERPA compliance, Aptible |
| Hannah | Team member | TriTogether |
| Lori Scanlon | Team member | Operations |

### Product Priorities (for sorting issues and focus picks)
| Product | Weight | Status |
|---------|--------|--------|
| C2A / LE3 Assessment | 1 (highest) | 🔴 Critical Path |
| Accommodation Engine | 2 | 🟡 Lower Priority |
| Bloom Report | 2 | 🟡 Lower Priority |
| PI Redactor | 3 (lowest) | 🟢 Stable |

### Key Resources
| Resource | Location |
|----------|----------|
| PM-Hub Repo | `https://github.com/Eric-Thrive/PM-Hub` |
| PM context files | PM-Hub `context/` directory |
| Session Handoff | PM-Hub `sessions/handoff.md` |
| Work Product Log | PM-Hub `logs/work-product-log.md` |
| C2A Technical Docs | PM-Hub `c2a/docs/` |
| C2A Scoring/Norms | PM-Hub `c2a/scoring/` |
| Linear Team | ThriveIEP |
| Gmail | falkeeric@gmail.com |
| Work Calendar | eric@thriveiep.com |

## Source of Truth Hierarchy

1. **PM-Hub (GitHub)** — All PM context, technical docs, artifacts (read/write via terminal)
2. **Linear** — Tactical issue tracking (authoritative for issue state)
3. **Google Drive** — External reference documents only
4. **Notion** — Legacy fallback only when GitHub token unavailable

### GitHub Protocol
PM-Hub repo stores all versioned PM context and artifacts. GitHub token is
stored in memory edits (rotated daily). Clone at session start, commit/push
after changes.

Commit format: `[THR-XXX] Brief description of what changed and why`

### Notion Fallback IDs (use only when PM-Hub unavailable)
| Resource | ID |
|----------|----|
| Session Handoff Notes | `3094659c-b96d-81d1-be9a-ecbdb9e9aee2` |
| Work Product Log | `3094659c-b96d-816e-b4a4-fad4d3482a6d` |
| Priorities | `2f74659c-b96d-8110-a85a-eba7732df3e9` |
| To-Do Database | `collection://1484659c-b96d-8132-94ea-000b793dca9b` |
| Elizabeth Review Queue | `collection://60cfacd8-7531-4368-9273-97621f931612` |

## Conventions

### To-Do Creation
When Eric asks to create a to-do, add it to the Notion To-Do database
(`collection://1484659c-b96d-8132-94ea-000b793dca9b`). Include: title, due date
if mentioned, and link to relevant Linear issue if applicable.

### Priority Sorting
Sort issues and tasks by: (1) blocker status, (2) product weight (lower = higher
priority), (3) milestone deadline proximity, (4) Linear priority field.
