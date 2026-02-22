# C2A Response Format Reference

> **Version:** 1.0 | **Date:** 2026-02-21 | **Decision Record:** DR-009
>
> Authoritative UI spec for all 14 instruments. The `.docx` version with formatted tables was shared with Soham for implementation.

## Five Response Formats

| # | Format | Items | Instruments | Label Style | UI Component |
|---|--------|-------|-------------|-------------|--------------|
| 1 | 5-pt Agreement/Ability | 46 | ADEXI (14), BRS (6), CAAS-SF (12), IRI (14) | All 5 labeled | LikertScale |
| 2 | 6-pt Agreement (no midpoint) | 12 | CFS (12) | All 6 labeled | LikertScale |
| 3 | 7-pt True/Agree | 52 | BPNSFS (24), GMS (10), MSLQ-CT (5), LCQ-6 (6), TPS-7 (7) | Endpoints only | LikertScale |
| 4 | 5-pt Frequency | 12 | C2A-NBS-6 (6), RQM-6 (6) | All 5 labeled | LikertScale |
| 5 | 0-100 Competence Slider | 12 | SPCC (12) | Endpoints + numeric | CompetenceSlider |
| TBD | SFCQ | 10 | SFCQ (10) | TBD (5 or 7) | LikertScale (configurable) |

**Total:** 144 items across 14 instruments

## Format 1: 5-Point Agreement/Ability (46 items)

All 5 options labeled. **Anchor wording varies per instrument.**

| Instrument | Items | 1 | 2 | 3 | 4 | 5 |
|-----------|-------|---|---|---|---|---|
| ADEXI | 14 | Definitely not true | Not true | Partially true | True | Definitely true |
| BRS | 6 | Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree |
| CAAS-SF | 12 | Not strong | Somewhat strong | Strong | Very strong | Strongest |
| IRI (PT+EC) | 14 | Does not describe me well | Describes me slightly | Describes me somewhat | Describes me well | Describes me very well |

**Notes:**
- ADEXI: Reverse-scored (lower raw = stronger EF). Original Holst & Thorell (2018) anchors.
- BRS: Items 2, 4, 6 reverse-scored.
- CAAS-SF: Ability rating frame, not agreement. Maggiori, Rossier & Savickas (2017).
- IRI: Original Davis (1980) uses 0-4; C2A reanchored to 1-5 (+1 shift). Items 3, 6, 10, 13, 14 reverse-scored.

## Format 2: 6-Point Agreement (12 items)

All 6 options labeled. **No neutral midpoint — intentional forced-choice design.**

| Instrument | Items | 1 | 2 | 3 | 4 | 5 | 6 |
|-----------|-------|---|---|---|---|---|---|
| CFS | 12 | Strongly Disagree | Disagree | Slightly Disagree | Slightly Agree | Agree | Strongly Agree |

**Notes:**
- Martin & Rubin (1995) intentionally omitted midpoint. Do not convert to 5 or 7 without re-validation.
- Items 2, 3, 5, 10 reverse-scored.

## Format 3: 7-Point True/Agree Likert (52 items)

**Endpoint-only labels.** Positions 1 and 7 get text; positions 2-6 show numbers only.

| Instrument | Items | Endpoint 1 | Endpoint 7 |
|-----------|-------|-----------|-----------|
| BPNSFS-24 | 24 | Not at all true | Completely true |
| GMS-Bookends | 10 | Does not correspond at all | Corresponds exactly |
| MSLQ-CT | 5 | Not at all true of me | Very true of me |
| LCQ-6 | 6 | Strongly disagree | Strongly agree |
| TPS-7 | 7 | Strongly disagree | Strongly agree |

**Notes:**
- Endpoint-only follows original validation studies. Fully labeling 7-point scales creates anchoring artifacts.
- BPNSFS: Chen et al. (2015). 6 subscales (3 needs × satisfaction/frustration). **Perplexity items doc incorrectly lists as 1-5; actual published scale is 1-7.**
- GMS: Guay, Mageau & Vallerand (2003). 10 items = 3 Intrinsic + 3 Integrated + 1 External + 3 Amotivation.
- LCQ-6 and TPS-7 are T3-only (contextual enablers).

## Format 4: 5-Point Frequency Likert (12 items)

All 5 options labeled. Timeframe instruction: **"Over the past month, how often have you..."**

| Instrument | Items | 1 | 2 | 3 | 4 | 5 |
|-----------|-------|---|---|---|---|---|
| C2A-NBS-6 | 6 | Never | Rarely | Sometimes | Often | Very often |
| RQM-6 | 6 | Never | Rarely | Sometimes | Often | Very often |

**Notes:**
- Both are custom C2A instruments. Anchors are a design choice, not published validation.
- Same component as Format 1, different label array.

## Format 5: 0-100 Competence Slider (12 items)

Horizontal slider with endpoint labels and numeric value display.

| Instrument | Items | Left (0) | Right (100) | Default | Tick Marks |
|-----------|-------|----------|-------------|---------|-----------|
| SPCC | 12 | Completely Incompetent | Completely Competent | 50 | 25, 50, 75 (unlabeled) |

**Instructions to display:** "Below are twelve situations in which you might need to communicate. Please indicate how competent you believe you are to communicate in each situation."

**Notes:**
- McCroskey & McCroskey (1988). Published norms: M=73.7, SD=13.8.
- Default 50 (not 0) to avoid low-anchor bias.
- 4 subscales: Public Speaking (1,8,12), Meeting (3,6,10), Group (4,9,11), Dyad (2,5,7).

## Sprint-to-Format Mapping

| Sprint | Instrument | Items | Format |
|--------|-----------|-------|--------|
| T1a | ADEXI | 14 | 1 (5-pt) |
| T1a | BPNSFS-24 | 24 | 3 (7-pt) |
| T1a | GMS-Bookends | 10 | 3 (7-pt) |
| T1b | CFS | 12 | 2 (6-pt) |
| T1b | CAAS-SF | 12 | 1 (5-pt) |
| T1b | BRS | 6 | 1 (5-pt) |
| T1b | SPCC | 12 | 5 (slider) |
| T1b | MSLQ-CT | 5 | 3 (7-pt) |
| T1c | IRI (PT+EC) | 14 | 1 (5-pt) |
| T1c | C2A-NBS-6 | 6 | 4 (frequency) |
| T1c | RQM-6 | 6 | 4 (frequency) |
| T1c | SFCQ | 10 | TBD |
| T3 | LCQ-6 | 6 | 3 (7-pt) |
| T3 | TPS-7 | 7 | 3 (7-pt) |

## UI Components (3 Required)

1. **LikertScale** — Configurable radio button row. Props: `labels` (string[]), `endpointOnly` (boolean), `scalePoints` (5|6|7). Covers Formats 1-4 + SFCQ.
2. **CompetenceSlider** — Horizontal 0-100 slider. Props: `min`, `max`, `step`, `defaultValue`, `leftLabel`, `rightLabel`. Covers Format 5.
3. **InstrumentBlock** — Container wrapping items with instructions and response format. Props: `instrumentId`, `instructions`, `items`, `responseFormat`.
