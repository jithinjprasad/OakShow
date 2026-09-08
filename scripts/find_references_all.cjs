const fs = require('fs');
const path = require('path');

const missing = JSON.parse(fs.readFileSync(path.join(__dirname, 'scalix_actual_missing.json')));
const special = missing.filter(f => /['+!$@&()]/.test(f));

// Let's inspect where these folder names or files appear in data/ and *.html
const filesToSearch = [];

function addFiles(dir, extFilter) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git' && ent.name !== 'dist') {
        addFiles(full, extFilter);
      }
    } else if (extFilter(ent.name)) {
      filesToSearch.push(full);
    }
  }
}

// Search data/*.json, *.html, and src/**
addFiles(path.resolve(__dirname, '../data'), n => n.endsWith('.json'));
addFiles(path.resolve(__dirname, '..'), n => n.endsWith('.html'));
addFiles(path.resolve(__dirname, '../src'), n => n.endsWith('.js') || n.endsWith('.jsx') || n.endsWith('.ts') || n.endsWith('.tsx') || n.endsWith('.json') || n.endsWith('.html'));

console.log(`Searching through ${filesToSearch.length} files...`);

// Folders/files of interest
const targets = [
  "Assassin's Creed",
  "Big Fish & Begonia",
  "Billy Lynn's Long Halftime Walk",
  "Bridget Jones's Baby",
  "Don't Breathe",
  "I'm Not Ashamed",
  "Maggie's Plan",
  "Miss Peregrine's Home for Peculiar Children",
  "mother!",
  "Ocean's8",
  "PattiCake$",
  "Pete's Dragon",
  "Rules Don't Apply",
  "San' 75",
  "The Zookeeper's Wife",
  "google+.png",
  "Lanterns",
  "ImGame",
  "Arrival"
];

const results = {};
targets.forEach(t => results[t] = []);

for (const file of filesToSearch) {
  const content = fs.readFileSync(file, 'utf-8');
  for (const target of targets) {
    if (content.includes(target)) {
      results[target].push(path.relative(path.resolve(__dirname, '..'), file).replace(/\\/g, '/'));
    }
  }
}

console.log(JSON.stringify(results, null, 2));
