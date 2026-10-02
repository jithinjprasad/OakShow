const https = require('https');

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data: d }));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function main() {
  const home = await fetch('https://oakshow.in/');
  console.log('Homepage status:', home.status);
  const titleMatch = home.data.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'None');
  const scripts = [...home.data.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  console.log('Scripts:', scripts);
  const css = [...home.data.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(m => m[1]);
  console.log('Stylesheets:', css);

  // Test loading each stylesheet and script to make sure no 404s
  for (const s of scripts) {
    const full = s.startsWith('http') ? s : 'https://oakshow.in' + (s.startsWith('/') ? s : '/' + s);
    const r = await fetch(full);
    console.log(`Script ${s} -> Status: ${r.status}, Size: ${r.data ? r.data.length : 0}`);
  }

  for (const c of css) {
    if (c.includes('favicon')) continue;
    const full = c.startsWith('http') ? c : 'https://oakshow.in' + (c.startsWith('/') ? c : '/' + c);
    const r = await fetch(full);
    console.log(`CSS ${c} -> Status: ${r.status}, Size: ${r.data ? r.data.length : 0}`);
  }
}

main().catch(console.error);
