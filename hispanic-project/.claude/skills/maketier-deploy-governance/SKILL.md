---
name: maketier-deploy-governance
description: Deployment workflow checklist.
---

# Skill: maketier-deploy-governance

## When to use
Deploying, releasing, or preparing code for production.

## Hard rules
This skill provides a **CHECKLIST ONLY**. Do not invent commands.

### Pre-merge Checklist
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes (no type errors)
- [ ] `npm run build` succeeds
- [ ] `npm run governance:check` passes (if present)

### PR Workflow
- [ ] Push to `testing` branch
- [ ] Open PR: `testing` → `main`
- [ ] Await review/approval

### Post-merge Verification
- [ ] Preview URL loads correctly
- [ ] Production URL loads correctly
- [ ] No console errors
- [ ] Theme loads correctly (tokens applied)
- [ ] No missing CSS vars in console
- [ ] Preview discipline intact (drafts hidden on prod)

### Rollback
- [ ] If issues: revert PR immediately

## References
- `docs/CONTRACT.md` (Branch Strategy)
