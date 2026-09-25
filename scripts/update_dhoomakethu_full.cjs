const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

// 1. Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const existingIdx = movies.findIndex(m => m.id === 'Dhoomakethu' || m.filename === 'Dhoomakethu.html');

const dhoomakethuMovie = {
  id: "Dhoomakethu",
  slug: "dhoomakethu",
  type: "movie",
  category: "Indian",
  score: 8.5,
  filename: "Dhoomakethu.html",
  title: "Dhoomakethu",
  metaTitle: "Dhoomakethu (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "A groom wakes up from a disturbing premonition on the morning of his wedding and finds himself trapped in a chaotic, repeating time loop on his wedding night, desperately striving to avert disaster while dealing with eccentric family members and bizarre mysteries.",
  plot: "On the morning of his wedding, 36-year-old Kuttan (Sajin Gopu) is jolted awake by a terrifying nightmare foretelling his untimely demise. Brushing it off as pre-marital jitters, he proceeds to marry his bride (Nikhila Vimal). However, as night falls, the nightmare becomes reality—only for Kuttan to wake up and discover he is trapped in an inescapable, chaotic time loop on his wedding night. With each repetition, Kuttan must piece together baffling clues, outmaneuver suspicious relatives, and uncover an eccentric underwater mystery in order to break the bizarre cycle and save his marriage and life.",
  language: "Malayalam",
  releaseDate: "September 25, 2026",
  year: "2026",
  genre: "Comedy, Thriller, Fantasy, Sci-Fi",
  duration: "2hr 02min",
  certificate: "UA 16+",
  director: "Sudhi Maddison",
  writer: "Sonny Babu Antony, Manu Madhusudhanan",
  basedOn: "",
  boxOffice: "Upcoming",
  budget: "TBA",
  poster: "pics/Films/Dhoomakethu/1.jpeg",
  banner: "pics/Films/Dhoomakethu/2.jpeg",
  gallery: [
    {
      src: "pics/Films/Dhoomakethu/1.jpeg",
      alt: "Dhoomakethu Official Theatrical Poster"
    },
    {
      src: "pics/Films/Dhoomakethu/2.jpeg",
      alt: "Sajin Gopu and Nikhila Vimal in Dhoomakethu"
    },
    {
      src: "pics/Films/Dhoomakethu/3.jpg",
      alt: "Dhoomakethu Official Teaser Key Still"
    },
    {
      src: "pics/Films/Dhoomakethu/4.jpg",
      alt: "Anuraga Roopavathi Song Still"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8.5/10",
      url: "https://oakshow.in/Dhoomakethu.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "Anticipated",
      url: "https://www.imdb.com/title/tt38990864/",
      icon: "pics/RatingSiteLogos/imdb.png"
    }
  ],
  cast: [
    {
      actor: "Sajin Gopu",
      role: "Kuttan",
      description: "A groom who finds himself caught in an inescapable, chaotic time loop on his wedding night"
    },
    {
      actor: "Nikhila Vimal",
      role: "Bride",
      description: "Kuttan's bride navigating the bizarre, surreal events following their wedding"
    },
    {
      actor: "Shine Tom Chacko",
      role: "Key Role",
      description: "A prominent eccentric character caught up in the time loop mysteries"
    },
    {
      actor: "Sidharth Bharathan",
      role: "Key Role",
      description: "An integral family member and investigator in the escalating wedding drama"
    },
    {
      actor: "Ganapathi",
      role: "Key Role",
      description: "Kuttan's close companion trying to make sense of the absurd situations"
    },
    {
      actor: "Manju Pillai",
      role: "Key Role",
      description: "A lively, sharp-tongued family elder attending the nuptials"
    }
  ],
  trailers: [
    {
      title: "Dhoomakethu Official Main Trailer",
      url: "https://www.youtube.com/watch?v=cMAZtuZx01A",
      embedUrl: "https://www.youtube-nocookie.com/embed/cMAZtuZx01A",
      youtubeId: "cMAZtuZx01A",
      type: "Main Trailer"
    },
    {
      title: "Dhoomakethu Official Teaser",
      url: "https://www.youtube.com/watch?v=LUm_qqlLJQ0",
      embedUrl: "https://www.youtube-nocookie.com/embed/LUm_qqlLJQ0",
      youtubeId: "LUm_qqlLJQ0",
      type: "Teaser"
    },
    {
      title: "Anuraga Roopavathi (Song) - Dhoomakethu",
      url: "https://www.youtube.com/watch?v=AaB6SrPD0VI",
      embedUrl: "https://www.youtube-nocookie.com/embed/AaB6SrPD0VI",
      youtubeId: "AaB6SrPD0VI",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Dhoomakethu Official Main Trailer",
      url: "https://www.youtube.com/watch?v=cMAZtuZx01A",
      youtubeId: "cMAZtuZx01A"
    },
    {
      title: "Dhoomakethu Official Teaser",
      url: "https://www.youtube.com/watch?v=LUm_qqlLJQ0",
      youtubeId: "LUm_qqlLJQ0"
    },
    {
      title: "Anuraga Roopavathi (Song)",
      url: "https://www.youtube.com/watch?v=AaB6SrPD0VI",
      youtubeId: "AaB6SrPD0VI"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/0dYeoMIt9xPMFi8nNSfm6b",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/anuraga-roopavathi-extended-from-dhoomakethu-single/6812019191",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/dhoomakethu/S,sSgTC59g4_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kozhikode/dhoomakethu/ET00516853",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/dhoomakethu-movie-tickets-MV233319?srsltid=AU7gw4US_PlEdUSWLRlfOoSaeQdQHISvXzf9dMeMWYJmxDabQK5t9zMi",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/dhoomakethu-movie-detail-233319",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 3
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/dhoomakethu-247680/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 4
    }
  ],
  articles: [
    {
      headline: "Dhoomakethu trailer out: Sajin Gopu trapped in deadly time loop after marriage, watch",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movies/news/dhoomakethu-trailer-out-sajin-gopu-trapped-in-deadly-time-loop-after-marriage-watch/articleshow/134346652.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Sajin Gopu - Nikhila Vimal starrer Dhoomakethu locks September 25 theatrical release",
      url: "https://www.newindianexpress.com/entertainment/2026/Sep/09/malayalamnews2026sep08sajin-gopu-nikhila-vimal-starrer-dhoomakethu-postponed-to-this-date",
      author: "The New Indian Express",
      date: "September 9, 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Dhoomakethu: Happy Hours Entertainments and Sudhi Maddison team up for quirky time-loop thriller",
      url: "https://www.cinemaexpress.com/malayalam/news/2026/sep/dhoomakethu-trailer-sajin-gopu-nikhila-vimal",
      author: "Cinema Express",
      date: "September 2026",
      section: "News(Before Release)"
    }
  ],
  similar: [
    {
      title: "Maniyarayile Ashokan",
      link: "ManiyarayileAshokan.html",
      poster: "pics/Films/ManiyarayileAshokan/2.jpg"
    },
    {
      title: "Kumbalangi Nights",
      link: "KumbalangiNights.html",
      poster: "pics/Films/KumbalangiNights/2.jpg"
    },
    {
      title: "The Priest",
      link: "ThePriest.html",
      poster: "pics/Films/ThePriest/2.jpg"
    },
    {
      title: "Varane Avashyamund",
      link: "VaraneAvashyamund.html",
      poster: "pics/Films/VaraneAvashyamund/2.jpg"
    },
    {
      title: "Bethlehem Kudumba Unit",
      link: "BethlehemKudumbaUnit.html",
      poster: "pics/Films/BethlehemKudumbaUnit/2.jpg"
    },
    {
      title: "Kilometers and Kilometers",
      link: "KilometersandKilometers.html",
      poster: "pics/Films/KilometersandKilometers/2.jpg"
    }
  ],
  wikipedia: "",
  imdb: "https://www.imdb.com/title/tt38990864/",
  status: "upcoming"
};

// Remove if exists, then unshift to the front of movies array
if (existingIdx !== -1) {
  movies.splice(existingIdx, 1);
}
movies.unshift(dhoomakethuMovie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed Dhoomakethu at index 0 in movies.json (${movies.length} total)`);

// 2. Update search_index.json (unshift to front)
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchIdx = searchIndex.findIndex(s => s.id === 'Dhoomakethu' || s.url === 'Dhoomakethu.html');
const sItem = {
  id: "Dhoomakethu",
  title: "Dhoomakethu",
  type: "movie",
  category: "Indian",
  year: "2026",
  genre: "Comedy, Thriller, Fantasy, Sci-Fi",
  language: "Malayalam",
  score: 8.5,
  poster: "pics/Films/Dhoomakethu/1.jpeg",
  status: "upcoming",
  url: "Dhoomakethu.html"
};
if (searchIdx !== -1) {
  searchIndex.splice(searchIdx, 1);
}
searchIndex.unshift(sItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Placed Dhoomakethu at index 0 in search_index.json (${searchIndex.length} total)`);

// 3. Update news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const dhoomakethuNewsItems = [
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Dhoomakethu trailer out: Sajin Gopu trapped in deadly time loop after marriage, watch",
    source: "Times of India",
    date: "September 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movies/news/dhoomakethu-trailer-out-sajin-gopu-trapped-in-deadly-time-loop-after-marriage-watch/articleshow/134346652.cms",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Sajin Gopu - Nikhila Vimal starrer Dhoomakethu locks September 25 theatrical release",
    source: "The New Indian Express",
    date: "September 9, 2026",
    url: "https://www.newindianexpress.com/entertainment/2026/Sep/09/malayalamnews2026sep08sajin-gopu-nikhila-vimal-starrer-dhoomakethu-postponed-to-this-date",
    category: "Mollywood"
  },
  {
    movieId: "Dhoomakethu",
    movieTitle: "Dhoomakethu",
    title: "Dhoomakethu: Happy Hours Entertainments and Sudhi Maddison team up for quirky time-loop thriller",
    source: "Cinema Express",
    date: "September 2026",
    url: "https://www.cinemaexpress.com/malayalam/news/2026/sep/dhoomakethu-trailer-sajin-gopu-nikhila-vimal",
    category: "Mollywood"
  }
];

dhoomakethuNewsItems.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `dhoomakethu-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`Updated news.json with Dhoomakethu articles (${news.length} total)`);

// 4. Update releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
const sep2026 = releases.find(r => r.id === 'IndianReleases2026September');
if (sep2026) {
  const itemIdx = sep2026.items.findIndex(it => it.title === 'Dhoomakethu' || it.moreLink === 'Dhoomakethu.html');
  const dItem = {
    title: "Dhoomakethu",
    poster: "pics/Films/Dhoomakethu/1.jpeg",
    alt: "Dhoomakethu",
    language: "Malayalam",
    category: "Indian",
    releaseDate: "September 25, 2026",
    genre: "Comedy, Thriller, Fantasy, Sci-Fi",
    moreLink: "Dhoomakethu.html",
    trailerLink: "https://www.youtube.com/watch?v=cMAZtuZx01A",
    ratings: [
      {
        source: "OakShow",
        score: "8.5/10",
        url: "Dhoomakethu.html",
        icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
      },
      {
        source: "IMDb",
        score: "Anticipated",
        url: "https://www.imdb.com/title/tt38990864/",
        icon: "pics/RatingSiteLogos/imdb.png"
      }
    ]
  };
  if (itemIdx !== -1) {
    sep2026.items[itemIdx] = dItem;
  } else {
    sep2026.items.push(dItem);
  }
  sep2026.totalItems = sep2026.items.length;
  fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
  console.log(`Updated IndianReleases2026September in releases.json (${sep2026.totalItems} items)`);
}

console.log('All catalog JSON files successfully updated for Dhoomakethu!');
