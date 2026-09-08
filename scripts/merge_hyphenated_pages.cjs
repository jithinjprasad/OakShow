const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update ImGame.html
let imGameContent = fs.readFileSync(path.join(rootDir, 'ImGame.html'), 'utf8');
imGameContent = imGameContent.replace('http://oakshow.in/submityourreviews.html', 'https://oakshow.in/submityourreviews.html');
if (!imGameContent.includes('rel="canonical"')) {
  imGameContent = imGameContent.replace('</head>', '<link rel="canonical" href="https://oakshow.in/ImGame.html" />\n</head>');
}
fs.writeFileSync(path.join(rootDir, 'ImGame.html'), imGameContent, 'utf8');

// 2. Create im-game.html in root as a merged copy with canonical pointing to ImGame.html
fs.writeFileSync(path.join(rootDir, 'im-game.html'), imGameContent, 'utf8');
console.log('Created im-game.html');

// 3. Update GailDaughtryandtheCelebritySexPass.html
let gailContent = fs.readFileSync(path.join(rootDir, 'GailDaughtryandtheCelebritySexPass.html'), 'utf8');
if (!gailContent.includes('rel="canonical"')) {
  gailContent = gailContent.replace('</head>', '<link rel="canonical" href="https://oakshow.in/GailDaughtryandtheCelebritySexPass.html" />\n</head>');
}
fs.writeFileSync(path.join(rootDir, 'GailDaughtryandtheCelebritySexPass.html'), gailContent, 'utf8');

// 4. Create gail-daughtry-and-the-celebrity-sex-pass.html in root as a merged copy with canonical pointing to GailDaughtryandtheCelebritySexPass.html
fs.writeFileSync(path.join(rootDir, 'gail-daughtry-and-the-celebrity-sex-pass.html'), gailContent, 'utf8');
console.log('Created gail-daughtry-and-the-celebrity-sex-pass.html');
