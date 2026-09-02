const fs = require('fs');
const path = require('path');

// Test if all data files are valid JSON
const series = require('../data/series.json');
const movies = require('../data/movies.json');
const reviews = require('../data/reviews.json');

console.log(`Series count: ${series.length}`);
console.log(`Movies count: ${movies.length}`);
console.log(`Reviews count: ${reviews.length}`);
