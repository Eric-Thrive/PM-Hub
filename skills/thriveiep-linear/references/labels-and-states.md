# Linear Labels and States — Detailed Reference

## Available Labels

These are the labels configured in the ThriveIEP Linear workspace.
Use the exact label names when creating or updating issues.

| Label | Color | Use For | Example |
|-------|-------|---------|---------|
| bug | red | Defects, broken behavior, regressions | "Login redirect fails after FERPA consent" |
| feature | blue | New user-facing functionality | "Add T2 assessment retake flow" |
| tech-debt | gray | Refactoring, cleanup, perf improvements | "Migrate scoring engine to shared package" |
| documentation | green | Specs, design docs, READMEs, schemas | "Write FERPA architecture spec" |
| compliance | purple | FERPA, privacy, security, audit trail | "Implement data retention policy" |
| licensing | orange | Instrument licensing, legal requirements | "Verify SFCQ non-commercial license" |
| blocked | red | Externally blocked (waiting on someone/something) | "Blocked: awaiting Aptible credentials" |

## State Workflow

```
Backlog → Todo → In Progress → In Review → Done
                                    ↓
                               Cancelled
```

### State Transition Rules

**Backlog → Todo:**
- All prerequisites and dependencies are met
- The work is genuinely next in the sprint/milestone
- Assignee has capacity

**Todo → In Progress:**
- Assignee has started active work
- Limit: 2-3 In Progress items per person

**In Progress → In Review:**
- Work is complete, awaiting review
- For Elizabeth: add to Elizabeth Review Queue in Notion
- For code: PR created or ready for Soham's review

**In Review → Done:**
- Review approved
- Verified working (if applicable)
- All acceptance criteria met

**Any → Cancelled:**
- Add a comment explaining why
- If it's a duplicate, link to the duplicate issue
- If scope changed, reference the replacing issue

## Projects

| Project | Key | Products Covered |
|---------|-----|-----------------|
| LE3 Assessment | le3-assessment-212585d75443 | C2A battery, scoring engine, profiles, DDx |
| Accommodation Engine | accommodation-engine | Accommodation recommendations |
| PI Redactor | pi-redactor | PI redaction tool |
| Team/Admin | team-admin | Internal ops, team process, non-product |

## Commit Message Integration

When completing issues, reference them in git commits:
```
[THR-XXX] Brief description of what changed
```

This creates a link between the Linear issue and the GitHub commit.
