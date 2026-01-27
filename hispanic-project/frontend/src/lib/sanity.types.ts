import type { PortableTextBlock } from '@portabletext/types'

export interface SeoData {
  title: string
  description: string
}

export interface PageData {
  title: string
  heroHeading: string
  body: PortableTextBlock[]
  seo: SeoData
}
