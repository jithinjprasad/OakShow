const fs = require('fs');
const path = require('path');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';
const pubDir = path.resolve(__dirname, '../public');

const aliasMap = [
  { fromFile: 'pics/Films/Justice League/Posters/1.jpg', toKey: 'pics/Films/JusticeLeague/posters/1.jpg' },
  { fromFile: 'pics/Films/Khaidi No. 150/1.jpg', toKey: 'pics/Films/KhaidiNo150/1.jpg' },
  { fromFile: 'pics/Films/The Lego Batman Movie/1.jpg', toKey: 'pics/Films/TheLegoBatmanMovie/1.jpg' },
  { fromFile: 'pics/Films/Jason Bourne/1.jpg', toKey: 'pics/Films/JasonBourne/1.jpg' },
  { fromFile: 'pics/Films/GoodTime/1.jpg', toKey: 'pics/Films/Good Time/1.jpg' },
  { fromFile: 'pics/Films/CallMebyYourName/1.jpg', toKey: 'pics/Films/Call Me by Your Name/1.jpg' },
  { fromFile: 'pics/Films/La La Land/1.jpg', toKey: 'pics/Films/LaLaLand/1.jpg' },
  { fromFile: 'pics/RatingSiteLogos/rogerebert.ico', toKey: 'pics/RatingSiteLogos/roger-ebert.ico' },
  { fromFile: 'pics/RatingSiteLogos/hindustan-times.png', toKey: 'pics/RatingSiteLogos/hindus-tantimes.png' },
  { fromFile: 'pics/WatchOnline/hotstar.png', toKey: 'pics/WatchOnline/hot-star.png' },
  { fromFile: 'pics/RatingSiteLogos/behindwoods.png', toKey: 'pics/RatingSiteLogos/behind-woods.png' },
  { fromFile: 'pics/RatingSiteLogos/news-18.png', toKey: 'pics/RatingSiteLogos/news18.png' },
  { fromFile: 'pics/Films/Rogue One A Star Wars Story/1.jpg', toKey: 'pics/Films/RogueOneAStarWarsStory/1.jpg' },
  { fromFile: 'pics/WatchOnline/youtube.png', toKey: 'pics/WatchOnline/you-tube.png' },
  { fromFile: 'pics/Films/The Promise/1.jpg', toKey: 'pics/Films/The Promise/1.jpg' },
  { fromFile: 'Profiles/CriticProfiles/VishnuPc/pics/1.jpg', toKey: 'VishnuPc/pics/1.jpg' },
  { fromFile: 'Profiles/CriticProfiles/JithinJPrasad/pics/1.jpg', toKey: 'JithinJPrasad/pics/1.jpg' },
  { fromFile: 'Profiles/CriticProfiles/ManojAswin/pics/1.jpg', toKey: 'ManojAswin/pics/1.jpg' },
  { fromFile: 'Profiles/CriticProfiles/AbhijithAG/pics/1.jpg', toKey: 'AbhijithAG/pics/1.jpg' },
  { fromFile: 'Profiles/CriticProfiles/AchuthanKarnnan/pics/1.jpg', toKey: 'AchuthanKarnnan/pics/1.jpg' },
  { fromFile: 'Profiles/CriticProfiles/MsMrOakShow/pics/1.jpg', toKey: 'MsMrOakShow/pics/1.jpg' }
];

function getMime(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.ico') return 'image/x-icon';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function uploadOne(fromFile, toKey) {
  const filePath = path.join(pubDir, fromFile);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return false;
  }
  const mime = getMime(fromFile);
  const fileBuffer = fs.readFileSync(filePath);
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${encodeURIComponent(toKey)}`;

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
        console.log(`[SUCCESS ${res.status}] ${toKey}`);
        return true;
      } else {
        const text = await res.text();
        console.warn(`[WARN attempt ${attempt}] ${toKey}: ${res.status} - ${text}`);
      }
    } catch (e) {
      console.error(`[ERROR attempt ${attempt}] ${toKey}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log(`Uploading ${aliasMap.length} alias files...`);
  let success = 0;
  for (const a of aliasMap) {
    const ok = await uploadOne(a.fromFile, a.toKey);
    if (ok) success++;
  }
  console.log(`\nFinished: ${success} / ${aliasMap.length} alias files uploaded successfully.`);
}

main();
