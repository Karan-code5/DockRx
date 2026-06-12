import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base: '/' → Vercel deployment (root domain)
// base: '/DockRx/' → GitHub Pages sub-path (not used)
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 5173 }
})
