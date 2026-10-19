const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

console.log('=== Updating Hope (2026) as Released Movie in OakShow ===');

// 1. Define Hope (2026) Movie Data
const hope2026Movie = {
  id: "Hope2026",
  slug: "hope-2026",
  type: "movie",
  category: "International",
  score: 8,
  filename: "Hope2026.html",
  fileName: "Hope2026.html",
  title: "Hope",
  metaTitle: "Hope (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "In the remote border village of Hope Harbor near the Korean DMZ, a seasoned police chief and his rookie deputy face an unimaginable cosmic crisis when terrifying, unearthly beings appear and a local hunting party finds itself hunted in Na Hong-jin's visionary sci-fi epic.",
  plot: "Ko Bum-seok (Hwang Jung-min) is the world-weary police chief of Hope Harbor, a quiet, isolated village near the Korean Demilitarized Zone largely inhabited by elderly residents. When cattle turn up dead with horrific, impossible wounds, Bum-seok's second cousin Ko Sung-ki (Zo In-sung) and local hunters assume a stray predator is responsible. But panic swiftly consumes the village as a towering, intelligent, and seemingly indestructible extraterrestrial humanoid rampages through town, massacring villagers. With regional emergency services tied up combating wildfires, Bum-seok teams up with retired colonel Ahn Nak-yeon to track down the intruder, only to discover it is searching for its captured infant. Meanwhile, deep in the Carpathian and Korean mountain ridges, Sung-ki stumbles into a crashed alien starship where he encounters the extraterrestrial Empress J'aur (Alicia Vikander) and her lethal warrior Ma'veyyo (Michael Fassbender), escalating the local survival struggle into a high-octane cosmic confrontation for humanity's survival.",
  language: "Korean, English",
  releaseDate: "July 15, 2026",
  year: "2026",
  status: "released",
  genre: "Sci-Fi, Action, Thriller, Creature Feature, Monster",
  duration: "2hr 36min",
  certificate: "15+ / R",
  director: "Na Hong-jin",
  writer: "Na Hong-jin",
  basedOn: "",
  producers: "Na Hong-jin, Kim Sae-mi, Kim Sae-rom",
  productionCompanies: "Forged Films, Plus M Entertainment",
  musicDirector: "Michael Abels",
  cinematography: "Hong Kyung-pyo",
  editing: "Kim Sun-min",
  distributors: "Plus M Entertainment, Neon, Focus Features, Sony Pictures Worldwide Acquisitions, Star Entertainment",
  boxOffice: {
    budget: "$46 Million",
    worldwideGross: "$47 Million",
    domesticGross: "$36.0 Million (South Korea - 4.5M admissions)",
    overseasGross: "$11.0 Million (International & North America)",
    openingWeekend: "$11.3 Million (South Korea) / $3.2 Million (North America)",
    openingDay: "$1.1 Million (North America)",
    verdict: "Critically Acclaimed Hit / Major International Pre-Sales Record",
    source: "Box Office Mojo, The Numbers, Variety & Screen Daily",
    lastUpdated: "October 2026"
  },
  budget: "$46 Million",
  awards: [
    {
      organization: "Cannes Film Festival",
      year: "2026",
      wins: [],
      nominations: [
        {
          category: "Palme d'Or",
          recipient: "Na Hong-jin"
        }
      ]
    },
    {
      organization: "Buil Film Awards",
      year: "2026",
      wins: [
        {
          category: "Best Director",
          recipient: "Na Hong-jin"
        },
        {
          category: "Best New Actress",
          recipient: "Jung Ho-yeon"
        },
        {
          category: "Best Supporting Actor",
          recipient: "Eum Moon-suk"
        },
        {
          category: "Best Cinematography",
          recipient: "Hong Kyung-pyo"
        },
        {
          category: "Art and Technical Award",
          recipient: "Lee Hoo-kyung"
        }
      ],
      nominations: [
        {
          category: "Best Film",
          recipient: "Hope"
        }
      ]
    },
    {
      organization: "New York Asian Film Festival",
      year: "2026",
      wins: [
        {
          category: "Daniel A. Craft Award for Excellence in Action Cinema",
          recipient: "Na Hong-jin"
        }
      ],
      nominations: []
    },
    {
      organization: "Marie Claire Asia Star Awards",
      year: "2026",
      wins: [
        {
          category: "Director of the Year Award",
          recipient: "Na Hong-jin"
        },
        {
          category: "Actor of the Year Award",
          recipient: "Zo In-sung"
        }
      ],
      nominations: []
    }
  ],
  poster: "pics/Films/Hope2026/1.jpg",
  banner: "pics/Films/Hope2026/2.jpg",
  gallery: [
    {
      src: "pics/Films/Hope2026/1.jpg",
      alt: "Hope (2026) Official Theatrical Poster"
    },
    {
      src: "pics/Films/Hope2026/2.jpg",
      alt: "Hope (2026) Official Banner & Key Art"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8/10",
      url: "https://oakshow.in/Hope2026.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "6.7/10",
      url: "https://www.imdb.com/title/tt27369017/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "79%",
      url: "https://www.rottentomatoes.com/m/hope_2026",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    },
    {
      source: "IGN",
      score: "9/10",
      url: "https://www.ign.com/articles/hope-review-na-hong-jin",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Roger Ebert",
      score: "3.5/4",
      url: "https://www.rogerebert.com/reviews/hope-na-jong-hin-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "The Guardian",
      score: "4/5",
      url: "https://www.theguardian.com/film/2026/may/18/hope-review-non-stop-gonzo-alien-battling-is-top-quality-entertainment",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Metacritic",
      score: "67/100",
      url: "https://www.metacritic.com/movie/hope-2026/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Common Sense Media",
      score: "3/5",
      url: "https://www.commonsensemedia.org/movie-reviews/hope",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    }
  ],
  cast: [
    {
      actor: "Hwang Jung-min",
      role: "Ko Bum-seok",
      description: "The world-weary police chief of Hope Harbor defending his town from an extraterrestrial menace"
    },
    {
      actor: "Zo In-sung",
      role: "Ko Sung-ki",
      description: "A headstrong local hunter and cousin to Bum-seok who tracks the creature into the mountains"
    },
    {
      actor: "Jung Ho-yeon",
      role: "Im Sung-ae",
      description: "A determined rookie police officer in Hope Harbor who aids in the town's defence"
    },
    {
      actor: "Michael Fassbender",
      role: "Ma'veyyo",
      description: "A formidable extraterrestrial warrior and royal bodyguard sworn to protect the alien Empress"
    },
    {
      actor: "Alicia Vikander",
      role: "J'aur",
      description: "The calculating alien Empress commanding the extraterrestrial survivors"
    },
    {
      actor: "Taylor Russell",
      role: "Ai'dovor",
      description: "A lethal alien creature and subordinate to Empress J'aur"
    },
    {
      actor: "Cameron Britton",
      role: "Va'migere",
      description: "The initial rampaging creature searching desperately for its lost offspring"
    },
    {
      actor: "Eum Moon-suk",
      role: "Yang-bae",
      description: "An eccentric local hunter and carpenter who inadvertently sparks the conflict"
    },
    {
      actor: "Lee Sang-hee",
      role: "Ahn Nak-yeon",
      description: "A seasoned, retired military colonel who assists Chief Bum-seok"
    },
    {
      actor: "Im Hyun-sik",
      role: "Mr. Hae-sul",
      description: "An elderly resident and respected voice among the Hope Harbor villagers"
    }
  ],
  trailers: [
    {
      title: "Hope (2026) Official Theatrical Trailer - Plus M Entertainment & Neon",
      url: "https://www.youtube.com/results?search_query=Hope+Na+Hong-jin+trailer",
      embedUrl: "",
      youtubeId: "",
      type: "Official Trailer"
    }
  ],
  videos: [
    {
      title: "Hope (2026) Official Trailer - Na Hong-jin",
      url: "https://www.youtube.com/results?search_query=Hope+Na+Hong-jin+trailer",
      youtubeId: ""
    }
  ],
  music: [],
  watchOnline: [],
  bookings: [],
  articles: [
    {
      headline: "Hope review: Non-stop gonzo alien battling is top-quality entertainment",
      url: "https://www.theguardian.com/film/2026/may/18/hope-review-non-stop-gonzo-alien-battling-is-top-quality-entertainment",
      author: "The Guardian",
      date: "May 18, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Hope Review — Na Hong-jin delivers a rip-roaring Korean creature feature made with gonzo skill",
      url: "https://www.ign.com/articles/hope-review-na-hong-jin",
      author: "IGN",
      date: "May 18, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Hope movie review & film summary (2026) — Bonkers Korean monster movie destroys the hero narrative",
      url: "https://www.rogerebert.com/reviews/hope-na-jong-hin-movie-review-2026",
      author: "Roger Ebert",
      date: "May 18, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Hope Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/hope",
      author: "Common Sense Media",
      date: "2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Most Intense Sci-Fi Movie of the Year Began with a Fishing Trip Near the Korean DMZ",
      url: "https://www.denofgeek.com/movies/most-intense-sci-fi-movie-of-the-year-began-fishing-trip-near-korean-dmz/",
      author: "Den of Geek",
      date: "2026",
      section: "News"
    },
    {
      headline: "Na Hong-jin's Korean sci-fi thriller Hope to release in India on October 23",
      url: "https://www.telegraphindia.com/entertainment/na-hong-jins-korean-sci-fi-thriller-hope-to-release-in-india-on-october-23/cid/2182234",
      author: "The Telegraph",
      date: "October 2026",
      section: "News"
    }
  ],
  similar: [
    {
      title: "Project Hail Mary",
      link: "ProjectHailMary.html",
      poster: "pics/Films/ProjectHailMary/2.jpg"
    },
    {
      title: "The End of Oak Street",
      link: "TheEndofOakStreet.html",
      poster: "pics/Films/TheEndofOakStreet/1.jpg"
    },
    {
      title: "A Quiet Place",
      link: "AQuietPlace.html",
      poster: "pics/Films/AQuietPlace/1.jpg"
    },
    {
      title: "Alien: Covenant",
      link: "AlienCovenant2017.html",
      poster: "pics/Films/AlienCovenant2017/1.jpg"
    },
    {
      title: "Godzilla vs. Kong",
      link: "GodzillavsKong.html",
      poster: "pics/Films/GodzillavsKong/1.jpg"
    },
    {
      title: "The Predator",
      link: "ThePredator.html",
      poster: "pics/Films/ThePredator/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Hope_(2026_film)",
  imdb: "https://www.imdb.com/title/tt27369017/"
};

// 2. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

// Also update ProjectHailMary & TheEndofOakStreet similar movies to include Hope (2026)
const phmIdx = movies.findIndex(m => m.id === 'ProjectHailMary' || m.filename === 'ProjectHailMary.html');
if (phmIdx !== -1) {
  if (!movies[phmIdx].similar.some(s => s.link === 'Hope2026.html')) {
    movies[phmIdx].similar.unshift({
      title: "Hope (2026)",
      link: "Hope2026.html",
      poster: "pics/Films/Hope2026/1.jpg"
    });
    console.log('Cross-referenced Hope2026 in Project Hail Mary similar movies.');
  }
}

const eosIdx = movies.findIndex(m => m.id === 'TheEndofOakStreet' || m.filename === 'TheEndofOakStreet.html');
if (eosIdx !== -1) {
  if (Array.isArray(movies[eosIdx].similar) && !movies[eosIdx].similar.some(s => s.link === 'Hope2026.html')) {
    movies[eosIdx].similar.unshift({
      title: "Hope (2026)",
      link: "Hope2026.html",
      poster: "pics/Films/Hope2026/1.jpg"
    });
    console.log('Cross-referenced Hope2026 in The End of Oak Street similar movies.');
  }
}

// Remove any existing Hope2026 entry and unshift to top of movies.json
const existingIdx = movies.findIndex(m => m.id === 'Hope2026' || m.filename === 'Hope2026.html');
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(hope2026Movie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed Hope (2026) at index 0 of movies.json (${movies.length} total entries).`);

// 3. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "Hope2026",
  slug: "hope-2026",
  title: "Hope (2026 film)",
  type: "movie",
  category: "International",
  year: "2026",
  genre: "Sci-Fi, Action, Thriller, Creature Feature, Monster",
  language: "Korean, English",
  poster: "pics/Films/Hope2026/1.jpg",
  score: 8,
  filename: "Hope2026.html",
  fileName: "Hope2026.html",
  releaseDate: "July 15, 2026",
  status: "released",
  director: "Na Hong-jin",
  url: "Hope2026.html",
  ratings: hope2026Movie.ratings
};

const sIdx = searchIndex.findIndex(s => s.id === 'Hope2026' || s.url === 'Hope2026.html');
if (sIdx !== -1) {
  searchIndex.splice(sIdx, 1);
}
searchIndex.unshift(searchItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json with Hope (2026) (${searchIndex.length} total entries).`);

// 4. Process news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsToAdd = [
  {
    movieId: "Hope2026",
    movieTitle: "Hope",
    title: "Na Hong-jin's Korean sci-fi thriller Hope to release in India on October 23",
    source: "The Telegraph",
    date: "October 2026",
    url: "https://www.telegraphindia.com/entertainment/na-hong-jins-korean-sci-fi-thriller-hope-to-release-in-india-on-october-23/cid/2182234",
    category: "International Cinema"
  },
  {
    movieId: "Hope2026",
    movieTitle: "Hope",
    title: "The Most Intense Sci-Fi Movie of the Year Began with a Fishing Trip Near the Korean DMZ",
    source: "Den of Geek",
    date: "2026",
    url: "https://www.denofgeek.com/movies/most-intense-sci-fi-movie-of-the-year-began-fishing-trip-near-korean-dmz/",
    category: "Sci-Fi & Thriller"
  },
  {
    movieId: "Hope2026",
    movieTitle: "Hope",
    title: "Hope review: Non-stop gonzo alien battling is top-quality entertainment",
    source: "The Guardian",
    date: "May 18, 2026",
    url: "https://www.theguardian.com/film/2026/may/18/hope-review-non-stop-gonzo-alien-battling-is-top-quality-entertainment",
    category: "Critic Reviews"
  },
  {
    movieId: "Hope2026",
    movieTitle: "Hope",
    title: "Hope Review — Na Hong-jin delivers a rip-roaring Korean creature feature made with gonzo skill",
    source: "IGN",
    date: "May 18, 2026",
    url: "https://www.ign.com/articles/hope-review-na-hong-jin",
    category: "Critic Reviews"
  },
  {
    movieId: "Hope2026",
    movieTitle: "Hope",
    title: "Hope movie review & film summary (2026) — Bonkers Korean monster movie destroys the hero narrative",
    source: "Roger Ebert",
    date: "May 18, 2026",
    url: "https://www.rogerebert.com/reviews/hope-na-jong-hin-movie-review-2026",
    category: "Critic Reviews"
  }
];

newsToAdd.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `hope2026-news-${idx + 1}`,
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

// 5. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const releaseHubItem = {
  title: "Hope",
  poster: "pics/Films/Hope2026/1.jpg",
  alt: "Hope (2026)",
  language: "Korean, English",
  category: "International",
  releaseDate: "October 23, 2026",
  genre: "Sci-Fi, Action, Thriller, Creature Feature, Monster",
  status: "released",
  moreLink: "Hope2026.html",
  trailerLink: "https://www.youtube.com/results?search_query=Hope+Na+Hong-jin+trailer",
  ratings: hope2026Movie.ratings.slice(0, 3)
};

// Add to Releases2026October
const allOct = releases.find(r => r.id === 'Releases2026October');
if (allOct) {
  const exIdx = allOct.items.findIndex(it => it.title === 'Hope' || it.moreLink === 'Hope2026.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    allOct.items.unshift(releaseHubItem);
  }
  allOct.totalItems = allOct.items.length;
}

// Add to HollywoodReleases2026October as crossover international entry
const hwOct = releases.find(r => r.id === 'HollywoodReleases2026October');
if (hwOct) {
  const exIdx = hwOct.items.findIndex(it => it.title === 'Hope' || it.moreLink === 'Hope2026.html');
  if (exIdx !== -1) {
    hwOct.items[exIdx] = releaseHubItem;
  } else {
    hwOct.items.unshift(releaseHubItem);
  }
  hwOct.totalItems = hwOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (Releases2026October & HollywoodReleases2026October).');

// 6. Ensure image directories in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'Hope2026');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'Hope2026');

if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/Hope2026`);
}

// Also ensure dist/pics/RatingSiteLogos has rating logos
const srcLogosDir = path.join(rootDir, 'pics', 'RatingSiteLogos');
const distLogosDir = path.join(rootDir, 'dist', 'pics', 'RatingSiteLogos');
if (!fs.existsSync(distLogosDir)) {
  fs.mkdirSync(distLogosDir, { recursive: true });
}
if (fs.existsSync(srcLogosDir)) {
  const logos = fs.readdirSync(srcLogosDir);
  for (const f of logos) {
    const sPath = path.join(srcLogosDir, f);
    const dPath = path.join(distLogosDir, f);
    if (fs.statSync(sPath).isFile()) {
      if (!fs.existsSync(dPath)) {
        fs.copyFileSync(sPath, dPath);
      }
    }
  }
  const certSrcDir = path.join(srcLogosDir, 'OakShowCertificates');
  const certDistDir = path.join(distLogosDir, 'OakShowCertificates');
  if (fs.existsSync(certSrcDir)) {
    if (!fs.existsSync(certDistDir)) {
      fs.mkdirSync(certDistDir, { recursive: true });
    }
    const certs = fs.readdirSync(certSrcDir);
    for (const c of certs) {
      const sPath = path.join(certSrcDir, c);
      const dPath = path.join(certDistDir, c);
      if (!fs.existsSync(dPath)) {
        fs.copyFileSync(sPath, dPath);
      }
    }
  }
  console.log('Verified & synced rating site logos to dist.');
}

console.log('=== All Data Successfully Updated ===');
