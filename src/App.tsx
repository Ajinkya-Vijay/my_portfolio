import { MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Passions } from './components/sections/Passions'
import { Projects } from './components/sections/Projects'
import { TechStack } from './components/sections/TechStack'

export default function App() {
  return (
    // "user" = respect the visitor's OS-level reduced-motion setting.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Passions />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
