const fs = require('fs');
const path = require('path');

const pubDir = path.resolve(__dirname, '../public');
const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

// Collect all media files in public
const allFiles = [];
function scan(d) {
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, ent.name);
    if (ent.isDirectory()) scan(full);
    else if (/\.(jpg|jpeg|png|webp|gif|svg|ico)$/i.test(ent.name)) {
      const rel = path.relative(pubDir, full).split(path.sep).join('/');
      allFiles.push({ full, key: rel });
    }
  }
}
scan(pubDir);
console.log(`Total local media files: ${allFiles.length}`);

async function checkFile(item) {
  // Try checking oakshow.in
  const url = 'https://oakshow.in/' + encodeURI(item.key);
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.ok) {
      return { ok: true, key: item.key };
    }
    return { ok: false, key: item.key, status: res.status, full: item.full };
  } catch (e) {
    return { ok: false, key: item.key, error: e.message, full: item.full };
  }
}

async function run() {
  const missing = [];
  const CONCURRENCY = 30;
  let idx = 0;
  let checked = 0;
  const start = Date.now();

  async function worker() {
    while (idx < allFiles.length) {
      const current = allFiles[idx++];
      const res = await checkFile(current);
      checked++;
      if (!res.ok) {
        missing.push(res);
      }
      if (checked % 500 === 0 || checked === allFiles.length) {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        const rate = (checked / elapsed).toFixed(1);
        console.log(`[${checked}/${allFiles.length}] Checked @ ${rate}/s - Missing so far: ${missing.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`\n=== Verification Complete in ${((Date.now() - start) / 1000).toFixed(1)}s ===`);
  console.log(`Total verified: ${checked}`);
  console.log(`Missing count: ${missing.length}`);

  fs.writeFileSync(path.join(__dirname, 'missing_media.json'), JSON.stringify(missing, null, 2));
  console.log('Saved missing media list to scripts/missing_media.json');

  // Categorize missing files:
  const withSpecialChars = missing.filter(m => /['+!$@&()]/.test(m.key));
  const normalMissing = missing.filter(m => !/['+!$@&()]/.test(m.key));

  console.log(`Missing with special chars: ${withSpecialChars.length}`);
  console.log(`Missing normal files (can be uploaded immediately): ${normalMissing.length}`);
  if (normalMissing.length > 0) {
    console.log('Normal missing files:', normalMissing.map(m => m.key));
  }
}

run().catch(console.error);
