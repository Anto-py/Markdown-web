import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Remplace "markdown-web" par le nom EXACT de TON dépôt
  base: '/markdown-web/',
  test: { environment: 'jsdom', setupFiles: './vitest.setup.ts' }
})
