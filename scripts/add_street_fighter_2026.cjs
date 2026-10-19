const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

console.log('=== Adding Street Fighter (2026 film) to OakShow ===');

// 1. Movie Object
const streetFighterMovie = {
  id: "StreetFighter2026",
  slug: "street-fighter-2026",
  type: "movie",
  category: "Hollywood",
  score: 5.2,
  filename: "StreetFighter2026.html",
  fileName: "StreetFighter2026.html",
  title: "Street Fighter (2026 film)",
  metaTitle: "Street Fighter (2026 film) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Estranged martial arts rivals Ryu and Ken Masters are thrust into the perilous underground World Warrior Tournament orchestrated by Chun-Li, battling lethal fighters across the globe to bring down the ruthless syndicate of M. Bison.",
  plot: "Set in 1993, the film follows former friends and martial arts prodigies Ryu (Andrew Koji) and Ken Masters (Noah Centineo), whose brotherhood disintegrated following a bitter, unspoken falling out during their youth. When the mysterious and resolute Chun-Li (Callina Liang) tracks them down, she recruits the estranged fighters into the legendary, high-stakes World Warrior Tournament.\n\nWhat begins as a test of strength against extraordinary global competitors—including the feral Blanka (Jason Momoa), unyielding military operative Guile (Cody Rhodes), heavy-hitting pugilist Balrog (Curtis '50 Cent' Jackson), lethal masked matador Vega (Orville Peck), mystic warrior Dhalsim (Vidyut Jammwal), and monstrous combatant Zangief (Olivier Richters)—soon exposes a far darker geopolitical conspiracy. Reunited against overwhelming odds, Ryu and Ken must conquer their lingering rivalry, unlock their ultimate inner fighting techniques, and confront the malevolent megalomaniac dictator M. Bison (David Dastmalchian) and the demonic entity Akuma (Joe 'Roman Reigns' Anoa'i) before their syndicate plunges the world into chaos.",
  language: "English",
  releaseDate: "October 16, 2026",
  year: "2026",
  status: "released",
  genre: "Action, Martial Arts, Comedy, Adventure",
  duration: "2hr 00min",
  certificate: "PG-13",
  director: "Kitao Sakurai",
  writer: "T. J. Fixman, Kitao Sakurai (Screenplay); Dalan Musson, Gary Dauberman (Story)",
  basedOn: "Street Fighter by Capcom",
  producers: "Mary Parent, Cale Boyter, Jason Momoa, Takayuki Nakayama, Stefan Makhoul",
  productionCompanies: "Legendary Pictures, Capcom",
  distributor: "Paramount Pictures",
  musicDirector: "Leo Birenberg, Zach Robinson",
  cinematography: "Ken Seng",
  editing: "James Thomas, Delaney Del Vecchio",
  boxOffice: {
    budget: "$82 million",
    worldwideGross: "$51 million",
    domesticGross: "$31 million",
    openingWeekend: "$31 million (Domestic)",
    internationalGross: "$20 million",
    verdict: "In Theatres / Global Theatrical Debut",
    source: "Box Office Mojo / The Numbers / Deadline",
    lastUpdated: "October 19, 2026"
  },
  budget: "$82 million",
  awards: [],
  poster: "pics/Films/StreetFighter2026/1.jpg",
  banner: "pics/Films/StreetFighter2026/2.jpg",
  gallery: [
    {
      src: "pics/Films/StreetFighter2026/1.jpg",
      alt: "Street Fighter Theatrical Poster"
    },
    {
      src: "pics/Films/StreetFighter2026/2.jpg",
      alt: "Street Fighter Key Art & Banner"
    },
    {
      src: "pics/Films/StreetFighter2026/3.jpg",
      alt: "Street Fighter Cinematic Action Still"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "5.2/10",
      url: "https://oakshow.in/StreetFighter2026.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "6.3/10",
      url: "https://www.imdb.com/title/tt27419420/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "42%",
      url: "https://www.rottentomatoes.com/m/street_fighter_2026",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "44%",
      url: "https://www.metacritic.com/movie/street-fighter-2026/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "IGN",
      score: "6/10",
      url: "https://www.ign.com/movies/street-fighter-2026",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Den of Geek",
      score: "3/5",
      url: "https://www.denofgeek.com/movies/street-fighter-review/",
      icon: "pics/RatingSiteLogos/denofgeek.ico"
    },
    {
      source: "Hindustan Times",
      score: "3/5",
      url: "https://www.hindustantimes.com/entertainment/hollywood/street-fighter-movie-review-arcade-come-to-life-in-kitao-sakurai-fun-zany-reboot-vidyut-jammwal-hollywood-debut-andrew-koji-noah-centineo-101792138283963.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "Times of India",
      score: "3/5",
      url: "https://timesofindia.indiatimes.com/movie-review/134980809.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "India Today",
      score: "3/5",
      url: "https://www.indiatoday.in/movies/reviews/story/street-fighter-review-noah-centineo-vidyut-jammwal-action-film-unapologetically-silly-testosterone-fuelled-3018543-2026-10-16",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "The Guardian",
      score: "2/5",
      url: "https://www.theguardian.com/film/2026/oct/15/street-fighter-movie-review",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Common Sense Media",
      score: "2/5",
      url: "https://www.commonsensemedia.org/movie-reviews/street-fighter-0",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "Roger Ebert",
      score: "1.5/4",
      url: "https://www.rogerebert.com/reviews/street-fighter-video-game-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    }
  ],
  cast: [
    { actor: "Andrew Koji", role: "Ryu", description: "A dedicated wandering martial artist seeking inner balance and mastery of the Ansatsuken style" },
    { actor: "Noah Centineo", role: "Ken Masters", description: "Ryu's fiery estranged sparring partner and wealthy American martial arts champion" },
    { actor: "Callina Liang", role: "Chun-Li", description: "An investigative martial artist seeking vengeance and justice against M. Bison" },
    { actor: "David Dastmalchian", role: "M. Bison", description: "The tyrannical mastermind behind Shadaloo and the deadly World Warrior Tournament" },
    { actor: "Jason Momoa", role: "Blanka", description: "A feral jungle warrior endowed with ferocious strength and bio-electric power" },
    { actor: "Joe 'Roman Reigns' Anoa'i", role: "Akuma", description: "The fearsome master of the Dark Hado who challenges the tournament's greatest combatants" },
    { actor: "Cody Rhodes", role: "Guile", description: "A decorated U.S. military officer on a personal mission to dismantle Shadaloo" },
    { actor: "Curtis '50 Cent' Jackson", role: "Balrog", description: "A brutal heavyweight prizefighter enforcer working for M. Bison" },
    { actor: "Orville Peck", role: "Vega", description: "A masked, clawed assassin obsessed with lethal combat and aesthetics" },
    { actor: "Mel Jarnson", role: "Cammy White", description: "An agile operative caught between her mysterious past and the tournament" },
    { actor: "Vidyut Jammwal", role: "Dhalsim", description: "A calm Yoga master who wields transcendent pyrotechnic abilities in battle" },
    { actor: "Olivier Richters", role: "Zangief", description: "The towering Red Cyclone and powerhouse wrestler from the Russian tundra" },
    { actor: "Hirooki Goto", role: "E. Honda", description: "A world-class sumo wrestler representing traditional Japanese fighting arts" },
    { actor: "Andrew Schulz", role: "Dan Hibiki", description: "An overconfident, flamboyant fighter bringing comic relief to the arena" },
    { actor: "Eric André", role: "Don Sauvage", description: "An eccentric tournament promoter and high-energy underground host" },
    { actor: "Alexander Volkanovski", role: "Joe", description: "A relentless kickboxer competing in the opening tournament rounds" },
    { actor: "Rayna Vallandingham", role: "Juli", description: "An elite assassin loyal to Bison's inner circle" }
  ],
  trailers: [
    {
      title: "Street Fighter Official Main Trailer",
      url: "https://www.youtube.com/watch?v=U6sbm1OaJb8",
      embedUrl: "https://www.youtube-nocookie.com/embed/U6sbm1OaJb8",
      youtubeId: "U6sbm1OaJb8",
      type: "Main Trailer"
    },
    {
      title: "Street Fighter Official Teaser Trailer",
      url: "https://www.youtube.com/watch?v=Xt4X4FvXk2A",
      embedUrl: "https://www.youtube-nocookie.com/embed/Xt4X4FvXk2A",
      youtubeId: "Xt4X4FvXk2A",
      type: "Teaser Trailer"
    }
  ],
  videos: [
    {
      title: "Street Fighter Official Main Trailer",
      url: "https://www.youtube.com/watch?v=U6sbm1OaJb8",
      youtubeId: "U6sbm1OaJb8"
    },
    {
      title: "Street Fighter Official Teaser Trailer",
      url: "https://www.youtube.com/watch?v=Xt4X4FvXk2A",
      youtubeId: "Xt4X4FvXk2A"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/1gcwXZHiC8sdIxch3TGiuq",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/street-fighter-original-motion-picture-soundtrack/6816831537",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/street-fighter/ET00481645",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/street-fighter-movie-tickets-MV204027?srsltid=AU7gw4UMztm7aTTw5sBX3OdVJHKm8uYvPk6uoJnyOli7UBA8b_Rmjm48",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/street-fighter-movie-detail-204027",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 3
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/street-fighter-2026-246472/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 4
    }
  ],
  watchOnline: [],
  articles: [
    {
      headline: "Street Fighter Review: A Wildly Entertaining Video Game Adaptation That Doesn't Take Itself Too Seriously",
      url: "https://www.denofgeek.com/movies/street-fighter-review/",
      author: "Den of Geek",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter movie review: Arcade comes to life in Kitao Sakurai's fun, zany reboot with Vidyut Jammwal, Andrew Koji and Noah Centineo",
      url: "https://www.hindustantimes.com/entertainment/hollywood/street-fighter-movie-review-arcade-come-to-life-in-kitao-sakurai-fun-zany-reboot-vidyut-jammwal-hollywood-debut-andrew-koji-noah-centineo-101792138283963.html",
      author: "Hindustan Times",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter (2026) Review: Kitao Sakurai delivers energetic martial arts nostalgia",
      url: "https://www.ign.com/movies/street-fighter-2026",
      author: "IGN",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter movie review: Bland fights and a few good laughs",
      url: "https://www.newindianexpress.com/entertainment/review/2026/Oct/16/englishreview2026oct16street-fighter-movie-review-bland-fights-and-a-few-good-laughs",
      author: "The New Indian Express",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter movie review: Star-studded cast delivers campy martial arts fun",
      url: "https://www.thehindu.com/entertainment/movies/street-fighter-movie-review-noah-centineo-andrew-schulz-vidyut-jammwal-cody-rhodes-roman-reigns-jason-momoa-50-cent/article71592175.ece",
      author: "The Hindu",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter review – garish video game reboot never finds its footing",
      url: "https://www.theguardian.com/film/2026/oct/15/street-fighter-movie-review",
      author: "The Guardian",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter Movie Review: A nostalgic, popcorn-action reboot for gaming fans",
      url: "https://timesofindia.indiatimes.com/movie-review/134980809.cms",
      author: "Times of India",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter review: Noah Centineo, Vidyut Jammwal action film is unapologetically silly and testosterone-fuelled",
      url: "https://www.indiatoday.in/movies/reviews/story/street-fighter-review-noah-centineo-vidyut-jammwal-action-film-unapologetically-silly-testosterone-fuelled-3018543-2026-10-16",
      author: "India Today",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter Movie Review: Uneven video game adaptation struggles despite lively ensemble",
      url: "https://www.rogerebert.com/reviews/street-fighter-video-game-movie-review-2026",
      author: "Roger Ebert",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Street Fighter Review: Heavy martial arts violence in video game reboot",
      url: "https://www.commonsensemedia.org/movie-reviews/street-fighter-0",
      author: "Common Sense Media",
      date: "October 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "Matchbox: The Movie",
      link: "MatchboxTheMovie.html",
      poster: "pics/Films/MatchboxTheMovie/1.jpg"
    },
    {
      title: "Pokémon Detective Pikachu",
      link: "PokemonDetectivePikachu.html",
      poster: "pics/Films/PokemonDetectivePikachu/2.jpg"
    },
    {
      title: "Assassin's Creed",
      link: "AssassinsCreed.html",
      poster: "pics/Films/Assassins Creed/4.jpg"
    },
    {
      title: "Alita: Battle Angel",
      link: "AlitaBattleAngel.html",
      poster: "pics/Films/AlitaBattleAngel/2.jpg"
    },
    {
      title: "Kickboxer: Vengeance",
      link: "KickboxerVengeance.html",
      poster: "pics/Films/Kickboxer Vengeance/4.jpg"
    },
    {
      title: "Fast & Furious Presents: Hobbs & Shaw",
      link: "HobbsandShaw.html",
      poster: "pics/Films/HobbsandShaw/2.jpg"
    },
    {
      title: "Pacific Rim Uprising",
      link: "PacificRimUprising.html",
      poster: "pics/Films/PacificRimUprising/1.jpg"
    },
    {
      title: "Bumblebee",
      link: "Bumblebee.html",
      poster: "pics/Films/Bumblebee/2.jpg"
    },
    {
      title: "John Wick: Chapter 2",
      link: "JohnWickChapter2.html",
      poster: "pics/Films/John%20Wick%20Chapter%202/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Street_Fighter_(2026_film)",
  imdb: "https://www.imdb.com/title/tt27419420/"
};

// 2. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const existingIdx = movies.findIndex(m => m.id === 'StreetFighter2026' || m.filename === 'StreetFighter2026.html');
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(streetFighterMovie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed Street Fighter (2026 film) at index 0 in movies.json (${movies.length} total entries).`);

// 3. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const sItem = {
  id: "StreetFighter2026",
  title: "Street Fighter (2026 film)",
  type: "movie",
  category: "Hollywood",
  year: "2026",
  genre: "Action, Martial Arts, Comedy, Adventure",
  language: "English",
  score: 5.2,
  poster: "pics/Films/StreetFighter2026/1.jpg",
  status: "released",
  url: "StreetFighter2026.html"
};
const searchIdx = searchIndex.findIndex(s => s.id === 'StreetFighter2026' || s.url === 'StreetFighter2026.html');
if (searchIdx !== -1) {
  searchIndex.splice(searchIdx, 1);
}
searchIndex.unshift(sItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json (${searchIndex.length} total entries).`);

// 4. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const releaseHubItem = {
  title: "Street Fighter",
  poster: "pics/Films/StreetFighter2026/1.jpg",
  alt: "Street Fighter (2026 film) Theatrical Poster",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 16, 2026",
  genre: "Action, Martial Arts, Comedy, Adventure",
  status: "released",
  moreLink: "StreetFighter2026.html",
  trailerLink: "https://www.youtube.com/watch?v=U6sbm1OaJb8",
  ratings: [
    {
      source: "OakShow",
      score: "5.2/10",
      url: "https://oakshow.in/StreetFighter2026.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "6.3/10",
      url: "https://www.imdb.com/title/tt27419420/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "42%",
      url: "https://www.rottentomatoes.com/m/street_fighter_2026",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "44%",
      url: "https://www.metacritic.com/movie/street-fighter-2026/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    }
  ]
};

// Add to HollywoodReleases2026October
const hOct = releases.find(r => r.id === 'HollywoodReleases2026October');
if (hOct) {
  const exIdx = hOct.items.findIndex(it => it.title === 'Street Fighter' || it.moreLink === 'StreetFighter2026.html');
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
  const exIdx = allOct.items.findIndex(it => it.title === 'Street Fighter' || it.moreLink === 'StreetFighter2026.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    allOct.items.unshift(releaseHubItem);
  }
  allOct.totalItems = allOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (HollywoodReleases2026October & Releases2026October).');

// 5. Ensure image directories exist in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'StreetFighter2026');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'StreetFighter2026');

if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/StreetFighter2026`);
}

console.log('=== Street Fighter (2026 film) Data Preparation Complete ===');
