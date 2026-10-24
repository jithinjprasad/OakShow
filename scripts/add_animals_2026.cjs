const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

console.log('=== Adding Animals (2026) to OakShow ===');

// 1. Movie Object
const animalsMovie = {
  id: "Animals2026",
  slug: "animals-2026",
  type: "movie",
  category: "Hollywood",
  score: 5,
  filename: "Animals2026.html",
  fileName: "Animals2026.html",
  title: "Animals",
  metaTitle: "Animals (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A wealthy Los Angeles mayoral candidate and his estranged wife must navigate a dark web of secrets, political corruption, and ruthless operators when their son is supposedly kidnapped for a $7 million ransom in Ben Affleck's high-stakes crime thriller.",
  plot: "In the heated final weeks of the Los Angeles mayoral race, independent candidate Mark Kimball (Ben Affleck) finds his campaign teetering on the edge of defeat. At the urging of his ambitious campaign manager Sam Allison (Steven Yeun), Mark secretly pours his family's entire life savings into an aggressive eleventh-hour voter outreach campaign, betting everything on reclaiming the money after securing city hall. Meanwhile, his strained marriage to Abigail (Kerry Washington) has reached a breaking point as she conducts a clandestine affair with campaign advisor Ron Sperling (Ray Fisher) and plans to file for divorce.\n\nOn Halloween night, chaos strikes when Denny Kimball and Hector—the son of their housekeeper Cecilia (Adriana Paz) and her boyfriend Ramon (Luis Gerardo Méndez)—go trick-or-treating in identical costumes. An anonymous extortionist demands a non-negotiable $7 million cash ransom by midnight under threat of the child's life. Desperate and broke, Mark and Sam retain Dayle Burton (Gillian Anderson), an ice-cold private security fixer specializing in hostage retrieval. When Denny unexpectedly turns up safe at home, the horrifying reality dawns: the kidnappers abducted Hector by mistake, yet still demand the full ransom from Mark.\n\nAs the deadline ticks down, Mark enters a tense confrontation with the kidnappers in Elysian Valley while Dayle deploys lethal measures. The ensuing gunfire leaves the kidnappers and Dayle dead. In a cynical moral compromise, Mark and Ramon conceal the truth and orchestrate a heroic media narrative: Mark is hailed nationwide as the savior who rescued his housekeeper's boy, skyrocketing his popularity to secure the mayor's office, while Ramon and Cecilia leave for Mexico with the ransom money as secret millionaires.",
  language: "English",
  releaseDate: "October 9, 2026",
  year: "2026",
  status: "released",
  genre: "Crime, Thriller, Mystery, Drama",
  duration: "1hr 48min",
  certificate: "15+ / R",
  director: "Ben Affleck",
  writer: "Connor O. McIntyre, Billy Ray, Ben Affleck",
  basedOn: "",
  producers: "Matt Damon, Ben Affleck, Brad Weston, Dani Bernfeld, Collin Creighton",
  productionCompanies: "Artists Equity, Makeready, Fifth Season",
  distributor: "Netflix",
  musicDirector: "Harry Gregson-Williams",
  cinematography: "Robert Elswit",
  editing: "William Goldenberg, Christopher Rouse",
  boxOffice: {
    budget: "$50 Million (Estimated)",
    worldwideGross: "N/A (Direct-to-Streaming)",
    domesticGross: "N/A (Select Theatres)",
    overseasGross: "N/A",
    verdict: "Streaming Success / #1 on Netflix Globally",
    source: "Netflix / Variety / Deadline",
    lastUpdated: "October 2026"
  },
  budget: "$50 Million",
  awards: [],
  poster: "pics/Films/Animals2026/1.jpg",
  banner: "pics/Films/Animals2026/2.jpg",
  gallery: [
    {
      src: "pics/Films/Animals2026/1.jpg",
      alt: "Animals (2026) Official Theatrical Poster"
    },
    {
      src: "pics/Films/Animals2026/2.jpg",
      alt: "Animals (2026) Official Netflix Banner"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "5/10",
      url: "https://oakshow.in/Animals2026.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-this-one-is-above-average.png"
    },
    {
      source: "IMDb",
      score: "5.7/10",
      url: "https://www.imdb.com/title/tt31049299/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "31%",
      url: "https://www.rottentomatoes.com/m/animals_2026",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "33/100",
      url: "https://www.metacritic.com/movie/animals-2026/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "IGN",
      score: "8/10",
      url: "https://www.ign.com/articles/animals-review-netflix",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Common Sense Media",
      score: "3/5",
      url: "https://www.commonsensemedia.org/movie-reviews/animals-2026",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "The Guardian",
      score: "2/5",
      url: "https://www.theguardian.com/film/2026/oct/08/animals-movie-review-ben-affleck",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "The Telegraph",
      score: "2/5",
      url: "https://www.telegraph.co.uk/films/2026/10/09/ben-afflecks-animals-dire-sense-of-dj-vu/",
      icon: "pics/RatingSiteLogos/telegraph.png"
    },
    {
      source: "Roger Ebert",
      score: "1/4",
      url: "https://www.rogerebert.com/reviews/animals-ben-affleck-netflix-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    }
  ],
  cast: [
    {
      actor: "Ben Affleck",
      role: "Mark Kimball",
      description: "An independent Los Angeles mayoral candidate forced to go to extreme lengths when facing a $7 million kidnapping ransom"
    },
    {
      actor: "Kerry Washington",
      role: "Abigail Kimball",
      description: "Mark's estranged wife whose domestic secrets and strained marriage collide with the kidnapping crisis"
    },
    {
      actor: "Gillian Anderson",
      role: "Dayle Burton",
      description: "A calculated and formidable hostage-rescue specialist and private security operative hired to manage the kidnappers"
    },
    {
      actor: "Adriana Paz",
      role: "Cecilia Trujillo",
      description: "The Kimball household housekeeper whose young boy Hector is accidentally abducted in place of Denny"
    },
    {
      actor: "Ray Fisher",
      role: "Ron Sperling",
      description: "A trusted political campaign strategist and confidant caught in a complicated affair with Abigail"
    },
    {
      actor: "Luis Gerardo Méndez",
      role: "Ramon Valle",
      description: "Cecilia's resolute partner who confronts the kidnappers and fights fiercely to recover his son"
    },
    {
      actor: "Steven Yeun",
      role: "Sam Allison",
      description: "Mark's pragmatic campaign director steering his mayoral run through the political and personal storm"
    },
    {
      actor: "Christopher Woodley",
      role: "Denny Kimball",
      description: "Mark and Abigail's young son whose identical Halloween costume sparks the mistaken abduction"
    },
    {
      actor: "Jacob Estrada",
      role: "Hector",
      description: "Ramon's son who is mistakenly snatched by kidnappers off the trick-or-treating route"
    },
    {
      actor: "Matt Gerald",
      role: "James Bureaux",
      description: "The dangerous lead extortionist executing the kidnapping plot"
    }
  ],
  trailers: [
    {
      title: "Animals (2026) Official Trailer | Ben Affleck, Kerry Washington | Netflix",
      url: "https://www.youtube.com/watch?v=mlBfQJ8oxB0",
      embedUrl: "https://www.youtube.com/embed/mlBfQJ8oxB0",
      youtubeId: "mlBfQJ8oxB0",
      type: "Official Trailer"
    },
    {
      title: "Animals (2026) Official Teaser | Netflix",
      url: "https://www.youtube.com/watch?v=ZkN2M4ODdys",
      embedUrl: "https://www.youtube.com/embed/ZkN2M4ODdys",
      youtubeId: "ZkN2M4ODdys",
      type: "Official Teaser"
    }
  ],
  videos: [
    {
      title: "Animals (2026) Official Trailer | Netflix",
      url: "https://www.youtube.com/watch?v=mlBfQJ8oxB0",
      youtubeId: "mlBfQJ8oxB0"
    },
    {
      title: "Animals (2026) Official Teaser | Netflix",
      url: "https://www.youtube.com/watch?v=ZkN2M4ODdys",
      youtubeId: "ZkN2M4ODdys"
    }
  ],
  music: [],
  watchOnline: [
    {
      provider: "Netflix",
      url: "https://www.netflix.com/watch/81757047?source=35",
      icon: "pics/WatchOnline/netflix.png",
      label: "Watch on Netflix"
    }
  ],
  bookings: [],
  articles: [
    {
      headline: "Animals review – Ben Affleck’s dull Netflix thriller is lacking in bark and bite",
      url: "https://www.theguardian.com/film/2026/oct/08/animals-movie-review-ben-affleck",
      author: "The Guardian",
      date: "October 8, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Ben Affleck’s Animals gave me a dire sense of déjà vu",
      url: "https://www.telegraph.co.uk/films/2026/10/09/ben-afflecks-animals-dire-sense-of-dj-vu/",
      author: "The Telegraph",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Animals Review: Ben Affleck's Netflix Thriller Delivers",
      url: "https://www.ign.com/articles/animals-review-netflix",
      author: "IGN",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "‘Animals’ movie review: Ben Affleck thriller squanders its premise and cast",
      url: "https://www.thehindu.com/entertainment/movies/animals-movie-review-ben-affleck-thriller-squanders-its-premise-and-cast/article71574207.ece",
      author: "The Hindu",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Animals Movie Review: A tall leap which ends up stumbling on the ground",
      url: "https://www.newindianexpress.com/entertainment/review/2026/Oct/10/englishreview2026oct09animals-movie-review-a-tall-leap-which-ends-up-stumbling-on-the-ground",
      author: "The New Indian Express",
      date: "October 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Animals Movie Review: Ben Affleck's Kidnapping Thriller Has Great Twists But Sluggish Pacing",
      url: "https://screenrant.com/animals-movie-review/",
      author: "Screen Rant",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Animals movie review & film summary (2026)",
      url: "https://www.rogerebert.com/reviews/animals-ben-affleck-netflix-movie-review-2026",
      author: "Roger Ebert",
      date: "October 9, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Animals Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/animals-2026",
      author: "Common Sense Media",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Ben Affleck Gets Candid on Writing, Directing, and Starring in Netflix Kidnapping Thriller Animals",
      url: "https://ew.com/ben-affleck-candid-wild-story-behind-animals-12115370",
      author: "Entertainment Weekly",
      date: "October 2026",
      section: "News"
    },
    {
      headline: "Ben Affleck's Crime Thriller Animals Debuts at #1 on Netflix Global Movie Charts",
      url: "https://deadline.com/2026/01/netflix-2026-film-slate-war-machine-enola-holmes-3-1236665458/",
      author: "Deadline",
      date: "October 2026",
      section: "News"
    }
  ],
  similar: [
    {
      title: "Live by Night",
      link: "LivebyNight.html",
      poster: "pics/Films/Live by Night/4.jpg"
    },
    {
      title: "The Social Reckoning",
      link: "TheSocialReckoning.html",
      poster: "pics/Films/TheSocialReckoning/1.jpg"
    },
    {
      title: "Whalefall",
      link: "Whalefall.html",
      poster: "pics/Films/Whalefall/1.jpg"
    },
    {
      title: "Hope (2026)",
      link: "Hope2026.html",
      poster: "pics/Films/Hope2026/1.jpg"
    },
    {
      title: "American Animals",
      link: "AmericanAnimals.html",
      poster: "pics/Films/AmericanAnimals/1.jpg"
    },
    {
      title: "Knives Out",
      link: "KnivesOut.html",
      poster: "pics/Films/KnivesOut/2.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Animals_(2026_film)",
  imdb: "https://www.imdb.com/title/tt31049299/"
};

// 2. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

// Cross-reference Animals in similar lists of related movies
const relatedIds = ['LivebyNight', 'TheSocialReckoning', 'Whalefall', 'Hope2026'];
relatedIds.forEach(relId => {
  const idx = movies.findIndex(m => m.id === relId || m.filename === `${relId}.html`);
  if (idx !== -1) {
    if (Array.isArray(movies[idx].similar) && !movies[idx].similar.some(s => s.link === 'Animals2026.html')) {
      movies[idx].similar.unshift({
        title: "Animals (2026)",
        link: "Animals2026.html",
        poster: "pics/Films/Animals2026/1.jpg"
      });
      console.log(`Cross-referenced Animals2026 in ${relId} similar movies.`);
    }
  }
});

// Remove existing Animals2026 if any and unshift to top
const existingIdx = movies.findIndex(m => m.id === 'Animals2026' || m.filename === 'Animals2026.html');
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(animalsMovie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed Animals (2026) at index 0 of movies.json (${movies.length} total entries).`);

// 3. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "Animals2026",
  slug: "animals-2026",
  title: "Animals (2026 film)",
  type: "movie",
  category: "Hollywood",
  year: "2026",
  genre: "Crime, Thriller, Mystery, Drama",
  language: "English",
  poster: "pics/Films/Animals2026/1.jpg",
  score: 5,
  filename: "Animals2026.html",
  fileName: "Animals2026.html",
  releaseDate: "October 9, 2026",
  status: "released",
  director: "Ben Affleck",
  url: "Animals2026.html",
  ratings: animalsMovie.ratings
};

const sIdx = searchIndex.findIndex(s => s.id === 'Animals2026' || s.url === 'Animals2026.html');
if (sIdx !== -1) {
  searchIndex.splice(sIdx, 1);
}
searchIndex.unshift(searchItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json with Animals (2026) (${searchIndex.length} total entries).`);

// 4. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const releaseHubItem = {
  title: "Animals",
  poster: "pics/Films/Animals2026/1.jpg",
  alt: "Animals (2026)",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 9, 2026",
  genre: "Crime, Thriller, Mystery, Drama",
  status: "released",
  moreLink: "Animals2026.html",
  trailerLink: "https://www.youtube.com/watch?v=mlBfQJ8oxB0",
  ratings: animalsMovie.ratings.slice(0, 3)
};

// Add to Releases2026October
const allOct = releases.find(r => r.id === 'Releases2026October');
if (allOct) {
  const exIdx = allOct.items.findIndex(it => it.title === 'Animals' || it.moreLink === 'Animals2026.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    // Insert in chronological / featured place
    allOct.items.splice(2, 0, releaseHubItem);
  }
  allOct.totalItems = allOct.items.length;
}

// Add to HollywoodReleases2026October
const hwOct = releases.find(r => r.id === 'HollywoodReleases2026October');
if (hwOct) {
  const exIdx = hwOct.items.findIndex(it => it.title === 'Animals' || it.moreLink === 'Animals2026.html');
  if (exIdx !== -1) {
    hwOct.items[exIdx] = releaseHubItem;
  } else {
    hwOct.items.splice(2, 0, releaseHubItem);
  }
  hwOct.totalItems = hwOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (Releases2026October & HollywoodReleases2026October).');

// 5. Process news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsToAdd = [
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Animals review – Ben Affleck’s dull Netflix thriller is lacking in bark and bite",
    source: "The Guardian",
    date: "October 8, 2026",
    url: "https://www.theguardian.com/film/2026/oct/08/animals-movie-review-ben-affleck",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Ben Affleck’s Animals gave me a dire sense of déjà vu",
    source: "The Telegraph",
    date: "October 9, 2026",
    url: "https://www.telegraph.co.uk/films/2026/10/09/ben-afflecks-animals-dire-sense-of-dj-vu/",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Animals Review: Ben Affleck's Netflix Thriller Delivers",
    source: "IGN",
    date: "October 9, 2026",
    url: "https://www.ign.com/articles/animals-review-netflix",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "‘Animals’ movie review: Ben Affleck thriller squanders its premise and cast",
    source: "The Hindu",
    date: "October 9, 2026",
    url: "https://www.thehindu.com/entertainment/movies/animals-movie-review-ben-affleck-thriller-squanders-its-premise-and-cast/article71574207.ece",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Animals Movie Review: A tall leap which ends up stumbling on the ground",
    source: "The New Indian Express",
    date: "October 10, 2026",
    url: "https://www.newindianexpress.com/entertainment/review/2026/Oct/10/englishreview2026oct09animals-movie-review-a-tall-leap-which-ends-up-stumbling-on-the-ground",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Animals Movie Review: Ben Affleck's Kidnapping Thriller Has Great Twists But Sluggish Pacing",
    source: "Screen Rant",
    date: "October 9, 2026",
    url: "https://screenrant.com/animals-movie-review/",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Animals movie review & film summary (2026)",
    source: "Roger Ebert",
    date: "October 9, 2026",
    url: "https://www.rogerebert.com/reviews/animals-ben-affleck-netflix-movie-review-2026",
    category: "Critic Reviews"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Ben Affleck Gets Candid on Writing, Directing, and Starring in Netflix Kidnapping Thriller Animals",
    source: "Entertainment Weekly",
    date: "October 2026",
    url: "https://ew.com/ben-affleck-candid-wild-story-behind-animals-12115370",
    category: "Hollywood News"
  },
  {
    movieId: "Animals2026",
    movieTitle: "Animals",
    title: "Ben Affleck's Crime Thriller Animals Debuts at #1 on Netflix Global Movie Charts",
    source: "Deadline",
    date: "October 2026",
    url: "https://deadline.com/2026/01/netflix-2026-film-slate-war-machine-enola-holmes-3-1236665458/",
    category: "Streaming News"
  }
];

newsToAdd.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `animals2026-news-${idx + 1}`,
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

// 6. Ensure image directories in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'Animals2026');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'Animals2026');
if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/Animals2026`);
}

const distPicsDirect = path.join(rootDir, 'dist', 'pics', 'Animals2026');
const srcPicsDirect = path.join(rootDir, 'pics', 'Animals2026');
if (!fs.existsSync(distPicsDirect)) {
  fs.mkdirSync(distPicsDirect, { recursive: true });
}
if (fs.existsSync(srcPicsDirect)) {
  const files = fs.readdirSync(srcPicsDirect);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsDirect, f), path.join(distPicsDirect, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Animals2026`);
}

console.log('=== All Data Successfully Updated for Animals (2026) ===');
