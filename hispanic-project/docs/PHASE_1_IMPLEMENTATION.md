# Phase 1 Implementation Record

**Status**: ✅ Complete  
**Duration**: Steps 1–12 (incl. 1.5)  
**Commit Range**: Initial → Phase 1.5 Exit

---

## Purpose

Deliver a governed, CMS-driven marketing website that validates:
- Preview-before-publish discipline
- Content ownership separation
- Approval workflows
- Technical foundation that does not block Phase 2

> **Phase 1 is about execution discipline, not features.**

---

## Non-Negotiable Constraints (Contract)

| Constraint | Status |
|------------|--------|
| Exactly 3 pages | ✅ Enforced |
| No authentication | ✅ None |
| No database (Postgres/SQL) | ✅ None |
| No payments/e-commerce | ✅ None |
| All content from CMS | ✅ Sanity singletons |
| Draft content never visible in production | ✅ Preview mode only |
| PR required for production branch | ✅ Branch protection |

---

## Final Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (frontend/)                      │   │
│  │  - SSG/ISR for production                            │   │
│  │  - force-dynamic for preview mode                    │   │
│  │  - Server Components by default                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Sanity CMS                              │
│  - Dataset: production                                      │
│  - 3 singleton documents (canonical _id)                    │
│  - Preview: token-gated, previewDrafts perspective          │
│  - Studio: https://hispanic.sanity.studio                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://hispanic-project.vercel.app |
| **Studio** | https://hispanic.sanity.studio |
| **Preview Mode** | `/api/draft/enable?secret=<token>&slug=/` |

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Singleton `_id` enforcement | Guarantees exactly one document per page; prevents duplicates |
| GROQ queries by `_id` not `_type` | Frontend immune to duplicate documents |
| `force-dynamic` in preview | Ensures drafts never cached |
| Viewer token (not Editor) | Minimum privilege for preview reads |
| Static nav/footer exception | Avoids schema bloat for structural UI |

---

## Repository Structure (Phase 1)

```
hispanic-project/
├── frontend/                 # Next.js App Router
│   ├── src/app/
│   │   ├── page.tsx          # Homepage (_id: homepage)
│   │   ├── ecosystem/page.tsx
│   │   ├── hispanick/page.tsx
│   │   └── api/draft/        # Preview mode endpoints
│   └── src/lib/
│       ├── sanity.client.ts  # Centralized fetch logic
│       ├── sanity.queries.ts # GROQ queries by _id
│       └── sanity.types.ts   # Type definitions
├── studio/                   # Sanity Studio
│   ├── schemaTypes/          # 3 singleton schemas
│   ├── deskStructure.ts      # Fixed desk entries
│   └── sanity.config.ts      # Singleton governance
├── docs/
│   ├── CLAUDE.md             # AI agent constraints
│   ├── SINGLETON_GOVERNANCE.md
│   ├── pipeline-ledger.jsonl # Append-only execution log
│   └── roadmap.md            # Original plan
└── vercel.json               # Deploy config
```

---

## Verification Steps

### Preview Mode Works
```bash
# Enable preview
curl "https://hispanic-project.vercel.app/api/draft/enable?secret=<SECRET>&slug=/"
# → Redirects to / with preview cookie

# Verify banner appears and draft content visible
# Disable preview
curl "https://hispanic-project.vercel.app/api/draft/disable"
```

### Singleton Governance
1. Studio "Create new" menu does NOT show singleton types
2. Singleton documents do NOT have Duplicate/Delete buttons
3. `*[_type == "homepage"]` returns exactly 1 document with `_id: "homepage"`

### Production Shows Published Only
1. Make draft edit in Studio (don't publish)
2. Refresh production URL → Draft NOT visible
3. Publish in Studio → Content appears

---

## Known Issues / Follow-ups

| Issue | Status |
|-------|--------|
| `previewDrafts` → `drafts` deprecation | Noted for future cleanup |
| Sanity Studio update available (3.99 → 5.7) | Non-blocking |

---

## Related Documents

- [roadmap.md](./roadmap.md) — Original implementation plan
- [CLAUDE.md](./CLAUDE.md) — AI agent constraints
- [SINGLETON_GOVERNANCE.md](./SINGLETON_GOVERNANCE.md) — Singleton enforcement layers
- [pipeline-ledger.jsonl](./pipeline-ledger.jsonl) — Append-only execution log
