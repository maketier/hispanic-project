# Sanity Environment Configuration

## Project Details

| Key | Value |
|-----|-------|
| **projectId** | `f2p1f7y0` |
| **dataset** | `production` |
| **apiVersion** | `2024-01-01` |

## Usage

When connecting to Sanity from the frontend, use these values:

```typescript
const config = {
  projectId: 'f2p1f7y0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false for preview mode
}
```

## Studio URL

After deployment, the studio will be available at:
- Local: `http://localhost:3333`
- Hosted: `https://hispanic.sanity.studio` (after `sanity deploy`)
