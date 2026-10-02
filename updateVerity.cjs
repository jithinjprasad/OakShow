const fs = require('fs');

// Update movies.json
const moviesFile = 'data/movies.json';
const moviesData = JSON.parse(fs.readFileSync(moviesFile, 'utf8'));
const movie = moviesData.find(m => m.id === 'Verity');
if (movie) {
  movie.status = "Released";
  movie.score = 6;
  movie.ratings = [
      {
        "source": "OakShow",
        "score": "6/10",
        "url": "https://oakshow.in/Verity.html",
        "icon": "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-an-average-movie.png"
      },
      {
        "source": "IMDb",
        "score": "6.1/10",
        "url": "https://www.imdb.com/title/tt32261958/",
        "icon": "pics/RatingSiteLogos/imdb.png"
      },
      {
        "source": "Rotten Tomatoes",
        "score": "40%",
        "url": "https://www.rottentomatoes.com/m/verity",
        "icon": "pics/RatingSiteLogos/rotten-tomatoes.png"
      },
      {
        "source": "Metacritic",
        "score": "45/100",
        "url": "https://www.metacritic.com/movie/verity/",
        "icon": "pics/RatingSiteLogos/metacritic.png"
      },
      {
        "source": "Times Now",
        "score": "3.5/5",
        "url": "https://www.timesnownews.com/entertainment-news/reviews/verity-movie-review-2026-dakota-johnson-and-anne-hathaway-romantic-thriller-film-release-date-cast-rating-and-story-review-156252282",
        "icon": "pics/RatingSiteLogos/times-now.png"
      },
      {
        "source": "Common Sense Media",
        "score": "3/5",
        "url": "https://www.commonsensemedia.org/book-reviews/verity",
        "icon": "pics/RatingSiteLogos/common-sense-media.png"
      },
      {
        "source": "India Today",
        "score": "3/5",
        "url": "https://www.indiatoday.in/movies/hollywood/story/verity-review-anne-hathaway-dakota-johnson-elevate-a-pulpy-twisted-thriller-3007145-2026-10-01",
        "icon": "pics/RatingSiteLogos/india-today.ico"
      },
      {
        "source": "Den of Geek",
        "score": "2/5",
        "url": "https://www.denofgeek.com/movies/verity-review-anne-hathaway-winning-streak-to-end/",
        "icon": "pics/RatingSiteLogos/denofgeek.png"
      },
      {
        "source": "Digital Spy",
        "score": "2/5",
        "url": "https://www.digitalspy.com/movies/a73940199/verity-review-anne-hathaway/",
        "icon": "pics/RatingSiteLogos/digital-spy.png"
      },
      {
        "source": "The Guardian",
        "score": "2/5",
        "url": "https://www.theguardian.com/film/2026/sep/30/verity-review-dakota-johnson-anne-hathaway-josh-hartnett",
        "icon": "pics/RatingSiteLogos/guardian.png"
      },
      {
        "source": "The Indian Express",
        "score": "1.5/5",
        "url": "https://indianexpress.com/article/entertainment/movie-review/verity-movie-review-anne-hathaway-dakota-johnsons-thriller-fails-to-deliver-10903608/",
        "icon": "pics/RatingSiteLogos/indian-express.png"
      },
      {
        "source": "RogerEbert",
        "score": "3/4",
        "url": "https://www.rogerebert.com/reviews/verity-anne-hathaway-dakota-fanning-film-review-2026",
        "icon": "pics/RatingSiteLogos/roger-ebert.png"
      },
      {
        "source": "The Hindu",
        "score": "Review",
        "url": "https://www.thehindu.com/entertainment/movies/verity-movie-review-anne-hathaway-and-dakota-johnson-stumble-through-a-corny-thriller/article71527847.ece",
        "icon": "pics/RatingSiteLogos/the-hindu.png"
      }
  ];
  
  movie.boxOffice = {
      "budget": "Reported Production Budget $40 Million",
      "opening": "Projected Domestic Opening $25 - $35 Million",
      "global": "Projected Global Opening Over $55 Million",
      "lastUpdated": "October 2026"
  };

  if (!movie.trailers) movie.trailers = [];
  const mainTrailer = movie.trailers.find(t => t.title === 'Main Trailer' || t.type === 'Trailer');
  if (mainTrailer) {
      mainTrailer.url = "https://www.youtube.com/watch?v=xdPMKhjMSFs";
      mainTrailer.embedUrl = "https://www.youtube-nocookie.com/embed/xdPMKhjMSFs";
      mainTrailer.youtubeId = "xdPMKhjMSFs";
  } else {
      movie.trailers.push({
          "title": "Main Trailer",
          "url": "https://www.youtube.com/watch?v=xdPMKhjMSFs",
          "embedUrl": "https://www.youtube-nocookie.com/embed/xdPMKhjMSFs",
          "youtubeId": "xdPMKhjMSFs",
          "type": "Trailer"
      });
  }

  if (!movie.musicLinks) movie.musicLinks = {};
  movie.musicLinks.spotify = "https://open.spotify.com/album/3h7o3OEjUgp7yBZ0xZEIu2";

  movie.bookings = [
      {
          "platform": "BookMyShow",
          "url": "https://in.bookmyshow.com/movies/mumbai/verity/ET00497246",
          "icon": "pics/BookingSiteLogos/bookmyshow.png"
      },
      {
          "platform": "District",
          "url": "https://www.district.in/movies/verity-movie-tickets-MV220590?srsltid=AU7gw4U-zdjHpzjdY9g2lULONXCeBhWvguoWtZ-vOtlkH-HcRx8HHhWj",
          "icon": "pics/BookingSiteLogos/district.png"
      },
      {
          "platform": "Fandango",
          "url": "https://www.fandango.com/verity-2026-240033/movie-overview",
          "icon": "pics/BookingSiteLogos/fandango.png"
      },
      {
          "platform": "Cineworld",
          "url": "https://www.cineworld.co.uk/films/1000015739-verity/",
          "icon": "pics/BookingSiteLogos/cineworld.png"
      }
  ];

  fs.writeFileSync(moviesFile, JSON.stringify(moviesData, null, 2), 'utf8');
  console.log('Successfully updated Verity in movies.json');
} else {
  console.log('Movie not found in movies.json');
}

// Update news.json
const newsFile = 'data/news.json';
const newsData = JSON.parse(fs.readFileSync(newsFile, 'utf8'));

const newsItems = [
    {
        "id": "verity-news-1",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "Colleen Hoover opens up about Anne Hathaway's casting and performance in Verity: 'She nailed it'",
        "source": "Deccan Chronicle",
        "date": "2026",
        "url": "https://www.deccanchronicle.com/entertainment/colleen-hoover-opens-up-about-anne-hathaways-casting-and-performance-in-verity-she-nailed-it-1991244",
        "category": "Hollywood"
    },
    {
        "id": "verity-news-2",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "Colleen Hoover calls Anne Hathaway casting in Verity a pinch me moment",
        "source": "India Today",
        "date": "September 28, 2026",
        "url": "https://www.indiatoday.in/movies/hollywood/story/colleen-hoover-calls-anne-hathaway-casting-in-verity-a-pinch-me-moment-3004575-2026-09-28",
        "category": "Hollywood"
    },
    {
        "id": "verity-news-3",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "Verity: Colleen Hoover, Anne Hathaway, Dakota Johnson",
        "source": "Variety",
        "date": "2026",
        "url": "https://variety.com/2026/film/features/verity-colleen-hoover-anne-hathaway-dakota-johnson-erotic-1236872986/",
        "category": "Hollywood"
    },
    {
        "id": "verity-news-4",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "Anne Hathaway reveals why she hasn't done Hot Ones despite her Verity character taking the challenge",
        "source": "WION",
        "date": "2026",
        "url": "https://www.wionews.com/entertainment/hollywood/anne-hathaway-reveals-why-she-hasn-t-done-hot-ones-despite-her-verity-character-taking-the-challenge-1790592074439",
        "category": "Hollywood"
    },
    {
        "id": "verity-news-5",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "12 of the best films to watch this October",
        "source": "BBC",
        "date": "September 23, 2026",
        "url": "https://www.bbc.com/culture/article/20260923-12-of-the-best-films-to-watch-this-october",
        "category": "Hollywood"
    },
    {
        "id": "verity-news-6",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "Dakota Johnson on Verity: Why Truth and Trust Are Never What They Seem",
        "source": "Modern Diplomacy",
        "date": "September 26, 2026",
        "url": "https://moderndiplomacy.eu/2026/09/26/dakota-johnson-on-verity-why-truth-and-trust-are-never-what-they-seem/",
        "category": "Hollywood"
    },
    {
        "id": "verity-news-7",
        "movieId": "Verity",
        "movieTitle": "Verity",
        "title": "Verity gets A certificate in India after CBFC cuts 23 seconds of intimate scenes",
        "source": "Hindustan Times",
        "date": "2026",
        "url": "https://www.hindustantimes.com/entertainment/hollywood/verity-gets-a-certificate-in-india-after-cbfc-cuts-23-seconds-of-intimate-scenes-101790851944115.html",
        "category": "Hollywood"
    }
];

// Remove any existing Verity news first to avoid duplicates
const filteredNews = newsData.filter(n => n.movieId !== 'Verity');
const updatedNews = [...newsItems, ...filteredNews];
fs.writeFileSync(newsFile, JSON.stringify(updatedNews, null, 2), 'utf8');
console.log('Successfully updated Verity news in news.json');
