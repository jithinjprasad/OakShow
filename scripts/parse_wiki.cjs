const fs = require('fs');

const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/c3045180-5e6d-475d-8022-b4bdee9bec0a/.system_generated/steps/1501/content.md', 'utf8');

function strip(s) {
  return s ? s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

// Split by sections
const sections = html.split(/<h2[^>]*>/i);
sections.forEach((sec, idx) => {
  const titleMatch = sec.match(/^([^<]+)<\/h2>/i);
  const title = titleMatch ? titleMatch[1].trim() : `Section ${idx}`;
  console.log(`\n=================== [${title.toUpperCase()}] ===================`);
  console.log(strip(sec));
});
