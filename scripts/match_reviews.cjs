const fs = require('fs');
const revs = JSON.parse(fs.readFileSync('scripts/parsed_critic_reviews.json', 'utf-8'));
const movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));
const series = JSON.parse(fs.readFileSync('data/series.json', 'utf-8'));

const movieMap = new Map();
movies.forEach(m => {
  movieMap.set(m.id.toLowerCase(), m);
  if (m.slug) movieMap.set(m.slug.toLowerCase(), m);
  if (m.filename) movieMap.set(m.filename.replace('.html', '').toLowerCase(), m);
  if (m.title) movieMap.set(m.title.toLowerCase().replace(/[^a-z0-9]/g, ''), m);
});

const seriesMap = new Map();
series.forEach(s => {
  seriesMap.set(s.id.toLowerCase(), s);
  if (s.slug) seriesMap.set(s.slug.toLowerCase(), s);
  if (s.filename) seriesMap.set(s.filename.replace('.html', '').toLowerCase(), s);
  if (s.title) seriesMap.set(s.title.toLowerCase().replace(/[^a-z0-9]/g, ''), s);
});

let matchedCount = 0;
let unmatchedCount = 0;

revs.forEach(r => {
  let matched = null;
  let matchedType = 'none';
  const slugKey = (r.movieSlug || '').toLowerCase();
  const cleanTitle = (r.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (slugKey && movieMap.has(slugKey)) {
    matched = movieMap.get(slugKey);
    matchedType = 'movie';
  } else if (slugKey && seriesMap.has(slugKey)) {
    matched = seriesMap.get(slugKey);
    matchedType = 'series';
  } else if (movieMap.has(cleanTitle)) {
    matched = movieMap.get(cleanTitle);
    matchedType = 'movie';
  }

  if (matched) {
    matchedCount++;
    r.targetId = matched.id;
    r.targetType = matchedType;
    r.targetTitle = matched.title;
    console.log(`[MATCH] ${r.author} -> "${r.title}" => ${matchedType.toUpperCase()}: ${matched.title} (${matched.id})`);
  } else {
    unmatchedCount++;
    console.log(`[UNMATCHED] ${r.author} -> "${r.title}" (slug: '${r.movieSlug}')`);
  }
});

console.log(`\nResults: ${matchedCount} matched, ${unmatchedCount} unmatched out of ${revs.length} total reviews.`);
fs.writeFileSync('scripts/matched_reviews.json', JSON.stringify(revs, null, 2));
