const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../data/search_index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

let fixedCount = 0;

for (const item of index) {
  // Normalize type to lowercase
  if (item.type) {
    item.type = item.type.toLowerCase();
  }

  // Ensure filename exists
  if (item.fileName && !item.filename) {
    item.filename = item.fileName;
  }

  // Specifically fix I'm Game
  if (item.title === "I'm Game" || (item.fileName && item.fileName.toLowerCase() === 'imgame.html')) {
    item.id = 'ImGame';
    item.type = 'movie';
    item.filename = 'ImGame.html';
    item.fileName = 'ImGame.html';
    item.cleanUrl = '/ImGame.html';
    fixedCount++;
    console.log("Fixed I'm Game in search_index");
  }

  // Specifically fix Gail Daughtry
  if (item.title && item.title.includes('Gail Daughtry')) {
    item.id = 'GailDaughtryandtheCelebritySexPass';
    item.type = 'movie';
    item.filename = 'GailDaughtryandtheCelebritySexPass.html';
    item.fileName = 'GailDaughtryandtheCelebritySexPass.html';
    item.cleanUrl = '/GailDaughtryandtheCelebritySexPass.html';
    fixedCount++;
    console.log("Fixed Gail Daughtry in search_index");
  }

  // Specifically fix Digger
  if (item.title === 'Digger' || (item.fileName && item.fileName.toLowerCase() === 'digger.html')) {
    item.id = 'digger';
    item.type = 'movie';
    item.filename = 'Digger.html';
    item.fileName = 'Digger.html';
    item.cleanUrl = '/Digger.html';
    fixedCount++;
    console.log("Fixed Digger in search_index");
  }

  // Fix critic profile items without ID
  if (!item.id && item.type === 'review' && item.title) {
    item.id = item.title.replace(/[^a-zA-Z0-9]/g, '');
    fixedCount++;
  }
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log(`Saved ${indexPath} with ${fixedCount} updates.`);
