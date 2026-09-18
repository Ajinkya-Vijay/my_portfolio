import { useReducedMotion } from 'motion/react'
import { GitBranch } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { profile } from '../../data/portfolio'

type Token = { text: string; cls: string }

interface CodeFile {
  name: string
  lang: string
  dot: string
  code: string
}

const files: CodeFile[] = [
  {
    name: 'developer.ts',
    lang: 'TypeScript',
    dot: '#3178C6',
    code: `// Hi there! Welcome to my corner of the internet.
interface Developer {
  name: string
  role: string
  yearsOfExperience: number
  loves: string[]
}

const me: Developer = {
  name: "${profile.name}",
  role: "${profile.role}",
  yearsOfExperience: ${profile.yearsOfExperience},
  loves: ["React", "TypeScript", ".NET", "Azure"],
}

export function buildApp(idea: string) {
  return ship(design(idea), { by: me })
}`,
  },
  {
    name: 'BookingsController.cs',
    lang: 'C#',
    dot: '#9B4F96',
    code: `[ApiController]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookings;

    [HttpPost("{id}/approve")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> Approve(int id)
    {
        var result = await _bookings.ApproveAsync(id);

        return result.IsValid
            ? Ok(result.Booking)
            : BadRequest(result.Errors);
    }
}`,
  },
  {
    name: 'useCart.ts',
    lang: 'TypeScript',
    dot: '#C08457',
    code: `import { create } from "zustand"
import { persist } from "zustand/middleware"

// Cart state that survives a page refresh
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((s) => ({ items: [...s.items, product] })),
      clear: () => set({ items: [] }),
    }),
    { name: "cart-storage" },
  ),
)`,
  },
]

const KEYWORDS =
  'const|let|var|function|return|export|import|from|type|interface|public|private|protected|readonly|async|await|new|class|if|else|string|number|boolean|void|int|true|false|null|using|static|this|of|for|in'

const TOKEN_RE = new RegExp(
  [
    '(\\/\\/.*$)', // 1 comment
    '("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')', // 2 string
    `\\b(${KEYWORDS})\\b`, // 3 keyword
    '\\b([A-Z][A-Za-z0-9_]*)\\b', // 4 type
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 5 number
    '([a-zA-Z_]\\w*)(?=\\s*\\()', // 6 function call
  ].join('|'),
  'g',
)

const TOKEN_CLASSES = ['', 'text-[#637777] italic', 'text-[#c3e88d]', 'text-[#c792ea]', 'text-[#ffcb6b]', 'text-[#f78c6c]', 'text-[#82aaff]']

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  for (const m of line.matchAll(TOKEN_RE)) {
    const index = m.index ?? 0
    if (index > last) tokens.push({ text: line.slice(last, index), cls: '' })
    const group = m.slice(1).findIndex((g) => g !== undefined) + 1
    tokens.push({ text: m[0], cls: TOKEN_CLASSES[group] })
    last = index + m[0].length
  }
  if (last < line.length) tokens.push({ text: line.slice(last), cls: '' })
  return tokens
}

const CHARS_PER_TICK = 3
const TICK_MS = 28
const HOLD_MS = 4500

export function CodeWindow() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const file = files[active]
  const lines = useMemo(() => file.code.split('\n').map(tokenizeLine), [file])
  const total = file.code.length
  const shown = reduceMotion ? total : typed
  const done = shown >= total

  // Type the current file out, then (while autoplaying) move to the next tab.
  useEffect(() => {
    if (reduceMotion) return
    if (!done) {
      const t = window.setTimeout(() => setTyped((n) => Math.min(n + CHARS_PER_TICK, total)), TICK_MS)
      return () => window.clearTimeout(t)
    }
    if (!autoplay) return
    const t = window.setTimeout(() => {
      setActive((i) => (i + 1) % files.length)
      setTyped(0)
    }, HOLD_MS)
    return () => window.clearTimeout(t)
  }, [typed, done, total, autoplay, reduceMotion])

  const selectTab = (i: number) => {
    setAutoplay(false)
    setActive(i)
    setTyped(0)
  }

  // Render tokens up to the number of characters typed so far (+1 per line for the "\n").
  let budget = shown
  let cursorLine = 0
  const rendered = lines.map((tokens, li) => {
    if (budget < 0) return null
    cursorLine = li
    const parts = tokens.map((tok, ti) => {
      if (budget <= 0) return null
      const text = tok.text.slice(0, budget)
      budget -= tok.text.length
      return (
        <span key={ti} className={tok.cls}>
          {text}
        </span>
      )
    })
    budget = Math.max(budget, 0) - 1
    return parts
  })

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f19] font-mono text-[11.5px] leading-[22px] text-[#d6deeb] shadow-2xl shadow-black/40 sm:text-[13px]">
      {/* window chrome */}
      <div className="flex items-center gap-4 border-b border-white/[0.07] bg-white/[0.02] px-4">
        <div className="flex gap-1.5 py-3.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div role="tablist" aria-label="Code samples" className="-mb-px flex min-w-0 overflow-x-auto [scrollbar-width:none]">
          {files.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => selectTab(i)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-xs transition-colors ${
                i === active
                  ? 'border-[#2dd4bf] text-white'
                  : 'border-transparent text-white/45 hover:text-white/80'
              }`}
            >
              <span className="size-2 rounded-full" style={{ background: f.dot }} aria-hidden="true" />
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* code */}
      <div
        role="tabpanel"
        aria-label={`${file.name} source`}
        className="relative h-[28.5rem] overflow-x-auto overflow-y-hidden px-4 py-4 [scrollbar-width:thin]"
      >
        <pre className="whitespace-pre" aria-hidden="true">
          {rendered.map((parts, li) =>
            parts === null ? null : (
              <div key={li} className="flex">
                <span className="mr-4 inline-block w-6 shrink-0 select-none text-right text-white/20">{li + 1}</span>
                <span>
                  {parts}
                  {li === cursorLine && (
                    <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-[#2dd4bf]" />
                  )}
                </span>
              </div>
            ),
          )}
        </pre>
        {/* Screen-reader version of the snippet, without the typing effect. */}
        <pre className="sr-only">{file.code}</pre>
      </div>

      {/* status bar */}
      <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#2dd4bf]/[0.06] px-4 py-1.5 text-[11px] text-white/50">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranch className="size-3" aria-hidden="true" /> main
          </span>
          <span className="hidden sm:inline">{file.lang}</span>
        </span>
        <span className={`flex items-center gap-1.5 ${done ? 'text-[#2dd4bf]' : ''}`}>
          <span className={`size-1.5 rounded-full ${done ? 'bg-[#2dd4bf]' : 'animate-pulse bg-[#febc2e]'}`} />
          {done ? 'Build succeeded' : 'Compiling…'}
        </span>
      </div>
    </div>
  )
}
