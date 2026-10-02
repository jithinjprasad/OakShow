const fs = require('fs');
const file = 'data/movies.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const movie = data.find(m => m.id === 'Digger');
if (movie) {
  movie.status = "Released";
  movie.score = 7.5;
  movie.ratings = [
      {
        "source": "OakShow",
        "score": "7.5/10",
        "url": "https://oakshow.in/Digger.html",
        "icon": "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-good.png"
      },
      {
        "source": "IMDb",
        "score": "7.3/10",
        "url": "https://www.imdb.com/title/tt31450459/",
        "icon": "pics/RatingSiteLogos/imdb.png"
      },
      {
        "source": "Rotten Tomatoes",
        "score": "54%",
        "url": "https://www.rottentomatoes.com/m/digger_2026",
        "icon": "pics/RatingSiteLogos/rotten-tomatoes.png"
      },
      {
        "source": "Metacritic",
        "score": "46/100",
        "url": "https://www.metacritic.com/movie/digger-2026/",
        "icon": "pics/RatingSiteLogos/metacritic.png"
      },
      {
        "source": "The Telegraph",
        "score": "4/5",
        "url": "https://www.telegraph.co.uk/films/2026/09/29/digger-review-tom-cruise/",
        "icon": "pics/RatingSiteLogos/telegraph.png"
      },
      {
        "source": "The Indian Express",
        "score": "4/5",
        "url": "https://indianexpress.com/article/entertainment/movie-review/digger-movie-review-tom-cruise-takes-biggest-career-leap-alejandro-inarritu-10901307/",
        "icon": "pics/RatingSiteLogos/indian-express.png"
      },
      {
        "source": "Times Now",
        "score": "4/5",
        "url": "https://www.timesnownews.com/entertainment-news/reviews/digger-movie-review-tom-cruise-starrer-alejandro-gonzelez-inarritu-film-imdb-review-ratings-public-reaction-review-156255158",
        "icon": "pics/RatingSiteLogos/times-now.png"
      },
      {
        "source": "Rediff",
        "score": "4/5",
        "url": "https://www.rediff.com/movies/review/digger-review-tom-cruise-goes-bonkers/20261002.htm",
        "icon": "pics/RatingSiteLogos/rediff.png"
      },
      {
        "source": "Times of India",
        "score": "4/5",
        "url": "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/digger/movie-review/134612136.cms",
        "icon": "pics/RatingSiteLogos/times-of-india.png"
      },
      {
        "source": "Common Sense Media",
        "score": "3/5",
        "url": "https://www.commonsensemedia.org/movie-reviews/digger",
        "icon": "pics/RatingSiteLogos/common-sense-media.png"
      },
      {
        "source": "Den of Geek",
        "score": "2.5/5",
        "url": "https://www.denofgeek.com/movies/digger-review-tom-cruise/",
        "icon": "pics/RatingSiteLogos/denofgeek.png"
      },
      {
        "source": "IGN",
        "score": "6/10",
        "url": "https://www.ign.com/movies/digger",
        "icon": "pics/RatingSiteLogos/ign.png"
      },
      {
        "source": "India Today",
        "score": "3.5/5",
        "url": "https://www.indiatoday.in/movies/hollywood/story/digger-review-tom-cruise-is-wonderfully-unhinged-in-this-wild-climate-satire-3007106-2026-10-01",
        "icon": "pics/RatingSiteLogos/india-today.ico"
      },
      {
        "source": "RogerEbert",
        "score": "2/4",
        "url": "https://www.rogerebert.com/reviews/digger-tom-cruise-alejandro-gonzalez-inarritu-film-review-2026",
        "icon": "pics/RatingSiteLogos/roger-ebert.png"
      },
      {
        "source": "The Guardian",
        "score": "2/5",
        "url": "https://www.theguardian.com/film/2026/sep/29/digger-review-tom-cruise-satire-alejandro-gonzalez-inarritu",
        "icon": "pics/RatingSiteLogos/guardian.png"
      },
      {
        "source": "The Hindu",
        "score": "Review",
        "url": "https://www.thehindu.com/entertainment/movies/digger-movie-review-alejandro-g-inarritu-tom-cruise-riz-ahmed/article71536688.ece",
        "icon": "pics/RatingSiteLogos/the-hindu.png"
      }
  ];
  
  movie.boxOffice = {
      "budget": "Estimated Production $160 - $180 Million",
      "opening": "Projected $7.5 - $15 Million",
      "breakEven": "Estimated $300 - $350 Million",
      "lastUpdated": "October 2026",
      "source": "Industry Reports / Forbes / Box Office Mojo"
  };

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully updated Digger in movies.json');
} else {
  console.log('Movie not found');
}
