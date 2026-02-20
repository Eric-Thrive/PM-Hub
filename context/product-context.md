# Product Context

ThriveIEP builds AI-powered educational technology tools to help students with learning differences access accommodations and develop durable skills.

---

## Products Overview

### 1. C2A / LE3 Assessment (Critical Path)

**What it does:** Provides Executive Function + Durable Skills profiles with personalized intervention recommendations for college advising/coaching.

**Status:** In active development — March 1, 2026 MVP deadline

**Tech Stack:** Next.js, Drizzle ORM, PostgreSQL (planned)

**Key Components:**
- 144-item assessment battery (14 instruments across 4 coaching lenses)
- 12 durable skills measured across 4 LE3 Graduate Pillars
- Four-lens coaching model: Executive Function → Durable Skills → Self-Determination Dynamics → Contextual Enablers
- Three-sitting semester design (T1/T2/T3) with differentiated administration cadence
- Scoring engine with composite calculations, score carry-forward, and trajectory tracking
- Profile generation with differential diagnosis and intervention recommendations
- Advisor/Coach view for student support

**Authoritative battery reference:** `c2a/docs/four-coaching-lenses-crosswalk.md` — 14 instruments, 144 items, Feb 2026

**Repository:** TBD (will be in thriveiep monorepo)

---

### 2. Accommodation Engine (Production)

**What it does:** AI-powered accommodation reports from psychological-educational documents. Analyzes uploaded psych-ed evaluations and generates comprehensive accommodation recommendations.

**Status:** In production, maintenance mode

**Tech Stack:**
- Next.js + React frontend
- Drizzle ORM + PostgreSQL
- OpenAI for document analysis
- JSON-first architecture with structured prompts

**Key Features:**
- Document upload and OCR processing
- AI analysis of psych-ed evaluations
- Structured accommodation recommendations
- Report generation and export

**Repository:** `thriveiep` monorepo (apps/web, apps/server, packages/db)

---

### 3. PI Redactor (Production)

**What it does:** PII redaction tool for HIPAA/FERPA compliance. Identifies and redacts personally identifiable information from educational and medical documents.

**Status:** In production, stable

**Tech Stack:**
- Next.js + React frontend
- OCR integration for document processing
- Pattern matching + AI for PII detection

**Key Features:**
- Document upload
- Automatic PII detection
- Manual review and adjustment
- Redacted document export

**Repository:** `thriveiep` monorepo (shared infrastructure)

---

## Architecture Notes

**Monorepo Structure:**
```
thriveiep/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Backend API
├── packages/
│   └── db/           # Drizzle schema + migrations
└── ...
```

**Hosting:** Migrating from Railway + Replit → Aptible (compute + managed Postgres) — see THR-108

**Database:** PostgreSQL with Drizzle ORM (currently Replit, moving to Aptible managed)

**AI Integration:** OpenAI API for document analysis and generation

**Compliance:** HIPAA/FERPA compliant architecture (in progress for C2A)

---

*Migrated from Notion: February 20, 2026*
