import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import fs from 'fs';

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
    {
      name: 'serve-root-static-folders',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url &&
            (req.url.includes('?import') ||
              req.url.includes('&import') ||
              req.url.includes('?raw') ||
              req.url.includes('?url'))
          ) {
            return next();
          }
          const prefixes = [
            '/pics/',
            '/assets/',
            '/Profiles/',
            '/Galleries/',
            '/news/',
            '/images/',
            '/basic/',
            '/dbs/',
            '/data/',
            '/fonts/',
            '/Videos/',
          ];
          const urlPath = (req.url || '').split('?')[0];
          const isFavicon = urlPath === '/favicon.png' || urlPath === '/favicon.ico';
          if (prefixes.some((p) => urlPath.startsWith(p)) || isFavicon) {
            const localPath = path.join(process.cwd(), decodeURIComponent(urlPath));
            if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
              const ext = path.extname(localPath).toLowerCase();
              const mimeMap = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
                '.json': 'application/json',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
                '.mp4': 'video/mp4',
              };
              if (mimeMap[ext]) {
                res.setHeader('Content-Type', mimeMap[ext]);
              }
              res.setHeader('Cache-Control', 'public, max-age=86400');
              return fs.createReadStream(localPath).pipe(res);
            } else if (urlPath.startsWith('/pics/')) {
              // CDN fallback for pictures that were purged from local workspace
              res.writeHead(302, {
                Location: `https://cdn.jsdelivr.net/gh/jithinjprasad/OakShow@main${urlPath}`,
                'Cache-Control': 'public, max-age=2592000'
              });
              return res.end();
            }
          }
          next();
        });
      },
    },
  ],
  optimizeDeps: {
    entries: ['index.html'],
  },
  server: {
    port: 3000,
    host: true,
    open: false,
    watch: {
      ignored: [
        '**/pics/**', 
        '**/dist/**', 
        '**/assets/**',
        '**/*.html',
        '!**/index.html',
        '**/.git/**',
        '**/Profiles/**'
      ]
    },
    fs: {
      strict: false,
    },
  },
  build: {
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
