import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const pubDir = path.resolve(rootDir, 'public');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET  = 'oakshow-media';

const CHECKPOINT_FILE = path.resolve(__dirname, '.scalix-upload-checkpoint.json');

const MIME_MAP = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_MAP[ext] || 'application/octet-stream';
}

function loadCheckpoint() {
  try {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      const data = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
      return new Set(data);
    }
  } catch (e) {
    console.warn('Could not read checkpoint file, starting fresh.');
  }
  return new Set();
}

function saveCheckpoint(uploadedSet) {
  try {
    fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(Array.from(uploadedSet)), 'utf8');
  } catch (e) {
    console.warn('Error saving checkpoint:', e.message);
  }
}

async function uploadFileWithRetry(filePath, key, maxRetries = 3) {
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${encodeURIComponent(key)}`;
  const buffer = fs.readFileSync(filePath);
  const mime = getMimeType(filePath);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'X-Project-Id': PROJ_ID,
          'Content-Type': mime
        },
        body: buffer
      });

      if (res.ok) {
        return true;
      }

      if (res.status === 429) {
        const retrySec = parseInt(res.headers.get('retry-after') || '2', 10);
        await new Promise(r => setTimeout(r, (retrySec + 1) * 1000));
        continue;
      }

      const errText = await res.text();
      if (attempt === maxRetries) {
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      await new Promise(r => setTimeout(r, attempt * 1000));
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(r => setTimeout(r, attempt * 1000));
    }
  }
  return false;
}

async function main() {
  console.log('=== Scalix Storage OakShow Media Uploader ===');
  console.log(`Target Bucket: ${BUCKET}`);
  console.log(`Public Dir: ${pubDir}`);

  const uploadedSet = loadCheckpoint();
  console.log(`Loaded ${uploadedSet.size} previously uploaded files from checkpoint.`);

  const files = [];
  function scan(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scan(full);
      } else {
        const ext = path.extname(ent.name).toLowerCase();
        if (MIME_MAP[ext]) {
          const rel = path.relative(pubDir, full).replace(/\\/g, '/');
          files.push({ full, key: rel, size: fs.statSync(full).size });
        }
      }
    }
  }

  scan(pubDir);
  console.log(`Discovered ${files.length} media files in ${pubDir}.`);

  const pending = files.filter(f => !uploadedSet.has(f.key));
  console.log(`Pending uploads: ${pending.length} files (${(pending.reduce((a, b) => a + b.size, 0) / (1024 * 1024)).toFixed(2)} MB).`);

  if (pending.length === 0) {
    console.log('All files are already uploaded!');
    return;
  }

  const CONCURRENCY = 25;
  let idx = 0;
  let completedCount = 0;
  let errorCount = 0;
  const startTime = Date.now();

  let lastSave = Date.now();

  async function worker() {
    while (idx < pending.length) {
      const current = pending[idx++];
      try {
        await uploadFileWithRetry(current.full, current.key);
        uploadedSet.add(current.key);
        completedCount++;

        if (completedCount % 100 === 0 || completedCount === pending.length) {
          const elapsedSec = (Date.now() - startTime) / 1000;
          const rate = (completedCount / elapsedSec).toFixed(1);
          const percent = ((completedCount / pending.length) * 100).toFixed(1);
          const remainingSec = Math.round((pending.length - completedCount) / parseFloat(rate || 1));
          console.log(`[${completedCount}/${pending.length}] (${percent}%) @ ${rate} files/sec - ETA: ${remainingSec}s - Current: ${current.key}`);
        }

        if (Date.now() - lastSave > 10000) {
          saveCheckpoint(uploadedSet);
          lastSave = Date.now();
        }
      } catch (err) {
        errorCount++;
        console.error(`Failed to upload ${current.key}: ${err.message}`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  saveCheckpoint(uploadedSet);
  const totalSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n=== UPLOAD FINISHED in ${totalSec}s ===`);
  console.log(`Successfully uploaded: ${completedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total in bucket checkpoint: ${uploadedSet.size}`);
}

main().catch(err => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});
