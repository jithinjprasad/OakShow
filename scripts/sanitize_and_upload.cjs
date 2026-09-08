const fs = require('fs');
const path = require('path');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';
const pubDir = path.resolve(__dirname, '../public');

// 1. Folder mapping (source relative to public -> destination relative to public)
const folderCopies = [
  { from: "pics/Films/Assassin's Creed", to: "pics/Films/Assassins Creed" },
  { from: "pics/Films/Big Fish & Begonia", to: "pics/Films/Big Fish and Begonia" },
  { from: "pics/Films/Billy Lynn's Long Halftime Walk", to: "pics/Films/Billy Lynns Long Halftime Walk" },
  { from: "pics/Films/Bridget Jones's Baby", to: "pics/Films/Bridget Joness Baby" },
  { from: "pics/Films/Don't Breathe", to: "pics/Films/Dont Breathe" },
  { from: "pics/Films/I'm Not Ashamed", to: "pics/Films/Im Not Ashamed" },
  { from: "pics/Films/Maggie's Plan", to: "pics/Films/Maggies Plan" },
  { from: "pics/Films/Miss Peregrine's Home for Peculiar Children", to: "pics/Films/Miss Peregrines Home for Peculiar Children" },
  { from: "pics/Films/mother!", to: "pics/Films/mother" },
  { from: "pics/Films/PattiCake$", to: "pics/Films/PattiCake" },
  { from: "pics/Films/Pete's Dragon", to: "pics/Films/Petes Dragon" },
  { from: "pics/Films/Rules Don't Apply", to: "pics/Films/Rules Dont Apply" },
  { from: "pics/Films/San' 75", to: "pics/Films/San 75" },
  { from: "pics/Films/The Zookeeper's Wife", to: "pics/Films/The Zookeepers Wife" }
];

const fileCopies = [
  { from: "pics/Films/Oceans8/Ocean's82.jpg", to: "pics/Films/Oceans8/Oceans82.jpg" },
  { from: "pics/Films/Oceans8/Ocean's83.jpg", to: "pics/Films/Oceans8/Oceans83.jpg" },
  { from: "pics/Films/Oceans8/Ocean's84.jpg", to: "pics/Films/Oceans8/Oceans84.jpg" },
  { from: "images/google+.png", to: "images/google-plus.png" }
];

const filesToUpload = [];

// Copy folders
for (const fc of folderCopies) {
  const srcDir = path.join(pubDir, fc.from);
  const dstDir = path.join(pubDir, fc.to);
  if (!fs.existsSync(srcDir)) {
    console.warn(`Source folder does not exist: ${srcDir}`);
    continue;
  }
  if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir, { recursive: true });
  }
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.join(srcDir, file);
    if (fs.statSync(srcFile).isFile() && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
      const dstFile = path.join(dstDir, file);
      fs.copyFileSync(srcFile, dstFile);
      filesToUpload.push(`${fc.to}/${file}`);
    }
  }
}

// Copy individual files
for (const fc of fileCopies) {
  const srcFile = path.join(pubDir, fc.from);
  const dstFile = path.join(pubDir, fc.to);
  if (!fs.existsSync(srcFile)) {
    console.warn(`Source file does not exist: ${srcFile}`);
    continue;
  }
  const dir = path.dirname(dstFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(srcFile, dstFile);
  filesToUpload.push(fc.to);
}

console.log(`Prepared ${filesToUpload.length} sanitized files to upload:`);
filesToUpload.forEach(f => console.log(' - ' + f));

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
  console.log(`\nStarting upload of ${filesToUpload.length} sanitized files...`);
  let success = 0;
  for (const f of filesToUpload) {
    const ok = await uploadOne(f);
    if (ok) success++;
  }
  console.log(`\nUpload complete: ${success} / ${filesToUpload.length} files uploaded successfully.`);
}

main();
