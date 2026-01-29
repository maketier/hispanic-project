# CLAUDE.md

This file serves as the **authoritative source of truth** for AI agents (and humans) working on Phase 1 of the Hispanik Project. It defines the constraints, technology stack, and design standards that must be respected.

---

## 1. Core Stack & Architecture

### Technology Stack
- **Framework**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity (Headless CMS)

### Phase 1 Strict Constraints
> [!IMPORTANT]
> Phase 1 is about execution discipline, not features.

- **Pages**: Exactly 3 pages only.
  1. **Homepage** (Headroom Systems)
  2. **Ecosystem / About** (Headroom Systems)
  3. **Label Page** (Hispanic.k)
- **Rendering**: SSG / ISR for production; `force-dynamic` for preview freshness.
  - **Why**: Maximum SEO performance while ensuring drafts are never cached.
  - **Rule**: Preview mode pages use `export const dynamic = 'force-dynamic'`.
- **Excluded Features**:
  - No Authentication
  - No Database (Postgres/SQL)
  - No Payments / E-commerce

### Preview & Deployment Strategy
- **Preview**: Draft content from Sanity must ONLY be visible via Next.js Preview Mode URLs.
- **Production**: The live site must ONLY show published content.
- **Deployment**:
  - `testing` branch → Preview deployments
  - `main` branch → Production deployments (Protected, PR required)

---

## 2. External Agent Knowledge Bases

When performing tasks, the agent should utilize these external resources for enhanced capabilities and design excellence.

### GitHub Integration
- **Resource**: [GitHub MCP Server](https://github.com/github/github-mcp-server)
- **Usage**: Connects AI tools directly to GitHub to read repos, manage issues/PRs, and analyze code.

### Frontend Design Excellence
- **Resource**: [Claude Code Frontend Design Skill](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design)
- **Resource**: [Anthropics Frontend Design Skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
- **Resource**: [NextLevelBuilder UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.opencode/skills/ui-ux-pro-max)
- **Usage**: Use these skills to generate production-ready code with:
  - **Aesthetics**: Bold choices, distinctive typography, high-impact visuals.
  - **Interactivity**: Smooth, context-aware animations and micro-interactions.
  - **Quality**: Production-grade implementation logic.

---

## 3. Development Guidelines

### Frontend (Next.js)
- **Routing**: Use the App Router (`app/` directory).
- **Components**:
  - Prioritize Server Components where possible (default in App Router).
  - Use Client Components (`"use client"`) only when interactivity is required.
- **Styling**:
  - Use pure Tailwind CSS utility classes.
  - Define theme configuration in `tailwind.config.ts`.
  - Avoid arbitrary values (e.g., `w-[123px]`); use tokens.

### Content (Sanity)
- **Schema**: Define strict schemas for the 3 distinct pages.
- **Separation**: React components should strictly handle **layout and display**. Sanity handles **all text and content**.
- **Hardcoding**: **Strictly Forbidden** for marketing copy. All text must come from the CMS.

### Workflow Rules
1. **Never break Phase 1 scope**: If a requested feature is not one of the 3 pages or relies on Auth/DB, **stop and ask**.
2. **Design First**: Before implementing, consult the design skills/knowledge bases to ensure the visual output is "Wow" quality.
3. **Verify Preview**: Ensure changes work in both standard view (published) and preview mode (drafts).
4. **Next.js 15 Async Patterns**:
   - `draftMode()` is async in Next.js 15.
   - **Rule**: Use `await draftMode()` in async server functions (e.g., `sanityFetch`).
   - **Rule**: Pages should NOT call `draftMode()` directly. Use centralized helpers like `sanityFetch()` which returns `{ data, isDraft }`.
   - **Rule**: Pages using preview mode must export `export const dynamic = 'force-dynamic'` to guarantee freshness.
   - **Rule**: Draft API routes must use `export const runtime = 'nodejs'`.

---

## 4. Commands

### Frontend (`frontend/`)
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server

### Studio (`studio/`)
- `npx sanity dev`: Start Sanity Studio locally
- `npx sanity deploy`: Deploy Studio to Sanity hosting

---

## 5. Frontend Design Doctrine (MANDATORY)

This project follows a **design-led frontend doctrine** inspired by:
- Claude Code Frontend Design Skill
- Anthropic Frontend Design Skill
- NextLevelBuilder UI/UX Pro Max

This doctrine is **not aspirational**. It defines how UI code must be written, reviewed, and evaluated.

Failure to follow this doctrine means the output is incomplete, even if it compiles.

---

### 1. Visual Hierarchy Is Primary
- Every screen and section must clearly express:
  - a primary focus
  - secondary supporting elements
  - tertiary detail
- Avoid flat layouts where all elements compete equally.
- If hierarchy is unclear, make a strong, opinionated decision rather than deferring.

---

### 2. Typography Is a Core Design Tool
- Typography is not decoration; it establishes structure and tone.
- Heading and body fonts must be used intentionally:
  - Serif (Playfair Display) → emphasis, authority, premium feel
  - Sans (Inter) → readability, clarity, UI text
- Font size, weight, and spacing must feel deliberate.
- Default browser typography is unacceptable.

---

### 3. Spacing Defines Quality
- Generous, consistent vertical rhythm is required.
- Avoid cramped layouts or arbitrary spacing.
- Padding and margins must follow a system, not intuition.
- If spacing feels “default” or “accidental,” it is wrong.

---

### 4. Components Must Look Designed by Default
- No raw or unstyled HTML elements are allowed.
- Every component (buttons, sections, containers) must look intentional even without content.
- “Starter template” or “Tailwind demo” aesthetics are a failure state.

---

### 5. Interactivity Is Subtle and Purposeful
- Prefer micro-interactions over flashy animations.
- Hover, focus, and active states must be smooth and intentional.
- No animation should exist without purpose.
- CSS/Tailwind transitions are preferred; animation libraries require justification.

---

### 6. CMS Content Is Dynamic and Unpredictable
- Design must gracefully handle:
  - short content
  - long content
  - uneven or imperfect copy
- Layouts must not rely on “perfect” text length.
- PortableText is a first-class design surface and must be styled accordingly.

---

### 7. Governance and Architecture Are Part of Design
- All components default to **Server Components**.
- `"use client"` is allowed only for narrowly scoped interactivity and must be justified inline.
- No CMS tokens or CMS access in client-side code.
- No hardcoded editorial or narrative content in components.
- Any exception (e.g. static navigation, CTA labels) must be explicitly documented.

---

### 8. Production-Grade Output Only
- No placeholder styling.
- No demo shortcuts.
- No “we’ll polish later” assumptions.
- Code must be realistic, maintainable, and scalable.

---

### Required Self-Audit (Before Output)
Before returning UI code, explicitly confirm:
- Visual hierarchy is intentional
- Typography choices are deliberate
- Spacing follows a clear rhythm
- Components look designed by default
- Server/client boundaries are respected
- CMS-driven content is handled safely

If any of the above cannot be met, explain why before outputting code.

