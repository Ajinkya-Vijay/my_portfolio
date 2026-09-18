import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'
import { profile } from './data/portfolio'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// A small hello for the developers who open DevTools.
console.log(
  `%c<${profile.firstName.toLowerCase()}.dev />%c\nCurious how this was built? React + TypeScript + Tailwind CSS.\nSay hi: ${profile.email}`,
  'font: 600 16px monospace; color: #2dd4bf',
  'font: 12px monospace; color: #8d97ab',
)
