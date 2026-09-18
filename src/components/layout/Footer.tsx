import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-center font-mono text-xs text-muted sm:text-left">
          <span className="text-faint">©</span> {year} {profile.name}
          <span className="mx-2 text-faint">·</span>
          Built with React, TypeScript &amp; Tailwind CSS
        </p>
        <div className="flex items-center gap-2">
          {[
            { href: profile.github, label: 'GitHub', icon: <GitHubIcon className="size-4" /> },
            { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="size-4" /> },
            { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="size-4" /> },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              {s.icon}
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 grid size-9 place-items-center rounded-full bg-surface-2 text-fg transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
