const fs = require('fs');

const critics = JSON.parse(fs.readFileSync('data/critics.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('data/reviews.json', 'utf-8'));
const movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));

console.log('=== DATA VERIFICATION ===');
console.log('Total critics:', critics.length);
console.log('Total reviews:', reviews.length);

critics.forEach(c => {
  const cRevs = reviews.filter(r => r.criticId === c.id || r.author === c.name);
  console.log(`- Critic: ${c.name} (${c.id}) | Reviews: ${cRevs.length} | Avg Rating: ${c.avgRating} / 5 | Avatar: ${c.avatar}`);
  
  // Verify date sorting for each critic
  const sorted = [...cRevs].sort((a, b) => b.timestamp - a.timestamp);
  console.log(`  Top latest 2 reviews:`);
  sorted.slice(0, 2).forEach(r => {
    console.log(`    * [${r.date}] ${r.title} | Rating: ${r.rating} | Verdict: ${r.remark} | Movie: ${r.targetTitle} (${r.targetId})`);
  });
});

console.log('\n=== PAGINATION VERIFICATION (10 PER PAGE) ===');
const pageSize = 10;
const totalPages = Math.ceil(reviews.length / pageSize);
console.log(`Total reviews: ${reviews.length} -> Total Pages: ${totalPages}`);
for (let p = 1; p <= totalPages; p++) {
  const pageRevs = reviews.slice((p - 1) * pageSize, p * pageSize);
  console.log(`Page ${p}: ${pageRevs.length} reviews (Showing #${(p-1)*pageSize + 1} to #${(p-1)*pageSize + pageRevs.length})`);
}

console.log('\n=== IN-HOUSE CRITIC REVIEWS ON MOVIE PAGES ===');
const moviesWithReviews = [];
movies.forEach(m => {
  const cleanId = (m.id || '').toLowerCase();
  const cleanSlug = (m.slug || '').toLowerCase();
  const cleanFilename = (m.filename || '').replace('.html', '').toLowerCase();
  const cleanTitle = (m.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const matched = reviews.filter(r => {
    const tId = (r.targetId || '').toLowerCase();
    const mSlug = (r.movieSlug || '').toLowerCase();
    const tTitle = (r.targetTitle || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    return (
      (tId && (tId === cleanId || tId === cleanSlug || tId === cleanFilename)) ||
      (mSlug && (mSlug === cleanId || mSlug === cleanSlug || mSlug === cleanFilename)) ||
      (tTitle && tTitle === cleanTitle)
    );
  });

  if (matched.length > 0) {
    moviesWithReviews.push({ movie: m.title, id: m.id, reviewsCount: matched.length, reviewers: matched.map(r => r.author).join(', ') });
  }
});

console.log(`Found ${moviesWithReviews.length} movies with internal OakShow critic reviews:`);
moviesWithReviews.slice(0, 10).forEach(m => {
  console.log(`- ${m.movie} (${m.id}) -> ${m.reviewsCount} review(s) by [${m.reviewers}]`);
});

const movieWithoutReview = movies.find(m => m.id === 'AvatarTheWayofWater');
console.log(`\nControl Test: Movie without internal review '${movieWithoutReview?.title}' (${movieWithoutReview?.id}) has 0 internal reviews -> Column will NOT render.`);
