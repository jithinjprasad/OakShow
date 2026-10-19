const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const newsPath = path.join(rootDir, 'data', 'news.json');
const releasesPath = path.join(rootDir, 'data', 'releases.json');

console.log('=== Updating Jailer 2 as Released Movie in OakShow ===');

// 1. Define Jailer 2 Movie Data
const jailer2Movie = {
  id: "Jailer2",
  slug: "jailer-2",
  type: "movie",
  category: "Indian",
  score: 7.2,
  filename: "Jailer2.html",
  fileName: "Jailer2.html",
  title: "Jailer 2",
  metaTitle: "Jailer 2 (2026) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Tiger Muthuvel Pandian returns to confront an all-new criminal underworld and the formidable Kalpak family syndicate led by Bodhi and Chakri, in Nelson Dilipkumar's explosive high-octane action thriller sequel.",
  plot: "Three months after dismantling Varman's idol-smuggling syndicate, retired jailer Tiger Muthuvel Pandian (Rajinikanth) is living quietly near the Kerala-Tamil Nadu border. However, Varman's ruthless associate Dileep (Suraj Venjaramoodu) and an investigator named Mukund track him down to avenge Varman. As danger closes in on Muthuvel's family, they are protected by his trusted pan-Indian allies Mathew (Mohanlal), Narasimha (Shiva Rajkumar), and Kamdev (Jackie Shroff). Soon, Muthuvel is pulled into an all-out war against the formidable Kalpak crime family operating from Goa, led by the calculating Bodhi Kalpak (S. J. Suryah), his patriarch father Chakri (Mithun Chakraborty), and sister Kantha (Vidya Balan). Armed with tactical brilliance, formidable undercover allies, and lethal explosive retribution, Muthuvel wages a relentless battle to safeguard his loved ones and obliterate the syndicate once and for all.",
  language: "Tamil",
  releaseDate: "October 15, 2026",
  year: "2026",
  status: "released",
  genre: "Action, Crime, Thriller, Comedy",
  duration: "2hr 45min",
  certificate: "UA 16+",
  director: "Nelson Dilipkumar",
  writer: "Nelson Dilipkumar",
  basedOn: "",
  producers: "Kalanithi Maran",
  productionCompanies: "Sun Pictures",
  musicDirector: "Anirudh Ravichander",
  cinematography: "Vijay Kartik Kannan",
  editing: "R. Nirmal",
  boxOffice: {
    budget: "₹250–350 crore",
    worldwideGross: "₹424.25 crore ($51 million in 4 Days)",
    openingDay: "₹120 crore (Worldwide Opening Day)",
    openingWeekend: "₹424.25 crore (4-Day Opening Weekend)",
    indiaGross: "₹260+ crore",
    overseasGross: "₹164+ crore ($19.7M)",
    verdict: "Blockbuster Opening / Highest-Grossing Tamil Film of 2026",
    source: "Sacnilk / Trade Estimates / NDTV / The Telegraph",
    lastUpdated: "October 19, 2026 (Day 4)"
  },
  budget: "₹250–350 crore",
  awards: [],
  poster: "pics/Films/Jailer2/1.jpeg",
  banner: "pics/Films/Jailer2/2.jpeg",
  gallery: [
    {
      src: "pics/Films/Jailer2/1.jpeg",
      alt: "Jailer 2 Official Theatrical Poster"
    },
    {
      src: "pics/Films/Jailer2/2.jpeg",
      alt: "Jailer 2 Banner & Key Art"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "7.2/10",
      url: "https://oakshow.in/Jailer2.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-this-one-is-above-average.png"
    },
    {
      source: "IMDb",
      score: "8.1/10",
      url: "https://www.imdb.com/title/tt33318732/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "91%",
      url: "https://www.rottentomatoes.com/m/jailer_2",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    },
    {
      source: "NDTV",
      score: "3.5/5",
      url: "https://www.ndtv.com/entertainment/jailer-2-review-a-solid-commercial-entertainer-thanks-to-superstar-rajinikanth-3-5-stars-12188670",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "Times of India",
      score: "3.0/5",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/jailer-2/movie-review/134961587.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "India Today",
      score: "3.0/5",
      url: "https://www.indiatoday.in/movies/reviews/story/jailer-2-movie-review-rajinikanth-swagger-and-nelsons-humour-strike-gold-again-3017726-2026-10-15",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Hindustan Times",
      score: "3.0/5",
      url: "https://www.hindustantimes.com/entertainment/tamil-cinema/jailer-2-movie-review-75-year-old-rajinikanth-aura-farms-for-3-hours-in-a-nelson-dilipkumar-film-and-it-is-all-fans-need-sometimes-101792042345652.html",
      icon: "pics/RatingSiteLogos/hindustan-times.png"
    },
    {
      source: "Roger Ebert",
      score: "2.5/4",
      url: "https://www.rogerebert.com/reviews/jailer-2-rajinikanth-movie-review-2026",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "The Indian Express",
      score: "2.5/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/jailer-2-movie-review-rajinikanth-supreme-aura-carries-nelsons-uneven-action-thriller-10922256/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    }
  ],
  cast: [
    { actor: "Rajinikanth", role: "Tiger Muthuvel Pandian IPS" },
    { actor: "S. J. Suryah", role: "Bodhi Kalpak" },
    { actor: "Mithun Chakraborty", role: "Chakri Kalpak" },
    { actor: "Suraj Venjaramoodu", role: "Dileep" },
    { actor: "Vidya Balan", role: "Kantha Kalpak" },
    { actor: "Ramya Krishnan", role: "Vijaya 'Viji' Pandian" },
    { actor: "Yogi Babu", role: "Taxi Driver Vimal" },
    { actor: "Mirnaa", role: "Swetha Pandian" },
    { actor: "Rithvik", role: "Rithvik 'Rithu' Pandian" },
    { actor: "Jatin Sarna", role: "Ved Kalpak" },
    { actor: "Hakim Shahjahan", role: "Sharva Kalpak" },
    { actor: "Anna Rajan", role: "Dileep's Wife" },
    { actor: "Meghana Raj", role: "Narasimha's Wife" },
    { actor: "Namo Narayana", role: "Moorthi" },
    { actor: "Bagavathi Perumal", role: "Bhaskar" },
    { actor: "Kottayam Nazeer", role: "Ameer" },
    { actor: "Sunil Sukhada", role: "Benjamin" },
    { actor: "Sujith Shankar", role: "Mukund" },
    { actor: "Bjorn Surrao", role: "Kohli" },
    { actor: "Jaffer Sadiq", role: "Debnath" },
    { actor: "Mohanlal", role: "Mathew (Cameo Appearance)" },
    { actor: "Shiva Rajkumar", role: "Narasimha (Cameo Appearance)" },
    { actor: "Hrithik Roshan", role: "Roddy (Cameo Appearance)" },
    { actor: "Jackie Shroff", role: "Kamdev (Cameo Appearance)" },
    { actor: "Vijay Sethupathi", role: "Police Officer / Informer (Cameo Appearance)" },
    { actor: "Vinayakan", role: "Varman (Special Appearance)" },
    { actor: "Vasanth Ravi", role: "ACP Arjun Pandian IPS (Cameo Appearance)" },
    { actor: "Nora Fatehi", role: "Special Appearance in Song 'Bindaas'" }
  ],
  trailers: [
    {
      title: "Jailer 2 Official Announcement Teaser",
      url: "https://www.youtube.com/watch?v=aaNq2NL6D4A",
      embedUrl: "https://www.youtube-nocookie.com/embed/aaNq2NL6D4A",
      youtubeId: "aaNq2NL6D4A",
      type: "Teaser"
    },
    {
      title: "Release Date Announcement",
      url: "https://www.youtube.com/watch?v=ugzPkXEqff4",
      embedUrl: "https://www.youtube-nocookie.com/embed/ugzPkXEqff4",
      youtubeId: "ugzPkXEqff4",
      type: "Announcement"
    },
    {
      title: "Suraj Venjaramoodu As Dileep (Character Glimpse)",
      url: "https://www.youtube.com/watch?v=V1Qir5w7so4",
      embedUrl: "https://www.youtube-nocookie.com/embed/V1Qir5w7so4",
      youtubeId: "V1Qir5w7so4",
      type: "Character Promo"
    },
    {
      title: "SJ Suryah As Bodhi (Character Glimpse)",
      url: "https://www.youtube.com/watch?v=lzar-5xGA3o",
      embedUrl: "https://www.youtube-nocookie.com/embed/lzar-5xGA3o",
      youtubeId: "lzar-5xGA3o",
      type: "Character Promo"
    },
    {
      title: "Hukum Reloaded from Jailer 2 (Song)",
      url: "https://www.youtube.com/watch?v=hIHUeuw2yj8",
      embedUrl: "https://www.youtube-nocookie.com/embed/hIHUeuw2yj8",
      youtubeId: "hIHUeuw2yj8",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Jailer 2 Official Announcement Teaser",
      url: "https://www.youtube.com/watch?v=aaNq2NL6D4A",
      youtubeId: "aaNq2NL6D4A"
    },
    {
      title: "Release Date Announcement",
      url: "https://www.youtube.com/watch?v=ugzPkXEqff4",
      youtubeId: "ugzPkXEqff4"
    },
    {
      title: "Suraj Venjaramoodu As Dileep",
      url: "https://www.youtube.com/watch?v=V1Qir5w7so4",
      youtubeId: "V1Qir5w7so4"
    },
    {
      title: "SJ Suryah As Bodhi",
      url: "https://www.youtube.com/watch?v=lzar-5xGA3o",
      youtubeId: "lzar-5xGA3o"
    },
    {
      title: "Song: Hukum Reloaded",
      url: "https://www.youtube.com/watch?v=hIHUeuw2yj8",
      youtubeId: "hIHUeuw2yj8"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/1uwOU5ZjczJJozQkhzrGJr",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Jailer 2 Soundtrack on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/jailer-2-original-motion-picture-soundtrack/6817733404",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/jailer-2-original-motion-picture-soundtrack/zg-RfbPQuWM_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    },
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/3fehKTRZv5h2otLpjVOJq6",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen to Hukum Reloaded Single on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/hukum-reloaded-from-jailer-2-single/1790376515",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Hukum Reloaded Single on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/hukum-reloaded-tamil-from-jailer-2/HFN9QrK4GNE_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Hukum Reloaded Single on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/kochi/jailer-2/ET00522227",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/jailer-2-movie-tickets-MV187766?srsltid=AU7gw4VPNcGisJHqvjDUYHWkmNCIbfKSWlk6tBrvh0d1dbhAZB1AfTRH",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book on District",
      rank: 2
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/jailer-2-movie-detail-187766",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 3
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/jailer-2-247862/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 4
    },
    {
      provider: "Cineworld",
      url: "https://www.cineworld.co.uk/films/1000018264-jailer-2/",
      icon: "pics/BookngWebSiteLogos/cineworld.png",
      label: "Book on Cineworld",
      rank: 5
    }
  ],
  articles: [
    {
      headline: "Jailer 2 movie review: 75-year-old Rajinikanth aura farms for 3 hours in a Nelson Dilipkumar film and it is all fans need sometimes",
      url: "https://www.hindustantimes.com/entertainment/tamil-cinema/jailer-2-movie-review-75-year-old-rajinikanth-aura-farms-for-3-hours-in-a-nelson-dilipkumar-film-and-it-is-all-fans-need-sometimes-101792042345652.html",
      author: "Hindustan Times",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 movie review: Rajinikanth’s supreme aura carries Nelson’s uneven action thriller",
      url: "https://indianexpress.com/article/entertainment/movie-review/jailer-2-movie-review-rajinikanth-supreme-aura-carries-nelsons-uneven-action-thriller-10922256/",
      author: "The Indian Express",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 movie review: Rajinikanth swagger and Nelson's humour strike gold again",
      url: "https://www.indiatoday.in/movies/reviews/story/jailer-2-movie-review-rajinikanth-swagger-and-nelsons-humour-strike-gold-again-3017726-2026-10-15",
      author: "India Today",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 review: Rajinikanth is the main attraction in Nelson Dilipkumar's entertaining sequel",
      url: "https://www.telegraphindia.com/entertainment/jailer-2-review-rajinikanth-is-the-main-attraction-in-nelson-dilipkumars-entertaining-sequel/cid/2185010",
      author: "The Telegraph",
      date: "October 16, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 movie review: Superstar Rajinikanth and Nelson team up for an electrifying commercial sequel",
      url: "https://www.thehindu.com/entertainment/movies/jailer-2-movie-review-superstar-rajinikanth-nelson-shivarajkumar-mohanlal-anirudh-ravichander/article71587540.ece",
      author: "The Hindu",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 Movie Review: Rajinikanth and Nelson Deliver High-Octane Spectacle",
      url: "https://www.rogerebert.com/reviews/jailer-2-rajinikanth-movie-review-2026",
      author: "Roger Ebert",
      date: "October 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 Review: A Solid Commercial Entertainer Thanks To Superstar Rajinikanth",
      url: "https://www.ndtv.com/entertainment/jailer-2-review-a-solid-commercial-entertainer-thanks-to-superstar-rajinikanth-3-5-stars-12188670",
      author: "NDTV",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 Movie Review: Rajinikanth's mass power and Nelson's quirky style create a box office feast",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/jailer-2/movie-review/134961587.cms",
      author: "Times of India",
      date: "October 15, 2026",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer 2 box office collection day 2: Rajinikanth film earns Rs 209 crore worldwide",
      url: "https://indianexpress.com/article/entertainment/tamil/jailer-2-box-office-collection-day-2-live-updates-rajinikanth-film-earns-rs-209-crore-10925037/",
      author: "The Indian Express",
      date: "October 17, 2026",
      section: "News"
    },
    {
      headline: "Jailer 2 crosses Rs 400 crore mark globally in four days; emerges highest grossing Tamil film of 2026",
      url: "https://www.telegraphindia.com/entertainment/jailer-2-crosses-rs-400-crore-mark-globally-in-four-days-emerges-highest-grossing-tamil-film-of-2026/cid/2185372",
      author: "The Telegraph",
      date: "October 19, 2026",
      section: "News"
    },
    {
      headline: "Jailer 2 box office collection day 4: Rajinikanth film is at Rs 425 crore, all set to cross Rs 500 crore mark worldwide",
      url: "https://www.ndtv.com/entertainment/jailer-2-box-office-collection-day-4-rajinikanth-film-is-at-rs-425-crore-all-set-to-cross-rs-500-crore-mark-worldwide-12204495",
      author: "NDTV",
      date: "October 19, 2026",
      section: "News"
    },
    {
      headline: "Jailer 2 box office collection day 4: Rajinikanth, Mohanlal, Nelson Dilipkumar film sees Sunday jump, earns Rs 55.85 cr in India; worldwide gross hits Rs 424.25 cr",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/jailer-2-box-office-collection-day-4-rajinikanth-mohanlal-nelson-dilipkumar-film-sees-sunday-jump-earns-rs-55-85-cr-in-india-worldwide-gross-hits-rs-424-25-cr/articleshow/135037059.cms",
      author: "Times of India",
      date: "October 19, 2026",
      section: "News"
    },
    {
      headline: "Vijay Sethupathi recalls Rajinikanth's dedication on Jailer 2 sets",
      url: "https://telanganatoday.com/vijay-sethupathi-recalls-rajinikanths-dedication-on-jailer-2-sets",
      author: "Telangana Today",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Baththa actor Vijay Sethupathi calls Thalapathy Vijay cute fellow amid controversy; reveals how Rajinikanth inspired him on Jailer 2: 'I didn't expect that because he's a big superstar'",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/baththa-actor-vijay-sethupathi-calls-thalapathy-vijay-cute-fellow-amid-bigg-boss-tamil-controversy-reveals-how-rajinikanth-inspired-him-on-jailer-2-i-didnt-expect-that-because-hes-a-big-superstar/articleshow/134348274.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Jailer 2: Suraj Venjaramoodu introduced as mysterious gangster Dileep in new character glimpse",
      url: "https://www.ndtv.com/entertainment/jailer-2-suraj-venjaramoodu-introduced-as-mysterious-gangster-dileep-in-new-character-glimpse-12068844",
      author: "NDTV",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Jailer 2: Suraj Venjaramoodu introduced as mysterious gangster Dileep in intense character first look",
      url: "https://www.filmfare.com/news/south/jailer-2-suraj-venjaramoodu-introduced-as-mysterious-gangster-dileep-in-new-character-glimpse-86081.html",
      author: "Filmfare",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Jailer 2 1st look reveals Venjaramoodu as stylish villain in Nelson Dilipkumar film",
      url: "https://www.newsbytesapp.com/news/entertainment/jailer-2-1st-look-reveals-venjaramoodu-as-stylish-villain/tldr",
      author: "NewsBytes",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Jailer 2 new promo: Suraj Venjaramoodu makes an intense appearance as Dileep in Rajinikanth and Nelson Dilipkumar's action sequel",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/jailer-2-new-promo-suraj-venjaramoodu-makes-an-intense-appearance-as-dileep-in-rajinikanth-and-nelson-dilipkumars-action-sequel/articleshow/134335967.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News"
    }
  ],
  similar: [
    {
      title: "Jailer (2023 Tamil film)",
      link: "Jailer.html",
      poster: "pics/Films/Jailer/1.jpeg"
    },
    {
      title: "Petta",
      link: "Petta.html",
      poster: "pics/Films/Petta/2.jpg"
    },
    {
      title: "Darbar",
      link: "Darbar.html",
      poster: "pics/Films/Darbar/2.jpg"
    },
    {
      title: "Kaala",
      link: "Kaala.html",
      poster: "pics/Films/Kaala/1.jpg"
    },
    {
      title: "Kabali",
      link: "Kabali.html",
      poster: "pics/Films/Kabali/4.jpg"
    },
    {
      title: "2.0",
      link: "2point0.html",
      poster: "pics/Films/2.0/2.jpg"
    },
    {
      title: "Bigil",
      link: "Bigil.html",
      poster: "pics/Films/Bigil/2.jpg"
    },
    {
      title: "Mersal",
      link: "Mersal.html",
      poster: "pics/Films/Mersal/1.jpg"
    },
    {
      title: "Sarkar",
      link: "Sarkar.html",
      poster: "pics/Films/Sarkar/2.jpg"
    },
    {
      title: "Theri",
      link: "Theri.html",
      poster: "pics/Films/Theri/1.jpg"
    },
    {
      title: "Bairavaa",
      link: "Bairavaa.html",
      poster: "pics/Films/Bairavaa/1.jpg"
    },
    {
      title: "Viswasam",
      link: "Viswasam.html",
      poster: "pics/Films/Viswasam/2.jpg"
    },
    {
      title: "Vivegam",
      link: "Vivegam.html",
      poster: "pics/Films/Vivegam/1.jpg"
    },
    {
      title: "Nerkonda Paarvai",
      link: "NerkondaPaarvai.html",
      poster: "pics/Films/NerkondaPaarvai/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Jailer_2",
  imdb: "https://www.imdb.com/title/tt33318732/"
};

// 2. Process movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

// Update Jailer 1 similar movies to ensure Jailer 2 is included at top along with Rajinikanth, Joseph Vijay, and Ajith movies
const j1Idx = movies.findIndex(m => m.id === 'Jailer' || m.filename === 'Jailer.html');
if (j1Idx !== -1) {
  movies[j1Idx].similar = [
    {
      title: "Jailer 2",
      link: "Jailer2.html",
      poster: "pics/Films/Jailer2/1.jpeg"
    },
    {
      title: "Petta",
      link: "Petta.html",
      poster: "pics/Films/Petta/2.jpg"
    },
    {
      title: "Darbar",
      link: "Darbar.html",
      poster: "pics/Films/Darbar/2.jpg"
    },
    {
      title: "Kaala",
      link: "Kaala.html",
      poster: "pics/Films/Kaala/1.jpg"
    },
    {
      title: "Kabali",
      link: "Kabali.html",
      poster: "pics/Films/Kabali/4.jpg"
    },
    {
      title: "2.0",
      link: "2point0.html",
      poster: "pics/Films/2.0/2.jpg"
    },
    {
      title: "Bigil",
      link: "Bigil.html",
      poster: "pics/Films/Bigil/2.jpg"
    },
    {
      title: "Mersal",
      link: "Mersal.html",
      poster: "pics/Films/Mersal/1.jpg"
    },
    {
      title: "Sarkar",
      link: "Sarkar.html",
      poster: "pics/Films/Sarkar/2.jpg"
    },
    {
      title: "Theri",
      link: "Theri.html",
      poster: "pics/Films/Theri/1.jpg"
    },
    {
      title: "Bairavaa",
      link: "Bairavaa.html",
      poster: "pics/Films/Bairavaa/1.jpg"
    },
    {
      title: "Viswasam",
      link: "Viswasam.html",
      poster: "pics/Films/Viswasam/2.jpg"
    },
    {
      title: "Vivegam",
      link: "Vivegam.html",
      poster: "pics/Films/Vivegam/1.jpg"
    },
    {
      title: "Nerkonda Paarvai",
      link: "NerkondaPaarvai.html",
      poster: "pics/Films/NerkondaPaarvai/1.jpg"
    }
  ];
  console.log('Updated Jailer (2023) with Jailer 2 in its similar movies list.');
}

// Remove any existing Jailer 2 entry and unshift the updated released Jailer 2 to top
const j2Idx = movies.findIndex(m => m.id === 'Jailer2' || m.filename === 'Jailer2.html');
if (j2Idx !== -1) {
  movies.splice(j2Idx, 1);
}
movies.unshift(jailer2Movie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Placed released Jailer 2 at index 0 of movies.json (${movies.length} total entries).`);

// 3. Process search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const sItem = {
  id: "Jailer2",
  title: "Jailer 2",
  type: "movie",
  category: "Indian",
  year: "2026",
  genre: "Action, Crime, Thriller, Comedy",
  language: "Tamil",
  score: 7.2,
  poster: "pics/Films/Jailer2/1.jpeg",
  status: "released",
  url: "Jailer2.html"
};
const sIdx = searchIndex.findIndex(s => s.id === 'Jailer2' || s.url === 'Jailer2.html');
if (sIdx !== -1) {
  searchIndex.splice(sIdx, 1);
}
searchIndex.unshift(sItem);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Updated search_index.json with released Jailer 2 entry (${searchIndex.length} total entries).`);

// 4. Process news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
const newsToAdd = [
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 crosses Rs 400 crore mark globally in four days; emerges highest grossing Tamil film of 2026",
    source: "The Telegraph",
    date: "October 19, 2026",
    url: "https://www.telegraphindia.com/entertainment/jailer-2-crosses-rs-400-crore-mark-globally-in-four-days-emerges-highest-grossing-tamil-film-of-2026/cid/2185372",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 box office collection day 4: Rajinikanth film is at Rs 425 crore, all set to cross Rs 500 crore mark worldwide",
    source: "NDTV",
    date: "October 19, 2026",
    url: "https://www.ndtv.com/entertainment/jailer-2-box-office-collection-day-4-rajinikanth-film-is-at-rs-425-crore-all-set-to-cross-rs-500-crore-mark-worldwide-12204495",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 box office collection day 4: Rajinikanth, Mohanlal, Nelson Dilipkumar film sees Sunday jump, earns Rs 55.85 cr in India; worldwide gross hits Rs 424.25 cr",
    source: "Times of India",
    date: "October 19, 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/jailer-2-box-office-collection-day-4-rajinikanth-mohanlal-nelson-dilipkumar-film-sees-sunday-jump-earns-rs-55-85-cr-in-india-worldwide-gross-hits-rs-424-25-cr/articleshow/135037059.cms",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 box office collection day 2: Rajinikanth film earns Rs 209 crore worldwide",
    source: "The Indian Express",
    date: "October 17, 2026",
    url: "https://indianexpress.com/article/entertainment/tamil/jailer-2-box-office-collection-day-2-live-updates-rajinikanth-film-earns-rs-209-crore-10925037/",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 review: Rajinikanth is the main attraction in Nelson Dilipkumar's entertaining sequel",
    source: "The Telegraph",
    date: "October 16, 2026",
    url: "https://www.telegraphindia.com/entertainment/jailer-2-review-rajinikanth-is-the-main-attraction-in-nelson-dilipkumars-entertaining-sequel/cid/2185010",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 movie review: 75-year-old Rajinikanth aura farms for 3 hours in a Nelson Dilipkumar film and it is all fans need sometimes",
    source: "Hindustan Times",
    date: "October 15, 2026",
    url: "https://www.hindustantimes.com/entertainment/tamil-cinema/jailer-2-movie-review-75-year-old-rajinikanth-aura-farms-for-3-hours-in-a-nelson-dilipkumar-film-and-it-is-all-fans-need-sometimes-101792042345652.html",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 movie review: Rajinikanth’s supreme aura carries Nelson’s uneven action thriller",
    source: "The Indian Express",
    date: "October 15, 2026",
    url: "https://indianexpress.com/article/entertainment/movie-review/jailer-2-movie-review-rajinikanth-supreme-aura-carries-nelsons-uneven-action-thriller-10922256/",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 movie review: Rajinikanth swagger and Nelson's humour strike gold again",
    source: "India Today",
    date: "October 15, 2026",
    url: "https://www.indiatoday.in/movies/reviews/story/jailer-2-movie-review-rajinikanth-swagger-and-nelsons-humour-strike-gold-again-3017726-2026-10-15",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 movie review: Superstar Rajinikanth and Nelson team up for an electrifying commercial sequel",
    source: "The Hindu",
    date: "October 15, 2026",
    url: "https://www.thehindu.com/entertainment/movies/jailer-2-movie-review-superstar-rajinikanth-nelson-shivarajkumar-mohanlal-anirudh-ravichander/article71587540.ece",
    category: "Kollywood"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Vijay Sethupathi recalls Rajinikanth's dedication on Jailer 2 sets",
    source: "Telangana Today",
    date: "September 2026",
    url: "https://telanganatoday.com/vijay-sethupathi-recalls-rajinikanths-dedication-on-jailer-2-sets",
    category: "Indian Cinema"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Baththa actor Vijay Sethupathi reveals how Rajinikanth inspired him on Jailer 2: 'I didn't expect that because he's a big superstar'",
    source: "Times of India",
    date: "September 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/baththa-actor-vijay-sethupathi-calls-thalapathy-vijay-cute-fellow-amid-bigg-boss-tamil-controversy-reveals-how-rajinikanth-inspired-him-on-jailer-2-i-didnt-expect-that-because-hes-a-big-superstar/articleshow/134348274.cms",
    category: "Indian Cinema"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2: Suraj Venjaramoodu introduced as mysterious gangster Dileep in new character glimpse",
    source: "NDTV",
    date: "September 2026",
    url: "https://www.ndtv.com/entertainment/jailer-2-suraj-venjaramoodu-introduced-as-mysterious-gangster-dileep-in-new-character-glimpse-12068844",
    category: "Indian Cinema"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2: Suraj Venjaramoodu introduced as mysterious gangster Dileep in intense first look",
    source: "Filmfare",
    date: "September 2026",
    url: "https://www.filmfare.com/news/south/jailer-2-suraj-venjaramoodu-introduced-as-mysterious-gangster-dileep-in-new-character-glimpse-86081.html",
    category: "Indian Cinema"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 1st look reveals Venjaramoodu as stylish villain in Nelson Dilipkumar film",
    source: "NewsBytes",
    date: "September 2026",
    url: "https://www.newsbytesapp.com/news/entertainment/jailer-2-1st-look-reveals-venjaramoodu-as-stylish-villain/tldr",
    category: "Indian Cinema"
  },
  {
    movieId: "Jailer2",
    movieTitle: "Jailer 2",
    title: "Jailer 2 new promo: Suraj Venjaramoodu makes an intense appearance as Dileep in Rajinikanth and Nelson Dilipkumar's action sequel",
    source: "Times of India",
    date: "September 2026",
    url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/jailer-2-new-promo-suraj-venjaramoodu-makes-an-intense-appearance-as-dileep-in-rajinikanth-and-nelson-dilipkumars-action-sequel/articleshow/134335967.cms",
    category: "Indian Cinema"
  }
];

newsToAdd.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `jailer2-news-${idx + 1}`,
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

// 5. Process releases.json
let releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));

const releaseHubItem = {
  title: "Jailer 2",
  poster: "pics/Films/Jailer2/1.jpeg",
  alt: "Jailer 2",
  language: "Tamil",
  category: "Indian",
  releaseDate: "October 15, 2026",
  genre: "Action, Crime, Thriller, Comedy",
  status: "released",
  moreLink: "Jailer2.html",
  trailerLink: "https://www.youtube.com/watch?v=aaNq2NL6D4A",
  ratings: [
    {
      source: "OakShow",
      score: "7.2/10",
      url: "https://oakshow.in/Jailer2.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-this-one-is-above-average.png"
    },
    {
      source: "IMDb",
      score: "8.1/10",
      url: "https://www.imdb.com/title/tt33318732/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "91%",
      url: "https://www.rottentomatoes.com/m/jailer_2",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    }
  ]
};

// Add to IndianReleases2026October
const indOct = releases.find(r => r.id === 'IndianReleases2026October');
if (indOct) {
  const exIdx = indOct.items.findIndex(it => it.title === 'Jailer 2' || it.moreLink === 'Jailer2.html');
  if (exIdx !== -1) {
    indOct.items[exIdx] = releaseHubItem;
  } else {
    indOct.items.unshift(releaseHubItem);
  }
  indOct.totalItems = indOct.items.length;
}

// Add to Releases2026October
const allOct = releases.find(r => r.id === 'Releases2026October');
if (allOct) {
  const exIdx = allOct.items.findIndex(it => it.title === 'Jailer 2' || it.moreLink === 'Jailer2.html');
  if (exIdx !== -1) {
    allOct.items[exIdx] = releaseHubItem;
  } else {
    allOct.items.unshift(releaseHubItem);
  }
  allOct.totalItems = allOct.items.length;
}

fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2), 'utf8');
console.log('Updated releases.json (IndianReleases2026October & Releases2026October).');

// 6. Ensure image directories exist in dist/
const distPicsFilms = path.join(rootDir, 'dist', 'pics', 'Films', 'Jailer2');
const srcPicsFilms = path.join(rootDir, 'pics', 'Films', 'Jailer2');

if (!fs.existsSync(distPicsFilms)) {
  fs.mkdirSync(distPicsFilms, { recursive: true });
}
if (fs.existsSync(srcPicsFilms)) {
  const files = fs.readdirSync(srcPicsFilms);
  for (const f of files) {
    fs.copyFileSync(path.join(srcPicsFilms, f), path.join(distPicsFilms, f));
  }
  console.log(`Copied ${files.length} images to dist/pics/Films/Jailer2`);
}

console.log('=== All Data Successfully Updated ===');
