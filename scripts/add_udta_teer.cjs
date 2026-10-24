const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

console.log('=== Adding Udta Teer (2026) to OakShow ===');

// 1. Movie Object
const udtaTeerMovie = {
  id: "UdtaTeer",
  slug: "udta-teer",
  type: "movie",
  category: "Bollywood",
  score: 6.7,
  filename: "UdtaTeer.html",
  fileName: "UdtaTeer.html",
  aliases: ["udta-teer.html", "UdtaTeer", "udta-teer"],
  title: "Udta Teer",
  metaTitle: "Udta Teer (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A Pakistani undercover operative in India loses his memory and flips allegiance, triggering a chaotic spiral of comedic espionage and cross-border confusion in Aakash Kaushik's action comedy starring Ayushmann Khurrana and Sara Ali Khan.",
  plot: "Set against the backdrop of clandestine cross-border espionage between India and Pakistan, Udta Teer follows Bilal Ahmad (Ayushmann Khurrana), an undercover operative embedded deep inside India under the civilian cover identity of Vikrant. Trained to operate with stealth, Bilal's mission spirals into utter disarray when an unexpected incident causes him to suffer acute amnesia, wiping out his true allegiance and training. Convinced that he is an ordinary, fiercely patriotic Indian citizen named Vikrant, Bilal falls in love with Yamini (Sara Ali Khan) and unwittingly turns against his own handlers, including senior ISI officials General Mir (Gulshan Grover) and extremist handler Azhar Maqsood (Mukul Dev).\n\nAs Indian intelligence chief M. D. Burman (Rahul Bose) and operative Dhruv (Suhail Nayyar) race to track down a suspected foreign terror cell, Bilal's confused identity creates a whirlwind of chaotic mix-ups, mistaken loyalties, and comedic shootouts. Balancing hilarious identity crises with high-octane spy thriller set-pieces, Bilal's journey becomes an accidental quest of discovery, patriotism, and comedic redemption across Delhi, Punjab, and beyond.",
  language: "Hindi",
  releaseDate: "October 23, 2026",
  year: "2026",
  status: "released",
  genre: "Spy, Comedy, Action, Thriller",
  duration: "2hr 14min",
  certificate: "U/A",
  director: "Aakash Kaushik",
  writer: "Aakash Kaushik",
  basedOn: "",
  producers: "Karan Johar, Adar Poonawalla, Guneet Monga, Apoorva Mehta, Achin Jain",
  productionCompanies: "Dharma Productions, Sikhya Entertainment",
  distributor: "Dharma Productions",
  musicDirector: "Sachin–Jigar, Ketan Sodha (Score)",
  cinematography: "Harshvir Oberai",
  editing: "Prerna Saigal",
  boxOffice: {
    budget: "₹50 Crore (Estimated)",
    worldwideGross: "₹13.23 Crore",
    domesticGross: "₹12 Crore",
    overseasGross: "₹1.23 Crore",
    openingDay: "₹3.89 Crore",
    verdict: "In Theatres / Opening Weekend Theatrical Run",
    source: "Bollywood Hungama & Sacnilk",
    lastUpdated: "October 2026"
  },
  budget: "₹50 Crore",
  awards: [],
  poster: "pics/Films/UdtaTeer/1.jpg",
  banner: "pics/Films/UdtaTeer/2.jpg",
  gallery: [
    {
      src: "pics/Films/UdtaTeer/1.jpg",
      alt: "Udta Teer Official Theatrical Poster"
    },
    {
      src: "pics/Films/UdtaTeer/2.jpg",
      alt: "Udta Teer Official Banner & Key Art"
    }
  ],
  ratings: [
    {
      source: "IMDb",
      score: "6.7/10",
      url: "https://www.imdb.com/title/tt31806773/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Pinkvilla",
      score: "3.5/5",
      url: "https://www.pinkvilla.com/entertainment/reviews/udta-teer-review-ayushmann-khurranas-spy-comedy-serves-a-major-laugh-riot-late-mukul-dev-gets-memorable-swansong-1406059",
      icon: "pics/RatingSiteLogos/pinkvilla.png"
    },
    {
      source: "Hindustan Times",
      score: "3.5/5",
      url: "https://www.hindustantimes.com/entertainment/bollywood/udta-teer-review-this-ayushmann-khurrana-spy-comedy-rarely-misses-a-chance-to-make-you-laugh-101792732070865.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "India Today",
      score: "3.5/5",
      url: "https://www.indiatoday.in/movies/reviews/story/udta-teer-review-ayushmann-khurrana-sara-ali-khan-spy-comedy-3023186-2026-10-23",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "NDTV",
      score: "2.5/5",
      url: "https://www.ndtv.com/entertainment/udta-teer-review-in-the-era-of-dhurandhar-this-ayushmann-khurrana-film-aspires-to-be-austin-powers-2-5-stars-12224832",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/udta-teer-review-misses-the-bullseye/20261023.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "Indian Express",
      score: "2/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/udta-teer-movie-review-ayushmann-khurrana-film-tedious-mix-spoof-and-sentiment-10933188/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    }
  ],
  cast: [
    {
      actor: "Ayushmann Khurrana",
      role: "Bilal Ahmad / Vikrant",
      description: "An undercover operative embedded in India who loses his memory and flips allegiance to India"
    },
    {
      actor: "Sara Ali Khan",
      role: "Yamini",
      description: "Bilal's spirited partner and romantic interest"
    },
    {
      actor: "Mukul Dev",
      role: "Azhar Maqsood",
      description: "Notorious extremist terror mastermind and handler in late Mukul Dev's memorable final performance"
    },
    {
      actor: "Gulshan Grover",
      role: "General Mir",
      description: "Ruthless senior military commander supervising covert foreign operations"
    },
    {
      actor: "Rahul Bose",
      role: "M. D. Burman",
      description: "Astute Indian intelligence chief directing counter-espionage"
    },
    {
      actor: "Ram Kapoor",
      role: "A. Q. Niyazi",
      description: "Senior handler and diplomat coordinating covert cells"
    },
    {
      actor: "Suhail Nayyar",
      role: "Dhruv",
      description: "Sharp Indian operative tracking anomalous cross-border network chatter"
    },
    {
      actor: "Brijendra Kala",
      role: "K. K. Shrivastav",
      description: "Eccentric bureaucratic intelligence liaison officer"
    },
    {
      actor: "Supriya Pilgaonkar",
      role: "Yamini's Mother",
      description: "Yamini's affectionate yet perceptive mother"
    },
    {
      actor: "Sandeep Anand",
      role: "Shambhu",
      description: "Bilal's loyal local confidant"
    },
    {
      actor: "Raghubir Yadav",
      role: "Imam",
      description: "Wise community elder in Delhi"
    },
    {
      actor: "Smita Tambe",
      role: "Holkar",
      description: "Veteran enforcement officer"
    }
  ],
  trailers: [
    {
      title: "Udta Teer Official Trailer | Ayushmann Khurrana & Sara Ali Khan | Akash A Kaushik | 23 October",
      url: "https://www.youtube.com/watch?v=hN_ZUElLH44",
      embedUrl: "https://www.youtube.com/embed/hN_ZUElLH44",
      youtubeId: "hN_ZUElLH44",
      type: "Official Trailer"
    },
    {
      title: "Udta Teer - Title Track | Ayushmann Khurrana, Sara Ali Khan | Sachin-Jigar, Raghav Chaitanya",
      url: "https://www.youtube.com/watch?v=XOM2j6Ai5qQ",
      embedUrl: "https://www.youtube.com/embed/XOM2j6Ai5qQ",
      youtubeId: "XOM2j6Ai5qQ",
      type: "Title Track"
    },
    {
      title: "Chann | Udta Teer | Ayushmann Khurrana, Sara Ali Khan | Sachin-Jigar, Arijit Singh",
      url: "https://www.youtube.com/watch?v=7eKJFnvYfOE",
      embedUrl: "https://www.youtube.com/embed/7eKJFnvYfOE",
      youtubeId: "7eKJFnvYfOE",
      type: "Music Video"
    }
  ],
  videos: [
    {
      title: "Udta Teer Official Trailer",
      url: "https://www.youtube.com/watch?v=hN_ZUElLH44",
      youtubeId: "hN_ZUElLH44"
    },
    {
      title: "Udta Teer - Title Track",
      url: "https://www.youtube.com/watch?v=XOM2j6Ai5qQ",
      youtubeId: "XOM2j6Ai5qQ"
    },
    {
      title: "Chann — Video Song (Arijit Singh)",
      url: "https://www.youtube.com/watch?v=7eKJFnvYfOE",
      youtubeId: "7eKJFnvYfOE"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/5w8BWgvkabp4eWuP0YgR3A",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Udta Teer Soundtrack on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/udta-teer-original-motion-picture-soundtrack/6823174401",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen to Udta Teer Soundtrack on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/udta-teer/LHgqn,SRpyA_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen to Udta Teer Soundtrack on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/udta-teer/ET00495822",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book Tickets on BookMyShow"
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/udta-teer-movie-tickets-MV219550?srsltid=AYCX9vLOD_zs_2zvUL1FkJtG7WfGc66hL6sHx9HZnsEvntvSOPZ6jGn2",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book Tickets on District"
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/udta-teer-247825/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book Tickets on Fandango"
    }
  ],
  articles: [
    {
      headline: "Udta Teer review: This Ayushmann Khurrana spy comedy rarely misses a chance to make you laugh",
      url: "https://www.hindustantimes.com/entertainment/bollywood/udta-teer-review-this-ayushmann-khurrana-spy-comedy-rarely-misses-a-chance-to-make-you-laugh-101792732070865.html",
      author: "Hindustan Times",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "‘Udta Teer’ movie review: Ayushmann Khurrana is on target in this spy misadventure",
      url: "https://www.thehindu.com/entertainment/movies/udta-teer-movie-review-ayushmann-khurrana-is-on-target-in-this-spy-misadventure/article71615236.ece",
      author: "The Hindu",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Udta Teer Review: Ayushmann Khurrana's spy comedy serves a major laugh riot; late Mukul Dev gets memorable swansong",
      url: "https://www.pinkvilla.com/entertainment/reviews/udta-teer-review-ayushmann-khurranas-spy-comedy-serves-a-major-laugh-riot-late-mukul-dev-gets-memorable-swansong-1406059",
      author: "Pinkvilla",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Udta Teer review: Dhurandhar meets comedy of errors in Ayushmann's spy caper",
      url: "https://www.indiatoday.in/movies/reviews/story/udta-teer-review-ayushmann-khurrana-sara-ali-khan-spy-comedy-3023186-2026-10-23",
      author: "India Today",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Udta Teer Review: In The Era Of 'Dhurandhar', This Ayushmann Khurrana Film Aspires To Be 'Austin Powers'",
      url: "https://www.ndtv.com/entertainment/udta-teer-review-in-the-era-of-dhurandhar-this-ayushmann-khurrana-film-aspires-to-be-austin-powers-2-5-stars-12224832",
      author: "NDTV",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Udta Teer review: Misses the bullseye",
      url: "https://www.rediff.com/movies/review/udta-teer-review-misses-the-bullseye/20261023.htm",
      author: "Rediff",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Udta Teer movie review: Ayushmann Khurrana film is a tedious mix of spoof and sentiment",
      url: "https://indianexpress.com/article/entertainment/movie-review/udta-teer-movie-review-ayushmann-khurrana-film-tedious-mix-spoof-and-sentiment-10933188/",
      author: "The Indian Express",
      date: "October 23, 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "Dream Girl",
      link: "DreamGirl.html",
      poster: "pics/Films/DreamGirl/2.jpg"
    },
    {
      title: "An Action Hero",
      link: "AnActionHero.html",
      poster: "pics/Films/AnActionHero/2.jpg"
    },
    {
      title: "Badhaai Ho",
      link: "BadhaaiHo.html",
      poster: "pics/Films/BadhaaiHo/2.jpg"
    },
    {
      title: "Bareilly Ki Barfi",
      link: "BareillyKiBarfi.html",
      poster: "pics/Films/BareillyKiBarfi/1.jpg"
    },
    {
      title: "Happy Bhag Jayegi",
      link: "HappyBhagJayegi.html",
      poster: "pics/Films/Happy%20Bhag%20Jayegi/4.jpg"
    },
    {
      title: "Raazi",
      link: "Raazi.html",
      poster: "pics/Films/Raazi/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Udta_Teer",
  imdb: "https://www.imdb.com/title/tt31806773/"
};

// 2. Download Images
const dirs = [
  path.join(rootDir, 'pics', 'Films', 'UdtaTeer'),
  path.join(rootDir, 'pics', 'UdtaTeer'),
  path.join(rootDir, 'dist', 'pics', 'Films', 'UdtaTeer'),
  path.join(rootDir, 'dist', 'pics', 'UdtaTeer')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function main() {
  console.log('Downloading official theatrical poster and banner for Udta Teer...');
  const posterRes = await fetch('https://upload.wikimedia.org/wikipedia/en/c/c8/Udta_Teer_film_poster.jpg', {
    headers: { 'User-Agent': 'OakShowBot/1.0 (contact@oakshow.in)' }
  });
  if (!posterRes.ok) throw new Error(`Poster download failed: ${posterRes.status}`);
  const posterBuf = Buffer.from(await posterRes.arrayBuffer());

  const bannerRes = await fetch('https://img.youtube.com/vi/hN_ZUElLH44/maxresdefault.jpg', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!bannerRes.ok) throw new Error(`Banner download failed: ${bannerRes.status}`);
  const bannerBuf = Buffer.from(await bannerRes.arrayBuffer());

  dirs.forEach(d => {
    fs.writeFileSync(path.join(d, '1.jpg'), posterBuf);
    fs.writeFileSync(path.join(d, '2.jpg'), bannerBuf);
  });
  console.log(`Saved 1.jpg (${posterBuf.length} bytes) and 2.jpg (${bannerBuf.length} bytes).`);

  // 3. Process movies.json
  let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

  // Cross-reference in similar movies
  const relatedIds = ['DreamGirl', 'AnActionHero', 'BadhaaiHo', 'BareillyKiBarfi', 'HappyBhagJayegi', 'Raazi'];
  relatedIds.forEach(relId => {
    const idx = movies.findIndex(m => m.id === relId || m.filename === `${relId}.html`);
    if (idx !== -1) {
      if (Array.isArray(movies[idx].similar) && !movies[idx].similar.some(s => s.link === 'UdtaTeer.html')) {
        movies[idx].similar.unshift({
          title: "Udta Teer",
          link: "UdtaTeer.html",
          poster: "pics/Films/UdtaTeer/1.jpg"
        });
        console.log(`Cross-referenced Udta Teer in ${relId} similar movies.`);
      }
    }
  });

  const existingIdx = movies.findIndex(m => m.id === 'UdtaTeer' || m.filename === 'UdtaTeer.html');
  if (existingIdx !== -1) {
    movies.splice(existingIdx, 1);
  }
  movies.unshift(udtaTeerMovie);
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`Placed Udta Teer at index 0 of movies.json (${movies.length} total entries).`);

  // 4. Process search_index.json
  let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  const searchItem = {
    id: "UdtaTeer",
    slug: "udta-teer",
    title: "Udta Teer (2026 film)",
    type: "movie",
    category: "Bollywood",
    year: "2026",
    genre: "Spy, Comedy, Action, Thriller",
    language: "Hindi",
    poster: "pics/Films/UdtaTeer/1.jpg",
    score: 6.7,
    filename: "UdtaTeer.html",
    fileName: "UdtaTeer.html",
    releaseDate: "October 23, 2026",
    status: "released",
    director: "Aakash Kaushik",
    url: "UdtaTeer.html",
    ratings: udtaTeerMovie.ratings
  };

  const sIdx = searchIndex.findIndex(s => s.id === 'UdtaTeer' || s.url === 'UdtaTeer.html');
  if (sIdx !== -1) {
    searchIndex.splice(sIdx, 1);
  }
  searchIndex.unshift(searchItem);
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
  console.log(`Updated search_index.json with Udta Teer (${searchIndex.length} total entries).`);

  // 5. Process releases.json
  let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
  const releaseHubItem = {
    title: "Udta Teer",
    poster: "pics/Films/UdtaTeer/1.jpg",
    alt: "Udta Teer (2026)",
    language: "Hindi",
    category: "Bollywood",
    releaseDate: "October 23, 2026",
    genre: "Spy, Comedy, Action, Thriller",
    status: "released",
    moreLink: "UdtaTeer.html",
    trailerLink: "https://www.youtube.com/watch?v=hN_ZUElLH44",
    ratings: udtaTeerMovie.ratings.slice(0, 2)
  };

  // Add to Releases2026October
  const allOct = releases.find(r => r.id === 'Releases2026October');
  if (allOct) {
    const exIdx = allOct.items.findIndex(it => it.title === 'Udta Teer' || it.moreLink === 'UdtaTeer.html');
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
    const exIdx = indOct.items.findIndex(it => it.title === 'Udta Teer' || it.moreLink === 'UdtaTeer.html');
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
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "Udta Teer review: This Ayushmann Khurrana spy comedy rarely misses a chance to make you laugh",
      source: "Hindustan Times",
      date: "October 23, 2026",
      url: "https://www.hindustantimes.com/entertainment/bollywood/udta-teer-review-this-ayushmann-khurrana-spy-comedy-rarely-misses-a-chance-to-make-you-laugh-101792732070865.html",
      category: "Critic Reviews"
    },
    {
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "‘Udta Teer’ movie review: Ayushmann Khurrana is on target in this spy misadventure",
      source: "The Hindu",
      date: "October 23, 2026",
      url: "https://www.thehindu.com/entertainment/movies/udta-teer-movie-review-ayushmann-khurrana-is-on-target-in-this-spy-misadventure/article71615236.ece",
      category: "Critic Reviews"
    },
    {
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "Udta Teer Review: Ayushmann Khurrana's spy comedy serves a major laugh riot; late Mukul Dev gets memorable swansong",
      source: "Pinkvilla",
      date: "October 23, 2026",
      url: "https://www.pinkvilla.com/entertainment/reviews/udta-teer-review-ayushmann-khurranas-spy-comedy-serves-a-major-laugh-riot-late-mukul-dev-gets-memorable-swansong-1406059",
      category: "Critic Reviews"
    },
    {
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "Udta Teer review: Dhurandhar meets comedy of errors in Ayushmann's spy caper",
      source: "India Today",
      date: "October 23, 2026",
      url: "https://www.indiatoday.in/movies/reviews/story/udta-teer-review-ayushmann-khurrana-sara-ali-khan-spy-comedy-3023186-2026-10-23",
      category: "Critic Reviews"
    },
    {
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "Udta Teer Review: In The Era Of 'Dhurandhar', This Ayushmann Khurrana Film Aspires To Be 'Austin Powers'",
      source: "NDTV",
      date: "October 23, 2026",
      url: "https://www.ndtv.com/entertainment/udta-teer-review-in-the-era-of-dhurandhar-this-ayushmann-khurrana-film-aspires-to-be-austin-powers-2-5-stars-12224832",
      category: "Critic Reviews"
    },
    {
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "Udta Teer review: Misses the bullseye",
      source: "Rediff",
      date: "October 23, 2026",
      url: "https://www.rediff.com/movies/review/udta-teer-review-misses-the-bullseye/20261023.htm",
      category: "Critic Reviews"
    },
    {
      movieId: "UdtaTeer",
      movieTitle: "Udta Teer",
      title: "Udta Teer movie review: Ayushmann Khurrana film is a tedious mix of spoof and sentiment",
      source: "The Indian Express",
      date: "October 23, 2026",
      url: "https://indianexpress.com/article/entertainment/movie-review/udta-teer-movie-review-ayushmann-khurrana-film-tedious-mix-spoof-and-sentiment-10933188/",
      category: "Critic Reviews"
    }
  ];

  newsToAdd.forEach((n, idx) => {
    const fIdx = news.findIndex(item => item.url === n.url);
    const newsObj = {
      id: `udtateer-news-${idx + 1}`,
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

  // 7. Update Releases2026October.html description if needed
  const relOctHtmlPath = path.join(rootDir, 'Releases2026October.html');
  if (fs.existsSync(relOctHtmlPath)) {
    let relHtml = fs.readFileSync(relOctHtmlPath, 'utf8');
    if (!relHtml.includes('Udta Teer')) {
      relHtml = relHtml.replace('all movies released in October 2026 including ', 'all movies released in October 2026 including Udta Teer, ');
      fs.writeFileSync(relOctHtmlPath, relHtml, 'utf8');
      console.log('Updated Releases2026October.html');
    }
  }

  // 8. Update deploy_to_scalix.ps1 if needed
  const deployScriptPath = path.join(rootDir, 'scripts', 'deploy_to_scalix.ps1');
  if (fs.existsSync(deployScriptPath)) {
    let deployContent = fs.readFileSync(deployScriptPath, 'utf8');
    if (!deployContent.includes('"UdtaTeer.html"')) {
      deployContent = deployContent.replace('"TitansMalayalamMovie.html"', '"TitansMalayalamMovie.html", "UdtaTeer.html"');
      fs.writeFileSync(deployScriptPath, deployContent, 'utf8');
      console.log('Updated deploy_to_scalix.ps1 with UdtaTeer.html');
    }
  }

  console.log('=== All Data Successfully Updated for Udta Teer ===');
}

main().catch(err => {
  console.error('Error adding Udta Teer:', err);
  process.exit(1);
});
