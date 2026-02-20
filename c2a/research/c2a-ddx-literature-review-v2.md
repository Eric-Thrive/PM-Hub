# C2A Differential Diagnosis Model: Literature Review & Landscape Analysis

**Prepared for ThriveIEP | February 2026**
**Version 2.0 — Corrected ADEXI analysis; added design overview for external review**

---

## Overview: What This Document Covers

This literature review evaluates the theoretical foundations, novelty, and psychometric considerations of the C2A assessment system's differential diagnosis (DDx) architecture. It is intended for review by advisors, partners, and potential collaborators who need to understand both the design approach and the evidence supporting it.

The review covers five areas:

1. **The C2A design approach** — what the system does and how it works
2. **Theoretical foundations** — evidence supporting each component
3. **Comparable systems** — landscape analysis confirming novelty
4. **Durable skills frameworks** — how C2A fits in the broader field
5. **Psychometric considerations** — risks, limitations, and mitigations

---

## 1. The C2A Design Approach

### What C2A Is

C2A (Coach-to-Action) is a longitudinal coaching assessment system for college students, with initial deployment targeting students with learning differences. It uses a 14-instrument, 144-item battery measuring executive function, basic psychological needs, motivational orientation, and 12 durable skills (also called soft skills, transferable skills, or 21st century skills). The battery is administered at multiple timepoints across a coaching engagement.

### What Makes C2A Different: The "Why" Question

Most assessment systems in education stop at score reporting: "You scored low on Resilience." C2A goes further by asking **why** a skill is low, using a structured differential diagnosis engine. This mirrors how expert clinicians reason about complex presentations — a low score is a symptom, not a diagnosis.

### The DDx Engine: Skill-First Blocker Analysis

The DDx engine operates in two layers:

**Layer A (Milestone 3): Blocker Analysis** — Fully deterministic. Given a student's assessment scores, the engine identifies which skills are challenged and then checks three explanatory systems in sequence to determine *why*:

1. **Executive Function check.** Are working memory (ADEXI-WM), inhibition (ADEXI-Inh), or cognitive flexibility (CFS) constraining this skill? EF difficulties represent capacity constraints — the student may want to perform the skill but lacks the cognitive infrastructure to execute it consistently.

2. **Basic Psychological Needs check.** Is the student's autonomy, competence, or relatedness being frustrated in ways relevant to this skill? Uses the BPNSFS-24, which measures satisfaction and frustration as independent constructs per Chen et al. (2015). Need frustration represents environmental or relational constraints.

3. **Motivational Cascade check.** Has need frustration cascaded into motivational breakdown? Uses GMS-Bookends (intrinsic motivation, external regulation, amotivation). Elevated amotivation with low intrinsic motivation suggests the student has disengaged from self-directed growth — a state requiring clinical-level screening before coaching interventions.

**Layer B (Milestones 4-5): Intervention Recommendation** — Filters an intervention bank based on Layer A output plus developmental stage. Layer B depends on a curated intervention library and is architecturally separated from Layer A.

### The Classification System

Each explanatory dimension is classified into one of three categories based on normalized scores:

- **Blocker** (Low, display score less than 25): Address BEFORE coaching the skill. This is a sequential dependency — the constraint must be reduced or accommodated before skill coaching can be effective.
- **Watch** (Needs Focus, display score 25-42): Modify HOW you coach the skill. The constraint exists but does not prevent coaching — it requires parallel accommodation.
- **Clear** (Developing+, display score 42+): Not constraining this skill. Coach directly using standard approaches.

### Coaching Strategy Derivation

The DDx engine derives an intervention *type* from the diagnostic pattern, adapting the Compensate/Accommodate/Change hierarchy from occupational therapy:

| Pattern | Strategy | Rationale |
|---------|----------|-----------|
| EF Blocker present | Compensate/Accommodate | Reduce cognitive load; provide prosthetic supports; scaffold the environment |
| ARC (needs) Blocker present | Change/Strengthen the need first | Frustrated needs must be addressed to restore motivational conditions for growth |
| Both EF + ARC Blockers | Compensate + address need | Dual approach: environmental accommodation plus relational/contextual intervention |
| Watch only (no Blockers) | Change/Strengthen with scaffolds | Standard coaching with modifications for areas of vulnerability |
| All Clear | Change/Strengthen, push growth | Full skill-building; challenge the student within their Zone of Proximal Development |
| GMS Cascade detected | Clinical screen first | Motivational breakdown may indicate depression, burnout, or other conditions requiring professional assessment before coaching |

### The ARC Quadrant Model

For basic psychological needs, C2A uses a quadrant model based on Chen et al.'s (2015) finding that satisfaction and frustration are independent constructs:

| Quadrant | Satisfaction | Frustration | Classification |
|----------|-------------|-------------|----------------|
| Thriving | High | Low | Clear |
| Disengaged | Low | Low | Watch |
| Conflicted | High | High | Watch |
| Crisis | Low | High | Blocker |

### Key Design Principles

- **No LLM at runtime.** The DDx engine is fully deterministic. All narrative text is drawn from a pre-authored template library (LLM-drafted, human-reviewed, stored as static JSON). This ensures reproducibility, auditability, and FERPA compliance.
- **Transparency and auditability.** Every classification decision produces an audit trail showing which scores contributed, which thresholds were applied, and which rules fired.
- **Longitudinal carry-forward.** The system supports arbitrary timepoints, carrying forward the most recent prior assessment for comparison.
- **Student and coach views.** Profiles render in two variants: a student-facing view (8th grade reading level, strengths-first framing) and a coach-facing view (includes diagnostic detail, strategy recommendations, and clinical flags).

---

## 2. Theoretical Foundations

### 2.1 SDT: Need Satisfaction and Frustration as Independent Constructs

C2A's separate measurement of need satisfaction and frustration — and the ARC quadrant model built on their independence — rests on substantial structural evidence.

**Core citation:** Chen, B., Vansteenkiste, M., Beyers, W., Boone, L., Deci, E. L., Van der Kaap-Deeder, J., ... & Verstuyf, J. (2015). Basic psychological need satisfaction, need frustration, and need strength across four cultures. *Motivation and Emotion, 39*, 216-236.

Chen et al. developed the BPNSFS-24 across samples in Peru, China, Belgium, and the United States, finding that a six-factor model (satisfaction and frustration as separate factors for each of autonomy, competence, and relatedness) fit significantly better than a three-factor model collapsing them onto bipolar dimensions. Need satisfaction uniquely predicted well-being indicators (vitality, life satisfaction), while need frustration uniquely predicted ill-being (depressive symptoms, negative affect).

**Theoretical architecture:** Vansteenkiste, M. & Ryan, R. M. (2013). On psychological growth and vulnerability: Basic psychological need satisfaction and need frustration as a unifying principle. *Journal of Psychotherapy Integration, 23*(3), 263-280.

Vansteenkiste and Ryan distinguished between lack of need nourishment (analogous to insufficient rainfall) and active need thwarting (analogous to salting the soil) — qualitatively different experiences with distinct antecedents and intervention targets. This distinction directly supports C2A's differentiation between the "Disengaged" quadrant (low satisfaction, low frustration — needs are unmet but not actively undermined) and the "Crisis" quadrant (low satisfaction, high frustration — needs are being actively thwarted).

**Operational validation:** Bartholomew, K. J., Ntoumanis, N., Ryan, R. M., Bosch, J. A., & Thogersen-Ntoumani, C. (2011). Self-determination theory and diminished functioning: The role of interpersonal control and psychological need thwarting. *Personality and Social Psychology Bulletin, 37*(11), 1459-1473.

Bartholomew et al. demonstrated that need thwarting predicted burnout, depression, and disordered eating more consistently than low satisfaction predicted their absence — supporting C2A's decision to treat the Crisis quadrant (high frustration) as a Blocker while treating the Disengaged quadrant (low satisfaction without frustration) as a Watch.

**Person-oriented support:** Rouse, P. C., Turner, P. J. F., Siddall, A. G., Schmid, J., Standage, M., & Bilzon, J. L. J. (2020). The interplay between psychological need satisfaction and need frustration within a work context. *Motivation and Emotion, 44*, 175-190.

Identified distinct profiles of need satisfaction/frustration combinations in workplace settings, confirming these are not simply inversions of each other — directly supporting C2A's four-quadrant classification approach.

**Cross-domain validation:** Olafsen, A. H., Deci, E. L., & Halvari, H. (2021). Basic psychological need satisfaction and frustration at work scale. *Frontiers in Psychology, 12*, 697306.

Supported the six-factor structure in Norwegian and English work samples.

**Methodological challenge to note:** Kritzler, S., Krasko, J., & Luhmann, M. (2024). The BPNSFS probably do not validly measure need frustration. *European Journal of Psychological Assessment.*

Kritzler et al. argued across eight samples that the BPNSFS's apparent satisfaction-frustration distinction may be partially a method artifact driven by item-keying direction rather than a substantive psychological difference. This does not invalidate SDT's theoretical distinction, but questions whether the BPNSFS specifically captures it at the individual level. See Section 5.3 for C2A's mitigation approach.

### 2.2 The Dark Pathway: Need Frustration to Motivational Cascade

C2A's motivational cascade check — testing whether need frustration has cascaded into motivational breakdown — finds strong support in the SDT dual-pathway literature.

**Bright/dark pathway model:** Haerens, L., Aelterman, N., Vansteenkiste, M., Soenens, B., & Van Petegem, S. (2015). Do perceived autonomy-supportive and controlling teaching relate to physical education students' motivational experiences through unique pathways? *Psychology of Sport and Exercise, 16*, 26-36.

Haerens et al. tested the integrated bright/dark pathway model in 499 secondary students. Perceived controlling teaching predicted need frustration, which in turn predicted controlled motivation, amotivation, and oppositional defiance — a distinct pathway from the "bright side" where autonomy support predicted need satisfaction and autonomous motivation.

**Third pathway (emerging):** Ntoumanis, N. (2023). The bright, dark, and dim light colors of motivation. *Advances in Motivation Science, 9*.

Extended the model to include a "dim" pathway: need-indifferent interpersonal styles leading to personal need unfulfillment. This is relevant to C2A's "Disengaged" quadrant and suggests this state may have distinct antecedents requiring different coaching approaches.

### 2.3 Executive Function as Constraint on Skill Development

**EF development timeline:** Miyake, A. & Friedman, N. P. (2012). The nature and organization of individual differences in executive functions. *Current Directions in Psychological Science, 21*(1), 8-14.

EF development continues into the mid-twenties, with prefrontal cortex maturation lagging behind academic and vocational demands — making EF particularly relevant for C2A's college-age population.

**Compensation as primary strategy:** Barkley, R. A. (2012). *Executive Functions: What They Are, How They Work, and Why They Evolved.* Guilford Press.

Barkley argues that EF deficits are neurobiological constraints best addressed through environmental modifications and prosthetic aids — providing the theoretical basis for C2A's "Compensate/Accommodate" strategy when EF is classified as a Blocker.

**Natural compensatory development:** Ceroni, M., Rossi, S., et al. (2022). Attentive-executive functioning and compensatory strategies in adult ADHD. *Frontiers in Psychology, 13*, 1015102.

Found that adults with ADHD naturally develop compensatory strategies that effectively counterbalance executive difficulties — supporting C2A's approach of building compensatory scaffolds rather than attempting to directly remediate EF capacity.

**Accommodation alone is insufficient:** Lovett, B. J. & Nelson, J. M. (2021). Systematic review: Educational accommodations for children and adolescents with ADHD. *JAACAP, 60*(4), 448-457.

Found that most educational accommodations lack evidence of specific benefits when used as standalone supports. This supports C2A's design of pairing compensatory strategies with targeted skill coaching.

### 2.4 Self-Report EF Measures: What They Capture and Why It Matters for C2A

A critical question for C2A's design is whether self-report EF measures like the ADEXI capture genuine functional EF capacity or merely personality-related self-perception. The literature addresses this directly — and supports C2A's use of self-report EF.

**The core finding: Self-report and performance-based EF measures assess different constructs, and both are valid.**

Toplak, M. E., West, R. F., & Stanovich, K. E. (2013). Do performance-based measures and ratings of executive function assess the same construct? *Journal of Child Psychology and Psychiatry, 54*(2), 131-143.

Toplak et al.'s influential review analyzed the relationship between performance-based EF tests and self-report rating scales across 20 studies. Of 182 correlations between the BRIEF and performance-based tests, only 19% reached significance. Their conclusion was not that self-report EF is invalid, but that the two measurement approaches capture different levels of cognition: performance-based measures capture *processing efficiency* (the "algorithmic mind"), while self-report ratings capture *success in goal pursuit* (the "reflective mind"). Critically, Toplak states: "Both domains of assessment are useful and valuable, but they provide different types of information."

This distinction maps precisely onto C2A's needs. C2A is not diagnosing neurological processing speed — it is identifying whether a student's EF difficulties in daily academic life constrain their durable skill development. That is the goal-pursuit level, not the lab-test processing level.

**Self-report EF predicts real-world outcomes better than performance tests.**

Barkley, R. A. & Murphy, K. R. (2010). Impairment in occupational functioning and adult ADHD: The predictive utility of executive function (EF) ratings versus EF tests. *Archives of Clinical Neuropsychology, 25*(3), 157-173.

In a study of 352 adults (146 ADHD, 97 clinical controls, 109 community controls), self-ratings of EF were significantly predictive of impairments across all 11 measures of occupational adjustment. Performance-based EF tests also predicted impairment, but contributed substantially less variance, particularly when analyzed jointly with ratings. Only 14% of participants impaired on performance-based measures reported impairment on rating scales — demonstrating that the two approaches identify largely non-overlapping populations with different types of EF difficulty.

Barkley, R. A. & Fischer, M. (2011). Predicting impairment in major life activities and occupational functioning in hyperactive children as adults. *Developmental Neuropsychology, 36*(2), 137-161.

Extended this finding longitudinally, showing EF ratings were superior to EF tests in predicting major life activity impairments.

**The personality correlation is shared variance, not confound.**

Buchanan, T. (2016). Self-report measures of executive function problems correlate with personality, not performance-based executive function measures, in nonclinical samples. *Psychological Assessment, 28*(4), 372-385.

Buchanan found across three studies that self-reported EF problems correlated with neuroticism and low conscientiousness but not with performance on Trail Making, Phonemic Fluency, Semantic Fluency, or Digit Span. This finding applies broadly to ALL self-report cognitive measures (BRIEF-A, BDEFS, Webexec, CFQ, PRMQ) — it is not specific to the ADEXI. The same personality correlations have been demonstrated for the BRIEF-A in older adults, the DEX, and self-report memory measures.

The important question is whether this personality correlation represents measurement contamination or genuine shared variance. Barkley's framework provides the answer: people low in conscientiousness and high in neuroticism experience more EF difficulties in daily life. This is not a measurement artifact — it is a real relationship. The self-report measure captures functional EF as experienced in daily goal pursuit, which is influenced by both cognitive capacity and the personality-related conditions under which that capacity is deployed. For C2A's coaching purposes, this is exactly what matters: how EF difficulties actually manifest in the student's life.

**Barkley's hierarchical EF model supports self-report as the appropriate measurement level for coaching.**

Barkley (2012) proposes that EF operates at multiple hierarchical levels. Performance-based tests assess "self-directed, internalized pre-executive processes" at the instrumental-cognitive level. Self-report ratings assess functioning at the "strategic-cooperative level" — achieving long-term goals in education, work, and daily life. Laboratory tests primarily tap "cold" cognitive processes across small ascertainment periods and do not assess emotionally contextualized difficulties or the cross-temporal organization of actions toward goals.

For C2A, which aims to inform coaching strategies for durable skill development in real-world academic and professional contexts, the strategic-cooperative level is the appropriate target.

**ADEXI-specific validation:**

Holst, Y. & Thorell, L. B. (2018). Adult executive functioning inventory (ADEXI): Validity, reliability, and relations to ADHD. *International Journal of Methods in Psychiatric Research, 27*(1), e1567.

The ADEXI demonstrated high internal consistency (alpha approximately .90), adequate test-retest reliability, high correlations with the BDEFS (another EF rating scale), and strong discriminant validity (ADHD group scored significantly higher than both clinical and non-clinical controls on both subscales). The low correlations with neuropsychological tests are consistent with all self-report EF measures — this is a property of the measurement level, not a flaw specific to the ADEXI.

Lopez, M. B., Aran Filippetti, V., & Richaud, M. C. (2021). Adult Executive Functioning Inventory (ADEXI): Factor structure, convergent validity, and reliability of a Spanish adaptation. *Applied Neuropsychology: Adult, 29*(6), 1380-1386.

Confirmed the two-factor structure (working memory + inhibition) in 369 healthy adults, with significant correlations between ADEXI and the Cognitive Flexibility Scale (CFS-WM: r = -.44; CFS-INH: r = -.20).

### 2.5 The Compensate/Accommodate/Change Hierarchy

C2A adapts its intervention hierarchy from occupational therapy, where it has decades of clinical application.

**Compensatory-first approach:** Allen, C. K. (1992). Cognitive Disabilities Model. In N. Katz (Ed.), *Cognitive Rehabilitation: Models for Intervention in Occupational Therapy.* Butterworth-Heinemann.

**Staged compensatory-to-remedial framework:** Toglia, J. P. (1991). Generalization of treatment: A multicontext approach to cognitive perceptual impairment in adults with brain injury. *American Journal of Occupational Therapy, 45*(6), 505-516.

Toglia's Dynamic Interactional Approach combines compensatory and remedial strategies in a staged framework: compensatory/adaptive training first, transitioning to graded cognitive training as capacity allows. C2A's design follows this logic.

C2A's application of this hierarchy to educational coaching appears genuinely novel. While special education uses a related accommodation-modification-instruction sequence under IDEA, the specific formalization of "Compensate, Accommodate, Change/Strengthen" as a coaching decision framework derived from assessment-driven diagnostic patterns has not been documented in higher education literature.

### 2.6 Blocker-First Clinical Sequencing

**Phase-based prioritization:** Herman, J. L. (1992). *Trauma and Recovery.* Basic Books. "The first task of recovery is to establish the survivor's safety. This task takes precedence over all others."

**Treatment hierarchy:** Linehan, M. M. (1993). *Cognitive-Behavioral Treatment of Borderline Personality Disorder.* Guilford Press. DBT's explicit treatment hierarchy (life-threatening, therapy-interfering, quality-of-life, skills) provides a clinical implementation of prioritized sequencing paralleling C2A's Blocker, Watch, Clear hierarchy.

**ZPD and scaffolding:** Vygotsky, L. S. (1978). *Mind in Society.* Harvard University Press. Wood, Bruner, & Ross (1976) operationalized this as scaffolding in *JCPP, 17*(2), 89-100.

**EF-SDT connection in coaching:** Parker, D. R. & Boutelle, K. (2009). Executive function coaching for college students with learning disabilities and ADHD. *Learning Disabilities Research & Practice, 24*, 204-215.

Provides the strongest conceptual precedent for connecting EF coaching to self-determination outcomes in college students with ADHD/LD.

**Neuroaffirmative SDT-based framework:** The ADAPT Framework (2025, *JMIR*). A neuroaffirmative, self-determination theory-based psychosocial intervention for adults with ADHD. The closest published parallel to C2A's theoretical architecture.

---

## 3. No Comparable Assessment System Exists

Extensive landscape analysis reveals that no existing system replicates C2A's complete diagnostic architecture.

### 3.1 No Educational System Uses Differential Diagnosis Logic

Adaptive learning platforms (ALEKS, DreamBox, Knewton Alta, Carnegie MATHia) identify *what* students don't know but none ask *why* at a psychological or motivational level. The AMA's Precision Education Framework (Desai et al., 2024, *Academic Medicine*), backed by $12 million across 10 institutions, represents the most ambitious effort toward theory-driven personalized education but applies to physician training.

### 3.2 Closest Existing Systems

1. **LASSI** (Learning and Study Strategies Inventory) — Skill/Will/Self-Regulation framework, 10 scales, 60 items. Does not measure EF explicitly, does not use SDT constructs, does not classify Blocker/Watch/Clear.

2. **College Student Inventory** (Ruffalo Noel Levitz) — 1,400+ institutions, 2.6M+ students. Priority algorithm combining need-based scores with receptivity. Lacks EF measurement, SDT grounding, differential diagnosis logic.

3. **Georgia State predictive analytics** — 800+ risk factors, 40,000+ students, 90,000+ interventions/year. Behavioral and institutional data for triage, not psychological construct assessment.

### 3.3 No Published Battery Integrates EF + SDT Needs + SDT Motivation

Systematic searching found zero published studies combining ADEXI with BPNSFS, zero combining ADEXI with GMS, zero combining CFS with BPNSFS, and zero combining all four.

Strongest partial precedent: Manuhuwa et al. (2023) combined BRIEF-A with MSLQ in 315 first-year students. EF explained 19.8% of variance in study success, self-regulated learning 22.9%, together 39.8% (*Frontiers in Psychology, 14*, 1229518). However, MSLQ uses social-cognitive framework, not SDT constructs.

ADEXI + CFS co-administration: Lopez et al. (2021) used both in 369 adults, confirming complementary measurement properties.

---

## 4. Durable Skills Landscape: C2A Provides Diagnostic Depth Others Lack

### 4.1 Nine Major Frameworks, Zero Diagnostic Reasoning

| Framework | Skills/Competencies | Diagnostic? | Notes |
|-----------|-------------------|-------------|-------|
| NACE Career Readiness (2024) | 8 competencies | No | 30%+ perception gaps student vs. employer |
| CASEL SEL (2020) | 5 domains | No | Relies on third-party tools reporting levels |
| America Succeeds Pathsmith (2024) | 10 competencies, 110 sub-competencies | No | 800+ stakeholders, 80M+ job postings |
| SkillsBuilder Universal (v2.0) | 8 skills, 16 steps each | No | 950+ partners, 20+ countries |
| WEF Future of Jobs (2025) | Top skills, 1,000+ companies | No | Demand-side analysis only |
| OECD Learning Compass 2030 | Broad competency vision | No | Explicitly avoids being assessment |
| Education Design Lab | 9 micro-credentials | No | Performance-based via vsbl platform |
| AAC&U LEAP/VALUE (2022) | Essential learning outcomes | No | Portfolio assessment, no causal analysis |
| P21 Framework | 4Cs + learning skills | No | No assessment instruments |

Every major framework stops at "here's your score." None asks "why is this skill low?"

The closest parallels to diagnostic reasoning exist outside these frameworks: Applied Behavior Analysis distinguishes acquisition deficits from performance deficits; Functional Behavioral Assessment uses antecedent-behavior-consequence analysis; Multi-Tiered Systems of Support require diagnostic assessment to identify appropriate intervention level.

### 4.2 Skill Coverage Gaps to Address

C2A's 12 skills overlap well with high-demand competencies but show notable absences:

- **Leadership** — standalone in 6+ major frameworks; C2A's most conspicuous gap
- **Self-Management/Self-Regulation** — CASEL core pillar; may be partially captured by EF assessment but not measured as explicit skill
- **Metacognition** — America Succeeds core, WEF top rising skill
- **Digital/Technological Literacy** — dominates WEF/OECD; may be intentionally excluded as technical vs. durable
- **Ethical Reasoning/Character** — features in CASEL, AAC&U, America Succeeds

C2A compensates with unique granularity: Networking as standalone skill, Curiosity separated from lifelong learning, and Relationship Building as distinct competency.

---

## 5. Psychometric Considerations and Mitigations

### 5.1 No Validated Individual-Level Cutoffs Exist for C2A Instruments

The BPNSFS lacks standardized cutoff values; it "is typically used to assess relative levels of need satisfaction and frustration rather than to classify individuals into categories" (BPNSFS Manual, selfdeterminationtheory.org). Dichotomizing continuous scores into Blocker/Watch/Clear categories incurs the costs documented by Altman & Royston (2006, *BMJ, 332*, 1080) — reduced power equivalent to discarding a third of the data — and creates boundary effects where functionally equivalent students receive dramatically different interventions.

**C2A mitigation:** The system maintains continuous scores as primary data with categorical labels functioning as coaching heuristics rather than diagnostic conclusions. The Blocker/Watch/Clear classification guides the coaching conversation; it does not override clinical judgment. Establishing local norms through pilot data at National Louis University will provide population-specific reference distributions. SEM-based confidence intervals around classification boundaries will flag cases where classification is uncertain.

### 5.2 GMS Bookends Skip Identified Regulation

The GMS-Bookends approach measures only intrinsic motivation, external regulation, and amotivation — skipping identified, introjected, and integrated regulation. The Polish GMS validation (Kowal & Kusnierz, 2019, *Current Psychology*) reported composite reliability coefficients of .55-.66, below the .70 threshold generally recommended for individual-level decision-making.

Missing identified regulation is particularly problematic for educational contexts: a student who deeply values a skill but finds no intrinsic pleasure in practicing it would appear motivationally compromised when they may be well-positioned for value-aligned development.

**C2A mitigation:** The GMS cascade check is designed as a clinical *flag*, not a nuanced motivational profile. Its purpose is narrow: detect whether need frustration has cascaded into motivational breakdown (elevated amotivation + low intrinsic motivation) that warrants clinical screening before coaching. For this screening purpose, the bookends approach is adequate. Adding the identified regulation subscale in future versions would capture the most actionable motivational state for educational intervention.

### 5.3 The Satisfaction-Frustration Distinction May Be Partially Methodological

Kritzler et al. (2024) argued that the BPNSFS's apparent satisfaction-frustration distinction may be partially a method artifact from item-keying direction. If this is correct, C2A's ARC quadrant model may be drawing a finer distinction than the instrument can reliably support at the individual level.

**C2A mitigation:** The quadrant model is used as a coaching heuristic, not a clinical diagnosis. The practical coaching difference between "Disengaged" (low sat, low frust) and "Crisis" (low sat, high frust) is meaningful regardless of whether the measurement distinction is fully substantive — a student reporting active frustration warrants a different coaching response than one reporting passive disengagement. Validating the independence assumption within C2A's target population through pilot data is a priority. If the distinction does not hold empirically, the quadrant model can be simplified to a two-state model (adequate/inadequate needs) without disrupting the overall DDx architecture.

### 5.4 Blocker-First Sequencing Has Documented Limitations

While well-supported clinically, the blocker-first principle carries specific risks in educational settings:

- False-positive Blocker classification means students lose time receiving accommodation when they could be building skills directly (Bower & Gilbody, 2005, *British Journal of Psychiatry*).
- Integrated approaches may outperform sequential ones for comorbid conditions (NCBI Bookshelf NBK576985).
- Skill-building itself may scaffold EF improvement as a byproduct (Reis et al., 2000), and working memory training meta-analyses (Melby-Lervag, Redick, & Hulme, 2016, *Perspectives on Psychological Science, 11*(4), 512-534) show no reliable far-transfer from direct EF remediation.

**C2A mitigation:** The system frames Blocker classification as "compensate AND build" rather than "compensate INSTEAD OF build." A Blocker classification does not stop skill coaching — it adds compensatory scaffolding alongside skill coaching. The sequential dependency is about strategy type (compensate first, then expand), not about withholding coaching entirely.

---

## 6. Summary: C2A's Position in the Landscape

### Areas of Genuine Novelty (No Published Precedent Found)

1. Multi-layer differential diagnosis architecture applied to durable skill coaching
2. Integrated EF + SDT needs + SDT motivation assessment battery in a single system
3. Blocker/Watch/Clear classification system derived from assessment patterns
4. Coaching strategy type derivation from diagnostic patterns (not just severity)
5. OT intervention hierarchy (Compensate/Accommodate/Change) translated into higher education coaching

### Theoretical Strengths

- Each individual theoretical foundation (SDT dual-pathway, OT intervention hierarchy, blocker-first sequencing, ZPD scaffolding, self-report EF as goal-pursuit measure) has substantial evidence
- The skill-first observation, then asking "why" through ordered explanatory layers, mirrors how expert clinicians reason about complex presentations
- Self-report EF measures capture the right level of analysis for coaching — functional goal-pursuit capacity rather than laboratory processing efficiency

### Primary Validation Burden

- The integration of these individually-validated components into a single automated system extends beyond what any single literature base has validated
- Individual-level classification thresholds require empirical validation through pilot data
- The complete diagnostic architecture is the core intellectual property and the core validation gap

### Priority Mitigations

1. Establish local norms through NLU pilot data before treating Blocker/Watch/Clear as hard categories
2. Validate BPNSFS independence assumption in C2A's target population
3. Consider adding identified regulation to GMS component in future versions
4. Frame Blocker classification as "compensate AND build" rather than sequential dependency

---

## Citation Index

### SDT Foundations
- Bartholomew et al. (2011). *PSPB, 37*(11), 1459-1473.
- Chen et al. (2015). *Motivation and Emotion, 39*, 216-236.
- Haerens et al. (2015). *Psychology of Sport and Exercise, 16*, 26-36.
- Kritzler, Krasko, & Luhmann (2024). *European Journal of Psychological Assessment.*
- Ntoumanis (2023). *Advances in Motivation Science, 9*.
- Olafsen, Deci, & Halvari (2021). *Frontiers in Psychology, 12*, 697306.
- Rouse et al. (2020). *Motivation and Emotion, 44*, 175-190.
- Vansteenkiste & Ryan (2013). *Journal of Psychotherapy Integration, 23*(3), 263-280.

### Executive Function
- Barkley (2012). *Executive Functions.* Guilford Press.
- Barkley & Fischer (2011). *Developmental Neuropsychology, 36*(2), 137-161.
- Barkley & Murphy (2010). *Archives of Clinical Neuropsychology, 25*(3), 157-173.
- Buchanan (2016). *Psychological Assessment, 28*(4), 372-385.
- Ceroni et al. (2022). *Frontiers in Psychology, 13*, 1015102.
- Holst & Thorell (2018). *Int J Methods in Psychiatric Research, 27*(1), e1567.
- Lopez, Aran Filippetti, & Richaud (2021). *Applied Neuropsychology: Adult, 29*(6), 1380-1386.
- Lovett & Nelson (2021). *JAACAP, 60*(4), 448-457.
- Miyake & Friedman (2012). *Current Directions in Psychological Science, 21*(1), 8-14.
- Toplak, West, & Stanovich (2013). *JCPP, 54*(2), 131-143.

### OT and Intervention Hierarchy
- Allen (1992). Cognitive Disabilities Model. Butterworth-Heinemann.
- Toglia (1991). *AJOT, 45*(6), 505-516.

### Blocker-First Sequencing
- Herman (1992). *Trauma and Recovery.* Basic Books.
- Linehan (1993). *CBT of BPD.* Guilford Press.
- Vygotsky (1978). *Mind in Society.* Harvard University Press.
- Wood, Bruner, & Ross (1976). *JCPP, 17*(2), 89-100.
- Parker & Boutelle (2009). *Learning Disabilities Research & Practice, 24*, 204-215.

### Psychometric Risk
- Altman & Royston (2006). *BMJ, 332*, 1080.
- Bower & Gilbody (2005). *British Journal of Psychiatry.*
- Kowal & Kusnierz (2019). *Current Psychology.*
- Melby-Lervag, Redick, & Hulme (2016). *Perspectives on Psychological Science, 11*(4), 512-534.

### Landscape and Frameworks
- Manuhuwa et al. (2023). *Frontiers in Psychology, 14*, 1229518.
- ADAPT Framework (2025). *JMIR.*
- Desai et al. (2024). *Academic Medicine* (AMA Precision Education).

---

*Document version 2.0 | February 19, 2026 | Prepared by ThriveIEP product team*
*Key change from v1.0: Corrected analysis of self-report EF validity. Original version overstated ADEXI-specific personality confound risk. Updated analysis reflects expert consensus (Toplak, Barkley) that self-report EF measures a different but equally valid construct — goal-pursuit capacity — which is the appropriate measurement level for coaching applications.*
