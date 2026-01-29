import Link from 'next/link'

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

        {/* Navigation Links */}
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
