const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

console.log('=== Adding Whalefall (2026) to OakShow ===');

const whalefallMovie = {
  id: "Whalefall",
  slug: "whalefall",
  type: "movie",
  category: "Hollywood",
  score: 6.8,
  filename: "Whalefall.html",
  fileName: "Whalefall.html",
  title: "Whalefall",
  metaTitle: "Whalefall (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A scuba diver searching for his late father's remains off the coast of Monterey is swallowed alive by an eighty-foot, sixty-ton sperm whale. Trapped inside its stomach in pitch darkness with only an hour of oxygen left, he must fight for survival while confronting the unresolved trauma of his past.",
  plot: "Jay Gardiner (Austin Abrams) is a grief-stricken scuba diver burdened with guilt following the suicide of his estranged, legendary diver father Mitt (Josh Brolin). Determined to find redemption and closure, Jay embarks on a solo dive off the rugged coast of Monterey, California, aiming to recover his father's weighted scuba belt and sunken remains from the depths of the Pacific Ocean.\n\nHowever, what was meant to be a quiet pilgrimage turns into an unimaginable nightmare when Jay is struck by a feeding sperm whale and pulled directly into its colossal, pitch-black maw. Trapped within the whale's first stomach compartment with a crushed dive suit, rapidly failing equipment, and less than sixty minutes of breathable air, Jay faces suffocating pressures, caustic digestive enzymes, and sheer darkness.\n\nAs the massive beast dives deeper into the oceanic abyss, Jay must use his practical diving ingenuity, makeshift survival tools, and the indelible survival wisdom drilled into him by his father to endure the belly of the beast, find a lethal way out, and finally make peace with his father's memory before his oxygen runs out.",
  language: "English",
  releaseDate: "October 16, 2026",
  year: "2026",
  status: "released",
  genre: "Survival, Thriller, Drama, Adventure",
  duration: "1hr 46min",
  certificate: "PG-13",
  director: "Brian Duffield",
  writer: "Brian Duffield, Daniel Kraus",
  basedOn: "Whalefall by Daniel Kraus",
  producers: "Brian Grazer, Ron Howard, Allan Mandelbaum, Brian Duffield",
  cinematography: "Aaron Morton",
  editing: "Noah Harnden",
  musicDirector: "Joseph Trapanese",
  productionCompanies: "20th Century Studios, Imagine Entertainment",
  distributor: "20th Century Studios",
  boxOffice: {
    budget: "$60 Million",
    domesticGross: "$7.8 Million",
    overseasGross: "$9.7 Million",
    worldwideGross: "$17.5 Million",
    openingWeekend: "$7.8 Million (Domestic) / $17.5 Million (Worldwide)",
    verdict: "Moderate Theatrical Debut / Resilient Word-of-Mouth",
    lastUpdated: "October 2026",
    source: "Box Office Mojo, The Numbers & Deadline"
  },
  budget: "$60 Million",
  awards: [],
  poster: "pics/Films/Whalefall/1.jpg",
  banner: "pics/Films/Whalefall/2.jpg",
  gallery: [
    {
      src: "pics/Films/Whalefall/1.jpg",
      alt: "Whalefall Official Theatrical Poster"
    },
    {
      src: "pics/Films/Whalefall/2.jpg",
      alt: "Whalefall Key Art Banner"
    }
  ],
  ratings: [
    {
      source: "IMDb",
      score: "6.8/10",
      url: "https://www.imdb.com/title/tt28535715/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "70%",
      url: "https://www.rottentomatoes.com/m/whalefall",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-fresh.png"
    },
    {
      source: "Metacritic",
      score: "59/100",
      url: "https://www.metacritic.com/movie/whalefall/critic-reviews/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Roger Ebert",
      score: "3.5/4",
      url: "https://www.rogerebert.com/reviews/whalefall-austin-abrams-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "Hindustan Times",
      score: "4/5",
      url: "https://www.hindustantimes.com/entertainment/hollywood/whalefall-movie-review-austin-abrams-jonah-act-survival-thriller-and-heartwarming-father-son-tale-josh-brolin-brian-duffield-101792144402751.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "IGN",
      score: "8/10",
      url: "https://www.ign.com/articles/whalefall-review",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Times of India",
      score: "3/5",
      url: "https://timesofindia.indiatimes.com/hollywood/whalefall/movie-review/134984027.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/whalefall-movie-review-austin-abrams-josh-brolin-film-fails-to-make-a-splash-10924770/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/review-whalefall-leaves-you-gasping/20261016.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "The Guardian",
      score: "2/5",
      url: "https://www.theguardian.com/film/2026/oct/15/whalefall-review-movie",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    }
  ],
  cast: [
    {
      actor: "Austin Abrams",
      role: "Jay Gardiner",
      description: "A grief-stricken scuba diver swallowed alive by a sperm whale off the coast of Monterey"
    },
    {
      actor: "Josh Brolin",
      role: "Mitt Gardiner",
      description: "Jay's demanding, legendary diver father whose survival teachings guide Jay through the dark"
    },
    {
      actor: "Elisabeth Shue",
      role: "Zara Gardiner",
      description: "Jay's compassionate mother striving to keep her family grounded after tragedy"
    },
    {
      actor: "Jane Levy",
      role: "Eva Gardiner",
      description: "Jay's elder sister who tries to help Jay navigate grief and estrangement"
    },
    {
      actor: "Emily Rudd",
      role: "Nan Gardiner",
      description: "Jay's younger sister who encourages him to seek peace"
    },
    {
      actor: "John Ortiz",
      role: "Hewey",
      description: "The veteran Monterey harbor master and long-time diver friend of Mitt"
    }
  ],
  trailers: [
    {
      title: "Whalefall | Official Trailer | 20th Century Studios",
      url: "https://www.youtube.com/watch?v=rN9F6-tbySY",
      embedUrl: "https://www.youtube-nocookie.com/embed/rN9F6-tbySY",
      youtubeId: "rN9F6-tbySY",
      type: "Main Trailer"
    },
    {
      title: "Whalefall | Official Teaser | 20th Century Studios",
      url: "https://www.youtube.com/watch?v=67ho3OxCmmM",
      embedUrl: "https://www.youtube-nocookie.com/embed/67ho3OxCmmM",
      youtubeId: "67ho3OxCmmM",
      type: "Teaser"
    }
  ],
  videos: [
    {
      title: "Whalefall | Official Trailer | 20th Century Studios",
      url: "https://www.youtube.com/watch?v=rN9F6-tbySY",
      youtubeId: "rN9F6-tbySY"
    },
    {
      title: "Whalefall | Official Teaser | 20th Century Studios",
      url: "https://www.youtube.com/watch?v=67ho3OxCmmM",
      youtubeId: "67ho3OxCmmM"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/4pAhiOGLLxY946GmkpOinN",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Whalefall Soundtrack on Spotify"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/whalefall/ET00506502",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow"
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/whalefall-movie-tickets-MV218658?srsltid=AU7gw4WCmlPunN0PU5rnfZUhKPe-UgB-JB1kOyemB4V6wmB_60voh9j6",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District"
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/whalefall-2026-246280/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango"
    },
    {
      provider: "ODEON",
      url: "https://www.odeon.co.uk/films/whalefall/HO00009117/",
      icon: "pics/BookngWebSiteLogos/odeon.png",
      label: "Book on ODEON Cinemas"
    }
  ],
  articles: [
    {
      headline: "Whalefall movie review: Austin Abrams is a fiercely modern Jonah in this whale of a tale",
      url: "https://www.thehindu.com/entertainment/movies/whalefall-movie-review-austin-abrams-is-a-fiercely-modern-jonah-in-this-whale-of-a-tale/article71592880.ece",
      author: "The Hindu",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall movie review: Austin Abrams, Josh Brolin film fails to make a splash",
      url: "https://indianexpress.com/article/entertainment/movie-review/whalefall-movie-review-austin-abrams-josh-brolin-film-fails-to-make-a-splash-10924770/",
      author: "The Indian Express",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall Review: Austin Abrams is swallowed whole in Brian Duffield's survival thriller",
      url: "https://www.ign.com/articles/whalefall-review",
      author: "IGN",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall movie review: Austin Abrams' Jonah act survival thriller and heartwarming father-son tale",
      url: "https://www.hindustantimes.com/entertainment/hollywood/whalefall-movie-review-austin-abrams-jonah-act-survival-thriller-and-heartwarming-father-son-tale-josh-brolin-brian-duffield-101792144402751.html",
      author: "Hindustan Times",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall Review: Leaves you gasping for air",
      url: "https://www.rediff.com/movies/review/review-whalefall-leaves-you-gasping/20261016.htm",
      author: "Rediff",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall movie review & film summary (2026)",
      url: "https://www.rogerebert.com/reviews/whalefall-austin-abrams-movie-review-2026",
      author: "Roger Ebert",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall review – Austin Abrams in a high-concept whale-stomach survival thriller",
      url: "https://www.theguardian.com/film/2026/oct/15/whalefall-review-movie",
      author: "The Guardian",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Whalefall Review: Swallowed Alive in the Deep Pacific",
      url: "https://www.nytimes.com/2026/10/15/movies/whalefall-review.html",
      author: "The New York Times",
      date: "October 15, 2026",
      section: "Critic Reviews"
    }
  ],
  socials: [],
  similar: [
    {
      title: "Adrift",
      link: "Adrift.html",
      poster: "pics/Films/Adrift/1.jpg"
    },
    {
      title: "The Meg",
      link: "Meg.html",
      poster: "pics/Films/Meg/1.jpg"
    },
    {
      title: "Oxygen",
      link: "Oxygen.html",
      poster: "pics/Films/Oxygen/4.jpg"
    },
    {
      title: "A Quiet Place",
      link: "AQuietPlace.html",
      poster: "pics/Films/AQuietPlace/1.jpg"
    },
    {
      title: "Life",
      link: "Life.html",
      poster: "pics/Films/Life/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Whalefall_(film)",
  imdb: "https://www.imdb.com/title/tt28535715/",
  filePath: "E:/OakShow/Whalefall.html"
};

// 1. Update movies.json
console.log('Reading and updating movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const mIdx = movies.findIndex(m => m.id === 'Whalefall' || m.filename === 'Whalefall.html' || m.fileName === 'Whalefall.html');
if (mIdx !== -1) {
  movies[mIdx] = whalefallMovie;
  console.log('Updated existing Whalefall in movies.json');
} else {
  movies.unshift(whalefallMovie);
  console.log('Inserted new Whalefall at index 0 in movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Update search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "Whalefall",
  slug: "whalefall",
  title: "Whalefall",
  type: "movie",
  category: "Hollywood",
  genre: "Survival, Thriller, Drama, Adventure",
  language: "English",
  year: "2026",
  score: 6.8,
  poster: "pics/Films/Whalefall/1.jpg",
  filename: "Whalefall.html",
  fileName: "Whalefall.html",
  url: "Whalefall.html",
  cleanUrl: "/Whalefall.html",
  releaseDate: "October 16, 2026",
  status: "released",
  director: "Brian Duffield",
  ratings: whalefallMovie.ratings,
  keywords: "Whalefall, Whalefall (2026), Austin Abrams, Josh Brolin, Brian Duffield, Elisabeth Shue, Jane Levy, Daniel Kraus, Imagine Entertainment, 20th Century Studios, survival, whale, Monterey, thriller"
};

const sIdx = searchIndex.findIndex(s => s.id === 'Whalefall' || s.url === 'Whalefall.html' || s.filename === 'Whalefall.html');
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
  console.log('Updated search_index.json entry');
} else {
  searchIndex.unshift(searchItem);
  console.log('Inserted search_index.json entry');
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// 3. Update releases.json
console.log('Updating releases.json...');
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));

const whalefallReleaseItem = {
  title: "Whalefall",
  poster: "pics/Films/Whalefall/1.jpg",
  alt: "Whalefall (2026) Theatrical Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 16, 2026",
  genre: "Survival, Thriller, Drama, Adventure",
  status: "released",
  moreLink: "Whalefall.html",
  trailerLink: "https://www.youtube.com/watch?v=rN9F6-tbySY",
  ratings: whalefallMovie.ratings.slice(0, 3)
};

function upsertReleaseSection(sectionId, movieItem) {
  let existingSec = releases.find(r => r.id === sectionId);
  if (existingSec) {
    const itIdx = existingSec.items.findIndex(it => it.title === movieItem.title || it.moreLink === movieItem.moreLink);
    if (itIdx !== -1) {
      existingSec.items[itIdx] = movieItem;
      console.log(`Updated ${movieItem.title} in existing section ${sectionId}`);
    } else {
      existingSec.items.unshift(movieItem);
      console.log(`Added ${movieItem.title} to existing section ${sectionId}`);
    }
    existingSec.totalItems = existingSec.items.length;
  } else {
    console.warn(`Section ${sectionId} not found in releases.json`);
  }
}

upsertReleaseSection('HollywoodReleases2026October', whalefallReleaseItem);
upsertReleaseSection('Releases2026October', whalefallReleaseItem);

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Successfully updated releases.json!');

// 4. Update news.json
console.log('Updating news.json with Whalefall news/articles...');
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsEntries = [
  {
    movieId: "Whalefall",
    movieTitle: "Whalefall",
    title: "Whalefall movie review: Austin Abrams is a fiercely modern Jonah in this whale of a tale",
    source: "The Hindu",
    date: "October 16, 2026",
    url: "https://www.thehindu.com/entertainment/movies/whalefall-movie-review-austin-abrams-is-a-fiercely-modern-jonah-in-this-whale-of-a-tale/article71592880.ece",
    category: "Critic Reviews"
  },
  {
    movieId: "Whalefall",
    movieTitle: "Whalefall",
    title: "Whalefall Review: Austin Abrams is swallowed whole in Brian Duffield's gut-wrenching survival thriller",
    source: "IGN",
    date: "October 16, 2026",
    url: "https://www.ign.com/articles/whalefall-review",
    category: "Critic Reviews"
  },
  {
    movieId: "Whalefall",
    movieTitle: "Whalefall",
    title: "Whalefall movie review: Austin Abrams' Jonah act survival thriller and heartwarming father-son tale",
    source: "Hindustan Times",
    date: "October 16, 2026",
    url: "https://www.hindustantimes.com/entertainment/hollywood/whalefall-movie-review-austin-abrams-jonah-act-survival-thriller-and-heartwarming-father-son-tale-josh-brolin-brian-duffield-101792144402751.html",
    category: "Critic Reviews"
  },
  {
    movieId: "Whalefall",
    movieTitle: "Whalefall",
    title: "Whalefall movie review & film summary (2026) — Austin Abrams battles inside a sperm whale",
    source: "Roger Ebert",
    date: "October 16, 2026",
    url: "https://www.rogerebert.com/reviews/whalefall-austin-abrams-movie-review-2026",
    category: "Critic Reviews"
  },
  {
    movieId: "Whalefall",
    movieTitle: "Whalefall",
    title: "Whalefall review – Austin Abrams in a high-concept whale-stomach survival thriller",
    source: "The Guardian",
    date: "October 15, 2026",
    url: "https://www.theguardian.com/film/2026/oct/15/whalefall-review-movie",
    category: "Critic Reviews"
  },
  {
    movieId: "Whalefall",
    movieTitle: "Whalefall",
    title: "Whalefall Review: Swallowed Alive in the Deep Pacific",
    source: "The New York Times",
    date: "October 15, 2026",
    url: "https://www.nytimes.com/2026/10/15/movies/whalefall-review.html",
    category: "Critic Reviews"
  }
];

newsEntries.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `whalefall-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`Updated news.json (${news.length} total entries).`);

// 5. Ensure images in directories:
const srcPicsDir = path.join(rootDir, 'pics', 'Films', 'Whalefall');
const distPicsFilmsDir = path.join(rootDir, 'dist', 'pics', 'Films', 'Whalefall');
const picsWhalefallDir = path.join(rootDir, 'pics', 'Whalefall');
const distPicsWhalefallDir = path.join(rootDir, 'dist', 'pics', 'Whalefall');

[distPicsFilmsDir, picsWhalefallDir, distPicsWhalefallDir].forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

if (fs.existsSync(srcPicsDir)) {
  const files = fs.readdirSync(srcPicsDir);
  for (const f of files) {
    const sFile = path.join(srcPicsDir, f);
    fs.copyFileSync(sFile, path.join(distPicsFilmsDir, f));
    fs.copyFileSync(sFile, path.join(picsWhalefallDir, f));
    fs.copyFileSync(sFile, path.join(distPicsWhalefallDir, f));
  }
  console.log(`Synced ${files.length} images to dist/pics/Films/Whalefall and pics/Whalefall directories.`);
}

// 6. Generate HTML file for Whalefall.html
console.log('Generating Whalefall.html...');
const template = `<!DOCTYPE html>
<html lang="en" data-theme="light" style="color-scheme: light;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#ffffff" id="theme-color-meta" />
  <meta name="color-scheme" content="light dark" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=oakshow3" />
  <link rel="icon" type="image/png" sizes="300x300" href="/favicon.png?v=oakshow3" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=oakshow3" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=oakshow3" />
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=oakshow3" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png?v=oakshow3" />
  <script>
    (function() {
      try {
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth && window.innerWidth <= 768);
        var savedTheme = localStorage.getItem('oakshow_theme_v3') || localStorage.getItem('oakshow_theme_v2') || localStorage.getItem('oakshow_theme');
        if (!localStorage.getItem('oakshow_theme_v3')) {
          savedTheme = isMobile ? 'dark' : 'light';
          localStorage.setItem('oakshow_theme_v3', savedTheme);
        }
        var t = (savedTheme === 'dark') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', t);
        document.documentElement.style.colorScheme = t;

        // Immediately sync mobile browser theme-color status bar before initial paint
        var themeColor = (t === 'dark') ? '#030813' : '#ffffff';
        var metaTheme = document.getElementById('theme-color-meta') || document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
          metaTheme.setAttribute('content', themeColor);
        }

        // Synchronously derive and set initial document.title before Analytics loads
        var path = window.location.pathname || '';
        var rawSlug = path.replace(/^\\/+|\\.html$/gi, '').replace(/^(movies|series|films)\\//i, '');
        if (rawSlug && rawSlug !== 'index' && rawSlug !== 'home' && rawSlug !== 'discover') {
          var readable = rawSlug.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ');
          document.title = readable + ' — OakShow';
        }
      } catch(e) {}
    })();
  </script>
  <style>
    noscript {
      display: none !important;
    }
    /* Hide Firebase Auth background iframe and prevent it from rendering a white bar or top scroll offset on mobile dark theme */
    iframe[src*="firebaseapp.com"],
    iframe[src*="/__/auth/"],
    iframe[id^="I0_"],
    iframe[name^="I0"],
    iframe[ng-non-bindable] {
      position: fixed !important;
      top: -9999px !important;
      left: -9999px !important;
      width: 0 !important;
      height: 0 !important;
      border: 0 !important;
      outline: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      clip-path: inset(50%) !important;
      background: transparent !important;
      color-scheme: dark !important;
      z-index: -99999 !important;
    }
  </style>
  
  <title>Whalefall (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow</title>
  <meta name="description" content="A scuba diver searching for his late father&#039;s remains off the coast of Monterey is swallowed alive by an eighty-foot, sixty-ton sperm whale. Trapped inside its stomach in pitch darkness with only an hour of oxygen left, he must fight for survival while confronting the unresolved trauma of his past." />
  <meta name="keywords" content="OakShow, movie reviews, ratings, cinema, Hollywood, Bollywood, Tollywood, Mollywood, Kollywood, upcoming movies, release calendar, critic reviews, showtimes, BookMyShow" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="https://oakshow.in/Whalefall.html" />
  
  <!-- OpenGraph Metadata -->
  <meta property="og:site_name" content="OakShow" />
  <meta property="og:title" content="Whalefall (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow" />
  <meta property="og:description" content="A scuba diver searching for his late father&#039;s remains off the coast of Monterey is swallowed alive by an eighty-foot, sixty-ton sperm whale. Trapped inside its stomach in pitch darkness with only an hour of oxygen left, he must fight for survival while confronting the unresolved trauma of his past." />
  <meta property="og:type" content="video.movie" />
  <meta property="og:url" content="https://oakshow.in/Whalefall.html" />
  <meta property="og:image" content="https://oakshow.in/pics/Films/Whalefall/2.jpg" />

  <!-- Twitter Card Metadata -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@OakShow" />
  <meta name="twitter:creator" content="@OakShow" />
  <meta name="twitter:title" content="Whalefall (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow" />
  <meta name="twitter:description" content="A scuba diver searching for his late father&#039;s remains off the coast of Monterey is swallowed alive by an eighty-foot, sixty-ton sperm whale. Trapped inside its stomach in pitch darkness with only an hour of oxygen left, he must fight for survival while confronting the unresolved trauma of his past." />
  <meta name="twitter:image" content="https://oakshow.in/pics/Films/Whalefall/2.jpg" />

  <!-- Schema.org JSON-LD Organization Data -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "Whalefall",
  "description": "A scuba diver searching for his late father's remains off the coast of Monterey is swallowed alive by an eighty-foot, sixty-ton sperm whale. Trapped inside its stomach in pitch darkness with only an hour of oxygen left, he must fight for survival while confronting the unresolved trauma of his past.",
  "image": "https://oakshow.in/pics/Films/Whalefall/2.jpg",
  "url": "https://oakshow.in/Whalefall.html",
  "datePublished": "October 16, 2026",
  "director": {
    "@type": "Person",
    "name": "Brian Duffield"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "6.8/10",
    "bestRating": "10",
    "ratingCount": "100"
  }
}
</script>

  <!-- Google Fonts: Outfit & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-K686R3P');</script>
  <!-- End Google Tag Manager -->

  <!-- Google Analytics (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-77818206-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-77818206-1', {
      send_page_view: false
    });
  </script>
  <!-- Legacy Google Analytics ga() support -->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-77818206-1', 'auto');
  </script>
  <script type="module" crossorigin src="/assets/index-D3sYzBd9.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/index-B556zamZ.css">
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K686R3P"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div id="root">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#030813;color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;">
      <div style="width:48px;height:48px;border:3px solid rgba(56,189,248,0.2);border-top-color:#38bdf8;border-radius:50%;animation:oak-spin 0.8s linear infinite;margin-bottom:16px;"></div>
      <div style="font-size:1.15rem;font-weight:700;letter-spacing:0.06em;color:#f8fafc;">OAKSHOW</div>
      <div style="font-size:0.8rem;color:#94a3b8;margin-top:6px;">Loading entertainment catalog...</div>
      <style>@keyframes oak-spin{to{transform:rotate(360deg)}}</style>
    </div>
  </div>
<noscript>
<div class="oakshow-crawler-fallback" style="padding:24px;font-family:sans-serif;color:#fff;background:#0d1117;">

      <h1>Whalefall (2026)</h1>
      <p><strong>Director:</strong> Brian Duffield | <strong>Release Date:</strong> October 16, 2026 | <strong>Genre:</strong> Survival, Thriller, Drama, Adventure | <strong>Language:</strong> English</p>
      <p>A scuba diver searching for his late father&#039;s remains off the coast of Monterey is swallowed alive by an eighty-foot, sixty-ton sperm whale. Trapped inside its stomach in pitch darkness with only an hour of oxygen left, he must fight for survival while confronting the unresolved trauma of his past.</p>
      <p><strong>Book Tickets:</strong> <a href="https://in.bookmyshow.com/movies/whalefall/ET00506502" target="_blank" rel="noopener noreferrer">BookMyShow</a> | <a href="https://www.district.in/movies/whalefall-movie-tickets-MV218658?srsltid=AU7gw4WCmlPunN0PU5rnfZUhKPe-UgB-JB1kOyemB4V6wmB_60voh9j6" target="_blank" rel="noopener noreferrer">District</a> | <a href="https://www.fandango.com/whalefall-2026-246280/movie-overview" target="_blank" rel="noopener noreferrer">Fandango</a> | <a href="https://www.odeon.co.uk/films/whalefall/HO00009117/" target="_blank" rel="noopener noreferrer">ODEON Cinemas</a></p>
      <p><a href="https://oakshow.in/">Explore OakShow Entertainment</a></p>
    
</div>
</noscript>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'Whalefall.html'), template, 'utf8');
fs.writeFileSync(path.join(rootDir, 'dist', 'Whalefall.html'), template, 'utf8');
console.log('Saved Whalefall.html in both root and dist/ directories.');

// 7. Update HollywoodReleases2026October.html fallback text if present
const hw2026OctPath = path.join(rootDir, 'HollywoodReleases2026October.html');
if (fs.existsSync(hw2026OctPath)) {
  let content = fs.readFileSync(hw2026OctPath, 'utf8');
  if (!content.includes('Whalefall')) {
    content = content.replace('Matchbox: The Movie and Verity.', 'Matchbox: The Movie, Verity, and Whalefall.');
    fs.writeFileSync(hw2026OctPath, content, 'utf8');
    const distHw2026OctPath = path.join(rootDir, 'dist', 'HollywoodReleases2026October.html');
    if (fs.existsSync(distHw2026OctPath)) {
      fs.writeFileSync(distHw2026OctPath, content, 'utf8');
    }
    console.log('Updated HollywoodReleases2026October.html fallback text with Whalefall.');
  }
}

console.log('=== Finished Successfully Adding Whalefall (2026) ===');
