const fs = require('fs');
const path = require('path');

const checkpointFile = path.join(__dirname, '.scalix-upload-checkpoint.json');
const checkpoint = new Set(JSON.parse(fs.readFileSync(checkpointFile, 'utf8')));
const pubDir = path.resolve(__dirname, '../public');

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
console.log('Total unuploaded in checkpoint:', unuploaded.length);
console.log(JSON.stringify(unuploaded, null, 2));
