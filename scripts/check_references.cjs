const fs = require('fs');
const path = require('path');

const pubDir = path.resolve(__dirname, '../public');
const checkpointFile = path.join(__dirname, '.scalix-upload-checkpoint.json');
const checkpoint = new Set(JSON.parse(fs.readFileSync(checkpointFile, 'utf8')));

const unuploaded = [];
function scan(d) {
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, ent.name);
    if (ent.isDirectory()) scan(full);
    else {
      const rel = path.relative(pubDir, full).split(path.sep).join('/');
      if (/\.(jpg|jpeg|png|webp|gif|svg|ico)$/i.test(ent.name) && !checkpoint.has(rel)) {
        unuploaded.push(rel);
      }
    }
  }
}
scan(pubDir);

console.log('Unuploaded files count:', unuploaded.length);

// Scan all html, json, js files in root and subdirs
const rootDir = path.resolve(__dirname, '..');
const codeFiles = [];
function scanCode(d) {
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === 'node_modules' || ent.name === 'dist' || ent.name === 'public') continue;
    const full = path.join(d, ent.name);
    if (ent.isDirectory()) scanCode(full);
    else if (/\.(html|json|js|jsx|ts|tsx|css)$/i.test(ent.name)) {
      codeFiles.push(full);
    }
  }
}
scanCode(rootDir);

const fileContents = codeFiles.map(f => ({
  file: path.relative(rootDir, f).split(path.sep).join('/'),
  content: fs.readFileSync(f, 'utf8')
}));

const results = [];
for (const target of unuploaded) {
  const matched = [];
  // search by full target, or basename
  const base = path.basename(target);
  const targetVariations = [
    target,
    encodeURI(target),
    target.replace(/'/g, '%27'),
    target.replace(/'/g, '&#39;'),
    target.replace(/&/g, '&amp;')
  ];

  for (const { file, content } of fileContents) {
    for (const v of targetVariations) {
      if (content.includes(v)) {
        matched.push({ file, match: v });
        break;
      }
    }
  }
  results.push({ target, matched });
}

const referenced = results.filter(r => r.matched.length > 0);
console.log('Referenced count:', referenced.length, 'out of', unuploaded.length);
for (const r of referenced) {
  console.log(`\nFile: ${r.target}`);
  for (const m of r.matched) {
    console.log(`  in ${m.file} (matched: ${m.match})`);
  }
}

const unreferenced = results.filter(r => r.matched.length === 0);
console.log('\nUnreferenced count:', unreferenced.length);
