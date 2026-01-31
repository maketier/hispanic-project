---
name: maketier-scope-contract
description: Enforce project scope before implementing features.
---

# Skill: maketier-scope-contract

## When to use
Before implementing any feature or change.

## Hard rules

### Scope Validation
1. Read `docs/CONTRACT.md` first
2. Check request against Section B (Project Overrides)
3. If request violates contract → **STOP and ask**
4. Never bypass scope silently

### Contract Changes
To change contract:
1. Update `docs/CONTRACT.md` via PR
2. Get approval before implementation

### Brand Changes
Brand changes are in-scope ONLY if they:
- Modify `docs/BRAND_PROFILE.md`
- Modify `frontend/src/styles/brand.css`

Template rewrites are **OUT OF SCOPE** unless contract updated.

## Violations to Flag
- Adding pages beyond allowed list
- Adding excluded features (auth, DB, payments)
- Bypassing branch workflow
- Hardcoding editorial content

## References
- `docs/CONTRACT.md`
