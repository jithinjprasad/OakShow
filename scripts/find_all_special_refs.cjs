const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

const specialRefs = new Set();
for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const regex = /"([^"\n]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))"/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const s = m[1];
    if (/['+!$@&()]/.test(s)) {
      specialRefs.add(`${file} ::: ${s}`);
    }
  }
}

console.log('Total special refs in data/*.json:', specialRefs.size);
for (const r of Array.from(specialRefs).sort()) {
  console.log(r);
}
