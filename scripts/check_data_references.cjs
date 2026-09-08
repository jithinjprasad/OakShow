const fs = require('fs');
const path = require('path');

const pubDir = path.resolve(__dirname, '../public');
const checkpoint = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, '.scalix-upload-checkpoint.json'), 'utf8')));

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

console.log('Unuploaded count:', unuploaded.length);

// Scan only data/ json files and check which ones are referenced
const dataDir = path.resolve(__dirname, '../data');
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).map(f => ({
  file: f,
  data: JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'))
}));

const dataStrMap = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).map(f => ({
  file: f,
  content: fs.readFileSync(path.join(dataDir, f), 'utf8')
}));

const results = [];
for (const u of unuploaded) {
  const matches = [];
  for (const { file, content } of dataStrMap) {
    if (content.includes(u) || content.includes(encodeURI(u))) {
      matches.push(file);
    }
  }
  results.push({ file: u, matches });
}

console.log('--- Referenced in data/*.json ---');
const matched = results.filter(r => r.matches.length > 0);
console.log(`Count: ${matched.length}`);
for (const m of matched) {
  console.log(`${m.file} -> ${m.matches.join(', ')}`);
}

console.log('\n--- NOT in data/*.json ---');
const unmatched = results.filter(r => r.matches.length === 0);
console.log(`Count: ${unmatched.length}`);
for (const u of unmatched) {
  console.log(u.file);
}
