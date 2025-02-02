import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-transform-import-meta', { module: 'ES6' }]
        ]
      }
    })
  ],
  optimizeDeps: {
    include: ['lucide-react']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false
      }
    }
  }
}));