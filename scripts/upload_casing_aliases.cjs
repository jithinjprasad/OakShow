const fs = require('fs');
const path = require('path');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';
const pubDir = path.resolve(__dirname, '../public');

const files = [
  'pics/Films/AStarisBorn/1.jpg',
  'pics/Films/Madhuraraja/1.jpg',
  'pics/Films/AvengersEndGame/1.jpg',
  'pics/Films/102NotOut/3.jpg',
  'pics/Films/Beauty and the Beast/2.jpg',
  'pics/Films/RajatheGreat/1.jpg',
  'pics/Films/RajatheGreat/4.jpg',
  'pics/Films/RajatheGreat/2.jpg',
  'pics/Films/RajatheGreat/3.jpg',
  'pics/Films/EnglandisMine/1.jpg',
  'pics/Films/EnglandisMine/4.jpg',
  'pics/Films/EnglandisMine/2.jpg',
  'pics/Films/EnglandisMine/3.jpg',
  'pics/Films/Aa Gaya Hero/4.JPG',
  'pics/Films/Aa Gaya Hero/2.JPG',
  'pics/Films/Aa Gaya Hero/3.JPG',
  'pics/Films/YenInthamayakam/1.jpg',
  'pics/Films/Arrival/4.JPG',
  'pics/Films/Loving/4.JPG',
  'pics/Films/Manchester by the Sea/4.JPG',
  'pics/Films/Sully/4.jpg',
  'pics/Films/Nocturnal Animals/4.JPG',
  'pics/Films/Fantastic Beasts and Where to Find Them/4.JPG',
  'pics/Films/1920 London/2.jpg',
  'pics/Films/Almost Christmas/4.JPG',
  'pics/Films/Azhar/4.jpg',
  'pics/Films/Bounty Hunters/4.jpg',
  'pics/Films/Bounty Hunters/2.jpg',
  'pics/Films/Bounty Hunters/3.jpg',
  'pics/Films/Equals/3.jpg',
  'pics/Films/Fever/2.jpg',
  'pics/Films/Finding Dory/4.jpg',
  'pics/Films/Finding Dory/3.jpg',
  'pics/Films/Genius/2.jpg',
  'pics/Films/Ghostbusters/3.jpg',
  'pics/Films/Idhu Namma Aalu/4.jpg',
  'pics/Films/Idhu Namma Aalu/2.jpg',
  'pics/Films/Iraivi/2.jpg',
  'pics/Films/Junooniyat/2.jpg',
  'pics/Films/Junooniyat/3.jpg',
  'pics/Films/Lights Out/2.jpg',
  'pics/Films/Lights Out/3.jpg',
  'pics/Films/Madaari/4.jpg',
  'pics/Films/Madaari/3.jpg',
  'pics/Films/Now You See Me 2/4.jpg',
  'pics/Films/One Night Stand/2.jpg',
  'pics/Films/One Night Stand/3.jpg',
  'pics/Films/Phobia/2.jpg',
  'pics/Films/Star Trek Beyond/3.jpg',
  'pics/Films/The Infiltrator/3.jpg',
  'pics/Films/The Neon Demon/4.jpg',
  'pics/Films/The Neon Demon/3.jpg',
  'pics/Films/Voyage of Time/4.JPG',
  'pics/Films/The Monster/4.JPG',
  'pics/Films/American Pastoral/4.JPG',
  'pics/Films/Incarnate/4.JPG',
  'pics/Films/Incarnate/2.JPG',
  'pics/Films/Incarnate/3.JPG',
  'pics/Films/Billy Lynns Long Halftime Walk/4.JPG',
  'pics/Films/Shut In/4.JPG',
  'pics/Films/Half Girlfriend/Songs/1.JPG',
  'pics/Films/Marauders/4.jpg',
  'pics/Films/Marauders/2.jpg',
  'pics/Films/Marauders/3.jpg',
  'pics/Films/Last Days in the Desert/1.jpg',
  'pics/Films/UNindian/1.jpg',
  'pics/Films/Marauders/1.jpg',
  'pics/Films/Madaari/1.jpg',
  'pics/Films/Veerappan/1.jpg',
  'pics/Films/Waiting/1.jpg',
  'pics/Films/Banjo/1.jpg',
  'pics/Serieses/Sherlock/2.JPG'
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
    console.error(`Not found locally: ${filePath}`);
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
  console.log(`Uploading ${files.length} casing-alias files...`);
  let success = 0;
  for (const f of files) {
    const ok = await uploadOne(f);
    if (ok) success++;
  }
  console.log(`\nFinished: ${success} / ${files.length} uploaded successfully.`);
}

main();
