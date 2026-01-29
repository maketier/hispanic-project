interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div' | 'article' | 'main'
}

export function SectionContainer({
  children,
  className = '',
  as: Component = 'section',
}: SectionContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Component>
  )
}
