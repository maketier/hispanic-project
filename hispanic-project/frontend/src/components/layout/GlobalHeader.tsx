import Link from 'next/link'
import { MobileNavClient } from './MobileNavClient'

// Static navigation links (explicit exception per doctrine)
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/hispanick', label: 'Hispanic.k' },
]

export function GlobalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:px-12">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-tight text-foreground transition-colors hover:text-primary"
        >
          Headroom
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation (Client Island) */}
        <div className="md:hidden">
          <MobileNavClient navLinks={navLinks} />
        </div>
      </nav>
    </header>
  )
}
