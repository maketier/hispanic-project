export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity.client'
import { homepageQuery } from '@/lib/sanity.queries'
import type { PageData } from '@/lib/sanity.types'
import { DEFAULT_META } from '@/lib/seoDefaults'
import { SectionContainer, Button, CustomPortableText } from '@/components'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch<PageData>(homepageQuery)

  return {
    title: data?.seo?.title ?? DEFAULT_META.title,
    description: data?.seo?.description ?? DEFAULT_META.description,
  }
}

export default async function Home() {
  const { data, isDraft } = await sanityFetch<PageData>(homepageQuery)

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

      {/* Hero Section */}
      <SectionContainer className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground max-w-4xl">
          {data.heroHeading}
        </h1>

        <div className="mt-8">
          <Button href="/ecosystem" size="lg" variant="primary">
            Get Started
          </Button>
        </div>
      </SectionContainer>

      {/* Body Content */}
      {data.body && data.body.length > 0 && (
        <SectionContainer className="py-24">
          <div className="mx-auto max-w-3xl">
            <CustomPortableText value={data.body ?? []} />
          </div>
        </SectionContainer>
      )}
    </>
  )
}
