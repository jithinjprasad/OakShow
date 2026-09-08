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
  console.log('Listing all objects from Scalix bucket oakshow-media...');

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
    console.log(`Prefix "${p}": found ${objs.length} objects (total unique: ${remoteKeys.size})`);
  }

  console.log(`\nTotal unique objects in Scalix oakshow-media bucket: ${remoteKeys.size}`);

  // Now scan local public/
  const localFiles = [];
  function scan(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) scan(full);
      else if (/\.(jpg|jpeg|png|webp|gif|svg|ico)$/i.test(ent.name)) {
        const rel = path.relative(pubDir, full).split(path.sep).join('/');
        localFiles.push(rel);
      }
    }
  }
  scan(pubDir);
  console.log(`Total media files in public: ${localFiles.length}`);

  const actuallyMissing = localFiles.filter(f => !remoteKeys.has(f));
  console.log(`\nACTUALLY MISSING FROM SCALIX BUCKET: ${actuallyMissing.length}`);

  const specialChars = actuallyMissing.filter(f => /['+!$@&()]/.test(f));
  const normalMissing = actuallyMissing.filter(f => !/['+!$@&()]/.test(f));

  console.log(`- With special characters: ${specialChars.length}`);
  console.log(`- Normal missing files: ${normalMissing.length}`);

  if (normalMissing.length > 0) {
    console.log('\nNormal missing files list:');
    console.log(normalMissing);
  }

  fs.writeFileSync(path.join(__dirname, 'scalix_actual_missing.json'), JSON.stringify(actuallyMissing, null, 2));
}

main().catch(console.error);
