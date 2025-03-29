import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

const mode = process.env.VITE_NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd());
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
