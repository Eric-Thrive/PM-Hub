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
- `decisions/` — Decision records (DR-XXX) with INDEX.md
- `skills/` — Claude Skills system

**Linear** ← Tactical execution
- Issues, status, assignments, milestones, sprints
- Links to PM-Hub decision records and specs for reasoning context

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

## Decision Records (PM-Hub `decisions/`)

Structured records capturing the reasoning behind significant decisions. Each DR includes context, the decision itself, alternatives considered, consequences, and links to related issues and artifacts.

| File | Purpose |
|------|---------|
| `INDEX.md` | Searchable table of all DRs with tags — read at session start |
| `TEMPLATE.md` | Template for new decision records |
| `DR-XXX--slug.md` | Individual decision records |

**When to create a DR:**
- Architecture or infrastructure choices
- Product scope decisions (what's in/out of MVP)
- Process or tooling changes
- Any decision you might need to explain 6 months from now

**Workflow:** Decisions are captured in real-time during conversations (while context is fresh), not extracted after the fact. Claude drafts the DR, Eric approves, Claude commits to PM-Hub and links from relevant Linear issues.

**Convention:** Linear issues link to DRs for reasoning context. DRs reference Linear issue IDs (THR-XX) for tactical traceability.

### Naming Convention
- Files: `DR-XXX--lowercase-slug.md` (e.g., `DR-006--dual-scoring-approach.md`)
- Sequential numbering, never reuse IDs
- Slugs should be descriptive enough to identify the decision from a file listing

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

- **Decision Record needed:** Architecture choices, infrastructure decisions, product scope, process changes, anything you'd need to explain later
- **Spec needed:** New features, architecture changes, anything touching compliance, multi-sprint work
- **Linear issue only:** Bug fixes, small enhancements, maintenance tasks, tactical work

---

## For New Team Members

Start here:
1. `context/product-context.md` — Understand the products
2. `decisions/INDEX.md` — Key decisions and their reasoning
3. `context/linear-workflow.md` — How we track work
4. Repo `README.md` — Get your dev environment running
5. Repo `claude.md` — Understand the codebase

---

*Migrated from Notion: February 20, 2026. Updated for GitHub-first architecture.*
