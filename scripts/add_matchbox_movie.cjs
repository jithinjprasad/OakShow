const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

const matchboxMovie = {
  id: "MatchboxTheMovie",
  slug: "matchbox-the-movie",
  type: "movie",
  category: "Hollywood",
  score: 5.5,
  filename: "MatchboxTheMovie.html",
  fileName: "MatchboxTheMovie.html",
  title: "Matchbox: The Movie",
  metaTitle: "Matchbox: The Movie (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Spy and former soldier Sean Walker reunites with his childhood friends only to be drugged and kidnapped by an armed syndicate hunting a stolen nuclear warhead. Framed by the CIA for the theft, the crew must execute high-octane vehicular heists across international borders to recover the weapon and clear their names.",
  plot: "Sean Walker (John Cena), a seasoned operative and former special forces soldier, returns home seeking a semblance of normal life and a nostalgic reunion with his closest childhood companions: high school sweetheart Aimee (Jessica Biel), mechanic prodigy Crosby (Sam Richardson), quick-witted wheelman Ted (Arturo Castro), and logistics specialist Charmaine (Teyonah Parris).\n\nHowever, their long-overdue catch-up turns into an international nightmare when an elite black-market syndicate violently ambushes them, drugging and kidnapping the crew in a bid to locate a missing experimental nuclear warhead. Matters worsen when the CIA, misled by manufactured digital breadcrumbs, pins the disappearance of the weapon of mass destruction entirely on Walker and his unsuspecting friends.\n\nNow hunted across multiple continents by rogue mercenaries led by Falko (Daniel Bernhardt) and under heavy surveillance by hardline CIA officials Mosier (Corey Stoll) and Helen (Danai Gurira), Walker and his crew have only one choice: stage audacious, death-defying vehicular heists using custom Matchbox-engineered rides to re-steal the warhead, expose the real conspirators, and clear their names before global catastrophe strikes.",
  language: "English",
  releaseDate: "October 9, 2026",
  year: "2026",
  status: "released",
  genre: "Action, Comedy, Adventure",
  duration: "2hr 06mins",
  director: "Sam Hargrave",
  writer: "David Coggeshall, Jonathan Tropper",
  basedOn: "Matchbox by Mattel",
  producers: "David Ellison, Dana Goldberg, Don Granger, Robbie Brenner",
  cinematography: "Pedro Luque",
  editing: "Dirk Westervelt",
  musicDirector: "Alex Belcher",
  productionCompanies: "Apple Studios, Skydance Media, Mattel Studios",
  distributor: "Apple TV",
  boxOffice: {
    streamingPerformance: "#1 on Apple TV+ (US) & Top 10 in 23 Countries",
    domesticGross: "Streaming Premiere (Apple TV+)",
    worldwideGross: "Direct-to-Streaming Global Release (Apple TV+)",
    openingWeekend: "#1 Streaming Debut on Apple TV+",
    verdict: "Streaming Success on Apple TV+",
    lastUpdated: "October 2026",
    source: "Apple TV+ / ScreenRant / Deadline"
  },
  awards: [],
  poster: "pics/Films/MatchboxTheMovie/1.jpg",
  banner: "pics/Films/MatchboxTheMovie/2.jpg",
  gallery: [
    {
      src: "pics/Films/MatchboxTheMovie/1.jpg",
      alt: "Matchbox: The Movie Theatrical Poster"
    },
    {
      src: "pics/Films/MatchboxTheMovie/2.jpg",
      alt: "Matchbox: The Movie Key Art"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "5.5/10",
      url: "https://oakshow.in/MatchboxTheMovie.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-this-one-is-above-average.png"
    },
    {
      source: "IMDb",
      score: "5.7/10",
      url: "https://www.imdb.com/title/tt28498219/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "25%",
      url: "https://www.rottentomatoes.com/m/matchbox_the_movie",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "46%",
      url: "https://www.metacritic.com/movie/matchbox-the-movie/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Roger Ebert",
      score: "3/4",
      url: "https://www.rogerebert.com/reviews/matchbox-the-movie-john-cena-apple-tv-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "Common Sense Media",
      score: "3/5",
      url: "https://www.commonsensemedia.org/movie-reviews/matchbox-the-movie",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "IGN",
      score: "4/10",
      url: "https://www.ign.com/articles/matchbox-the-movie-review",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "The Guardian",
      score: "1/5",
      url: "https://www.theguardian.com/film/2026/oct/08/matchbox-movie-review",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    }
  ],
  cast: [
    {
      actor: "John Cena",
      role: "Sean Walker",
      description: "Former soldier and black-ops operative framed for warhead theft"
    },
    {
      actor: "Jessica Biel",
      role: "Aimee",
      description: "Sean's childhood friend and trusted co-pilot"
    },
    {
      actor: "Sam Richardson",
      role: "Crosby",
      description: "Childhood tech and engineering specialist"
    },
    {
      actor: "Arturo Castro",
      role: "Ted",
      description: "High-speed getaway driver and Sean's longtime buddy"
    },
    {
      actor: "Teyonah Parris",
      role: "Charmaine",
      description: "Tactical strategist and core childhood team member"
    },
    {
      actor: "Randeep Hooda",
      role: "Mustafa",
      description: "International ally navigating global underground routes"
    },
    {
      actor: "Danai Gurira",
      role: "Helen",
      description: "Senior intelligence official heading the government manhunt"
    },
    {
      actor: "Corey Stoll",
      role: "Mosier",
      description: "Hardline CIA division director"
    },
    {
      actor: "Bill Camp",
      role: "Smalley",
      description: "Veteran agency handler"
    },
    {
      actor: "Golshifteh Farahani",
      role: "Robbie",
      description: "Shadow operative embedded in the weapons syndicate"
    },
    {
      actor: "Kristofer Hivju",
      role: "Grigor",
      description: "Fierce mercenary commander tracking the missing warhead"
    },
    {
      actor: "Daniel Bernhardt",
      role: "Falko",
      description: "Elite syndicate enforcer and tactical fighter"
    }
  ],
  bookings: [],
  watchOnline: [
    {
      provider: "Apple TV",
      platform: "Apple TV",
      url: "https://tv.apple.com/in/movie/matchbox-the-movie/umc.cmc.31qa8j1tn2cnpyk3fx43w928d",
      icon: "pics/WatchOnline/apple.png",
      lang: "English, Hindi"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/1ZC3TOKUZBuZS4HHw6vhsH",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/ug/album/matchbox-the-movie-soundtrack-from-the-apple-original-film/6819374382",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    }
  ],
  socials: [],
  similar: [
    {
      title: "Extraction",
      link: "Extraction.html",
      poster: "pics/Films/Extraction/1.jpg"
    },
    {
      title: "Fast & Furious: Hobbs & Shaw",
      link: "HobbsandShaw.html",
      poster: "pics/Films/HobbsandShaw/1.jpg"
    },
    {
      title: "Baby Driver",
      link: "BabyDriver.html",
      poster: "pics/Films/BabyDriver/1.jpg"
    },
    {
      title: "The Fate of the Furious",
      link: "Fast8.html",
      poster: "pics/Films/Fast 8/1.jpg"
    }
  ],
  trailers: [
    {
      title: "Matchbox: The Movie | Official Trailer - Apple TV+",
      url: "https://www.youtube.com/watch?v=7xfqITrMDcI",
      embedUrl: "https://www.youtube-nocookie.com/embed/7xfqITrMDcI",
      youtubeId: "7xfqITrMDcI",
      type: "Main Trailer"
    }
  ],
  videos: [
    {
      url: "https://www.youtube.com/watch?v=7xfqITrMDcI",
      youtubeId: "7xfqITrMDcI",
      title: "Matchbox: The Movie | Official Trailer - Apple TV+"
    }
  ],
  articles: [
    {
      headline: "Matchbox The Movie Review: Live-Action Toy Film With John Cena",
      url: "https://www.ign.com/articles/matchbox-the-movie-review",
      author: "IGN",
      date: "October 8, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Full throttle: John Cena and Jessica Biel on Matchbox The Movie, death-defying stunts and the childhood toys that started it all",
      url: "https://www.telegraphindia.com/entertainment/full-throttle-john-cena-and-jessica-biel-on-matchbox-the-movie-death-defying-stunts-and-the-childhood-toys-that-started-it-all-prnt/cid/2183682",
      author: "Telegraph India",
      date: "October 2026",
      section: "Interviews & Features"
    },
    {
      headline: "Matchbox: the Movie review – as pointless as a film based on a toy car could be",
      url: "https://www.theguardian.com/film/2026/oct/08/matchbox-movie-review",
      author: "The Guardian",
      date: "October 8, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Matchbox: The Movie film review & streaming guide",
      url: "https://www.rogerebert.com/reviews/matchbox-the-movie-john-cena-apple-tv-movie-review-2026",
      author: "Roger Ebert",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Matchbox: The Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/matchbox-the-movie",
      author: "Common Sense Media",
      date: "October 2026",
      section: "Critic Reviews"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Matchbox:_The_Movie",
  imdb: "https://www.imdb.com/title/tt28498219/",
  filePath: "E:/OakShow/MatchboxTheMovie.html"
};

// 1. Update movies.json
console.log('Reading and updating movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const idx = movies.findIndex(m => m.id === 'MatchboxTheMovie' || m.filename === 'MatchboxTheMovie.html' || m.fileName === 'MatchboxTheMovie.html');
if (idx !== -1) {
  movies[idx] = matchboxMovie;
  console.log('Updated existing MatchboxTheMovie in movies.json');
} else {
  movies.unshift(matchboxMovie);
  console.log('Inserted new MatchboxTheMovie into movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Update search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "MatchboxTheMovie",
  title: "Matchbox: The Movie",
  type: "movie",
  category: "Hollywood",
  genre: "Action, Comedy, Adventure",
  language: "English",
  year: "2026",
  score: 5.5,
  poster: "pics/Films/MatchboxTheMovie/1.jpg",
  filename: "MatchboxTheMovie.html",
  fileName: "MatchboxTheMovie.html",
  url: "MatchboxTheMovie.html",
  cleanUrl: "/MatchboxTheMovie.html",
  status: "released",
  keywords: "Matchbox The Movie, Matchbox: The Movie, Matchbox, John Cena, Jessica Biel, Sam Richardson, Arturo Castro, Teyonah Parris, Randeep Hooda, Danai Gurira, Corey Stoll, Sam Hargrave, Mattel, Apple TV, Action, Comedy"
};
const sIdx = searchIndex.findIndex(s => s.id === 'MatchboxTheMovie' || s.url === 'MatchboxTheMovie.html' || s.filename === 'MatchboxTheMovie.html');
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

const matchboxReleaseItem = {
  title: "Matchbox: The Movie",
  poster: "pics/Films/MatchboxTheMovie/1.jpg",
  alt: "Matchbox: The Movie Theatrical Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 9, 2026",
  genre: "Action, Comedy, Adventure",
  status: "released",
  moreLink: "MatchboxTheMovie.html",
  trailerLink: "https://www.youtube.com/watch?v=7xfqITrMDcI",
  ratings: matchboxMovie.ratings
};

function upsertReleaseSection(sectionObj, movieItem) {
  let existingSec = releases.find(r => r.id === sectionObj.id);
  if (!existingSec) {
    existingSec = {
      ...sectionObj,
      items: [movieItem],
      totalItems: 1
    };
    releases.unshift(existingSec);
    console.log(`Created new section ${sectionObj.id}`);
  } else {
    const itIdx = existingSec.items.findIndex(it => it.title === movieItem.title || it.moreLink === movieItem.moreLink);
    if (itIdx !== -1) {
      existingSec.items[itIdx] = movieItem;
      console.log(`Updated ${movieItem.title} in existing section ${sectionObj.id}`);
    } else {
      existingSec.items.unshift(movieItem);
      console.log(`Added ${movieItem.title} to existing section ${sectionObj.id}`);
    }
    existingSec.totalItems = existingSec.items.length;
  }
}

upsertReleaseSection({
  id: "HollywoodReleases2026October",
  title: "Hollywood Movies Released On October 2026",
  year: "2026",
  month: "October",
  category: "Hollywood",
  filename: "HollywoodReleases2026October.html"
}, matchboxReleaseItem);

upsertReleaseSection({
  id: "Releases2026October",
  title: "Movies Released On October 2026",
  year: "2026",
  month: "October",
  category: "All",
  filename: "Releases2026October.html"
}, matchboxReleaseItem);

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Successfully updated releases.json!');

console.log('Done inserting Matchbox: The Movie data!');
