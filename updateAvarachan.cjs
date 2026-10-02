const fs = require('fs');

const moviesFile = 'data/movies.json';
const moviesData = JSON.parse(fs.readFileSync(moviesFile, 'utf8'));
const movie = moviesData.find(m => m.id === 'AvarachanandSons');
if (movie) {
  movie.status = "Released";
  movie.score = 6;
  
  if (!movie.ratings) {
      movie.ratings = [];
  }
  
  // Just update with OakShow and The Hindu, since user said no other ratings yet
  movie.ratings = [
      {
        "source": "OakShow",
        "score": "6/10",
        "url": "https://oakshow.in/AvarachanandSons.html",
        "icon": "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-an-average-movie.png"
      },
      {
        "source": "The Hindu",
        "score": "Review",
        "url": "https://www.thehindu.com/entertainment/movies/avaraachan-and-sons-movie-review-biju-menon-makes-this-old-fashioned-family-entertainer-watchable/article71536772.ece",
        "icon": "pics/RatingSiteLogos/the-hindu.png"
      }
  ];

  fs.writeFileSync(moviesFile, JSON.stringify(moviesData, null, 2), 'utf8');
  console.log('Successfully updated Avarachan and Sons in movies.json');
} else {
  console.log('Movie not found in movies.json');
}
