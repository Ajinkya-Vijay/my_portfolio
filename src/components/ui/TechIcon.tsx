import type { ReactNode } from 'react'

export type TechId =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'tailwind'
  | 'redux'
  | 'zustand'
  | 'dotnet'
  | 'csharp'
  | 'sqlserver'
  | 'docker'
  | 'azure'
  | 'git'

/** Brand colour of each technology — used for icon tiles and hover glows. */
export const techColors: Record<TechId, string> = {
  react: '#61DAFB',
  typescript: '#3178C6',
  javascript: '#F7DF1E',
  tailwind: '#38BDF8',
  redux: '#764ABC',
  zustand: '#C08457',
  dotnet: '#512BD4',
  csharp: '#9B4F96',
  sqlserver: '#CC2927',
  docker: '#2496ED',
  azure: '#0078D4',
  git: '#F05032',
}

const label = (text: string, fill: string, size = 12, x = 16, y = 21, anchor: 'middle' | 'end' = 'middle') => (
  <text
    x={x}
    y={y}
    fill={fill}
    fontSize={size}
    fontWeight={700}
    fontFamily="'Space Grotesk Variable', 'Inter Variable', system-ui, sans-serif"
    textAnchor={anchor}
  >
    {text}
  </text>
)

const glyphs: Record<TechId, ReactNode> = {
  react: (
    <g fill="none" stroke="#61DAFB" strokeWidth={1.5}>
      <ellipse cx={16} cy={16} rx={13} ry={5} />
      <ellipse cx={16} cy={16} rx={13} ry={5} transform="rotate(60 16 16)" />
      <ellipse cx={16} cy={16} rx={13} ry={5} transform="rotate(120 16 16)" />
      <circle cx={16} cy={16} r={2.6} fill="#61DAFB" stroke="none" />
    </g>
  ),
  typescript: (
    <>
      <rect x={3} y={3} width={26} height={26} rx={4} fill="#3178C6" />
      {label('TS', '#fff', 12, 26.5, 26, 'end')}
    </>
  ),
  javascript: (
    <>
      <rect x={3} y={3} width={26} height={26} rx={4} fill="#F7DF1E" />
      {label('JS', '#1b1b1b', 12, 26.5, 26, 'end')}
    </>
  ),
  tailwind: (
    <path
      transform="translate(3 3.5) scale(1.08)"
      fill="#38BDF8"
      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"
    />
  ),
  redux: (
    <>
      <rect x={3} y={3} width={26} height={26} rx={7} fill="#764ABC" />
      <g fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round">
        <path d="M11 11.5a6.5 6.5 0 0 1 10.8 1.2" />
        <path d="M22.4 17.5a6.5 6.5 0 0 1-8.6 5" />
        <path d="M10.3 20.6a6.5 6.5 0 0 1-.6-6.2" />
      </g>
      <g fill="#fff">
        <circle cx={21.9} cy={13.6} r={1.6} />
        <circle cx={13} cy={22.2} r={1.6} />
        <circle cx={9.9} cy={13.6} r={1.6} />
      </g>
    </>
  ),
  zustand: (
    <>
      <rect x={3} y={3} width={26} height={26} rx={7} fill="#6B4A32" />
      <text x={16} y={22} fontSize={15} textAnchor="middle">
        🐻
      </text>
    </>
  ),
  dotnet: (
    <>
      <rect x={3} y={3} width={26} height={26} rx={5} fill="#512BD4" />
      {label('.NET', '#fff', 9.5, 16, 19.5)}
    </>
  ),
  csharp: (
    <>
      <path d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z" fill="#9B4F96" />
      <path d="M16 2.5 27.7 9.25v13.5L16 29.5z" fill="#68217A" opacity={0.55} />
      {label('C#', '#fff', 11, 16, 20)}
    </>
  ),
  sqlserver: (
    <>
      <path d="M6 8v16c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5V8" fill="#CC2927" />
      <ellipse cx={16} cy={8} rx={10} ry={3.5} fill="#EA5B57" />
      <g fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={1.2}>
        <path d="M6 14c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5" />
        <path d="M6 19.5c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5" />
      </g>
    </>
  ),
  docker: (
    <>
      <g fill="#2496ED">
        {[
          [6.5, 12.5],
          [10.5, 12.5],
          [14.5, 12.5],
          [18.5, 12.5],
          [10.5, 8.5],
          [14.5, 8.5],
          [14.5, 4.5],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={3.4} height={3.4} rx={0.6} />
        ))}
        <path d="M2.5 17h24.3c.9-1.6 2.1-2.3 3.2-2.3-.3-1-1.3-1.7-2.5-1.6-.3-1.1-1-1.8-1.8-2.2-.7 1-.8 2.4-.2 3.4-.3.5-.9.9-1.8.9H2.5c-.3 5 3.4 9.3 11.3 9.3 6.3 0 10.4-2.6 12.6-7.5" />
      </g>
    </>
  ),
  azure: (
    <>
      <path d="M12.2 4h7.1L9.6 28H2.8z" fill="#0A5DB8" />
      <path d="M19.4 11.6 29.2 28H12.4l7.3-2.6-4.6-6.2z" fill="#3AA0F3" />
    </>
  ),
  git: (
    <>
      <rect x={5.5} y={5.5} width={21} height={21} rx={3.5} fill="#F05032" transform="rotate(45 16 16)" />
      <g stroke="#fff" strokeWidth={1.9} strokeLinecap="round" fill="none">
        <path d="M13 9.5 22 18.5" />
        <path d="M17 13.5v8" />
      </g>
      <g fill="#fff">
        <circle cx={17} cy={13.5} r={2} />
        <circle cx={17} cy={22} r={2} />
        <circle cx={21.5} cy={18} r={2} />
      </g>
    </>
  ),
}

export function TechIcon({ id, className = 'size-8' }: { id: TechId; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      {glyphs[id]}
    </svg>
  )
}
