const http = require('http');

const testRoutes = [
  '#/international',
  '#/releases',
  '#/reviews',
  '#/news',
  '#/blog',
  '#/galleries',
  '#/music',
  '#/sports',
  '#/games',
  '#/books',
  '#/events',
  '#/trailers',
  '#/emergencies',
  '#/copyright-policy'
];

console.log('=== VERIFYING ALL SECTIONS ROUTES & MODULES ===');

function checkRoute(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000/' + path, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, status: 'ERROR: ' + err.message });
    });
  });
}

async function run() {
  for (const r of testRoutes) {
    const res = await checkRoute(r);
    console.log(`- Route ${res.path.padEnd(22)}: Status ${res.status}`);
  }
  console.log('=== ALL SECTIONS ROUTE VERIFICATION COMPLETED ===');
}

run();
