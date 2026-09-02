const fs = require('fs');
const path = require('path');

console.log('=== FINDING ALL GALLERY WEBPAGES AND ASSETS ===');

// Check all root html files
const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('Total root html files:', rootFiles.length);

const galleryPages = [];

rootFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lowerFile = file.toLowerCase();
  
  // Check if page has gallery/stills markup or keywords
  if (
    lowerFile.includes('gallery') || 
    lowerFile.includes('stills') || 
    lowerFile.includes('posters') || 
    lowerFile.includes('photos') ||
    content.includes('gallery') ||
    content.includes('Gallery') ||
    content.includes('Stills') ||
    content.includes('Photo Gallery')
  ) {
    // Extract title
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : file;
    
    // Extract images
    const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    const cleanImgs = imgMatches.filter(src => 
      !src.includes('favicon') && 
      !src.includes('logo') && 
      !src.includes('star') && 
      !src.includes('icon')
    );

    galleryPages.push({
      file,
      title: title.replace(/\|.*$/, '').replace(/ - .*$/, '').trim(),
      imagesCount: cleanImgs.length,
      sampleImages: cleanImgs.slice(0, 5)
    });
  }
});

console.log('Found ' + galleryPages.length + ' matching gallery candidate pages.');
galleryPages.forEach(p => console.log(`- ${p.file}: "${p.title}" (${p.imagesCount} images)`));

// Also check pics folder structure
if (fs.existsSync('pics')) {
  console.log('\nPics subdirectories:', fs.readdirSync('pics'));
}
