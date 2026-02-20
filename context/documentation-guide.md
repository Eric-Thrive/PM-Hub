# Documentation Guide

## Purpose
This guide explains where documentation lives, what each type is for, and how to maintain it.

---

## Documentation Hierarchy

**PM-Hub (GitHub)** ← SOURCE OF TRUTH for all PM context and technical documentation
- `context/priorities.md` — Current focus
- `context/product-context.md` — All 3 products overview
- `context/team-context.md` — Who's who
- `context/linear-workflow.md` — How we use Linear
- `context/workflows.md` — Recurring processes
- `context/documentation-guide.md` — This file
- `sessions/handoff.md` — Session continuity notes
- `logs/work-product-log.md` — Deliverable version history
- `c2a/` — All C2A technical documentation, scoring specs, framework files
- `skills/` — Claude Skills system

**Linear** ← Tactical execution
- Issues, comments, specs, decisions made during work

**Google Drive** ← External reference documents
- [ThrivePM References](https://drive.google.com/drive/folders/1sZBu0Veon-g3PgJOIg_gpmxgWA06ay_J) — SOWs, grants, research papers, assessment docs, meeting briefs

**Code Repositories** ← Technical documentation
- `thriveiep` monorepo — Accommodation Engine, PI Redactor, C2A app code
- `PM-Hub` — PM context, psychometric data, skills

---

## Document Types

### PM Context (PM-Hub `context/`)

| File | Purpose | Update Frequency |
|------|---------|-----------------|
| `priorities.md` | Current quarter focus, key decisions | Bi-weekly or when priorities shift |
| `product-context.md` | Overview of all 3 products | Quarterly or after major changes |
| `team-context.md` | Team members, roles, ownership | When team changes |
| `linear-workflow.md` | How we use Linear | When workflow changes |
| `workflows.md` | Daily/weekly routines | When routines change |
| `documentation-guide.md` | Where docs live, conventions | When structure changes |

### C2A Technical Docs (PM-Hub `c2a/`)

| Directory | Contents |
|-----------|----------|
| `c2a/docs/` | Design documents, requirements, architecture specs |
| `c2a/framework/` | LE3 framework JSON, construct maps |
| `c2a/scoring/specs/` | 14 instrument scoring specification JSONs |
| `c2a/scoring/norms/` | 8 norms registry JSONs |
| `c2a/ddx/` | DDx engine artifacts |
| `c2a/pipeline/` | Instrument definitions |
| `c2a/research/` | Literature reviews |

### Reference Documents (Google Drive)

| Content | Location |
|---------|----------|
| SOW documents | ThrivePM References |
| Grant proposals | ThrivePM References |
| Research papers | ThrivePM References |
| Assessment instruments | ThrivePM References |
| Meeting briefs | ThrivePM References |

### Repo Documentation

| File | Purpose | Location |
|------|---------|----------|
| `README.md` | Setup instructions, how to run locally | Repo root |
| `ARCHITECTURE.md` | System design, component overview | Repo root |
| `claude.md` | Codebase context for AI assistants | Repo root |
| `/docs/` folder | Detailed documentation, ADRs | Repo |

---

## Linear as Documentation

Linear serves as living documentation for current work, decisions made (issue comments), technical specs (issue descriptions), blockers, and historical context (closed issues).

**Convention:** When a significant decision is made in a Claude conversation, capture it in a Linear issue or comment. Claude conversations are ephemeral; Linear is the record.

---

## Naming Conventions

### PM-Hub Files
- Lowercase, hyphenated: `product-context.md`, `scoring-engine-architecture.md`
- JSON files: snake_case matching instrument IDs: `adexi.json`, `caas_sf.scoring.json`

### Linear
- Project names: Title Case ("Accommodation Engine")
- Issue titles: Sentence case, action-oriented ("Fix OCR timeout on large documents")
- Labels: lowercase, hyphenated (`tech-debt`, `k12-module`)

---

## Quick Decision Guide

- **Spec needed:** New features, architecture changes, anything touching compliance, multi-sprint work
- **ADR needed:** Technical decisions you might need to explain later ("why did we choose X?")
- **Linear issue only:** Bug fixes, small enhancements, maintenance tasks

---

## For New Team Members

Start here:
1. `context/product-context.md` — Understand the products
2. `context/linear-workflow.md` — How we track work
3. Repo `README.md` — Get your dev environment running
4. Repo `claude.md` — Understand the codebase

---

*Migrated from Notion: February 20, 2026. Updated for GitHub-first architecture.*
