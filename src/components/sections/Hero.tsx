import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, CloudUpload, Mail, Sparkles } from 'lucide-react'
import { hero, profile } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { ButtonLink } from '../ui/primitives'
import { CodeWindow } from './CodeWindow'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* backdrop: grid + soft glows */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
        <div className="absolute -top-40 left-[10%] size-[36rem] rounded-full bg-[var(--glow)] blur-3xl" />
        <div className="absolute top-20 right-[-10%] size-[30rem] rounded-full bg-[var(--glow-2)] blur-3xl" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-accent" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1 {...fadeUp(0.08)} className="text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.1rem]">
            {hero.headline[0]} <span className="text-gradient">{hero.headline[1]}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {hero.intro}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects">
              View My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              <Sparkles className="size-4" />
              Let&apos;s Connect
            </ButtonLink>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.github, label: 'GitHub', icon: <GitHubIcon /> },
                { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
                { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="size-5" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.dl {...fadeUp(0.32)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-lg font-semibold text-fg sm:text-2xl">{s.value}</dd>
                <dd aria-hidden="true" className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative [perspective:1200px]"
        >
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-accent-2/25 blur-2xl" />
          <CodeWindow />

          <div
            aria-hidden="true"
            className="absolute -right-3 -top-5 hidden animate-float items-center gap-2 rounded-xl border border-line bg-bg-elevated/90 px-3 py-2 text-xs shadow-xl backdrop-blur sm:flex"
          >
            <span className="grid size-6 place-items-center rounded-md bg-accent/15 text-accent">✓</span>
            <span>
              <span className="block font-medium text-fg">CI pipeline</span>
              <span className="font-mono text-[10px] text-muted">all checks passed</span>
            </span>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-4 hidden animate-float items-center gap-2 rounded-xl border border-line bg-bg-elevated/90 px-3 py-2 text-xs shadow-xl backdrop-blur [animation-delay:-3s] sm:flex"
          >
            <span className="grid size-6 place-items-center rounded-md bg-accent-2/15 text-accent-2">
              <CloudUpload className="size-3.5" />
            </span>
            <span>
              <span className="block font-medium text-fg">Deployed to Azure</span>
              <span className="font-mono text-[10px] text-muted">production · just now</span>
            </span>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] text-faint transition-colors hover:text-accent lg:flex"
        aria-label="Scroll to About section"
      >
        scroll
        <ArrowDown className="size-3.5 animate-bounce" />
      </a>
    </section>
  )
}
