import { Compass, Layers3, MapPin, Rocket, Sprout } from 'lucide-react'
import { about, profile } from '../../data/portfolio'
import { Reveal, Section, SectionHeading, trackSpotlight } from '../ui/primitives'

const highlightIcons = [Compass, Layers3, Sprout, Rocket]

function JsonValue({ value }: { value: string | number | string[] }) {
  if (Array.isArray(value)) {
    return (
      <>
        [
        {value.map((v, i) => (
          <span key={v}>
            <span className="text-[#c3e88d]">"{v}"</span>
            {i < value.length - 1 && ', '}
          </span>
        ))}
        ]
      </>
    )
  }
  return typeof value === 'number' ? (
    <span className="text-[#f78c6c]">{value}</span>
  ) : (
    <span className="text-[#c3e88d]">"{value}"</span>
  )
}

export function About() {
  const facts = Object.entries(about.funFacts)
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        label="about me"
        title={
          <>
            More than code — I build <span className="text-gradient">products people use.</span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="space-y-5">
          {/* profile card */}
          <div className="card flex items-center gap-5 p-5" onMouseMove={trackSpotlight}>
            <div className="relative shrink-0 rounded-2xl bg-gradient-to-br from-accent to-accent-2 p-[2px]">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  width={88}
                  height={88}
                  loading="lazy"
                  className="size-22 rounded-[14px] object-cover"
                />
              ) : (
                <div className="grid size-22 place-items-center rounded-[14px] bg-bg-elevated font-display text-3xl font-semibold">
                  <span className="text-gradient">{profile.initials}</span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">{profile.role}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-faint">
                <MapPin className="size-3.5" aria-hidden="true" /> {profile.location}
              </p>
            </div>
          </div>

          {/* fun facts as a tiny JSON file */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f19] font-mono text-[12.5px] leading-6 text-[#d6deeb] shadow-xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 text-xs text-white/45">
              <span>about-me.json</span>
              <span className="text-[#2dd4bf]">● saved</span>
            </div>
            <pre className="overflow-x-auto px-4 py-4">
              {'{\n'}
              {facts.map(([key, value], i) => (
                <span key={key}>
                  {'  '}
                  <span className="text-[#82aaff]">"{key}"</span>: <JsonValue value={value} />
                  {i < facts.length - 1 ? ',' : ''}
                  {'\n'}
                </span>
              ))}
              {'}'}
            </pre>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-fg' : undefined}>
                {p}
              </p>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {about.highlights.map((h, i) => {
              const Icon = highlightIcons[i % highlightIcons.length]
              return (
                <Reveal key={h.title} delay={0.1 + i * 0.06}>
                  <div className="card h-full p-5" onMouseMove={trackSpotlight}>
                    <Icon className="mb-3 size-5 text-accent" aria-hidden="true" />
                    <h3 className="font-semibold text-fg">{h.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
