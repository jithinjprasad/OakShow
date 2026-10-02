const fs = require('fs');

const reviewsData = JSON.parse(fs.readFileSync('data/reviews.json', 'utf8'));

const movie = { id: 'TheParadise', title: 'The Paradise' };
const cleanId = (movie.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const cleanTitle = (movie.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const internalReviews = (reviewsData || []).filter(r => {
  const rMovieId = (r.movieId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const rMovie = (r.movie || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const tId = (r.targetId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const mSlug = (r.movieSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const tTitle = (r.targetTitle || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  return (rMovieId && rMovieId === cleanId) ||
         (tId && tId === cleanId) ||
         (mSlug && mSlug === cleanId) ||
         (rMovie && (rMovie === cleanTitle || cleanTitle.startsWith(rMovie))) ||
         (tTitle && (tTitle === cleanTitle || cleanTitle.startsWith(tTitle)));
});

console.log('Total matches:', internalReviews.length);
internalReviews.forEach((r, i) => {
  console.log(`${i+1}. id=${r.id} movie=${r.movie} movieId=${r.movieId} author=${r.author}`);
});
