# Maketier Brand Profile

> **Purpose**: Defines brand inputs and semantic token mappings.

---

## Brand Pack Boundary

Brand changes occur only inside:
- `frontend/src/brand/*` (fonts)
- `frontend/src/styles/brand.css` (colors, radii, shadows)

Components/pages must NOT change for rebranding.

---

## A) Required Brand Inputs

| Input | Current Value | Notes |
|-------|---------------|-------|
| Display Font | Playfair Display | Fallback: serif |
| Body Font | Inter | Fallback: sans-serif |
| Primary Accent | `#D4AF37` (Metallic Gold) | CTAs, links, rings |
| Background Mode | Dark | `#0a0a0a` base |
| Radius Preference | Soft | `0.5rem` default |
| Shadow Vibe | Subtle | Minimal elevation |
| Imagery Guidance | Premium, dark, minimal | *(optional)* |

---

## B) Token Mapping Table

| Brand Input | Maps To | Generated Value |
|-------------|---------|-----------------|
| Background Mode: Dark | `--bg-primary` | `#0a0a0a` |
| Background Mode: Dark | `--bg-elevated` | `#121212` |
| Background Mode: Dark | `--fg-primary` | `#ededed` |
| Background Mode: Dark | `--fg-muted` | `#a1a1aa` |
| Primary Accent | `--accent` | `#D4AF37` |
| Primary Accent | `--accent-foreground` | `#000000` |
| Radius Preference: Soft | `--radius-card` | `0.5rem` |
| Shadow Vibe: Subtle | `--shadow-elevated` | `0 4px 6px -1px rgb(0 0 0 / 0.3)` |

---

## C) Rules

1. Components NEVER hardcode literal colors or fonts
2. To add a new styling concept: add a NEW semantic token (update this doc + brand.css)
3. Allowed exceptions: items in `CONTRACT.md` Section C (nav labels, ARIA text)

---

## D) How to Apply a New Brand

1. **Fonts**: Edit `frontend/src/brand/fonts.ts` (swap font imports/config)
2. **Colors/Radius/Shadow**: Edit `frontend/src/styles/brand.css`
3. **Components/pages**: Unchanged
