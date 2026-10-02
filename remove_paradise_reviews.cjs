const fs = require('fs');
const path = require('path');

const reviewsPath = path.join(__dirname, 'data', 'reviews.json');
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

const initialLength = reviews.length;
reviews = reviews.filter(r => r.movieId !== 'TheParadise');

fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

console.log(`Removed ${initialLength - reviews.length} reviews for The Paradise.`);
