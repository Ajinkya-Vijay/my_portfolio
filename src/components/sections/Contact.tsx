import { ArrowUpRight, Check, Copy, Download, Loader2, Mail, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Reveal, Section, SectionHeading } from '../ui/primitives'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (f.name.trim().length < 2) errors.name = 'Please tell me your name.'
  if (!EMAIL_RE.test(f.email.trim())) errors.email = 'That email address does not look right.'
  if (f.message.trim().length < 10) errors.message = 'A few more words, please (10+ characters).'
  return errors
}

const inputClass =
  'w-full rounded-xl border bg-bg-elevated px-4 py-3 text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25'

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }

    // No form backend configured: hand off to the visitor's email client.
    if (!profile.contactFormEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`)
      const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(profile.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setFields({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const links = [
    { href: profile.github, label: 'GitHub', sub: 'Code & side projects', icon: <GitHubIcon className="size-5" /> },
    { href: profile.linkedin, label: 'LinkedIn', sub: 'Career & network', icon: <LinkedInIcon className="size-5" /> },
  ]

  return (
    <Section id="contact" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-[var(--glow)] blur-3xl"
      />
      <SectionHeading
        index="06"
        label="contact"
        title={
          <>
            Have an idea? <span className="text-gradient">Let&apos;s build it together.</span>
          </>
        }
        description="Whether it's a full-time role, a freelance project or just a chat about tech — my inbox is always open. I usually reply within a day."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal className="space-y-3">
          <div className="card flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-faint">Email me directly</p>
              <a href={`mailto:${profile.email}`} className="block truncate font-medium text-fg hover:text-accent">
                {profile.email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
              aria-label={copied ? 'Email copied' : 'Copy email address'}
            >
              {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="card group flex items-center gap-3 p-5"
              >
                <span className="text-fg">{l.icon}</span>
                <span className="flex-1">
                  <span className="block font-medium text-fg">{l.label}</span>
                  <span className="block text-xs text-faint">{l.sub}</span>
                </span>
                <ArrowUpRight className="size-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>

          <a
            href={profile.resumeUrl}
            download
            className="group flex items-center justify-between gap-4 rounded-[1.25rem] border border-accent/40 bg-gradient-to-r from-accent/15 to-accent-2/10 p-5 transition-colors hover:border-accent"
          >
            <span>
              <span className="block font-semibold text-fg">Download my resume</span>
              <span className="block text-xs text-muted">PDF · experience, skills & projects</span>
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-contrast transition-transform group-hover:translate-y-0.5">
              <Download className="size-5" aria-hidden="true" />
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[1.25rem] border border-line bg-surface/80 p-5 shadow-xl shadow-black/5 sm:p-7"
            aria-describedby="contact-status"
          >
            <p className="mb-6 font-mono text-xs text-faint">
              <span className="text-accent">$</span> send-message --to {profile.firstName.toLowerCase()}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {(['name', 'email'] as const).map((key) => (
                <div key={key}>
                  <label htmlFor={`contact-${key}`} className="mb-2 block text-sm font-medium text-fg">
                    {key === 'name' ? 'Your name' : 'Your email'}
                  </label>
                  <input
                    id={`contact-${key}`}
                    name={key}
                    type={key === 'email' ? 'email' : 'text'}
                    autoComplete={key}
                    placeholder={key === 'name' ? 'Jane Doe' : 'jane@company.com'}
                    value={fields[key]}
                    onChange={update(key)}
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
                    className={`${inputClass} ${errors[key] ? 'border-rose-500/70' : 'border-line'}`}
                  />
                  {errors[key] && (
                    <p id={`contact-${key}-error`} className="mt-1.5 text-xs text-rose-500">
                      {errors[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-fg">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell me about your project, role or idea…"
                value={fields.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputClass} resize-y ${errors.message ? 'border-rose-500/70' : 'border-line'}`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-rose-500">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id="contact-status" role="status" aria-live="polite" className="text-sm">
                {status === 'sent' && (
                  <span className="flex items-center gap-1.5 text-accent">
                    <Check className="size-4" />
                    {profile.contactFormEndpoint ? "Thanks! I'll get back to you soon." : 'Opening your email app…'}
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-rose-500">
                    Something went wrong. Please email me at{' '}
                    <a className="underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    .
                  </span>
                )}
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-[0_8px_30px_-8px_var(--accent)] transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
