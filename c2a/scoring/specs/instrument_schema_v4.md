# C2A Instrument Definition Schema — v4.0

**THR-32 Deliverable** | Updated: 2026-02-11 | Author: Eric (via Claude PM Copilot)

## Overview

This document defines the JSON schema for encoding psychometric instruments in the C2A assessment battery. Each instrument produces a self-describing definition file consumed by the survey UI and scoring engine.

**Design Principles:**
1. **Self-describing** — each file contains everything needed to administer and validate the instrument
2. **Separated from scoring** — instrument definitions are immutable; scoring specifications are configurable (see Scoring Specification Schema below)
3. **Implementation-friendly** — JSON consumable directly by TypeScript/Next.js
4. **Psychometrically faithful** — original item numbering preserved; publication-aligned

## Battery Summary

| # | Instrument | Items | Tier | Subscale Split |
|---|-----------|-------|------|----------------|
| 1 | ADEXI | 14 | Core | Working Memory (9), Inhibition (5) |
| 2 | CFS | 12 | Core | Single scale (cognitive flexibility) |
| 3 | CAAS-SF | 12 | Core | Concern (3), Control (3), Curiosity (3), Confidence (3) |
| 4 | IRI (2 subscales) | 14 | Core | Perspective Taking (7), Empathic Concern (7) |
| 5 | SPCC | 12 | Core | 4 contexts × 3 receivers matrix |
| 6 | BRS | 6 | Core | Single scale (resilience) |
| 7 | Team Psych Safety | 7 | Core | Single scale (psychological safety) |
| 8 | MSLQ-CT | 5 | Core | Single scale (critical thinking) |
| 9 | SFCQ | 10 | Core | Knowledge (2), Skills (5), Metacognition (3) |
| 10 | BPNSFS | 24 | Optional | 6 subscales (3 needs × satisfaction/frustration) |
| 11 | GMS-Bookends | **10** | Optional | Intrinsic Motivation (3), External Regulation (4), Amotivation (3) |
| 12 | LCQ-6 | 6 | Optional | Single scale (autonomy support) |
| 13 | C2A-NBS-6 | 6 | R&D | Internal Networking (3), External Networking (3) |
| 14 | RQM-6 | 6 | R&D | Single scale (relationship quality maintenance) |
| | **Total** | **144** | | |

**Changelog:**
- v3 → v4.0: Expanded battery from 10 → 14 instruments (117 → 144 items)
- Added MSLQ-CT (core), SFCQ (core), C2A-NBS-6 (R&D), RQM-6 (R&D)
- Introduced `rnd` tier for pilot micro-scales pending validation
- ADEXI: 9 WM / 5 Inhibition (not 7/7) — corrected in v3
- GMS-Bookends: 10 items (not 9) — corrected in v3
- CFS confirmed as correct name (not CFI) — THR-19 needs update

---

## Instrument Definition Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "C2A Instrument Definition",
  "description": "Defines a psychometric instrument for the C2A assessment battery",
  "type": "object",
  "required": ["id", "version", "metadata", "response_format", "items", "subscales"],
  "properties": {

    "id": {
      "type": "string",
      "description": "Unique instrument identifier (lowercase, snake_case)",
      "examples": ["adexi", "cfs", "brs", "gms_bookends"]
    },

    "version": {
      "type": "string",
      "description": "Semantic version of this definition file",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },

    "metadata": {
      "type": "object",
      "required": ["name", "abbreviation", "authors", "year", "citation", "item_count", "tier"],
      "properties": {
        "name": { "type": "string" },
        "abbreviation": { "type": "string" },
        "authors": { "type": "string" },
        "year": { "type": "integer" },
        "citation": { "type": "string", "description": "APA-style reference" },
        "item_count": { "type": "integer" },
        "tier": {
          "type": "string",
          "enum": ["core", "optional", "rnd"],
          "description": "core = scored for LE3 profile; optional = program evaluation; rnd = pilot micro-scale pending validation"
        },
        "license": {
          "type": "string",
          "description": "Licensing status and requirements"
        },
        "stem": {
          "type": ["string", "null"],
          "description": "Common stem text displayed above all items (e.g., 'In general, I do things...')"
        }
      }
    },

    "response_format": {
      "type": "object",
      "required": ["type", "min", "max"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["likert", "self_estimation"],
          "description": "likert = discrete scale; self_estimation = continuous 0-100"
        },
        "min": { "type": "number" },
        "max": { "type": "number" },
        "step": {
          "type": ["number", "null"],
          "description": "Increment between valid responses. 1 for Likert, null for continuous"
        },
        "labels": {
          "type": "object",
          "description": "Anchor labels keyed by numeric value",
          "additionalProperties": { "type": "string" }
        }
      }
    },

    "items": {
      "type": "array",
      "description": "All items in the instrument",
      "items": {
        "type": "object",
        "required": ["id", "position", "text", "subscale"],
        "properties": {
          "id": {
            "type": "string",
            "description": "Original publication item ID (e.g., 'iri_03' preserving Davis numbering)"
          },
          "position": {
            "type": "integer",
            "description": "Sequential 1-based position for survey UI rendering"
          },
          "text": { "type": "string" },
          "reverse_scored": {
            "type": "boolean",
            "default": false
          },
          "subscale": {
            "type": "string",
            "description": "ID of the subscale this item belongs to"
          }
        }
      }
    },

    "subscales": {
      "type": "array",
      "description": "Groupings of items into scored constructs",
      "items": {
        "type": "object",
        "required": ["id", "name", "item_ids"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "item_ids": {
            "type": "array",
            "items": { "type": "string" }
          },
          "type": {
            "type": ["string", "null"],
            "description": "For matrix instruments like SPCC: 'context' or 'receiver'"
          }
        }
      }
    },

    "validation": {
      "type": "object",
      "description": "Psychometric properties from published literature",
      "properties": {
        "cronbach_alpha": {
          "type": "object",
          "description": "Reliability coefficients keyed by subscale ID",
          "additionalProperties": { "type": "number" }
        },
        "sample_description": { "type": "string" },
        "normative_data": {
          "type": ["object", "null"],
          "description": "Published norms if available"
        }
      }
    }
  }
}
```

---

## Scoring Specification Schema

Separated from instrument definitions because scoring methods may change based on product context (e.g., mean vs sum, different cutoff bands for pilot data, construct mapping revisions).

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "C2A Scoring Specification",
  "type": "object",
  "required": ["instrument_id", "spec_version", "context", "subscale_scoring"],
  "properties": {

    "instrument_id": {
      "type": "string",
      "description": "Must match an instrument definition ID"
    },

    "spec_version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },

    "context": {
      "type": "string",
      "description": "Deployment context for this scoring spec",
      "examples": ["c2a_mvp", "clinical_research"]
    },

    "reverse_scoring": {
      "type": "object",
      "properties": {
        "formula": {
          "type": "string",
          "description": "Universal: '(max + min) - raw' works across all scale types"
        }
      }
    },

    "subscale_scoring": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["subscale_id", "method", "score_range"],
        "properties": {
          "subscale_id": { "type": "string" },
          "method": {
            "type": "string",
            "enum": ["mean", "sum"],
            "description": "Aggregation method for items in the subscale"
          },
          "score_range": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 2,
            "maxItems": 2,
            "description": "[min_possible, max_possible]"
          },
          "interpretation": {
            "type": "object",
            "properties": {
              "direction": {
                "type": "string",
                "enum": ["high_is_positive", "high_is_deficit", "high_is_negative"],
                "description": "What a high score means clinically/conceptually"
              },
              "bands": {
                "type": ["array", "null"],
                "items": {
                  "type": "object",
                  "properties": {
                    "label": { "type": "string" },
                    "min": { "type": "number" },
                    "max": { "type": "number" }
                  }
                }
              }
            }
          }
        }
      }
    },

    "total_scoring": {
      "type": ["object", "null"],
      "description": "How to produce a single instrument-level score (null if subscale-only)",
      "properties": {
        "method": {
          "type": "string",
          "enum": ["mean", "sum", "mean_of_subscale_means", "weighted_composite", "matrix"],
          "description": "matrix = SPCC; weighted_composite = GMS RAI"
        },
        "formula": {
          "type": ["string", "null"],
          "description": "For weighted composites: e.g., '(2 * intrinsic_motivation) + (0 * external_regulation) + (-2 * amotivation)'"
        },
        "score_range": {
          "type": ["array", "null"],
          "items": { "type": "number" },
          "minItems": 2,
          "maxItems": 2
        }
      }
    },

    "construct_mapping": {
      "type": "object",
      "description": "Maps subscales to LE3 durable skills (Layer 1→2). Managed by THR-131.",
      "additionalProperties": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Array of LE3 skill IDs this subscale maps to"
      }
    }
  }
}
```

---

## SOTA Validation

Our schema aligns with industry standards where appropriate:

| Standard | Pattern We Adopted | Pattern We Skipped |
|----------|-------------------|-------------------|
| **FHIR Questionnaire** | Definition/response separation; hierarchical item grouping; item weighting | Verbose XML structure; enableWhen skip logic; canonical URLs |
| **REDCap** | Matrix field concept (for SPCC) | Bundled scoring-in-definition approach |

**FHIR specifically validates our two-file split** — Questionnaire (definition) and QuestionnaireResponse (data) are separate resources with different lifecycles.

---

## Response Format Reference

| Type | Instruments | Min | Max | Step | Anchor Labels |
|------|------------|-----|-----|------|---------------|
| Likert-5 | ADEXI | 1 | 5 | 1 | 1=Definitely not true, 5=Definitely true |
| Likert-5 | BRS | 1 | 5 | 1 | 1=Strongly disagree, 5=Strongly agree |
| Likert-5 | CAAS-SF | 1 | 5 | 1 | 1=Not strong, 5=Strongest |
| Likert-5 | Team Psych Safety | 1 | 5 | 1 | 1=Strongly disagree, 5=Strongly agree |
| Likert-5 | C2A-NBS-6 | 1 | 5 | 1 | 1=Never, 5=Very Often |
| Likert-5 | RQM-6 | 1 | 5 | 1 | 1=Never, 5=Very Often |
| Likert-5 | SFCQ | 1 | 5 | 1 | 1=Not at all, 5=Extremely well |
| Likert-6 | CFS | 1 | 6 | 1 | 1=Strongly disagree, 6=Strongly agree |
| Likert-7 | IRI | 1 | 7 | 1 | 1=Does not describe me well, 7=Describes me very well |
| Likert-7 | BPNSFS | 1 | 7 | 1 | 1=Not true at all, 7=Completely true |
| Likert-7 | GMS-Bookends | 1 | 7 | 1 | 1=Does not correspond at all, 7=Corresponds completely |
| Likert-7 | LCQ-6 | 1 | 7 | 1 | 1=Strongly disagree, 7=Strongly agree |
| Likert-7 | MSLQ-CT | 1 | 7 | 1 | 1=Not at all true of me, 7=Very true of me |
| Self-estimation | SPCC | 0 | 100 | null | 0=Completely incompetent, 100=Competent |

**Reverse scoring formula (universal):** `scored_value = (max + min) - raw_value`

---

## File Naming Convention

```
instruments/
  definitions/
    adexi.json
    cfs.json
    caas_sf.json
    iri.json
    spcc.json
    brs.json
    team_psych_safety.json
    mslq_ct.json
    sfcq.json
    bpnsfs.json
    gms_bookends.json
    lcq6.json
    c2a_nbs6.json
    rqm6.json
  scoring/
    adexi.scoring.json
    cfs.scoring.json
    ...
```

---

## Next Steps

1. ~~Create 10 instrument definition JSON files~~ ✅ Complete — validated Feb 10
2. ~~Create 10 scoring specification JSON files~~ ✅ Complete — validated Feb 10
3. ~~Expand battery to 14 instruments (MSLQ-CT, SFCQ, NBS-6, RQM-6)~~ ✅ Complete — validated Feb 11
4. Build TypeScript scoring engine (THR-132, due Feb 14)
5. Define construct mapping layer — subscales → LE3 skills (THR-131)
6. Build profile generation engine (THR-22)
7. Update THR-19 (CFS naming correction) — low priority
