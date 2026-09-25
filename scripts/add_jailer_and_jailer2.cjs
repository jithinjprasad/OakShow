const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

// Helper to extract YouTube video ID
function extractYoutubeId(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : '';
}

// 1. Define Jailer (2023)
const jailerMovie = {
  id: "Jailer",
  slug: "jailer",
  type: "movie",
  category: "Indian",
  score: 9.0,
  filename: "Jailer.html",
  title: "Jailer (2023 Tamil film)",
  metaTitle: "Jailer (2023 Tamil film) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  description: "Muthuvel Pandian, a retired prison warden leading a quiet life with his family, embarks on a merciless crusade after his honest police officer son goes missing while investigating an illicit idol-smuggling syndicate headed by the ruthless mobster Varman.",
  plot: "Muthuvel Pandian (Rajinikanth), a retired central prison superintendent known as 'Tiger', lives peacefully in Chennai with his wife Vijaya, ACP son Arjun, daughter-in-law Swetha, and grandson Rithvik. When Arjun vanishes while probing an international temple-sculpture smuggling cartel led by the eccentric and sadistic Varman (Vinayakan), police report him dead. Pushed beyond his breaking point, Muthuvel reverts to his ruthless former avatar, calling upon his extensive pan-Indian network of former inmates and loyal allies—including Mathew (Mohanlal) from Kerala, Narasimha (Shiva Rajkumar) from Bangalore, and Kamdev (Jackie Shroff) from Bihar—to dismantle Varman's criminal empire brick by brick.",
  language: "Tamil",
  releaseDate: "August 10, 2023",
  year: "2023",
  genre: "Action, Crime, Thriller, Comedy",
  duration: "2hr 48min",
  director: "Nelson Dilipkumar",
  writer: "Nelson Dilipkumar",
  basedOn: "",
  boxOffice: "₹605–650 crore ($75–80 million)",
  budget: "₹200–240 crore",
  poster: "pics/Films/Jailer/1.jpeg",
  banner: "pics/Films/Jailer/2.jpeg",
  gallery: [
    {
      src: "pics/Films/Jailer/1.jpeg",
      alt: "Jailer Theatrical Poster"
    },
    {
      src: "pics/Films/Jailer/2.jpeg",
      alt: "Rajinikanth as Muthuvel Pandian Key Art"
    },
    {
      src: "pics/Films/Jailer/3.jpg",
      alt: "Jailer Cinematic Action Still"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "9.0/10",
      url: "https://oakshow.in/Jailer.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "Roger Ebert",
      score: "3.5/4",
      url: "https://www.rogerebert.com/reviews/jailer-movie-review-2023",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "The Indian Express",
      score: "3.5/5",
      url: "https://indianexpress.com/article/entertainment/tamil/jailer-movie-review-rajinikanth-nelson-dilipkumar-complete-entertainer-8885711/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "Rediff",
      score: "3.5/5",
      url: "https://www.rediff.com/movies/review/jailor-review/20230810.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    },
    {
      source: "Bollywood Hungama",
      score: "3.5/5",
      url: "https://www.bollywoodhungama.com/movie/jailer/",
      icon: "pics/RatingSiteLogos/bollywood-hungama.png"
    },
    {
      source: "Times Now",
      score: "3.5/5",
      url: "https://www.timesnownews.com/entertainment-news/jailer-movie-review-jailer-imdb-rating-public-review-reaction-jailer-twitter-review-updates-article-102601317",
      icon: "pics/RatingSiteLogos/times-now.ico"
    },
    {
      source: "Times of India",
      score: "3.0/5",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/jailer/movie-review/102602413.cms",
      icon: "pics/RatingSiteLogos/times-of-india.ico"
    },
    {
      source: "India Today",
      score: "3.0/5",
      url: "https://www.indiatoday.in/movies/reviews/story/jailer-movie-review-rajinikanth-returns-to-supreme-form-in-nelson-dilipkumars-film-2418911-2023-08-10",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "Firstpost",
      score: "3.0/5",
      url: "https://www.firstpost.com/entertainment/jailer-movie-review-superstar-rajinikanth-mohanlal-and-shiva-rajkumar-are-the-triple-threat-that-keeps-giving-12981802.html",
      icon: "pics/RatingSiteLogos/firstpost.png"
    },
    {
      source: "Pinkvilla",
      score: "3.0/5",
      url: "https://www.pinkvilla.com/entertainment/reviews/jailer-movie-review-an-out-and-out-rajinikanth-show-with-dynamic-cameos-of-mohanlal-and-shiva-rajkumar-1235017",
      icon: "pics/RatingSiteLogos/pinkvilla.png"
    },
    {
      source: "News 18",
      score: "3.0/5",
      url: "https://www.news18.com/movies/jailer-movie-review-rajinikanth-nelson-dilipkumar-8530614.html",
      icon: "pics/RatingSiteLogos/news-18.png"
    },
    {
      source: "IMDb",
      score: "7.1/10",
      url: "https://www.imdb.com/title/tt11663228/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "80%",
      url: "https://www.rottentomatoes.com/m/jailer",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-fresh.png"
    },
    {
      source: "NDTV",
      score: "2.5/5",
      url: "https://www.ndtv.com/entertainment/jailer-review-rajinikanth-is-a-star-for-all-seasons-and-all-regions-2-5-stars-4286279",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "Common Sense Media",
      score: "1.0/5",
      url: "https://www.commonsensemedia.org/movie-reviews/jailer",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    }
  ],
  cast: [
    { actor: "Rajinikanth", role: "Tiger Muthuvel Pandian" },
    { actor: "Vinayakan", role: "Varman" },
    { actor: "Ramya Krishnan", role: "Vijaya 'Viji' Muthuvel Pandian" },
    { actor: "Vasanth Ravi", role: "ACP Arjun Muthuvel Pandian" },
    { actor: "Yogi Babu", role: "Taxi Driver Vimal" },
    { actor: "Mirnaa Menon", role: "Swetha Arjun" },
    { actor: "Rithvik", role: "Rithvik Muthuvel Pandian" },
    { actor: "Mohanlal", role: "Mathew (Cameo Appearance)" },
    { actor: "Shiva Rajkumar", role: "Narasimha (Cameo Appearance)" },
    { actor: "Jackie Shroff", role: "Kamdev (Cameo Appearance)" },
    { actor: "Tamannaah Bhatia", role: "Kamna (Special Appearance)" },
    { actor: "Sunil", role: "Blast Mohan" },
    { actor: "Jaffer Sadiq", role: "Debuda" },
    { actor: "Naga Babu", role: "Balram" }
  ],
  trailers: [
    {
      title: "Jailer Official Showcase (Main Trailer)",
      url: "https://www.youtube.com/watch?v=xenOE1Tma0A",
      embedUrl: "https://www.youtube-nocookie.com/embed/xenOE1Tma0A",
      youtubeId: "xenOE1Tma0A",
      type: "Trailer"
    },
    {
      title: "#Thalaivar169 Announcement",
      url: "https://www.youtube.com/watch?v=EtXQqufHoAk",
      embedUrl: "https://www.youtube-nocookie.com/embed/EtXQqufHoAk",
      youtubeId: "EtXQqufHoAk",
      type: "Announcement"
    },
    {
      title: "Release Date Announcement",
      url: "https://www.youtube.com/watch?v=1iPCrcZV6Os",
      embedUrl: "https://www.youtube-nocookie.com/embed/1iPCrcZV6Os",
      youtubeId: "1iPCrcZV6Os",
      type: "Teaser"
    },
    {
      title: "Official Showcase Trailer",
      url: "https://www.youtube.com/watch?v=Y5BeWdODPqo",
      embedUrl: "https://www.youtube-nocookie.com/embed/Y5BeWdODPqo",
      youtubeId: "Y5BeWdODPqo",
      type: "Trailer"
    },
    {
      title: "Muthuvel Pandian Arrives",
      url: "https://www.youtube.com/watch?v=DObwdl3xB7U",
      embedUrl: "https://www.youtube-nocookie.com/embed/DObwdl3xB7U",
      youtubeId: "DObwdl3xB7U",
      type: "Promo"
    },
    {
      title: "Hukum - Thalaivar Alappara Video Song",
      url: "https://www.youtube.com/watch?v=gB2zKZxESTg",
      embedUrl: "https://www.youtube-nocookie.com/embed/gB2zKZxESTg",
      youtubeId: "gB2zKZxESTg",
      type: "Song"
    }
  ],
  videos: [
    {
      title: "Jailer Official Showcase (Main Trailer)",
      url: "https://www.youtube.com/watch?v=xenOE1Tma0A",
      youtubeId: "xenOE1Tma0A"
    },
    {
      title: "#Thalaivar169 Announcement",
      url: "https://www.youtube.com/watch?v=EtXQqufHoAk",
      youtubeId: "EtXQqufHoAk"
    },
    {
      title: "Release Date Announcement",
      url: "https://www.youtube.com/watch?v=1iPCrcZV6Os",
      youtubeId: "1iPCrcZV6Os"
    },
    {
      title: "Official Showcase Trailer",
      url: "https://www.youtube.com/watch?v=Y5BeWdODPqo",
      youtubeId: "Y5BeWdODPqo"
    },
    {
      title: "Muthuvel Pandian Arrives",
      url: "https://www.youtube.com/watch?v=DObwdl3xB7U",
      youtubeId: "DObwdl3xB7U"
    },
    {
      title: "Hukum - Thalaivar Alappara Video Song",
      url: "https://www.youtube.com/watch?v=gB2zKZxESTg",
      youtubeId: "gB2zKZxESTg"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/0zRUzTXH7GtGLxt6uVdARD",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/jailer-original-motion-picture-soundtrack/1699735063",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/jailer/LSe0d94xZgE_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  watchOnline: [
    {
      provider: "Amazon Prime Video",
      platform: "Amazon Prime Video",
      url: "https://www.primevideo.com/dp/amzn1.dv.gti.e6c3bee4-fea9-4d10-ac7b-61dd7f026d47?autoplay=0&ref_=atv_cf_strg_wb",
      icon: "pics/WatchOnline/amazon-prime.png",
      lang: "Tamil, Telugu, Malayalam, Kannada, Hindi"
    },
    {
      provider: "MX Player",
      platform: "MX Player",
      url: "https://www.mxplayer.in/movie/watch-jailer-movie-online-cc1f9610b1cc638cf9b60f305ee1b4d6?watch=true&utm_source=google_web&utm_medium=watchaction",
      icon: "pics/WatchOnline/mx-player.png",
      lang: "Tamil, Hindi"
    },
    {
      provider: "Sun NXT",
      platform: "Sun NXT",
      url: "https://www.sunnxt.com/movie/detail/149818/jailer",
      icon: "pics/WatchOnline/sun-nxt.png",
      lang: "Tamil (Original)"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/jailer/ET00331686",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book on BookMyShow",
      rank: 1
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/jailer-movie-detail-154651",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book on TicketNew",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/jailer-2023-232535/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book on Fandango",
      rank: 7
    }
  ],
  articles: [
    {
      headline: "Jailer Movie Review: Rajinikanth and Nelson make a captivating comeback that majorly works",
      url: "https://www.thehindu.com/entertainment/movies/jailer-movie-review-rajinikanth-and-nelson-make-a-captivating-comeback-that-majorly-works/article67179905.ece",
      author: "The Hindu",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Rajinikanth, Nelson Dilipkumar deliver a complete mass entertainer",
      url: "https://indianexpress.com/article/entertainment/tamil/jailer-movie-review-rajinikanth-nelson-dilipkumar-complete-entertainer-8885711/",
      author: "The Indian Express",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Nelson strikes gold with Superstar Rajinikanth's vintage swagger",
      url: "https://www.rogerebert.com/reviews/jailer-movie-review-2023",
      author: "Roger Ebert",
      date: "August 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Rajinikanth, Mohanlal and Shiva Rajkumar are the triple threat that keeps giving",
      url: "https://www.firstpost.com/entertainment/jailer-movie-review-superstar-rajinikanth-mohanlal-and-shiva-rajkumar-are-the-triple-threat-that-keeps-giving-12981802.html",
      author: "Firstpost",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Rajinikanth returns to supreme form in Nelson Dilipkumar's film",
      url: "https://www.indiatoday.in/movies/reviews/story/jailer-movie-review-rajinikanth-returns-to-supreme-form-in-nelson-dilipkumars-film-2418911-2023-08-10",
      author: "India Today",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Review: Rajinikanth is a star for all seasons and all regions",
      url: "https://www.ndtv.com/entertainment/jailer-review-rajinikanth-is-a-star-for-all-seasons-and-all-regions-2-5-stars-4286279",
      author: "NDTV",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: An out-and-out Rajinikanth show with dynamic cameos of Mohanlal and Shiva Rajkumar",
      url: "https://www.pinkvilla.com/entertainment/reviews/jailer-movie-review-an-out-and-out-rajinikanth-show-with-dynamic-cameos-of-mohanlal-and-shiva-rajkumar-1235017",
      author: "Pinkvilla",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: High octane Nelson Dilipkumar actioner with whistle-worthy moments",
      url: "https://www.news18.com/movies/jailer-movie-review-rajinikanth-nelson-dilipkumar-8530614.html",
      author: "News18",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Rajinikanth delivers pure cinematic thrills",
      url: "https://www.rediff.com/movies/review/jailor-review/20230810.htm",
      author: "Rediff",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Thalaivar's swag and crowd-pleasing moments ignite theaters",
      url: "https://www.timesnownews.com/entertainment-news/jailer-movie-review-jailer-imdb-rating-public-review-reaction-jailer-twitter-review-updates-article-102601317",
      author: "Times Now",
      date: "August 10, 2023",
      section: "Critic Reviews"
    },
    {
      headline: "Jailer Movie Review: Even Thalaiva's swag can't save the overcooked plot",
      url: "https://www.deccanchronicle.com/entertainment/movie-reviews/100823/jailer-movie-review-rating-even-thailavas-swag-cant-save-the-overc.html",
      author: "Deccan Chronicle",
      date: "August 10, 2023",
      section: "Critic Reviews"
    }
  ],
  similar: [
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
      title: "Viswasam",
      link: "Viswasam.html",
      poster: "pics/Films/Viswasam/2.jpg"
    },
    {
      title: "Vivegam",
      link: "Vivegam.html",
      poster: "pics/Films/Vivegam/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Jailer_(2023_Tamil_film)",
  imdb: "https://www.imdb.com/title/tt11663228/"
};

// 2. Define Jailer 2 (Upcoming)
const jailer2Movie = {
  id: "Jailer2",
  slug: "jailer-2",
  type: "movie",
  category: "Indian",
  score: 9.0,
  filename: "Jailer2.html",
  title: "Jailer 2",
  metaTitle: "Jailer 2 All Ratings, Trailers, Songs, Videos, Bookings and News — OakShow",
  description: "The high-octane action sequel to the blockbuster Jailer, following Tiger Muthuvel Pandian as he faces formidable new underworld adversaries and a grander confrontation orchestrated by director Nelson Dilipkumar.",
  plot: "Following the explosive events of Jailer, Tiger Muthuvel Pandian (Rajinikanth) finds himself drawn into an even deeper international conspiracy. Facing dangerous new syndicates fronted by the menacing Dileep (Suraj Venjaramoodu) and Bodhi (S. J. Suryah), along with intense encounters with key underworld figures, Muthuvel must once again summon allies across borders to protect what remains dearest to him.",
  language: "Tamil",
  releaseDate: "Upcoming (2026)",
  year: "2026",
  genre: "Action, Crime, Thriller",
  duration: "TBA",
  director: "Nelson Dilipkumar",
  writer: "Nelson Dilipkumar",
  basedOn: "",
  boxOffice: "Upcoming",
  budget: "TBA",
  poster: "pics/Films/Jailer2/1.jpeg",
  banner: "pics/Films/Jailer2/2.jpeg",
  gallery: [
    {
      src: "pics/Films/Jailer2/1.jpeg",
      alt: "Jailer 2 Official Announcement Poster"
    },
    {
      src: "pics/Films/Jailer2/2.jpeg",
      alt: "Jailer 2 Key Art & Banner"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "9.0/10",
      url: "https://oakshow.in/Jailer2.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "Anticipated",
      url: "https://www.imdb.com/title/tt33318732/",
      icon: "pics/RatingSiteLogos/imdb.png"
    }
  ],
  cast: [
    { actor: "Rajinikanth", role: "Tiger Muthuvel Pandian" },
    { actor: "Suraj Venjaramoodu", role: "Dileep" },
    { actor: "S. J. Suryah", role: "Bodhi" },
    { actor: "Vijay Sethupathi", role: "Key Role" },
    { actor: "Ramya Krishnan", role: "Vijaya Muthuvel Pandian" },
    { actor: "Vasanth Ravi", role: "Arjun Muthuvel Pandian" },
    { actor: "Yogi Babu", role: "Taxi Driver Vimal" }
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
      title: "Song: Hukum Reloaded from Jailer 2",
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
      url: "https://open.spotify.com/album/3fehKTRZv5h2otLpjVOJq6",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/hukum-reloaded-from-jailer-2-single/1790376515",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/hukum-reloaded-tamil-from-jailer-2/HFN9QrK4GNE_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  watchOnline: [],
  bookings: [],
  articles: [
    {
      headline: "Vijay Sethupathi recalls Rajinikanth's dedication on Jailer 2 sets",
      url: "https://telanganatoday.com/vijay-sethupathi-recalls-rajinikanths-dedication-on-jailer-2-sets",
      author: "Telangana Today",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Baththa actor Vijay Sethupathi calls Thalapathy Vijay cute fellow amid controversy; reveals how Rajinikanth inspired him on Jailer 2",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/baththa-actor-vijay-sethupathi-calls-thalapathy-vijay-cute-fellow-amid-bigg-boss-tamil-controversy-reveals-how-rajinikanth-inspired-him-on-jailer-2-i-didnt-expect-that-because-hes-a-big-superstar/articleshow/134348274.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Jailer 2: Suraj Venjaramoodu introduced as mysterious gangster Dileep in new character glimpse",
      url: "https://www.ndtv.com/entertainment/jailer-2-suraj-venjaramoodu-introduced-as-mysterious-gangster-dileep-in-new-character-glimpse-12068844",
      author: "NDTV",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Jailer 2: Suraj Venjaramoodu introduced as mysterious gangster Dileep in intense first look",
      url: "https://www.filmfare.com/news/south/jailer-2-suraj-venjaramoodu-introduced-as-mysterious-gangster-dileep-in-new-character-glimpse-86081.html",
      author: "Filmfare",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Jailer 2 1st look reveals Venjaramoodu as stylish villain in Nelson Dilipkumar film",
      url: "https://www.newsbytesapp.com/news/entertainment/jailer-2-1st-look-reveals-venjaramoodu-as-stylish-villain/tldr",
      author: "NewsBytes",
      date: "September 2026",
      section: "News(Before Release)"
    },
    {
      headline: "Jailer 2 new promo: Suraj Venjaramoodu makes an intense appearance as Dileep in Rajinikanth and Nelson Dilipkumar's action sequel",
      url: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/jailer-2-new-promo-suraj-venjaramoodu-makes-an-intense-appearance-as-dileep-in-rajinikanth-and-nelson-dilipkumars-action-sequel/articleshow/134335967.cms",
      author: "Times of India",
      date: "September 2026",
      section: "News(Before Release)"
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
      title: "Viswasam",
      link: "Viswasam.html",
      poster: "pics/Films/Viswasam/2.jpg"
    },
    {
      title: "Vivegam",
      link: "Vivegam.html",
      poster: "pics/Films/Vivegam/1.jpg"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Jailer_2",
  imdb: "https://www.imdb.com/title/tt33318732/"
};

// 1. Process movies.json
console.log('Reading movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

function upsertMovie(movieObj) {
  const idx = movies.findIndex(m => m.id === movieObj.id || m.filename === movieObj.filename || m.title === movieObj.title);
  if (idx !== -1) {
    movies[idx] = movieObj;
    console.log(`Updated existing movie: ${movieObj.title} (id: ${movieObj.id})`);
  } else {
    movies.unshift(movieObj);
    console.log(`Inserted new movie: ${movieObj.title} (id: ${movieObj.id})`);
  }
}

upsertMovie(jailerMovie);
upsertMovie(jailer2Movie);
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Successfully updated ${moviesPath} (${movies.length} total entries)`);

// 2. Process search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

function upsertSearch(movieObj) {
  const item = {
    id: movieObj.id,
    title: movieObj.title,
    type: "movie",
    category: movieObj.category,
    year: movieObj.year,
    genre: movieObj.genre,
    language: movieObj.language,
    score: movieObj.score,
    poster: movieObj.poster,
    url: movieObj.filename
  };
  const idx = searchIndex.findIndex(s => s.id === movieObj.id || s.url === movieObj.filename);
  if (idx !== -1) {
    searchIndex[idx] = item;
  } else {
    searchIndex.unshift(item);
  }
}

upsertSearch(jailerMovie);
upsertSearch(jailer2Movie);
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Successfully updated ${searchIndexPath} (${searchIndex.length} total entries)`);

// 3. Process reviews.json
console.log('Updating reviews.json...');
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

const jailerReviewsToAdd = [
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Roger Ebert",
    criticName: "Roger Ebert",
    outlet: "RogerEbert.com",
    score: "3.5/4",
    rating: "3.5/4",
    date: "August 2023",
    title: "Jailer Movie Review: Nelson strikes gold with Superstar Rajinikanth's vintage swagger",
    url: "https://www.rogerebert.com/reviews/jailer-movie-review-2023"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "The Indian Express",
    criticName: "The Indian Express",
    outlet: "The Indian Express",
    score: "3.5/5",
    rating: "3.5/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Rajinikanth, Nelson Dilipkumar deliver a complete mass entertainer",
    url: "https://indianexpress.com/article/entertainment/tamil/jailer-movie-review-rajinikanth-nelson-dilipkumar-complete-entertainer-8885711/"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "The Hindu",
    criticName: "The Hindu",
    outlet: "The Hindu",
    score: "3.5/5",
    rating: "Recommended",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Rajinikanth and Nelson make a captivating comeback that majorly works",
    url: "https://www.thehindu.com/entertainment/movies/jailer-movie-review-rajinikanth-and-nelson-make-a-captivating-comeback-that-majorly-works/article67179905.ece"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Rediff",
    criticName: "Rediff",
    outlet: "Rediff Movies",
    score: "3.5/5",
    rating: "3.5/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Rajinikanth delivers pure cinematic thrills",
    url: "https://www.rediff.com/movies/review/jailor-review/20230810.htm"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Bollywood Hungama",
    criticName: "Bollywood Hungama",
    outlet: "Bollywood Hungama",
    score: "3.5/5",
    rating: "3.5/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: A gripping mass actioner packed with superstar energy",
    url: "https://www.bollywoodhungama.com/movie/jailer/"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Times Now",
    criticName: "Times Now",
    outlet: "Times Now",
    score: "3.5/5",
    rating: "3.5/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Thalaivar's swag and crowd-pleasing moments ignite theaters",
    url: "https://www.timesnownews.com/entertainment-news/jailer-movie-review-jailer-imdb-rating-public-review-reaction-jailer-twitter-review-updates-article-102601317"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Times of India",
    criticName: "Times of India",
    outlet: "Times of India",
    score: "3.0/5",
    rating: "3.0/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Nelson strikes the right balance between style, substance and dark comedy",
    url: "https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews/jailer/movie-review/102602413.cms"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "India Today",
    criticName: "India Today",
    outlet: "India Today",
    score: "3.0/5",
    rating: "3.0/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Rajinikanth returns to supreme form in Nelson Dilipkumar's film",
    url: "https://www.indiatoday.in/movies/reviews/story/jailer-movie-review-rajinikanth-returns-to-supreme-form-in-nelson-dilipkumars-film-2418911-2023-08-10"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Firstpost",
    criticName: "Firstpost",
    outlet: "Firstpost",
    score: "3.0/5",
    rating: "3.0/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Superstar Rajinikanth, Mohanlal and Shiva Rajkumar are the triple threat that keeps giving",
    url: "https://www.firstpost.com/entertainment/jailer-movie-review-superstar-rajinikanth-mohanlal-and-shiva-rajkumar-are-the-triple-threat-that-keeps-giving-12981802.html"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Pinkvilla",
    criticName: "Pinkvilla",
    outlet: "Pinkvilla",
    score: "3.0/5",
    rating: "3.0/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: An out-and-out Rajinikanth show with dynamic cameos of Mohanlal and Shiva Rajkumar",
    url: "https://www.pinkvilla.com/entertainment/reviews/jailer-movie-review-an-out-and-out-rajinikanth-show-with-dynamic-cameos-of-mohanlal-and-shiva-rajkumar-1235017"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "News 18",
    criticName: "News 18",
    outlet: "News18",
    score: "3.0/5",
    rating: "3.0/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: High octane Nelson Dilipkumar actioner with whistle-worthy moments",
    url: "https://www.news18.com/movies/jailer-movie-review-rajinikanth-nelson-dilipkumar-8530614.html"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "NDTV",
    criticName: "NDTV",
    outlet: "NDTV",
    score: "2.5/5",
    rating: "2.5/5",
    date: "August 10, 2023",
    title: "Jailer Review: Rajinikanth is a star for all seasons and all regions",
    url: "https://www.ndtv.com/entertainment/jailer-review-rajinikanth-is-a-star-for-all-seasons-and-all-regions-2-5-stars-4286279"
  },
  {
    movieId: "Jailer",
    movie: "Jailer (2023 Tamil film)",
    author: "Deccan Chronicle",
    criticName: "Deccan Chronicle",
    outlet: "Deccan Chronicle",
    score: "2.5/5",
    rating: "2.5/5",
    date: "August 10, 2023",
    title: "Jailer Movie Review: Even Thalaiva's swag can't save the overcooked plot",
    url: "https://www.deccanchronicle.com/entertainment/movie-reviews/100823/jailer-movie-review-rating-even-thailavas-swag-cant-save-the-overc.html"
  }
];

jailerReviewsToAdd.forEach((r, idx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `jailer-review-${idx + 1}`,
    ...r
  };
  if (fIdx !== -1) {
    reviews[fIdx] = reviewObj;
  } else {
    reviews.unshift(reviewObj);
  }
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');
console.log(`Successfully updated ${reviewsPath} (${reviews.length} total entries)`);

// 4. Process news.json
console.log('Updating news.json...');
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

const jailerNewsToAdd = [
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

jailerNewsToAdd.forEach((n, idx) => {
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
console.log(`Successfully updated ${newsPath} (${news.length} total entries)`);
console.log('Done inserting Jailer and Jailer 2 data!');
