const fs = require('fs');
const file = 'data/movies.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const movie = data.find(m => m.id === 'YezhuKadalYezhuMalai');
if (movie) {
  movie.score = 5.5;
  movie.ratings = [
      {
        "source": "OakShow",
        "score": "5.5/10",
        "url": "https://oakshow.in/YezhuKadalYezhuMalai.html",
        "icon": "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-an-average-movie.png"
      },
      {
        "source": "IMDb",
        "score": "9.0/10",
        "url": "https://www.imdb.com/title/tt22754948/",
        "icon": "pics/RatingSiteLogos/imdb.png"
      },
      {
        "source": "Times of India",
        "score": "2.5/5",
        "url": "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/yezhu-kadal-yezhu-malai/movie-review/134624069.cms",
        "icon": "pics/RatingSiteLogos/times-of-india.png"
      },
      {
        "source": "The Indian Express",
        "score": "1.5/5",
        "url": "https://indianexpress.com/article/entertainment/movie-review/yezhu-kadal-yezhu-malai-review-nivin-pauly-soori-film-messy-ai-overloaded-affair-10901557/",
        "icon": "pics/RatingSiteLogos/indian-express.png"
      },
      {
        "source": "India Today",
        "score": "1.5/5",
        "url": "https://www.indiatoday.in/movies/reviews/story/yezhu-kadal-yezhu-malai-review-ram-ai-heavy-philosophical-drama-tests-patience-nivin-pauly-soori-3007180-2026-10-01",
        "icon": "pics/RatingSiteLogos/india-today.ico"
      },
      {
        "source": "Times Now",
        "score": "Review",
        "url": "https://tamil.timesnownews.com/entertainment/yezhu-kadal-yezhu-malai-movie-x-review-in-tamil-nivin-pauly-article-156257283",
        "icon": "pics/RatingSiteLogos/times-now.png"
      }
  ];
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully updated movies.json');
} else {
  console.log('Movie not found');
}
