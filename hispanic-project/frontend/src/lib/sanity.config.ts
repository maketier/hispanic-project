const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    'Missing Sanity environment variables. ' +
    'Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and NEXT_PUBLIC_SANITY_API_VERSION are set in .env.local'
  )
}

export const sanityConfig = { projectId, dataset, apiVersion } as const
