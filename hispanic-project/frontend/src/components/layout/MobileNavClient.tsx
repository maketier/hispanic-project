'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavLink {
  href: string
  label: string
}

interface MobileNavClientProps {
  navLinks: NavLink[]
}

export function MobileNavClient({ navLinks }: MobileNavClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger / X toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        <div className="flex h-5 w-5 flex-col items-center justify-center">
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
              isOpen ? 'translate-y-[3px] rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
              isOpen ? '-translate-y-[3px] -rotate-45' : 'translate-y-1'
            }`}
          />
        </div>
      </button>

      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Dropdown nav */}
      <nav
        className={`fixed inset-x-0 top-16 z-40 border-b border-border/50 bg-background/95 backdrop-blur-lg transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 pointer-events-none opacity-0'
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block p-3 font-sans text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
