const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');

// 1. Update TheParadise in movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const pIndex = movies.findIndex(m => m.id === 'TheParadise' || m.filename === 'TheParadise.html');

const paradiseMovie = {
  id: "TheParadise",
  slug: "the-paradise",
  type: "movie",
  category: "Indian",
  score: 5.0,
  filename: "TheParadise.html",
  title: "The Paradise",
  metaTitle: "The Paradise (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "The Paradise is a 2026 Indian Telugu-language period action drama film directed by Srikanth Odela and produced by Sudhakar Cherukuri under SLV Cinemas. Starring Natural Star Nani alongside Mohan Babu, Kayadu Lohar, and Raghav Juyal, with music composed by Anirudh Ravichander, the film depicts a revolutionary battle against systemic oppression in 1980s Secunderabad.",
  plot: "Set against the raw, industrial backdrop of 1980s Secunderabad, The Paradise chronicles the meteoric rise of an audacious local rebel (Nani) standing tall against entrenched sociopolitical dynasties and corrupt syndicates. Supported by key allies and pitted against ruthless oppressors, his journey evolves from personal resistance into an explosive mass uprising.",
  language: "Telugu",
  releaseDate: "September 24, 2026",
  year: "2026",
  genre: "Action, Drama, Period",
  duration: "2hr 38min",
  director: "Srikanth Odela",
  writer: "Srikanth Odela",
  boxOffice: "₹55–75 crore ($6.6–9.0 million) [Day 1 Worldwide Gross]",
  budget: "₹120–150 crore",
  poster: "pics/Films/TheParadise/1.jpg",
  banner: "pics/Films/TheParadise/2.jpg",
  gallery: [
    {
      src: "pics/Films/TheParadise/1.jpg",
      alt: "The Paradise Official Theatrical Poster"
    },
    {
      src: "pics/Films/TheParadise/2.jpg",
      alt: "The Paradise Key Banner Art"
    },
    {
      src: "pics/Films/TheParadise/3.jpg",
      alt: "Nani in Aaya Sher Song from The Paradise"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "5.0/10",
      url: "https://oakshow.in/TheParadise.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-this-one-is-above-average.png"
    },
    {
      source: "IMDb",
      score: "6.3/10",
      url: "https://www.imdb.com/title/tt38573542/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "36%",
      url: "https://www.rottentomatoes.com/m/the_paradise_2026",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Times of India",
      score: "2.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/telugu/movie-reviews/the-paradise/movie-review/134452196.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    },
    {
      source: "Times Now",
      score: "2.5/5",
      url: "https://www.timesnownews.com/entertainment-news/reviews/the-paradise-review-2026-nani-movie-review-cast-story-release-date-rating-and-more-review-156213134",
      icon: "pics/RatingSiteLogos/times-now.ico"
    },
    {
      source: "NDTV",
      score: "2.5/5",
      url: "https://www.ndtv.com/entertainment/the-paradise-review-excessive-violence-sucks-the-air-out-of-nanis-film-2-5-stars-12090995",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "News18",
      score: "2.5/5",
      url: "https://www.news18.com/amp/movies/telugu-cinema/the-paradise-movie-review-nani-powers-a-visually-striking-film-that-loses-its-way-ws-l-10350576.html",
      icon: "pics/RatingSiteLogos/news-18.png"
    },
    {
      source: "India Today",
      score: "2.0/5",
      url: "https://www.indiatoday.in/movies/reviews/story/the-paradise-review-nani-performance-anchors-srikanth-odela-uneven-action-film-3001630-2026-09-24",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "The Indian Express",
      score: "2.0/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/the-paradise-movie-review-nani-stands-out-srikanth-odela-film-relies-on-tired-tropes-10891584/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "Deccan Chronicle",
      score: "1.5/5",
      url: "https://www.deccanchronicle.com/entertainment/movie-review/the-paradise-review-nani-gets-lost-in-a-violent-overcooked-saga-1990131",
      icon: "pics/RatingSiteLogos/deccan-chronicle.ico"
    },
    {
      source: "Pinkvilla",
      score: "1.5/5",
      url: "https://www.pinkvilla.com/entertainment/south/the-paradise-review-nanis-acting-and-anirudh-ravichanders-music-cannot-save-uncreative-and-flat-action-thriller-1405572",
      icon: "pics/RatingSiteLogos/pinkvilla.png"
    },
    {
      source: "Hindustan Times",
      score: "1.0/5",
      url: "https://www.hindustantimes.com/entertainment/telugu-cinema/the-paradise-movie-review-nanis-film-leaves-you-with-a-sense-of-d-j-vu-bogged-down-by-legacy-it-doesnt-live-up-to-101790171459865.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    }
  ],
  cast: [
    { actor: "Nani", role: "Protagonist", description: "Natural Star Nani as the revolutionary leader" },
    { actor: "Raghav Juyal", role: "Antagonist", description: "Fierce adversary" },
    { actor: "Mohan Babu", role: "Elder Patriarch", description: "Key character role" },
    { actor: "Kayadu Lohar", role: "Female Lead", description: "Lead actress" },
    { actor: "Sonali Kulkarni", role: "Mother", description: "Emotional core of the story" },
    { actor: "Sampoornesh Babu", role: "Supporting Role", description: "Supporting character" }
  ],
  trailers: [
    {
      title: "Teaser (Telugu)",
      url: "https://www.youtube.com/watch?v=Y3xewv1ZnHc",
      embedUrl: "https://www.youtube-nocookie.com/embed/Y3xewv1ZnHc",
      youtubeId: "Y3xewv1ZnHc",
      type: "Teaser"
    },
    {
      title: "Teaser (Malayalam)",
      url: "https://www.youtube.com/watch?v=qkqqtP6QpdI",
      embedUrl: "https://www.youtube-nocookie.com/embed/qkqqtP6QpdI",
      youtubeId: "qkqqtP6QpdI",
      type: "Teaser"
    },
    {
      title: "Teaser (Tamil)",
      url: "https://www.youtube.com/watch?v=LMqE7OAewkg",
      embedUrl: "https://www.youtube-nocookie.com/embed/LMqE7OAewkg",
      youtubeId: "LMqE7OAewkg",
      type: "Teaser"
    },
    {
      title: "Teaser (Hindi)",
      url: "https://www.youtube.com/watch?v=hc6CE4Rnjjs",
      embedUrl: "https://www.youtube-nocookie.com/embed/hc6CE4Rnjjs",
      youtubeId: "hc6CE4Rnjjs",
      type: "Teaser"
    },
    {
      title: "Official Glimpse",
      url: "https://www.youtube.com/watch?v=namFQ8wFdIA",
      embedUrl: "https://www.youtube-nocookie.com/embed/namFQ8wFdIA",
      youtubeId: "namFQ8wFdIA",
      type: "Teaser"
    },
    {
      title: "Aaya Sher (Song 1)",
      url: "https://www.youtube.com/watch?v=iAtoZar5W58",
      embedUrl: "https://www.youtube-nocookie.com/embed/iAtoZar5W58",
      youtubeId: "iAtoZar5W58",
      type: "Song"
    },
    {
      title: "Yeshanagula (Song 2)",
      url: "https://www.youtube.com/watch?v=JqFzhcWo3EU",
      embedUrl: "https://www.youtube-nocookie.com/embed/JqFzhcWo3EU",
      youtubeId: "JqFzhcWo3EU",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Teaser (Telugu)",
      url: "https://www.youtube.com/watch?v=Y3xewv1ZnHc",
      youtubeId: "Y3xewv1ZnHc"
    },
    {
      title: "Teaser (Malayalam)",
      url: "https://www.youtube.com/watch?v=qkqqtP6QpdI",
      youtubeId: "qkqqtP6QpdI"
    },
    {
      title: "Teaser (Tamil)",
      url: "https://www.youtube.com/watch?v=LMqE7OAewkg",
      youtubeId: "LMqE7OAewkg"
    },
    {
      title: "Teaser (Hindi)",
      url: "https://www.youtube.com/watch?v=hc6CE4Rnjjs",
      youtubeId: "hc6CE4Rnjjs"
    },
    {
      title: "Official Glimpse",
      url: "https://www.youtube.com/watch?v=namFQ8wFdIA",
      youtubeId: "namFQ8wFdIA"
    },
    {
      title: "Aaya Sher (Song 1)",
      url: "https://www.youtube.com/watch?v=iAtoZar5W58",
      youtubeId: "iAtoZar5W58"
    },
    {
      title: "Yeshanagula (Song 2)",
      url: "https://www.youtube.com/watch?v=JqFzhcWo3EU",
      youtubeId: "JqFzhcWo3EU"
    }
  ],
  music: [
    {
      provider: "Spotify (Telugu)",
      url: "https://open.spotify.com/playlist/49k50t3cRBymberfndRjTG",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify (Telugu)"
    },
    {
      provider: "Spotify (Malayalam)",
      url: "https://open.spotify.com/playlist/0YngYZHyiKpK7mKamFFQMI",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify (Malayalam)"
    },
    {
      provider: "Spotify (Tamil)",
      url: "https://open.spotify.com/playlist/3H19c7Efg2OZmeP1jDKhni",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify (Tamil)"
    },
    {
      provider: "Spotify (Hindi)",
      url: "https://open.spotify.com/playlist/5EabHepbNK0xO6QVuemrRD",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify (Hindi)"
    },
    {
      provider: "Spotify (Kannada)",
      url: "https://open.spotify.com/playlist/0rrJbwO2JGpvvyUVw9RjRJ",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify (Kannada)"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/song/the-paradise-glimpse-from-the-paradise/1814385152",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/the-paradise-theme-ost-from-the-paradise/FgZtl-GsGnM_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/the-paradise/ET00436621",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/the-paradise-movie-tickets-MV185027?srsltid=AU7gw4XqXqaOlgH4BPq2DVAg9a1VJNGQccIbMZxUr-s-X8er21zWlDcW",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/the-paradise-2026-246366/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/the-paradise-movie-detail-185027",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 4
    },
    {
      provider: "ODEON",
      url: "https://www.odeon.co.uk/films/the-paradise-telugu/HO00009454/",
      icon: "pics/BookngWebSiteLogos/odeon.png",
      label: "Book on ODEON",
      rank: 5
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/1000020779-the-paradise/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 6
    }
  ],
  watchOnline: [],
  articles: [
    {
      headline: "The Paradise Review: Excessive Violence Sucks The Air Out Of Nani's Film",
      url: "https://www.ndtv.com/entertainment/the-paradise-review-excessive-violence-sucks-the-air-out-of-nanis-film-2-5-stars-12090995",
      author: "NDTV",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise Movie Review: A gritty, violent revenge saga that falters in emotional depth",
      url: "https://timesofindia.indiatimes.com/entertainment/telugu/movie-reviews/the-paradise/movie-review/134452196.cms",
      author: "Times of India",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise Movie Review: Nani Delivers An Intense Turn But The Screaming Plot Derails",
      url: "https://www.timesnownews.com/entertainment-news/reviews/the-paradise-review-2026-nani-movie-review-cast-story-release-date-rating-and-more-review-156213134",
      author: "Times Now",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise Movie Review: Nani Powers A Visually Striking Film That Loses Its Way",
      url: "https://www.news18.com/amp/movies/telugu-cinema/the-paradise-movie-review-nani-powers-a-visually-striking-film-that-loses-its-way-ws-l-10350576.html",
      author: "News18",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise review: Nani's performance anchors Srikanth Odela's uneven action film",
      url: "https://www.indiatoday.in/movies/reviews/story/the-paradise-review-nani-performance-anchors-srikanth-odela-uneven-action-film-3001630-2026-09-24",
      author: "India Today",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise movie review: Nani stands out, but Srikanth Odela film relies on tired tropes",
      url: "https://indianexpress.com/article/entertainment/movie-review/the-paradise-movie-review-nani-stands-out-srikanth-odela-film-relies-on-tired-tropes-10891584/",
      author: "The Indian Express",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise review: Nani gets lost in a violent, overcooked saga",
      url: "https://www.deccanchronicle.com/entertainment/movie-review/the-paradise-review-nani-gets-lost-in-a-violent-overcooked-saga-1990131",
      author: "Deccan Chronicle",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise Review: Nani's acting and Anirudh Ravichander's music cannot save uncreative and flat action thriller",
      url: "https://www.pinkvilla.com/entertainment/south/the-paradise-review-nanis-acting-and-anirudh-ravichanders-music-cannot-save-uncreative-and-flat-action-thriller-1405572",
      author: "Pinkvilla",
      date: "September 24, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Paradise movie review: Nani's film leaves you with a sense of déjà vu, bogged down by legacy it doesn't live up to",
      url: "https://www.hindustantimes.com/entertainment/telugu-cinema/the-paradise-movie-review-nanis-film-leaves-you-with-a-sense-of-d-j-vu-bogged-down-by-legacy-it-doesnt-live-up-to-101790171459865.html",
      author: "Hindustan Times",
      date: "September 24, 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "V",
      link: "V.html",
      poster: "pics/Films/V/2.jpg"
    },
    {
      title: "Devadas",
      link: "Devadas.html",
      poster: "pics/Films/Devadas/1.jpg"
    },
    {
      title: "Ninnu Kori",
      link: "NinnuKori.html",
      poster: "pics/Films/NinnuKori/1.jpg"
    },
    {
      title: "Gentleman",
      link: "Gentleman.html",
      poster: "pics/Films/Gentleman/4.jpg"
    }
  ],
  wikipedia: "",
  imdb: "https://www.imdb.com/title/tt38573542/",
  status: "released"
};

if (pIndex !== -1) {
  movies[pIndex] = paradiseMovie;
} else {
  movies.unshift(paradiseMovie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Updated TheParadise in movies.json (status: released, score: 5.0)`);

// 2. Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(s => s.id === 'TheParadise' || s.url === 'TheParadise.html');
const sItem = {
  id: "TheParadise",
  title: "The Paradise",
  type: "movie",
  category: "Indian",
  year: "2026",
  genre: "Action, Drama, Period",
  language: "Telugu",
  score: 5.0,
  poster: "pics/Films/TheParadise/1.jpg",
  status: "released",
  url: "TheParadise.html"
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = sItem;
} else {
  searchIndex.unshift(sItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json for TheParadise`);

// 3. Add all 9 reviews to reviews.json
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
// Remove existing reviews for TheParadise if any
reviews = reviews.filter(r => r.movieId !== 'TheParadise');

const newParadiseReviews = [
  {
    id: "the-paradise-review-1",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "NDTV",
    criticName: "NDTV",
    outlet: "NDTV",
    score: "2.5/5",
    rating: "2.5/5",
    date: "September 24, 2026",
    title: "The Paradise Review: Excessive Violence Sucks The Air Out Of Nani's Film",
    url: "https://www.ndtv.com/entertainment/the-paradise-review-excessive-violence-sucks-the-air-out-of-nanis-film-2-5-stars-12090995"
  },
  {
    id: "the-paradise-review-2",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "Times of India",
    criticName: "Times of India",
    outlet: "Times of India",
    score: "2.5/5",
    rating: "2.5/5",
    date: "September 24, 2026",
    title: "The Paradise Movie Review: A gritty, violent revenge saga that falters in emotional depth",
    url: "https://timesofindia.indiatimes.com/entertainment/telugu/movie-reviews/the-paradise/movie-review/134452196.cms"
  },
  {
    id: "the-paradise-review-3",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "Times Now",
    criticName: "Times Now",
    outlet: "Times Now",
    score: "2.5/5",
    rating: "2.5/5",
    date: "September 24, 2026",
    title: "The Paradise Movie Review: Nani Delivers An Intense Turn But The Screaming Plot Derails",
    url: "https://www.timesnownews.com/entertainment-news/reviews/the-paradise-review-2026-nani-movie-review-cast-story-release-date-rating-and-more-review-156213134"
  },
  {
    id: "the-paradise-review-4",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "News18",
    criticName: "News18",
    outlet: "News18",
    score: "2.5/5",
    rating: "2.5/5",
    date: "September 24, 2026",
    title: "The Paradise Movie Review: Nani Powers A Visually Striking Film That Loses Its Way",
    url: "https://www.news18.com/amp/movies/telugu-cinema/the-paradise-movie-review-nani-powers-a-visually-striking-film-that-loses-its-way-ws-l-10350576.html"
  },
  {
    id: "the-paradise-review-5",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "2/5",
    rating: "2/5",
    date: "September 24, 2026",
    title: "The Paradise review: Nani's performance anchors Srikanth Odela's uneven action film",
    url: "https://www.indiatoday.in/movies/reviews/story/the-paradise-review-nani-performance-anchors-srikanth-odela-uneven-action-film-3001630-2026-09-24"
  },
  {
    id: "the-paradise-review-6",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "2/5",
    rating: "2/5",
    date: "September 24, 2026",
    title: "The Paradise movie review: Nani stands out, but Srikanth Odela film relies on tired tropes",
    url: "https://indianexpress.com/article/entertainment/movie-review/the-paradise-movie-review-nani-stands-out-srikanth-odela-film-relies-on-tired-tropes-10891584/"
  },
  {
    id: "the-paradise-review-7",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "Deccan Chronicle",
    criticName: "Deccan Chronicle",
    outlet: "Deccan Chronicle",
    score: "1.5/5",
    rating: "1.5/5",
    date: "September 24, 2026",
    title: "The Paradise review: Nani gets lost in a violent, overcooked saga",
    url: "https://www.deccanchronicle.com/entertainment/movie-review/the-paradise-review-nani-gets-lost-in-a-violent-overcooked-saga-1990131"
  },
  {
    id: "the-paradise-review-8",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "Pinkvilla",
    criticName: "Pinkvilla",
    outlet: "Pinkvilla",
    score: "1.5/5",
    rating: "1.5/5",
    date: "September 24, 2026",
    title: "The Paradise Review: Nani's acting and Anirudh Ravichander's music cannot save uncreative and flat action thriller",
    url: "https://www.pinkvilla.com/entertainment/south/the-paradise-review-nanis-acting-and-anirudh-ravichanders-music-cannot-save-uncreative-and-flat-action-thriller-1405572"
  },
  {
    id: "the-paradise-review-9",
    movieId: "TheParadise",
    movie: "The Paradise",
    author: "Hindustan Times",
    criticName: "Hindustan Times",
    outlet: "Hindustan Times",
    score: "1/5",
    rating: "1/5",
    date: "September 24, 2026",
    title: "The Paradise movie review: Nani's film leaves you with a sense of déjà vu, bogged down by legacy it doesn't live up to",
    url: "https://www.hindustantimes.com/entertainment/telugu-cinema/the-paradise-movie-review-nanis-film-leaves-you-with-a-sense-of-d-j-vu-bogged-down-by-legacy-it-doesnt-live-up-to-101790171459865.html"
  }
];

reviews.unshift(...newParadiseReviews);
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');
console.log(`Added ${newParadiseReviews.length} reviews for The Paradise to reviews.json (${reviews.length} total)`);

console.log('The Paradise successfully updated as released!');
