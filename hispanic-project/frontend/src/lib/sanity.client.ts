import { createClient, type SanityClient } from 'next-sanity'
import { draftMode } from 'next/headers'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  throw new Error('Missing Sanity environment variables')
}

const publishedClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

export async function isDraftModeEnabled(): Promise<boolean> {
  const draft = await draftMode()
  return draft.isEnabled
}

export function getClient(isDraft: boolean): SanityClient {
  if (isDraft) {
    const token = process.env.SANITY_API_READ_TOKEN

    if (!token) {
      throw new Error(
        'SANITY_API_READ_TOKEN is required for draft mode. ' +
        'Create a Viewer token at manage.sanity.io and add it to .env.local'
      )
    }

    return createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
      perspective: 'previewDrafts',
      ignoreBrowserTokenWarning: true,
    })
  }

  return publishedClient
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<{ data: T | null; isDraft: boolean }> {
  const isDraft = await isDraftModeEnabled()
  const client = getClient(isDraft)
  const data = await client.fetch<T | null>(query, params)
  return { data, isDraft }
}
