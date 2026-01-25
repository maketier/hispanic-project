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
- **Rendering**: SSG (Static Site Generation) / ISR (Incremental Static Regeneration) ONLY.
  - **Why**: Maximum SEO performance and robustness.
  - **Rule**: Do not use dynamic server rendering for page routes.
- **Excluded Features**:
  - No Authentication
  - No Database (Postgres/SQL)
  - No Payments / E-commerce

### Preview & Deployment Strategy
- **Preview**: Draft content from Sanity must ONLY be visible via Next.js Preview Mode URLs.
- **Production**: The live site must ONLY show published content.
- **Deployment**:
  - `testing` branch → Preview deployments
  - `production` branch → Production deployments (Protected, PR required)

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

---

## 4. Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npx sanity dev`: Start Sanity Studio
