import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

const mode = process.env.VITE_NODE_ENV || 'development';
process.env = {...process.env, ...loadEnv(mode, process.cwd())};
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
