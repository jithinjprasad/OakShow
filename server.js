/**
 * OakShow production static server for Scalix Run (Node runtime).
 *
 * Scalix's source-build detects Node via package.json: it runs `npm ci`,
 * then `npm run build` (vite build + SSG -> dist/), then `npm start`.
 * The platform injects PORT and expects the process to bind 0.0.0.0.
 *
 * `dist/` is self-contained after build (Vite assets + public/ media +
 * prerendered HTML pages), so we only need to serve that directory with
 * SPA fallback for clean (extensionless) URLs.
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const ROOT = path.resolve(process.cwd(), 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

const TEXT_TYPES = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.ico']);
const CACHE_ASSETS = new Set(['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.eot']);

const GZIP = new Map(); // not used; see below

const server = http.createServer((req, res) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';

  let urlPath = req.url.split('?')[0].split('#')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const decoded = decodeURIComponent(urlPath);
  let filePath = path.normalize(path.join(ROOT, decoded));

  // Prevent escaping the dist root
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
      if (CACHE_ASSETS.has(ext)) {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      } else {
        headers['Cache-Control'] = 'no-store';
      }

      if (TEXT_TYPES.has(ext) && acceptEncoding.includes('gzip')) {
        headers['Content-Encoding'] = 'gzip';
        headers['Vary'] = 'Accept-Encoding';
        const stream = fs.createReadStream(filePath);
        stream.pipe(zlib.createGzip()).pipe(res.writeHead(200, headers), { end: true }).end();
        return;
      }

      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback: extensionless routes (and anything not matching a real file)
    // are served index.html so the client-side hash router can resolve them.
    if (!ext) {
      const idx = path.join(ROOT, 'index.html');
      const indexHeaders = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' };
      if (acceptEncoding.includes('gzip')) {
        indexHeaders['Content-Encoding'] = 'gzip';
        indexHeaders['Vary'] = 'Accept-Encoding';
        fs.createReadStream(idx).pipe(zlib.createGzip()).pipe(res.writeHead(200, indexHeaders), { end: true }).end();
        return;
      }
      res.writeHead(200, indexHeaders);
      fs.createReadStream(idx).pipe(res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`OakShow static server listening on 0.0.0.0:${PORT} (root: ${ROOT})`);
});
