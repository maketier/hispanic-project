export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity.client'
import { ecosystemQuery } from '@/lib/sanity.queries'
import type { PageData } from '@/lib/sanity.types'
import { DEFAULT_META } from '@/lib/seoDefaults'
import { SectionContainer, CustomPortableText } from '@/components'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch<PageData>(ecosystemQuery)

  return {
    title: data?.seo?.title ?? `Ecosystem | ${DEFAULT_META.title}`,
    description: data?.seo?.description ?? DEFAULT_META.description,
  }
}

export default async function EcosystemPage() {
  const { data, isDraft } = await sanityFetch<PageData>(ecosystemQuery)

  if (!data) {
    return (
      <SectionContainer className="flex min-h-[80vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Content loading...</p>
      </SectionContainer>
    )
  }

  return (
    <>
      {isDraft && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
          Preview Mode
        </div>
      )}

      {/* Page Header */}
      <SectionContainer className="pt-24 pb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
          {data.heroHeading}
        </h1>
      </SectionContainer>

      {/* Body Content */}
      <SectionContainer className="pb-24">
        <div className="max-w-3xl">
          <CustomPortableText value={data.body ?? []} />
        </div>
      </SectionContainer>
    </>
  )
}
