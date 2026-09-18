import { ArrowUpRight, Check, FlaskConical, Plus } from 'lucide-react'
import { moreProjects, profile, projects, type Project } from '../../data/portfolio'
import { GitHubIcon } from '../ui/BrandIcons'
import { Chip, Reveal, Section, SectionHeading, trackSpotlight } from '../ui/primitives'
import { ProjectVisual } from './ProjectMockups'

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:text-accent"
        >
          <GitHubIcon className="size-4" /> Source code
          <span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5"
        >
          Live demo <ArrowUpRight className="size-4" />
          <span className="sr-only"> of {project.name} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured
  return (
    <Reveal delay={index * 0.08} className={featured ? 'lg:col-span-2' : ''}>
      <article
        onMouseMove={trackSpotlight}
        className={`card group h-full p-4 transition-transform duration-500 hover:-translate-y-1 sm:p-5 ${
          featured ? 'grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10' : 'flex flex-col'
        }`}
      >
        <ProjectVisual kind={project.mockup} image={project.image} alt={`Preview of ${project.name}`} />

        <div className={`flex flex-1 flex-col ${featured ? 'lg:py-4 lg:pr-4' : 'px-1 pt-6 pb-1'}`}>
          <p className="font-mono text-xs text-accent">
            {featured && <span className="mr-2 rounded-full bg-accent/15 px-2 py-0.5">featured</span>}
            {project.tagline}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-fg">{project.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-fg/90">
                <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        label="featured projects"
        title={
          <>
            Things I&apos;ve built — <span className="text-gradient">from idea to shipped.</span>
          </>
        }
        description="A mix of business software, consumer web apps and mobile utilities. Each one started as a problem worth solving."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-dashed border-line-strong p-6 sm:p-8">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70 [mask-image:linear-gradient(90deg,transparent,#000)]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-2/15 text-accent-2">
                  <FlaskConical className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{moreProjects.title}</h3>
                  <p className="mt-1 text-muted">{moreProjects.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {moreProjects.ideas.map((idea) => (
                      <li key={idea}>
                        <Chip className="gap-1.5">
                          <Plus className="size-3 text-accent" aria-hidden="true" />
                          {idea}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent md:self-center"
              >
                <GitHubIcon className="size-4" /> Follow on GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
