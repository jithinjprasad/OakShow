const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

// Movie definition
const dhoomakethuMovie = {
  id: "Dhoomakethu",
  slug: "dhoomakethu",
  type: "movie",
  category: "Indian",
  score: 6,
  filename: "Dhoomakethu.html",
  title: "Dhoomakethu",
  metaTitle: "Dhoomakethu (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A groom wakes up from a disturbing premonition on the morning of his wedding and finds himself trapped in a chaotic, repeating time loop on his wedding night, desperately striving to avert disaster while dealing with eccentric family members and bizarre mysteries.",
  plot: "On the morning of his wedding, 36-year-old Kuttan / Lathin Kumar (Sajin Gopu) is jolted awake by a terrifying nightmare foretelling his untimely demise. Brushing it off as pre-marital jitters, he proceeds to marry his bride Sharmila (Nikhila Vimal). However, as night falls, the nightmare becomes reality—only for Kuttan to wake up and discover he is trapped in an inescapable, chaotic time loop on his wedding night. With each repetition, Kuttan must piece together baffling clues, outmaneuver suspicious relatives, and uncover an eccentric underwater mystery in order to break the bizarre cycle and save his marriage and life.",
  language: "Malayalam",
  releaseDate: "September 25, 2026",
  year: "2026",
  genre: "Comedy, Thriller, Fantasy, Sci-Fi",
  duration: "2hr 02min",
  certificate: "UA 16+",
  director: "Sudhi Maddison",
  writer: "Sonny Babu Antony, Manu Madhusudhanan",
  basedOn: "",
  boxOffice: {
    budget: "Estimated ₹5–7 Crore",
    worldwideGross: "Currently In Theatres (Day 1 Tracking)",
    openingDay: "Estimated ₹0.85–1.20 Crore (Tracking)",
    openingWeekend: "Tracking ₹3–4 Crore (Projected)",
    indiaGross: "Estimated ₹0.75–1.00 Crore (Day 1)",
    overseasGross: "Tracking International Theatrical Rollout",
    verdict: "Currently In Theatres",
    source: "Kerala Box Office Trackers & Trade Estimates",
    lastUpdated: "September 25, 2026 (Opening Day)"
  },
  budget: "Estimated ₹5–7 Crore",
  poster: "pics/Films/Dhoomakethu/1.jpeg",
  banner: "pics/Films/Dhoomakethu/2.jpeg",
  gallery: [
    {
      src: "pics/Films/Dhoomakethu/1.jpeg",
      alt: "Dhoomakethu Official Theatrical Poster"
    },
    {
      src: "pics/Films/Dhoomakethu/2.jpeg",
      alt: "Sajin Gopu and Nikhila Vimal in Dhoomakethu"
    },
    {
      src: "pics/Films/Dhoomakethu/3.jpg",
      alt: "Dhoomakethu Official Teaser Key Still"
    },
    {
      src: "pics/Films/Dhoomakethu/4.jpg",
      alt: "Anuraga Roopavathi Song Still"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "6/10",
      url: "https://oakshow.in/Dhoomakethu.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "The Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/dhoomakethu-movie-review-sajin-gopu-nikhila-vimal-quirky-time-loop-comedy-stuck-own-loop-10893039/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "IMDb",
      score: "TBD",
      url: "https://www.imdb.com/title/tt38990864/",
      icon: "pics/RatingSiteLogos/imdb.png"
    }
  ],
  cast: [
    {
      actor: "Sajin Gopu",
      role: "Kuttan / Lathin Kumar",
      description: "A groom who finds himself caught in an inescapable, chaotic time loop on his wedding night"
    },
    {
      actor: "Nikhila Vimal",
      role: "Sharmila (Bride)",
      description: "Kuttan's bride navigating the bizarre, surreal events following their wedding"
    },
    {
      actor: "Shine Tom Chacko",
      role: "Key Role",
      description: "A prominent eccentric character caught up in the time loop mysteries"
    },
    {
      actor: "Sidharth Bharathan",
      role: "Key Role",
      description: "An integral family member and investigator in the escalating wedding drama"
    },
    {
      actor: "Ganapathi",
      role: "Friend",
      description: "Kuttan's close companion trying to make sense of the absurd situations"
    },
    {
      actor: "Manju Pillai",
      role: "Mother",
      description: "A lively, sharp-tongued family elder attending the nuptials"
    }
  ],
  trailers: [
    {
      title: "Dhoomakethu Official Main Trailer",
      url: "https://www.youtube.com/watch?v=cMAZtuZx01A",
      embedUrl: "https://www.youtube-nocookie.com/embed/cMAZtuZx01A",
      youtubeId: "cMAZtuZx01A",
      type: "Main Trailer"
    },
    {
      title: "Dhoomakethu Official Teaser",
      url: "https://www.youtube.com/watch?v=LUm_qqlLJQ0",
      embedUrl: "https://www.youtube-nocookie.com/embed/LUm_qqlLJQ0",
      youtubeId: "LUm_qqlLJQ0",
      type: "Teaser"
    },
    {
      title: "Anuraga Roopavathi (Song) - Dhoomakethu",
      url: "https://www.youtube.com/watch?v=AaB6SrPD0VI",
      embedUrl: "https://www.youtube-nocookie.com/embed/AaB6SrPD0VI",
      youtubeId: "AaB6SrPD0VI",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Dhoomakethu Official Main Trailer",
      url: "https://www.youtube.com/watch?v=cMAZtuZx01A",
      youtubeId: "cMAZtuZx01A"
    },
    {
      title: "Dhoomakethu Official Teaser",
      url: "https://www.youtube.com/watch?v=LUm_qqlLJQ0",
      youtubeId: "LUm_qqlLJQ0"
    },
    {
      title: "Anuraga Roopavathi (Song)",
      url: "https://www.youtube.com/watch?v=AaB6SrPD0VI",
      youtubeId: "AaB6SrPD0VI"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/0dYeoMIt9xPMFi8nNSfm6b",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/anuraga-roopavathi-extended-from-dhoomakethu-single/6812019191",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/dhoomakethu/S,sSgTC59g4_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kozhikode/dhoomakethu/ET00516853",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/dhoomakethu-movie-tickets-MV233319?srsltid=AU7gw4US_PlEdUSWLRlfOoSaeQdQHISvXzf9dMeMWYJmxDabQK5t9zMi",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/dhoomakethu-movie-detail-233319",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 3
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/dhoomakethu-247680/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 4
    }
  ],
  articles: [
    {
      headline: "Dhoomakethu movie review: A quirky time-loop comedy that gets stuck in a loop of its own",
      url: "https://indianexpress.com/article/entertainment/movie-review/dhoomakethu-movie-review-sajin-gopu-nikhila-vimal-quirky-time-loop-comedy-stuck-own-loop-10893039/",
      author: "The Indian Express",
      date: "September 25, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "‘Dhoomakethu’ movie review: A quirky time-loop tale where weddings meet chaos",
      url: "https://www.onmanorama.com/entertainment/movie-reviews/2026/09/25/dhoomakethu-movie-review.html",
      author: "Onmanorama",
      date: "September 25, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "‘Dhoomakethu’ movie review: A humorous time loop film which works in parts",
      url: "https://www.thehindu.com/entertainment/movies/dhoomakethu-movie-review-a-humorous-time-loop-film-which-works-in-parts/article71508467.ece",
      author: "The Hindu",
      date: "September 25, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Dhoomakethu Review: A Time-Loop Comedy That Impresses You with Its Rooted Humor and Setting",
      url: "https://lensmenreviews.com/dhoomakethu-malayalam-movie-review-2026/",
      author: "Lensmen Reviews",
      date: "September 25, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Dhoomakethu trailer out: Sajin Gopu trapped in deadly time loop after marriage, watch",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movies/news/dhoomakethu-trailer-out-sajin-gopu-trapped-in-deadly-time-loop-after-marriage-watch/articleshow/134346652.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Sajin Gopu - Nikhila Vimal starrer Dhoomakethu locks September 25 theatrical release",
      url: "https://www.newindianexpress.com/entertainment/2026/Sep/09/malayalamnews2026sep08sajin-gopu-nikhila-vimal-starrer-dhoomakethu-postponed-to-this-date",
      author: "The New Indian Express",
      date: "September 9, 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Dhoomakethu Original Soundtrack and Single 'Anuraga Roopavathi' streaming on JioSaavn",
      url: "https://www.jiosaavn.com/album/dhoomakethu/S,sSgTC59g4_",
      author: "JioSaavn",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Dhoomakethu: Happy Hours Entertainments and Sudhi Maddison team up for quirky time-loop thriller",
      url: "https://www.cinemaexpress.com/malayalam/news/2026/sep/dhoomakethu-trailer-sajin-gopu-nikhila-vimal",
      author: "Cinema Express",
      date: "September 2026",
      section: "News(Before Release)"
    }
  ],
  similar: [
    {
      title: "Maniyarayile Ashokan",
      link: "ManiyarayileAshokan.html",
      poster: "pics/Films/ManiyarayileAshokan/2.jpg"
    },
    {
      title: "Kumbalangi Nights",
      link: "KumbalangiNights.html",
      poster: "pics/Films/KumbalangiNights/2.jpg"
    },
    {
      title: "The Priest",
      link: "ThePriest.html",
      poster: "pics/Films/ThePriest/2.jpg"
    },
    {
      title: "Varane Avashyamund",
      link: "VaraneAvashyamund.html",
      poster: "pics/Films/VaraneAvashyamund/2.jpg"
    },
    {
      title: "Bethlehem Kudumba Unit",
      link: "BethlehemKudumbaUnit.html",
      poster: "pics/Films/BethlehemKudumbaUnit/2.jpg"
    },
    {
      title: "Kilometers and Kilometers",
      link: "KilometersandKilometers.html",
      poster: "pics/Films/KilometersandKilometers/2.jpg"
    }
  ],
  wikipedia: "",
  imdb: "https://www.imdb.com/title/tt38990864/",
  status: "released"
};

// 1. Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const existingIdx = movies.findIndex(m => m.id === 'Dhoomakethu' || m.filename === 'Dhoomakethu.html');
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(dhoomakethuMovie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed released Dhoomakethu at index 0 in movies.json (${movies.length} total)`);

// 2. Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(s => s.id === 'Dhoomakethu' || s.url === 'Dhoomakethu.html');
const sItem = {
  id: "Dhoomakethu",
  title: "Dhoomakethu",
  type: "movie",
  category: "Indian",
  year: "2026",
  genre: "Comedy, Thriller, Fantasy, Sci-Fi",
  language: "Malayalam",
  score: 6,
  poster: "pics/Films/Dhoomakethu/1.jpeg",
  status: "released",
  url: "Dhoomakethu.html"
};
if (searchIdx !== -1) {
  searchIndex.splice(searchIdx, 1);
}
searchIndex.unshift(sItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Placed Dhoomakethu at index 0 in search_index.json (${searchIndex.length} total)`);

// 3. Update news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newArticles = [
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Dhoomakethu movie review: A quirky time-loop comedy that gets stuck in a loop of its own",
    source: "The Indian Express",
    date: "September 25, 2026",
    url: "https://indianexpress.com/article/entertainment/movie-review/dhoomakethu-movie-review-sajin-gopu-nikhila-vimal-quirky-time-loop-comedy-stuck-own-loop-10893039/",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "‘Dhoomakethu’ movie review: A quirky time-loop tale where weddings meet chaos",
    source: "Onmanorama",
    date: "September 25, 2026",
    url: "https://www.onmanorama.com/entertainment/movie-reviews/2026/09/25/dhoomakethu-movie-review.html",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "‘Dhoomakethu’ movie review: A humorous time loop film which works in parts",
    source: "The Hindu",
    date: "September 25, 2026",
    url: "https://www.thehindu.com/entertainment/movies/dhoomakethu-movie-review-a-humorous-time-loop-film-which-works-in-parts/article71508467.ece",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Dhoomakethu Review: A Time-Loop Comedy That Impresses You with Its Rooted Humor and Setting",
    source: "Lensmen Reviews",
    date: "September 25, 2026",
    url: "https://lensmenreviews.com/dhoomakethu-malayalam-movie-review-2026/",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Dhoomakethu trailer out: Sajin Gopu trapped in deadly time loop after marriage, watch",
    source: "Times of India",
    date: "September 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movies/news/dhoomakethu-trailer-out-sajin-gopu-trapped-in-deadly-time-loop-after-marriage-watch/articleshow/134346652.cms",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Sajin Gopu - Nikhila Vimal starrer Dhoomakethu locks September 25 theatrical release",
    source: "The New Indian Express",
    date: "September 9, 2026",
    url: "https://www.newindianexpress.com/entertainment/2026/Sep/09/malayalamnews2026sep08sajin-gopu-nikhila-vimal-starrer-dhoomakethu-postponed-to-this-date",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Dhoomakethu Original Soundtrack and Single 'Anuraga Roopavathi' streaming on JioSaavn",
    source: "JioSaavn",
    date: "September 2026",
    url: "https://www.jiosaavn.com/album/dhoomakethu/S,sSgTC59g4_",
    category: "Mollywood"
  }
];

newArticles.forEach((art, idx) => {
  const existingArticleIdx = news.findIndex(n => n.url === art.url);
  const newsItem = {
    id: `dhoomakethu-news-${idx + 1}`,
    ...art
  };
  if (existingArticleIdx !== -1) {
    news[existingArticleIdx] = newsItem;
  } else {
    news.unshift(newsItem);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`Updated news.json with Dhoomakethu articles (${news.length} total)`);

// 4. Update releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const sep2026 = releases.find(r => r.id === 'IndianReleases2026September');
if (sep2026) {
  const itemIdx = sep2026.items.findIndex(it => it.title === 'Dhoomakethu' || it.moreLink === 'Dhoomakethu.html');
  const dItem = {
    title: "Dhoomakethu",
    poster: "pics/Films/Dhoomakethu/1.jpeg",
    alt: "Dhoomakethu",
    language: "Malayalam",
    category: "Indian",
    releaseDate: "September 25, 2026",
    genre: "Comedy, Thriller, Fantasy, Sci-Fi",
    status: "released",
    moreLink: "Dhoomakethu.html",
    trailerLink: "https://www.youtube.com/watch?v=cMAZtuZx01A",
    ratings: [
      {
        source: "OakShow",
        score: "6/10",
        url: "Dhoomakethu.html",
        icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
      },
      {
        source: "The Indian Express",
        score: "2.5/5",
        url: "https://indianexpress.com/article/entertainment/movie-review/dhoomakethu-movie-review-sajin-gopu-nikhila-vimal-quirky-time-loop-comedy-stuck-own-loop-10893039/",
        icon: "pics/RatingSiteLogos/indian-express.png"
      },
      {
        source: "IMDb",
        score: "TBD",
        url: "https://www.imdb.com/title/tt38990864/",
        icon: "pics/RatingSiteLogos/imdb.png"
      }
    ]
  };
  if (itemIdx !== -1) {
    sep2026.items[itemIdx] = dItem;
  } else {
    sep2026.items.push(dItem);
  }
  sep2026.totalItems = sep2026.items.length;
  fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
  console.log(`Updated IndianReleases2026September in releases.json (${sep2026.totalItems} items)`);
}

// 5. Ensure image directories exist in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'Dhoomakethu');
const distPicsRoot = path.join(rootDir, 'dist', 'pics', 'Dhoomakethu');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'Dhoomakethu');

if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (!fs.existsSync(distPicsRoot)) {
  fs.mkdirSync(distPicsRoot, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsRoot, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/Dhoomakethu and dist/pics/Dhoomakethu`);
}

console.log('✅ update_dhoomakethu_released complete!');
