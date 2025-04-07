import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/products': {
        target: 'http://localhost:3010',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: '../dist', // Build to parent directory
    sourcemap: true,
  }
});
