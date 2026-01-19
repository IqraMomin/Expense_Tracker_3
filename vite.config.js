import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                // allows using "describe", "it", "expect" globally
    environment: 'jsdom',         // simulates a browser environment
    setupFiles: './src/setupTests.js', // runs before tests (for jest-dom setup)
  },
})
