# Versioning Reference

## Changelog header

Every deliverable gets a changelog table immediately below the title:

```markdown
# Document Title

| Version | Date | What Changed | Session |
|---------|------|-------------|---------|
| 1.0 | 2026-02-21 | Initial draft | S28 |
| 1.1 | 2026-02-23 | Added scoring edge cases per THR-XX | S30 |
| 2.0 | 2026-03-01 | Revised for 155-item battery | S35 |
```

## Revision levels

**Minor (1.0 → 1.1):** Clarifications, additions, bug fixes. Update the file
in place and add a changelog row.

**Major (1.0 → 2.0):** Structural changes, scope changes, anything that could
invalidate work already in progress against the current version.

## When to fork

Most of the time, update in place — git history preserves previous states.

Fork to a new file (`scoring-spec-v2.md`) only when someone is actively building
against the current version and needs it to remain stable while you revise. When
forking:

1. Create the new version file
2. Add a note at the top of the old file: `⚠️ Superseded by [v2](path). Kept for reference.`
3. Update Linear link attachments to point to the new version

## Reconstructing old versions

Git history is the reconstruction mechanism:

```bash
git log --follow path/to/file.md        # see commit history
git show <hash>:path/to/file.md         # view file at any point
```

## Exemptions

- **Decision records:** Use `Status: Superseded` instead of versioning
- **Knowledge notes:** Living documents, no formal versioning needed
- **Session handoff notes:** Rolling window by design
