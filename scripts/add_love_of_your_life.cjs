const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

console.log('=== Adding Love of Your Life (2026) to OakShow ===');

// 1. Movie Object
const loveOfYourLifeMovie = {
  id: "LoveofYourLife",
  slug: "love-of-your-life",
  type: "movie",
  category: "Hollywood",
  score: 6,
  filename: "LoveofYourLife.html",
  fileName: "LoveofYourLife.html",
  aliases: ["love-of-your-life.html", "LoveofYourLife", "love-of-your-life", "loveofyourlife.html", "loveofyourlife"],
  title: "Love of Your Life",
  metaTitle: "Love of Your Life (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "After the sudden and tragic loss of her husband Charlie during the pandemic, a grief-stricken nurse embarks on a healing journey across Lisbon, London, and Tokyo, rediscovering love, vulnerability, and herself in Rachel Morrison's sweeping romantic drama.",
  plot: "At age twenty-six, Maya (Margaret Qualley) is a young nurse in Boston who is estranged from her single mother. She falls in love with Charlie (Gabriel Basso) after buying an antique drawer from him. Shortly after they begin dating, Maya introduces Charlie to Jason (Patrick Schwarzenegger), her best friend since college. Jason is good-natured, but flaky and irresponsible, and frequently spends time with the couple. A year into their relationship, Charlie introduces Maya to his family on Cape Cod, and she quickly befriends his mother Ruth (Catherine Keener). During a monsoon on Charlie's thirtieth birthday, the couple marry in a small ceremony at their home.\n\nAt the onset of the COVID-19 pandemic, Maya becomes overworked and exhausted due to long hours and hospital shortages. Charlie remains supportive of her, but soon contracts COVID himself. At a high risk due to his asthma, he slowly succumbs to the virus and gets sent to the hospital; Maya, unable to get into the building, can only console him through FaceTime as he dies. After Charlie's death, Maya shuts herself in their home and withdraws from Ruth.\n\nThree years later, Maya is thirty-one and living alone in Lisbon, where she and Charlie had wanted to travel together. Supporting herself through a telehealth job, she has grown despondent due to Charlie's death and spends her nights drinking and having one-night stands. She meets Felix (Aaron Pierre), a charming British divorcé with a young daughter, at a restaurant she frequents and they spend the night together. Encouraged by her therapist to find a new hobby unrelated to Charlie, Maya goes to a dance class and befriends a woman named Beatriz, who implores her not to stay unhappy. She seeks out Felix again and begins a relationship with him, accompanying him to a seaside trip and then back to London. While out on a date, Maya unexpectedly encounters Jason, but rejects his attempts to reconcile. She and Felix decide to commit to a serious relationship and she moves in with him, eventually meeting his daughter Noelle. At Noelle's sixth birthday party, Maya becomes uncomfortable with his closeness towards his family. Feeling like an intruder into his life, she breaks up with him and flees to Tokyo for several months.\n\nAt age thirty-two, Maya returns to London and meets Felix again at a cafe, where he informs that he has gotten back together with his ex-wife. She and Felix part on amicable terms. At age thirty-four, Maya now lives in Luxembourg. Travelling to New Orleans, she speaks at a public health conference and reconnects with Jason. She finds that he has matured significantly since she last saw him and they rekindle their friendship. Jason drops Maya off at the airport, but she changes her mind about going home and instead goes to the Cape, where she reconnects with Ruth. After reminiscing over her grief for Charlie and Maya's absence, Ruth tells her that she must love her life first and foremost. While in the car ride back to Boston, Maya breaks down into tears. Now back in Boston, Maya listens to an old cassette tape Charlie gave her as it fades into white noise. She takes her headphones off, looks over at the Longfellow Bridge, and smiles.",
  language: "English",
  releaseDate: "October 7, 2026",
  year: "2026",
  status: "released",
  genre: "Romantic Drama, Romance, Drama",
  duration: "1hr 46min",
  certificate: "R",
  director: "Rachel Morrison",
  writer: "Julia Cox",
  basedOn: "",
  producers: "Ryan Gosling, Jessie Henderson",
  productionCompanies: "Open Invite Entertainment, Amazon MGM Studios",
  distributor: "Amazon MGM Studios / Amazon Prime Video",
  musicDirector: "Dustin O'Halloran",
  cinematography: "Todd Banhazl",
  editing: "Jennifer Vecchiarello",
  boxOffice: {
    budget: "$25 Million (Estimated)",
    worldwideGross: "N/A (Direct-to-Streaming / Limited Theatrical)",
    domesticGross: "N/A (Select Theatres)",
    overseasGross: "N/A",
    verdict: "Streaming Success / Prime Video Global Top 10",
    source: "Amazon Prime Video / Deadline / Variety",
    lastUpdated: "October 2026"
  },
  budget: "$25 Million",
  awards: [],
  poster: "pics/Films/LoveofYourLife/1.jpg",
  banner: "pics/Films/LoveofYourLife/2.jpg",
  gallery: [
    {
      src: "pics/Films/LoveofYourLife/1.jpg",
      alt: "Love of Your Life (2026) Official Theatrical Poster"
    },
    {
      src: "pics/Films/LoveofYourLife/2.jpg",
      alt: "Love of Your Life (2026) Official Prime Video Wide Banner"
    },
    {
      src: "pics/Films/LoveofYourLife/images.jpg",
      alt: "Margaret Qualley as Maya in Love of Your Life"
    },
    {
      src: "pics/Films/LoveofYourLife/images (1).jpg",
      alt: "Love of Your Life Official Key Art Scene"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "6/10",
      url: "https://oakshow.in/LoveofYourLife.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png"
    },
    {
      source: "IMDb",
      score: "6.5/10",
      url: "https://www.imdb.com/title/tt34384900/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "81%",
      url: "https://www.rottentomatoes.com/m/love_of_your_life",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-fresh.png"
    },
    {
      source: "Metacritic",
      score: "62/100",
      url: "https://www.metacritic.com/movie/love-of-your-life/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Common Sense Media",
      score: "4/5",
      url: "https://www.commonsensemedia.org/movie-reviews/love-of-your-life",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "India Today",
      score: "3/5",
      url: "https://www.indiatoday.in/entertainment/ott/story/love-of-your-life-movie-review-a-comforting-handshake-for-a-heart-needing-a-hug-3019632-2026-10-17",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "The Guardian",
      score: "3/5",
      url: "https://www.theguardian.com/film/2026/sep/13/love-of-your-life-review-toronto",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Times of India",
      score: "3/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/love-of-your-life/ottmoviereview/134948966.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    },
    {
      source: "Roger Ebert",
      score: "1.5/4",
      url: "https://www.rogerebert.com/reviews/love-of-your-life-margaret-qualley-prime-video-film-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    }
  ],
  cast: [
    {
      actor: "Margaret Qualley",
      role: "Maya",
      description: "A grief-stricken Boston nurse who travels across Lisbon, London, and Tokyo on a bittersweet journey of emotional recovery and self-discovery following the death of her husband"
    },
    {
      actor: "Aaron Pierre",
      role: "Felix",
      description: "A charming British divorcé and father living in London who develops a tender, grounding connection with Maya in Lisbon"
    },
    {
      actor: "Patrick Schwarzenegger",
      role: "Jason",
      description: "Maya's college best friend whose reckless youth matures into enduring emotional support"
    },
    {
      actor: "Gabriel Basso",
      role: "Charlie",
      description: "Maya's devoted husband whose untimely death during the pandemic shatters her world"
    },
    {
      actor: "Catherine Keener",
      role: "Ruth",
      description: "Charlie's loving and wise mother who helps Maya understand that life must go on"
    },
    {
      actor: "Tamara Lawrance",
      role: "Kali",
      description: "Maya's close associate and confidante navigating healthcare work"
    },
    {
      actor: "Corey Johnson",
      role: "Kerry",
      description: "A mentor figure offering guidance in Maya's medical circle"
    }
  ],
  trailers: [
    {
      title: "Love of Your Life - Official Trailer | Prime Video",
      url: "https://www.youtube.com/watch?v=HzGx48E64Xg",
      embedUrl: "https://www.youtube.com/embed/HzGx48E64Xg",
      youtubeId: "HzGx48E64Xg",
      type: "Official Trailer"
    },
    {
      title: "Love of Your Life - Official Teaser | Prime Video",
      url: "https://www.youtube.com/watch?v=8Cf4fXicJiE",
      embedUrl: "https://www.youtube.com/embed/8Cf4fXicJiE",
      youtubeId: "8Cf4fXicJiE",
      type: "Official Teaser"
    }
  ],
  videos: [
    {
      title: "Love of Your Life - Official Trailer | Prime Video",
      url: "https://www.youtube.com/watch?v=HzGx48E64Xg",
      youtubeId: "HzGx48E64Xg"
    },
    {
      title: "Love of Your Life - Official Teaser | Prime Video",
      url: "https://www.youtube.com/watch?v=8Cf4fXicJiE",
      youtubeId: "8Cf4fXicJiE"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/5DgDgZY8UfbHemEQ9lrwwZ",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Love of Your Life Soundtrack on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/love-of-your-life-original-motion-picture-soundtrack/6814348978",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen to Love of Your Life Soundtrack on Apple Music"
    }
  ],
  watchOnline: [
    {
      provider: "Amazon Prime Video",
      platform: "Amazon Prime Video",
      url: "https://www.primevideo.com/detail/0HM3DRN79M0E7QOBLMYTS41IG0?ref_=atv_dp_share_cu_r",
      icon: "pics/WatchOnline/amazon-prime.png",
      label: "Watch on Prime Video",
      lang: "English"
    }
  ],
  bookings: [],
  articles: [
    {
      headline: "'Love of Your Life' Review: A Pretty but Surface-Level Healing Journey",
      url: "https://variety.com/2026/film/reviews/love-of-your-life-review-margaret-qualley-1236863581/",
      author: "Variety",
      date: "September 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Love of Your Life movie review: A comforting handshake for a heart needing a hug",
      url: "https://www.indiatoday.in/entertainment/ott/story/love-of-your-life-movie-review-a-comforting-handshake-for-a-heart-needing-a-hug-3019632-2026-10-17",
      author: "India Today",
      date: "October 17, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Love of Your Life movie review & film summary (2026)",
      url: "https://www.rogerebert.com/reviews/love-of-your-life-margaret-qualley-prime-video-film-review-2026",
      author: "Roger Ebert",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Love of Your Life review – Margaret Qualley eats, grieves and loves in Amazon’s transporting saga",
      url: "https://www.theguardian.com/film/2026/sep/13/love-of-your-life-review-toronto",
      author: "The Guardian",
      date: "September 13, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Love of Your Life Movie Review: A tender romantic drama anchored by Margaret Qualley",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/love-of-your-life/ottmoviereview/134948966.cms",
      author: "Times of India",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Love of Your Life Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/love-of-your-life",
      author: "Common Sense Media",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Kelly chats with 'Love of Your Life' director Rachel Morrison",
      url: "https://www.9news.com/video/entertainment/television/programs/colorado-and-company/kelly-chats-with-love-of-your-life-director-rachel-morrison/73-69973329-f295-4a1c-ad95-b7967b21add4",
      author: "9News Colorado",
      date: "October 2026",
      section: "Hollywood News"
    },
    {
      headline: "Love of Your Life film brings emotional resonance to Prime Video",
      url: "https://vogueadria.com/love-of-your-life-film-prime-video/",
      author: "Vogue Adria",
      date: "October 2026",
      section: "Streaming News"
    },
    {
      headline: "Streaming Romance Love Of Your Life Has A Great Critics Score, But I Have A Warning For Viewers",
      url: "https://www.yahoo.com/entertainment/movies/articles/streaming-romance-love-life-great-003100499.html",
      author: "Yahoo Entertainment",
      date: "October 2026",
      section: "Streaming News"
    }
  ],
  similar: [
    {
      title: "Chemical Hearts",
      link: "ChemicalHearts.html",
      poster: "pics/Films/ChemicalHearts/2.jpg"
    },
    {
      title: "Five Feet Apart",
      link: "FiveFeetApart.html",
      poster: "pics/Films/FiveFeetApart/2.jpg"
    },
    {
      title: "La La Land",
      link: "LaLaLand.html",
      poster: "pics/Films/La%20La%20Land/1.jpg"
    },
    {
      title: "Call Me by Your Name",
      link: "CallMebyYourNameFilm.html",
      poster: "pics/Films/CallMebyYourName/1.jpg"
    },
    {
      title: "Verity",
      link: "Verity.html",
      poster: "pics/Films/Verity/1.jpg"
    },
    {
      title: "Animals (2026)",
      link: "Animals2026.html",
      poster: "pics/Films/Animals2026/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Love_of_Your_Life_(film)",
  imdb: "https://www.imdb.com/title/tt34384900/"
};

// 2. Setup Images
const filmPicsDir = path.join(rootDir, 'pics', 'Films', 'LoveofYourLife');
const directPicsDir = path.join(rootDir, 'pics', 'LoveofYourLife');
const distFilmPicsDir = path.join(rootDir, 'dist', 'pics', 'Films', 'LoveofYourLife');
const distDirectPicsDir = path.join(rootDir, 'dist', 'pics', 'LoveofYourLife');

[filmPicsDir, directPicsDir, distFilmPicsDir, distDirectPicsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const posterSrc = path.join(filmPicsDir, '1.jpg');
const bannerSrc = path.join(filmPicsDir, '2.jpg');
const img1Src = path.join(filmPicsDir, 'images (1).jpg');
const img2Src = path.join(filmPicsDir, 'images.jpg');

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

if (fs.existsSync(img1Src)) {
  fs.copyFileSync(img1Src, path.join(directPicsDir, 'images (1).jpg'));
  fs.copyFileSync(img1Src, path.join(distFilmPicsDir, 'images (1).jpg'));
  fs.copyFileSync(img1Src, path.join(distDirectPicsDir, 'images (1).jpg'));
}

if (fs.existsSync(img2Src)) {
  fs.copyFileSync(img2Src, path.join(directPicsDir, 'images.jpg'));
  fs.copyFileSync(img2Src, path.join(distFilmPicsDir, 'images.jpg'));
  fs.copyFileSync(img2Src, path.join(distDirectPicsDir, 'images.jpg'));
}

// 3. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

// Cross-reference LoveofYourLife in similar lists of related movies
const relatedIds = ['ChemicalHearts', 'FiveFeetApart', 'LaLaLand', 'Verity', 'Animals2026'];
relatedIds.forEach(relId => {
  const idx = movies.findIndex(m => m.id === relId || m.filename === `${relId}.html`);
  if (idx !== -1) {
    if (Array.isArray(movies[idx].similar) && !movies[idx].similar.some(s => s.link === 'LoveofYourLife.html')) {
      movies[idx].similar.unshift({
        title: "Love of Your Life (2026)",
        link: "LoveofYourLife.html",
        poster: "pics/Films/LoveofYourLife/1.jpg"
      });
      console.log(`Cross-referenced LoveofYourLife in ${relId} similar movies.`);
    }
  }
});

// Remove existing LoveofYourLife if any and unshift to top
const existingIdx = movies.findIndex(m => m.id === 'LoveofYourLife' || m.filename === 'LoveofYourLife.html');
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(loveOfYourLifeMovie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed Love of Your Life (2026) at index 0 of movies.json (${movies.length} total entries).`);

// 4. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "LoveofYourLife",
  slug: "love-of-your-life",
  title: "Love of Your Life (2026 film)",
  type: "movie",
  category: "Hollywood",
  year: "2026",
  genre: "Romantic Drama, Romance, Drama",
  language: "English",
  poster: "pics/Films/LoveofYourLife/1.jpg",
  score: 6,
  filename: "LoveofYourLife.html",
  fileName: "LoveofYourLife.html",
  releaseDate: "October 7, 2026",
  status: "released",
  director: "Rachel Morrison",
  url: "LoveofYourLife.html",
  ratings: loveOfYourLifeMovie.ratings.slice(0, 3)
};

const sIdx = searchIndex.findIndex(s => s.id === 'LoveofYourLife' || s.url === 'LoveofYourLife.html');
if (sIdx !== -1) {
  searchIndex.splice(sIdx, 1);
}
searchIndex.unshift(searchItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json with Love of Your Life (2026) (${searchIndex.length} total entries).`);

// 5. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const releaseHubItem = {
  title: "Love of Your Life",
  poster: "pics/Films/LoveofYourLife/1.jpg",
  alt: "Love of Your Life (2026)",
  language: "English",
  category: "Hollywood",
  releaseDate: "October 7, 2026",
  genre: "Romantic Drama, Romance, Drama",
  status: "released",
  moreLink: "LoveofYourLife.html",
  trailerLink: "https://www.youtube.com/watch?v=HzGx48E64Xg",
  ratings: loveOfYourLifeMovie.ratings.slice(0, 3)
};

// Add to Releases2026October
const allOct = releases.find(r => r.id === 'Releases2026October');
if (allOct) {
  const exIdx = allOct.items.findIndex(it => it.title === 'Love of Your Life' || it.moreLink === 'LoveofYourLife.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    // Insert in chronological place around other October 7/9 releases
    const animalsPos = allOct.items.findIndex(it => it.title === 'Animals');
    if (animalsPos !== -1) {
      allOct.items.splice(animalsPos, 0, releaseHubItem);
    } else {
      allOct.items.unshift(releaseHubItem);
    }
  }
  allOct.totalItems = allOct.items.length;
}

// Add to HollywoodReleases2026October
const hwOct = releases.find(r => r.id === 'HollywoodReleases2026October');
if (hwOct) {
  const exIdx = hwOct.items.findIndex(it => it.title === 'Love of Your Life' || it.moreLink === 'LoveofYourLife.html');
  if (exIdx !== -1) {
    hwOct.items[exIdx] = releaseHubItem;
  } else {
    const animalsPos = hwOct.items.findIndex(it => it.title === 'Animals');
    if (animalsPos !== -1) {
      hwOct.items.splice(animalsPos, 0, releaseHubItem);
    } else {
      hwOct.items.unshift(releaseHubItem);
    }
  }
  hwOct.totalItems = hwOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (Releases2026October & HollywoodReleases2026October).');

// 6. Process news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsToAdd = loveOfYourLifeMovie.articles.map((art, idx) => ({
  id: `loveofyourlife-news-${idx + 1}`,
  movieId: "LoveofYourLife",
  movieTitle: "Love of Your Life",
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
  if (!relHtml.includes('Love of Your Life')) {
    relHtml = relHtml.replace('all movies released in October 2026 including ', 'all movies released in October 2026 including Love of Your Life, ');
    fs.writeFileSync(relOctHtmlPath, relHtml, 'utf8');
    console.log('Updated Releases2026October.html description');
  }
}

const hwOctHtmlPath = path.join(rootDir, 'HollywoodReleases2026October.html');
if (fs.existsSync(hwOctHtmlPath)) {
  let hwHtml = fs.readFileSync(hwOctHtmlPath, 'utf8');
  if (!hwHtml.includes('Love of Your Life')) {
    hwHtml = hwHtml.replace('Hollywood movies released in October 2026 including ', 'Hollywood movies released in October 2026 including Love of Your Life, ');
    fs.writeFileSync(hwOctHtmlPath, hwHtml, 'utf8');
    console.log('Updated HollywoodReleases2026October.html description');
  }
}

// 8. Update deploy_to_scalix.ps1 if needed
const deployScriptPath = path.join(rootDir, 'scripts', 'deploy_to_scalix.ps1');
if (fs.existsSync(deployScriptPath)) {
  let deployContent = fs.readFileSync(deployScriptPath, 'utf8');
  if (!deployContent.includes('"LoveofYourLife.html"')) {
    deployContent = deployContent.replace('"Clayface2026.html"', '"Clayface2026.html", "LoveofYourLife.html"');
    fs.writeFileSync(deployScriptPath, deployContent, 'utf8');
    console.log('Updated deploy_to_scalix.ps1 with LoveofYourLife.html');
  }
}

console.log('=== All Data Successfully Updated for Love of Your Life (2026) ===');
