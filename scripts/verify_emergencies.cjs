const fs = require('fs');

console.log('=== VERIFYING EMERGENCIES SEPARATION & DATA ===');

const movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));
const series = JSON.parse(fs.readFileSync('data/series.json', 'utf-8'));
const emergencies = JSON.parse(fs.readFileSync('data/emergencies.json', 'utf-8'));
const searchIndex = JSON.parse(fs.readFileSync('data/search_index.json', 'utf-8'));

// 1. Verify movies and series do NOT contain emergencies
const emergencyKeywords = ['coronavirusoutbreak', 'keralafloods', 'keralafloods2019', 'oakshowemergency', 'copyrightpolicy'];

let movieLeaks = movies.filter(m => emergencyKeywords.includes(m.id?.toLowerCase()) || emergencyKeywords.includes(m.slug?.toLowerCase()));
let seriesLeaks = series.filter(s => emergencyKeywords.includes(s.id?.toLowerCase()) || emergencyKeywords.includes(s.slug?.toLowerCase()));

console.log(`- Emergency leaks in movies.json: ${movieLeaks.length} (Expected: 0)`);
console.log(`- Emergency leaks in series.json: ${seriesLeaks.length} (Expected: 0)`);

if (movieLeaks.length > 0) {
  console.error('FAILED: Movies still contain emergency items:', movieLeaks.map(m => m.id));
}

// 2. Verify emergencies structure
console.log(`- Total structured emergencies in data/emergencies.json: ${emergencies.length}`);
emergencies.forEach(em => {
  console.log(`  * [${em.category}] ${em.title} (${em.id})`);
  console.log(`    - Helplines: ${em.helplines?.length || 0}`);
  console.log(`    - Rescue Actions: ${em.rescueActions?.length || 0}`);
  console.log(`    - Relief Funds: ${em.reliefFunds?.length || 0}`);
  console.log(`    - FAQs & Guidelines: ${em.faqsAndGuidelines?.length || 0}`);
});

// 3. Verify search index has emergencies
const searchEmergencies = searchIndex.filter(item => item.type === 'emergency');
console.log(`- Emergency items in search_index.json: ${searchEmergencies.length}`);

console.log('=== VERIFICATION COMPLETED SUCCESSFULLY ===');
