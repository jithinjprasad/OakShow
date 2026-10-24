const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

console.log('=== Adding Clayface (2026) to OakShow ===');

// 1. Movie Object
const clayfaceMovie = {
  id: "Clayface2026",
  slug: "clayface-2026",
  type: "movie",
  category: "Hollywood",
  score: 8,
  filename: "Clayface2026.html",
  fileName: "Clayface2026.html",
  aliases: ["clayface-2026.html", "Clayface2026", "clayface-2026", "Clayface.html", "clayface"],
  title: "Clayface",
  metaTitle: "Clayface (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "After an acclaimed actor is brutally disfigured by a Gotham mobster, he undergoes an experimental nanite cellular regeneration treatment that transforms his body into clay, spiraling into grotesque madness and bloody revenge in James Watkins' DC body-horror thriller.",
  plot: "After receiving an Academy Award nomination, rising movie star Matt Hagen (Tom Rhys Harries) attends an upscale Hollywood party with his childhood friend and fellow actor Corey Bowery (Joshua James). There, Matt encounters actress Mia Torrez (Joana Ribeiro) and spends the night with her, despite Corey's warning that she is the mistress of notorious crime boss Markos Szabo (David Dencik). The following morning, Szabo's thugs ambush Matt and brutally disfigure his face with a knife. Although Matt reports the maiming to the police, Szabo avoids prosecution due to corrupt ties and an engineered lack of evidence. Blacklisted, bankrupt, and unable to secure acting roles due to his disfigurement and vicious rumors, Matt retreats in despair to his childhood tenement in the Gotham City slums.\n\nDesperate to reclaim his face and livelihood, Matt learns of Dr. Caitlyn Corr (Naomi Ackie), a brilliant fringe bio-scientist developing an experimental nanite cellular therapy capable of rapidly regenerating human tissue. Hesitant to test it on humans, Caitlyn is urged to help Matt by her fiancé, GCPD Detective John Borrelli (Max Minghella), who is actively building a federal RICO indictment against Szabo. The initial nanite treatment appears miraculously successful, allowing Matt to step back into the public eye with his former visage restored. However, during a high-profile red carpet gala, Matt's facial structure suddenly begins melting before the cameras. Panicked, Matt breaks into Caitlyn's private lab and injects a massive overdose of nanite fluid, permanently fusing the bio-material with his cellular matrix.\n\nThe overdose gives Matt instantaneous cellular regeneration and total malleable control over his body, effectively transforming him into a shape-shifting entity made of living clay. But as he masters changing his voice and physical features to impersonate anyone, Matt discovers his talent manager Frank Fitzpatrick (Eddie Marsan) embezzled his fortune and allied with Szabo, while Corey betrayed him out of bitter professional jealousy. Succumbing to paranoia and vengeance, Matt executes Frank and Corey before infiltrating Szabo's nightclub syndicate, brutally suffocating Mia and melting Szabo's face with his acidic, chemical-infused blood. When Caitlyn discovers Matt has murdered Detective Borrelli and taken his likeness in an obsessive bid to win her love, she incapacitates him with a taser and activates the nanites' kill switch. Matt's body dissolves into sludge and washes into Gotham's sewer labyrinth, where, stranded in darkness, he shapes a clay effigy of Caitlyn and mutates into a colossal, roaring beast.",
  language: "English",
  releaseDate: "October 23, 2026",
  year: "2026",
  status: "released",
  genre: "Body Horror, Psychological Thriller, Superhero, Sci-Fi",
  duration: "1hr 48min",
  certificate: "R",
  director: "James Watkins",
  writer: "Mike Flanagan, Hossein Amini",
  basedOn: "Clayface by Bill Finger and Bob Kane (DC Comics)",
  producers: "Matt Reeves, Lynn Harris, James Gunn, Peter Safran",
  productionCompanies: "DC Studios, 6th & Idaho, Troll Court Entertainment, The Safran Company",
  distributor: "Warner Bros. Pictures",
  musicDirector: "Volker Bertelmann",
  cinematography: "Rob Hardy",
  editing: "Jon Harris",
  boxOffice: {
    budget: "$40 Million (Estimated: $30–$44 Million)",
    worldwideGross: "$18.2 Million",
    domesticGross: "$10.4 Million",
    overseasGross: "$7.8 Million",
    openingDay: "$10.4 Million (incl. $3.5M Previews)",
    verdict: "In Theatres / Opening Weekend Theatrical Run",
    source: "The Numbers & Deadline",
    lastUpdated: "October 2026"
  },
  budget: "$40 Million",
  awards: [],
  poster: "pics/Films/Clayface2026/1.jpg",
  banner: "pics/Films/Clayface2026/2.jpg",
  gallery: [
    {
      src: "pics/Films/Clayface2026/1.jpg",
      alt: "Clayface (2026) Official Theatrical Poster"
    },
    {
      src: "pics/Films/Clayface2026/2.jpg",
      alt: "Clayface (2026) Official Key Art & Wide Banner"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8/10",
      url: "https://oakshow.in/Clayface2026.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "7.6/10",
      url: "https://www.imdb.com/title/tt34890576/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "75%",
      url: "https://www.rottentomatoes.com/m/clayface",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-fresh.png"
    },
    {
      source: "Metacritic",
      score: "59/100",
      url: "https://www.metacritic.com/movie/clayface/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Den of Geek",
      score: "4/5",
      url: "https://www.denofgeek.com/movies/clayface-review-horror-triumph-dc-studios/",
      icon: "pics/RatingSiteLogos/denofgeek.ico"
    },
    {
      source: "Hindustan Times",
      score: "4/5",
      url: "https://www.hindustantimes.com/entertainment/hollywood/clayface-review-james-watkins-masterful-body-horror-is-dc-best-since-joker-tom-rhys-harries-is-sublime-james-gunn-mike-flanagan-101792736785119.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "IGN",
      score: "7/10",
      url: "https://in.ign.com/clayface",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Indian Express",
      score: "3.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/clayface-movie-review-dc-film-is-a-surprisingly-winsome-outing-10933641/lite/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "India Today",
      score: "3.5/5",
      url: "https://www.indiatoday.in/movies/reviews/story/clayface-review-tom-rhys-harries-dc-body-horror-3022996-2026-10-23",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Times of India",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/clayface/movie-review/135114891.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    },
    {
      source: "Common Sense Media",
      score: "3/5",
      url: "https://www.commonsensemedia.org/movie-reviews/clayface",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "Rediff",
      score: "3/5",
      url: "https://www.rediff.com/movies/review/clayface-review-bloody-good-fun/20261023.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "The Guardian",
      score: "2/5",
      url: "https://www.theguardian.com/film/2026/oct/21/clayface-movie-review-body-horror",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Roger Ebert",
      score: "1.5/5",
      url: "https://www.rogerebert.com/reviews/clayface-dc-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    }
  ],
  cast: [
    {
      actor: "Tom Rhys Harries",
      role: "Matt Hagen / Clayface",
      description: "An acclaimed Oscar-nominated actor brutally disfigured by a mob syndicate who undergoes an experimental nanite cellular treatment, mutating into a monstrous, shapeshifting clay entity driven by madness and vengeance"
    },
    {
      actor: "Naomi Ackie",
      role: "Dr. Caitlyn Corr",
      description: "A visionary fringe bio-technological scientist developing radical nanite dermal therapies who administers the experimental treatment to Matt and becomes his obsessive love interest"
    },
    {
      actor: "David Dencik",
      role: "Markos Szabo",
      description: "A ruthless and sadistic Gotham City underworld mob boss who orchestrates the brutal knife assault that disfigures Matt"
    },
    {
      actor: "Max Minghella",
      role: "John Borrelli",
      description: "A dedicated Gotham City Police Department detective dating Caitlyn who relentlessly investigates Szabo's syndicate and the escalating string of gruesome murders"
    },
    {
      actor: "Eddie Marsan",
      role: "Frank Fitzpatrick",
      description: "Matt's deceptive and self-serving talent manager who embezzles his client's fortunes and betrays him to Szabo's criminal empire"
    },
    {
      actor: "Nancy Carroll",
      role: "Hildie Love",
      description: "Matt's influential Hollywood talent agent navigating the fallout of his sudden disfigurement and career collapse"
    },
    {
      actor: "Joshua James",
      role: "Corey Bowery",
      description: "Matt's childhood friend and fellow movie star whose simmering professional jealousy sparks a fatal betrayal"
    },
    {
      actor: "Joana Ribeiro",
      role: "Mia Torrez",
      description: "Markos Szabo's glamorous girlfriend and aspiring actress who spends a fateful night with Matt, triggering the mob retaliation"
    },
    {
      actor: "Wil Coban",
      role: "Bones",
      description: "A ruthless muscle enforcer in Markos Szabo's Gotham crime syndicate"
    },
    {
      actor: "Rob Brydon",
      role: "Vic Chissler",
      description: "A charismatic Gotham City late-night television talk show host reporting on Hollywood scandals and city headlines"
    },
    {
      actor: "Aaron Paul",
      role: "Jimmy Hagen",
      description: "Matt Hagen's abusive father who appears in haunting, traumatic childhood flashbacks"
    }
  ],
  trailers: [
    {
      title: "Clayface (2026) Official Main Trailer | DC Studios & Warner Bros.",
      url: "https://www.youtube.com/watch?v=OGO4Mqvo3jI",
      embedUrl: "https://www.youtube.com/embed/OGO4Mqvo3jI",
      youtubeId: "OGO4Mqvo3jI",
      type: "Official Main Trailer"
    },
    {
      title: "Clayface (2026) Official Teaser Trailer | DC Studios",
      url: "https://www.youtube.com/watch?v=6IxPD-jNdwM",
      embedUrl: "https://www.youtube.com/embed/6IxPD-jNdwM",
      youtubeId: "6IxPD-jNdwM",
      type: "Official Teaser Trailer"
    },
    {
      title: "Clayface (2026) Official Trailer 2 | DC Studios",
      url: "https://www.youtube.com/watch?v=KCR-rz0YfD4",
      embedUrl: "https://www.youtube.com/embed/KCR-rz0YfD4",
      youtubeId: "KCR-rz0YfD4",
      type: "Official Trailer 2"
    }
  ],
  videos: [
    {
      title: "Clayface (2026) Main Trailer",
      url: "https://www.youtube.com/watch?v=OGO4Mqvo3jI",
      youtubeId: "OGO4Mqvo3jI"
    },
    {
      title: "Clayface (2026) Official Teaser",
      url: "https://www.youtube.com/watch?v=6IxPD-jNdwM",
      youtubeId: "6IxPD-jNdwM"
    },
    {
      title: "Clayface (2026) Trailer 2",
      url: "https://www.youtube.com/watch?v=KCR-rz0YfD4",
      youtubeId: "KCR-rz0YfD4"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/3bz8ZlzTN77QCgjjDopO3M",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Clayface Soundtrack on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/clayface-original-motion-picture-soundtrack/6816285972",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen to Clayface Soundtrack on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/clayface-main-theme/Pxbi8yamsiU_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen to Clayface Main Theme on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/clayface/ET00496545",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book Tickets on BookMyShow"
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/clayface-movie-tickets-MV220119?srsltid=AYCX9vJxepmuNO5CYnU8KhP-UA4gFwCzUzbAe6N7q0czmXSlwlVt9Nmj",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book Tickets on District"
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/clayface-2026-244768/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book Tickets on Fandango"
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/clayface-movie-detail-220119",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book Tickets on TicketNew"
    },
    {
      provider: "Eventbrite",
      url: "https://www.eventbrite.com/e/wpfc-film-friday-clayface-community-discussion-rating-tickets-1998995237567",
      icon: "pics/BookngWebSiteLogos/eventbrite.png",
      label: "Book Discussion Tickets on Eventbrite"
    },
    {
      provider: "ODEON",
      url: "https://www.odeon.co.uk/films/clayface/HO00008897/?__cf_chl_rt_tk=2CrTf0IgMiH3xjHkrlJHPapjiuG.6p2p2lcrB6Vb.D0-1792861688-1.0.1.1-UR6DuqvZtyx2KZPWmmBvzyIuJx0aBzm_4YvABqhR4sQ",
      icon: "pics/BookngWebSiteLogos/odeon.png",
      label: "Book Tickets on ODEON Cinemas"
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/1000016901-clayface/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book Tickets on Cineworld"
    }
  ],
  articles: [
    {
      headline: "Clayface Review: A Tremendous Body-Horror Triumph for DC Studios",
      url: "https://www.denofgeek.com/movies/clayface-review-horror-triumph-dc-studios/",
      author: "Den of Geek",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Review: James Watkins' Masterful Body Horror Is DC's Best Since Joker; Tom Rhys Harries Is Sublime",
      url: "https://www.hindustantimes.com/entertainment/hollywood/clayface-review-james-watkins-masterful-body-horror-is-dc-best-since-joker-tom-rhys-harries-is-sublime-james-gunn-mike-flanagan-101792736785119.html",
      author: "Hindustan Times",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface: DC's Shape-Shifting Monster Makes A Terrifying Big-Screen Debut",
      url: "https://theprint.in/entertainment/clayface-dc-shape-shifting-monster-big-screen-debut/3080336/",
      author: "The Print",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Review: Tom Rhys Harries Shines in Dark, Grotesque DC Body Horror",
      url: "https://www.indiatoday.in/movies/reviews/story/clayface-review-tom-rhys-harries-dc-body-horror-3022996-2026-10-23",
      author: "India Today",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Movie Review & Film Summary (2026)",
      url: "https://www.rogerebert.com/reviews/clayface-dc-movie-review-2026",
      author: "Roger Ebert",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Review: DC Villain Origin Goes Full Body Horror",
      url: "https://www.theguardian.com/film/2026/oct/21/clayface-movie-review-body-horror",
      author: "The Guardian",
      date: "October 21, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Movie Review: DC Film Is A Surprisingly Winsome Outing",
      url: "https://indianexpress.com/article/entertainment/movie-review/clayface-movie-review-dc-film-is-a-surprisingly-winsome-outing-10933641/lite/",
      author: "The Indian Express",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Movie Review: A Dark And Visceral Descent Into Madness",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/clayface/movie-review/135114891.cms",
      author: "Times of India",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Review: Bloody Good Fun",
      url: "https://www.rediff.com/movies/review/clayface-review-bloody-good-fun/20261023.htm",
      author: "Rediff",
      date: "October 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Clayface Review: DC Studios Explores Unflinching Horror",
      url: "https://in.ign.com/clayface",
      author: "IGN",
      date: "October 2026",
      section: "Critic Reviews"
    }
  ],
  similar: [
    {
      title: "Joker",
      link: "Joker.html",
      poster: "pics/Films/Joker/2.jpg"
    },
    {
      title: "Batman: Knightfall - Part 1: Knightfall",
      link: "BatmanKnightfallPart1Knightfall.html",
      poster: "pics/Films/BatmanKnightfallPart1Knightfall/1.jpg"
    },
    {
      title: "Animals (2026)",
      link: "Animals2026.html",
      poster: "pics/Films/Animals2026/1.jpg"
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
      title: "Zack Snyder's Justice League",
      link: "ZackSnydersJusticeLeague.html",
      poster: "pics/Films/ZackSnydersJusticeLeague/2.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Clayface_(film)",
  imdb: "https://www.imdb.com/title/tt34890576/"
};

// 2. Setup Images
const filmPicsDir = path.join(rootDir, 'pics', 'Films', 'Clayface2026');
const directPicsDir = path.join(rootDir, 'pics', 'Clayface2026');
const distFilmPicsDir = path.join(rootDir, 'dist', 'pics', 'Films', 'Clayface2026');
const distDirectPicsDir = path.join(rootDir, 'dist', 'pics', 'Clayface2026');

[filmPicsDir, directPicsDir, distFilmPicsDir, distDirectPicsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const posterSrc = path.join(filmPicsDir, '1.jpg');
const bannerSrc = path.join(filmPicsDir, '2.jpg');

if (fs.existsSync(posterSrc)) {
  fs.copyFileSync(posterSrc, path.join(directPicsDir, '1.jpg'));
  fs.copyFileSync(posterSrc, path.join(distFilmPicsDir, '1.jpg'));
  fs.copyFileSync(posterSrc, path.join(distDirectPicsDir, '1.jpg'));
}

if (fs.existsSync(bannerSrc)) {
  fs.copyFileSync(bannerSrc, path.join(directPicsDir, '2.jpg'));
  fs.copyFileSync(bannerSrc, path.join(distFilmPicsDir, '2.jpg'));
  fs.copyFileSync(bannerSrc, path.join(distDirectPicsDir, '2.jpg'));
}

// 3. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

// Cross-reference Clayface in similar lists of related movies
const relatedIds = ['Joker', 'BatmanKnightfallPart1Knightfall', 'Animals2026', 'Whalefall', 'Hope2026'];
relatedIds.forEach(relId => {
  const idx = movies.findIndex(m => m.id === relId || m.filename === `${relId}.html`);
  if (idx !== -1) {
    if (Array.isArray(movies[idx].similar) && !movies[idx].similar.some(s => s.link === 'Clayface2026.html')) {
      movies[idx].similar.unshift({
        title: "Clayface (2026)",
        link: "Clayface2026.html",
        poster: "pics/Films/Clayface2026/1.jpg"
      });
      console.log(`Cross-referenced Clayface2026 in ${relId} similar movies.`);
    }
  }
});

// Remove existing Clayface2026 if any and unshift to top
const existingIdx = movies.findIndex(m => m.id === 'Clayface2026' || m.filename === 'Clayface2026.html');
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(clayfaceMovie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed Clayface (2026) at index 0 of movies.json (${movies.length} total entries).`);

// 4. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "Clayface2026",
  slug: "clayface-2026",
  title: "Clayface (2026 film)",
  type: "movie",
  category: "Hollywood",
  year: "2026",
  genre: "Body Horror, Psychological Thriller, Superhero, Sci-Fi",
  language: "English",
  poster: "pics/Films/Clayface2026/1.jpg",
  score: 8,
  filename: "Clayface2026.html",
  fileName: "Clayface2026.html",
  releaseDate: "October 23, 2026",
  status: "released",
  director: "James Watkins",
  url: "Clayface2026.html",
  ratings: clayfaceMovie.ratings.slice(0, 3)
};

const sIdx = searchIndex.findIndex(s => s.id === 'Clayface2026' || s.url === 'Clayface2026.html');
if (sIdx !== -1) {
  searchIndex.splice(sIdx, 1);
}
searchIndex.unshift(searchItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json with Clayface (2026) (${searchIndex.length} total entries).`);

// 5. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const releaseHubItem = {
  title: "Clayface",
  poster: "pics/Films/Clayface2026/1.jpg",
  alt: "Clayface (2026)",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 23, 2026",
  genre: "Body Horror, Psychological Thriller, Superhero, Sci-Fi",
  status: "released",
  moreLink: "Clayface2026.html",
  trailerLink: "https://www.youtube.com/watch?v=OGO4Mqvo3jI",
  ratings: clayfaceMovie.ratings.slice(0, 3)
};

// Add to Releases2026October
const allOct = releases.find(r => r.id === 'Releases2026October');
if (allOct) {
  const exIdx = allOct.items.findIndex(it => it.title === 'Clayface' || it.moreLink === 'Clayface2026.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    // Insert at front
    allOct.items.unshift(releaseHubItem);
  }
  allOct.totalItems = allOct.items.length;
}

// Add to HollywoodReleases2026October
const hwOct = releases.find(r => r.id === 'HollywoodReleases2026October');
if (hwOct) {
  const exIdx = hwOct.items.findIndex(it => it.title === 'Clayface' || it.moreLink === 'Clayface2026.html');
  if (exIdx !== -1) {
    hwOct.items[exIdx] = releaseHubItem;
  } else {
    // Insert at front
    hwOct.items.unshift(releaseHubItem);
  }
  hwOct.totalItems = hwOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (Releases2026October & HollywoodReleases2026October).');

// 6. Process news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsToAdd = clayfaceMovie.articles.map((art, idx) => ({
  id: `clayface2026-news-${idx + 1}`,
  movieId: "Clayface2026",
  movieTitle: "Clayface",
  title: art.headline,
  source: art.author,
  date: art.date,
  url: art.url,
  category: art.section || "Critic Reviews"
}));

newsToAdd.forEach(n => {
  const fIdx = news.findIndex(item => item.url === n.url);
  if (fIdx !== -1) {
    news[fIdx] = n;
  } else {
    news.unshift(n);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`Updated news.json (${news.length} total entries).`);

// 7. Update Releases2026October.html & HollywoodReleases2026October.html descriptions
const relOctHtmlPath = path.join(rootDir, 'Releases2026October.html');
if (fs.existsSync(relOctHtmlPath)) {
  let relHtml = fs.readFileSync(relOctHtmlPath, 'utf8');
  if (!relHtml.includes('Clayface')) {
    relHtml = relHtml.replace('all movies released in October 2026 including ', 'all movies released in October 2026 including Clayface, ');
    fs.writeFileSync(relOctHtmlPath, relHtml, 'utf8');
    console.log('Updated Releases2026October.html description');
  }
}

const hwOctHtmlPath = path.join(rootDir, 'HollywoodReleases2026October.html');
if (fs.existsSync(hwOctHtmlPath)) {
  let hwHtml = fs.readFileSync(hwOctHtmlPath, 'utf8');
  if (!hwHtml.includes('Clayface')) {
    hwHtml = hwHtml.replace('Hollywood movies released in October 2026 including ', 'Hollywood movies released in October 2026 including Clayface, ');
    fs.writeFileSync(hwOctHtmlPath, hwHtml, 'utf8');
    console.log('Updated HollywoodReleases2026October.html description');
  }
}

// 8. Update deploy_to_scalix.ps1 if needed
const deployScriptPath = path.join(rootDir, 'scripts', 'deploy_to_scalix.ps1');
if (fs.existsSync(deployScriptPath)) {
  let deployContent = fs.readFileSync(deployScriptPath, 'utf8');
  if (!deployContent.includes('"Clayface2026.html"')) {
    deployContent = deployContent.replace('"UdtaTeer.html"', '"UdtaTeer.html", "Clayface2026.html"');
    fs.writeFileSync(deployScriptPath, deployContent, 'utf8');
    console.log('Updated deploy_to_scalix.ps1 with Clayface2026.html');
  }
}

console.log('=== All Data Successfully Updated for Clayface (2026) ===');
