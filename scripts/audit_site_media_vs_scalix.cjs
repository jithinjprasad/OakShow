const fs = require('fs');
const path = require('path');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

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
    }
  }
  console.log(`Total objects in Scalix oakshow-media: ${remoteKeys.size}`);

  // Now scan all referenced media in data/*.json
  const dataDir = path.resolve(__dirname, '../data');
  const referenced = new Set();

  for (const f of fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))) {
    const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
    const matches = content.matchAll(/"([^"\n]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))"/gi);
    for (const m of matches) {
      let key = m[1].replace(/^[/\\]+/, '');
      // Only check media that are relative paths, not external http URLs
      if (!key.startsWith('http://') && !key.startsWith('https://')) {
        referenced.add(key);
      }
    }
  }

  console.log(`Total unique media referenced in data/*.json: ${referenced.size}`);

  const missingFromBucket = [];
  for (const ref of referenced) {
    if (!remoteKeys.has(ref)) {
      missingFromBucket.push(ref);
    }
  }

  console.log(`\nReferenced media missing from Scalix bucket: ${missingFromBucket.length}`);
  if (missingFromBucket.length > 0) {
    console.log('Missing items:');
    missingFromBucket.forEach(m => console.log(' - ' + m));
  } else {
    console.log('🎉 100% of media referenced by the site is present in the Scalix bucket!');
  }
}

main();
