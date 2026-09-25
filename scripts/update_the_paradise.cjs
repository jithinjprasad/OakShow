const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');

let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
let pIndex = movies.findIndex(m => m.id === 'TheParadise' || m.filename === 'TheParadise.html');

const paradiseMovie = {
  id: "TheParadise",
  slug: "the-paradise",
  type: "movie",
  category: "Indian",
  score: 8.5,
  filename: "TheParadise.html",
  title: "The Paradise",
  metaTitle: "The Paradise (2026) All Ratings, Reviews, Songs, Videos, Bookings and News",
  description: "The Paradise is a 2026 Indian Telugu-language period action drama film directed by Srikanth Odela and produced by Sudhakar Cherukuri under SLV Cinemas. Starring Natural Star Nani alongside Mohan Babu, Kayadu Lohar, and Raghav Juyal, with music composed by Anirudh Ravichander, the film depicts a revolutionary battle against systemic oppression in 1980s Secunderabad.",
  plot: "Set against the raw, industrial backdrop of 1980s Secunderabad, The Paradise chronicles the meteoric rise of an audacious local rebel (Nani) standing tall against entrenched sociopolitical dynasties and corrupt syndicates. Supported by key allies and pitted against ruthless oppressors, his journey evolves from personal resistance into an explosive mass uprising.",
  language: "Telugu",
  releaseDate: "September 24, 2026",
  year: "2026",
  genre: "Action, Drama, Period",
  duration: "TBA",
  director: "Srikanth Odela",
  writer: "Srikanth Odela",
  boxOffice: "Upcoming",
  poster: "pics/Films/TheParadise/1.jpg",
  banner: "pics/Films/TheParadise/2.jpg",
  gallery: [
    {
      src: "pics/Films/TheParadise/1.jpg",
      alt: "The Paradise Official Theatrical Poster"
    },
    {
      src: "pics/Films/TheParadise/2.jpg",
      alt: "The Paradise Key Banner Art"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8.5/10",
      url: "https://oakshow.in/TheParadise.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "Anticipated",
      url: "https://www.imdb.com/title/tt31969655/",
      icon: "pics/RatingSiteLogos/imdb.png"
    }
  ],
  cast: [
    { actor: "Nani", role: "Protagonist", description: "Natural Star Nani as the revolutionary leader" },
    { actor: "Raghav Juyal", role: "Antagonist", description: "Fierce adversary" },
    { actor: "Mohan Babu", role: "Elder Patriarch", description: "Key character role" },
    { actor: "Kayadu Lohar", role: "Female Lead", description: "Lead actress" },
    { actor: "Sonali Kulkarni", role: "Mother", description: "Emotional core of the story" },
    { actor: "Sampoornesh Babu", role: "Supporting Role", description: "Supporting character" }
  ],
  trailers: [
    {
      title: "Teaser (Telugu)",
      url: "https://www.youtube.com/watch?v=Y3xewv1ZnHc",
      embedUrl: "https://www.youtube-nocookie.com/embed/Y3xewv1ZnHc",
      youtubeId: "Y3xewv1ZnHc",
      type: "Teaser"
    },
    {
      title: "Teaser (Malayalam)",
      url: "https://www.youtube.com/watch?v=qkqqtP6QpdI",
      embedUrl: "https://www.youtube-nocookie.com/embed/qkqqtP6QpdI",
      youtubeId: "qkqqtP6QpdI",
      type: "Teaser"
    },
    {
      title: "Teaser (Tamil)",
      url: "https://www.youtube.com/watch?v=LMqE7OAewkg",
      embedUrl: "https://www.youtube-nocookie.com/embed/LMqE7OAewkg",
      youtubeId: "LMqE7OAewkg",
      type: "Teaser"
    },
    {
      title: "Teaser (Hindi)",
      url: "https://www.youtube.com/watch?v=hc6CE4Rnjjs",
      embedUrl: "https://www.youtube-nocookie.com/embed/hc6CE4Rnjjs",
      youtubeId: "hc6CE4Rnjjs",
      type: "Teaser"
    },
    {
      title: "Official Glimpse",
      url: "https://www.youtube.com/watch?v=namFQ8wFdIA",
      embedUrl: "https://www.youtube-nocookie.com/embed/namFQ8wFdIA",
      youtubeId: "namFQ8wFdIA",
      type: "Teaser"
    },
    {
      title: "Song 1",
      url: "https://www.youtube.com/watch?v=iAtoZar5W58",
      embedUrl: "https://www.youtube-nocookie.com/embed/iAtoZar5W58",
      youtubeId: "iAtoZar5W58",
      type: "Song"
    },
    {
      title: "Song 2",
      url: "https://www.youtube.com/watch?v=JqFzhcWo3EU",
      embedUrl: "https://www.youtube-nocookie.com/embed/JqFzhcWo3EU",
      youtubeId: "JqFzhcWo3EU",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Teaser (Telugu)",
      url: "https://www.youtube.com/watch?v=Y3xewv1ZnHc",
      youtubeId: "Y3xewv1ZnHc"
    },
    {
      title: "Teaser (Malayalam)",
      url: "https://www.youtube.com/watch?v=qkqqtP6QpdI",
      youtubeId: "qkqqtP6QpdI"
    },
    {
      title: "Teaser (Tamil)",
      url: "https://www.youtube.com/watch?v=LMqE7OAewkg",
      youtubeId: "LMqE7OAewkg"
    },
    {
      title: "Teaser (Hindi)",
      url: "https://www.youtube.com/watch?v=hc6CE4Rnjjs",
      youtubeId: "hc6CE4Rnjjs"
    },
    {
      title: "Official Glimpse",
      url: "https://www.youtube.com/watch?v=namFQ8wFdIA",
      youtubeId: "namFQ8wFdIA"
    },
    {
      title: "Song 1",
      url: "https://www.youtube.com/watch?v=iAtoZar5W58",
      youtubeId: "iAtoZar5W58"
    },
    {
      title: "Song 2",
      url: "https://www.youtube.com/watch?v=JqFzhcWo3EU",
      youtubeId: "JqFzhcWo3EU"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/49k50t3cRBymberfndRjTG",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Spotify (Telugu)"
    },
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/0YngYZHyiKpK7mKamFFQMI",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Spotify (Malayalam)"
    },
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/3H19c7Efg2OZmeP1jDKhni",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Spotify (Tamil)"
    },
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/5EabHepbNK0xO6QVuemrRD",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Spotify (Hindi)"
    },
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/0rrJbwO2JGpvvyUVw9RjRJ",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Spotify (Kannada)"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/song/the-paradise-glimpse-from-the-paradise/1814385152",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/the-paradise-theme-ost-from-the-paradise/FgZtl-GsGnM_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "JioSaavn"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/the-paradise/ET00436621",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/the-paradise-movie-tickets-MV185027?srsltid=AU7gw4XqXqaOlgH4BPq2DVAg9a1VJNGQccIbMZxUr-s-X8er21zWlDcW",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/the-paradise-2026-246366/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/the-paradise-movie-detail-185027",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 4
    },
    {
      provider: "ODEON",
      url: "https://www.odeon.co.uk/films/the-paradise-telugu/HO00009454/",
      icon: "pics/BookngWebSiteLogos/odeon.png",
      label: "Book on ODEON",
      rank: 5
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/1000020779-the-paradise/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 6
    }
  ],
  watchOnline: [],
  articles: [
    {
      headline: "The Paradise Is Inspired by Real Incidents and My Childhood: Srikanth Odela",
      url: "https://telugucinema.com/interviews/the-paradise-is-inspired-by-real-incidents-and-my-childhood-srikanth-odela",
      author: "Telugu Cinema",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Nani Faces Backlash Over 'Go Back To Braids' Remark At The Paradise Promotions",
      url: "https://www.ndtv.com/entertainment/nani-faces-backlash-over-go-back-to-braids-remark-at-the-paradise-promotions-12068451",
      author: "NDTV",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Nani Reveals He Was Impressed by Raghav Juyal in 'Kill' Before Teaming Up for The Paradise",
      url: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/nani-reveals-he-was-impressed-by-raghav-juyal-in-kill-before-teaming-up-for-the-paradise-reveals-srikanth-odelas-casting-idea-he-did-even-more-than-he-had-done-in-hindi/articleshow/134349154.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Nani Discloses His Son Is Eager to Watch The Paradise But Has Been Told He Can't",
      url: "https://www.ap7am.com/en/135954/nani-discloses-his-son-is-eager-to-watch-the-paradise-but-has-been-told-he-cant-watch-it-when-it-releases-heres-why",
      author: "AP7AM",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Nani Questions Pan-India Tag: Hindi Hits Are Never Called That",
      url: "https://indianexpress.com/article/entertainment/telugu/nani-questions-pan-india-tag-hindi-hits-are-never-called-that-10883120/",
      author: "The Indian Express",
      date: "September 2026",
      section: "News(Before Release)"
    }
  ],
  similar: [
    {
      title: "V",
      link: "V.html",
      poster: "pics/Films/V/2.jpg"
    },
    {
      title: "Devadas",
      link: "Devadas.html",
      poster: "pics/Films/Devadas/1.jpg"
    },
    {
      title: "Ninnu Kori",
      link: "NinnuKori.html",
      poster: "pics/Films/NinnuKori/1.jpg"
    },
    {
      title: "Gentleman",
      link: "Gentleman.html",
      poster: "pics/Films/Gentleman/4.jpg"
    }
  ],
  imdb: "https://www.imdb.com/title/tt31969655/",
  status: "upcoming"
};

if (pIndex !== -1) {
  movies[pIndex] = paradiseMovie;
  console.log('Updated existing TheParadise in movies.json');
} else {
  movies.unshift(paradiseMovie);
  console.log('Inserted TheParadise into movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Add News to data/news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const paradiseNewsItems = [
  {
    movieId: "TheParadise",
    movieTitle: "The Paradise",
    title: "The Paradise Is Inspired by Real Incidents and My Childhood: Srikanth Odela",
    source: "Telugu Cinema",
    date: "September 2026",
    url: "https://telugucinema.com/interviews/the-paradise-is-inspired-by-real-incidents-and-my-childhood-srikanth-odela",
    category: "Tollywood"
  },
  {
    movieId: "TheParadise",
    movieTitle: "The Paradise",
    title: "Nani Faces Backlash Over 'Go Back To Braids' Remark At The Paradise Promotions",
    source: "NDTV",
    date: "September 2026",
    url: "https://www.ndtv.com/entertainment/nani-faces-backlash-over-go-back-to-braids-remark-at-the-paradise-promotions-12068451",
    category: "Tollywood"
  },
  {
    movieId: "TheParadise",
    movieTitle: "The Paradise",
    title: "Nani Reveals He Was Impressed by Raghav Juyal in 'Kill' Before Teaming Up for The Paradise",
    source: "Times of India",
    date: "September 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/nani-reveals-he-was-impressed-by-raghav-juyal-in-kill-before-teaming-up-for-the-paradise-reveals-srikanth-odelas-casting-idea-he-did-even-more-than-he-had-done-in-hindi/articleshow/134349154.cms",
    category: "Tollywood"
  },
  {
    movieId: "TheParadise",
    movieTitle: "The Paradise",
    title: "Nani Discloses His Son Is Eager to Watch The Paradise But Has Been Told He Can't",
    source: "AP7AM",
    date: "September 2026",
    url: "https://www.ap7am.com/en/135954/nani-discloses-his-son-is-eager-to-watch-the-paradise-but-has-been-told-he-cant-watch-it-when-it-releases-heres-why",
    category: "Tollywood"
  },
  {
    movieId: "TheParadise",
    movieTitle: "The Paradise",
    title: "Nani Questions Pan-India Tag: Hindi Hits Are Never Called That",
    source: "The Indian Express",
    date: "September 2026",
    url: "https://indianexpress.com/article/entertainment/telugu/nani-questions-pan-india-tag-hindi-hits-are-never-called-that-10883120/",
    category: "Tollywood"
  }
];

paradiseNewsItems.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `paradise-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`Updated news.json with The Paradise reports (${news.length} total)`);

// 3. Search Index
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(s => s.id === 'TheParadise' || s.url === 'TheParadise.html');
const sItem = {
  id: "TheParadise",
  title: "The Paradise",
  type: "movie",
  category: "Indian",
  year: "2026",
  genre: "Action, Drama, Period",
  language: "Telugu",
  score: 8.5,
  poster: "pics/Films/TheParadise/1.jpg",
  url: "TheParadise.html"
};
if (searchIdx !== -1) {
  searchIndex[searchIdx] = sItem;
} else {
  searchIndex.unshift(sItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json (${searchIndex.length} total)`);
console.log('The Paradise updated successfully!');
