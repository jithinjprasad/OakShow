const fs = require('fs');

const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/c3045180-5e6d-475d-8022-b4bdee9bec0a/.system_generated/steps/1501/content.md', 'utf8');

function strip(s) {
  return s ? s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

const sections = html.split(/<h2[^>]*>/i);
for (let i = 1; i < sections.length; i++) {
  const sec = sections[i];
  const titleMatch = sec.match(/^([^<]+)<\/h2>/i);
  const title = titleMatch ? titleMatch[1].trim() : `Section ${i}`;
  if (['Plot', 'Cast', 'Production', 'Music', 'Release', 'Reception'].includes(title)) {
    console.log(`\n=================== [${title.toUpperCase()}] ===================`);
    console.log(strip(sec.substring(sec.indexOf('</h2>') + 5)));
  }
}
