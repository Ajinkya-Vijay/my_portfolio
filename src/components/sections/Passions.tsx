import { Globe, Layers, Lightbulb, Smartphone, Sparkles, SquareTerminal, Wrench, type LucideIcon } from 'lucide-react'
import { passions, type PassionIcon } from '../../data/portfolio'
import { Reveal, Section, SectionHeading, trackSpotlight } from '../ui/primitives'

const icons: Record<PassionIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  terminal: SquareTerminal,
  wrench: Wrench,
  layers: Layers,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
}

const loop = ['idea', 'prototype', 'build', 'ship', 'learn', 'iterate']

export function Passions() {
  return (
    <Section id="building" className="overflow-hidden">
      <SectionHeading
        index="05"
        label="what i love building"
        align="center"
        title={
          <>
            If it solves a real problem, <span className="text-gradient">I want to build it.</span>
          </>
        }
        description="Whatever the platform, the thrill is the same: taking something from a rough idea to a thing people actually use."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {passions.map((p, i) => {
          const Icon = icons[p.icon]
          const wide = i === 0
          return (
            <li key={p.title} className={wide ? 'lg:col-span-2' : ''}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <div className="card group h-full overflow-hidden p-6" onMouseMove={trackSpotlight}>
                  <span className="relative mb-5 grid size-12 place-items-center rounded-xl border border-line bg-bg-elevated text-accent transition-all duration-300 group-hover:-rotate-6 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-accent-contrast">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="relative text-lg font-semibold text-fg">{p.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                  <span
                    aria-hidden="true"
                    className="absolute right-5 bottom-4 font-mono text-5xl font-bold text-fg/[0.04] transition-colors duration-300 group-hover:text-accent/10"
                  >
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>

      {/* build loop marquee */}
      <div aria-hidden="true" className="mt-16 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-8 font-mono text-2xl text-faint sm:text-3xl">
          {[...Array(2)].flatMap((_, r) =>
            [...Array(3)].flatMap((__, k) =>
              loop.map((word, j) => (
                <span key={`${r}-${k}-${j}`} className="flex items-center gap-8">
                  <span className={j === 3 ? 'text-accent' : ''}>{word}()</span>
                  <span className="text-line-strong">→</span>
                </span>
              )),
            ),
          )}
        </div>
      </div>
    </Section>
  )
}
