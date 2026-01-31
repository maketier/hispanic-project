# Maketier Brand Style System

---

## A) Maketier Core Style Doctrine (Stable Across Projects)

### Layout & Spacing
- Base unit: `4px`
- Scale: `8, 16, 24, 32, 48, 64, 96`
- Generous vertical rhythm required
- No cramped layouts

### Motion Principles
- Subtle, purposeful, minimal
- Prefer CSS transitions over libraries
- No animation without purpose
- Hover/focus states: smooth, intentional

### "No Template Aesthetics" Criteria
1. No raw/unstyled HTML elements
2. Typography choices are deliberate
3. Spacing follows the system
4. Components look designed by default
5. No "starter template" or scaffold look

### Forbidden Patterns
- Arbitrary bracket values (`w-[123px]`, `text-[#ff0000]`)
- Non-token fonts or colors in components
- Flat, evenly-distributed layouts
- Default browser typography

### Self-Audit Checklist (Mandatory Before UI Output)
- [ ] Visual hierarchy is intentional
- [ ] Typography uses ONLY system fonts
- [ ] Spacing follows rhythm scale
- [ ] Colors use ONLY semantic tokens
- [ ] Components look designed by default
- [ ] Hover states are implemented

---

## B) Semantic Token Definitions (Stable Names)

### Font Tokens
| Token | Meaning | Source |
|-------|---------|--------|
| `--font-body` | Body/UI text | `frontend/src/brand/fonts.ts` (next/font) |
| `--font-display` | Headings/display | `frontend/src/brand/fonts.ts` (next/font) |

### Color Tokens
| Token | Meaning | Usage |
|-------|---------|-------|
| `--bg-primary` | Page background | `<body>`, main sections |
| `--bg-elevated` | Elevated surface | Cards, modals |
| `--fg-primary` | Primary text | Headings, body |
| `--fg-muted` | Secondary text | Captions, hints |
| `--accent` | Primary interactive | CTAs, links, focus rings |
| `--accent-foreground` | Text on accent | Button labels |
| `--border` | Border color | Dividers, inputs |
| `--radius-card` | Card rounding | Container corners |
| `--shadow-elevated` | Elevation shadow | Cards, dropdowns |

**IMPORTANT**: Token NAMES must not change across clients. Only VALUES change.

---

## C) Required Token Set

These tokens MUST exist in `brand.css` (used by `globals.css` mappings):

```
--bg-primary
--bg-elevated
--fg-primary
--fg-muted
--accent
--accent-hover
--accent-foreground
--border
--input
--ring
--secondary
--secondary-foreground
--muted
--muted-foreground
```

> **Rule**: If a new visual concept is needed, introduce a new semantic token and document it here; do not hardcode it in components.

---

## D) Default Theme Values (Placeholder)

> **Note**: This is the default placeholder theme. Override via `brand/fonts.ts` + `brand.css`.

| Token | Default Value | Notes |
|-------|---------------|-------|
| `--bg-primary` | `#0a0a0a` | Rich black |
| `--bg-elevated` | `#121212` | Card surfaces |
| `--fg-primary` | `#ededed` | Off-white |
| `--fg-muted` | `#a1a1aa` | Zinc 400 |
| `--accent` | `#D4AF37` | Metallic gold |
| `--accent-foreground` | `#000000` | Black on gold |
| `--border` | `#27272a` | Zinc 800 |

### Typography Defaults
| Role | Font | Token |
|------|------|-------|
| Display | Playfair Display | `--font-display` |
| Body | Inter | `--font-body` |

---

## E) Do / Don't

| ✅ Do | ❌ Don't |
|-------|---------|
| Use tokens from `brand.css` | Use arbitrary values |
| Reference `--accent` for CTAs | Use `#D4AF37` directly in components |
| Use `--fg-primary` for text | Use `text-white` or `text-gray-100` |
| Change fonts via `brand/fonts.ts` | Import fonts directly in components |
| Add new tokens if needed (documented) | Hardcode one-off styling |
