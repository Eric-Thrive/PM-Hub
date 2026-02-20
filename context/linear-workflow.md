# Linear Workflow

## Workspace: Thriveiep

Linear is the tactical execution layer for task tracking, sprint planning, and permanent records.

---

## Projects

| Project | Description |
|---------|------------|
| **LE3 Assessment** | C2A MVP development |
| **Accommodation Engine** | Production maintenance |
| **PI Redactor** | Production maintenance |
| **Team/Admin** | Internal tasks |

---

## Workflow States

| State | When to Use |
|-------|------------|
| **Backlog** | Captured but not scheduled |
| **Todo** | Scheduled for current/next sprint |
| **In Progress** | Actively being worked on |
| **In Review** | Awaiting review/approval |
| **Done** | Completed |
| **Canceled** | Won't do |

**State Management Rules:**
- Move to "Todo" only when ready to work (not just captured)
- "In Progress" means someone is actively working on it
- Use "Backlog" generously for future ideas

---

## Labels

| Label | Purpose |
|-------|---------|
| `bug` | Something broken |
| `feature` | New functionality |
| `tech-debt` | Code quality improvements |
| `documentation` | Docs and knowledge base |
| `compliance` | HIPAA/FERPA requirements |
| `licensing` | Instrument licensing tasks |
| `blocked` | Waiting on external dependency |

---

## Creating New Issues

**Before creating an issue**, search Linear for existing or related issues. Don't create duplicates.

## Issue Conventions

**Required Fields:** State, Priority (Urgent/High/Medium/Low/No Priority), Assignee, Project

**Optional but Recommended:** Due date (for deadline-driven work), Estimate (complexity: 1-5 points), Milestone (for SOW-aligned work)

**Naming Convention:** Action-oriented titles: "Add scoring engine" not "Scoring engine". Include context if needed: "[C2A] Add scoring engine"

---

## Milestones (C2A/LE3)

| Milestone | Target Date |
|-----------|------------|
| M1: Phase 1 Complete | Feb 15 |
| M2: Assessment MVP | March 1 |
| M3: Pilot Profiles | March 15 |
| M4: Phase 2 Complete | March 31 |
| M5: Phase 3 Ready | April 30 |

---

## Daily Workflow

1. Check assigned issues in Linear
2. Update status as work progresses
3. Add comments for context/decisions
4. Close issues when complete
5. Report blockers immediately

---

*Migrated from Notion: February 20, 2026*
