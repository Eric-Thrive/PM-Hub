/**
 * le3-construct-map.ts
 * 
 * LE3 Framework Construct Mapping — Layer 1 (subscale scores) → Layer 2 (reported skills + DDx dimensions)
 * 
 * Maps C2A instrument subscales to the LE3 Graduate Pillars Framework (12 durable skills).
 * Source of truth: le3_graduate_pillars.framework.json v2.0
 * Reconciliation: THR-199 Step 2 (supersedes ref3 construct map)
 * 
 * For alternative framework mappings (e.g., America Succeeds, NACE), create a parallel file.
 * 
 * This file defines:
 *   1. reportedSkills — 12 LE3 durable skills with weighted subscale→skill rollup
 *   2. ddxDimensions — 9 explanatory dimensions (3 EF + 6 ARC facets) + 2 GMS + 2 environment
 *   3. Helper types and lookup utilities
 * 
 * The scoring engine (THR-140) consumes these mappings at Stage 4 (construct rollup).
 * The DDx engine (THR-199) consumes ddxDimensions for blocker analysis.
 */

// ============================================================================
// Types
// ============================================================================

export type Pillar = 'p1' | 'p2' | 'p3' | 'p4';
export type SkillFamily = 'cognitive' | 'interpersonal' | 'self_directed';
export type IndicatorRole = 'primary' | 'constraint' | 'supporting';
export type DdxRole = 'ef_domain' | 'arc_facet' | 'gms_cascade' | 'environmental';

export interface SubscaleSource {
  instrument: string;
  subscale: string;
  role: IndicatorRole;
  /** Cronbach's α from validation literature. Used for reliability-weighted rollup. */
  alpha: number;
  /** 
   * Normalized weight for construct rollup. 
   * Primary indicators get full weight; constraint/supporting get reduced weight.
   * Weights within a skill sum to 1.0.
   */
  weight: number;
}

export interface ReportedSkill {
  skillId: string;
  displayName: string;
  pillar: Pillar;
  crossListedPillars?: Pillar[];
  skillFamily: SkillFamily;
  /** Subscale sources with weights for reliability-weighted mean rollup */
  sources: SubscaleSource[];
  /** Which EF domains are relevant for DDx per-skill analysis */
  efRelevance: string[];
  /** Which ARC needs are relevant for DDx per-skill analysis */
  arcRelevance: string[];
}

export interface DdxDimension {
  dimensionId: string;
  displayName: string;
  instrument: string;
  subscale: string;
  ddxRole: DdxRole;
  /** Direction of raw score interpretation */
  direction: 'high_is_positive' | 'high_is_deficit' | 'high_is_negative';
  /** Whether score is reflected (6 - raw) before normalization */
  reflectionApplied: boolean;
  /** Timepoint availability */
  timepoints: string[];
}

// ============================================================================
// Reported Skills — 12 LE3 Durable Skills
// ============================================================================
// 
// Rollup method: reliability-weighted mean
//   score_skill = Σ(weight_i × normalized_subscale_i) / Σ(weight_i)
//
// Weight assignment logic:
//   - Primary indicators: weight proportional to α (main signal)
//   - Constraint indicators: weight = 0 for rollup (used by DDx only)
//   - Supporting indicators: weight = α × 0.3 (contextual signal, dampened)
//
// Note: constraint indicators (ADEXI-WM, ADEXI-Inh) do NOT contribute to
// the skill score rollup. They are scored and categorized independently,
// then consumed by the DDx engine to determine WHY a skill is low.
// ============================================================================

export const reportedSkills: Record<string, ReportedSkill> = {

  // ── Pillar 1: Creative & Curious Thinkers ──────────────────────────────

  creative_problem_solving: {
    skillId: 'creative_problem_solving',
    displayName: 'Creative Problem Solving',
    pillar: 'p1',
    skillFamily: 'cognitive',
    sources: [
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'primary', alpha: 0.77, weight: 0.47 },
      { instrument: 'caas_sf', subscale: 'curiosity', role: 'primary', alpha: 0.74, weight: 0.45 },
      // Constraint — not in rollup
      { instrument: 'adexi', subscale: 'working_memory', role: 'constraint', alpha: 0.90, weight: 0 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'confidence', role: 'supporting', alpha: 0.73, weight: 0.08 },
    ],
    efRelevance: ['working_memory', 'cognitive_flexibility'],
    arcRelevance: ['autonomy', 'competence'],
  },

  critical_thinking: {
    skillId: 'critical_thinking',
    displayName: 'Critical Thinking',
    pillar: 'p1',
    skillFamily: 'cognitive',
    sources: [
      { instrument: 'mslq_ct', subscale: 'critical_thinking', role: 'primary', alpha: 0.80, weight: 0.48 },
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'primary', alpha: 0.77, weight: 0.46 },
      // Constraint
      { instrument: 'adexi', subscale: 'working_memory', role: 'constraint', alpha: 0.90, weight: 0 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'curiosity', role: 'supporting', alpha: 0.74, weight: 0.06 },
    ],
    efRelevance: ['working_memory', 'cognitive_flexibility'],
    arcRelevance: ['competence'],
  },

  curiosity: {
    skillId: 'curiosity',
    displayName: 'Curiosity',
    pillar: 'p1',
    skillFamily: 'cognitive',
    sources: [
      { instrument: 'caas_sf', subscale: 'curiosity', role: 'primary', alpha: 0.74, weight: 0.55 },
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'primary', alpha: 0.77, weight: 0.38 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'concern', role: 'supporting', alpha: 0.77, weight: 0.07 },
    ],
    efRelevance: ['cognitive_flexibility'],
    arcRelevance: ['autonomy'],
  },

  adaptability: {
    skillId: 'adaptability',
    displayName: 'Adaptability',
    pillar: 'p1',
    crossListedPillars: ['p1', 'p3'],
    skillFamily: 'cognitive',
    sources: [
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'primary', alpha: 0.77, weight: 0.30 },
      { instrument: 'caas_sf', subscale: 'concern', role: 'primary', alpha: 0.77, weight: 0.30 },
      { instrument: 'brs', subscale: 'brief_resilience', role: 'primary', alpha: 0.83, weight: 0.32 },
      // Constraints
      { instrument: 'adexi', subscale: 'working_memory', role: 'constraint', alpha: 0.90, weight: 0 },
      { instrument: 'adexi', subscale: 'inhibition', role: 'constraint', alpha: 0.88, weight: 0 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'confidence', role: 'supporting', alpha: 0.73, weight: 0.08 },
    ],
    efRelevance: ['working_memory', 'inhibition', 'cognitive_flexibility'],
    arcRelevance: ['autonomy', 'competence'],
  },

  // ── Pillar 2: Leaders with Purpose & Agency ────────────────────────────

  initiative: {
    skillId: 'initiative',
    displayName: 'Initiative',
    pillar: 'p2',
    skillFamily: 'self_directed',
    sources: [
      { instrument: 'caas_sf', subscale: 'control', role: 'primary', alpha: 0.74, weight: 0.50 },
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'primary', alpha: 0.77, weight: 0.42 },
      // Constraint
      { instrument: 'adexi', subscale: 'working_memory', role: 'constraint', alpha: 0.90, weight: 0 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'confidence', role: 'supporting', alpha: 0.73, weight: 0.08 },
    ],
    efRelevance: ['working_memory'],
    arcRelevance: ['autonomy', 'competence'],
  },

  empathy: {
    skillId: 'empathy',
    displayName: 'Empathy',
    pillar: 'p2',
    skillFamily: 'interpersonal',
    sources: [
      { instrument: 'iri', subscale: 'perspective_taking', role: 'primary', alpha: 0.78, weight: 0.47 },
      { instrument: 'iri', subscale: 'empathic_concern', role: 'primary', alpha: 0.73, weight: 0.44 },
      // Constraint
      { instrument: 'adexi', subscale: 'inhibition', role: 'constraint', alpha: 0.88, weight: 0 },
      // Supporting
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'supporting', alpha: 0.77, weight: 0.09 },
    ],
    efRelevance: ['inhibition', 'cognitive_flexibility'],
    arcRelevance: ['relatedness'],
  },

  communication: {
    skillId: 'communication',
    displayName: 'Communication',
    pillar: 'p2',
    skillFamily: 'interpersonal',
    sources: [
      { instrument: 'spcc', subscale: 'public_speaking', role: 'primary', alpha: 0.85, weight: 0.22 },
      { instrument: 'spcc', subscale: 'meeting', role: 'primary', alpha: 0.85, weight: 0.22 },
      { instrument: 'spcc', subscale: 'group_discussion', role: 'primary', alpha: 0.85, weight: 0.22 },
      { instrument: 'spcc', subscale: 'dyad', role: 'primary', alpha: 0.85, weight: 0.22 },
      // Constraints
      { instrument: 'adexi', subscale: 'working_memory', role: 'constraint', alpha: 0.90, weight: 0 },
      { instrument: 'adexi', subscale: 'inhibition', role: 'constraint', alpha: 0.88, weight: 0 },
      // Supporting
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'supporting', alpha: 0.77, weight: 0.12 },
    ],
    efRelevance: ['working_memory', 'inhibition'],
    arcRelevance: ['relatedness', 'competence'],
  },

  // ── Pillar 3: Thrivers in Change ───────────────────────────────────────

  resilience: {
    skillId: 'resilience',
    displayName: 'Resilience',
    pillar: 'p3',
    skillFamily: 'self_directed',
    sources: [
      { instrument: 'brs', subscale: 'brief_resilience', role: 'primary', alpha: 0.83, weight: 0.52 },
      { instrument: 'caas_sf', subscale: 'confidence', role: 'primary', alpha: 0.73, weight: 0.40 },
      // Constraint
      { instrument: 'adexi', subscale: 'working_memory', role: 'constraint', alpha: 0.90, weight: 0 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'control', role: 'supporting', alpha: 0.74, weight: 0.08 },
    ],
    efRelevance: ['working_memory', 'inhibition'],
    arcRelevance: ['competence'],
  },

  collaboration: {
    skillId: 'collaboration',
    displayName: 'Collaboration',
    pillar: 'p3',
    skillFamily: 'interpersonal',
    sources: [
      { instrument: 'spcc', subscale: 'group_discussion', role: 'primary', alpha: 0.85, weight: 0.30 },
      { instrument: 'spcc', subscale: 'meeting', role: 'primary', alpha: 0.85, weight: 0.30 },
      { instrument: 'iri', subscale: 'perspective_taking', role: 'primary', alpha: 0.78, weight: 0.28 },
      // Constraint
      { instrument: 'adexi', subscale: 'inhibition', role: 'constraint', alpha: 0.88, weight: 0 },
      // Supporting
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'supporting', alpha: 0.77, weight: 0.12 },
    ],
    efRelevance: ['inhibition', 'cognitive_flexibility'],
    arcRelevance: ['relatedness'],
  },

  // ── Pillar 4: Network Builders ─────────────────────────────────────────

  networking: {
    skillId: 'networking',
    displayName: 'Networking',
    pillar: 'p4',
    skillFamily: 'interpersonal',
    sources: [
      { instrument: 'c2a_nbs', subscale: 'networking_behaviors', role: 'primary', alpha: 0.78, weight: 0.40 },
      { instrument: 'spcc', subscale: 'stranger', role: 'primary', alpha: 0.85, weight: 0.30 },
      { instrument: 'spcc', subscale: 'acquaintance', role: 'primary', alpha: 0.85, weight: 0.22 },
      // Supporting
      { instrument: 'caas_sf', subscale: 'curiosity', role: 'supporting', alpha: 0.74, weight: 0.08 },
    ],
    efRelevance: ['working_memory'],
    arcRelevance: ['relatedness', 'autonomy'],
  },

  relationship_building: {
    skillId: 'relationship_building',
    displayName: 'Relationship Building',
    pillar: 'p4',
    skillFamily: 'interpersonal',
    sources: [
      { instrument: 'c2a_rqm', subscale: 'relationship_quality', role: 'primary', alpha: 0.80, weight: 0.36 },
      { instrument: 'iri', subscale: 'empathic_concern', role: 'primary', alpha: 0.73, weight: 0.33 },
      { instrument: 'spcc', subscale: 'dyad', role: 'primary', alpha: 0.85, weight: 0.22 },
      // Constraint
      { instrument: 'adexi', subscale: 'inhibition', role: 'constraint', alpha: 0.88, weight: 0 },
      // Supporting
      { instrument: 'iri', subscale: 'perspective_taking', role: 'supporting', alpha: 0.78, weight: 0.09 },
    ],
    efRelevance: ['inhibition'],
    arcRelevance: ['relatedness'],
  },

  social_awareness: {
    skillId: 'social_awareness',
    displayName: 'Social Awareness',
    pillar: 'p4',
    skillFamily: 'interpersonal',
    sources: [
      { instrument: 'sfcq', subscale: 'metacognition', role: 'primary', alpha: 0.82, weight: 0.45 },
      { instrument: 'iri', subscale: 'empathic_concern', role: 'primary', alpha: 0.73, weight: 0.35 },
      // Constraint
      { instrument: 'adexi', subscale: 'inhibition', role: 'constraint', alpha: 0.88, weight: 0 },
      // Supporting
      { instrument: 'cfs', subscale: 'cognitive_flexibility', role: 'supporting', alpha: 0.77, weight: 0.12 },
      { instrument: 'iri', subscale: 'perspective_taking', role: 'supporting', alpha: 0.78, weight: 0.08 },
    ],
    efRelevance: ['inhibition', 'cognitive_flexibility'],
    arcRelevance: ['relatedness'],
  },
};

// ============================================================================
// DDx Explanatory Dimensions
// ============================================================================
//
// These are scored and categorized but NOT reported as durable skills.
// The DDx engine consumes them to determine WHY a skill is constrained.
//
// Passthrough: each dimension = one instrument subscale, no rollup needed.
// ============================================================================

export const ddxDimensions: Record<string, DdxDimension> = {

  // ── Executive Function (Lens 1) ────────────────────────────────────────

  working_memory: {
    dimensionId: 'working_memory',
    displayName: 'Working Memory',
    instrument: 'adexi',
    subscale: 'working_memory',
    ddxRole: 'ef_domain',
    direction: 'high_is_deficit',
    reflectionApplied: true, // 6 - raw before normalization
    timepoints: ['T1'],
  },

  inhibition: {
    dimensionId: 'inhibition',
    displayName: 'Inhibition',
    instrument: 'adexi',
    subscale: 'inhibition',
    ddxRole: 'ef_domain',
    direction: 'high_is_deficit',
    reflectionApplied: true,
    timepoints: ['T1'],
  },

  cognitive_flexibility: {
    dimensionId: 'cognitive_flexibility',
    displayName: 'Cognitive Flexibility',
    instrument: 'cfs',
    subscale: 'cognitive_flexibility',
    ddxRole: 'ef_domain',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T1'],
  },

  // ── Basic Psychological Needs — ARC (Lens 3) ──────────────────────────

  autonomy_satisfaction: {
    dimensionId: 'autonomy_satisfaction',
    displayName: 'Autonomy Satisfaction',
    instrument: 'bpnsfs',
    subscale: 'autonomy_satisfaction',
    ddxRole: 'arc_facet',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T1', 'T2'],
  },

  autonomy_frustration: {
    dimensionId: 'autonomy_frustration',
    displayName: 'Autonomy Frustration',
    instrument: 'bpnsfs',
    subscale: 'autonomy_frustration',
    ddxRole: 'arc_facet',
    direction: 'high_is_negative',
    reflectionApplied: true,
    timepoints: ['T1', 'T2'],
  },

  relatedness_satisfaction: {
    dimensionId: 'relatedness_satisfaction',
    displayName: 'Relatedness Satisfaction',
    instrument: 'bpnsfs',
    subscale: 'relatedness_satisfaction',
    ddxRole: 'arc_facet',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T1', 'T2'],
  },

  relatedness_frustration: {
    dimensionId: 'relatedness_frustration',
    displayName: 'Relatedness Frustration',
    instrument: 'bpnsfs',
    subscale: 'relatedness_frustration',
    ddxRole: 'arc_facet',
    direction: 'high_is_negative',
    reflectionApplied: true,
    timepoints: ['T1', 'T2'],
  },

  competence_satisfaction: {
    dimensionId: 'competence_satisfaction',
    displayName: 'Competence Satisfaction',
    instrument: 'bpnsfs',
    subscale: 'competence_satisfaction',
    ddxRole: 'arc_facet',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T1', 'T2'],
  },

  competence_frustration: {
    dimensionId: 'competence_frustration',
    displayName: 'Competence Frustration',
    instrument: 'bpnsfs',
    subscale: 'competence_frustration',
    ddxRole: 'arc_facet',
    direction: 'high_is_negative',
    reflectionApplied: true,
    timepoints: ['T1', 'T2'],
  },

  // ── Motivation Dynamics — GMS Cascade (Lens 3) ─────────────────────────

  intrinsic_motivation: {
    dimensionId: 'intrinsic_motivation',
    displayName: 'Intrinsic Motivation',
    instrument: 'gms_bookends',
    subscale: 'intrinsic_motivation',
    ddxRole: 'gms_cascade',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T1', 'T2'],
  },

  amotivation: {
    dimensionId: 'amotivation',
    displayName: 'Amotivation',
    instrument: 'gms_bookends',
    subscale: 'amotivation',
    ddxRole: 'gms_cascade',
    direction: 'high_is_negative',
    reflectionApplied: true,
    timepoints: ['T1', 'T2'],
  },

  // ── Environment (Lens 4 — T3+ only) ───────────────────────────────────

  autonomy_support: {
    dimensionId: 'autonomy_support',
    displayName: 'Autonomy Support',
    instrument: 'lcq',
    subscale: 'autonomy_support',
    ddxRole: 'environmental',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T3'],
  },

  psychological_safety: {
    dimensionId: 'psychological_safety',
    displayName: 'Psychological Safety',
    instrument: 'team_psych_safety',
    subscale: 'psychological_safety',
    ddxRole: 'environmental',
    direction: 'high_is_positive',
    reflectionApplied: false,
    timepoints: ['T3'],
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

/** Get all reported skill IDs */
export const getReportedSkillIds = (): string[] => Object.keys(reportedSkills);

/** Get skills for a specific pillar */
export const getSkillsByPillar = (pillar: Pillar): ReportedSkill[] =>
  Object.values(reportedSkills).filter(
    s => s.pillar === pillar || s.crossListedPillars?.includes(pillar)
  );

/** Get skills by family (for DDx narrative differentiation) */
export const getSkillsByFamily = (family: SkillFamily): ReportedSkill[] =>
  Object.values(reportedSkills).filter(s => s.skillFamily === family);

/** Get DDx dimensions by role */
export const getDdxDimensionsByRole = (role: DdxRole): DdxDimension[] =>
  Object.values(ddxDimensions).filter(d => d.ddxRole === role);

/** Get EF domains (for tiered model) */
export const getEfDomains = (): DdxDimension[] => getDdxDimensionsByRole('ef_domain');

/** Get ARC facets (for aggregate model) */
export const getArcFacets = (): DdxDimension[] => getDdxDimensionsByRole('arc_facet');

/** Get GMS cascade dimensions */
export const getGmsCascade = (): DdxDimension[] => getDdxDimensionsByRole('gms_cascade');

/** 
 * Get all subscale IDs that feed into a specific skill's rollup.
 * Returns only sources with weight > 0 (excludes constraint indicators).
 */
export const getActiveSourcesForSkill = (skillId: string): SubscaleSource[] => {
  const skill = reportedSkills[skillId];
  if (!skill) return [];
  return skill.sources.filter(s => s.weight > 0);
};

/**
 * Get all constraint indicators for a skill (weight = 0, used by DDx only).
 */
export const getConstraintSourcesForSkill = (skillId: string): SubscaleSource[] => {
  const skill = reportedSkills[skillId];
  if (!skill) return [];
  return skill.sources.filter(s => s.role === 'constraint');
};

/**
 * Build a reverse lookup: subscale → which skills it feeds into.
 * Useful for the scoring engine to know which skills need recalculation
 * when a subscale score changes.
 */
export const buildSubscaleToSkillMap = (): Map<string, string[]> => {
  const map = new Map<string, string[]>();
  for (const [skillId, skill] of Object.entries(reportedSkills)) {
    for (const source of skill.sources) {
      const key = `${source.instrument}.${source.subscale}`;
      const existing = map.get(key) ?? [];
      existing.push(skillId);
      map.set(key, existing);
    }
  }
  return map;
};
