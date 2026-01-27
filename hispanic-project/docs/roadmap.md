# PHASE ONE IMPLEMENTATION PLAN & TOOLING RATIONALE

## 1. PHASE ONE IMPLEMENTATION PLAN — SUMMARY

### Objective (Phase One)
Deliver a governed, CMS-driven marketing website that validates:

- Approval workflows
- Content ownership
- Preview-before-publish discipline
- A technical foundation that does not block Phase Two

Phase One is explicitly NOT about features, speed, or automation.
It is about execution discipline.

---

### High-Level Build Steps

#### Step 1 — Code & Governance Baseline
- Create a GitHub repository with two branches:
  - testing (work in progress)
  - production (live site)
- Protect the production branch:
  - Pull requests required
  - Review required
  - No direct pushes

This mirrors the Phase One rule:
“No content is published without explicit leadership approval.”

#### Step 2 — Frontend Foundation
- Build the website using Next.js (React-based framework)
- Use static rendering only (SSG / ISR)
- Create exactly three pages:
  - Headroom Systems — Homepage
  - Headroom Systems — Ecosystem / About
  - Hispanic.k — Label page

The frontend owns:
- Layout
- Styling
- Routing
- SEO structure

The frontend does NOT own content.

#### Step 3 — Content Governance Layer
- Set up Sanity as the headless CMS
- Define structured schemas for:
  - Homepage
  - Ecosystem / About page
  - Hispanic.k label page
- Enforce CMS roles:
  - Editors: create and edit drafts
  - Leadership: publish content

All text, narratives, and SEO copy live in Sanity — not in code.

#### Step 4 — Preview & Approval Workflow
- Implement preview mode in Next.js
- Draft content is visible only via preview URLs
- Production site shows published content only
- Publishing is a CMS action, not a code deploy

This is the core success condition of Phase One.

#### Step 5 — Hosting & Deployment
- Connect the repository to Vercel
- Enable:
  - Preview deployments (for testing and approval)
  - Production deployment from the production branch only

Developers push code; Vercel handles infrastructure.

#### Step 6 — Phase One Exit Review
- Validate:
  - Approval workflow ran end-to-end
  - No rules were bypassed
  - Scope was respected
- Leadership explicitly decides:
  - Proceed to Phase Two
  - Adjust scope
  - Pause execution

No automatic continuation.

================================================

## 2. WHY THESE TOOLS WERE CHOSEN (PHASE ONE + PHASE TWO)

This section explains WHY each tool exists in the stack and how it supports both phases.

---

### Next.js
**Phase One:**
- SEO-friendly static rendering
- Simple routing and page structure
- No backend complexity
- Predictable and reliable

**Phase Two:**
- Supports server-side rendering
- Supports authentication
- Supports dashboards and user-specific views
- No rewrite required

Next.js allows Phase One to stay simple without blocking Phase Two.

---

### React (inside Next.js)
- Component-based UI
- Widely adopted ecosystem
- Easy to extend later

React is not the architectural decision — Next.js is.

---

### Tailwind CSS
**Phase One:**
- Fast, consistent styling
- Encourages constraint
- No over-engineered design system

**Phase Two:**
- Scales cleanly with component libraries
- Easy to standardize and refactor

Tailwind optimizes execution speed without architectural debt.

---

### Sanity (Headless CMS)
**Phase One:**
- Draft vs published content
- Role-based access
- Preview-before-publish workflows
- Clear content ownership

Directly enforces:
“No content is published without explicit leadership approval.”

**Phase Two:**
- Content expands into education, labels, programs
- Schemas evolve without breaking frontend
- CMS remains single source of truth

Sanity separates content authority from technical execution.

---

### GitHub
**Phase One:**
- Enforces review before release
- Tracks changes and accountability
- Prevents silent production edits

**Phase Two:**
- Supports CI/CD
- Supports larger teams
- Supports automation

GitHub is the governance backbone for code.

---

### Vercel
**Phase One:**
- Zero-ops hosting
- Automatic preview URLs
- Clear separation of preview vs production

**Phase Two:**
- Scales with traffic
- Supports SSR and API routes
- Handles complex deployments

Vercel removes infrastructure as a variable.

---

### Antigravity + AI Assistance
**Phase One:**
- Accelerates file creation
- Reduces setup friction
- Keeps developers focused on structure, not syntax

**Phase Two:**
- Continues to accelerate development
- Does not own architecture or decisions

AI assists execution; it does not drive architecture.

================================================

## STRATEGIC ALIGNMENT SUMMARY

- Governed publishing → Sanity
- Preview before publish → Sanity + Next.js
- SEO-friendly pages → Next.js
- No scope creep → Explicit schemas + branch protection
- Phase Two readiness → Next.js + modular CMS
- Low operational risk → Vercel

---

## FINAL FRAMING
> “Phase One uses conservative, proven tools not to move fast — but to move correctly.
> If Phase One succeeds, Phase Two is unblocked.
> If Phase One fails, it will fail due to governance — not technology.”
