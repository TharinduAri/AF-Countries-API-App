import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases you were using in tsconfig here
      // For example:
      // '@': '/src',
      // '@components': '/src/components',
    }
  }
})