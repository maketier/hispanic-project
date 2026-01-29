import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// Initialize image builder with project config
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const builder = imageUrlBuilder({ projectId, dataset })

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface SanityImageProps {
  value: {
    asset: {
      _ref: string
    }
    alt?: string
    caption?: string
  }
}

export function SanityImage({ value }: SanityImageProps) {
  if (!value?.asset?._ref) {
    return null
  }

  const imageUrl = urlFor(value.asset)
    .width(1200)
    .quality(85)
    .auto('format')
    .url()

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-sm bg-secondary">
        <Image
          src={imageUrl}
          alt={value.alt || ''}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}
