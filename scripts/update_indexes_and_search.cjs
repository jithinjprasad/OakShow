const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const moviesPath = path.join(rootDir, 'data', 'movies.json');

const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

// 1. UPDATE SEARCH INDEX FOR THE 3 MOVIES
console.log('Updating data/search_index.json...');

const searchUpdates = [
  {
    id: "TopGunMaverick",
    title: "Top Gun: Maverick",
    type: "movie",
    category: "Hollywood",
    genre: "Action, Drama, Thriller, Adventure",
    language: "English",
    year: "2022",
    score: 9.8,
    poster: "pics/Films/TopGunMaverick/1.jpg",
    filename: "TopGunMaverick.html",
    fileName: "TopGunMaverick.html",
    url: "TopGunMaverick.html",
    cleanUrl: "/TopGunMaverick.html",
    status: "released",
    keywords: "Top Gun Maverick, Top Gun: Maverick, Top Gun, Top Gun 2, Maverick, Tom Cruise, Miles Teller, Jennifer Connelly, Jon Hamm, Glen Powell, Joseph Kosinski, Pete Mitchell, Rooster, TOPGUN, 17th highest grossing, Oscar winner"
  },
  {
    id: "ProjectHailMary",
    title: "Project Hail Mary",
    type: "movie",
    category: "Hollywood",
    genre: "Sci-Fi, Adventure, Drama",
    language: "English",
    year: "2026",
    score: 9.0,
    poster: "pics/Films/ProjectHailMary/1.jpg",
    filename: "ProjectHailMary.html",
    fileName: "ProjectHailMary.html",
    url: "ProjectHailMary.html",
    cleanUrl: "/ProjectHailMary.html",
    status: "released",
    keywords: "Project Hail Mary, Project Hail marry, Hail Mary, Ryan Gosling, Sandra Hüller, Phil Lord, Christopher Miller, Drew Goddard, Andy Weir, Ryland Grace, Rocky, Astrophage, Tau Ceti, Sci-Fi"
  },
  {
    id: "Michael",
    title: "Michael",
    type: "movie",
    category: "Hollywood",
    genre: "Biography, Drama, Music",
    language: "English",
    year: "2026",
    score: 8.5,
    poster: "pics/Films/Michael/1.jpg",
    filename: "Michael.html",
    fileName: "Michael.html",
    url: "Michael.html",
    cleanUrl: "/Michael.html",
    status: "released",
    keywords: "Michael, Michael (2026 film), Michael (2026), Michael Jackson, King of Pop, Jaafar Jackson, Antoine Fuqua, John Logan, Graham King, Colman Domingo, Nia Long, Miles Teller, Highest Grossing Biopic, Loved by Audience, Motown, Thriller, Off the Wall, Bad"
  }
];

searchUpdates.forEach(su => {
  const idx = searchIndex.findIndex(s => s.id === su.id || s.url === su.url || s.filename === su.filename);
  if (idx !== -1) {
    searchIndex[idx] = { ...searchIndex[idx], ...su };
  } else {
    searchIndex.unshift(su);
  }
});

fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log('Successfully updated data/search_index.json!');

// 2. UPDATE RELEASES.JSON WITH BOTH MONTHLY INDEXES FOR EACH MOVIE

// Helper to get ratings from movie object in movies.json
function getMovieRatings(id) {
  const m = movies.find(x => x.id === id);
  if (m && m.ratings) return m.ratings;
  return [];
}

const topGunReleaseItem = {
  title: "Top Gun: Maverick",
  poster: "pics/Films/TopGunMaverick/1.jpg",
  alt: "Top Gun: Maverick Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "May 27, 2022",
  genre: "Action, Drama, Thriller, Adventure",
  status: "released",
  moreLink: "TopGunMaverick.html",
  trailerLink: "https://www.youtube.com/watch?v=qSqVVswa420",
  ratings: getMovieRatings("TopGunMaverick")
};

const hailMaryReleaseItem = {
  title: "Project Hail Mary",
  poster: "pics/Films/ProjectHailMary/1.jpg",
  alt: "Project Hail Mary Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "March 20, 2026",
  genre: "Sci-Fi, Adventure, Drama",
  status: "released",
  moreLink: "ProjectHailMary.html",
  trailerLink: "https://www.youtube.com/watch?v=m08TxIsFTRI",
  ratings: getMovieRatings("ProjectHailMary")
};

const michaelReleaseItem = {
  title: "Michael",
  poster: "pics/Films/Michael/1.jpg",
  alt: "Michael Theatrical Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "April 24, 2026",
  genre: "Biography, Drama, Music",
  status: "released",
  moreLink: "Michael.html",
  trailerLink: "https://www.youtube.com/watch?v=3zOLzsbOleM",
  ratings: getMovieRatings("Michael")
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

// 1. May 2022: Top Gun: Maverick in BOTH Indexes
upsertReleaseSection({
  id: "HollywoodReleases2022May",
  title: "Hollywood Movies Released On May 2022",
  year: "2022",
  month: "May",
  category: "Hollywood",
  filename: "HollywoodReleases2022May.html"
}, topGunReleaseItem);

upsertReleaseSection({
  id: "Releases2022May",
  title: "Movies Released On May 2022",
  year: "2022",
  month: "May",
  category: "All",
  filename: "Releases2022May.html"
}, topGunReleaseItem);

// 2. March 2026: Project Hail Mary in BOTH Indexes
upsertReleaseSection({
  id: "HollywoodReleases2026March",
  title: "Hollywood Movies Released On March 2026",
  year: "2026",
  month: "March",
  category: "Hollywood",
  filename: "HollywoodReleases2026March.html"
}, hailMaryReleaseItem);

upsertReleaseSection({
  id: "Releases2026March",
  title: "Movies Released On March 2026",
  year: "2026",
  month: "March",
  category: "All",
  filename: "Releases2026March.html"
}, hailMaryReleaseItem);

// 3. April 2026: Michael in BOTH Indexes
upsertReleaseSection({
  id: "HollywoodReleases2026April",
  title: "Hollywood Movies Released On April 2026",
  year: "2026",
  month: "April",
  category: "Hollywood",
  filename: "HollywoodReleases2026April.html"
}, michaelReleaseItem);

upsertReleaseSection({
  id: "Releases2026April",
  title: "Movies Released On April 2026",
  year: "2026",
  month: "April",
  category: "All",
  filename: "Releases2026April.html"
}, michaelReleaseItem);

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Successfully updated data/releases.json with both monthly indexes for all 3 films!');
