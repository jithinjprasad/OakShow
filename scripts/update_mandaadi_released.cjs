const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

console.log('=== Updating Mandaadi as Released Movie in OakShow ===');

// 1. Define Mandaadi Movie Data
const mandaadiMovie = {
  id: "Mandaadi",
  slug: "mandaadi",
  type: "movie",
  category: "Indian",
  score: 7.5,
  filename: "Mandaadi.html",
  fileName: "Mandaadi.html",
  title: "Mandaadi",
  metaTitle: "Mandaadi (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A high-stakes Tamil coastal sports action drama following Muthukaali, a legendary boat racer who returns to train an underdog village crew to conquer treacherous sea regattas and defeat a ruthless rival team.",
  plot: "In the coastal village of Mugavaipattinam in Ramanathapuram, traditional annual sailboat racing during the Mariamman temple festival is an age-old arena of honour, community pride, and heated rivalry. When Maari (Mithun Jai Sankar), the spirited son of Angel Rakkamma (Mahima Nambiar) and Singaram (Ravindra Vijay), forms a fresh crew of underdog fishermen named 'Mugavai Mainthans', they clash violently with the arrogant Kittan and his ruthless father Sattapuli (Suhas), owner of the invincible 'Tsunami Riders'. After a festival brawl leaves Maari marked for death, he flees to Chennai into the protection of Muthukaali 'Kaali' (Soori), an exiled legendary boat racing hero working as a theme-park lifeguard. Driven by duty and old loyalties, Kaali returns to Mugavaipattinam with Maari, boldly declaring in front of the village council that he will train the underdog Mugavai Mainthans. Facing deadly sea sabotage, deep-seated family grievances, a devastating whirlpool vortex, and the lethal machinations of Sattapuli, Kaali must harness the raw spirit of the sea to reclaim dignity, brotherhood, and triumph on the high waters.",
  language: "Tamil",
  releaseDate: "September 10, 2026",
  year: "2026",
  status: "released",
  genre: "Action, Drama, Sport",
  duration: "2hr 34min",
  certificate: "UA",
  director: "Mathimaran Pugazhendhi",
  writer: "Mathimaran Pugazhendhi",
  screenplay: "Mathimaran Pugazhendhi, Elred Kumar, R. Mohanavasanthan, Thiral Sankar",
  basedOn: "",
  producers: "Elred Kumar",
  productionCompanies: "RS Infotainment",
  musicDirector: "G. V. Prakash Kumar",
  cinematography: "S. R. Kathir",
  editing: "Pradeep E. Ragav",
  narrator: "Vetrimaaran",
  distributors: "Red Giant Movies, Mythri Movie Distributors",
  boxOffice: {
    budget: "₹75 crore",
    worldwideGross: "₹150 crore",
    indiaGross: "₹110+ crore (₹100 crore in Tamil Nadu alone)",
    overseasGross: "₹50 crore ($6.0M)",
    openingDay: "₹6.55 crore worldwide (₹5.55 crore India)",
    openingWeekend: "₹43.80 crore",
    verdict: "Super Hit / Blockbuster (4th Highest-Grossing Tamil Film of 2026)",
    source: "Dina Thanthi, Times of India, Sacnilk & Trade Reports",
    lastUpdated: "October 2026"
  },
  budget: "₹75 crore",
  awards: [],
  poster: "pics/Films/Mandaadi/1.jpeg",
  banner: "pics/Films/Mandaadi/2.jpeg",
  gallery: [
    {
      src: "pics/Films/Mandaadi/1.jpeg",
      alt: "Mandaadi Official Poster"
    },
    {
      src: "pics/Films/Mandaadi/2.jpeg",
      alt: "Mandaadi Official Banner"
    },
    {
      src: "pics/Films/Mandaadi/3.jpeg",
      alt: "Mandaadi High-Seas Boat Racing Still"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "7.5/10",
      url: "https://oakshow.in/Mandaadi.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "8.2/10",
      url: "https://www.imdb.com/title/tt36596965/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "NDTV",
      score: "3.5/5",
      url: "https://www.ndtv.com/entertainment/mandaadi-review-soori-shines-in-mathimaran-pugazhendhis-engaging-coastal-sports-drama-3-5-stars-12028873",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "Rediff",
      score: "3.5/5",
      url: "https://www.rediff.com/movies/review/mandaadi-movie-review-soori-delivers-strong-performance-in-engaging-sports-drama/20260913.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "Times of India",
      score: "3/5",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/mandaadi/movie-review/134001460.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "Times Now",
      score: "3/5",
      url: "https://www.timesnownews.com/entertainment-news/reviews/mandaadi-movie-review-and-rating-soori-suhas-boat-racing-drama-makes-visual-splash-but-writing-holds-back-its-peak-review-156133146",
      icon: "pics/RatingSiteLogos/times-now.ico"
    },
    {
      source: "The Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/mandaadi-movie-review-soori-suhas-are-extraordinary-on-water-the-film-is-not-on-land-10871944/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    }
  ],
  cast: [
    {
      actor: "Soori",
      role: "Muthukaali 'Kaali' / Mandaadi",
      description: "A legendary boat racing champion fighting for his community's dignity and redemption"
    },
    {
      actor: "Suhas",
      role: "Sattapuli",
      description: "Ruthless leader of the rival Tsunami Riders racing team (Voice dubbed by Mathimaran Pugazhendhi)"
    },
    {
      actor: "Mahima Nambiar",
      role: "Angel Rakkamma",
      description: "Kaali's former love, daughter of mentor Machamuni, and mother of Maari"
    },
    {
      actor: "Sathyaraj",
      role: "Machamuni",
      description: "Veteran boat racing mentor to Kaali and Sattapuli"
    },
    {
      actor: "Ravindra Vijay",
      role: "Singaram",
      description: "Angel's husband and trusted friend who brings Kaali back to save his son"
    },
    {
      actor: "Krish Hassan",
      role: "Kittaan",
      description: "Sattapuli's hot-headed son"
    },
    {
      actor: "Mithun Jai Sankar",
      role: "Maari",
      description: "Angel and Singaram's passionate boat racer son, grandson of Machamuni"
    },
    {
      actor: "Bala Saravanan",
      role: "Qatar Ravi",
      description: "Loyal friend and confidant of Muthukaali"
    },
    {
      actor: "Stun Siva",
      role: "Sattapuli's father",
      description: "Veteran family patriarch of Sattapuli"
    },
    {
      actor: "Ramachandran Durairaj",
      role: "Theekoluthi",
      description: "Member of the coastal boat racing community"
    },
    {
      actor: "Aadukalam Murugadoss",
      role: "Kathir",
      description: "Allied local villager"
    },
    {
      actor: "B. Krithika Balasubramaniam",
      role: "Baagam Priyazh",
      description: "Muthukaali's niece and Maari's lover"
    }
  ],
  trailers: [
    {
      title: "Mandaadi Official Trailer",
      url: "https://www.youtube.com/watch?v=VOHaf-0DV-U",
      embedUrl: "https://www.youtube-nocookie.com/embed/VOHaf-0DV-U",
      youtubeId: "VOHaf-0DV-U",
      type: "Main Trailer"
    },
    {
      title: "Usure Needhan Pulla - Song Video",
      url: "https://www.youtube.com/watch?v=Q2qaFiD4XNM",
      embedUrl: "https://www.youtube-nocookie.com/embed/Q2qaFiD4XNM",
      youtubeId: "Q2qaFiD4XNM",
      type: "Song"
    },
    {
      title: "Mandaadi Mandaadi - Song Video",
      url: "https://www.youtube.com/watch?v=gDGQoSxWeEI",
      embedUrl: "https://www.youtube-nocookie.com/embed/gDGQoSxWeEI",
      youtubeId: "gDGQoSxWeEI",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Mandaadi Official Trailer",
      url: "https://www.youtube.com/watch?v=VOHaf-0DV-U",
      youtubeId: "VOHaf-0DV-U"
    },
    {
      title: "Song: Usure Needhan Pulla",
      url: "https://www.youtube.com/watch?v=Q2qaFiD4XNM",
      youtubeId: "Q2qaFiD4XNM"
    },
    {
      title: "Song: Mandaadi Mandaadi",
      url: "https://www.youtube.com/watch?v=gDGQoSxWeEI",
      youtubeId: "gDGQoSxWeEI"
    }
  ],
  watchOnline: [
    {
      provider: "Netflix",
      platform: "Netflix",
      url: "https://www.netflix.com/in/title/82787383?source=35&fromWatch=true",
      icon: "pics/WatchOnline/netflix.png",
      lang: "Tamil, Telugu, Hindi, Malayalam, Kannada",
      label: "Watch Mandaadi on Netflix"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/13VCDOxNdiF8Ouw82WtHS0",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Mandaadi Soundtrack on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/mandaadi-original-motion-picture-soundtrack/6806199838",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/mandaadi/yI1DJ7XnZn8_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kozhikode/mandaadi/ET00442702",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/mandaadi-movie-tickets-MV196092?srsltid=AfmBOoozB9eGDWlHe3wYiHHYlvrCiT7RjEDcYlfR5thJXq8mqJ-Lf_CY",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/mandaadi-movie-detail-196092",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 3
    },
    {
      provider: "PVR",
      url: "https://www.pvrcinemas.com/m.movie-details/37733/ns",
      icon: "pics/BookngWebSiteLogos/pvr.png",
      label: "Book on PVR Cinemas",
      rank: 4
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/mandaadi-2026-247228/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 5
    }
  ],
  articles: [
    {
      headline: "Mandaadi Movie Review: Scintillating sail despite some turbulence",
      url: "https://www.newindianexpress.com/entertainment/review/2026/Sep/12/tamilreview2026sep10mandaadi-movie-review-scintillating-sail-despite-some-turbulence",
      author: "The New Indian Express",
      date: "September 12, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Mandaadi Review: Soori Shines In Mathimaran Pugazhendhi's Engaging Coastal Sports Drama",
      url: "https://www.ndtv.com/entertainment/mandaadi-review-soori-shines-in-mathimaran-pugazhendhis-engaging-coastal-sports-drama-3-5-stars-12028873",
      author: "NDTV",
      date: "September 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Mandaadi Review: Soori steals the show in Mathimaran Pugazhendhi's gripping coastal sports drama",
      url: "https://www.cnbctv18.com/entertainment/mandaadi-review-soori-steals-the-show-in-mathimaran-pugazhendhis-gripping-coastal-sports-drama-19989061.htm",
      author: "CNBC-TV18",
      date: "September 11, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Mandaadi movie review: Soori, Suhas are extraordinary on water, the film drifts when on land",
      url: "https://indianexpress.com/article/entertainment/movie-review/mandaadi-movie-review-soori-suhas-are-extraordinary-on-water-the-film-is-not-on-land-10871944/",
      author: "The Indian Express",
      date: "September 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Mandaadi Movie Review and Rating: Soori, Suhas boat-racing drama makes visual splash but writing holds back its peak",
      url: "https://www.timesnownews.com/entertainment-news/reviews/mandaadi-movie-review-and-rating-soori-suhas-boat-racing-drama-makes-visual-splash-but-writing-holds-back-its-peak-review-156133146",
      author: "Times Now",
      date: "September 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Mandaadi Review: Mandaadi charts an uneven course to a strong finish",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/mandaadi/movie-review/134001460.cms",
      author: "Times of India",
      date: "September 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Mandaadi Movie Review: Soori delivers strong performance in engaging sports drama",
      url: "https://www.rediff.com/movies/review/mandaadi-movie-review-soori-delivers-strong-performance-in-engaging-sports-drama/20260913.htm",
      author: "Rediff",
      date: "September 13, 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "Irudhi Suttru",
      link: "IrudhiSuttru.html",
      poster: "pics/Films/IrudhiSuttru/2.jpg"
    },
    {
      title: "Dangal",
      link: "Dangal.html",
      poster: "pics/Films/Dangal/1.jpg"
    },
    {
      title: "M.S. Dhoni: The Untold Story",
      link: "MSDhoniTheUntoldStory.html",
      poster: "pics/Films/M.S. Dhoni The Untold Story/4.jpg"
    },
    {
      title: "Bigil",
      link: "Bigil.html",
      poster: "pics/Films/Bigil/2.jpg"
    },
    {
      title: "Creed II",
      link: "CreedII.html",
      poster: "pics/Films/CreedII/2.jpg"
    },
    {
      title: "Godha",
      link: "Godha.html",
      poster: "pics/Films/Godha/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Mandaadi",
  imdb: "https://www.imdb.com/title/tt36596965/"
};

// 2. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

// Cross-reference Mandaadi in similar movies of IrudhiSuttru & Bigil
const isIdx = movies.findIndex(m => m.id === 'IrudhiSuttru' || m.filename === 'IrudhiSuttru.html');
if (isIdx !== -1) {
  if (Array.isArray(movies[isIdx].similar) && !movies[isIdx].similar.some(s => s.link === 'Mandaadi.html')) {
    movies[isIdx].similar.unshift({
      title: "Mandaadi",
      link: "Mandaadi.html",
      poster: "pics/Films/Mandaadi/1.jpeg"
    });
    console.log('Cross-referenced Mandaadi in Irudhi Suttru similar movies.');
  }
}

const bigilIdx = movies.findIndex(m => m.id === 'Bigil' || m.filename === 'Bigil.html');
if (bigilIdx !== -1) {
  if (Array.isArray(movies[bigilIdx].similar) && !movies[bigilIdx].similar.some(s => s.link === 'Mandaadi.html')) {
    movies[bigilIdx].similar.unshift({
      title: "Mandaadi",
      link: "Mandaadi.html",
      poster: "pics/Films/Mandaadi/1.jpeg"
    });
    console.log('Cross-referenced Mandaadi in Bigil similar movies.');
  }
}

// Replace or unshift Mandaadi in movies.json
const mIdx = movies.findIndex(m => m.id === 'Mandaadi' || m.filename === 'Mandaadi.html');
if (mIdx !== -1) {
  movies[mIdx] = mandaadiMovie;
} else {
  movies.unshift(mandaadiMovie);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Updated Mandaadi in movies.json (${movies.length} total entries).`);

// 3. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "Mandaadi",
  slug: "mandaadi",
  title: "Mandaadi",
  type: "movie",
  category: "Indian",
  year: "2026",
  genre: "Action, Drama, Sport",
  language: "Tamil",
  poster: "pics/Films/Mandaadi/1.jpeg",
  score: 7.5,
  filename: "Mandaadi.html",
  fileName: "Mandaadi.html",
  releaseDate: "September 10, 2026",
  status: "released",
  director: "Mathimaran Pugazhendhi",
  url: "Mandaadi.html",
  ratings: mandaadiMovie.ratings
};

const sIdx = searchIndex.findIndex(s => s.id === 'Mandaadi' || s.url === 'Mandaadi.html');
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
} else {
  searchIndex.unshift(searchItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json with released Mandaadi (${searchIndex.length} total entries).`);

// 4. Process news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsToAdd = [
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi Movie Review: Scintillating sail despite some turbulence",
    source: "The New Indian Express",
    date: "September 12, 2026",
    url: "https://www.newindianexpress.com/entertainment/review/2026/Sep/12/tamilreview2026sep10mandaadi-movie-review-scintillating-sail-despite-some-turbulence",
    category: "Kollywood"
  },
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi Review: Soori Shines In Mathimaran Pugazhendhi's Engaging Coastal Sports Drama",
    source: "NDTV",
    date: "September 10, 2026",
    url: "https://www.ndtv.com/entertainment/mandaadi-review-soori-shines-in-mathimaran-pugazhendhis-engaging-coastal-sports-drama-3-5-stars-12028873",
    category: "Kollywood"
  },
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi Review: Soori steals the show in Mathimaran Pugazhendhi's gripping coastal sports drama",
    source: "CNBC-TV18",
    date: "September 11, 2026",
    url: "https://www.cnbctv18.com/entertainment/mandaadi-review-soori-steals-the-show-in-mathimaran-pugazhendhis-gripping-coastal-sports-drama-19989061.htm",
    category: "Kollywood"
  },
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi movie review: Soori, Suhas are extraordinary on water, the film drifts when on land",
    source: "The Indian Express",
    date: "September 10, 2026",
    url: "https://indianexpress.com/article/entertainment/movie-review/mandaadi-movie-review-soori-suhas-are-extraordinary-on-water-the-film-is-not-on-land-10871944/",
    category: "Kollywood"
  },
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi Movie Review and Rating: Soori, Suhas boat-racing drama makes visual splash but writing holds back its peak",
    source: "Times Now",
    date: "September 10, 2026",
    url: "https://www.timesnownews.com/entertainment-news/reviews/mandaadi-movie-review-and-rating-soori-suhas-boat-racing-drama-makes-visual-splash-but-writing-holds-back-its-peak-review-156133146",
    category: "Kollywood"
  },
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi Review: Mandaadi charts an uneven course to a strong finish",
    source: "Times of India",
    date: "September 10, 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/mandaadi/movie-review/134001460.cms",
    category: "Kollywood"
  },
  {
    movieId: "Mandaadi",
    movieTitle: "Mandaadi",
    title: "Mandaadi Movie Review: Soori delivers strong performance in engaging sports drama",
    source: "Rediff",
    date: "September 13, 2026",
    url: "https://www.rediff.com/movies/review/mandaadi-movie-review-soori-delivers-strong-performance-in-engaging-sports-drama/20260913.htm",
    category: "Kollywood"
  }
];

newsToAdd.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `mandaadi-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`Updated news.json with Mandaadi articles (${news.length} total entries).`);

// 5. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const releaseHubItem = {
  title: "Mandaadi",
  poster: "pics/Films/Mandaadi/1.jpeg",
  alt: "Mandaadi",
  language: "Tamil",
  category: "Indian",
  releaseDate: "September 10, 2026",
  genre: "Action, Drama, Sport",
  status: "released",
  moreLink: "Mandaadi.html",
  trailerLink: "https://www.youtube.com/watch?v=VOHaf-0DV-U",
  ratings: mandaadiMovie.ratings.slice(0, 3)
};

// Add to IndianReleases2026September
const sepInd = releases.find(r => r.id === 'IndianReleases2026September');
if (sepInd) {
  const exIdx = sepInd.items.findIndex(it => it.title === 'Mandaadi' || it.moreLink === 'Mandaadi.html');
  if (exIdx !== -1) {
    sepInd.items[exIdx] = releaseHubItem;
  } else {
    sepInd.items.unshift(releaseHubItem);
  }
  sepInd.totalItems = sepInd.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (IndianReleases2026September).');

// 6. Ensure image directories exist in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'Mandaadi');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'Mandaadi');

if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/Mandaadi`);
}

console.log('=== All Data Successfully Updated ===');
