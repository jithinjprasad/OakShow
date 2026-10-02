const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

// Helper to extract YouTube video ID
function extractYoutubeId(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : '';
}

const yezhuMovie = {
  id: "YezhuKadalYezhuMalai",
  slug: "yezhu-kadal-yezhu-malai",
  type: "movie",
  category: "Indian",
  score: 6.0,
  filename: "YezhuKadalYezhuMalai.html",
  title: "Yezhu Kadal Yezhu Malai",
  metaTitle: "Yezhu Kadal Yezhu Malai All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "An immortal man who is 8000 years old goes on an incredible journey across time and geographies to find his one true love.",
  plot: "An immortal man who is 8000 years old goes on an incredible journey across time and geographies to find his one true love.",
  language: "Tamil",
  releaseDate: "2026",
  year: "2026",
  genre: "Romance, Drama",
  duration: "TBD",
  director: "Ram",
  writer: "Ram",
  basedOn: "",
  boxOffice: "TBD",
  budget: "TBD",
  poster: "pics/Films/YezhuKadalYezhuMalai/1.jpg",
  banner: "pics/Films/YezhuKadalYezhuMalai/2.jpg",
  gallery: [
    { src: "pics/Films/YezhuKadalYezhuMalai/1.jpg", alt: "Poster 1" },
    { src: "pics/Films/YezhuKadalYezhuMalai/2.jpg", alt: "Poster 2" }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "6.0/10",
      url: "https://oakshow.in/YezhuKadalYezhuMalai.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "9.0/10",
      url: "https://www.imdb.com/title/tt22754948/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "The Indian Express",
      score: "1.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/yezhu-kadal-yezhu-malai-review-nivin-pauly-soori-film-messy-ai-overloaded-affair-10901557/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "India Today",
      score: "1.5/5",
      url: "https://www.indiatoday.in/movies/reviews/story/yezhu-kadal-yezhu-malai-review-ram-ai-heavy-philosophical-drama-tests-patience-nivin-pauly-soori-3007180-2026-10-01",
      icon: "pics/RatingSiteLogos/india-today.ico"
    }
  ],
  cast: [
    { actor: "Nivin Pauly", role: "TBD" },
    { actor: "Soori", role: "TBD" },
    { actor: "Anjali", role: "TBD" }
  ],
  trailer: extractYoutubeId("https://www.youtube.com/watch?v=JdAUqyg7Wuk"),
  videos: [
    { title: "Main Trailer", ytId: extractYoutubeId("https://www.youtube.com/watch?v=JdAUqyg7Wuk") },
    { title: "Trailer 2", ytId: extractYoutubeId("https://www.youtube.com/watch?v=AATu-TO7trE") },
    { title: "Glimpse", ytId: extractYoutubeId("https://www.youtube.com/watch?v=g50_PECZ17o") }
  ],
  musicLinks: {
    spotify: "https://open.spotify.com/album/0tceSPv2sosip0Dobxg415",
    appleMusic: "https://music.apple.com/us/song/yezhezhu-malai-from-yezhu-kadal-yezhu-malai/1755725404",
    jiosaavn: "https://www.jiosaavn.com/album/yezhu-kadal-yezhu-malai-side-a-original-motion-picture-soundtrack/DeE2iujEsRE_",
    youtubeMusic: ""
  },
  songs: [
    { title: "Song 1", ytId: extractYoutubeId("https://www.youtube.com/watch?v=Xu4SReip1LY") }
  ],
  streaming: {
    netflix: "",
    prime: "",
    hotstar: "",
    zee5: "",
    sonyliv: "",
    aha: "",
    youtube: ""
  },
  bookings: [
    { platform: "BookMyShow", url: "https://in.bookmyshow.com/movies/kochi/yezhu-kadal-yezhu-malai/ET00342249", icon: "pics/BookingSiteLogos/bookmyshow.png" },
    { platform: "District", url: "https://www.district.in/movies/yezhu-kadal-yezhu-malai-movie-tickets-in-pavagada-MV168296?srsltid=AU7gw4Xd9gK199I2eusKhv5tRNVZVMzxZ0q9bPH8TCquxarxpVm-w7OJ", icon: "pics/BookingSiteLogos/district.png" },
    { platform: "Fandango", url: "https://www.fandango.com/yezhu-kadal-yezhu-malai-247798/movie-overview", icon: "pics/BookingSiteLogos/fandango.png" },
    { platform: "TicketNew", url: "https://ticketnew.com/movies/yezhu-kadal-yezhu-malai-movie-detail-168296", icon: "pics/BookingSiteLogos/ticketnew.png" }
  ]
};

const yezhuReviews = [
  {
    movieId: "YezhuKadalYezhuMalai",
    movie: "Yezhu Kadal Yezhu Malai",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "1.5/5",
    rating: "1.5/5",
    date: "October 1, 2026",
    title: "Yezhu Kadal Yezhu Malai Review: Ram's AI-heavy philosophical drama tests patience",
    url: "https://www.indiatoday.in/movies/reviews/story/yezhu-kadal-yezhu-malai-review-ram-ai-heavy-philosophical-drama-tests-patience-nivin-pauly-soori-3007180-2026-10-01"
  },
  {
    movieId: "YezhuKadalYezhuMalai",
    movie: "Yezhu Kadal Yezhu Malai",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "1.5/5",
    rating: "1.5/5",
    date: "October 2026",
    title: "Yezhu Kadal Yezhu Malai Review: Nivin Pauly-Soori film is a messy, AI-overloaded affair",
    url: "https://indianexpress.com/article/entertainment/movie-review/yezhu-kadal-yezhu-malai-review-nivin-pauly-soori-film-messy-ai-overloaded-affair-10901557/"
  }
];

const yezhuNews = [
  {
    movieId: "YezhuKadalYezhuMalai",
    movieTitle: "Yezhu Kadal Yezhu Malai",
    title: "Yezhu Kadal Yezhu Malai: Nivin Pauly movie release details",
    source: "Mathrubhumi",
    date: "2026",
    url: "https://www.mathrubhumi.com/movies-music/news/yezhu-kadal-yezhu-malai-nivin-pauly-movie-release-r5xmc2h4",
    category: "Indian Cinema"
  },
  {
    movieId: "YezhuKadalYezhuMalai",
    movieTitle: "Yezhu Kadal Yezhu Malai",
    title: "Nivin Pauly's Yezhu Kadal Yezhu Malai cleared for release with U/A certificate",
    source: "Times of India",
    date: "2026",
    url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/nivin-paulys-yezhu-kadal-yezhu-malai-cleared-for-release-with-u/a-certificate/articleshow/134589597.cms",
    category: "Indian Cinema"
  },
  {
    movieId: "YezhuKadalYezhuMalai",
    movieTitle: "Yezhu Kadal Yezhu Malai",
    title: "Yezhu Kadal Yezhu Malai introduction to film gives glimpse at incredible tale of a Hulk-like immortal",
    source: "Cinema Express",
    date: "September 30, 2026",
    url: "https://www.cinemaexpress.com/amp/story/tamil/news/2026/Sep/30/yezhu-kadal-yezhu-malai-introduction-to-film-gives-glimpse-at-incredible-tale-of-a-hulk-like-immortal",
    category: "Indian Cinema"
  },
  {
    movieId: "YezhuKadalYezhuMalai",
    movieTitle: "Yezhu Kadal Yezhu Malai",
    title: "Yezhu Kadal Yezhu Malai Twitter Review: 7 tweets to read before watching Nivin Pauly-Soori's romantic thriller",
    source: "Pinkvilla",
    date: "2026",
    url: "https://www.pinkvilla.com/entertainment/south/yezhu-kadal-yezhu-malai-twitter-review-7-tweets-to-read-before-watching-nivin-pauly-sooris-romantic-thriller-1405707",
    category: "Indian Cinema"
  }
];

// Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const movieIdx = movies.findIndex(m => m.id === yezhuMovie.id);
if (movieIdx !== -1) {
  movies[movieIdx] = yezhuMovie;
} else {
  movies.unshift(yezhuMovie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(m => m.id === yezhuMovie.id);
const searchObj = {
  id: yezhuMovie.id,
  title: yezhuMovie.title,
  type: yezhuMovie.type,
  slug: yezhuMovie.slug,
  year: yezhuMovie.year,
  thumbnail: yezhuMovie.poster
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = searchObj;
} else {
  searchIndex.unshift(searchObj);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// Update reviews.json
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
yezhuReviews.forEach((r, idx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `yezhu-review-${idx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

// Update news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
yezhuNews.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `yezhu-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

console.log('Successfully added Yezhu Kadal Yezhu Malai');
