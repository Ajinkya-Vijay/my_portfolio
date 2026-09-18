import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const readTheme = (): Theme => (document.documentElement.classList.contains('light') ? 'light' : 'dark')

export function useTheme() {
  // index.html applies the saved theme before React loads, so the <html> class is the source of truth.
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07090f' : '#f6f7fb')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage unavailable (private mode) — theme still switches for this visit */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
