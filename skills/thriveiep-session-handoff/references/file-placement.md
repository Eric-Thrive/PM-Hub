# File Placement & Linking Reference

## Where deliverables go in PM-Hub

| Deliverable type | Save to |
|-----------------|---------|
| C2A / LE3 work | `c2a/` (subdirs: `scoring/`, `framework/`, `pipeline/`, `research/`, `ddx/`) |
| Accommodation Engine work | `accommodation-engine/` |
| PI Redactor work | `pi-redactor/` |
| Bloom Report work | `bloom-report/` |
| Cross-product or general | `general/` |
| Decision records | `decisions/` |
| Research / exploration | `knowledge/` |
| Session notes | `sessions/` |
| Skills | `skills/` |

## Linear link attachment conventions

### Link title prefixes

| Type | Format |
|------|--------|
| Decision record | `📋 DR-XXX: Title` |
| Spec or design doc | `📄 Spec: Title` |
| Analysis or research | `📊 Research: Title` |
| Other deliverable | `📁 File: filename` |

### URL pattern

```
https://github.com/Eric-Thrive/PM-Hub/blob/main/path/to/file.md
```

### Attaching links to Linear issues

The `links` parameter on `update_issue` **replaces** existing links, so always:

1. `get_issue` → read existing attachments
2. Append the new link to the existing list
3. `update_issue` with the full list

## Knowledge notes

**File naming:** `knowledge/KB-XXX--slug.md`

Always update `knowledge/INDEX.md` when adding a new entry. If research leads
to actionable work, create a Linear issue and update the `Promoted To` column.

### What goes to `knowledge/`

- Tool evaluations (e.g., "Claude Code workflow patterns")
- Research on approaches or technologies
- Reference material worth revisiting
- Exploratory analysis that isn't a decision

### What doesn't need knowledge capture

- Quick factual lookups
- Routine task discussion
- Anything already captured as a DR or in a spec
