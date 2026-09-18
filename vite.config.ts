import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH lets the same build work on a custom domain / Azure Static Web Apps ("/")
// and on a GitHub Pages project site ("/<repo-name>/"). The Pages workflow sets it for you.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
  },
})
