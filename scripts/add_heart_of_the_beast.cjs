const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');

// Movie definition
const heartOfTheBeastMovie = {
  id: "HeartoftheBeast",
  slug: "heart-of-the-beast",
  type: "movie",
  category: "Hollywood",
  score: 9.0,
  filename: "HeartoftheBeast.html",
  title: "Heart of the Beast",
  metaTitle: "Heart of the Beast (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A retired Special Forces officer crashes his seaplane in the remote Alaskan wilderness following a sudden heart attack, forcing him and his retired combat dog Odin to battle the unforgiving elements and perilous terrain in a fight for survival.",
  plot: "James Belmont (Brad Pitt), a decorated former Navy SEAL living off the grid with his loyal retired military combat dog, Odin, suffers a severe myocardial infarction while piloting his de Havilland Beaver seaplane over the Alaskan frontier. The resulting crash leaves Belmont grievously wounded and stranded deep in treacherous, freezing sub-zero wilderness. Battling starvation, freezing blizzards, predator threats, and internal trauma, Belmont and Odin form an extraordinary lifeline of mutual endurance, relying on their bond and military survival instincts to navigate the perilous journey back to civilization.",
  language: "English",
  releaseDate: "September 25, 2026",
  year: "2026",
  genre: "Action, Adventure, Survival, Drama, Thriller",
  duration: "1hr 50min",
  director: "David Ayer",
  writer: "Cameron Alexander",
  basedOn: "",
  boxOffice: "$15–25 million (Projected Opening Weekend)",
  budget: "$82 million",
  poster: "pics/Films/HeartoftheBeast/1.jpeg",
  banner: "pics/Films/HeartoftheBeast/2.jpeg",
  gallery: [
    {
      src: "pics/Films/HeartoftheBeast/1.jpeg",
      alt: "Heart of the Beast Theatrical Poster"
    },
    {
      src: "pics/Films/HeartoftheBeast/2.jpeg",
      alt: "Brad Pitt as James Belmont in Heart of the Beast"
    },
    {
      src: "pics/Films/HeartoftheBeast/3.jpg",
      alt: "James Belmont and Odin in the Alaskan Wilderness"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "9.0/10",
      url: "https://oakshow.in/HeartoftheBeast.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "88%",
      url: "https://www.rottentomatoes.com/m/heart_of_the_beast",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    },
    {
      source: "IMDb",
      score: "7.2/10",
      url: "https://www.imdb.com/title/tt7526136/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Metacritic",
      score: "69/100",
      url: "https://www.metacritic.com/movie/heart-of-the-beast/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "IGN",
      score: "8.0/10",
      url: "https://www.ign.com/articles/heart-of-the-beast-review-brad-pitt",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Common Sense Media",
      score: "4.0/5",
      url: "https://www.commonsensemedia.org/movie-reviews/heart-of-the-beast",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "Hindustan Times",
      score: "4.0/5",
      url: "https://www.hindustantimes.com/entertainment/hollywood/heart-of-the-beast-review-brad-pitt-flawless-moving-survival-thriller-will-make-you-want-to-hug-your-dog-david-ayer-101790143214035.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "The Telegraph",
      score: "4.0/5",
      url: "https://www.telegraph.co.uk/films/2026/09/22/heart-of-the-beast-review/",
      icon: "pics/RatingSiteLogos/telegraph.png"
    },
    {
      source: "Times Now",
      score: "4.0/5",
      url: "https://www.timesnownews.com/entertainment-news/reviews/heart-of-the-beast-movie-review-brad-pitt-survival-drama-is-a-tearjerking-tale-every-dog-lover-will-feel-review-156205801",
      icon: "pics/RatingSiteLogos/times-now.ico"
    },
    {
      source: "Times of India",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/heart-of-the-beast/amp_movie_review/134427324.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "India Today",
      score: "3.5/5",
      url: "https://www.indiatoday.in/amp/movies/reviews/story/heart-of-the-beast-review-brad-pitt-odin-david-ayer-survival-thriller-3000810-2026-09-23",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "The Guardian",
      score: "3.0/5",
      url: "https://www.theguardian.com/film/2026/sep/22/heart-of-the-beast-review-brad-pitt-survivalist-dogmance-serves-up-wilderness-with-side-of-cheese",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Rediff",
      score: "3.0/5",
      url: "https://www.rediff.com/movies/review/heart-of-the-beast-review-come-for-brad-pitt-stay-for-the-dog/20260923.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    }
  ],
  cast: [
    { actor: "Brad Pitt", role: "James Belmont" },
    { actor: "Uber", role: "Odin (Combat Dog)" },
    { actor: "J.K. Simmons", role: "Donald Belmont" },
    { actor: "Anna Lambe", role: "Chapa" }
  ],
  trailers: [
    {
      title: "Heart of the Beast Official Main Trailer",
      url: "https://www.youtube.com/watch?v=JFQcDFhNh4o",
      embedUrl: "https://www.youtube-nocookie.com/embed/JFQcDFhNh4o",
      youtubeId: "JFQcDFhNh4o",
      type: "Main Trailer"
    },
    {
      title: "Heart of the Beast Official Trailer 2",
      url: "https://www.youtube.com/watch?v=bfCgu83suHs",
      embedUrl: "https://www.youtube-nocookie.com/embed/bfCgu83suHs",
      youtubeId: "bfCgu83suHs",
      type: "Trailer 2"
    }
  ],
  videos: [
    {
      title: "Heart of the Beast Official Main Trailer",
      url: "https://www.youtube.com/watch?v=JFQcDFhNh4o",
      youtubeId: "JFQcDFhNh4o"
    },
    {
      title: "Heart of the Beast Official Trailer 2",
      url: "https://www.youtube.com/watch?v=bfCgu83suHs",
      youtubeId: "bfCgu83suHs"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/1otSyji3c3mnhJm4sB0uJS",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kozhikode/heart-of-the-beast/ET00504928",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/heart-of-the-beast-movie-tickets-MV225112?srsltid=AU7gw4Ws6cAzBXFH42MC40cuNQ6xOgmpAEbq4Ptj_YK2VtRg8D2jRSgC",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/heart-of-the-beast-2026-246224/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/heart-of-the-beast-movie-detail-225112",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 4
    },
    {
      provider: "Eventbrite",
      url: "https://www.eventbrite.com/e/free-movie-heart-of-the-beast-tickets-1998771979797",
      icon: "pics/BookngWebSiteLogos/eventbrite.png",
      label: "Book on Eventbrite",
      rank: 5
    },
    {
      provider: "ODEON",
      url: "https://www.odeon.co.uk/films/heart-of-the-beast/HO00009115/",
      icon: "pics/BookngWebSiteLogos/odeon.png",
      label: "Book on ODEON",
      rank: 6
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/1000000085-heart-of-the-beast/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 7
    }
  ],
  articles: [
    {
      headline: "Heart of the Beast movie review: A rugged Brad Pitt snuggles warmth in aching canine bromance",
      url: "https://www.thehindu.com/entertainment/movies/heart-of-the-beast-movie-review-a-rugged-brad-pitt-snuggles-warmth-in-aching-canine-bromance/article71497150.ece",
      author: "The Hindu",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart of the Beast review: Brad Pitt is flawless in moving survival thriller that will make you want to hug your dog",
      url: "https://www.hindustantimes.com/entertainment/hollywood/heart-of-the-beast-review-brad-pitt-flawless-moving-survival-thriller-will-make-you-want-to-hug-your-dog-david-ayer-101790143214035.html",
      author: "Hindustan Times",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart Of The Beast Review: Come For Brad Pitt, Stay For The Dog",
      url: "https://www.rediff.com/movies/review/heart-of-the-beast-review-come-for-brad-pitt-stay-for-the-dog/20260923.htm",
      author: "Rediff",
      date: "September 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "'Heart of the Beast' Review: Brad Pitt and an Incredible Dog Face the Elements in David Ayer's Gripping Alaskan Wilderness Saga",
      url: "https://variety.com/2026/film/reviews/heart-of-the-beast-review-brad-pitt-1236870505/",
      author: "Variety",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart of the Beast, review: Brad Pitt and a loyal dog survive the wild in a crowd-pleasing thriller",
      url: "https://www.telegraph.co.uk/films/2026/09/22/heart-of-the-beast-review/",
      author: "The Telegraph",
      date: "September 22, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart of the Beast review – Brad Pitt survivalist 'dogmance' serves up wilderness with side of cheese",
      url: "https://www.theguardian.com/film/2026/sep/22/heart-of-the-beast-review-brad-pitt-survivalist-dogmance-serves-up-wilderness-with-side-of-cheese",
      author: "The Guardian",
      date: "September 22, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart Of The Beast Movie Review: Brad Pitt's Survival Drama Is A Tearjerking Tale Every Dog Lover Will Feel",
      url: "https://www.timesnownews.com/entertainment-news/reviews/heart-of-the-beast-movie-review-brad-pitt-survival-drama-is-a-tearjerking-tale-every-dog-lover-will-feel-review-156205801",
      author: "Times Now",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart of the Beast Review: Brad Pitt anchors David Ayer's visceral survival thriller",
      url: "https://www.ign.com/articles/heart-of-the-beast-review-brad-pitt",
      author: "IGN",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart of the Beast review: Brad Pitt and Odin lead David Ayer's gripping survival thriller",
      url: "https://www.indiatoday.in/amp/movies/reviews/story/heart-of-the-beast-review-brad-pitt-odin-david-ayer-survival-thriller-3000810-2026-09-23",
      author: "India Today",
      date: "September 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Heart Of The Beast Movie Review: A poignant tale of human-canine endurance in the Alaskan wild",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/heart-of-the-beast/amp_movie_review/134427324.cms",
      author: "Times of India",
      date: "September 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "Forgotten Island",
      link: "ForgottenIsland.html",
      poster: "pics/Films/ForgottenIsland/1.jpg"
    },
    {
      title: "The Runner",
      link: "TheRunner.html",
      poster: "pics/Films/TheRunner/1.jpg"
    },
    {
      title: "Resident Evil",
      link: "ResidentEvil2026.html",
      poster: "pics/Films/ResidentEvil2026/1.jpg"
    },
    {
      title: "Avatar: The Way of Water",
      link: "AvatarTheWayofWater.html",
      poster: "pics/Films/AvatarTheWayofWater/2.jpg"
    },
    {
      title: "The Old Guard",
      link: "TheOldGuard.html",
      poster: "pics/Films/TheOldGuard/2.jpg"
    },
    {
      title: "News of the World",
      link: "NewsoftheWorld.html",
      poster: "pics/Films/NewsoftheWorld/2.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Heart_of_the_Beast",
  imdb: "https://www.imdb.com/title/tt7526136/"
};

// 1. Process movies.json
console.log('Reading movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

const idx = movies.findIndex(m => m.id === heartOfTheBeastMovie.id || m.filename === heartOfTheBeastMovie.filename || m.title === heartOfTheBeastMovie.title);
if (idx !== -1) {
  movies[idx] = heartOfTheBeastMovie;
  console.log(`Updated existing movie: ${heartOfTheBeastMovie.title} (id: ${heartOfTheBeastMovie.id})`);
} else {
  movies.unshift(heartOfTheBeastMovie);
  console.log(`Inserted new movie: ${heartOfTheBeastMovie.title} (id: ${heartOfTheBeastMovie.id})`);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Successfully updated ${moviesPath} (${movies.length} total entries)`);

// 2. Process search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

const searchItem = {
  id: heartOfTheBeastMovie.id,
  title: heartOfTheBeastMovie.title,
  type: "movie",
  category: heartOfTheBeastMovie.category,
  year: heartOfTheBeastMovie.year,
  genre: heartOfTheBeastMovie.genre,
  language: heartOfTheBeastMovie.language,
  score: heartOfTheBeastMovie.score,
  poster: heartOfTheBeastMovie.poster,
  url: heartOfTheBeastMovie.filename
};

const sIdx = searchIndex.findIndex(s => s.id === heartOfTheBeastMovie.id || s.url === heartOfTheBeastMovie.filename);
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
} else {
  searchIndex.unshift(searchItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Successfully updated ${searchIndexPath} (${searchIndex.length} total entries)`);

// 3. Process reviews.json
console.log('Updating reviews.json...');
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

const reviewsToAdd = [
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "The Hindu",
    criticName: "The Hindu",
    outlet: "The Hindu",
    score: "4/5",
    rating: "Recommended",
    date: "September 2026",
    title: "Heart of the Beast movie review: A rugged Brad Pitt snuggles warmth in aching canine bromance",
    url: "https://www.thehindu.com/entertainment/movies/heart-of-the-beast-movie-review-a-rugged-brad-pitt-snuggles-warmth-in-aching-canine-bromance/article71497150.ece"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "Hindustan Times",
    criticName: "Hindustan Times",
    outlet: "Hindustan Times",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "Heart of the Beast review: Brad Pitt is flawless in moving survival thriller that will make you want to hug your dog",
    url: "https://www.hindustantimes.com/entertainment/hollywood/heart-of-the-beast-review-brad-pitt-flawless-moving-survival-thriller-will-make-you-want-to-hug-your-dog-david-ayer-101790143214035.html"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "Rediff",
    criticName: "Rediff",
    outlet: "Rediff Movies",
    score: "3/5",
    rating: "3/5",
    date: "September 23, 2026",
    title: "Heart Of The Beast Review: Come For Brad Pitt, Stay For The Dog",
    url: "https://www.rediff.com/movies/review/heart-of-the-beast-review-come-for-brad-pitt-stay-for-the-dog/20260923.htm"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "Variety",
    criticName: "Variety",
    outlet: "Variety",
    score: "4/5",
    rating: "Recommended",
    date: "September 2026",
    title: "'Heart of the Beast' Review: Brad Pitt and an Incredible Dog Face the Elements in David Ayer's Gripping Alaskan Wilderness Saga",
    url: "https://variety.com/2026/film/reviews/heart-of-the-beast-review-brad-pitt-1236870505/"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "The Telegraph",
    criticName: "The Telegraph",
    outlet: "The Telegraph",
    score: "4/5",
    rating: "4/5",
    date: "September 22, 2026",
    title: "Heart of the Beast, review: Brad Pitt and a loyal dog survive the wild in a crowd-pleasing thriller",
    url: "https://www.telegraph.co.uk/films/2026/09/22/heart-of-the-beast-review/"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "The Guardian",
    criticName: "The Guardian",
    outlet: "The Guardian",
    score: "3/5",
    rating: "3/5",
    date: "September 22, 2026",
    title: "Heart of the Beast review – Brad Pitt survivalist 'dogmance' serves up wilderness with side of cheese",
    url: "https://www.theguardian.com/film/2026/sep/22/heart-of-the-beast-review-brad-pitt-survivalist-dogmance-serves-up-wilderness-with-side-of-cheese"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "Times Now",
    criticName: "Times Now",
    outlet: "Times Now",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "Heart Of The Beast Movie Review: Brad Pitt's Survival Drama Is A Tearjerking Tale Every Dog Lover Will Feel",
    url: "https://www.timesnownews.com/entertainment-news/reviews/heart-of-the-beast-movie-review-brad-pitt-survival-drama-is-a-tearjerking-tale-every-dog-lover-will-feel-review-156205801"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "IGN",
    criticName: "IGN",
    outlet: "IGN",
    score: "8/10",
    rating: "8/10",
    date: "September 2026",
    title: "Heart of the Beast Review: Brad Pitt anchors David Ayer's visceral survival thriller",
    url: "https://www.ign.com/articles/heart-of-the-beast-review-brad-pitt"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "3.5/5",
    rating: "3.5/5",
    date: "September 23, 2026",
    title: "Heart of the Beast review: Brad Pitt and Odin lead David Ayer's gripping survival thriller",
    url: "https://www.indiatoday.in/amp/movies/reviews/story/heart-of-the-beast-review-brad-pitt-odin-david-ayer-survival-thriller-3000810-2026-09-23"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "Times of India",
    criticName: "Times of India",
    outlet: "Times of India",
    score: "3.5/5",
    rating: "3.5/5",
    date: "September 2026",
    title: "Heart Of The Beast Movie Review: A poignant tale of human-canine endurance in the Alaskan wild",
    url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/heart-of-the-beast/amp_movie_review/134427324.cms"
  },
  {
    movieId: "HeartoftheBeast",
    movie: "Heart of the Beast",
    author: "Common Sense Media",
    criticName: "Common Sense Media",
    outlet: "Common Sense Media",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "Heart of the Beast Movie Review for Parents",
    url: "https://www.commonsensemedia.org/movie-reviews/heart-of-the-beast"
  }
];

reviewsToAdd.forEach((r, rIndex) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `heart-of-the-beast-review-${rIndex + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');
console.log(`Successfully updated ${reviewsPath} (${reviews.length} total entries)`);

console.log('Done inserting Heart of the Beast data!');
