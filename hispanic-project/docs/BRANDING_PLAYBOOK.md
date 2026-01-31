# Maketier Branding Playbook

> **Audience**: Developers and Claude/Antigravity agents performing branding work  
> **Purpose**: Prevent template rewrites during rebrands

---

## 1. Purpose

The Brand Pack exists to **decouple visual identity from component logic**. Without it, rebranding requires editing every component and page file. With it, rebrands touch only two files.

**Result**: Client branding can change without risk of breaking layouts, logic, or governance.

---

## 2. Before vs After

| Before | After |
|--------|-------|
| Colors hardcoded in 30+ files | Colors in one file (`brand.css`) |
| Fonts imported per-component | Fonts loaded once (`fonts.ts`) |
| Rebrand = rewrite templates | Rebrand = edit 2 files |
| Governance violation risk | Governance enforced by script |

---

## 3. Brand Pack Boundary

**Only these files may change for rebrands:**

| File | Owns |
|------|------|
| `frontend/src/brand/fonts.ts` | Font loading (`--font-body`, `--font-display`) |
| `frontend/src/styles/brand.css` | Colors, radii, shadows |

**Everything else is off-limits for branding changes.**

---

## 4. Semantic Token Model

| Principle | Example |
|-----------|---------|
| Token **names** are stable | `--accent`, `--fg-primary` never change |
| Token **values** change per client | `#D4AF37` → `#3B82F6` |
| Components use **semantic meaning** | `text-accent`, not `text-[#D4AF37]` |

See: [docs/BRAND_STYLE.md](file:///docs/BRAND_STYLE.md) for full token list.

---

## 5. Rebrand Workflow

1. **Update fonts** (if changing typefaces)
   - Edit `frontend/src/brand/fonts.ts`
   - Swap `Inter`/`Playfair_Display` imports to new fonts
   - Keep token names: `--font-body`, `--font-display`

2. **Update colors/radii/shadows**
   - Edit `frontend/src/styles/brand.css`
   - Change token values (not names)

3. **Validate**
   ```bash
   cd frontend
   npm run governance:check
   npm run build
   ```

4. **Visual verification**
   - Check `/`, `/ecosystem`, `/hispanick`
   - Confirm fonts + colors applied
   - No console errors

---

## 6. Claude/Antigravity Rules

When performing branding tasks:

| ✅ Do | ❌ Don't |
|-------|---------|
| Edit `brand/fonts.ts` for fonts | Edit components for fonts |
| Edit `brand.css` for colors | Use `bg-[#...]` in components |
| Add new semantic token if needed | Hardcode one-off values |
| Document new tokens in BRAND_STYLE.md | Skip documentation |
| Run governance:check before commit | Assume changes are safe |

**If a new visual concept is needed:**
1. Add a new semantic token to `brand.css`
2. Document it in [docs/BRAND_STYLE.md](file:///docs/BRAND_STYLE.md)
3. Map it in `globals.css` only if Tailwind utilities are needed
4. Reference it by token name in components

> **Token sprawl prevention**: New tokens must be approved by updating BRAND_STYLE.md first. Do not add arbitrary tokens without documentation.

---

## 6.5 Skills Enforcement (Required for Agent Work)

When using Claude/Antigravity for branding or styling, you **MUST** invoke the Maketier skills so the agent enforces the Brand Pack boundary and contract rules.

### Required skills for branding changes

| Skill | Guarantees |
|-------|------------|
| **maketier-design-doctrine** | Enforces semantic tokens, prevents template aesthetics, requires self-audit |
| **maketier-scope-contract** | Blocks changes that violate the contract (e.g., editing components for branding) |
| **maketier-deploy-governance** | Provides validation checklist before merging/releasing (includes governance check) |

> If branding touches CMS-rendered typography or PortableText styling, also apply **maketier-sanity-governance**.

### Invocation examples

**Rebrand (fonts/colors/radii/shadows):**
```
Apply skills: maketier-design-doctrine, maketier-scope-contract, maketier-deploy-governance
Task: Update Brand Pack ONLY (frontend/src/brand/fonts.ts and frontend/src/styles/brand.css). Do not edit components/pages.
```

**PortableText styling adjustments (if needed):**
```
Apply skills: maketier-design-doctrine, maketier-sanity-governance, maketier-scope-contract
```

---

## 7. Common Failure Modes

| Failure | How It Happens | Prevention |
|---------|----------------|------------|
| Hex in component | `className="text-[#D4AF37]"` | Use `text-accent` |
| Inline style color | `style={{ color: '#fff' }}` | Use CSS vars |
| Font import in page | `import { Roboto } from 'next/font'` | Import from `@/brand/fonts` |
| CSS module literal | `.card { background: #121212; }` | Use `var(--bg-elevated)` |
| Bypass governance | Skip `npm run governance:check` | Always run before commit |

---

## 8. Phase 3 Implications

| What | Status |
|------|--------|
| Content expansion (more CMS fields) | Safe — uses same tokens |
| New pages | Safe — consume existing tokens |
| Client rebrand | Safe — edit Brand Pack only |
| Component refactors | Safe — semantic tokens isolate branding |

**The Brand Pack boundary remains stable across phases.**

---

## References

- [docs/CONTRACT.md](file:///docs/CONTRACT.md) — Theming Contract (Section D)
- [docs/BRAND_STYLE.md](file:///docs/BRAND_STYLE.md) — Semantic token definitions
- [docs/BRAND_PROFILE.md](file:///docs/BRAND_PROFILE.md) — Brand inputs for current client
