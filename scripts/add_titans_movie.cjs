const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

console.log('=== Adding Titans Malayalam Movie (2026) to OakShow ===');

// 1. Movie Object
const titansMovie = {
  id: "TitansMalayalamMovie",
  slug: "titans-malayalam-movie",
  type: "movie",
  category: "Mollywood",
  score: 5.9,
  filename: "TitansMalayalamMovie.html",
  fileName: "TitansMalayalamMovie.html",
  aliases: ["Titans.html", "Titans"],
  title: "Titans",
  metaTitle: "Titans (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Set in Fort Kochi, an ambitious enforcer teams up with an eccentric driver on a high-stakes mission, sparking a chaotic collision of underworld crime and superhero fantasy in Prince Joy's comedy entertainer starring Jayasurya and Vinayakan.",
  plot: "Set in the bustling coastal backdrop of Fort Kochi, Titans follows Antony Yakuza (Jayasurya), a veteran enforcer in Paili's notorious local gang. Following the sudden demise of Paili, his brash son Peter (Baby Jean), known as Kuttappi, seizes command of the outfit, sidelining Antony after a string of bungled assignments. Desperate to restore his diminished reputation and pride, Antony teams up with his young associate Anwar (Nihal Nizam) for a high-stakes, secretive operation. They are joined by Rejimon (Vinayakan), an eccentric driver employed by the elusive Managing Director Anand Ji. However, as the mission unfolds, Rejimon reveals his own bizarre, hidden agenda, spiraling their grounded gangster escapade into a chaotic, superhero-inspired fantasy collision where reality and comic-book madness collide in Fort Kochi.",
  language: "Malayalam",
  releaseDate: "October 22, 2026",
  year: "2026",
  status: "released",
  genre: "Fantasy, Comedy, Action, Thriller",
  duration: "2hr 12min",
  certificate: "U/A 16+",
  director: "Prince Joy",
  writer: "James Sebastian",
  basedOn: "",
  producers: "Midhun Manuel Thomas, Irshad M. Hassan, Pradeep C.S.",
  productionCompanies: "Nerampokku, Manuel Movie Makers, Avanir Tech, Babu Ettan Films",
  distributor: "Magic Frames (Kerala), Fars Films (Overseas)",
  musicDirector: "Don Vincent",
  cinematography: "Vishnu Sharma",
  editing: "Shameer Muhammed",
  boxOffice: {
    budget: "₹8 Crore (Estimated)",
    worldwideGross: "₹1.45 Crore",
    domesticGross: "₹1.23 Crore (Kerala)",
    openingDay: "₹75 Lakhs",
    verdict: "In Theatres / Opening Weekend Theatrical Run",
    source: "Sacnilk, Koimoi & The Times of India",
    lastUpdated: "October 2026"
  },
  budget: "₹8 Crore",
  awards: [],
  poster: "pics/Films/TitansMalayalamMovie/1.jpg",
  banner: "pics/Films/TitansMalayalamMovie/2.jpg",
  gallery: [
    {
      src: "pics/Films/TitansMalayalamMovie/1.jpg",
      alt: "Titans Official Theatrical Poster"
    },
    {
      src: "pics/Films/TitansMalayalamMovie/2.jpg",
      alt: "Titans Official Banner & Key Art"
    }
  ],
  ratings: [
    {
      source: "IMDb",
      score: "5.9/10",
      url: "https://www.imdb.com/title/tt37547793/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Indian Express",
      score: "1/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/titans-movie-review-rating-jayasurya-vinayakan-fantasy-comedy-tiring-unfunny-disaster-10931574/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    }
  ],
  cast: [
    {
      actor: "Jayasurya",
      role: "Antony Yakuza",
      description: "A seasoned Fort Kochi gang enforcer trying to regain his status in the underworld"
    },
    {
      actor: "Vinayakan",
      role: "Rejimon",
      description: "An eccentric driver and assistant with a mysterious superhero fixation and secret agenda"
    },
    {
      actor: "Nihal Nizam",
      role: "Anwar",
      description: "Antony's loyal companion assisting in the covert operation"
    },
    {
      actor: "Baby Jean",
      role: "Peter (Kuttappi)",
      description: "Paili's headstrong son who takes over the family gang"
    },
    {
      actor: "Adam Sabiq",
      role: "Gang Associate",
      description: "Member of the Fort Kochi criminal crew"
    },
    {
      actor: "Suresh Krishna",
      role: "CI Vyasan",
      description: "A strict circle inspector tracking the gang's activities"
    },
    {
      actor: "Indrans",
      role: "Key Elder",
      description: "A prominent elder resident in Fort Kochi"
    },
    {
      actor: "Sunny Wayne",
      role: "Special Appearance",
      description: "Extended cameo appearance in a crucial sequence"
    }
  ],
  trailers: [
    {
      title: "Titans Official Trailer | Jayasurya, Vinayakan | Prince Joy | Don Vincent",
      url: "https://www.youtube.com/watch?v=fy-r1xjecLs",
      embedUrl: "https://www.youtube.com/embed/fy-r1xjecLs",
      youtubeId: "fy-r1xjecLs",
      type: "Official Trailer"
    },
    {
      title: "Titans First Look Promo Song | Don Vincent | Jayasurya, Vinayakan",
      url: "https://www.youtube.com/watch?v=1S6Y38qJjH8",
      embedUrl: "https://www.youtube.com/embed/1S6Y38qJjH8",
      youtubeId: "1S6Y38qJjH8",
      type: "Promo Song"
    }
  ],
  videos: [
    {
      title: "Titans Official Trailer",
      url: "https://www.youtube.com/watch?v=fy-r1xjecLs",
      youtubeId: "fy-r1xjecLs"
    },
    {
      title: "Titans Theme Song Promo",
      url: "https://www.youtube.com/watch?v=1S6Y38qJjH8",
      youtubeId: "1S6Y38qJjH8"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/5QpjGNfIqDXGzPcPthjuV5",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Titans Soundtrack on Spotify"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/titans-first-look-theme-from-titans/TGwV8ZhcP-Y_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen to Titans Theme on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kozhikode/titans/ET00519195",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow"
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/titans-movie-tickets-MV231910?srsltid=AYCX9vKfWx3CeDWcEglZ04RKvqoQp3jQJKCmUOcgBSePRn8QAiiUhEsg",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District"
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/titans-2026-247932/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango"
    }
  ],
  articles: [
    {
      headline: "Titans movie review: Jayasurya and Vinayakan’s fantasy comedy is a tiring, unfunny disaster",
      url: "https://indianexpress.com/article/entertainment/movie-review/titans-movie-review-rating-jayasurya-vinayakan-fantasy-comedy-tiring-unfunny-disaster-10931574/",
      author: "The Indian Express",
      date: "October 22, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "‘Titans’ movie review: Jayasurya starrer fails to utilise a promising concept blending humour and fantasy",
      url: "https://www.thehindu.com/entertainment/movies/titans-movie-review-jayasurya-starrer-fails-to-utilise-a-promising-concept-blending-humour-and-fantasy/article71612232.ece",
      author: "The Hindu",
      date: "October 22, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Titans Movie Review: Occasionally fun, but lost in fantasy",
      url: "https://www.newindianexpress.com/entertainment/review/2026/Oct/23/malayalamreview2026oct23titans-movie-review-occasionally-fun-but-lost-in-fantasy",
      author: "The New Indian Express",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "‘Titans’ review: Jayasurya and Vinayakan shine in this mollywood fantasy comedy",
      url: "https://english.mathrubhumi.com/movies-music/review/titans-fdfs-movie-review-jayasurya-vinayakan-rating-without-spoilers-x0xqoqqg",
      author: "Mathrubhumi English",
      date: "October 22, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Titans review: A fantasy entertainer powered by humor and visual style",
      url: "https://www.manoramaonline.com/movies/movie-reviews/2026/10/22/titans-malayalam-movie-review-and-rating.html",
      author: "Malayala Manorama",
      date: "October 22, 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "Aadu 2",
      link: "Aadu2.html",
      poster: "pics/Films/Aadu2/1.jpg"
    },
    {
      title: "Kammara Sambhavam",
      link: "KammaraSambhavam.html",
      poster: "pics/Films/KammaraSambhavam/1.jpg"
    },
    {
      title: "Godha",
      link: "Godha.html",
      poster: "pics/Films/Godha/1.jpg"
    },
    {
      title: "Dhoomakethu",
      link: "Dhoomakethu.html",
      poster: "pics/Films/Dhoomakethu/1.jpeg"
    },
    {
      title: "Avarachan & Sons",
      link: "AvarachanandSons.html",
      poster: "pics/Films/AvarachanandSons/1.jpg"
    },
    {
      title: "Bethlehem Kudumba Unit",
      link: "BethlehemKudumbaUnit.html",
      poster: "pics/Films/BethlehemKudumbaUnit/2.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Titans_(film)",
  imdb: "https://www.imdb.com/title/tt37547793/"
};

// 2. Download and Save Images
const dirs = [
  path.join(rootDir, 'pics', 'Films', 'TitansMalayalamMovie'),
  path.join(rootDir, 'pics', 'TitansMalayalamMovie'),
  path.join(rootDir, 'dist', 'pics', 'Films', 'TitansMalayalamMovie'),
  path.join(rootDir, 'dist', 'pics', 'TitansMalayalamMovie')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function main() {
  console.log('Downloading official poster and banner for Titans...');
  const posterRes = await fetch('https://b.zmtcdn.com/data/edition_assets/17910234878294360.jpg', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const posterBuf = Buffer.from(await posterRes.arrayBuffer());

  const bannerRes = await fetch('https://cdn.district.in/movies-assets/images/cinema/TIT_Horizontal_Poster2-3e808fe0-c185-11f1-bb70-8505ebcfbb19.jpg', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const bannerBuf = Buffer.from(await bannerRes.arrayBuffer());

  dirs.forEach(d => {
    fs.writeFileSync(path.join(d, '1.jpg'), posterBuf);
    fs.writeFileSync(path.join(d, '2.jpg'), bannerBuf);
  });
  console.log(`Saved 1.jpg (${posterBuf.length} bytes) and 2.jpg (${bannerBuf.length} bytes).`);

  // 3. Process movies.json
  let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

  // Cross-reference Titans in related movies
  const relatedIds = ['Aadu2', 'KammaraSambhavam', 'AvarachanandSons', 'BethlehemKudumbaUnit'];
  relatedIds.forEach(relId => {
    const idx = movies.findIndex(m => m.id === relId || m.filename === `${relId}.html`);
    if (idx !== -1) {
      if (Array.isArray(movies[idx].similar) && !movies[idx].similar.some(s => s.link === 'TitansMalayalamMovie.html')) {
        movies[idx].similar.unshift({
          title: "Titans",
          link: "TitansMalayalamMovie.html",
          poster: "pics/Films/TitansMalayalamMovie/1.jpg"
        });
        console.log(`Cross-referenced Titans in ${relId} similar movies.`);
      }
    }
  });

  const existingIdx = movies.findIndex(m => m.id === 'TitansMalayalamMovie' || m.filename === 'TitansMalayalamMovie.html');
  if (existingIdx !== -1) {
    movies.splice(existingIdx, 1);
  }
  movies.unshift(titansMovie);
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`Placed Titans at index 0 of movies.json (${movies.length} total entries).`);

  // 4. Process search_index.json
  let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  const searchItem = {
    id: "TitansMalayalamMovie",
    slug: "titans-malayalam-movie",
    title: "Titans (2026 film)",
    type: "movie",
    category: "Mollywood",
    year: "2026",
    genre: "Fantasy, Comedy, Action, Thriller",
    language: "Malayalam",
    poster: "pics/Films/TitansMalayalamMovie/1.jpg",
    score: 5.9,
    filename: "TitansMalayalamMovie.html",
    fileName: "TitansMalayalamMovie.html",
    releaseDate: "October 22, 2026",
    status: "released",
    director: "Prince Joy",
    url: "TitansMalayalamMovie.html",
    ratings: titansMovie.ratings
  };

  const sIdx = searchIndex.findIndex(s => s.id === 'TitansMalayalamMovie' || s.url === 'TitansMalayalamMovie.html');
  if (sIdx !== -1) {
    searchIndex.splice(sIdx, 1);
  }
  searchIndex.unshift(searchItem);
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
  console.log(`Updated search_index.json with Titans (${searchIndex.length} total entries).`);

  // 5. Process releases.json
  let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
  const releaseHubItem = {
    title: "Titans",
    poster: "pics/Films/TitansMalayalamMovie/1.jpg",
    alt: "Titans (2026)",
    language: "Malayalam",
    category: "Mollywood",
    releaseDate: "October 22, 2026",
    genre: "Fantasy, Comedy, Action, Thriller",
    status: "released",
    moreLink: "TitansMalayalamMovie.html",
    trailerLink: "https://www.youtube.com/watch?v=fy-r1xjecLs",
    ratings: titansMovie.ratings.slice(0, 2)
  };

  // Add to Releases2026October
  const allOct = releases.find(r => r.id === 'Releases2026October');
  if (allOct) {
    const exIdx = allOct.items.findIndex(it => it.title === 'Titans' || it.moreLink === 'TitansMalayalamMovie.html');
    if (exIdx !== -1) {
      allOct.items[exIdx] = releaseHubItem;
    } else {
      allOct.items.unshift(releaseHubItem);
    }
    allOct.totalItems = allOct.items.length;
  }

  // Add to IndianReleases2026October
  const indOct = releases.find(r => r.id === 'IndianReleases2026October');
  if (indOct) {
    const exIdx = indOct.items.findIndex(it => it.title === 'Titans' || it.moreLink === 'TitansMalayalamMovie.html');
    if (exIdx !== -1) {
      indOct.items[exIdx] = releaseHubItem;
    } else {
      indOct.items.unshift(releaseHubItem);
    }
    indOct.totalItems = indOct.items.length;
  }

  fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
  console.log('Updated releases.json (Releases2026October & IndianReleases2026October).');

  // 6. Process news.json
  let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  const newsToAdd = [
    {
      movieId: "TitansMalayalamMovie",
      movieTitle: "Titans",
      title: "Titans movie review: Jayasurya and Vinayakan’s fantasy comedy is a tiring, unfunny disaster",
      source: "The Indian Express",
      date: "October 22, 2026",
      url: "https://indianexpress.com/article/entertainment/movie-review/titans-movie-review-rating-jayasurya-vinayakan-fantasy-comedy-tiring-unfunny-disaster-10931574/",
      category: "Critic Reviews"
    },
    {
      movieId: "TitansMalayalamMovie",
      movieTitle: "Titans",
      title: "‘Titans’ movie review: Jayasurya starrer fails to utilise a promising concept blending humour and fantasy",
      source: "The Hindu",
      date: "October 22, 2026",
      url: "https://www.thehindu.com/entertainment/movies/titans-movie-review-jayasurya-starrer-fails-to-utilise-a-promising-concept-blending-humour-and-fantasy/article71612232.ece",
      category: "Critic Reviews"
    },
    {
      movieId: "TitansMalayalamMovie",
      movieTitle: "Titans",
      title: "Titans Movie Review: Occasionally fun, but lost in fantasy",
      source: "The New Indian Express",
      date: "October 23, 2026",
      url: "https://www.newindianexpress.com/entertainment/review/2026/Oct/23/malayalamreview2026oct23titans-movie-review-occasionally-fun-but-lost-in-fantasy",
      category: "Critic Reviews"
    },
    {
      movieId: "TitansMalayalamMovie",
      movieTitle: "Titans",
      title: "‘Titans’ review: Jayasurya and Vinayakan shine in this mollywood fantasy comedy",
      source: "Mathrubhumi English",
      date: "October 22, 2026",
      url: "https://english.mathrubhumi.com/movies-music/review/titans-fdfs-movie-review-jayasurya-vinayakan-rating-without-spoilers-x0xqoqqg",
      category: "Critic Reviews"
    },
    {
      movieId: "TitansMalayalamMovie",
      movieTitle: "Titans",
      title: "Titans review: A fantasy entertainer powered by humor and visual style",
      source: "Malayala Manorama",
      date: "October 22, 2026",
      url: "https://www.manoramaonline.com/movies/movie-reviews/2026/10/22/titans-malayalam-movie-review-and-rating.html",
      category: "Critic Reviews"
    }
  ];

  newsToAdd.forEach((n, idx) => {
    const fIdx = news.findIndex(item => item.url === n.url);
    const newsObj = {
      id: `titans-news-${idx + 1}`,
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

  console.log('=== All Data Successfully Updated for Titans ===');
}

main().catch(err => {
  console.error('Error adding Titans:', err);
  process.exit(1);
});
