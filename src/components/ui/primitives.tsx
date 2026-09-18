import { motion } from 'motion/react'
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react'

/** Fades + lifts children into view once, as they scroll onto the screen. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  )
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = 'left',
}: {
  index: string
  label: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 sm:mb-16 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <p className="mb-4 font-mono text-sm text-accent">
        <span className="text-faint">// {index}</span> {label}
      </p>
      <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  )
}

type ButtonProps = ComponentPropsWithoutRef<'a'> & { variant?: 'primary' | 'ghost' }

export function ButtonLink({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.97]'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-accent-contrast shadow-[0_8px_30px_-8px_var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_var(--accent)]'
      : 'border border-line-strong bg-surface/60 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent'
  return (
    <a className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </a>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted ${className}`}
    >
      {children}
    </span>
  )
}

/** Mouse-move handler that feeds the `.card` spotlight its cursor position. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
