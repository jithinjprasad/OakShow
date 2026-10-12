const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');

// Helper to extract YouTube video ID
function extractYoutubeId(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : '';
}

const drishyam2HindiMovie = {
  id: "Drishyam2HindiMovie",
  slug: "drishyam-2-hindi-movie",
  type: "movie",
  category: "Indian",
  score: 8.0,
  filename: "Drishyam2HindiMovie.html",
  title: "Drishyam 2 HindiMovie",
  metaTitle: "Drishyam 2 HindiMovie All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A gripping tale of an investigation and a family which is threatened by it. Will Vijay Salgaonkar be able to protect his family this time?",
  plot: "A gripping tale of an investigation and a family which is threatened by it. Will Vijay Salgaonkar be able to protect his family this time?",
  language: "Hindi",
  releaseDate: "November 18, 2022",
  year: "2022",
  genre: "Crime, Drama, Thriller",
  duration: "140 min",
  director: "Abhishek Pathak",
  writer: "Aamil Keeyan Khan, Abhishek Pathak",
  basedOn: "",
  boxOffice: "₹345 Crores",
  budget: "₹50 Crores",
  poster: "pics/Films/Drishyam2HindiMovie/1.jpg",
  banner: "pics/Films/Drishyam2HindiMovie/2.jpg",
  gallery: [
    { src: "pics/Films/Drishyam2HindiMovie/1.jpg", alt: "Poster 1" },
    { src: "pics/Films/Drishyam2HindiMovie/2.jpg", alt: "Poster 2" }
  ],
  awards: "Filmfare Award for Best Editing (Nominated), Best Film (Critics) (Nominated)",
  ratings: [
    {
      source: "OakShow",
      score: "8.0/10",
      url: "https://oakshow.in/Drishyam2HindiMovie.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "8.2/10",
      url: "https://www.imdb.com/title/tt15501640/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "70%",
      url: "https://www.rottentomatoes.com/m/drishyam_2_2022",
      icon: "pics/RatingSiteLogos/rottentomatoes.png"
    },
    {
      source: "Common Sense Media",
      score: "4.0/5",
      url: "https://www.commonsensemedia.org/movie-reviews/drishyam-2",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "Times of India",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/hindi/movie-reviews/drishyam-2/movie-review/95588434.cms",
      icon: "pics/RatingSiteLogos/times-of-india.png"
    },
    {
      source: "The Indian Express",
      score: "3.0/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-2-movie-review-ajay-devgn-tabu-8275215/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "Pinkvilla",
      score: "3.0/5",
      url: "https://www.pinkvilla.com/entertainment/reviews/drishyam-2-review-ajay-devgn-akshaye-khanna-tabu-starrer-is-worth-a-watch-because-of-its-gripping-climax-1199436",
      icon: "pics/RatingSiteLogos/pinkvilla.png"
    },
    {
      source: "India Today",
      score: "2.5/5",
      url: "https://www.indiatoday.in/movies/bollywood/story/drishyam-2-movie-review-ajay-devgns-film-is-high-on-thrills-but-its-still-not-drishyam-2298618-2022-11-18",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/drishyam-2-review/20221118.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "NDTV",
      score: "2.0/5",
      url: "https://www.ndtv.com/entertainment/drishyam-2-review-ajay-devgns-sequel-is-a-dreary-if-steady-carbon-copy-2-stars-3531702",
      icon: "pics/RatingSiteLogos/ndtv.png"
    }
  ],
  cast: [
    { actor: "Ajay Devgn", role: "Vijay Salgaonkar" },
    { actor: "Tabu", role: "Meera Deshmukh" },
    { actor: "Akshaye Khanna", role: "IG Tarun Ahlawat" },
    { actor: "Shriya Saran", role: "Nandini Salgaonkar" },
    { actor: "Ishita Dutta", role: "Anju Salgaonkar" }
  ],
  trailer: extractYoutubeId("https://www.youtube.com/watch?v=cxA2y9Tgl7o"),
  videos: [
    { title: "Main Trailer", ytId: extractYoutubeId("https://www.youtube.com/watch?v=cxA2y9Tgl7o") }
  ],
  musicLinks: {
    spotify: "https://open.spotify.com/album/5Pu23tVAZU1341344jkR0t",
    appleMusic: "https://music.apple.com/in/album/drishyam-2-original-motion-picture-soundtrack-single/1655127375",
    jiosaavn: "https://www.jiosaavn.com/album/drishyam-2/ZZ7UZbObNQw_",
    youtubeMusic: ""
  },
  songs: [],
  streaming: {
    netflix: "",
    prime: "https://www.primevideo.com/detail/0HNZIYOI76383DKI61QMTROL4K?ref_=atv_dp_share_cu_r",
    hotstar: "",
    zee5: "",
    sonyliv: "",
    aha: "",
    youtube: ""
  },
  watchOnline: [
    { platform: "Prime Video", url: "https://www.primevideo.com/detail/0HNZIYOI76383DKI61QMTROL4K?ref_=atv_dp_share_cu_r", icon: "pics/StreamingSiteLogos/prime.png" }
  ],
  bookings: []
};

const drishyam2HindiReviews = [
  {
    movieId: "Drishyam2HindiMovie",
    movie: "Drishyam 2 HindiMovie",
    author: "Hindustan Times",
    criticName: "Hindustan Times",
    outlet: "Hindustan Times",
    score: "N/A",
    rating: "N/A",
    date: "2022",
    title: "Drishyam 2 movie review: Ajay Devgn starrer surprises you with intelligent twists in a masala thriller",
    url: "https://www.hindustantimes.com/entertainment/bollywood/drishyam-2-movie-review-ajay-devgn-starrer-surprises-you-with-intelligent-twists-in-a-masala-thriller-101668742377376.html"
  },
  {
    movieId: "Drishyam2HindiMovie",
    movie: "Drishyam 2 HindiMovie",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2022",
    title: "Drishyam 2 movie review: Ajay Devgn, Tabu",
    url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-2-movie-review-ajay-devgn-tabu-8275215/"
  },
  {
    movieId: "Drishyam2HindiMovie",
    movie: "Drishyam 2 HindiMovie",
    author: "NDTV",
    criticName: "NDTV",
    outlet: "NDTV",
    score: "2.0/5",
    rating: "2.0/5",
    date: "2022",
    title: "Drishyam 2 Review: Ajay Devgn's Sequel Is A Dreary (If Steady) Carbon Copy",
    url: "https://www.ndtv.com/entertainment/drishyam-2-review-ajay-devgns-sequel-is-a-dreary-if-steady-carbon-copy-2-stars-3531702"
  },
  {
    movieId: "Drishyam2HindiMovie",
    movie: "Drishyam 2 HindiMovie",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2022",
    title: "Drishyam 2 movie review: Ajay Devgn's film is high on thrills, but it's still not Drishyam",
    url: "https://www.indiatoday.in/movies/bollywood/story/drishyam-2-movie-review-ajay-devgns-film-is-high-on-thrills-but-its-still-not-drishyam-2298618-2022-11-18"
  },
  {
    movieId: "Drishyam2HindiMovie",
    movie: "Drishyam 2 HindiMovie",
    author: "Pinkvilla",
    criticName: "Pinkvilla",
    outlet: "Pinkvilla",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2022",
    title: "Drishyam 2 Review: Ajay Devgn, Akshaye Khanna, Tabu starrer is worth a watch because of its gripping climax",
    url: "https://www.pinkvilla.com/entertainment/reviews/drishyam-2-review-ajay-devgn-akshaye-khanna-tabu-starrer-is-worth-a-watch-because-of-its-gripping-climax-1199436"
  }
];

// Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const movieIdx = movies.findIndex(m => m.id === drishyam2HindiMovie.id);
if (movieIdx !== -1) {
  movies[movieIdx] = drishyam2HindiMovie;
} else {
  movies.unshift(drishyam2HindiMovie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(m => m.id === drishyam2HindiMovie.id);
const searchObj = {
  id: drishyam2HindiMovie.id,
  title: drishyam2HindiMovie.title,
  type: drishyam2HindiMovie.type,
  slug: drishyam2HindiMovie.slug,
  year: drishyam2HindiMovie.year,
  thumbnail: drishyam2HindiMovie.poster
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = searchObj;
} else {
  searchIndex.unshift(searchObj);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// Update reviews.json
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
drishyam2HindiReviews.forEach((r, idx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `drishyam-2-hindi-review-${idx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

console.log('Successfully added Drishyam 2 Hindi');
