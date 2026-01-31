---
name: maketier-design-doctrine
description: Enforce Maketier design standards for UI work.
---

# Skill: maketier-design-doctrine

## When to use
Creating or modifying UI components, pages, layouts, or styling.

## Hard rules

### Token Enforcement
- **Forbidden**: Arbitrary bracket values (`bg-[#000]`, `text-[#fff]`)
- **Forbidden**: Non-token colors or fonts in components
- **Allowed**: Tailwind scale utilities + semantic tokens

### Brand Injection Rule
If branding differs from default:
1. Update `docs/BRAND_PROFILE.md`
2. Update `frontend/src/styles/brand.css`
3. Do NOT restyle components

### Output Contract
All UI work MUST:
1. Use ONLY tokens from `brand.css`
2. Follow spacing rhythm (4/8/16/24/32/48/64)
3. End with self-audit checklist
4. Mention BRAND_PROFILE if brand decisions involved

## Self-Audit Checklist
- [ ] Visual hierarchy is intentional
- [ ] Typography uses system fonts only
- [ ] Spacing follows rhythm scale
- [ ] Colors use semantic tokens only
- [ ] No arbitrary bracket values
- [ ] Hover states implemented

## References
- `docs/BRAND_STYLE.md`
- `docs/BRAND_PROFILE.md`
- `docs/CONTRACT.md` (Theming Contract)
