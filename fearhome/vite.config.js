import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    __PAYLOAD_URL__: JSON.stringify(process.env.PAYLOAD_URL || 'https://content.fearlessint.com')
  },
  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, '../fearbackend/src'),
    },
  },
  server: {
    fs: {
      allow: ['..'], // allow access to parent folders (like ../fearbackend)
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          http: ['axios']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['axios']
  }
})