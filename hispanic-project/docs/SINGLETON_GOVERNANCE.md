# Singleton Governance — Canonical Reference

This document describes the singleton governance implementation for the Hispanic Project CMS.

---

## Invariants (Guaranteed Behaviors)

| Invariant | Enforcement Layer |
|-----------|------------------|
| Exactly ONE document per singleton type | Canonical `_id` + desk structure |
| Frontend always fetches correct document | GROQ queries by `_id`, not `_type` |
| Studio cannot create duplicate singletons | `schema.templates` filter removes from "Create new" |
| Studio cannot duplicate existing singletons | `document.actions` filter removes "duplicate" action |
| Config changes require Studio redeploy | `npm run build && npx sanity deploy` |

---

## Singleton Types

```typescript
const singletonTypes = new Set(['homepage', 'ecosystemPage', 'hispanickLabelPage'])
```

---

## Layer 1: Frontend Queries (Fetch by `_id`)

**File:** `frontend/src/lib/sanity.queries.ts`

```groq
// CORRECT: Fetches THE specific document by canonical ID
*[_id == "homepage"][0]{...}

// WRONG: Fetches "first" of type — vulnerable to duplicates
*[_type == "homepage"][0]{...}
```

Fetching by `_id` guarantees the correct document is returned even if duplicates somehow exist in the dataset.

---

## Layer 2: Desk Structure (UI Routing Only)

**File:** `studio/deskStructure.ts`

```typescript
S.listItem()
  .title('Homepage')
  .id('homepage')
  .child(S.document().schemaType('homepage').documentId('homepage'))
```

**What this does:**
- Shows fixed entries in the Studio sidebar
- Each entry opens a document with a specific `documentId`

**What this does NOT do:**
- Does NOT prevent creation of new documents
- Does NOT prevent duplication
- Does NOT prevent documents with different IDs from existing

Desk structure is **UI routing only**. It controls what users see, not what they can do.

---

## Layer 3: Block Creation Paths

**File:** `studio/sanity.config.ts`

```typescript
schema: {
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
}
```

**What this does:**
- Removes singleton types from "Create new document" menu
- Users cannot initiate new document creation for these types

**Why this is needed:**
- Desk structure alone does not block the "+" button
- Templates control what appears in the creation menu

---

## Layer 4: Block Duplicate/Delete Actions

**File:** `studio/sanity.config.ts`

```typescript
document: {
  actions: (input, context) => {
    if (singletonTypes.has(context.schemaType)) {
      return input.filter((action) => {
        const actionId = action.action
        return actionId !== 'duplicate' && actionId !== 'delete'
      })
    }
    return input
  },
}
```

**What this does:**
- Removes "Duplicate" button from singleton documents
- Removes "Delete" button from singleton documents

**Technical note:**
- Uses `action.action` property (stable in Sanity v3)
- Each action object has an `action` property containing the action identifier string

---

## Canonical Dataset State

After proper initialization, the dataset contains exactly:

| _id | _type | Content |
|-----|-------|---------|
| `homepage` | homepage | Headroom Systems |
| `ecosystemPage` | ecosystemPage | Ecosystem |
| `hispanickLabelPage` | hispanickLabelPage | Hispanic.k |

No UUID-based documents. No duplicates. No orphaned drafts.

---

## Deployment Requirements

Any change to `sanity.config.ts` or `deskStructure.ts` requires:

```bash
cd studio
npm run build
npx sanity deploy
```

The deployed Studio at `https://hispanic.sanity.studio` will NOT reflect config changes until redeployed.

---

## Edge Cases Addressed

| Edge Case | Protection |
|-----------|------------|
| User clicks "+" button | Templates filter blocks singleton types |
| User clicks "Duplicate" | Actions filter removes button |
| User somehow creates UUID doc | Frontend ignores it (queries by `_id`) |
| Existing UUID docs from before | Must be migrated to canonical IDs |

---

## Verification Checklist

- [ ] `*[_type == "homepage"]` returns exactly 1 document with `_id: "homepage"`
- [ ] Studio "Create new" does not show Homepage/Ecosystem/Hispanic.k
- [ ] Studio document actions do not show "Duplicate" or "Delete" for singletons
- [ ] Production site displays content from canonical `_id` documents
