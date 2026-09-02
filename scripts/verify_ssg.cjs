const http = require('http');

function fetch(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const titleMatch = body.match(/<title>(.*?)<\/title>/);
        const ogImageMatch = body.match(/<meta\s+property="og:image"\s+content="([^"]*)"/);
        const canonicalMatch = body.match(/<link\s+rel="canonical"\s+href="([^"]*)"/);
        resolve({
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : null,
          canonical: canonicalMatch ? canonicalMatch[1] : null,
          ogImage: ogImageMatch ? ogImageMatch[1] : null
        });
      });
    });
  });
}

(async () => {
  console.log('--- 5Weddings.html ---');
  console.log(await fetch('http://localhost:3002/5Weddings.html'));

  console.log('--- Scam1992S1.html ---');
  console.log(await fetch('http://localhost:3002/Scam1992S1.html'));

  console.log('--- indian.html ---');
  console.log(await fetch('http://localhost:3002/indian.html'));

  console.log('--- index.html ---');
  console.log(await fetch('http://localhost:3002/index.html'));
})();
