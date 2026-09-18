import { Play, ShoppingBag, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { statusGalleryIconUrl, type MockupKind } from '../../data/portfolio'

/*
 * Illustrated, pure-CSS mockups for each project. They scale with their container and cost
 * nothing to load. To use a real screenshot instead, set `image` on the project in portfolio.ts.
 */

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/30">
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#f3f4f6] px-3 py-2">
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-white px-2 py-0.5 text-center font-mono text-[9px] text-slate-400">{url}</div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  )
}

const bookings = [
  { name: 'Anna K.', hours: [8, 8, 7.5, 8, 6], status: 'Approved' },
  { name: 'Rahul M.', hours: [8, 9.5, 8, 8, 8], status: 'Flagged' },
  { name: 'Sofia L.', hours: [7, 8, 8, 8, 4], status: 'Pending' },
  { name: 'David P.', hours: [8, 8, 8, 8, 8], status: 'Approved' },
]

const statusStyle: Record<string, string> = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Flagged: 'bg-rose-100 text-rose-700',
}

function TimeBookingMockup() {
  return (
    <BrowserFrame url="timebooking.app/approvals">
      <div className="flex h-full text-slate-700">
        <aside className="hidden w-[18%] flex-col gap-2 bg-[#0f172a] p-2.5 sm:flex">
          <div className="mb-2 h-3 w-3/4 rounded bg-teal-400/80" />
          {['w-full', 'w-4/5', 'w-5/6', 'w-2/3'].map((w, i) => (
            <div key={i} className={`h-2 rounded ${w} ${i === 1 ? 'bg-white/60' : 'bg-white/15'}`} />
          ))}
        </aside>
        <div className="relative flex-1 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-slate-900 sm:text-xs">Week 38 · Approvals</p>
              <p className="text-[8px] text-slate-400">Project Phoenix · 4 consultants</p>
            </div>
            <span className="rounded-md bg-teal-600 px-2 py-1 text-[8px] font-medium text-white">Approve all</span>
          </div>
          <table className="w-full text-[8px] sm:text-[9px]">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="pb-1.5 font-medium">Consultant</th>
                {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
                  <th key={i} className="pb-1.5 text-center font-medium">
                    {d}
                  </th>
                ))}
                <th className="pb-1.5 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.name} className="border-t border-slate-100">
                  <td className="py-1.5 font-medium text-slate-800">{b.name}</td>
                  {b.hours.map((h, i) => (
                    <td
                      key={i}
                      className={`py-1.5 text-center tabular-nums ${h > 9 ? 'font-semibold text-rose-600' : ''}`}
                    >
                      {h}
                    </td>
                  ))}
                  <td className="py-1.5 text-right">
                    <span className={`rounded-full px-1.5 py-0.5 text-[7px] font-medium ${statusStyle[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-2 py-1.5 text-[8px] shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
            <TriangleAlert className="size-3 text-rose-500" />
            <span>
              <b className="text-slate-800">9.5h</b> exceeds the daily limit
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

const products = [
  { name: 'Aero Headphones', price: '$129', from: '#a5b4fc', to: '#6366f1' },
  { name: 'Canvas Sneakers', price: '$79', from: '#fda4af', to: '#f43f5e' },
  { name: 'Smart Watch S2', price: '$199', from: '#5eead4', to: '#0d9488' },
  { name: 'Desk Lamp', price: '$49', from: '#fde68a', to: '#f59e0b' },
  { name: 'Leather Backpack', price: '$89', from: '#d6d3d1', to: '#78716c' },
  { name: 'Ceramic Mug', price: '$19', from: '#c4b5fd', to: '#8b5cf6' },
]

function EcommerceMockup() {
  return (
    <BrowserFrame url="shop.example.dev/products">
      <div className="flex h-full flex-col text-slate-700">
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
          <span className="text-[10px] font-bold tracking-tight text-slate-900">shopr.</span>
          <div className="hidden gap-3 text-[8px] text-slate-400 sm:flex">
            <span className="text-slate-900">New</span>
            <span>Audio</span>
            <span>Wearables</span>
          </div>
          <span className="relative">
            <ShoppingBag className="size-3.5 text-slate-800" />
            <span className="absolute -right-1.5 -top-1.5 grid size-3 place-items-center rounded-full bg-rose-500 text-[6px] font-bold text-white transition-transform duration-300 group-hover:scale-125">
              3
            </span>
          </span>
        </div>
        <div className="relative flex min-h-0 flex-1">
          <div className="grid flex-1 grid-cols-3 content-start gap-2 p-3 pr-[37%]">
            {products.map((p) => (
              <div key={p.name} className="flex flex-col">
                <div
                  className="aspect-[4/3] rounded-md"
                  style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                />
                <p className="mt-1 truncate text-[7.5px] font-medium text-slate-800">{p.name}</p>
                <p className="text-[7.5px] text-slate-400">{p.price}</p>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 right-0 w-[34%] border-l border-slate-100 bg-white p-2.5 shadow-[-12px_0_24px_-12px_rgba(0,0,0,0.15)]">
            <p className="mb-2 text-[8px] font-semibold text-slate-900">Your cart (3)</p>
            {products.slice(0, 3).map((p, i) => (
              <div
                key={p.name}
                className={`mb-1.5 flex items-center gap-1.5 rounded ${i === 2 ? 'transition-colors duration-500 group-hover:bg-teal-50' : ''}`}
              >
                <span className="size-4 shrink-0 rounded" style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }} />
                <span className="flex-1 truncate text-[7px]">{p.name}</span>
                <span className="text-[7px] font-medium">{p.price}</span>
              </div>
            ))}
            <div className="mt-2 rounded bg-slate-900 py-1 text-center text-[7px] font-medium text-white">Checkout · $407</div>
            <p className="mt-1 text-center text-[6px] text-slate-400">saved to localStorage ✓</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

const tiles = [
  ['#134e4a', '#2dd4bf'],
  ['#4c1d95', '#a78bfa', true],
  ['#7c2d12', '#fb923c'],
  ['#1e3a8a', '#60a5fa'],
  ['#831843', '#f472b6', true],
  ['#14532d', '#4ade80'],
  ['#713f12', '#facc15'],
  ['#312e81', '#818cf8'],
  ['#164e63', '#22d3ee', true],
] as const

function GalleryMockup() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-[112%] translate-y-[6%] rounded-[1.6rem] border-[5px] border-[#1c1f26] bg-[#0e1116] p-1.5 shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:translate-y-[2%] aspect-[9/19]">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-[#0e1116]">
          <div className="mx-auto mt-1 h-1.5 w-10 rounded-full bg-black" />
          <div className="flex items-center gap-1.5 px-2.5 pt-2.5 pb-2">
            <img src={statusGalleryIconUrl} alt="" width={14} height={14} className="size-3.5 rounded-[4px]" />
            <span className="text-[8px] font-semibold text-white">Status Gallery</span>
          </div>
          <div className="flex gap-1 px-2.5 pb-2">
            {['All', 'Photos', 'Videos'].map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-1.5 py-0.5 text-[6px] ${i === 0 ? 'bg-[#25d366] text-black' : 'bg-white/10 text-white/70'}`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-[3px] px-[3px]">
            {tiles.map(([from, to, video], i) => (
              <div
                key={i}
                className="relative grid aspect-square place-items-center rounded-[3px]"
                style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
              >
                {video && <Play className="size-2.5 fill-white text-white" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mockups: Record<MockupKind, () => ReactNode> = {
  timebooking: TimeBookingMockup,
  ecommerce: EcommerceMockup,
  gallery: GalleryMockup,
}

const backdrops: Record<MockupKind, string> = {
  timebooking: 'from-teal-500/25 via-sky-500/10 to-transparent',
  ecommerce: 'from-rose-500/25 via-violet-500/10 to-transparent',
  gallery: 'from-emerald-500/25 via-teal-500/10 to-transparent',
}

export function ProjectVisual({ kind, image, alt }: { kind: MockupKind; image?: string; alt: string }) {
  const Mockup = mockups[kind]
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2">
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${backdrops[kind]}`} />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      {image ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="relative size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-[7%] bottom-0 transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
        >
          <Mockup />
        </div>
      )}
    </div>
  )
}
