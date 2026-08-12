import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is the GitHub Pages repo path in production, "/" in dev
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/zoto-demo/' : '/',
  plugins: [react()],
}))
