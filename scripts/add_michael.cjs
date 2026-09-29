const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

const michaelMovie = {
  id: "Michael",
  slug: "michael-2026",
  type: "movie",
  category: "Hollywood",
  score: 8.5,
  filename: "Michael.html",
  title: "Michael",
  metaTitle: "Michael (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  tag: "Highest-Grossing Biopic in History",
  tags: [
    "Michael Jackson",
    "King of Pop",
    "Highest-Grossing Biopic in History",
    "Loved by Audience",
    "Jaafar Jackson",
    "Antoine Fuqua",
    "Musical Epic",
    "Motown",
    "Thriller",
    "Off the Wall",
    "Bad"
  ],
  description: "An electrifying, monumental cinematic chronicle of the extraordinary life, musical genius, and unprecedented rise to global superstardom of Michael Jackson, the King of Pop. Directed by Antoine Fuqua and starring Jackson's nephew Jaafar Jackson in a transcendent tour-de-force performance, the film traces Michael's journey from his humble beginnings in Gary, Indiana and meteoric Motown breakout with the Jackson 5, through the record-shattering creation of Off the Wall, Thriller, and Bad. Hated by critics but deeply loved by audience worldwide, the film went on to become the Highest-Grossing Biopic in History.",
  plot: "From his earliest childhood in Gary, Indiana under the demanding, disciplined guidance of patriarch Joe Jackson (Colman Domingo), Michael Jackson reveals an otherworldly vocal and dance prodigy that catapults the Jackson 5 to unprecedented Motown fame under Berry Gordy (Larenz Tate). Propelled by his boundless artistic vision and guided by legendary producer Quincy Jones (Kendrick Sampson) and attorney John Branca (Miles Teller), Michael breaks free from family constraints to redefine modern popular music with 'Off the Wall', the epochal 'Thriller', and the stadium-shaking 'Bad'.\n\nStarring Jaafar Jackson in an uncanny, electrifying reincarnation of his uncle's physical and vocal genius, the film captures Michael's complex inner struggles, intense loneliness behind astronomical fame, and transcendent showmanship—from the historic moonwalk at Motown 25 to the creation of the greatest music videos ever made.\n\nWhile intensely polarized and criticized by film reviewers who scrutinized its reverent estate-approved narrative framing, 'Michael' ignited an overwhelming, passionate global embrace from moviegoers and lifelong music fans. Driven by sensational word-of-mouth, repeat viewings, and near-perfect audience exit scores, the film defied critical consensus to gross over $1.025 Billion worldwide, officially overtaking Bohemian Rhapsody and Oppenheimer to become the Highest-Grossing Biopic in Cinema History.",
  language: "English",
  releaseDate: "April 24, 2026",
  year: "2026",
  status: "released",
  genre: "Biography, Drama, Music",
  duration: "2hr 38mins",
  director: "Antoine Fuqua",
  writer: "John Logan",
  producer: "Graham King, John Branca, John McClain",
  boxOffice: {
    worldwideGross: "$1.025 Billion ($1,025,000,000)",
    openingWeekend: "$148.5 Million Worldwide ($68.2M Domestic / $80.3M Overseas)",
    openingDay: "$27.4 Million Domestic (USA)",
    domesticGross: "$412.5 Million ($412,500,000)",
    overseasGross: "$612.5 Million ($612,500,000)",
    budget: "$155 Million",
    verdict: "Historic Global Phenomenon — Highest-Grossing Biopic in History (Hated by Critics but Loved by Audience)",
    rank: "#1 Highest-Grossing Musical Biopic of All Time (Surpassing Bohemian Rhapsody & Oppenheimer)",
    lastUpdated: "September 2026",
    source: "Box Office Mojo, The Numbers & Deadline"
  },
  poster: "pics/Films/Michael/1.jpg",
  banner: "pics/Films/Michael/2.jpg",
  gallery: [
    {
      src: "pics/Films/Michael/1.jpg",
      alt: "Michael Theatrical Poster"
    },
    {
      src: "pics/Films/Michael/2.jpg",
      alt: "Michael Key Art - Jaafar Jackson as Michael Jackson"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8.5/10",
      url: "https://oakshow.in/Michael.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "7.3/10",
      url: "https://www.imdb.com/title/tt11378946/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Hindustan Times",
      score: "4/5",
      url: "https://www.hindustantimes.com/entertainment/hollywood/michael-review-jaafar-jackson-michael-jackson-reincarnated-biopic-hits-all-the-right-notes-antoine-fuqua-colman-domingo-101776923387373.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "India Today",
      score: "3.5/5",
      url: "https://www.indiatoday.in/movies/story/michael-jackson-biopic-highlights-musical-legacy-avoids-controversies-2900333-2026-04-23",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Common Sense Media",
      score: "3/5",
      url: "https://www.commonsensemedia.org/movie-reviews/michael-0",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "The Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/michael-movie-review-michael-jackson-biopic-never-takes-a-peek-at-the-dark-side-10652967/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "The Times of India",
      score: "2.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/michael/movie-review/130462456.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    },
    {
      source: "The Guardian",
      score: "2/5",
      url: "https://www.theguardian.com/film/2026/apr/21/michael-review-cliched-jackson-biopic-is-bland-bowdlerised-and-bad",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Den of Geek",
      score: "2/5",
      url: "https://www.denofgeek.com/movies/michael-review-sanitized-michael-jackson/",
      icon: "pics/RatingSiteLogos/denofgeek.ico"
    },
    {
      source: "NDTV",
      score: "2/5",
      url: "https://www.ndtv.com/entertainment/michael-review-jaafar-jackson-is-electric-the-movie-is-not-2-stars-11403219",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "IGN",
      score: "3/10",
      url: "https://www.ign.com/articles/michael-jackson-movie-review",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "38%",
      url: "https://www.rottentomatoes.com/m/michael",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-rotten.png"
    },
    {
      source: "Metacritic",
      score: "39/100",
      url: "https://www.metacritic.com/movie/michael-2026/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "Roger Ebert",
      score: "1/4",
      url: "https://www.rogerebert.com/reviews/michael-jackson-biopic-film-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    }
  ],
  awards: [
    {
      organization: "People's Choice Awards",
      year: "2026",
      wins: [
        {
          category: "The Movie of the Year",
          recipient: "Michael"
        },
        {
          category: "The Drama Movie of the Year",
          recipient: "Michael"
        },
        {
          category: "The Male Movie Star of the Year",
          recipient: "Jaafar Jackson"
        }
      ],
      nominations: []
    },
    {
      organization: "Hollywood Music in Media Awards (HMMA)",
      year: "2026",
      wins: [
        {
          category: "Best Music Supervision — Film",
          recipient: "John Houlihan"
        },
        {
          category: "Outstanding Sound Design & Musical Re-creation",
          recipient: "Michael Sound Team"
        }
      ],
      nominations: [
        {
          category: "Best Original Song / Musical Sequence",
          recipient: "Jaafar Jackson"
        }
      ]
    },
    {
      organization: "MTV Movie & TV Awards",
      year: "2026",
      wins: [
        {
          category: "Best Breakthrough Performance",
          recipient: "Jaafar Jackson"
        },
        {
          category: "Best Musical Moment",
          recipient: "Jaafar Jackson — 'Billie Jean' (Motown 25 Performance)"
        }
      ],
      nominations: [
        {
          category: "Best Performance in a Movie",
          recipient: "Jaafar Jackson"
        }
      ]
    },
    {
      organization: "Golden Trailer Awards",
      year: "2026",
      wins: [
        {
          category: "Best Music in a Teaser / Trailer",
          recipient: "Lionsgate & Universal Pictures"
        }
      ],
      nominations: []
    }
  ],
  cast: [
    {
      actor: "Jaafar Jackson",
      role: "Michael Jackson",
      description: "The King of Pop as an adult and solo superstar"
    },
    {
      actor: "Juliano Krue Valdi",
      role: "Young Michael Jackson",
      description: "Michael as child lead singer of the Jackson 5"
    },
    {
      actor: "Colman Domingo",
      role: "Joe Jackson",
      description: "Michael's ambitious, strict father and manager"
    },
    {
      actor: "Nia Long",
      role: "Katherine Jackson",
      description: "Michael's loving, protective mother"
    },
    {
      actor: "Miles Teller",
      role: "John Branca",
      description: "Michael's influential attorney and longtime adviser"
    },
    {
      actor: "Laura Harrier",
      role: "Suzanne de Passe",
      description: "Motown creative assistant who helped launch the Jackson 5"
    },
    {
      actor: "Jamal R. Henderson",
      role: "Jermaine Jackson",
      description: "Michael's elder brother and Jackson 5 co-lead vocalist"
    },
    {
      actor: "Tre Horton",
      role: "Marlon Jackson",
      description: "Michael's brother and Jackson 5 member"
    },
    {
      actor: "Rhyan Hill",
      role: "Tito Jackson",
      description: "Michael's brother and Jackson 5 guitarist"
    },
    {
      actor: "Joseph David-Jones",
      role: "Jackie Jackson",
      description: "The eldest Jackson brother and Jackson 5 member"
    },
    {
      actor: "Kat Graham",
      role: "Diana Ross",
      description: "Motown superstar and Michael's lifelong mentor"
    },
    {
      actor: "Larenz Tate",
      role: "Berry Gordy",
      description: "Legendary Motown Records founder"
    },
    {
      actor: "Kendrick Sampson",
      role: "Quincy Jones",
      description: "Visionary music producer behind Off the Wall, Thriller, and Bad"
    },
    {
      actor: "Jessica Sula",
      role: "La Toya Jackson",
      description: "Michael's older sister"
    },
    {
      actor: "Liv Symone",
      role: "Gladys Knight",
      description: "R&B icon who first championed the Jackson 5 to Motown"
    },
    {
      actor: "Derek Luke",
      role: "Johnnie Cochran",
      description: "High-profile defense attorney"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kozhikode/michael/buytickets/ET00470110/20260514",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/michael-movie-tickets-in-kozhikode-MV185320?srsltid=AU7gw4VuCIHhsiLxzb0wP-Og22P06t4x5xMTD4--5chQ5g5PtsWGu6qK",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/michael-2026-243301/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/michael-movie-detail-185320",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 4
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/279306-michael/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 5
    }
  ],
  watchOnline: [
    {
      provider: "JioHotstar",
      platform: "JioHotstar",
      url: "https://www.hotstar.com/in/movies/michael/1271670552?utm_source=gwa",
      icon: "pics/WatchOnline/JioHotstar.png",
      lang: "English, Hindi, Tamil, Telugu"
    },
    {
      provider: "Amazon Prime Video",
      platform: "Amazon Prime Video",
      url: "https://www.primevideo.com/dp/amzn1.dv.gti.e550f717-08ac-4492-b350-e06b87c1ad05?autoplay=0&ref_=atv_cf_strg_wb",
      icon: "pics/WatchOnline/amazon-prime.png",
      lang: "English, Hindi, Tamil, Telugu"
    },
    {
      provider: "Apple TV",
      platform: "Apple TV",
      url: "https://tv.apple.com/in/movie/michael/umc.cmc.655k6wal020m8folvcy526dff",
      icon: "pics/WatchOnline/apple.png",
      lang: "English, Hindi"
    },
    {
      provider: "Zee5",
      platform: "Zee5",
      url: "https://www.zee5.com/movies/details/michael/0-0-1z51012611?utm_source=google_web&utm_medium=watchaction&utm_campaign=google_watch&utm_content=michael",
      icon: "pics/WatchOnline/zee5.png",
      lang: "English, Hindi"
    },
    {
      provider: "YouTube Movies",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=8XiEblu6Tns",
      icon: "pics/WatchOnline/youtube.png",
      lang: "English, Hindi"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/5jEfaS4YTL0ILpHs3xT4OT",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/us/album/michael-songs-from-the-motion-picture/1883769984",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/michael-songs-from-the-motion-picture/UkSFMWX-XC8_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  socials: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/MichaelMovieOfficial",
      icon: "pics/SocialWebsiteLogos/facebook.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "Twitter / X",
      url: "https://twitter.com/MichaelMovie",
      icon: "pics/SocialWebsiteLogos/x.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/michaelmovie/",
      icon: "pics/SocialWebsiteLogos/instagram.png",
      language: "",
      label: "Connect Now"
    }
  ],
  similar: [
    {
      title: "Bohemian Rhapsody",
      link: "BohemianRhapsody.html",
      poster: "pics/Films/BohemianRhapsody/1.jpg"
    },
    {
      title: "Elvis",
      link: "Elvis.html",
      poster: "pics/Films/Elvis/1.jpg"
    },
    {
      title: "Top Gun: Maverick",
      link: "TopGunMaverick.html",
      poster: "pics/Films/TopGunMaverick/1.jpg"
    },
    {
      title: "Project Hail Mary",
      link: "ProjectHailMary.html",
      poster: "pics/Films/ProjectHailMary/1.jpg"
    }
  ],
  trailers: [
    {
      title: "Michael (2026) | Official Main Trailer - Lionsgate & Universal",
      url: "https://www.youtube.com/watch?v=3zOLzsbOleM",
      embedUrl: "https://www.youtube-nocookie.com/embed/3zOLzsbOleM",
      youtubeId: "3zOLzsbOleM",
      type: "Main Trailer"
    },
    {
      title: "Michael (2026) | Official Trailer 2 - The King of Pop",
      url: "https://www.youtube.com/watch?v=k-YAcjaLuSI",
      embedUrl: "https://www.youtube-nocookie.com/embed/k-YAcjaLuSI",
      youtubeId: "k-YAcjaLuSI",
      type: "Trailer 2"
    },
    {
      title: "Michael (2026) | Official Teaser Announcement",
      url: "https://www.youtube.com/watch?v=723RZxnDWKE",
      embedUrl: "https://www.youtube-nocookie.com/embed/723RZxnDWKE",
      youtubeId: "723RZxnDWKE",
      type: "Teaser"
    }
  ],
  videos: [
    {
      url: "https://www.youtube.com/watch?v=3zOLzsbOleM",
      youtubeId: "3zOLzsbOleM",
      title: "Michael (2026) | Official Main Trailer - Lionsgate & Universal"
    },
    {
      url: "https://www.youtube.com/watch?v=k-YAcjaLuSI",
      youtubeId: "k-YAcjaLuSI",
      title: "Michael (2026) | Official Trailer 2 - The King of Pop"
    },
    {
      url: "https://www.youtube.com/watch?v=723RZxnDWKE",
      youtubeId: "723RZxnDWKE",
      title: "Michael (2026) | Official Teaser Announcement"
    }
  ],
  articles: [
    {
      headline: "Michael review: Jaafar Jackson reincarnates Michael Jackson in biopic that hits all the right musical notes",
      url: "https://www.hindustantimes.com/entertainment/hollywood/michael-review-jaafar-jackson-michael-jackson-reincarnated-biopic-hits-all-the-right-notes-antoine-fuqua-colman-domingo-101776923387373.html",
      author: "Hindustan Times",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael Jackson biopic highlights musical legacy, avoids controversies",
      url: "https://www.indiatoday.in/movies/story/michael-jackson-biopic-highlights-musical-legacy-avoids-controversies-2900333-2026-04-23",
      author: "India Today",
      date: "April 23, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael movie review: Michael Jackson biopic never takes a peek at the dark side",
      url: "https://indianexpress.com/article/entertainment/movie-review/michael-movie-review-michael-jackson-biopic-never-takes-a-peek-at-the-dark-side-10652967/",
      author: "The Indian Express",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael review: Jaafar Jackson is electric; the movie is not",
      url: "https://www.ndtv.com/entertainment/michael-review-jaafar-jackson-is-electric-the-movie-is-not-2-stars-11403219",
      author: "NDTV",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael review: Sanitized Michael Jackson biopic focuses strictly on the musical hits",
      url: "https://www.denofgeek.com/movies/michael-review-sanitized-michael-jackson/",
      author: "Den of Geek",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael movie review & film summary (2026)",
      url: "https://www.rogerebert.com/reviews/michael-jackson-biopic-film-review-2026",
      author: "Roger Ebert",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael review – Cliched Jackson biopic is bland, bowdlerised, and bad",
      url: "https://www.theguardian.com/film/2026/apr/21/michael-review-cliched-jackson-biopic-is-bland-bowdlerised-and-bad",
      author: "The Guardian",
      date: "April 21, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael Movie Review: Antoine Fuqua delivers grand spectacle powered by Jaafar Jackson's tour-de-force",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/michael/movie-review/130462456.cms",
      author: "The Times of India",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael Review: Jaafar Jackson gives his all in an otherwise cautious King of Pop tribute",
      url: "https://www.ign.com/articles/michael-jackson-movie-review",
      author: "IGN",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/michael-0",
      author: "Common Sense Media",
      date: "April 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Michael Becomes the Highest-Grossing Biopic in Cinema History, Surpassing Bohemian Rhapsody and Oppenheimer",
      url: "https://variety.com/2026/film/box-office/michael-biopic-box-office-highest-grossing-history/",
      author: "Variety",
      date: "May 2026",
      section: "News"
    },
    {
      headline: "Hated by Critics but Loved by Fans: How Michael Conquered the Global Box Office with Over $1 Billion",
      url: "https://deadline.com/2026/05/michael-box-office-billion-dollar-biopic-audience-embrace/",
      author: "Deadline",
      date: "May 2026",
      section: "News"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Michael_(2026_film)",
  imdb: "https://www.imdb.com/title/tt11378946/",
  filePath: "E:/OakShow/Michael.html"
};

// 1. Update movies.json
console.log('Reading and updating movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const idx = movies.findIndex(m => m.id === 'Michael' || m.filename === 'Michael.html');
if (idx !== -1) {
  movies[idx] = michaelMovie;
  console.log('Updated existing Michael in movies.json');
} else {
  movies.unshift(michaelMovie);
  console.log('Inserted new Michael into movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Update search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "Michael",
  title: "Michael",
  type: "movie",
  category: "Hollywood",
  genre: "Biography, Drama, Music",
  language: "English",
  year: "2026",
  score: 8.5,
  poster: "pics/Films/Michael/1.jpg",
  url: "Michael.html",
  keywords: "Michael Jackson, King of Pop, Jaafar Jackson, Antoine Fuqua, John Logan, Graham King, Colman Domingo, Nia Long, Miles Teller, Highest Grossing Biopic, Loved by Audience"
};
const sIdx = searchIndex.findIndex(s => s.id === 'Michael' || s.url === 'Michael.html');
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
} else {
  searchIndex.unshift(searchItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');

// 3. Update reviews.json
console.log('Updating reviews.json...');
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

const reviewsToAdd = [
  {
    movieId: "Michael",
    movie: "Michael",
    author: "Hindustan Times",
    criticName: "Hindustan Times Critic",
    outlet: "Hindustan Times",
    score: "4/5",
    rating: "4/5",
    date: "April 2026",
    title: "Michael review: Jaafar Jackson reincarnates Michael Jackson in biopic that hits all the right musical notes",
    url: "https://www.hindustantimes.com/entertainment/hollywood/michael-review-jaafar-jackson-michael-jackson-reincarnated-biopic-hits-all-the-right-notes-antoine-fuqua-colman-domingo-101776923387373.html"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "India Today",
    criticName: "India Today Critic",
    outlet: "India Today",
    score: "3.5/5",
    rating: "3.5/5",
    date: "April 23, 2026",
    title: "Michael Jackson biopic highlights musical legacy, avoids controversies",
    url: "https://www.indiatoday.in/movies/story/michael-jackson-biopic-highlights-musical-legacy-avoids-controversies-2900333-2026-04-23"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "Common Sense Media",
    criticName: "Jeffrey M. Anderson",
    outlet: "Common Sense Media",
    score: "3/5",
    rating: "3/5",
    date: "April 2026",
    title: "Michael Movie Review for Parents",
    url: "https://www.commonsensemedia.org/movie-reviews/michael-0"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "The Indian Express",
    criticName: "Shalini Langer",
    outlet: "The Indian Express",
    score: "2.5/5",
    rating: "2.5/5",
    date: "April 2026",
    title: "Michael movie review: Michael Jackson biopic never takes a peek at the dark side",
    url: "https://indianexpress.com/article/entertainment/movie-review/michael-movie-review-michael-jackson-biopic-never-takes-a-peek-at-the-dark-side-10652967/"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "The Times of India",
    criticName: "Times of India Critic",
    outlet: "The Times of India",
    score: "2.5/5",
    rating: "2.5/5",
    date: "April 2026",
    title: "Michael Movie Review: Antoine Fuqua delivers grand spectacle powered by Jaafar Jackson's tour-de-force",
    url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/michael/movie-review/130462456.cms"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "The Guardian",
    criticName: "Peter Bradshaw",
    outlet: "The Guardian",
    score: "2/5",
    rating: "2/5",
    date: "April 21, 2026",
    title: "Michael review – Cliched Jackson biopic is bland, bowdlerised, and bad",
    url: "https://www.theguardian.com/film/2026/apr/21/michael-review-cliched-jackson-biopic-is-bland-bowdlerised-and-bad"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "Den of Geek",
    criticName: "David Crow",
    outlet: "Den of Geek",
    score: "2/5",
    rating: "2/5",
    date: "April 2026",
    title: "Michael review: Sanitized Michael Jackson biopic focuses strictly on the musical hits",
    url: "https://www.denofgeek.com/movies/michael-review-sanitized-michael-jackson/"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "NDTV",
    criticName: "NDTV Movies",
    outlet: "NDTV",
    score: "2/5",
    rating: "2/5",
    date: "April 2026",
    title: "Michael review: Jaafar Jackson is electric; the movie is not",
    url: "https://www.ndtv.com/entertainment/michael-review-jaafar-jackson-is-electric-the-movie-is-not-2-stars-11403219"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "IGN",
    criticName: "Matt Donato",
    outlet: "IGN",
    score: "3/10",
    rating: "3/10",
    date: "April 2026",
    title: "Michael Review: Jaafar Jackson gives his all in an otherwise cautious King of Pop tribute",
    url: "https://www.ign.com/articles/michael-jackson-movie-review"
  },
  {
    movieId: "Michael",
    movie: "Michael",
    author: "Roger Ebert",
    criticName: "Brian Tallerico",
    outlet: "Roger Ebert",
    score: "1/4",
    rating: "1/4",
    date: "April 2026",
    title: "Michael movie review & film summary (2026)",
    url: "https://www.rogerebert.com/reviews/michael-jackson-biopic-film-review-2026"
  }
];

reviewsToAdd.forEach((r, rIdx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `michael-review-${rIdx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

// 4. Update news.json
console.log('Updating news.json...');
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

const newsToAdd = [
  {
    movieId: "Michael",
    movieTitle: "Michael",
    title: "Michael Becomes the Highest-Grossing Biopic in Cinema History, Surpassing Bohemian Rhapsody and Oppenheimer",
    source: "Variety",
    date: "May 2026",
    url: "https://variety.com/2026/film/box-office/michael-biopic-box-office-highest-grossing-history/",
    category: "Hollywood"
  },
  {
    movieId: "Michael",
    movieTitle: "Michael",
    title: "Hated by Critics but Loved by Fans: How Michael Conquered the Global Box Office with Over $1 Billion",
    source: "Deadline",
    date: "May 2026",
    url: "https://deadline.com/2026/05/michael-box-office-billion-dollar-biopic-audience-embrace/",
    category: "Hollywood"
  }
];

newsToAdd.forEach((n, nIdx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `michael-news-${nIdx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

console.log('Successfully updated movies.json, search_index.json, reviews.json, and news.json with Michael!');
