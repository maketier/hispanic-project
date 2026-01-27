/* eslint-disable react-hooks/rules-of-hooks */
// Note: This file uses React's `use()` for Server Components which is valid
// but triggers ESLint's hooks rules designed for Client Components.

import { createClient, type SanityClient } from 'next-sanity'
import { draftMode } from 'next/headers'
import { use } from 'react'

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

export function isDraftModeEnabled(): boolean {
  const draft = use(draftMode())
  return draft.isEnabled
}

export function getClient(): SanityClient {
  if (isDraftModeEnabled()) {
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

export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  const client = getClient()
  return client.fetch<T>(query, params)
}
