export const dynamic = 'force-dynamic'

import { PortableText } from '@portabletext/react'
import { isDraftModeEnabled, sanityFetch } from '@/lib/sanity.client'
import { ecosystemQuery } from '@/lib/sanity.queries'
import type { PageData } from '@/lib/sanity.types'

export default async function EcosystemPage() {
  const isDraft = isDraftModeEnabled()
  const data = await sanityFetch<PageData | null>(ecosystemQuery)

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Content loading...</p>
      </main>
    )
  }

  return (
    <>
      {isDraft && (
        <div className="bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
          Preview Mode
        </div>
      )}
      <main className="flex min-h-screen flex-col items-center justify-center px-8">
        <h1 className="text-4xl font-bold">{data.heroHeading}</h1>
        <div className="prose mt-8 max-w-2xl">
          <PortableText value={data.body} />
        </div>
      </main>
    </>
  )
}
