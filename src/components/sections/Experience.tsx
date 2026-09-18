import { Briefcase, Code2, Database, Layers, Plug, Server } from 'lucide-react'
import { experience, profile } from '../../data/portfolio'
import { Chip, Reveal, Section, SectionHeading, trackSpotlight } from '../ui/primitives'

const areas = [
  { icon: Code2, title: 'Frontend', text: 'React, TypeScript, responsive & accessible UI' },
  { icon: Server, title: 'Backend', text: 'ASP.NET Core, C#, clean service layers' },
  { icon: Plug, title: 'API integration', text: 'REST & GraphQL, typed contracts, auth' },
  { icon: Database, title: 'Database', text: 'SQL Server, MySQL, EF Core, query tuning' },
  { icon: Layers, title: 'Full stack', text: 'Owning features from schema to deploy' },
]

export function Experience() {
  return (
    <Section id="experience" className="overflow-hidden">
      <SectionHeading
        index="04"
        label="experience"
        title={
          <>
            {profile.yearsOfExperience}+ years of <span className="text-gradient">shipping real software.</span>
          </>
        }
        description="Building production systems across the stack — the kind that run businesses, handle real data and get used every day."
      />

      <Reveal>
        <ul className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {areas.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-surface/70 p-4 transition-colors hover:border-accent/40">
              <Icon className="mb-3 size-5 text-accent" aria-hidden="true" />
              <p className="text-sm font-semibold text-fg">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-gradient-to-b before:from-accent before:via-accent-2/60 before:to-transparent sm:space-y-10">
        {experience.map((job, i) => (
          <li key={`${job.role}-${job.period}`} className="relative pl-12 sm:pl-16">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 left-0 grid size-8 place-items-center rounded-full border ${
                i === 0 ? 'border-accent bg-accent/15 text-accent' : 'border-line-strong bg-bg-elevated text-muted'
              }`}
            >
              <Briefcase className="size-3.5" />
              {i === 0 && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent" />}
            </span>

            <Reveal delay={0.05}>
              <article className="card p-5 sm:p-7" onMouseMove={trackSpotlight}>
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-semibold text-fg">{job.role}</h3>
                    <p className="mt-0.5 text-accent">{job.company}</p>
                  </div>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{job.period}</span>
                </div>

                <p className="mt-4 text-muted">{job.summary}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-sm leading-relaxed text-fg/90 sm:text-[15px]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-line pt-5">
                  {job.focus.map((f) => (
                    <span key={f} className="rounded-full bg-accent-2/12 px-2.5 py-1 text-xs font-medium text-accent-2">
                      {f}
                    </span>
                  ))}
                  <span className="mx-1 h-4 w-px bg-line-strong" aria-hidden="true" />
                  {job.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
