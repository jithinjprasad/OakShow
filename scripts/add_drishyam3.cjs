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

const drishyam3Movie = {
  id: "Drishyam3",
  slug: "drishyam3",
  type: "movie",
  category: "Indian",
  score: 7.0,
  filename: "Drishyam3.html",
  title: "Drishyam 3: The Past Never Stays Silent",
  metaTitle: "Drishyam 3: The Past Never Stays Silent All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Georgekutty faces his biggest challenge yet as the ghosts of his past return to threaten his family's peaceful existence.",
  plot: "Georgekutty faces his biggest challenge yet as the ghosts of his past return to threaten his family's peaceful existence.",
  language: "Malayalam",
  releaseDate: "May 2026",
  year: "2026",
  genre: "Crime, Thriller, Drama",
  duration: "155 min",
  director: "Jeethu Joseph",
  writer: "Jeethu Joseph",
  basedOn: "",
  boxOffice: "TBD",
  budget: "TBD",
  poster: "pics/Films/Drishyam3/1.jpg",
  banner: "pics/Films/Drishyam3/2.jpg",
  gallery: [
    { src: "pics/Films/Drishyam3/1.jpg", alt: "Poster 1" },
    { src: "pics/Films/Drishyam3/2.jpg", alt: "Poster 2" }
  ],
  awards: "None yet",
  ratings: [
    {
      source: "OakShow",
      score: "7.0/10",
      url: "https://oakshow.in/Drishyam3.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "6.6/10",
      url: "https://www.imdb.com/title/tt14113634/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "NDTV",
      score: "4.0/5",
      url: "https://www.ndtv.com/entertainment/drishyam-3-x-review-fans-call-mohanlal-film-a-masterpiece-with-brilliant-twists-11527500",
      icon: "pics/RatingSiteLogos/ndtv.png"
    },
    {
      source: "Times of India",
      score: "3.0/5",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/drishyam-3/movie-review/131246724.cms",
      icon: "pics/RatingSiteLogos/times-of-india.png"
    },
    {
      source: "The Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-3-movie-review-a-close-shave-for-mohanlal-jeethu-joseph-as-georgekutty-battles-himself-10700106/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "India Today",
      score: "2.5/5",
      url: "https://www.indiatoday.in/movies/reviews/story/drishyam-3-review-mohanlal-jeethu-josephs-sequel-is-less-clever-more-dramatic-2914929-2026-05-21",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/drishyam-3-review-georgekutty-finally-runs-out-of-tricks/20260521.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "Hindustan Times",
      score: "2.0/5",
      url: "https://www.hindustantimes.com/entertainment/others/drishyam-3-movie-review-how-long-can-georgekutty-and-mohanlal-keep-this-up-101779350101685.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    }
  ],
  cast: [
    { actor: "Mohanlal", role: "Georgekutty" },
    { actor: "Meena", role: "Rani George" },
    { actor: "Ansiba Hassan", role: "Anju George" },
    { actor: "Esther Anil", role: "Anu George" }
  ],
  trailer: extractYoutubeId("https://www.youtube.com/watch?v=07h9Y1XKBWI"),
  videos: [
    { title: "Main Trailer", ytId: extractYoutubeId("https://www.youtube.com/watch?v=07h9Y1XKBWI") },
    { title: "Teaser", ytId: extractYoutubeId("https://www.youtube.com/watch?v=IVH0umuNU-k") }
  ],
  musicLinks: {
    spotify: "https://open.spotify.com/playlist/7hzTDaVfCTlz2ed3aEQMm3",
    appleMusic: "https://music.apple.com/iq/album/drishyam-3-original-background-score/6775843884",
    jiosaavn: "https://www.jiosaavn.com/album/drishyam-3-original-background-score/FKe52UmMFn4_",
    youtubeMusic: ""
  },
  songs: [],
  streaming: {
    netflix: "",
    prime: "https://www.primevideo.com/detail/0R9LD1VHGWBGMWFEQ9TQAO1ESE?ref_=atv_dp_share_cu_r",
    hotstar: "",
    zee5: "",
    sonyliv: "",
    aha: "",
    youtube: ""
  },
  watchOnline: [
    { platform: "Prime Video", url: "https://www.primevideo.com/detail/0R9LD1VHGWBGMWFEQ9TQAO1ESE?ref_=atv_dp_share_cu_r", icon: "pics/StreamingSiteLogos/prime.png" }
  ],
  bookings: [
    { platform: "BookMyShow", url: "https://in.bookmyshow.com/movies/drishyam-3-malayalam/ET00487295", icon: "pics/BookingSiteLogos/bookmyshow.png" },
    { platform: "District", url: "https://www.district.in/movies/drishyam-3-malayalam-movie-tickets-MV200342?srsltid=AU7gw4Xx_XyFu-XJHldekiO1cE9TIXvBK8MgqLF0CUjBBiKsMJIvcZPC", icon: "pics/BookingSiteLogos/district.png" },
    { platform: "Fandango", url: "https://www.fandango.com/drishyam-3-2026-244690/movie-overview", icon: "pics/BookingSiteLogos/fandango.png" }
  ]
};

const drishyam3Reviews = [
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "NDTV",
    criticName: "NDTV",
    outlet: "NDTV",
    score: "4.0/5",
    rating: "4.0/5",
    date: "2026",
    title: "Drishyam 3 X Review: Fans Call Mohanlal Film A 'Masterpiece' With Brilliant Twists",
    url: "https://www.ndtv.com/entertainment/drishyam-3-x-review-fans-call-mohanlal-film-a-masterpiece-with-brilliant-twists-11527500"
  },
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "Times of India",
    criticName: "Times of India",
    outlet: "Times of India",
    score: "3.0/5",
    rating: "3.0/5",
    date: "2026",
    title: "Drishyam 3 Movie Review",
    url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/drishyam-3/movie-review/131246724.cms"
  },
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2026",
    title: "Drishyam 3 movie review: A close shave for Mohanlal, Jeethu Joseph as Georgekutty battles himself",
    url: "https://indianexpress.com/article/entertainment/movie-review/drishyam-3-movie-review-a-close-shave-for-mohanlal-jeethu-joseph-as-georgekutty-battles-himself-10700106/"
  },
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2026",
    title: "Drishyam 3 review: Mohanlal, Jeethu Joseph's sequel is less clever, more dramatic",
    url: "https://www.indiatoday.in/movies/reviews/story/drishyam-3-review-mohanlal-jeethu-josephs-sequel-is-less-clever-more-dramatic-2914929-2026-05-21"
  },
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "Rediff",
    criticName: "Rediff",
    outlet: "Rediff",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2026",
    title: "Drishyam 3 review: Georgekutty finally runs out of tricks",
    url: "https://www.rediff.com/movies/review/drishyam-3-review-georgekutty-finally-runs-out-of-tricks/20260521.htm"
  },
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "Hindustan Times",
    criticName: "Hindustan Times",
    outlet: "Hindustan Times",
    score: "2.0/5",
    rating: "2.0/5",
    date: "2026",
    title: "Drishyam 3 movie review: How long can Georgekutty and Mohanlal keep this up?",
    url: "https://www.hindustantimes.com/entertainment/others/drishyam-3-movie-review-how-long-can-georgekutty-and-mohanlal-keep-this-up-101779350101685.html"
  },
  {
    movieId: "Drishyam3",
    movie: "Drishyam 3: The Past Never Stays Silent",
    author: "The Hindu",
    criticName: "The Hindu",
    outlet: "The Hindu",
    score: "2.5/5",
    rating: "2.5/5",
    date: "2026",
    title: "Drishyam 3 review: Mohanlal, Jeethu Joseph... least effective film of the franchise",
    url: "https://www.thehindu.com/entertainment/movies/drishyam-3-review-mohanlal-jeethu-joseph-drishyam-drishyam-4-least-effective-film-of-the-franchise/article71005682.ece"
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
    id: `drishyam3-review-${idx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

console.log('Successfully added Drishyam 3');
