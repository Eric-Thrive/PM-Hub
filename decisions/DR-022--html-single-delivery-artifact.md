# DR-022: Single HTML artifact for report delivery (email + in-app)

**Date:** 2026-02-17
**Status:** Accepted
**Product:** C2A
**Issues:** THR-133, THR-201, THR-202

## Context

THR-133 required deciding how to deliver C2A profile reports to students and coaches. Options included PDF generation, in-app interactive views, email-only delivery, or a hybrid approach. The Feb 10 kickoff specified "can be delivered via email, not necessarily in-app interactive." For a 15-student pilot, building a full in-app profile viewer was overkill.

## Decision

Generate a single self-contained HTML document that serves both delivery paths:

- **In-app:** Render the HTML as the profile view directly
- **Email:** Embed as email body or attach as standalone HTML file
- **Print fallback:** CSS `@media print` styles enable PDF-from-browser if needed

The HTML is self-contained: inline CSS, no external dependencies, no JavaScript requirements for core content. Two variants: student view and coach view.

Student view follows the dashboard mock (https://eric-thrive.github.io/C2A-battery-211/) as design spec:
- Four Coaching Lenses layout
- Score visualizations with color-coded category badges
- DDx-driven "What's happening" summaries
- Mobile-responsive, accessible

Coach view extends student view with:
- Clinical flags and severity indicators
- DDx pattern match details with confidence
- Cross-lens diagnostic table
- Normalization metadata and raw subscale scores

## Alternatives Considered

- **PDF generation (wkhtmltopdf / Puppeteer)** — Rejected. Adds infrastructure dependency, harder to update, not interactive. HTML covers email delivery without a PDF library.
- **Separate in-app viewer + email template** — Rejected. Two template systems to maintain for 15 students. Single HTML handles both.
- **JSON API + client-side rendering** — Rejected for M3. Would require building a frontend profile component. Appropriate for post-pilot when interactive features (action plan, intervention selection) are needed.

## Consequences

- THR-201 (HTML renderer) is the single rendering path: `ProfileResult → HTML string`
- No PDF generation dependency in the stack at M3
- Email delivery (THR-202) simply embeds the HTML — no separate email template
- Post-pilot, the HTML can be progressively enhanced with JavaScript for interactivity
- Mobile responsiveness is required since pilot students will likely view on phones

## Related Decisions

- Builds on: DR-021 (report philosophy)
- Constrains: THR-202 (profile API routes serve HTML directly)

## Related Artifacts

- Dashboard mock: https://eric-thrive.github.io/C2A-battery-211/
- THR-201 issue (HTML report renderer)

## Source

Feb 17 conversation about profile generation sub-issues. Eric suggested HTML report; confirmed as architecture decision.
