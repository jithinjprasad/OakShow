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

const drishyam3Movie = {
  id: "DrishyamTheConclusion",
  slug: "drishyam-the-conclusion",
  type: "movie",
  category: "Indian",
  score: 8.0,
  filename: "DrishyamTheConclusion.html",
  title: "Drishyam: The Conclusion",
  metaTitle: "Drishyam: The Conclusion All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "The gripping final chapter of the Drishyam saga.",
  plot: "The gripping final chapter of the Drishyam saga.",
  language: "Hindi",
  releaseDate: "October 2026",
  year: "2026",
  genre: "Crime, Drama, Thriller",
  duration: "150 min",
  director: "Abhishek Pathak",
  writer: "Aamil Keeyan Khan, Abhishek Pathak",
  basedOn: "",
  boxOffice: "TBD",
  budget: "TBD",
  poster: "pics/Films/DrishyamTheConclusion/1.jpg",
  banner: "pics/Films/DrishyamTheConclusion/2.jpg",
  gallery: [
    { src: "pics/Films/DrishyamTheConclusion/1.jpg", alt: "Poster 1" },
    { src: "pics/Films/DrishyamTheConclusion/2.jpg", alt: "Poster 2" }
  ],
  awards: "None yet",
  ratings: [
    {
      source: "OakShow",
      score: "8.0/10",
      url: "https://oakshow.in/DrishyamTheConclusion.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "8.0/10",
      url: "https://www.imdb.com/title/tt27050858/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Times Now",
      score: "4.0/5",
      url: "https://www.timesnownews.com/entertainment-news/reviews/drishyam-3-the-conclusion-review-rating-ajay-devgn-jaideep-ahlawat-prakash-raj-crime-thriller-movie-cast-release-date-runtime-review-156261006",
      icon: "pics/RatingSiteLogos/times-now.png"
    },
    {
      source: "Pinkvilla",
      score: "4.0/5",
      url: "https://www.pinkvilla.com/entertainment/reviews/drishyam-the-conclusion-review-ajay-devgn-as-vijay-salgaonkar-owns-the-screen-in-a-gripping-finale-last-30-mins-deliver-mindblowing-climax-1405711",
      icon: "pics/RatingSiteLogos/pinkvilla.png"
    },
    {
      source: "Times of India",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/hindi/movie-reviews/drishyam-the-conclusion/amp_movie_review/134629821.cms",
      icon: "pics/RatingSiteLogos/times-of-india.png"
    },
    {
      source: "Hindustan Times",
      score: "3.0/5",
      url: "https://www.hindustantimes.com/entertainment/bollywood/drishyam-the-conclusion-review-vijay-salgaonkar-last-trick-is-as-dramatic-as-ever-but-hardly-spellbinding-ajay-devgn-tabu-prakash-raj-jaideep-ahlawat-101790873247715.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "The Indian Express",
      score: "3.0/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-3-movie-review-terrific-ajay-devgn-tabu-give-drishyam-the-conclusion-it-deserved-10903384/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "India Today",
      score: "3.0/5",
      url: "https://www.indiatoday.in/movies/reviews/story/drishyam-the-conclusion-review-ajay-devgn-starrer-good-thriller-but-not-the-grand-farewell-it-deserved-3007677-2026-10-02",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "NDTV",
      score: "3.0/5",
      url: "https://www.ndtv.com/entertainment/drishyam-3-review-come-for-ajay-devgn-stay-for-jaideep-ahlawat-3-stars-12129369",
      icon: "pics/RatingSiteLogos/ndtv.png"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/review-drishyam-the-conclusion-goes-all-guns-blazing/20261002.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    }
  ],
  cast: [
    { actor: "Ajay Devgn", role: "Vijay Salgaonkar" },
    { actor: "Tabu", role: "Meera Deshmukh" },
    { actor: "Jaideep Ahlawat", role: "Unknown" },
    { actor: "Prakash Raj", role: "Unknown" }
  ],
  trailer: extractYoutubeId("https://www.youtube.com/watch?v=BSZZwBaNQAA"),
  videos: [
    { title: "Main Trailer", ytId: extractYoutubeId("https://www.youtube.com/watch?v=BSZZwBaNQAA") },
    { title: "Teaser", ytId: extractYoutubeId("https://www.youtube.com/watch?v=fneuVQ7uO_w") }
  ],
  musicLinks: {
    spotify: "https://open.spotify.com/album/4OWLuM8E8AhOxPLuXUq8oe",
    appleMusic: "https://music.apple.com/ci/album/drishyam-the-conclusion-original-motion-picture/6816946795",
    jiosaavn: "https://www.jiosaavn.com/album/drishyam-the-conclusion/BVOUUsu5MS0_",
    youtubeMusic: ""
  },
  songs: [],
  streaming: {
    netflix: "",
    prime: "",
    hotstar: "",
    zee5: "",
    sonyliv: "",
    aha: "",
    youtube: ""
  },
  watchOnline: [],
  bookings: [
    { platform: "BookMyShow", url: "https://in.bookmyshow.com/movies/delhi/drishyam-the-conclusion/ET00520056", icon: "pics/BookingSiteLogos/bookmyshow.png" },
    { platform: "District", url: "https://www.district.in/movies/drishyam-the-conclusion-movie-tickets-MV207254?srsltid=AU7gw4XA2-SX64QdN86-3XFB-I6sEMyNljpnCVWgE3pJF3knXs5Ls5n4", icon: "pics/BookingSiteLogos/district.png" },
    { platform: "Fandango", url: "https://www.fandango.com/drishyam-the-conclusion-2026-247556/movie-overview", icon: "pics/BookingSiteLogos/fandango.png" },
    { platform: "TicketNew", url: "https://ticketnew.com/movies/drishyam-3-2026-movie-detail-200342", icon: "pics/BookingSiteLogos/ticketnew.png" },
    { platform: "Odeon", url: "https://www.odeon.co.uk/films/drishyam-the-conclusion/HO00009561/", icon: "pics/BookingSiteLogos/odeon.png" },
    { platform: "Cineworld", url: "https://www.cineworld.co.uk/films/1000037732-drishyam-the-conclusion/", icon: "pics/BookingSiteLogos/cineworld.png" }
  ]
};

const drishyam3Reviews = [
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2026",
    title: "Drishyam 3 movie review: Terrific Ajay Devgn, Tabu give Drishyam the conclusion it deserved",
    url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-3-movie-review-terrific-ajay-devgn-tabu-give-drishyam-the-conclusion-it-deserved-10903384/"
  },
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "Hindustan Times",
    criticName: "Hindustan Times",
    outlet: "Hindustan Times",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2026",
    title: "Drishyam The Conclusion review: Vijay Salgaonkar's last trick is dramatic but hardly spellbinding",
    url: "https://www.hindustantimes.com/entertainment/bollywood/drishyam-the-conclusion-review-vijay-salgaonkar-last-trick-is-as-dramatic-as-ever-but-hardly-spellbinding-ajay-devgn-tabu-prakash-raj-jaideep-ahlawat-101790873247715.html"
  },
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2026",
    title: "Drishyam The Conclusion review: Ajay Devgn starrer good thriller but not the grand farewell it deserved",
    url: "https://www.indiatoday.in/movies/reviews/story/drishyam-the-conclusion-review-ajay-devgn-starrer-good-thriller-but-not-the-grand-farewell-it-deserved-3007677-2026-10-02"
  },
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "NDTV",
    criticName: "NDTV",
    outlet: "NDTV",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2026",
    title: "Drishyam 3 Review: Come For Ajay Devgn, Stay For Jaideep Ahlawat",
    url: "https://www.ndtv.com/entertainment/drishyam-3-review-come-for-ajay-devgn-stay-for-jaideep-ahlawat-3-stars-12129369"
  },
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "Pinkvilla",
    criticName: "Pinkvilla",
    outlet: "Pinkvilla",
    score: "4.0/5",
    rating: "4.0/5",
    date: "2026",
    title: "Drishyam The Conclusion review: Ajay Devgn as Vijay Salgaonkar owns the screen in a gripping finale",
    url: "https://www.pinkvilla.com/entertainment/reviews/drishyam-the-conclusion-review-ajay-devgn-as-vijay-salgaonkar-owns-the-screen-in-a-gripping-finale-last-30-mins-deliver-mindblowing-climax-1405711"
  },
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "Rediff",
    criticName: "Rediff",
    outlet: "Rediff",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2026",
    title: "Review: Drishyam The Conclusion goes all guns blazing",
    url: "https://www.rediff.com/movies/review/review-drishyam-the-conclusion-goes-all-guns-blazing/20261002.htm"
  },
  {
    movieId: "DrishyamTheConclusion",
    movie: "Drishyam: The Conclusion",
    author: "Times Now",
    criticName: "Times Now",
    outlet: "Times Now",
    score: "4.0/5",
    rating: "4.0/5",
    date: "2026",
    title: "Drishyam 3 The Conclusion Review",
    url: "https://www.timesnownews.com/entertainment-news/reviews/drishyam-3-the-conclusion-review-rating-ajay-devgn-jaideep-ahlawat-prakash-raj-crime-thriller-movie-cast-release-date-runtime-review-156261006"
  }
];

const drishyam3News = [
  {
    movieId: "DrishyamTheConclusion",
    movieTitle: "Drishyam: The Conclusion",
    title: "Drishyam The Conclusion Day 3 Box Office Collection: Ajay Devgn, Tabu, Shriya Saran film roars",
    source: "India TV News",
    date: "2026",
    url: "https://www.indiatvnews.com/entertainment/news/drishyam-the-conclusion-day-3-box-office-collection-ajay-devgn-tabu-shriya-saran-2026-10-04-1056058",
    category: "Bollywood"
  }
];

// Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const movieIdx = movies.findIndex(m => m.id === drishyam3Movie.id);
if (movieIdx !== -1) {
  movies[movieIdx] = drishyam3Movie;
} else {
  movies.unshift(drishyam3Movie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(m => m.id === drishyam3Movie.id);
const searchObj = {
  id: drishyam3Movie.id,
  title: drishyam3Movie.title,
  type: drishyam3Movie.type,
  slug: drishyam3Movie.slug,
  year: drishyam3Movie.year,
  thumbnail: drishyam3Movie.poster
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = searchObj;
} else {
  searchIndex.unshift(searchObj);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// Update reviews.json
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
drishyam3Reviews.forEach((r, idx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `drishyam-conclusion-review-${idx + 1}`,
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
let newsList = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
drishyam3News.forEach((n, idx) => {
  const fIdx = newsList.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `drishyam-conclusion-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    newsList[fIdx] = newsObj;
  } else {
    newsList.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(newsList, null, 2), 'utf8');

console.log('Successfully added Drishyam: The Conclusion');
