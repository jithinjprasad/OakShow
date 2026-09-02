const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(WORKSPACE_ROOT).filter(f => f.endsWith('.html') && f.toLowerCase() !== 'index.html');

console.log(`Scanning ${htmlFiles.length} HTML files to remove injected redirect bridge...`);

const pattern = /\s*<!-- OakShow Modern Letterboxd\/IMDb Experience Bridge -->[\s\S]*?<meta http-equiv="refresh" content="0; url=[^"]+" \/>\s*/;

let cleanedCount = 0;

for (const filename of htmlFiles) {
  const filePath = path.join(WORKSPACE_ROOT, filename);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (pattern.test(content)) {
      const cleaned = content.replace(pattern, '\n');
      fs.writeFileSync(filePath, cleaned, 'utf8');
      cleanedCount++;
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

console.log(`Successfully cleaned ${cleanedCount} HTML files back to their original static state.`);
