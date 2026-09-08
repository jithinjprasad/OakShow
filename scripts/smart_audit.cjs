const fs = require('fs');
const path = require('path');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';
const pubDir = path.resolve(__dirname, '../public');

async function listPrefix(prefix) {
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects?prefix=${encodeURIComponent(prefix)}&limit=10000`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID
    }
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function main() {
  console.log('Fetching all objects in Scalix bucket...');
  const prefixes = [
    'pics/Films/',
    'pics/Serieses/',
    'pics/RatingSiteLogos/',
    'pics/BookngWebSiteLogos/',
    'pics/WatchOnline/',
    'pics/',
    'Galleries/',
    'Profiles/',
    'images/',
    'assets/',
    'basic/',
    'blog/',
    'news/',
    'favicon'
  ];

  const remoteKeys = new Set();
  for (const p of prefixes) {
    const objs = await listPrefix(p);
    for (const o of objs) {
      remoteKeys.add(o.key);
      remoteKeys.add(decodeURIComponent(o.key));
    }
  }
  console.log(`Total objects in Scalix oakshow-media: ${remoteKeys.size}`);

  const dataDir = path.resolve(__dirname, '../data');
  const referenced = new Set();

  for (const f of fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))) {
    const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
    const matches = content.matchAll(/"([^"\n]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))"/gi);
    for (const m of matches) {
      let key = m[1].trim().replace(/^[/\\]+/, '');
      if (!key.startsWith('http://') && !key.startsWith('https://')) {
        referenced.add(key);
      }
    }
  }

  const genuinelyMissing = [];
  const missingButExistsLocally = [];
  const missingAndNotFoundLocally = [];

  function safeDecode(s) {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  }

  for (const ref of referenced) {
    const decoded = safeDecode(ref).replace(/\\n/g, '').trim();
    if (!remoteKeys.has(ref) && !remoteKeys.has(decoded)) {
      const localPath = path.join(pubDir, decoded);
      if (fs.existsSync(localPath)) {
        missingButExistsLocally.push(decoded);
      } else {
        missingAndNotFoundLocally.push(ref);
      }
    }
  }

  console.log(`\nReferenced items missing from bucket BUT exist locally: ${missingButExistsLocally.length}`);
  missingButExistsLocally.forEach(f => console.log(' - ' + f));

  console.log(`\nReferenced items missing from bucket AND NOT in local public/: ${missingAndNotFoundLocally.length}`);
  missingAndNotFoundLocally.forEach(f => console.log(' - ' + f));
}

main();
