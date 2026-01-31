import type { Metadata } from 'next'
import { bodyFont, displayFont } from '@/brand/fonts'
import './globals.css'
import { GlobalHeader, GlobalFooter } from '@/components'
import { DEFAULT_META } from '@/lib/seoDefaults'

export const metadata: Metadata = {
  title: DEFAULT_META.title,
  description: DEFAULT_META.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="antialiased">
        <GlobalHeader />
        <div className="min-h-screen pt-16">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  )
}
