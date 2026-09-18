/**
 * ───────────────────────────────────────────────────────────────────────────
 *  All portfolio content lives in this file.
 *  Edit the values below to personalise the site — no component changes needed.
 *  Search for "TODO" to find the placeholders that still need your real details.
 * ───────────────────────────────────────────────────────────────────────────
 */
import statusGalleryIcon from '../assets/status-gallery-icon.webp'
import type { TechId } from '../components/ui/TechIcon'

/** Resolves a file in /public so it works on both "/" and GitHub Pages sub-paths. */
const publicUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const profile = {
  name: 'Ajinkya Sonawane', // TODO: confirm your display name
  firstName: 'Ajinkya',
  initials: 'AS',
  role: 'Full Stack .NET Developer',
  /** Used everywhere the site says "N+ years". */
  yearsOfExperience: 4,
  location: 'India · Open to remote', // TODO
  availability: 'Open to new opportunities',
  /** Put your photo in /public (e.g. public/profile.jpg) and set this to publicUrl('profile.jpg'). */
  avatar: undefined as string | undefined,
  email: 'ajinkya.sonawane411@gmail.com',
  github: 'https://github.com/your-github-username', // TODO
  linkedin: 'https://www.linkedin.com/in/your-linkedin-id', // TODO
  /** Drop your CV at public/resume.pdf. */
  resumeUrl: publicUrl('resume.pdf'),
  /**
   * Optional: a form backend such as Formspree (https://formspree.io/f/xxxx).
   * When empty, the contact form opens the visitor's email app with the message prefilled.
   */
  contactFormEndpoint: '',
}

export const hero = {
  headline: ['I build apps that turn', 'ideas into reality.'] as const,
  intro: `I'm ${profile.firstName}, a ${profile.role} with ${profile.yearsOfExperience}+ years of turning messy requirements into fast, reliable products — from polished React interfaces to the ASP.NET Core APIs and SQL databases behind them.`,
  stats: [
    { value: `${profile.yearsOfExperience}+`, label: 'years shipping production software' },
    { value: 'End-to-end', label: 'UI, APIs & databases' },
    { value: 'Web & mobile', label: 'apps and side projects' },
  ],
}

export const about = {
  paragraphs: [
    `I started writing code because I wanted to build things people actually use — and ${profile.yearsOfExperience}+ years later that is still what gets me going. Professionally I work across the whole stack: React and TypeScript on the front, ASP.NET Core Web APIs and C# in the middle, SQL Server and Entity Framework Core underneath.`,
    'I care about the details that make software feel good: interfaces that respond instantly, APIs with clear contracts, validations that catch problems before users do, and code the next developer can pick up without a map.',
    'Outside of work I am usually building something — an Android utility, a shopping app to try a new state library, or a small tool that scratches an everyday itch. Side projects are how I learn: pick a new technology, ship something real with it, keep what works.',
  ],
  highlights: [
    { title: 'Product mindset', text: 'I start from the user problem, not the tech, and ship in small, useful increments.' },
    { title: 'End-to-end ownership', text: 'Comfortable owning a feature from database schema to deployed UI.' },
    { title: 'Always learning', text: 'New framework, new platform, new pattern — I learn it by building with it.' },
    { title: 'Clean & scalable', text: 'Reusable components, typed contracts and code that grows with the team.' },
  ],
  /** Shown as a little JSON file next to your photo. Keep it light and personal. */
  funFacts: {
    currentlyLearning: ['AI-powered apps', 'Kotlin Multiplatform'],
    favoriteStack: 'React + ASP.NET Core',
    editorTheme: 'dark, obviously',
    sideProjectsInProgress: 2,
    fuel: 'coffee',
  } as Record<string, string | number | string[]>,
}

export type TechCategory = 'Frontend' | 'Backend' | 'Data' | 'Cloud & Tools'

export interface Tech {
  id: TechId
  name: string
  category: TechCategory
  note: string
}

/** The featured tiles in the Tech Stack section. */
export const techStack: Tech[] = [
  { id: 'react', name: 'React', category: 'Frontend', note: 'Component-driven UIs, hooks, performance tuning' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', note: 'Strictly typed apps and shared API contracts' },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', note: 'Modern ES features, async patterns, the DOM' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', note: 'Design systems and responsive layouts, fast' },
  { id: 'redux', name: 'Redux', category: 'Frontend', note: 'Predictable global state for large apps' },
  { id: 'zustand', name: 'Zustand', category: 'Frontend', note: 'Lightweight stores with persistence' },
  { id: 'dotnet', name: '.NET Core', category: 'Backend', note: 'ASP.NET Core Web APIs, middleware, DI' },
  { id: 'csharp', name: 'C#', category: 'Backend', note: 'LINQ, async/await, clean architecture' },
  { id: 'sqlserver', name: 'SQL Server', category: 'Data', note: 'Schema design, stored procedures, query tuning' },
  { id: 'docker', name: 'Docker', category: 'Cloud & Tools', note: 'Containerised services and local environments' },
  { id: 'azure', name: 'Azure', category: 'Cloud & Tools', note: 'App Service, Static Web Apps, DevOps pipelines' },
  { id: 'git', name: 'Git', category: 'Cloud & Tools', note: 'Branching strategies, reviews, clean history' },
]

/** Smaller "also fluent in" chips, grouped by category. */
export const moreSkills: Record<TechCategory, string[]> = {
  Frontend: ['HTML5', 'CSS3', 'SCSS', 'Material UI', 'Bootstrap', 'Context API'],
  Backend: ['ASP.NET Core Web API', 'REST APIs', 'GraphQL'],
  Data: ['MySQL', 'Entity Framework Core'],
  'Cloud & Tools': ['JIRA', 'CI/CD'],
}

export type MockupKind = 'timebooking' | 'ecommerce' | 'gallery'

export interface Project {
  name: string
  tagline: string
  description: string
  tech: string[]
  highlights: string[]
  /** Built-in illustrated mockup. Set `image` to show a real screenshot instead. */
  mockup: MockupKind
  image?: string
  github?: string
  live?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'Consultant Time Booking System',
    tagline: 'Full-stack business application',
    description:
      'A web platform for managing consultants, projects and time bookings end-to-end — consultants log hours, managers review and approve them, and business rules keep every entry valid before it reaches billing.',
    tech: ['React', 'TypeScript', 'ASP.NET Core', 'C#', 'EF Core', 'SQL Server'],
    highlights: ['Approval workflows', 'Business-rule validation', 'Role-based views'],
    mockup: 'timebooking',
    github: 'https://github.com/your-github-username/consultant-time-booking', // TODO
    featured: true,
  },
  {
    name: 'E-commerce App',
    tagline: 'React storefront',
    description:
      'A React shopping experience with product listings, rich product detail pages and a cart that survives page reloads — powered by a Zustand store with persistence.',
    tech: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS'],
    highlights: ['Persistent cart', 'Product detail pages', 'Zustand state'],
    mockup: 'ecommerce',
    github: 'https://github.com/your-github-username/ecommerce-app', // TODO
    live: '', // TODO: add a live demo URL if you have one
  },
  {
    name: 'Status Gallery',
    tagline: 'Android utility app',
    description:
      'An Android app that shows your WhatsApp Status photos and videos — and nothing else. You grant one folder once; a scoring validator rejects anything that is not a real Status folder, so the app never wanders into your camera roll.',
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'Coroutines', 'Media3'],
    highlights: ['No media permissions', 'MVVM / clean architecture', 'Video playback & sharing'],
    mockup: 'gallery',
    github: 'https://github.com/your-github-username/status-gallery', // TODO
  },
]

export const statusGalleryIconUrl = statusGalleryIcon

export const moreProjects = {
  title: 'More in the workshop',
  text: 'Future apps and experiments I am building or exploring next.',
  ideas: ['AI-assisted developer tools', 'Small SaaS experiments', 'Everyday utility apps', 'Open-source UI components'],
}

export type Focus = 'Frontend' | 'Backend' | 'APIs' | 'Database' | 'Full Stack' | 'Mobile' | 'DevOps'

export interface Experience {
  role: string
  company: string
  period: string
  summary: string
  achievements: string[]
  focus: Focus[]
  stack: string[]
}

// TODO: replace company names, dates and bullets with your real history.
// Concrete numbers ("cut page load by 40%") make these far more convincing.
export const experience: Experience[] = [
  {
    role: 'Full Stack .NET Developer',
    company: 'Company Name',
    period: '2024 — Present',
    summary: 'Building and scaling business-critical web applications across React front-ends and ASP.NET Core services.',
    achievements: [
      'Delivered a consultant time-booking platform with approval workflows, role-based access and server-side business validations.',
      'Designed REST APIs in ASP.NET Core with EF Core and SQL Server, keeping contracts typed end-to-end with TypeScript.',
      'Built reusable React component patterns that sped up delivery of new screens across the product.',
      'Tuned slow queries and API endpoints by profiling SQL and reshaping data access.',
    ],
    focus: ['Full Stack', 'APIs', 'Database'],
    stack: ['React', 'TypeScript', '.NET Core', 'C#', 'SQL Server', 'Azure'],
  },
  {
    role: 'Software Developer',
    company: 'Company Name',
    period: '2022 — 2024',
    summary: 'Worked across front-end features and back-end integrations for client-facing web applications.',
    achievements: [
      'Built responsive UIs with React, Redux and Material UI, from design specs to production.',
      'Integrated internal and third-party REST / GraphQL APIs with robust loading and error states.',
      'Wrote stored procedures and EF Core data layers on SQL Server and MySQL.',
      'Containerised services with Docker and delivered in Agile sprints tracked in JIRA.',
    ],
    focus: ['Frontend', 'APIs', 'Backend'],
    stack: ['React', 'Redux', 'Material UI', 'ASP.NET Core', 'MySQL', 'Docker'],
  },
  {
    role: 'Independent Builder',
    company: 'Side projects',
    period: 'Always on',
    summary: 'Shipping my own apps to learn new platforms and solve everyday problems.',
    achievements: [
      'Built Status Gallery, a privacy-first Android app in Kotlin and Jetpack Compose.',
      'Built an e-commerce storefront to explore Zustand, persistence and modern React patterns.',
    ],
    focus: ['Mobile', 'Frontend'],
    stack: ['Kotlin', 'Jetpack Compose', 'React', 'Zustand'],
  },
]

export type PassionIcon = 'globe' | 'smartphone' | 'terminal' | 'wrench' | 'layers' | 'sparkles' | 'lightbulb'

export const passions: { icon: PassionIcon; title: string; text: string }[] = [
  { icon: 'globe', title: 'Web applications', text: 'Fast, accessible, responsive apps people enjoy using every day.' },
  { icon: 'smartphone', title: 'Mobile apps', text: 'Native Android experiences that feel at home on the device.' },
  { icon: 'terminal', title: 'Developer tools', text: 'Tools that remove friction from the way developers work.' },
  { icon: 'wrench', title: 'Utility apps', text: 'Focused apps that do one job — and do it really well.' },
  { icon: 'layers', title: 'SaaS products', text: 'Products with real workflows, roles and multi-tenant data.' },
  { icon: 'sparkles', title: 'AI-powered apps', text: 'Putting LLMs to work on real problems, not just demos.' },
  { icon: 'lightbulb', title: 'Everyday side projects', text: 'Small ideas that make ordinary tasks a little easier.' },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const
