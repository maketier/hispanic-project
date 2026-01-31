---
name: maketier-sanity-governance
description: Enforce CMS governance for Sanity integration.
---

# Skill: maketier-sanity-governance

## When to use
Working with Sanity schemas, content fetching, or PortableText.

## Hard rules

### Content Governance
1. No hardcoded editorial content in components
2. All narrative text must come from CMS
3. PortableText is a styled design surface
4. Layouts must handle variable content length

### Allowed Exceptions
Items in `CONTRACT.md` Section C:
- Navigation labels
- CTA button labels
- Copyright notice
- ARIA labels
- Error messages

### Clarification: Brand vs Content
- `BRAND_PROFILE.md` / `brand.css` = **System styling config** (NOT editorial content)
- Sanity CMS = **Editorial narrative content**
- Brand configuration is NOT subject to "no hardcoding" rule

## References
- `docs/CONTRACT.md`
