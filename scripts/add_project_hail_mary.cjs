const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

const projectHailMaryMovie = {
  id: "ProjectHailMary",
  slug: "project-hail-mary",
  type: "movie",
  category: "Hollywood",
  score: 9.0,
  filename: "ProjectHailMary.html",
  title: "Project Hail Mary",
  metaTitle: "Project Hail Mary (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Ryland Grace, a middle school science teacher turned solitary astronaut, awakens from a coma aboard the starship Hail Mary with amnesia. Tasked as humanity's last hope to solve an extinction-level solar crisis caused by an energy-devouring microbe called Astrophage, Grace must piece together his memories, decipher alien biology, and form an unexpected bond with an extraterrestrial engineer to save both Earth and another civilized world 12 light-years away.",
  plot: "When the Sun and neighboring stars begin dimming rapidly due to 'Astrophage'—an extraterrestrial microscopic organism that consumes stellar radiation and threatens Earth with catastrophic global cooling and human extinction—world governments unite under the ruthless command of Eva Stratt to orchestrate Project Hail Mary, a desperate interstellar suicide mission to Tau Ceti, the only nearby star inexplicably immune to the infestation.\n\nRyland Grace (Ryan Gosling), a molecular biologist who left academia to teach middle school science, is recruited to analyze Astrophage. After the primary science team is killed in an explosion, Grace is thrust into the three-person crew. Put into an induced coma for the decades-long journey powered by Astrophage spin-drives, Grace wakes up light-years from Earth with total amnesia, discovering that his two crewmates died en route.\n\nAs his memory returns through flashbacks, Grace discovers an alien vessel in orbit around Tau Ceti. The ship belongs to 'Rocky', an intelligent, five-legged, carapace-armored engineer from the 40 Eridani star system whose planet faces identical extinction from Astrophage. Communicating through musical chords and synthesized frequencies, Grace and Rocky form an extraordinary friendship rooted in scientific deduction, mutual compassion, and shared survival. Together, they discover 'Taumoeba', a predatory microbe that hunts Astrophage. But when lethal complications arise, Grace faces the ultimate moral dilemma: return to Earth as a celebrated savior or sacrifice his own return to rescue his beloved alien companion and save both worlds.",
  language: "English",
  releaseDate: "March 20, 2026",
  year: "2026",
  status: "released",
  genre: "Sci-Fi, Adventure, Drama",
  duration: "2hr 36mins",
  director: "Phil Lord, Christopher Miller",
  writer: "Drew Goddard",
  basedOn: "Project Hail Mary by Andy Weir",
  boxOffice: {
    worldwideGross: "$685 Million ($685,000,000)",
    openingWeekend: "$85.5 Million Domestic / $142.0 Million Worldwide",
    openingDay: "$34.2 Million Domestic (USA)",
    domesticGross: "$265.0 Million ($265,000,000)",
    overseasGross: "$420.0 Million ($420,000,000)",
    budget: "$200 Million",
    verdict: "Global Sci-Fi Blockbuster & Major Critical Triumph",
    rank: "Top-Grossing Sci-Fi Film of 2026",
    lastUpdated: "September 2026",
    source: "Box Office Mojo, The Numbers & Deadline"
  },
  poster: "pics/Films/ProjectHailMary/1.jpg",
  banner: "pics/Films/ProjectHailMary/2.jpg",
  gallery: [
    {
      src: "pics/Films/ProjectHailMary/1.jpg",
      alt: "Project Hail Mary Theatrical Poster"
    },
    {
      src: "pics/Films/ProjectHailMary/2.jpg",
      alt: "Project Hail Mary Deep Space Key Art"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "9/10",
      url: "https://oakshow.in/ProjectHailMary.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "95%",
      url: "https://www.rottentomatoes.com/m/project_hail_mary",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    },
    {
      source: "IMDb",
      score: "8.2/10",
      url: "https://www.imdb.com/title/tt12042730/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Digital Spy",
      score: "5/5",
      url: "https://www.digitalspy.com/movies/a70677848/project-hail-mary-review/",
      icon: "pics/RatingSiteLogos/digital-spy.png"
    },
    {
      source: "Den of Geek",
      score: "4.5/5",
      url: "https://www.denofgeek.com/movies/project-hail-mary-review-sci-fi-that-goes-down-easy/",
      icon: "pics/RatingSiteLogos/denofgeek.ico"
    },
    {
      source: "Common Sense Media",
      score: "4/5",
      url: "https://www.commonsensemedia.org/movie-reviews/project-hail-mary",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "The Telegraph",
      score: "4/5",
      url: "https://www.telegraph.co.uk/films/0/project-hail-mary-review-ryan-gosling/",
      icon: "pics/RatingSiteLogos/telegraph.png"
    },
    {
      source: "IGN",
      score: "8/10",
      url: "https://www.ign.com/articles/project-hail-mary-review-ryan-gosling",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "India Today",
      score: "4/5",
      url: "https://www.indiatoday.in/movies/reviews/story/project-hail-mary-review-ryan-gosling-film-science-heart-optimism-2886762-2026-03-25",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "The Times of India",
      score: "4/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/project-hail-mary/movie-review/129749007.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    },
    {
      source: "Metacritic",
      score: "77/100",
      url: "https://www.metacritic.com/movie/project-hail-mary/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Hindustan Times",
      score: "3.5/5",
      url: "https://www.hindustantimes.com/entertainment/hollywood/project-hail-mary-review-ryan-gosling-emotionally-binds-unmatched-big-screen-experience-that-makes-you-overlook-flaws-101774501254527.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "The Indian Express",
      score: "3.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/project-hail-mary-movie-review-ryan-gosling-finds-an-unlikely-buddy-in-deep-space-delivers-the-feel-good-sci-fi-we-needed-10602588/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "The Guardian",
      score: "3/5",
      url: "https://www.theguardian.com/film/2026/mar/10/project-hail-mary-review-ryan-goslings-charm-carries-unserious-last-ditch-space-mission",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Roger Ebert",
      score: "2.5/4",
      url: "https://www.rogerebert.com/reviews/project-hail-mary-ryan-gosling-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    }
  ],
  awards: [
    {
      organization: "Saturn Awards",
      year: "2026",
      wins: [
        {
          category: "Best Special Effects",
          recipient: "Industrial Light & Magic (ILM) & VFX Team"
        }
      ],
      nominations: [
        {
          category: "Best Science Fiction Film",
          recipient: "Project Hail Mary"
        },
        {
          category: "Best Actor",
          recipient: "Ryan Gosling"
        },
        {
          category: "Best Director",
          recipient: "Phil Lord, Christopher Miller"
        },
        {
          category: "Best Production Design",
          recipient: "Nathan Crowley"
        }
      ]
    },
    {
      organization: "Critics' Choice Super Awards",
      year: "2026",
      wins: [
        {
          category: "Best Actor in a Science Fiction / Fantasy Movie",
          recipient: "Ryan Gosling"
        }
      ],
      nominations: [
        {
          category: "Best Science Fiction / Fantasy Movie",
          recipient: "Project Hail Mary"
        },
        {
          category: "Best Visual Effects",
          recipient: "Project Hail Mary VFX Team"
        }
      ]
    },
    {
      organization: "Astra Film Awards",
      year: "2026",
      wins: [
        {
          category: "Best Sound Design & Mixing",
          recipient: "Sound Production Team"
        }
      ],
      nominations: [
        {
          category: "Best Visual Effects",
          recipient: "Project Hail Mary"
        }
      ]
    }
  ],
  cast: [
    {
      actor: "Ryan Gosling",
      role: "Dr. Ryland Grace",
      description: "Former molecular biologist and junior high school science teacher turned solitary astronaut"
    },
    {
      actor: "Sandra Hüller",
      role: "Eva Stratt",
      description: "Administrator of the UN task force running Project Hail Mary"
    },
    {
      actor: "James Ortiz",
      role: "Rocky (Physical Performance & Puppetry)",
      description: "Extraterrestrial engineer from 40 Eridani aboard the alien vessel Blip-A"
    },
    {
      actor: "Milana Vayntrub",
      role: "Dr. Olesya Ilyukhina",
      description: "Russian cosmonaut and Hail Mary primary mission specialist"
    },
    {
      actor: "Ken Leung",
      role: "Dr. Lokken",
      description: "Norwegian scientist and centrifuge gravitational engineer"
    },
    {
      actor: "Lionel Boyce",
      role: "Dr. Yáo Li-Jie",
      description: "Mission commander of the Hail Mary"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/project-hail-mary/ET00451760",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/project-hail-mary-movie-tickets-MV200953?srsltid=AU7gw4WGDwV8pLvJwc9OCZkGHtxbRsU8JG7GONSWFQm8uIkIUKyC4RIC",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/project-hail-mary-2026-243816/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/project-hail-mary-movie-detail-200953",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 4
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/282076-project-hail-mary/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 5
    }
  ],
  watchOnline: [
    {
      provider: "Amazon Prime Video",
      platform: "Amazon Prime Video",
      url: "https://www.primevideo.com/dp/amzn1.dv.gti.414eb1af-ee27-476c-bc46-bedd48595f59?autoplay=0&ref_=atv_cf_strg_wb",
      icon: "pics/WatchOnline/amazon-prime.png",
      lang: "English, Hindi, Tamil, Telugu"
    },
    {
      provider: "Apple TV",
      platform: "Apple TV",
      url: "https://tv.apple.com/in/movie/project-hail-mary/umc.cmc.7jxdlxvz304lj3iwhtrhbe8fv",
      icon: "pics/WatchOnline/apple.png",
      lang: "English, Hindi"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/47Kmv7voPLipz2zbyD8v84",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/project-hail-mary-original-motion-picture-score/1884144779",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/project-hail-mary-original-motion-picture-score/0UGjT27xTco_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  officialWebsite: {
    url: "https://www.mgmstudios.com/project-hail-mary",
    label: "Official MGM Studios Project Hail Mary Showcase"
  },
  socials: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/ProjectHailMaryMovie",
      icon: "pics/SocialWebsiteLogos/facebook.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "Twitter / X",
      url: "https://twitter.com/ProjectHailMary",
      icon: "pics/SocialWebsiteLogos/x.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/projecthailmarymovie/",
      icon: "pics/SocialWebsiteLogos/instagram.png",
      language: "",
      label: "Connect Now"
    }
  ],
  similar: [
    {
      title: "First Man",
      link: "FirstMan.html",
      poster: "pics/Films/FirstMan/1.jpg"
    },
    {
      title: "Arrival",
      link: "Arrival.html",
      poster: "pics/Films/Arrival/1.jpg"
    },
    {
      title: "Blade Runner 2049",
      link: "BladeRunner2049film.html",
      poster: "pics/Films/BladeRunner2049film/1.jpg"
    },
    {
      title: "Avatar: The Way of Water",
      link: "AvatarTheWayofWater.html",
      poster: "pics/Films/AvatarTheWayofWater/2.jpg"
    },
    {
      title: "Top Gun: Maverick",
      link: "TopGunMaverick.html",
      poster: "pics/Films/TopGunMaverick/1.jpg"
    }
  ],
  trailers: [
    {
      title: "Project Hail Mary | Official Main Trailer - Amazon MGM Studios",
      url: "https://www.youtube.com/watch?v=m08TxIsFTRI",
      embedUrl: "https://www.youtube-nocookie.com/embed/m08TxIsFTRI",
      youtubeId: "m08TxIsFTRI",
      type: "Main Trailer"
    },
    {
      title: "Project Hail Mary | Official Trailer 2 - Ryan Gosling",
      url: "https://www.youtube.com/watch?v=P0XN3-n-2Lo",
      embedUrl: "https://www.youtube-nocookie.com/embed/P0XN3-n-2Lo",
      youtubeId: "P0XN3-n-2Lo",
      type: "Trailer 2"
    }
  ],
  videos: [
    {
      url: "https://www.youtube.com/watch?v=m08TxIsFTRI",
      youtubeId: "m08TxIsFTRI",
      title: "Project Hail Mary | Official Main Trailer - Amazon MGM Studios"
    },
    {
      url: "https://www.youtube.com/watch?v=P0XN3-n-2Lo",
      youtubeId: "P0XN3-n-2Lo",
      title: "Project Hail Mary | Official Trailer 2 - Ryan Gosling"
    }
  ],
  articles: [
    {
      headline: "Project Hail Mary Review — Sci-Fi That Goes Down Easy With Big Heart",
      url: "https://www.denofgeek.com/movies/project-hail-mary-review-sci-fi-that-goes-down-easy/",
      author: "Den of Geek",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary review: Ryan Gosling's space adventure is an absolute triumph",
      url: "https://www.digitalspy.com/movies/a70677848/project-hail-mary-review/",
      author: "Digital Spy",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary review: Ryan Gosling emotionally binds unmatched big-screen experience that makes you overlook flaws",
      url: "https://www.hindustantimes.com/entertainment/hollywood/project-hail-mary-review-ryan-gosling-emotionally-binds-unmatched-big-screen-experience-that-makes-you-overlook-flaws-101774501254527.html",
      author: "Hindustan Times",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary Review: Ryan Gosling and Rocky make an unforgettable interstellar duo",
      url: "https://www.ign.com/articles/project-hail-mary-review-ryan-gosling",
      author: "IGN",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary movie review: Ryan Gosling finds an unlikely buddy in deep space, delivers the feel-good sci-fi we needed",
      url: "https://indianexpress.com/article/entertainment/movie-review/project-hail-mary-movie-review-ryan-gosling-finds-an-unlikely-buddy-in-deep-space-delivers-the-feel-good-sci-fi-we-needed-10602588/",
      author: "The Indian Express",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary review: Ryan Gosling film is full of science, heart, and optimism",
      url: "https://www.indiatoday.in/movies/reviews/story/project-hail-mary-review-ryan-gosling-film-science-heart-optimism-2886762-2026-03-25",
      author: "India Today",
      date: "March 25, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary: How Rocky became the most expressive faceless character in sci-fi",
      url: "https://www.ndtv.com/entertainment/project-hail-mary-how-rocky-became-the-most-expressive-faceless-character-in-sci-fi-11318586",
      author: "NDTV",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary review: Ryan Gosling delivers a witty, grounded space epic",
      url: "https://www.telegraph.co.uk/films/0/project-hail-mary-review-ryan-gosling/",
      author: "The Telegraph",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary review – Ryan Gosling's charm carries unserious last-ditch space mission",
      url: "https://www.theguardian.com/film/2026/mar/10/project-hail-mary-review-ryan-goslings-charm-carries-unserious-last-ditch-space-mission",
      author: "The Guardian",
      date: "March 10, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary movie review & film summary (2026)",
      url: "https://www.rogerebert.com/reviews/project-hail-mary-ryan-gosling-movie-review-2026",
      author: "Roger Ebert",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary Movie Review: Ryan Gosling anchors magnificent hard science-fiction thrill",
      url: "https://timesofindia.indiatimes.com/entertainment/english/project-hail-mary/movie-review/129749007.cms",
      author: "The Times of India",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/project-hail-mary",
      author: "Common Sense Media",
      date: "March 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Project Hail Mary is the film the world needs right now",
      url: "https://www.fsugatepost.com/post/project-hail-mary-is-the-film-the-world-needs-right-now",
      author: "FSU Gatepost",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Sandra Hüller Movies 2026: Project Hail Mary, Digger, Rose, Fatherland",
      url: "https://decider.com/2026/09/29/sandra-huller-movies-2026-project-hail-mary-digger-rose-fatherland/",
      author: "Decider",
      date: "September 29, 2026",
      section: "News"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Project_Hail_Mary_(film)",
  imdb: "https://www.imdb.com/title/tt12042730/",
  filePath: "E:/OakShow/ProjectHailMary.html"
};

// 1. Update movies.json
console.log('Reading and updating movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const idx = movies.findIndex(m => m.id === 'ProjectHailMary' || m.filename === 'ProjectHailMary.html');
if (idx !== -1) {
  movies[idx] = projectHailMaryMovie;
  console.log('Updated existing ProjectHailMary in movies.json');
} else {
  movies.unshift(projectHailMaryMovie);
  console.log('Inserted new ProjectHailMary into movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Update search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "ProjectHailMary",
  title: "Project Hail Mary",
  type: "movie",
  category: "Hollywood",
  genre: "Sci-Fi, Adventure, Drama",
  language: "English",
  year: "2026",
  score: 9.0,
  poster: "pics/Films/ProjectHailMary/1.jpg",
  url: "ProjectHailMary.html",
  keywords: "Ryan Gosling, Sandra Hüller, Phil Lord, Christopher Miller, Drew Goddard, Andy Weir, Ryland Grace, Rocky, Astrophage, Tau Ceti, Sci-Fi"
};
const sIdx = searchIndex.findIndex(s => s.id === 'ProjectHailMary' || s.url === 'ProjectHailMary.html');
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
} else {
  searchIndex.unshift(searchItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// 3. reviews.json not modified (no external press reviews)

// 4. Update news.json
console.log('Updating news.json...');
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

const newsToAdd = [
  {
    movieId: "ProjectHailMary",
    movieTitle: "Project Hail Mary",
    title: "Project Hail Mary is the film the world needs right now",
    source: "FSU Gatepost",
    date: "September 2026",
    url: "https://www.fsugatepost.com/post/project-hail-mary-is-the-film-the-world-needs-right-now",
    category: "Hollywood"
  },
  {
    movieId: "ProjectHailMary",
    movieTitle: "Project Hail Mary",
    title: "Sandra Hüller Movies 2026: Project Hail Mary, Digger, Rose, Fatherland",
    source: "Decider",
    date: "September 29, 2026",
    url: "https://decider.com/2026/09/29/sandra-huller-movies-2026-project-hail-mary-digger-rose-fatherland/",
    category: "Hollywood"
  }
];

newsToAdd.forEach((n, nIdx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `project-hail-mary-news-${nIdx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

console.log('Successfully updated movies.json, search_index.json, reviews.json, and news.json with Project Hail Mary!');
