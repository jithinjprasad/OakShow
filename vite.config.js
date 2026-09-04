import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback-for-html-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url &&
            req.url.endsWith('.html') &&
            !req.url.startsWith('/index.html') &&
            !req.url.startsWith('/@') &&
            !req.url.startsWith('/src/')
          ) {
            req.url = '/index.html';
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    host: true,
    open: false,
    watch: {
      ignored: ['**/pics/**', '**/dist/**']
    },
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
