import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { GlobalHeader, GlobalFooter } from '@/components'
import { DEFAULT_META } from '@/lib/seoDefaults'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

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
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <GlobalHeader />
        <div className="min-h-screen pt-16">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  )
}
