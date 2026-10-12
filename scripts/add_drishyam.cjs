const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

// Helper to extract YouTube video ID
function extractYoutubeId(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : '';
}

const drishyamMovie = {
  id: "Drishyam",
  slug: "drishyam",
  type: "movie",
  category: "Indian",
  score: 9.0,
  filename: "Drishyam.html",
  title: "Drishyam",
  metaTitle: "Drishyam All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Georgekutty lives a happy life with his wife and daughters. However, things take a dark turn when his family commits an accidental crime, leaving him to protect them from the law.",
  plot: "Georgekutty lives a happy life with his wife and daughters. However, things take a dark turn when his family commits an accidental crime, leaving him to protect them from the law.",
  language: "Malayalam",
  releaseDate: "December 19, 2013",
  year: "2013",
  genre: "Crime, Thriller, Drama",
  duration: "160 min",
  director: "Jeethu Joseph",
  writer: "Jeethu Joseph",
  basedOn: "",
  boxOffice: "₹75 Crores",
  budget: "₹4.5 Crores",
  poster: "pics/Films/Drishyam/1.jpg",
  banner: "pics/Films/Drishyam/2.jpg",
  gallery: [
    { src: "pics/Films/Drishyam/1.jpg", alt: "Poster 1" },
    { src: "pics/Films/Drishyam/2.jpg", alt: "Poster 2" }
  ],
  awards: "Kerala State Film Award for Best Film with Popular Appeal and Aesthetic Value",
  ratings: [
    {
      source: "OakShow",
      score: "9.0/10",
      url: "https://oakshow.in/Drishyam.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "8.4/10",
      url: "https://www.imdb.com/title/tt3417422/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Times of India",
      score: "4.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/drishyam/movie-review/27751094.cms",
      icon: "pics/RatingSiteLogos/times-of-india.png"
    },
    {
      source: "Rediff",
      score: "3.5/5",
      url: "https://www.rediff.com/movies/review/review-drishyam-is-mohanlals-film/20131220.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    }
  ],
  cast: [
    { actor: "Mohanlal", role: "Georgekutty" },
    { actor: "Meena", role: "Rani George" },
    { actor: "Ansiba Hassan", role: "Anju George" },
    { actor: "Esther Anil", role: "Anu George" }
  ],
  trailer: extractYoutubeId("https://www.youtube.com/watch?v=eMASubc1y_k"),
  videos: [
    { title: "Main Trailer", ytId: extractYoutubeId("https://www.youtube.com/watch?v=eMASubc1y_k") }
  ],
  musicLinks: {
    spotify: "https://open.spotify.com/album/0Xnj3BmKrS9CSJm4ENLXGq",
    appleMusic: "https://music.apple.com/in/album/drishyam-original-motion-picture-soundtrack-single/892928355",
    jiosaavn: "",
    youtubeMusic: ""
  },
  songs: [],
  streaming: {
    netflix: "",
    prime: "",
    hotstar: "https://www.hotstar.com/in/movies/drishyam/1000051783",
    zee5: "",
    sonyliv: "",
    aha: "",
    youtube: ""
  },
  watchOnline: [
    { platform: "JioHotstar", url: "https://www.hotstar.com/in/movies/drishyam/1000051783", icon: "pics/StreamingSiteLogos/hotstar.png" }
  ],
  bookings: []
};

const drishyamNews = [
  {
    movieId: "Drishyam",
    movieTitle: "Drishyam",
    title: "10 years of Drishyam: How a seemingly low-key family drama became one of the most influential, impactful Indian films in recent times",
    source: "The Indian Express",
    date: "2023",
    url: "https://indianexpress.com/article/entertainment/malayalam/10-years-of-drishyam-how-a-seemingly-low-key-family-drama-became-one-of-the-most-influential-impactful-indian-films-in-recent-times-9072469/",
    category: "Indian Cinema"
  }
];

// Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const movieIdx = movies.findIndex(m => m.id === drishyamMovie.id);
if (movieIdx !== -1) {
  movies[movieIdx] = drishyamMovie;
} else {
  movies.unshift(drishyamMovie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(m => m.id === drishyamMovie.id);
const searchObj = {
  id: drishyamMovie.id,
  title: drishyamMovie.title,
  type: drishyamMovie.type,
  slug: drishyamMovie.slug,
  year: drishyamMovie.year,
  thumbnail: drishyamMovie.poster
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = searchObj;
} else {
  searchIndex.unshift(searchObj);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// Update news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
drishyamNews.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `drishyam-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

console.log('Successfully added Drishyam');
