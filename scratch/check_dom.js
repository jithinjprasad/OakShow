const https = require('https');

https.get('https://oakshow.in/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = d.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'None');
    const scripts = [...d.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Scripts:', scripts);
    const css = [...d.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Stylesheets:', css);
  });
});
