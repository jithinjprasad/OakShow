const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(WORKSPACE_ROOT).filter(f => f.endsWith('.html') && f.toLowerCase() !== 'index.html');

console.log(`Found ${htmlFiles.length} HTML files in root directory.`);

let updatedCount = 0;

for (const filename of htmlFiles) {
  const filePath = path.join(WORKSPACE_ROOT, filename);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const slug = filename.replace(/\.html$/i, '');

    // Modern redirect script
    const redirectSnippet = `
<!-- OakShow Modern Letterboxd/IMDb Experience Bridge -->
<script>
  (function() {
    var path = window.location.pathname;
    var filename = "${filename}";
    var slug = "${slug}";
    // Detect type based on filename pattern
    var targetRoute = '/#/movie/' + slug;
    if (/season|series/i.test(slug)) targetRoute = '/#/series/' + slug;
    else if (/worldcup|hockey|isl|sports/i.test(slug)) targetRoute = '/#/sports/' + slug;
    else if (/releases/i.test(slug)) targetRoute = '/#/releases/' + slug;
    
    // Smooth instant redirect to modern OakShow standalone experience
    if (window.location.protocol === 'file:') {
      // Local file preview fallback
      window.location.replace('index.html' + targetRoute);
    } else {
      window.location.replace(targetRoute);
    }
  })();
</script>
<meta http-equiv="refresh" content="0; url=/#/movie/${slug}" />
`;

    // Check if snippet already present
    if (!content.includes('OakShow Modern Letterboxd/IMDb Experience Bridge')) {
      if (content.includes('<head>')) {
        content = content.replace('<head>', `<head>${redirectSnippet}`);
      } else if (content.includes('<html>')) {
        content = content.replace('<html>', `<html><head>${redirectSnippet}</head>`);
      } else {
        content = `${redirectSnippet}\n${content}`;
      }
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

console.log(`Successfully updated ${updatedCount} HTML files with modern Letterboxd/IMDb bridge.`);
