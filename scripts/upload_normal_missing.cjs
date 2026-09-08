const fs = require('fs');
const path = require('path');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';
const pubDir = path.resolve(__dirname, '../public');

const files = [
  'pics/Films/Moothon/Moothon-film-Reviews-and-Ratings.jpg',
  'pics/Films/Pagalpanti/Pagalpanti-Reviews-and-Ratings.jpg',
  'pics/Films/Peranbu/Peranbu-film-Reviews-and-Ratings.jpg',
  'pics/Films/PokemonDetectivePikachu/1.jpg',
  'pics/Films/SahebBiwiAurGangster3/Saheb-Biwi-Aur-Gangster-3-Hot-Reviews-and-Ratings.jpg',
  'pics/Films/Sakhavu/1.jpg',
  'pics/Films/Sandakozhi2/Sandakozhi-2-Cast-Movie-Reviews-and-Ratings.jpg',
  'pics/Films/Sandakozhi2/Sandakozhi-2-Movie-Reviews-and-Ratings.jpg',
  'pics/Films/Sanju/Sanju-3.jpg',
  'pics/Films/Sarbjit/3.jpg',
  'pics/Films/Sarkar/Sarkar-Cast-Movie-Reviews-and-Ratings.jpg',
  'pics/Films/Sarkar 3/1.jpg',
  'pics/Films/Sarrainodu/2.jpg',
  'pics/Films/The Girl on the Train/3.jpg',
  'pics/Films/YADVITheDignifiedPrincess/2.jpg',
  'pics/home/2.jpg',
  'pics/Serieses/PatiPatniAurWoh/S01/Ep03.jpg',
  'pics/Serieses/RejctX/2.jpg'
];

function getMime(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

async function uploadOne(key) {
  const filePath = path.join(pubDir, key);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }
  const mime = getMime(key);
  const fileBuffer = fs.readFileSync(filePath);
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${encodeURIComponent(key)}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'X-Project-Id': PROJ_ID,
          'Content-Type': mime
        },
        body: fileBuffer
      });
      if (res.status === 200 || res.status === 201) {
        console.log(`[SUCCESS ${res.status}] ${key}`);
        return true;
      } else {
        const text = await res.text();
        console.warn(`[WARN attempt ${attempt}] ${key}: ${res.status} - ${text}`);
      }
    } catch (e) {
      console.error(`[ERROR attempt ${attempt}] ${key}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log(`Uploading ${files.length} normal missing files...`);
  let success = 0;
  for (const f of files) {
    const ok = await uploadOne(f);
    if (ok) success++;
  }
  console.log(`\nFinished: ${success} / ${files.length} uploaded successfully.`);
}

main();
