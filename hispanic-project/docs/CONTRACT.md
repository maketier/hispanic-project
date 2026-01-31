# Maketier Project Contract

## A) Core Rules (All Maketier Projects)

1. **CMS-First**: All editorial content from Sanity. No hardcoded text in components.
2. **Governance**: No feature bypasses scope without PR approval.
3. **Preview Discipline**: Drafts visible only via preview URLs.
4. **Server Components Default**: Use client components only when justified.
5. **No Template Aesthetics**: Output must look designed, not scaffolded.

---

## B) Project Overrides

| Setting | Value |
|---------|-------|
| Allowed Pages | Homepage, Ecosystem, Label Page |
| Excluded Features | Auth, Database, Payments |
| Work Branch | `testing` |
| Production Branch | `main` (PR required) |
| Rendering | SSG/ISR production, `force-dynamic` preview |
| Hosting | Vercel |

---

## C) Allowed Static UI Copy

These may be hardcoded (not CMS):
- Navigation labels (Home, About, etc.)
- CTA button labels (Learn More, Get Started)
- Copyright notice
- ARIA labels and accessibility text
- Technical error messages

---

## D) Theming Contract

### Allowed Brand Edits
- ✅ `frontend/src/brand/*` (fonts)
- ✅ `frontend/src/styles/brand.css` (colors, radii, shadows)

### Forbidden in Components
- ❌ Hex colors (e.g., `#D4AF37`, `#0a0a0a`)
- ❌ rgb/hsl color functions
- ❌ Tailwind arbitrary color values (`bg-[#...]`, `text-[#...]`)
- ❌ Inline style colors
- ❌ CSS module literal colors outside Brand Pack
- ❌ Non-token fonts

### Required in Components
- Use semantic tokens for: text, background, borders, accents
- Reference tokens via Tailwind classes or CSS variables
- Example: `text-foreground`, `bg-background`, `text-accent`

### Brand Change Process
1. **Fonts**: Edit `frontend/src/brand/fonts.ts`
2. **Colors**: Edit `frontend/src/styles/brand.css`
3. Components update automatically — NO template rewrites

### Violations
If a component needs a new styling concept:
1. Add a NEW semantic token to `brand.css`
2. Document in `BRAND_STYLE.md`
3. Never hardcode one-off values
