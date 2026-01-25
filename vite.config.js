import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add base URL for GitHub Pages/Vercel
  base: '/',
  // Ensure proper build settings
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Add this if you have chunk size warnings
    chunkSizeWarningLimit: 1600,
  }
})