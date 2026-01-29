import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Link from 'next/link'
import { SanityImage } from './SanityImage'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-16 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mt-14 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mt-12 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-xl md:text-2xl font-medium tracking-tight mt-10 mb-4">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-base md:text-lg leading-relaxed text-foreground/90 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-lg text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-foreground/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-sans text-base md:text-lg leading-relaxed pl-2">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="font-sans text-base md:text-lg leading-relaxed pl-2">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: SanityImage,
  },
}

interface CustomPortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

export function CustomPortableText({ value, className = '' }: CustomPortableTextProps) {
  if (!value) {
    return null
  }

  return (
    <div className={`portable-text ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
