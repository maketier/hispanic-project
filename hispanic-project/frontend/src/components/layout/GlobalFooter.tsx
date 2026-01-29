// Static copyright (explicit exception per doctrine)
const YEAR = 2026
const COMPANY = 'Headroom Systems'

export function GlobalFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6 md:px-8 lg:px-12">
        <p className="font-sans text-sm text-muted-foreground">
          © {YEAR} {COMPANY}
        </p>
      </div>
    </footer>
  )
}
