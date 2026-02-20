# C2A DDx Engine

Differential Diagnosis engine design and profile generation requirements.

## Files

| File | Description | Linear Issue | Status |
|---|---|---|---|
| `ddx-engine-design.md` | Core DDx architecture — two-layer split, skill-first diagnostic flow, ARC quadrants, GMS cascade | THR-22 | Current |
| `profile-generation-reqs.md` | 13 formal requirements for profile generation engine | THR-22 | Current |
| `templates/` | Authored DDx text blocks (Phase 3, THR-198) | THR-198 | Not started |

## Architecture Summary

- **Layer A (M3):** Blocker analysis — deterministic, no LLM at runtime
- **Layer B (M4/M5):** Intervention recommendations — ships independently
- DDx is fully deterministic: text authored via LLM-draft → human-review → static JSON
- Per-skill relevance mappings loaded from LE3 framework JSON at runtime

## Also in Notion

These docs have collaboration copies in Notion for Elizabeth's review:
- [DDx Engine Design](https://www.notion.so/30b4659cb96d81edadeef7b4fa5a1071)
- [Profile Generation Reqs](https://www.notion.so/30b4659cb96d81e6846cc18cfd3cbbfe)

Git is the canonical versioned source. Notion copies may lag.
