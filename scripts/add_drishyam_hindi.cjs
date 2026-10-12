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

const drishyamHindiMovie = {
  id: "DrishyamHindiMovie",
  slug: "drishyam-hindi-movie",
  type: "movie",
  category: "Indian",
  score: 7.0,
  filename: "DrishyamHindiMovie.html",
  title: "Drishyam Hindi Movie",
  metaTitle: "Drishyam Hindi Movie All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Desperate measures are taken by a man who tries to save his family from the dark side of the law, after they commit an unexpected crime.",
  plot: "Desperate measures are taken by a man who tries to save his family from the dark side of the law, after they commit an unexpected crime.",
  language: "Hindi",
  releaseDate: "July 31, 2015",
  year: "2015",
  genre: "Crime, Drama, Mystery",
  duration: "163 min",
  director: "Nishikant Kamat",
  writer: "Jeethu Joseph, Upendra Sidhaye",
  basedOn: "",
  boxOffice: "₹147 Crores",
  budget: "₹38 Crores",
  poster: "pics/Films/DrishyamHindiMovie/1.jpg",
  banner: "pics/Films/DrishyamHindiMovie/2.jpg",
  gallery: [
    { src: "pics/Films/DrishyamHindiMovie/1.jpg", alt: "Poster 1" },
    { src: "pics/Films/DrishyamHindiMovie/2.jpg", alt: "Poster 2" }
  ],
  awards: "None yet",
  ratings: [
    {
      source: "OakShow",
      score: "7.0/10",
      url: "https://oakshow.in/DrishyamHindiMovie.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "8.2/10",
      url: "https://www.imdb.com/title/tt4430212/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "64%",
      url: "https://www.rottentomatoes.com/m/drishyam_2015",
      icon: "pics/RatingSiteLogos/rottentomatoes.png"
    },
    {
      source: "Times of India",
      score: "4.0/5",
      url: "https://timesofindia.indiatimes.com/entertainment/hindi/movie-reviews/drishyam/movie-review/48279405.cms",
      icon: "pics/RatingSiteLogos/times-of-india.png"
    },
    {
      source: "Hindustan Times",
      score: "3.5/5",
      url: "https://www.hindustantimes.com/movie-reviews/drishyam-review-it-s-a-high-voltage-thriller/story-kP801lfTVElpI8i0kJ4AJK.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "Common Sense Media",
      score: "3.0/5",
      url: "https://www.commonsensemedia.org/movie-reviews/drishyam",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "The Guardian",
      score: "3.0/5",
      url: "https://www.theguardian.com/film/2015/aug/03/drishyam-review-remake-ajay-devgn-shriya-saran",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "The Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-movie-review-ajay-devgn-tabu/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/review-drishyam-is-a-depressingly-ordinary-film/20150731.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "India Today",
      score: "2.0/5",
      url: "https://www.indiatoday.in/movies/reviews/story/drishyam-review-you-will-be-better-off-watching-the-malayalam-original-ajay-devgn-shriya-saran-tabu-nishikant-kamat-jeethu-285670-2015-07-31",
      icon: "pics/RatingSiteLogos/india-today.ico"
    }
  ],
  cast: [
    { actor: "Ajay Devgn", role: "Vijay Salgaonkar" },
    { actor: "Tabu", role: "Meera Deshmukh" },
    { actor: "Shriya Saran", role: "Nandini Salgaonkar" },
    { actor: "Ishita Dutta", role: "Anju Salgaonkar" }
  ],
  trailer: extractYoutubeId("https://www.youtube.com/watch?v=64xJLmcA2K8"),
  videos: [
    { title: "Main Trailer", ytId: extractYoutubeId("https://www.youtube.com/watch?v=64xJLmcA2K8") }
  ],
  musicLinks: {
    spotify: "https://open.spotify.com/album/2Wa40rTnDPxI2r5PZhwO1i",
    appleMusic: "https://music.apple.com/in/album/drishyam-original-motion-picture-soundtrack-ep/1529555461",
    jiosaavn: "https://www.jiosaavn.com/album/drishyam/Tgdgow-LzYM_",
    youtubeMusic: ""
  },
  songs: [],
  streaming: {
    netflix: "",
    prime: "https://www.primevideo.com/detail/0SC4JKC5LC5G7C55J0DJK0OV7Z?ref_=atv_dp_share_cu_r",
    hotstar: "https://www.hotstar.com/in/movies/drishyam/1271629726?utm_source=gwa",
    zee5: "",
    sonyliv: "",
    aha: "",
    youtube: ""
  },
  watchOnline: [
    { platform: "Prime Video", url: "https://www.primevideo.com/detail/0SC4JKC5LC5G7C55J0DJK0OV7Z?ref_=atv_dp_share_cu_r", icon: "pics/StreamingSiteLogos/prime.png" },
    { platform: "JioHotstar", url: "https://www.hotstar.com/in/movies/drishyam/1271629726?utm_source=gwa", icon: "pics/StreamingSiteLogos/hotstar.png" }
  ],
  bookings: []
};

const drishyamHindiReviews = [
  {
    movieId: "DrishyamHindiMovie",
    movie: "Drishyam Hindi Movie",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2015",
    title: "Drishyam movie review: Ajay Devgn, Tabu",
    url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-movie-review-ajay-devgn-tabu/"
  },
  {
    movieId: "DrishyamHindiMovie",
    movie: "Drishyam Hindi Movie",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "2.0/5",
    rating: "2.0/5",
    date: "2015",
    title: "Drishyam review: You will be better off watching the Malayalam original",
    url: "https://www.indiatoday.in/movies/reviews/story/drishyam-review-you-will-be-better-off-watching-the-malayalam-original-ajay-devgn-shriya-saran-tabu-nishikant-kamat-jeethu-285670-2015-07-31"
  },
  {
    movieId: "DrishyamHindiMovie",
    movie: "Drishyam Hindi Movie",
    author: "Rediff",
    criticName: "Rediff",
    outlet: "Rediff",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2015",
    title: "Review: Drishyam is a depressingly ordinary film",
    url: "https://www.rediff.com/movies/review/review-drishyam-is-a-depressingly-ordinary-film/20150731.htm"
  },
  {
    movieId: "DrishyamHindiMovie",
    movie: "Drishyam Hindi Movie",
    author: "The Guardian",
    criticName: "The Guardian",
    outlet: "The Guardian",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2015",
    title: "Drishyam review – remake",
    url: "https://www.theguardian.com/film/2015/aug/03/drishyam-review-remake-ajay-devgn-shriya-saran"
  }
];

// Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const movieIdx = movies.findIndex(m => m.id === drishyamHindiMovie.id);
if (movieIdx !== -1) {
  movies[movieIdx] = drishyamHindiMovie;
} else {
  movies.unshift(drishyamHindiMovie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(m => m.id === drishyamHindiMovie.id);
const searchObj = {
  id: drishyamHindiMovie.id,
  title: drishyamHindiMovie.title,
  type: drishyamHindiMovie.type,
  slug: drishyamHindiMovie.slug,
  year: drishyamHindiMovie.year,
  thumbnail: drishyamHindiMovie.poster
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = searchObj;
} else {
  searchIndex.unshift(searchObj);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// Update reviews.json
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
drishyamHindiReviews.forEach((r, idx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `drishyam-hindi-review-${idx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

console.log('Successfully added Drishyam Hindi');
