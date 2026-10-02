const fs = require('fs');

// Fix movies.json
let movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf8'));
let movieIndex = movies.findIndex(m => m.id === 'YezhuKadalYezhuMalai');
if (movieIndex !== -1) {
  movies[movieIndex].releaseDate = "October 1, 2026";
  movies[movieIndex].duration = "2h 17m";
  movies[movieIndex].trailers = [
    {
      title: "Main Trailer",
      url: "https://www.youtube.com/watch?v=JdAUqyg7Wuk",
      embedUrl: "https://www.youtube-nocookie.com/embed/JdAUqyg7Wuk",
      youtubeId: "JdAUqyg7Wuk",
      type: "Trailer"
    },
    {
      title: "Trailer 2",
      url: "https://www.youtube.com/watch?v=AATu-TO7trE",
      embedUrl: "https://www.youtube-nocookie.com/embed/AATu-TO7trE",
      youtubeId: "AATu-TO7trE",
      type: "Trailer"
    },
    {
      title: "Glimpse",
      url: "https://www.youtube.com/watch?v=g50_PECZ17o",
      embedUrl: "https://www.youtube-nocookie.com/embed/g50_PECZ17o",
      youtubeId: "g50_PECZ17o",
      type: "Teaser"
    }
  ];
  delete movies[movieIndex].videos;
}
fs.writeFileSync('data/movies.json', JSON.stringify(movies, null, 2), 'utf8');

// Fix reviews.json
let reviews = JSON.parse(fs.readFileSync('data/reviews.json', 'utf8'));
const initialLength = reviews.length;
reviews = reviews.filter(r => r.movieId !== 'YezhuKadalYezhuMalai');
fs.writeFileSync('data/reviews.json', JSON.stringify(reviews, null, 2), 'utf8');

console.log(`Updated YezhuKadalYezhuMalai and removed ${initialLength - reviews.length} reviews.`);
