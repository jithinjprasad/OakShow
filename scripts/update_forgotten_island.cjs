const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

const forgottenIslandMovie = {
  id: "ForgottenIsland",
  slug: "forgotten-island",
  type: "movie",
  category: "Hollywood",
  score: 8.0,
  filename: "ForgottenIsland.html",
  aliases: ["forgotten-island", "ForgottenIsland.html"],
  title: "Forgotten Island",
  metaTitle: "Forgotten Island (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  tag: "DreamWorks Animation Adventure",
  tags: [
    "DreamWorks Animation",
    "Universal Pictures",
    "Adventure",
    "Fantasy",
    "Animation",
    "Family"
  ],
  description: "High school graduate Jo and her best friend Raissa find themselves swept away to Nakali, a mystical and forgotten island where creatures from Filipino mythology reside. As they struggle to navigate the perils of this hidden realm and find their way home, their lifelong friendship is tested against ancient forces and an encroaching dark mystery.",
  plot: "On the verge of adulthood and impending separation, longtime friends Jo (H.E.R.) and Raissa (Liza Soberano) are mysteriously transported to Nakali, an uncharted paradise veiled from the modern world where mythical beings and spirits of Filipino folklore dwell. Guided by an eccentric weredog named Raww (Dave Franco) and facing the terrifying shadow of the dread Manananggal (Lea Salonga), the girls must rely on courage, loyalty, and their unbreakable bond to overcome enchanting trials, unravel the island's timeless secrets, and discover that the greatest adventure of all is holding on to friendship when the world threatens to pull them apart.",
  language: "English",
  releaseDate: "September 25, 2026",
  year: "2026",
  status: "released",
  genre: "Animation, Adventure, Comedy, Fantasy, Family",
  genres: ["Animation", "Adventure", "Comedy", "Fantasy", "Family"],
  duration: "1hr 42mins",
  director: "Januel P. Mercado",
  writer: "Januel P. Mercado, H.E.R.",
  basedOn: "Original story inspired by Filipino folklore",
  wikipedia: "https://en.wikipedia.org/wiki/Forgotten_Island",
  imdb: "https://www.imdb.com/title/tt36583977/",
  boxOffice: {
    budget: "$80 Million",
    worldwideGross: "$25–30 Million ($20.6 Million Opening Weekend)",
    openingWeekend: "$20.6 Million Worldwide ($12.5 Million Domestic / $8.1 Million Overseas)",
    openingDay: "$4.8 Million Domestic",
    domesticGross: "$14.5 Million",
    overseasGross: "$9.5 Million",
    verdict: "Theatrical Run in Progress (Universal / DreamWorks)",
    source: "Box Office Mojo, The Numbers & TheWrap",
    lastUpdated: "September 2026"
  },
  poster: "pics/Films/ForgottenIsland/1.jpg",
  banner: "pics/Films/ForgottenIsland/2.jpg",
  gallery: [
    {
      src: "pics/Films/ForgottenIsland/1.jpg",
      alt: "Forgotten Island Official Poster"
    },
    {
      src: "pics/Films/ForgottenIsland/2.jpg",
      alt: "Forgotten Island Official Banner"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8/10",
      url: "https://oakshow.in/ForgottenIsland.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "95%",
      url: "https://www.rottentomatoes.com/m/forgotten_island",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    },
    {
      source: "IMDb",
      score: "7.8/10",
      url: "https://www.imdb.com/title/tt36583977/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "IGN",
      score: "9/10",
      url: "https://www.ign.com/articles/forgotten-island-review",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Roger Ebert",
      score: "3.5/4",
      url: "https://www.rogerebert.com/reviews/forgotten-island-animated-film-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "Common Sense Media",
      score: "4/5",
      url: "https://www.commonsensemedia.org/movie-reviews/forgotten-island",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "Letterboxd",
      score: "3.8/5",
      url: "https://letterboxd.com/film/forgotten-island-2026/",
      icon: "pics/RatingSiteLogos/letterboxd.png"
    },
    {
      source: "Metacritic",
      score: "73/100",
      url: "https://www.metacritic.com/movie/forgotten-island/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "The Telegraph",
      score: "4/5",
      url: "https://www.thetelegraph.com/entertainment/article/movie-review-forgotten-island-is-a-trippy-ode-22445442.php",
      icon: "pics/RatingSiteLogos/telegraph.png"
    },
    {
      source: "The Hindu",
      score: "4/5",
      url: "https://www.thehindu.com/entertainment/movies/forgotten-island-movie-review-folklore-and-friendship-power-a-visually-dazzling-adventure/article71512543.ece",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "The Times of India",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/forgotten-island/movie-review/134454247.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    }
  ],
  awards: [
    {
      organization: "CinemaCon Showcase",
      year: "2026",
      wins: [
        {
          category: "Special Animation Presentation",
          recipient: "DreamWorks Animation & Director Januel P. Mercado"
        }
      ],
      nominations: []
    }
  ],
  cast: [
    {
      actor: "H.E.R.",
      role: "Jo",
      description: "High school graduate navigating Nakali"
    },
    {
      actor: "Liza Soberano",
      role: "Raissa",
      description: "Jo's lifelong best friend"
    },
    {
      actor: "Dave Franco",
      role: "Raww",
      description: "A weredog companion on Nakali"
    },
    {
      actor: "Lea Salonga",
      role: "The Dreaded Manananggal",
      description: "Creature from Filipino folklore"
    },
    {
      actor: "Jenny Slate",
      role: "Nakali Guide",
      description: "Voice cast"
    },
    {
      actor: "Manny Jacinto",
      role: "Supporting Character",
      description: "Voice cast"
    },
    {
      actor: "Dolly de Leon",
      role: "Elder Guide",
      description: "Voice cast"
    },
    {
      actor: "Jo Koy",
      role: "Supporting Character",
      description: "Voice cast"
    },
    {
      actor: "Ronny Chieng",
      role: "Island Inhabitant",
      description: "Voice cast"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/calicut/forgotten-island/ET00498770",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/forgotten-island-movie-tickets-in-mala-MV217316?srsltid=AU7gw4XFTBkeQ3cDaUEGjQAVpLmMWl2Bp2InMXXWvS4akpmzfBsE-L5h",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/forgotten-island-2026-246370/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/forgotten-island-movie-detail-217316",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 4
    },
    {
      provider: "ODEON",
      url: "https://www.odeon.co.uk/films/forgotten-island/HO00008794/",
      icon: "pics/BookngWebSiteLogos/odeon.png",
      label: "Book on ODEON",
      rank: 5
    }
  ],
  watchOnline: [],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/35c85zu97RJsuQm9iefPoG",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/forgotten-island-original-motion-picture-soundtrack/6803618667",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    }
  ],
  officialWebsite: {
    url: "https://www.forgottenislandmovie.com/",
    label: "Visit Official Website"
  },
  socials: [],
  similar: [
    {
      title: "How to Train Your Dragon: The Hidden World",
      link: "HowtoTrainYourDragonTheHiddenWorld.html",
      poster: "pics/Films/HowtoTrainYourDragonTheHiddenWorld/2.jpg"
    },
    {
      title: "Kubo and the Two Strings",
      link: "KuboandtheTwoStrings.html",
      poster: "pics/Films/KuboandtheTwoStrings/1.jpg"
    },
    {
      title: "Incredibles 2",
      link: "Incredibles2.html",
      poster: "pics/Films/Incredibles2/1.jpg"
    },
    {
      title: "Hotel Transylvania 3: Summer Vacation",
      link: "HotelTransylvania3SummerVacation.html",
      poster: "pics/Films/HotelTransylvania3SummerVacation/1.jpg"
    },
    {
      title: "Coyote vs. Acme",
      link: "CoyotevsAcme.html",
      poster: "pics/Films/CoyotevsAcme/2.jpg"
    }
  ],
  videos: [
    {
      url: "https://www.youtube.com/watch?v=a8RHqN93qfo",
      youtubeId: "a8RHqN93qfo",
      title: "Main Trailer",
      type: "Trailer"
    },
    {
      url: "https://www.youtube.com/watch?v=f7mFVeWnVLw",
      youtubeId: "f7mFVeWnVLw",
      title: "Official Trailer 2",
      type: "Trailer"
    },
    {
      url: "https://www.youtube.com/watch?v=NE8HqyEhxww",
      youtubeId: "NE8HqyEhxww",
      title: "Movie Clip",
      type: "Clip"
    }
  ],
  trailers: [
    {
      title: "Main Trailer",
      url: "https://www.youtube.com/watch?v=a8RHqN93qfo",
      embedUrl: "https://www.youtube-nocookie.com/embed/a8RHqN93qfo",
      youtubeId: "a8RHqN93qfo",
      type: "Trailer"
    },
    {
      title: "Official Trailer 2",
      url: "https://www.youtube.com/watch?v=f7mFVeWnVLw",
      embedUrl: "https://www.youtube-nocookie.com/embed/f7mFVeWnVLw",
      youtubeId: "f7mFVeWnVLw",
      type: "Trailer"
    },
    {
      title: "Movie Clip",
      url: "https://www.youtube.com/watch?v=NE8HqyEhxww",
      embedUrl: "https://www.youtube-nocookie.com/embed/NE8HqyEhxww",
      youtubeId: "NE8HqyEhxww",
      type: "Clip"
    }
  ],
  articles: [
    {
      headline: "Review: 'Forgotten Island' Is One of DreamWorks Animation's Best Movies",
      url: "https://scottmendelson.substack.com/p/review-forgotten-island-one-of-dreamworks-animation-best-movies",
      author: "Scott Mendelson",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Forgotten Island Review: A Vibrant, Heartfelt DreamWorks Masterpiece",
      url: "https://www.ign.com/articles/forgotten-island-review",
      author: "IGN",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Forgotten Island Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/forgotten-island",
      author: "Common Sense Media",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Forgotten Island Review: A Stunning Celebration of Friendship and Folklore",
      url: "https://butwhytho.net/2026/09/forgotten-island-review/",
      author: "But Why Tho?",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Forgotten Island Review: DreamWorks Delivers a Visual and Emotional Wonder",
      url: "https://comicbookclublive.com/2026/09/19/forgotten-island-review-dreamworks/",
      author: "Comic Book Club Live",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Forgotten Island animated film review & movie summary (2026)",
      url: "https://www.rogerebert.com/reviews/forgotten-island-animated-film-review-2026",
      author: "Roger Ebert",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Movie review: 'Forgotten Island' is a trippy ode to friendship and folklore",
      url: "https://www.thetelegraph.com/entertainment/article/movie-review-forgotten-island-is-a-trippy-ode-22445442.php",
      author: "The Telegraph",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "'Forgotten Island' movie review: Folklore and friendship power a visually dazzling adventure",
      url: "https://www.thehindu.com/entertainment/movies/forgotten-island-movie-review-folklore-and-friendship-power-a-visually-dazzling-adventure/article71512543.ece",
      author: "The Hindu",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Forgotten Island Movie Review: Januel P Mercado crafts a magical Philippine odyssey",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/forgotten-island/movie-review/134454247.cms",
      author: "The Times of India",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Director Januel P Mercado: Forgotten Island is set in a time when friendships felt more fragile",
      url: "https://www.cinemaexpress.com/english/news/2026/Sep/17/director-januel-p-mercado-forgotten-island-is-set-in-a-time-when-friendships-felt-more-fragile",
      author: "Cinema Express",
      date: "September 2026",
      section: "News"
    }
  ],
  filePath: "E:/OakShow/ForgottenIsland.html"
};

// 1. Update movies.json
console.log('Reading and updating movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const idx = movies.findIndex(m => m.id === 'ForgottenIsland' || m.filename === 'ForgottenIsland.html');
if (idx !== -1) {
  movies[idx] = forgottenIslandMovie;
  console.log('Updated existing ForgottenIsland in movies.json');
} else {
  movies.unshift(forgottenIslandMovie);
  console.log('Inserted new ForgottenIsland into movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Update search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "ForgottenIsland",
  title: "Forgotten Island",
  type: "movie",
  category: "Hollywood",
  genre: "Animation, Adventure, Comedy, Fantasy",
  language: "English",
  year: "2026",
  score: 8.0,
  poster: "pics/Films/ForgottenIsland/1.jpg",
  url: "ForgottenIsland.html",
  keywords: "H.E.R., Liza Soberano, Dave Franco, Lea Salonga, Januel P. Mercado, DreamWorks Animation, Universal Pictures, Nakali, Filipino Folklore"
};
const sIdx = searchIndex.findIndex(s => s.id === 'ForgottenIsland' || s.url === 'ForgottenIsland.html');
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
} else {
  searchIndex.unshift(searchItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// 3. Update reviews.json
console.log('Updating reviews.json...');
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

const reviewsToAdd = [
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "IGN",
    criticName: "IGN Staff",
    outlet: "IGN",
    score: "9/10",
    rating: "9/10",
    date: "September 2026",
    title: "Forgotten Island Review: A Vibrant, Heartfelt DreamWorks Masterpiece",
    url: "https://www.ign.com/articles/forgotten-island-review"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "Scott Mendelson",
    criticName: "Scott Mendelson",
    outlet: "Scott Mendelson",
    score: "4/5",
    rating: "Recommended",
    date: "September 2026",
    title: "Review: 'Forgotten Island' Is One of DreamWorks Animation's Best Movies",
    url: "https://scottmendelson.substack.com/p/review-forgotten-island-one-of-dreamworks-animation-best-movies"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "Roger Ebert",
    criticName: "RogerEbert.com",
    outlet: "Roger Ebert",
    score: "3.5/4",
    rating: "3.5/4",
    date: "September 2026",
    title: "Forgotten Island animated film review & movie summary (2026)",
    url: "https://www.rogerebert.com/reviews/forgotten-island-animated-film-review-2026"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "Common Sense Media",
    criticName: "Jeffrey M. Anderson",
    outlet: "Common Sense Media",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "Forgotten Island Movie Review for Parents",
    url: "https://www.commonsensemedia.org/movie-reviews/forgotten-island"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "The Telegraph",
    criticName: "The Telegraph Critic",
    outlet: "The Telegraph",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "Movie review: 'Forgotten Island' is a trippy ode to friendship and folklore",
    url: "https://www.thetelegraph.com/entertainment/article/movie-review-forgotten-island-is-a-trippy-ode-22445442.php"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "The Hindu",
    criticName: "The Hindu Bureau",
    outlet: "The Hindu",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "'Forgotten Island' movie review: Folklore and friendship power a visually dazzling adventure",
    url: "https://www.thehindu.com/entertainment/movies/forgotten-island-movie-review-folklore-and-friendship-power-a-visually-dazzling-adventure/article71512543.ece"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "The Times of India",
    criticName: "Times of India Critic",
    outlet: "The Times of India",
    score: "3.5/5",
    rating: "3.5/5",
    date: "September 2026",
    title: "Forgotten Island Movie Review: Januel P Mercado crafts a magical Philippine odyssey",
    url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/forgotten-island/movie-review/134454247.cms"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "But Why Tho?",
    criticName: "Kate Sánchez",
    outlet: "But Why Tho?",
    score: "4.5/5",
    rating: "4.5/5",
    date: "September 2026",
    title: "Forgotten Island Review: A Stunning Celebration of Friendship and Folklore",
    url: "https://butwhytho.net/2026/09/forgotten-island-review/"
  },
  {
    movieId: "ForgottenIsland",
    movie: "Forgotten Island",
    author: "Comic Book Club Live",
    criticName: "Alex Zalben",
    outlet: "Comic Book Club Live",
    score: "4/5",
    rating: "4/5",
    date: "September 2026",
    title: "Forgotten Island Review: DreamWorks Delivers a Visual and Emotional Wonder",
    url: "https://comicbookclublive.com/2026/09/19/forgotten-island-review-dreamworks/"
  }
];

reviewsToAdd.forEach((r, rIdx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `forgotten-island-review-${rIdx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

// 4. Update news.json
console.log('Updating news.json...');
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

const newsToAdd = [
  {
    movieId: "ForgottenIsland",
    movieTitle: "Forgotten Island",
    title: "Director Januel P Mercado: Forgotten Island is set in a time when friendships felt more fragile",
    source: "Cinema Express",
    date: "September 17, 2026",
    url: "https://www.cinemaexpress.com/english/news/2026/Sep/17/director-januel-p-mercado-forgotten-island-is-set-in-a-time-when-friendships-felt-more-fragile",
    category: "Hollywood"
  }
];

newsToAdd.forEach((n, nIdx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `forgotten-island-news-${nIdx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

console.log('Successfully updated movies.json, search_index.json, reviews.json, and news.json with Forgotten Island!');
