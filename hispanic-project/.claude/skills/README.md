# Maketier Skills Router

## Available Skills

| Skill | Purpose | Trigger |
|-------|---------|---------|
| `maketier-design-doctrine` | UI/styling enforcement | UI work |
| `maketier-sanity-governance` | CMS patterns | Content/schema work |
| `maketier-scope-contract` | Scope enforcement | Any feature request |
| `maketier-deploy-governance` | Deployment checklist | Release work |

---

## Invocation Convention

Skills are NOT auto-loaded. Prepend prompts with skill triggers:

**UI/Design work:**
```
Apply skills: maketier-design-doctrine, maketier-scope-contract, maketier-sanity-governance
```

**Deployment work:**
```
Apply skills: maketier-deploy-governance, maketier-scope-contract
```

**Discovery:**
```
List available project skills
```

---

## Skill References

All skills reference these docs as source of truth:
- `docs/CONTRACT.md` — Scope, rules, theming contract
- `docs/BRAND_PROFILE.md` — Brand inputs, token mapping
- `docs/BRAND_STYLE.md` — Core doctrine, token definitions
