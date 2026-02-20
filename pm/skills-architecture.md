# ThriveIEP Skills Architecture

## Vision

Replace the current multi-document Notion PM Hub + Cowork split with a cohesive set of Claude skills that encode Eric's PM workflows, business logic, and team conventions. Skills load automatically based on context — no manual Notion fetching, no separate Cowork sessions, no re-explaining conventions.

**Current state:** PM context lives across 6+ Notion pages fetched on demand. Cowork handles dashboard generation in a separate session. Claude PM Copilot re-reads conventions every conversation.

**Target state:** A skill suite that makes every Claude session "PM-aware" from the first message, with interactive artifacts replacing the static HTML dashboard.

---

## Skill Suite Overview

```
thriveiep-skills/
├── thriveiep-pm-core/          # Shared context — always loaded
│   ├── SKILL.md
│   └── references/
│       ├── ids-and-resources.md
│       ├── milestones.md
│       └── team.md
│
├── thriveiep-dashboard/        # Morning dashboard (React artifact)
│   ├── SKILL.md
│   └── references/
│       ├── data-gathering.md
│       ├── focus-pick-logic.md
│       └── event-classification.md
│
├── thriveiep-linear/           # Linear issue management
│   ├── SKILL.md
│   └── references/
│       ├── conventions.md
│       └── labels-and-states.md
│
├── thriveiep-session-handoff/  # Session handoff protocol
│   └── SKILL.md
│
├── thriveiep-ddx-authoring/    # DDx text generation (Phase 2)
│   ├── SKILL.md
│   └── references/
│       ├── pipeline-v2.md
│       ├── coaching-lenses.md
│       └── exemplar-cards.md
│
└── thriveiep-stakeholder-comms/ # Updates to Elizabeth, NLU, investors
    ├── SKILL.md
    └── references/
        └── formats.md
```

---

## Skill 1: `thriveiep-pm-core` (Foundation Layer)

**Purpose:** Shared context that other skills reference. Contains IDs, team info, product weights, and milestone dates. This is the "always on" skill — it triggers on virtually any ThriveIEP work context.

**Replaces:** Notion pages: Priorities (static parts), Team Context, Documentation Guide, PM Hub index

**What moves here:**
- All Notion page/collection IDs and resource references
- SOW milestone dates (M1–M5) with target dates
- Product dashboard weights (C2A=🔴=1, Accommodation=🟡=2, PI Redactor=🟢=3, Bloom=🟡=2)
- Team roster: Eric (CPTO), Elizabeth (co-founder, UX/stakeholders), Soham (backend/FERPA), Hannah (TriTogether), Lori Scanlon
- Calendar addresses, Gmail address, Linear team name
- NLU contract value ($50K) and key context

**What stays in Notion:** Dynamic content — "This Week's Focus" checklists, "Blockers" (these change weekly), "Recent Context" (narrative updates). The skill knows to *fetch* these sections; it just doesn't need to re-read the static scaffolding every time.

```yaml
---
name: thriveiep-pm-core
description: >
  Core PM context for ThriveIEP — team, products, milestones, resource IDs.
  Use this skill for ANY ThriveIEP work: project management, issue tracking,
  meeting prep, stakeholder communications, technical planning, or when
  referencing team members, products, milestones, or Notion/Linear resources.
  Always load this skill when the conversation involves ThriveIEP work.
---
```

### references/ids-and-resources.md
```markdown
# ThriveIEP Resource IDs

## Notion
| Resource | ID |
|---|---|
| PM Hub | 2f74659c-b96d-816e-b67e-cfeb8737ad9b |
| Priorities | 2f74659c-b96d-8110-a85a-eba7732df3e9 |
| Workflows | 2f74659c-b96d-8112-a308-e90d1bd13d14 |
| Linear Workflow | 2f74659c-b96d-8195-8399-f3a341501503 |
| Documentation Guide | 2f74659c-b96d-8178-855ce1c611491988 |
| Product Context | 2f74659c-b96d-81739282ed17ac011d95 |
| Team Context | 2f74659c-b96d-81aabf16eaf4a025e539 |
| C2A Pilot Resources | 2f74659c-b96d-8160a8e4ec4300fcadbd |
| Session Handoff Notes | 3094659c-b96d-81d1-be9a-ecbdb9e9aee2 |
| Work Product Log | 3094659cb96d816eb4a4fad4d3482a6d |
| To-Do Database | collection://1484659c-b96d-8132-94ea-000b793dca9b |
| Elizabeth Review Queue | collection://60cfacd8-7531-4368-9273-97621f931612 |

## Linear
| Field | Value |
|---|---|
| Team | ThriveIEP |
| LE3 Assessment Project | le3-assessment-212585d75443 |
| Accommodation Engine Project | accommodation-engine |
| PI Redactor Project | pi-redactor |
| Team/Admin Project | team-admin |

## Google
| Resource | Address |
|---|---|
| Gmail | falkeeric@gmail.com |
| Calendar (work) | eric@thriveiep.com |
| Calendar (personal) | falkeeric@gmail.com |
| Calendar (MIT) | efalkemit@gmail.com |
| Calendar (Emily) | dremilyinglesi@gmail.com |
```

### references/milestones.md
```markdown
# C2A / LE3 Assessment — NLU Contract Milestones

Contract value: $50K
Customer: National Louis University (BA in Organizational Leadership)

| Milestone | Date | Deliverables | Status |
|---|---|---|---|
| M1: Phase 1 Complete | Feb 15, 2026 | Kickoff, infra scaffolded, FERPA architecture | ✅ Complete |
| M2: Assessment MVP ⭐ | Mar 1, 2026 | Students take assessment (T1: 144 items / 14 instruments / 3 sprints) | 🔴 Critical Path |
| M3: Pilot Profiles | Mar 15, 2026 | Profile generation, 15 students receive C2A Profiles | Upcoming |
| M4: Phase 2 Complete | Mar 31, 2026 | Recommendations engine, Coach view, coach orientation | Upcoming |
| M5: Phase 3 Ready | Apr 30, 2026 | Admin dashboard, scaled for 750 profiles | Upcoming |

## Product Priority Weights
Used for sorting issues, curating focus picks, and triage decisions.

| Product | Status | Weight | Owner |
|---|---|---|---|
| C2A / LE3 Assessment | 🔴 Critical Path | 1 (highest) | Eric |
| Accommodation Engine | 🟡 Lower Priority | 2 | Soham + Eric |
| Bloom Report | 🟡 Lower Priority | 2 | Eric |
| PI Redactor | 🟢 Stable | 3 (lowest) | Soham + Eric |
```

---

## Skill 2: `thriveiep-dashboard` (Morning Briefing + Interactive Artifact)

**Purpose:** Replaces both the Cowork dashboard prompt AND the PM Copilot Phase 2-3 workflow. Gathers data from all sources, curates focus picks, and renders an interactive React artifact with checkboxes, copy functionality, and persistent state.

**Replaces:** Cowork morning dashboard prompt, Notion Workflows page (Phase 2-3), the morning-dashboard.html template

**Trigger phrases:** "/update", "morning dashboard", "morning briefing", "what's on today", "daily dashboard", "start my day"

```yaml
---
name: thriveiep-dashboard
description: >
  Generate Eric's ThriveIEP morning dashboard as an interactive React artifact.
  Fetches live data from Linear, Google Calendar, Notion To-Dos, Notion Priorities,
  and Gmail. Curates 3 priority-driven Focus Picks. Renders an interactive dashboard
  with checkboxes, milestone countdowns, and copy-to-clipboard.
  Use this skill when Eric says "/update", "morning dashboard", "morning briefing",
  "what's on today", "daily dashboard", "start my day", or asks about today's
  priorities, schedule, or focus items. Also use when Eric asks to see his dashboard
  or check what's happening today.
---
```

### Key Design Decisions

**React artifact with persistent storage** — The dashboard renders as a `.jsx` artifact with:
- Checkboxes on all actionable items (focus picks, issues, to-dos, gmail)
- Strikethrough/dim on check
- Sticky copy bar: "Copy Checked", "Copy All Completed", "Clear All"
- Toast notifications
- Live checked-item count
- State persisted via `window.storage.set('dashboard-YYYY-MM-DD', state)`

**Tabbed/sectioned layout:**
| Tab/Section | Content | Data Source |
|---|---|---|
| **Today** (default) | Focus picks, calendar, milestones, gmail, networking nudge | Linear, Calendar, Gmail, Notion Priorities, HubSpot |
| **Issues** | Active issues sorted by product weight, completed recent | Linear |
| **Documents & Artifacts** | Project → document tree with status, links, last modified | Notion Work Product Log + C2A Pilot Resources |
| **Dependencies** | Critical path graph for current milestone | Linear issue relations (blockedBy/blocks) |
| **Pipeline & Networking** | HubSpot contacts, deal stages, stale outreach, activity feed | HubSpot MCP (`mcp.hubspot.com/anthropic`) |
| **Team** (shared view) | Per-person work cards, milestone burndown, shared calendar | Linear + Calendar + HubSpot |

**Data gathering sequence** (from references/data-gathering.md):
1. Compute today's date, day-of-week, week labels
2. Fetch in parallel:
   - Notion Priorities page
   - Linear issues (active + completed)
   - 4x Google Calendar (week view)
   - Notion To-Dos
   - Gmail highlights
   - HubSpot: recent activity, pipeline deals, contacts with stale outreach
3. Apply product weight sorting, event classification, focus pick curation, networking nudge logic
4. Render artifact + text summary

**Focus Pick curation** (from references/focus-pick-logic.md):
1. Blockers from Priorities page → always pick #1
2. Unchecked items in Eric's "This Week's Focus" → by nearest deadline × product weight
3. Meeting prep — if meeting in next 24h maps to a focus item or Linear issue, promote
4. **Networking nudge** — if no HubSpot outreach activity in 5+ business days, one focus pick becomes a networking action (suggest 1-2 contacts to reach out to, weighted by relevance to current priorities)
5. Heuristic fallback — overdue items, urgent Linear issues, milestone deadlines

**Networking nudge logic** (from references/networking-nudge.md):
- Check HubSpot for last outreach activity date across all owners
- If 5+ business days since any outreach: promote networking to focus pick slot 3
- If 10+ business days: promote to slot 2 (unless genuine blocker/deadline emergency)
- Suggested contacts ranked by: relevance to current priorities > deal stage > recency of last touch
- Surface in "Pipeline & Networking" tab: stale contacts, recent activity, suggested outreach, deal pipeline

**Event classification** (from references/event-classification.md):
| Pattern | Type |
|---|---|
| team, standup, sync, daily | "team" |
| Jack, George, Vera, Jen, Nehmet | "tutoring" |
| NLU, kickoff, Neuropool, Kinsome | "client" |
| GTM | "gtm" |
| Everything else | "work" |

**Document & Artifact Map** (from references/document-map.md):
Renders a navigable tree view of project artifacts:
- Grouped by project (C2A, Accommodation Engine, PI Redactor, Bloom)
- Per document: name, type (design doc / spec / data file / template), location (Notion / repo / Linear), status (current / draft / superseded), last modified, related Linear issues
- Data source: Notion Work Product Log + C2A Pilot Resources Design Documents table
- Clickable links to source documents

**Dependency Graph** (from references/dependency-graph.md):
Renders critical path visualization for the current milestone:
- Pulls Linear issue relations (blockedBy, blocks, relatedTo)
- Filters to issues in the current milestone
- Renders as a directed graph (d3 force layout or dagre) with:
  - Node color by status (green=done, blue=in progress, gray=todo, red=blocked)
  - Edge arrows showing dependency direction
  - Clickable nodes linking to Linear issues

### Team / Shared View

**Persistent storage scoping:**
- `shared: false` (default) — Eric's personal data: focus picks, gmail, personal to-dos, check-off state
- `shared: true` — Team-visible data: milestone progress, active issues, team calendar, document index, HubSpot pipeline

**Team view contents:**
- Milestone burndown bars (M2: 14/20 issues done, 9 days remaining)
- Per-person work cards: name, current focus (from Linear "In Progress" issues), recent completions
- Shared calendar (team meetings, client meetings — excludes personal/tutoring)
- Document index by project (all team members can see what exists and its status)
- HubSpot pipeline summary (deal stages, recent activity across all owners)
- Recent team activity feed: Linear state changes, Notion edits (last 48h)

**Not shared:** Eric's gmail highlights, personal to-do list, focus pick curation logic, tutoring schedule

**Sharing mechanism:** Artifact URL can be shared with Elizabeth and Soham. They see shared data immediately. The artifact detects viewer context and toggles between personal/team views, or provides an explicit "My View" / "Team View" toggle.

### references/data-gathering.md
Full data gathering protocol — adapted from the Cowork prompt Steps 1-7, updated for Claude's tool set (Linear MCP, Google Calendar tool, Notion MCP, Gmail tool, HubSpot MCP).

### references/focus-pick-logic.md
The complete focus pick algorithm with examples, edge cases, and networking nudge integration.

### references/event-classification.md
Event type classification rules with pattern matching details.

### references/networking-nudge.md
HubSpot outreach monitoring, stale contact detection, suggested outreach ranking algorithm.

### references/document-map.md
How to gather and render the project document tree from Notion sources.

### references/dependency-graph.md
How to pull Linear issue relations and render the critical path graph.

---

## Skill 3: `thriveiep-linear` (Issue Management)

**Purpose:** Encodes all Linear conventions so Claude never creates malformed issues or duplicates.

**Replaces:** Notion "Linear Workflow" page

**Trigger phrases:** Creating issues, updating issues, asking about Linear status, sprint planning, issue triage

```yaml
---
name: thriveiep-linear
description: >
  ThriveIEP Linear issue management conventions. Use when creating, updating,
  or triaging Linear issues. Includes naming conventions, required fields,
  milestone alignment, label taxonomy, state management rules, and the
  search-before-create guardrail. Also use when discussing sprint planning,
  issue decomposition, or status updates. Triggers on: "create an issue",
  "add to Linear", "THR-", "sprint", "backlog", issue triage, or when
  referencing Linear workflow states.
---
```

### Core Content
- **Search before creating** — ALWAYS search Linear for existing/related issues first
- **Naming:** Action-oriented titles, `[C2A]` prefix when context needed
- **Required fields:** State, Priority, Assignee, Project
- **Optional:** Due date, Estimate (1-5), Milestone
- **State rules:** Backlog→Todo only when ready. In Progress = actively working. Use Backlog generously.
- **Priority mapping:** 1=Urgent, 2=High, 3=Medium (Normal in UI), 4=Low, 0=No Priority
- **Labels:** bug, feature, tech-debt, documentation, compliance, licensing, blocked
- **Milestone alignment:** M1→Feb 15, M2→Mar 1, M3→Mar 15, M4→Mar 31, M5→Apr 30

---

## Skill 4: `thriveiep-session-handoff` (Session Continuity)

**Purpose:** Ensures consistent session documentation and context pickup.

**Replaces:** The informal convention of writing to the Session Handoff Notes page

**Trigger phrases:** "wrap up", "end of session", "handoff", "session notes", "what did we do", end of substantive conversations

```yaml
---
name: thriveiep-session-handoff
description: >
  Session handoff protocol for ThriveIEP PM Copilot sessions. Use at the end
  of substantive conversations to write structured session notes to Notion.
  Also use at session START to fetch and read previous handoff notes for context.
  Triggers on: "wrap up", "session notes", "handoff", "what did we cover",
  "check the last session", or when starting a new session that references
  previous work. Maintains a rolling 5-session window.
---
```

### Core Content
- **Session start:** Fetch page `3094659c-b96d-81d1-be9a-ecbdb9e9aee2`, read most recent entry
- **Session end format:**
  ```
  ## Session N — YYYY-MM-DD (Brief Title)
  **Focus:** One-line summary
  **What we did:** Bullet list of accomplishments
  **Key decisions:** Important choices made
  **Artifacts produced:** Files, comments, updates with links
  **Pickup for next session:** What to start with next time
  ```
- **Rolling window:** Keep 5 most recent sessions. Drop oldest when adding new.
- **Work Product Log:** Also update the Work Product Log (Notion `3094659cb96d816eb4a4fad4d3482a6d`) for significant deliverables

---

## Skill 5: `thriveiep-ddx-authoring` (Phase 2 — Build When Needed)

**Purpose:** Guides the DDx text generation pipeline for THR-198 template authoring.

**Replaces:** The DDx Text Generation Pipeline v2.0 documentation + reference catalog

**Trigger phrases:** "DDx authoring", "intervention cards", "template text", "THR-198", "coaching lenses", "prose drafting"

```yaml
---
name: thriveiep-ddx-authoring
description: >
  DDx text generation authoring pipeline for C2A intervention cards and
  coaching recommendations. Use when working on THR-198 template authoring,
  DDx prose drafting, intervention card creation, or coaching lens content.
  Follows the 8-phase pipeline (v2.0) with ~104 blocks, voice anchoring
  from exemplar cards, and Four Coaching Lenses framing. Triggers on:
  "DDx authoring", "intervention cards", "template text", "THR-198",
  "coaching lenses", "prose drafting", "block authoring".
---
```

### Content (to be populated when THR-198 work begins)
- 8-phase pipeline (Phases 0-7) from Session 15
- ~104 block structure and categorization
- Voice anchoring from 5 exemplar cards (pending Ref #6 location)
- Four Coaching Lenses framing
- 12 LE3 durable skills → skill families → DDx dimensions mapping
- `le3_graduate_pillars.framework.json` reference
- Merged outline + prose approach for low-risk blocks
- Phase 7: Integration Handoff to Soham

---

## Skill 6: `thriveiep-stakeholder-comms` (Optional — Build When Pattern Emerges)

**Purpose:** Standardized formats for updates to Elizabeth, NLU, investors, partners.

**Replaces:** Ad-hoc communication formatting

**Build trigger:** When Eric starts sending regular structured updates (post-MVP launch, investor updates, NLU progress reports)

---

## Existing Skills to Enable/Borrow

### Enable Now (Already Available)
| Skill | Location | Use Case |
|---|---|---|
| `doc-coauthoring` | `/mnt/skills/examples/doc-coauthoring/` | Feature specs, design docs, DDx reference docs |
| `frontend-design` | `/mnt/skills/public/frontend-design/` | Dashboard artifact UI quality |
| `xlsx` | `/mnt/skills/public/xlsx/` | Score reference spreadsheets, data exports |

### Consider Adding (From Partner/Community)
| Skill | Source | Use Case |
|---|---|---|
| Notion Skills for Claude | Official Notion partner (claude.com/connectors) | Enhanced Notion interaction patterns |
| HubSpot MCP | Already connected (`mcp.hubspot.com/anthropic`) | Pipeline monitoring, networking nudges, contact management |
| `skill-creator` | Already available at `/mnt/skills/examples/skill-creator/` | Building & iterating on the above skills |

### MCP Connectors Required
The dashboard skill depends on these MCP connectors being active:
| Connector | URL | Used For |
|---|---|---|
| Linear | `mcp.linear.app/mcp` | Issues, projects, milestones, relations |
| Notion | `mcp.notion.com/mcp` | Priorities, To-Dos, Work Product Log, documents |
| Slack | `mcp.slack.com/mcp` | Team activity, self-notes |
| HubSpot | `mcp.hubspot.com/anthropic` | Pipeline, contacts, networking nudges |
| ClickUp | `mcp.clickup.com/mcp` | (Available, not currently used) |
| Mermaid Chart | `mcp.mermaidchart.com/mcp` | Dependency graph rendering (optional) |

Plus built-in tools: Google Calendar, Gmail, Google Drive.

---

## Build Sequence

### Phase 1: Foundation (This Week)
1. **`thriveiep-pm-core`** — Extract static context from Notion pages into skill references. Quick win, immediately useful.
2. **`thriveiep-dashboard`** — Port the Cowork dashboard prompt into a skill that produces a React artifact. This is the flagship deliverable.
3. **`thriveiep-linear`** — Extract Linear conventions into a skill. Straightforward port from Notion page.

### Phase 2: Workflow (Next Week)
4. **`thriveiep-session-handoff`** — Codify the handoff protocol.
5. **Enable `doc-coauthoring`** — For upcoming spec writing work.
6. **Test & iterate** all Phase 1 skills using skill-creator eval mode.

### Phase 3: Content Authoring (When THR-198 Starts)
7. **`thriveiep-ddx-authoring`** — Build when ready to start template authoring.

### Phase 4: Communications (Post-MVP)
8. **`thriveiep-stakeholder-comms`** — Build when the pattern emerges.

---

## Migration Plan: What Lives Where

| Content | Current Location | New Home | Why |
|---|---|---|---|
| Resource IDs, team roster, milestone dates | Notion PM Hub (multiple pages) | `thriveiep-pm-core` skill | Static, referenced every session |
| Product weights, priority logic | Notion Priorities (static section) | `thriveiep-pm-core` skill | Rarely changes, needed for sorting |
| "This Week's Focus" checklists | Notion Priorities | **Stays in Notion** | Changes weekly, Eric updates manually |
| "Blockers" section | Notion Priorities | **Stays in Notion** | Dynamic, changes frequently |
| "Recent Context" narrative | Notion Priorities | **Stays in Notion** | Historical, append-only |
| Linear conventions | Notion "Linear Workflow" page | `thriveiep-linear` skill | Static conventions |
| Morning workflow (Phase 2-3) | Notion "Workflows" page | `thriveiep-dashboard` skill | Repeatable multi-step workflow |
| Todo creation rules | Notion "Workflows" page | `thriveiep-pm-core` skill | Simple rules, always relevant |
| Dashboard HTML template | Cowork outputs folder | `thriveiep-dashboard` skill (React artifact) | Interactive, lives in conversation |
| Dashboard data-gathering logic | Cowork prompt (separate doc) | `thriveiep-dashboard` skill | Multi-step orchestration |
| HubSpot pipeline monitoring | Ad-hoc check during /update | `thriveiep-dashboard` skill (Pipeline tab) | Automated via HubSpot MCP |
| Networking nudges | Not systematized | `thriveiep-dashboard` skill (focus pick logic) | Prevents networking from falling off during sprints |
| Project document index | Scattered across Notion pages | `thriveiep-dashboard` skill (Documents tab) | Visual project map, reads from git log |
| Issue dependency chains | Linear (manual inspection) | `thriveiep-dashboard` skill (Dependencies tab) | Critical path visualization |
| Team activity visibility | Standups, ad-hoc check-ins | `thriveiep-dashboard` skill (Team tab, shared) | Passive awareness for all team members |
| Session handoff format | Convention + Notion page | `thriveiep-session-handoff` skill | Repeatable protocol |
| Session handoff data | Notion page 3094659c... | **Stays in Notion** | Persistent rolling log, team-editable |
| Work Product Log (narrative) | Notion database | **Stays in Notion** | Decision history, human-readable context |
| Feature Spec Template | Notion page | **Stays in Notion** | Template, not workflow |
| LE3 framework JSON, construct map | Downloaded zip / Linear comment | **GitHub** `c2a/framework/` | Structured data, needs real diffs and version history |
| Norms registry JSONs | Downloaded zip | **GitHub** `c2a/scoring/norms/` | Structured data, needs versioning |
| Scoring spec JSONs | Downloaded / Linear comment | **GitHub** `c2a/scoring/specs/` | Structured data, needs versioning |
| DDx Engine Design doc | Notion page | **GitHub** `c2a/ddx/` (canonical .md) + Notion (collaboration copy) | Design docs benefit from git diffs; Notion copy for Elizabeth's comments |
| Profile Generation Reqs | Notion page | **GitHub** `c2a/ddx/` (canonical .md) + Notion (collaboration copy) | Same — git for versioning, Notion for collaboration |
| DDx Literature Review | Downloaded .md | **GitHub** `c2a/research/` | Research doc, no collaboration needed, pure versioning |
| Score Reference XLSX | Downloaded file | **Not versioned.** Generated on demand from source JSONs | Data lives in JSON; spreadsheet is an ephemeral view |
| Skills Architecture (this doc) | This conversation | **GitHub** `pm/skills-architecture.md` | Meta-document, should be versioned |
| DDx authoring pipeline | Notion docs + session notes | `thriveiep-ddx-authoring` skill + **GitHub** `c2a/ddx/templates/` | Complex multi-session workflow; authored templates versioned in git |
| Elizabeth Review Queue | Notion database | **Stays in Notion** | Collaborative, dynamic |
| To-Do database | Notion database | **Stays in Notion** | Dynamic, team-editable |

---

## Architecture Principles

1. **Skills encode process. Notion stores state.** Skills contain conventions, algorithms, formats, and IDs. Notion retains dynamic data (weekly focus, blockers, context updates, work product log).

2. **Progressive disclosure across skills.** `thriveiep-pm-core` loads on any ThriveIEP context (~100 token frontmatter). Other skills load only when their specific workflow triggers. References within skills load only when needed.

3. **Skills don't duplicate each other.** `thriveiep-dashboard` references milestone dates from `thriveiep-pm-core` rather than duplicating them. When building, keep shared facts in `pm-core/references/`.

4. **Interactive artifacts over static files.** The dashboard, any future data views, and potentially the DDx authoring workspace should be React artifacts with persistent storage — not HTML files in an outputs folder.

5. **Build incrementally, test with skill-creator.** Use the eval framework to verify skills trigger correctly, produce expected outputs, and don't conflict with each other.

6. **Markdown-native authoring, convert at the sharing boundary.** All deliverables are authored in plain text formats (`.md`, `.json`, `.ts`, `.html`/`.jsx`). Formatted outputs (`.docx`, `.pptx`, `.pdf`) are generated on demand only when sharing externally with people who won't open a GitHub link or Notion page. This maximizes speed, diffability, and version control compatibility.

   | Format | When to use |
   |---|---|
   | `.md` | Default for everything — specs, design docs, reviews, architecture, meeting notes, literature reviews |
   | `.json` / `.ts` | Data files, configs, framework definitions, scoring specs, norms registries |
   | `.html` / `.jsx` | Interactive artifacts — dashboard, journey map visualizations, anything with UI |
   | `.docx` / `.pptx` / `.pdf` | **Only** for external sharing (NLU, investors, advisors). Generated from markdown/JSON source via pandoc or skill. |
   | `.xlsx` | **Never versioned.** Generated on demand from source JSON when someone needs a spreadsheet view. |

7. **Data lives in JSON. Spreadsheets are generated views.** Structured data (score references, instrument mappings, norms registries) is authored and versioned as JSON. When a human-friendly spreadsheet is needed (e.g., Elizabeth wants to review the score reference in Google Sheets), Claude generates an XLSX on the fly from the source JSON. The JSON is the artifact; the XLSX is ephemeral.

8. **GitHub versions artifacts. Notion versions decisions.** All structured deliverables (JSON, TypeScript, markdown specs, design docs, literature reviews) are committed to the `thriveiep-docs` repo with descriptive commit messages linked to Linear issues. The Work Product Log in Notion continues as the narrative decision history — what was decided and why. GitHub answers "what is the current file and what changed." Notion answers "why did we make that choice."

   **GitHub repo structure:**
   ```
   thriveiep-docs/
   ├── README.md
   ├── c2a/
   │   ├── framework/           # le3_graduate_pillars.framework.json, le3-construct-map.ts
   │   ├── scoring/
   │   │   ├── norms/           # 8 norms registry JSONs
   │   │   └── specs/           # Per-instrument scoring spec JSONs
   │   ├── ddx/                 # DDx engine design, profile generation reqs, templates
   │   ├── pipeline/            # DDx text pipeline strategy
   │   └── research/            # Literature review, landscape analysis
   ├── accommodation-engine/
   ├── pi-redactor/
   ├── bloom-report/
   └── pm/
       ├── skills-architecture.md
       └── session-snapshots/   # Optional: periodic session handoff snapshots
   ```

   **Commit message format:** `[THR-XXX] Brief description of what changed and why`
   
   **Session save protocol** (enforced by `thriveiep-session-handoff` skill):
   1. At session end, identify all deliverables created or updated
   2. Clone/pull `thriveiep-docs` repo
   3. Add/update files in the appropriate directory
   4. Commit with Linear issue reference
   5. Push
   6. Update Work Product Log narrative in Notion
   7. Note committed files in session handoff notes

9. **Notion stays for collaboration and dynamic state.** Things that belong in Notion (not GitHub): weekly focus checklists, blockers, priorities narrative, session handoff notes, Elizabeth Review Queue, to-do database, any page Elizabeth/team actively edits. GitHub is for artifacts Claude produces; Notion is for living documents the team co-owns.
