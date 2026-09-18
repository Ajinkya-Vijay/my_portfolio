import { AnimatePresence, motion } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import { moreSkills, techStack, type TechCategory } from '../../data/portfolio'
import { TechIcon, techColors } from '../ui/TechIcon'
import { Chip, Reveal, Section, SectionHeading } from '../ui/primitives'

const filters: ('All' | TechCategory)[] = ['All', 'Frontend', 'Backend', 'Data', 'Cloud & Tools']

export function TechStack() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = filter === 'All' ? techStack : techStack.filter((t) => t.category === filter)
  const chips = filter === 'All' ? Object.values(moreSkills).flat() : moreSkills[filter]

  return (
    <Section id="stack" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-[var(--glow-2)] blur-3xl"
      />
      <SectionHeading
        index="02"
        label="tech stack"
        title={
          <>
            The tools I reach for to <span className="text-gradient">ship with confidence.</span>
          </>
        }
        description="Front to back: typed React interfaces, ASP.NET Core APIs, relational data and the cloud tooling that gets it all to production."
      />

      <Reveal>
        <div role="group" aria-label="Filter technologies" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                filter === f ? 'text-accent-contrast' : 'text-muted hover:text-fg'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="stack-filter"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((tech) => (
            <motion.li
              layout
              key={tech.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ '--brand': techColors[tech.id] } as CSSProperties}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--brand)_55%,transparent)] hover:shadow-[0_18px_40px_-18px_var(--brand)] sm:p-5"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 size-28 rounded-full bg-[var(--brand)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
              />
              <div className="relative flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-line bg-bg-elevated transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <TechIcon id={tech.id} className="size-7" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{tech.category}</span>
              </div>
              <h3 className="relative mt-4 font-semibold text-fg">{tech.name}</h3>
              <p className="relative mt-1 text-xs leading-relaxed text-muted sm:text-sm">{tech.note}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal delay={0.1} className="mt-10">
        <p className="mb-3 font-mono text-xs text-faint">// also fluent in</p>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c} className="transition-colors hover:border-accent/50 hover:text-accent">
              {c}
            </Chip>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
