const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /pics\/Films\/Assassin's Creed/g, to: 'pics/Films/Assassins Creed' },
  { from: /pics\/Films\/Big Fish & Begonia/g, to: 'pics/Films/Big Fish and Begonia' },
  { from: /pics\/Films\/Big Fish &amp; Begonia/g, to: 'pics/Films/Big Fish and Begonia' },
  { from: /pics\/Films\/Billy Lynn's Long Halftime Walk/g, to: 'pics/Films/Billy Lynns Long Halftime Walk' },
  { from: /pics\/Films\/Bridget Jones's Baby/g, to: 'pics/Films/Bridget Joness Baby' },
  { from: /pics\/Films\/Don't Breathe/g, to: 'pics/Films/Dont Breathe' },
  { from: /pics\/Films\/I'm Not Ashamed/g, to: 'pics/Films/Im Not Ashamed' },
  { from: /pics\/Films\/Maggie's Plan/g, to: 'pics/Films/Maggies Plan' },
  { from: /pics\/Films\/Miss Peregrine's Home for Peculiar Children/g, to: 'pics/Films/Miss Peregrines Home for Peculiar Children' },
  { from: /pics\/Films\/mother!\//g, to: 'pics/Films/mother/' },
  { from: /pics\/Films\/Oceans8\/Ocean's8/g, to: 'pics/Films/Oceans8/Oceans8' },
  { from: /pics\/Films\/PattiCake\$/g, to: 'pics/Films/PattiCake' },
  { from: /pics\/Films\/Pete's Dragon/g, to: 'pics/Films/Petes Dragon' },
  { from: /pics\/Films\/Rules Don't Apply/g, to: 'pics/Films/Rules Dont Apply' },
  { from: /pics\/Films\/San' 75/g, to: 'pics/Films/San 75' },
  { from: /pics\/Films\/The Zookeeper's Wife/g, to: 'pics/Films/The Zookeepers Wife' },
  { from: /pics\/Films\/The%20Zookeeper's%20Wife/g, to: 'pics/Films/The Zookeepers Wife' },
  { from: /images\/google\+\.png/g, to: 'images/google-plus.png' }
];

function updateDir(dir, filter) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let modified = 0;
  for (const ent of entries) {
    if (ent.isFile() && filter(ent.name)) {
      const fullPath = path.join(dir, ent.name);
      const original = fs.readFileSync(fullPath, 'utf8');
      let updated = original;
      for (const r of replacements) {
        updated = updated.replace(r.from, r.to);
      }
      if (updated !== original) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        modified++;
      }
    }
  }
  return modified;
}

console.log('Updating data/*.json...');
const modifiedData = updateDir(path.resolve(__dirname, '../data'), n => n.endsWith('.json'));
console.log(`Modified ${modifiedData} JSON files in data/`);

console.log('Updating root *.html...');
const modifiedHtml = updateDir(path.resolve(__dirname, '..'), n => n.endsWith('.html'));
console.log(`Modified ${modifiedHtml} HTML files in root`);
