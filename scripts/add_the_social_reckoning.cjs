const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

console.log('=== Adding The Social Reckoning (2026) to OakShow ===');

const socialReckoningMovie = {
  id: "TheSocialReckoning",
  slug: "the-social-reckoning",
  type: "movie",
  category: "Hollywood",
  score: 7.5,
  filename: "TheSocialReckoning.html",
  fileName: "TheSocialReckoning.html",
  title: "The Social Reckoning",
  metaTitle: "The Social Reckoning (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A data engineer uncovers damning internal evidence of algorithmic harm inside Facebook and risks everything alongside an investigative reporter to publish The Facebook Files.",
  plot: "Set between 2019 and 2021, The Social Reckoning tracks Frances Haugen (Mikey Madison), a conscientious data engineer and product manager recruited to Facebook with the belief of making human connection safer and more transparent. As she embeds into the company's integrity and civic moderation teams, Haugen discovers that executive leadership—guided by a calculating Mark Zuckerberg (Jeremy Strong)—repeatedly dismantled safeguards, prioritized engagement algorithms that amplify rage and divisiveness for ad revenue, concealed internal research regarding Instagram's toxic psychological toll on teenagers, and neglected human-trafficking networks across vulnerable global regions.\n\nDisillusioned and fearing irreparable societal erosion, Haugen begins methodically downloading tens of thousands of confidential internal presentations and research memoranda. She covertly contacts Jeff Horwitz (Jeremy Allen White), an intrepid Wall Street Journal investigative reporter. Over frantic months of coded communications and clandestine hotel debriefings, Horwitz unravels the engineering jargon while Haugen risks prison under the Espionage Act. Their explosive collaboration culminates in 'The Facebook Files' series and Haugen unmasking herself before a global Senate judiciary hearing, igniting a historic confrontation between Silicon Valley's titan and the public interest.",
  language: "English",
  releaseDate: "October 9, 2026",
  year: "2026",
  status: "released",
  genre: "Drama, Thriller, Biography, History",
  duration: "1hr 52min",
  certificate: "R",
  director: "Aaron Sorkin",
  writer: "Aaron Sorkin",
  basedOn: "The Facebook Files reporting by Jeff Horwitz and The Wall Street Journal, and disclosures by Frances Haugen",
  producers: "Todd Black, Peter Rice, Aaron Sorkin, Tony A. Grier, Stuart M. Besser",
  productionCompanies: "Columbia Pictures, Alcon Entertainment, Escape Artists",
  distributor: "Sony Pictures Releasing",
  musicDirector: "Alexandre Desplat",
  cinematography: "Jeff Cronenweth",
  editing: "Alan Baumgarten",
  boxOffice: {
    budget: "$35 million",
    worldwideGross: "$14.3 million",
    domesticGross: "$8.5 million",
    openingWeekend: "$5.2 million (Domestic)",
    internationalGross: "$5.8 million",
    verdict: "In Theatres / Global Theatrical Debut",
    source: "Box Office Mojo / The Numbers / Deadline",
    lastUpdated: "October 19, 2026"
  },
  budget: "$35 million",
  awards: [],
  poster: "pics/Films/TheSocialReckoning/1.jpg",
  banner: "pics/Films/TheSocialReckoning/2.jpg",
  gallery: [
    {
      src: "pics/Films/TheSocialReckoning/1.jpg",
      alt: "The Social Reckoning Theatrical Poster"
    },
    {
      src: "pics/Films/TheSocialReckoning/2.jpg",
      alt: "The Social Reckoning Key Art Banner"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "7.5/10",
      url: "https://oakshow.in/TheSocialReckoning.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "6.7/10",
      url: "https://www.imdb.com/title/tt37510326/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "54%",
      url: "https://www.rottentomatoes.com/m/the_social_reckoning",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "51%",
      url: "https://www.metacritic.com/movie/the-social-reckoning/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "IGN",
      score: "7/10",
      url: "https://www.ign.com/articles/the-social-reckoning-review",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Times of India",
      score: "4/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/the-social-reckoning/movie-review/134779142.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "Indian Express",
      score: "3.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/the-social-reckoning-movie-review-aaron-sorkin-film-looks-beyond-zuckerberg-to-the-leak-that-shook-meta-10914028/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "India Today",
      score: "3/5",
      url: "https://www.indiatoday.in/movies/reviews/story/the-social-reckoning-review-a-sharp-and-occasionally-stirring-journalism-thriller-3013204-2026-10-09",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Roger Ebert",
      score: "3/4",
      url: "https://www.rogerebert.com/reviews/the-social-reckoning-film-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "Den of Geek",
      score: "3/5",
      url: "https://www.denofgeek.com/movies/the-social-reckoning-review-aaron-sorkin-mark-zuckerberg/",
      icon: "pics/RatingSiteLogos/denofgeek.ico"
    },
    {
      source: "The Guardian",
      score: "3/5",
      url: "https://www.theguardian.com/film/2026/oct/13/the-social-reckoning-aaron-sorkin",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Common Sense Media",
      score: "3/5",
      url: "https://www.commonsensemedia.org/movie-reviews/the-social-reckoning",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "NDTV",
      score: "2.5/5",
      url: "https://www.ndtv.com/entertainment/the-social-reckoning-review-aaron-sorkins-sequel-falls-short-of-the-social-network-12161253",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    }
  ],
  cast: [
    {
      actor: "Mikey Madison",
      role: "Frances Haugen",
      description: "Former Facebook product manager who made the momentous decision to blow the whistle on the company's internal research"
    },
    {
      actor: "Jeremy Allen White",
      role: "Jeff Horwitz",
      description: "Wall Street Journal tech reporter who broke 'The Facebook Files' series based on leaked documents"
    },
    {
      actor: "Jeremy Strong",
      role: "Mark Zuckerberg",
      description: "Facebook CEO and co-founder grappling with scrutiny and defending his platform's corporate imperatives"
    },
    {
      actor: "Wunmi Mosaku",
      role: "Raya",
      description: "Haugen's trusted confidante and fellow civic integrity advocate"
    },
    {
      actor: "Betty Gilpin",
      role: "Christina",
      description: "Corporate communications director navigating the media fallout"
    },
    {
      actor: "Billy Magnussen",
      role: "Teddy",
      description: "A senior product executive prioritizing engagement metrics"
    },
    {
      actor: "Bill Burr",
      role: "Charlie",
      description: "An outspoken veteran engineer critical of executive priorities"
    }
  ],
  trailers: [
    {
      title: "The Social Reckoning Official Main Trailer",
      url: "https://www.youtube.com/watch?v=MfHEZw7Xw_c",
      embedUrl: "https://www.youtube-nocookie.com/embed/MfHEZw7Xw_c",
      youtubeId: "MfHEZw7Xw_c",
      type: "Main Trailer"
    },
    {
      title: "The Social Reckoning Official Teaser Trailer",
      url: "https://www.youtube.com/watch?v=gM4LkaXwGuY",
      embedUrl: "https://www.youtube-nocookie.com/embed/gM4LkaXwGuY",
      youtubeId: "gM4LkaXwGuY",
      type: "Teaser Trailer"
    }
  ],
  videos: [
    {
      title: "The Social Reckoning Official Main Trailer",
      url: "https://www.youtube.com/watch?v=MfHEZw7Xw_c",
      youtubeId: "MfHEZw7Xw_c"
    },
    {
      title: "The Social Reckoning Official Teaser Trailer",
      url: "https://www.youtube.com/watch?v=gM4LkaXwGuY",
      youtubeId: "gM4LkaXwGuY"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/episode/3GHkKusCckc3eonncQMQsk",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/the-social-reckoning-original-motion-picture-soundtrack/6816234712",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/mumbai/the-social-reckoning/ET00506449",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/the-social-reckoning-movie-tickets-MV207694?srsltid=AU7gw4UEA5_-lCy1tuZDJk0LbS-G6_qJ5TPMEgpERs50sdKTn8yCOo1U",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/the-social-reckoning-2026-246392/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/1000026649-the-social-reckoning/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 4
    }
  ],
  watchOnline: [],
  articles: [
    {
      headline: "The Social Reckoning Review: Aaron Sorkin Explores the Cost of Facebook's Unchecked Influence",
      url: "https://www.denofgeek.com/movies/the-social-reckoning-review-aaron-sorkin-mark-zuckerberg/",
      author: "Den of Geek",
      date: "October 8, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Social Reckoning Review — Aaron Sorkin Returns to the Facebook Saga",
      url: "https://www.ign.com/articles/the-social-reckoning-review",
      author: "IGN",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Social Reckoning Review: Jeremy Strong's Perma-Clenched Tech Titan Watches Aghast as Facebook Tears Society Apart",
      url: "https://www.independent.ie/entertainment/movies/movie-reviews/the-social-reckoning-jeremy-strongs-perma-clenched-villain-watches-aghast-as-facebook-tears-his-country-apart/a/162638115.html",
      author: "Independent.ie",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Social Reckoning Review: Aaron Sorkin Film Looks Beyond Zuckerberg to the Leak That Shook Meta",
      url: "https://indianexpress.com/article/entertainment/movie-review/the-social-reckoning-movie-review-aaron-sorkin-film-looks-beyond-zuckerberg-to-the-leak-that-shook-meta-10914028/",
      author: "The Indian Express",
      date: "October 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Social Reckoning Review: A Sharp and Occasionally Stirring Journalism Thriller",
      url: "https://www.indiatoday.in/movies/reviews/story/the-social-reckoning-review-a-sharp-and-occasionally-stirring-journalism-thriller-3013204-2026-10-09",
      author: "India Today",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Social Reckoning Movie Review: Aaron Sorkin Tackles Silicon Valley Whistleblower Drama",
      url: "https://www.rogerebert.com/reviews/the-social-reckoning-film-review-2026",
      author: "RogerEbert.com",
      date: "October 8, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "The Social Reckoning Review: Aaron Sorkin's Fast-Talking Tech Exposé",
      url: "https://www.theguardian.com/film/2026/oct/13/the-social-reckoning-aaron-sorkin",
      author: "The Guardian",
      date: "October 13, 2026",
      section: "Critic Reviews"
    }
  ],
  similarMovies: [
    {
      id: "SheSaid",
      title: "She Said (film)",
      filename: "SheSaid.html",
      score: 7.3,
      poster: "pics/Films/SheSaid/1.jpg"
    },
    {
      id: "Mank",
      title: "Mank (film)",
      filename: "Mank.html",
      score: 7.2,
      poster: "pics/Films/Mank/1.jpg"
    },
    {
      id: "BillionaireBoysClub",
      title: "Billionaire Boys Club (2018 film)",
      filename: "BillionaireBoysClub.html",
      score: 5.6,
      poster: "pics/Films/BillionaireBoysClub/1.jpg"
    },
    {
      id: "ViceroysHouse",
      title: "Viceroy's House (film)",
      filename: "ViceroysHouse.html",
      score: 6.7,
      poster: "pics/Films/ViceroysHouse/1.jpg"
    },
    {
      id: "PiecesofaWoman",
      title: "Pieces of a Woman",
      filename: "PiecesofaWoman.html",
      score: 7.0,
      poster: "pics/Films/PiecesofaWoman/1.jpg"
    },
    {
      id: "NewsoftheWorld",
      title: "News of the World",
      filename: "NewsoftheWorld.html",
      score: 6.8,
      poster: "pics/Films/NewsoftheWorld/1.jpg"
    },
    {
      id: "TheRunner",
      title: "The Runner",
      filename: "TheRunner.html",
      score: 6.5,
      poster: "pics/Films/TheRunner/1.jpg"
    },
    {
      id: "TopGunMaverick",
      title: "Top Gun: Maverick",
      filename: "TopGunMaverick.html",
      score: 8.3,
      poster: "pics/Films/TopGunMaverick/1.jpg"
    },
    {
      id: "Tenet",
      title: "TENET (film)",
      filename: "Tenet.html",
      score: 7.4,
      poster: "pics/Films/Tenet/1.jpg"
    }
  ]
};

// 1. Insert into movies.json at index 0 (or replace if exists)
const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const existingIndex = movies.findIndex(m => m.id === 'TheSocialReckoning' || (m.filename && m.filename === 'TheSocialReckoning.html'));
if (existingIndex !== -1) {
  movies[existingIndex] = socialReckoningMovie;
  console.log(`Replaced existing The Social Reckoning at index ${existingIndex} in movies.json`);
} else {
  movies.unshift(socialReckoningMovie);
  console.log(`Placed The Social Reckoning at index 0 in movies.json (${movies.length} total entries).`);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Insert into search_index.json
const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchEntry = {
  id: "TheSocialReckoning",
  slug: "the-social-reckoning",
  title: "The Social Reckoning",
  type: "movie",
  category: "Hollywood",
  year: "2026",
  genre: "Drama, Thriller, Biography, History",
  language: "English",
  poster: "pics/Films/TheSocialReckoning/1.jpg",
  score: 7.5,
  filename: "TheSocialReckoning.html",
  fileName: "TheSocialReckoning.html",
  releaseDate: "October 9, 2026",
  status: "released",
  director: "Aaron Sorkin",
  ratings: [
    {
      source: "OakShow",
      score: "7.5/10",
      url: "https://oakshow.in/TheSocialReckoning.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "6.7/10",
      url: "https://www.imdb.com/title/tt37510326/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "54%",
      url: "https://www.rottentomatoes.com/m/the_social_reckoning",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "51%",
      url: "https://www.metacritic.com/movie/the-social-reckoning/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    }
  ]
};

const searchExistingIdx = searchIndex.findIndex(s => s.id === 'TheSocialReckoning');
if (searchExistingIdx !== -1) {
  searchIndex[searchExistingIdx] = searchEntry;
} else {
  searchIndex.unshift(searchEntry);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json (${searchIndex.length} total entries).`);

// 3. Update releases.json
const releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));

const releaseHubItem = {
  title: "The Social Reckoning",
  poster: "pics/Films/TheSocialReckoning/1.jpg",
  alt: "The Social Reckoning (2026) Theatrical Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 9, 2026",
  genre: "Drama, Thriller, Biography, History",
  status: "released",
  moreLink: "TheSocialReckoning.html",
  trailerLink: "https://www.youtube.com/watch?v=MfHEZw7Xw_c",
  ratings: [
    {
      source: "OakShow",
      score: "7.5/10",
      url: "https://oakshow.in/TheSocialReckoning.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "6.7/10",
      url: "https://www.imdb.com/title/tt37510326/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "54%",
      url: "https://www.rottentomatoes.com/m/the_social_reckoning",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "51%",
      url: "https://www.metacritic.com/movie/the-social-reckoning/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    }
  ]
};

// Add to HollywoodReleases2026October
const hOct = releases.find(r => r.id === 'HollywoodReleases2026October');
if (hOct) {
  const exIdx = hOct.items.findIndex(it => it.title === 'The Social Reckoning' || it.moreLink === 'TheSocialReckoning.html');
  if (exIdx !== -1) {
    hOct.items[exIdx] = releaseHubItem;
  } else {
    hOct.items.unshift(releaseHubItem);
  }
  hOct.totalItems = hOct.items.length;
}

// Add to Releases2026October
const allOct = releases.find(r => r.id === 'Releases2026October');
if (allOct) {
  const exIdx = allOct.items.findIndex(it => it.title === 'The Social Reckoning' || it.moreLink === 'TheSocialReckoning.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    allOct.items.unshift(releaseHubItem);
  }
  allOct.totalItems = allOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (HollywoodReleases2026October & Releases2026October).');

// 4. Ensure image directory exists in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'TheSocialReckoning');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'TheSocialReckoning');

if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/TheSocialReckoning`);
}

console.log('=== The Social Reckoning (2026) Data Preparation Complete ===');
