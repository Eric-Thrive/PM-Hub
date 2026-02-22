# DR-010: Split GPU workloads to Modal, persist data on Aptible

**Date:** 2026-01-31
**Status:** Accepted
**Product:** General
**Issues:** THR-52, THR-113

## Context

C2A needs GPU compute for document processing (PaddleOCR VLM for IEP/report card OCR). VLMs run painfully slowly on CPU (30-120+ sec/page) but require only burst capacity at pilot scale (100-500 docs/month). Hosting GPU infrastructure on a single HIPAA-compliant provider would cost $500-1500/month — prohibitive for a pilot.

## Decision

Split the architecture: Aptible hosts the application, database, and all persistent student data. Modal provides serverless GPU inference for document processing on a per-second billing model. Data touches Modal only transiently (in memory, during processing) and is never written to Modal's storage. Results return to Aptible for persistence.

Architecture:
```
Aptible (app + data)  ──POST──▶  Modal (stateless GPU)
                      ◀──JSON──  (PaddleOCR VLM, ~$0.50/hr)
```

## Alternatives Considered

- **Atlantic.Net (single HIPAA GPU provider)** — Rejected because always-on GPU costs $800-1500/month at pilot scale; simpler vendor relationship but 10-30x more expensive than Modal for burst workloads
- **RunPod** — Rejected because HIPAA BAA was still "in progress" at evaluation time; Modal had a signed BAA available
- **CPU-only on Aptible** — Rejected because VLMs are impractically slow on CPU (30-120+ sec/page); traditional OCR (2-5 sec) would work but lacks the document understanding capabilities of VLMs
- **AWS/GCP self-managed** — Rejected because team is too small to configure VPCs, BAAs, and compliance controls manually

## Consequences

Total hosting cost drops to ~$10-50/month at pilot scale (Aptible free tier + Modal per-second billing), versus $500-1500/month for a single GPU provider. Audit surface for student data storage is limited to Aptible only — Modal is stateless. Can consolidate to single provider later if GPU usage becomes constant (24/7 processing) or managing two vendors becomes burdensome.

## Related Decisions

- Builds on: DR-007 (Aptible migration)
- Constrains: Document processing services must use Modal's serverless GPU, not local compute

## Related Artifacts

- THR-113 (Explore Aptible + Modal architecture)

## Source

Conversation on 2026-01-31: [GPU vs HIPAA-compliant PaaS trade-offs](https://claude.ai/chat/5737e103-dff0-4035-a4ae-1b6352aa6e06). Eric evaluated single-provider vs split architecture, concluded split was simpler and dramatically cheaper. Decision was reinforced when Eric realized C2A only needs FERPA (not HIPAA), making Aptible free tier viable.
