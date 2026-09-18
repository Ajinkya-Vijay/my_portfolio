# Developer Portfolio

A fast, accessible portfolio built with **React 19 + TypeScript + Tailwind CSS v4 + Motion**, bundled by **Vite**.

- Dark theme by default with a light-mode toggle (remembers the visitor's choice, respects OS preference)
- Interactive hero code editor that types out real-looking TypeScript / C# snippets
- Filterable tech-stack grid, illustrated project mockups, experience timeline, contact form
- Scroll-reveal animations that respect `prefers-reduced-motion`
- SEO metadata, JSON-LD, sitemap, robots.txt, skip link, keyboard-friendly navigation
- Deploys as static files to **Azure Static Web Apps** or **GitHub Pages**

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Make it yours

Almost everything lives in **[`src/data/portfolio.ts`](src/data/portfolio.ts)**. Search it for `TODO`.

| What | Where |
| --- | --- |
| Name, role, years of experience, email, GitHub, LinkedIn | `profile` in `portfolio.ts` |
| Profile photo | Put `profile.jpg` in `public/`, then set `avatar: publicUrl('profile.jpg')` |
| Resume | Put your CV at `public/resume.pdf` |
| Hero headline and intro | `hero` |
| About text and the `about-me.json` fun facts | `about` |
| Tech stack tiles and "also fluent in" chips | `techStack`, `moreSkills` |
| Projects (GitHub / live links, real screenshots via `image`) | `projects` |
| Work history timeline | `experience` |
| Page title, description, social preview, canonical URL | `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| Colours | CSS variables at the top of `src/index.css` (`.dark` and `.light`) |

### Contact form

With `contactFormEndpoint` empty, submitting the form opens the visitor's email app with the message pre-filled.
To receive messages directly, create a free form on [Formspree](https://formspree.io) (or similar)
and paste its endpoint URL into `contactFormEndpoint`.

## Project structure

```
src/
  data/portfolio.ts          ← all content
  components/
    layout/                  Navbar (scroll progress, active section, theme toggle), Footer
    sections/                Hero, CodeWindow, About, TechStack, Projects, ProjectMockups,
                             Experience, Passions, Contact
    ui/                      primitives (Section, Reveal, ButtonLink, Chip), TechIcon, BrandIcons
  hooks/                     useTheme, useActiveSection
  index.css                  Tailwind v4 theme tokens + utilities
public/                      favicon, robots, sitemap, staticwebapp.config.json, resume.pdf
```

## Deploy

### GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy-github-pages.yml` builds and publishes the site.

The workflow builds with `BASE_PATH=/<repo-name>/` for project sites. If the repo is
`<username>.github.io` or you use a custom domain, change `BASE_PATH` to `/` in the workflow.

### Azure Static Web Apps

1. In the Azure Portal, create a **Static Web App** and connect it to this GitHub repo.
2. Use these build settings:
   - **Build preset:** React (or Custom)
   - **App location:** `/`
   - **Output location:** `dist`
3. Azure commits its own GitHub Actions workflow and deploys on every push.

`public/staticwebapp.config.json` adds security headers and long-lived caching for hashed assets.
