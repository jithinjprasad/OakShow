const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const moviesPath = path.join(rootDir, 'data', 'movies.json');
const searchIndexPath = path.join(rootDir, 'data', 'search_index.json');
const reviewsPath = path.join(rootDir, 'data', 'reviews.json');
const newsPath = path.join(rootDir, 'data', 'news.json');

const topGunMaverickMovie = {
  id: "TopGunMaverick",
  slug: "top-gun-maverick",
  type: "movie",
  category: "Hollywood",
  score: 9.8,
  filename: "TopGunMaverick.html",
  title: "Top Gun: Maverick",
  metaTitle: "Top Gun: Maverick (2022) All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow",
  tag: "17th Highest Grossing Movie in History",
  tags: [
    "17th Highest Grossing Movie in History",
    "Academy Award Winner",
    "Global Blockbuster",
    "Tom Cruise",
    "Joseph Kosinski",
    "TOPGUN"
  ],
  description: "After more than thirty years of service as one of the Navy's top aviators, Pete 'Maverick' Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. Training a detachment of Top Gun graduates for a specialized and perilous mission, Maverick is forced to confront the ghosts of his past and his deepest fears, culminating in a mission that demands the ultimate sacrifice from those who will be chosen to fly it.",
  plot: "More than thirty years after graduating from TOPGUN, United States Navy Captain Pete 'Maverick' Mitchell serves as a test pilot. Despite his legendary combat records and accolades, his repeated insubordination has kept him at the rank of Captain. Rear Admiral Chester 'Hammer' Cain intends to shut down the hypersonic 'Darkstar' scramjet program to redirect funds to unmanned drones, but Maverick pushes the prototype to Mach 10 and beyond before destroying it. Instead of facing a court-martial, Maverick is protected by his former rival and dear friend, Admiral Tom 'Iceman' Kazansky, Commander of the U.S. Pacific Fleet, who orders him back to NAS North Island to instruct an elite group of recent Top Gun graduates. The pilots are tasked with an extraordinarily perilous strike on an unsanctioned uranium enrichment facility buried in an underground bunker at the end of a heavily fortified canyon protected by surface-to-air missiles and fifth-generation Su-57 fighters.\n\nAmong the candidates is Lieutenant Bradley 'Rooster' Bradshaw, the son of Maverick's late best friend and radar intercept officer Nick 'Goose' Bradshaw. Rooster deeply resents Maverick for having previously delayed his naval academy application and for his father's death. Maverick rigorously trains the squad through extreme low-altitude, high-G flying drills. When Iceman passes away from throat cancer, Maverick loses his protector and is initially grounded by Vice Admiral Beau 'Cyclone' Simpson. Refusing to let his pilots undertake what would be a suicide mission, Maverick flies an unauthorized run through the practice course in record time, proving the mission can succeed. Acknowledging Maverick's unmatched skill, Cyclone appoints him flight leader alongside Rooster, Phoenix, and Bob. Flying in under radar cover, Maverick's strike team hits their targets, but an intense dogfight ensues against enemy interceptors where Maverick and Rooster must rely on courage, loyalty, and sheer piloting instinct to survive and return home.",
  language: "English",
  releaseDate: "May 27, 2022",
  year: "2022",
  status: "released",
  genre: "Action, Drama, Thriller, Adventure",
  duration: "2hr 10mins",
  director: "Joseph Kosinski",
  writer: "Ehren Kruger, Eric Warren Singer, Christopher McQuarrie",
  basedOn: "Characters created by Jim Cash & Jack Epps Jr. | Story by Peter Craig and Justin Marks",
  boxOffice: {
    worldwideGross: "$1.496 Billion ($1,495,696,292) — 17th Highest Grossing Movie in History",
    openingWeekend: "$126.7 Million Domestic (3-Day) / $160.5 Million (4-Day Memorial Day Weekend) / $256.4 Million Worldwide",
    openingDay: "$52.0 Million Domestic (USA)",
    domesticGross: "$718.7 Million ($718,732,821)",
    overseasGross: "$777.0 Million ($776,963,471)",
    indiaGross: "$6.8 Million (₹54+ Crore)",
    budget: "$170–177 Million",
    verdict: "All-Time Historic Blockbuster & 17th Highest Grossing Movie in World Cinema History",
    rank: "17th Highest Grossing Film in History ($1.496B)",
    lastUpdated: "September 2026",
    source: "Box Office Mojo, The Numbers & Deadline Hollywood"
  },
  poster: "pics/Films/TopGunMaverick/1.jpg",
  banner: "pics/Films/TopGunMaverick/2.jpg",
  gallery: [
    {
      src: "pics/Films/TopGunMaverick/1.jpg",
      alt: "Top Gun: Maverick Theatrical Poster"
    },
    {
      src: "pics/Films/TopGunMaverick/2.jpg",
      alt: "Top Gun: Maverick F/A-18 Flight Banner"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "9.8/10",
      url: "https://oakshow.in/TopGunMaverick.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "96%",
      url: "https://www.rottentomatoes.com/m/top_gun_maverick",
      icon: "pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png"
    },
    {
      source: "IMDb",
      score: "8.2/10",
      url: "https://www.imdb.com/title/tt1745960/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Roger Ebert",
      score: "4/4",
      url: "https://www.rogerebert.com/reviews/top-gun-maverick-movie-review-2022",
      icon: "pics/RatingSiteLogos/rogerebert.ico"
    },
    {
      source: "The Telegraph",
      score: "5/5",
      url: "https://www.telegraph.co.uk/films/0/top-gun-maverick-review-tom-cruise-makes-absurdly-exciting-return/",
      icon: "pics/RatingSiteLogos/telegraph.png"
    },
    {
      source: "Metacritic",
      score: "78/100",
      url: "https://www.metacritic.com/movie/top-gun-maverick/",
      icon: "pics/RatingSiteLogos/metacritic.png"
    },
    {
      source: "The Guardian",
      score: "4/5",
      url: "https://www.theguardian.com/film/2022/may/29/top-gun-maverick-review-tom-cruise-joseph-kosinski",
      icon: "pics/RatingSiteLogos/the-guardian.png"
    },
    {
      source: "Common Sense Media",
      score: "4/5",
      url: "https://www.commonsensemedia.org/movie-reviews/top-gun-maverick",
      icon: "pics/RatingSiteLogos/common-sense-media.png"
    },
    {
      source: "The Indian Express",
      score: "4/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/top-gun-maverick-movie-review-tom-cruise-starrer-aces-the-skies-burns-the-roads-7936771/",
      icon: "pics/RatingSiteLogos/indian-express.png"
    },
    {
      source: "The Times of India",
      score: "4/5",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/top-gun-maverick/movie-review/91772508.cms",
      icon: "pics/RatingSiteLogos/timesofindia.ico"
    },
    {
      source: "Den of Geek",
      score: "3.5/5",
      url: "https://www.denofgeek.com/movies/top-gun-maverick-review-tom-cruise/",
      icon: "pics/RatingSiteLogos/denofgeek.ico"
    },
    {
      source: "IGN",
      score: "7/10",
      url: "https://www.ign.com/articles/top-gun-maverick-review",
      icon: "pics/RatingSiteLogos/ign.png"
    },
    {
      source: "India Today",
      score: "3.5/5",
      url: "https://www.indiatoday.in/movies/hollywood/story/top-gun-maverick-review-tom-cruise-us-navy-fighter-jet-1954458-2022-05-26",
      icon: "pics/RatingSiteLogos/india-today.ico"
    },
    {
      source: "NDTV",
      score: "3/5",
      url: "https://www.ndtv.com/entertainment/top-gun-maverick-review-tom-cruise-back-in-the-cockpit-after-36-years-doesnt-miss-the-target-3-stars-3014063",
      icon: "pics/RatingSiteLogos/ndtv.ico"
    },
    {
      source: "Rediff",
      score: "2.5/5",
      url: "https://www.rediff.com/movies/review/top-gun-maverick-review/20220521.htm",
      icon: "pics/RatingSiteLogos/rediff.png"
    }
  ],
  awards: [
    {
      organization: "Academy Awards (Oscars)",
      year: "2023 (95th)",
      wins: [
        {
          category: "Best Sound",
          recipient: "Mark Weingarten, James H. Mather, Al Nelson, Chris Burdon, Mark Taylor"
        }
      ],
      nominations: [
        {
          category: "Best Picture",
          recipient: "Jerry Bruckheimer, Tom Cruise, Christopher McQuarrie, David Ellison"
        },
        {
          category: "Best Adapted Screenplay",
          recipient: "Ehren Kruger, Eric Warren Singer, Christopher McQuarrie"
        },
        {
          category: "Best Original Song (\"Hold My Hand\")",
          recipient: "Lady Gaga, BloodPop"
        },
        {
          category: "Best Film Editing",
          recipient: "Eddie Hamilton"
        },
        {
          category: "Best Visual Effects",
          recipient: "Ryan Tudhope, Seth Hill, Bryan Litson, Scott R. Fisher"
        }
      ]
    },
    {
      organization: "Critics' Choice Movie Awards",
      year: "2023 (28th)",
      wins: [
        {
          category: "Best Cinematography",
          recipient: "Claudio Miranda"
        },
        {
          category: "Best Editing",
          recipient: "Eddie Hamilton"
        }
      ],
      nominations: [
        {
          category: "Best Picture",
          recipient: "Top Gun: Maverick"
        },
        {
          category: "Best Actor",
          recipient: "Tom Cruise"
        },
        {
          category: "Best Director",
          recipient: "Joseph Kosinski"
        },
        {
          category: "Best Visual Effects",
          recipient: "Top Gun: Maverick VFX Team"
        },
        {
          category: "Best Song (\"Hold My Hand\")",
          recipient: "Lady Gaga, BloodPop"
        }
      ]
    },
    {
      organization: "American Film Institute (AFI)",
      year: "2022",
      wins: [
        {
          category: "Top 10 Films of the Year",
          recipient: "Top Gun: Maverick"
        }
      ],
      nominations: []
    },
    {
      organization: "National Board of Review",
      year: "2022",
      wins: [
        {
          category: "Best Film",
          recipient: "Top Gun: Maverick"
        },
        {
          category: "Top 10 Films",
          recipient: "Top Gun: Maverick"
        },
        {
          category: "Outstanding Achievement in Cinematography",
          recipient: "Claudio Miranda"
        }
      ],
      nominations: []
    },
    {
      organization: "Saturn Awards",
      year: "2022 (47th)",
      wins: [
        {
          category: "Best Action / Adventure Film",
          recipient: "Top Gun: Maverick"
        }
      ],
      nominations: [
        {
          category: "Best Actor",
          recipient: "Tom Cruise"
        },
        {
          category: "Best Film Writing",
          recipient: "Ehren Kruger, Eric Warren Singer, Christopher McQuarrie"
        },
        {
          category: "Best Editing",
          recipient: "Eddie Hamilton"
        },
        {
          category: "Best Special / Visual Effects",
          recipient: "Ryan Tudhope, Scott R. Fisher, Seth Hill, Bryan Litson"
        }
      ]
    },
    {
      organization: "BAFTA Film Awards",
      year: "2023 (76th)",
      wins: [],
      nominations: [
        {
          category: "Best Cinematography",
          recipient: "Claudio Miranda"
        },
        {
          category: "Best Editing",
          recipient: "Eddie Hamilton"
        },
        {
          category: "Best Sound",
          recipient: "Chris Burdon, James H. Mather, Al Nelson, Mark Taylor, Mark Weingarten"
        },
        {
          category: "Best Special Visual Effects",
          recipient: "Job Geurtze, Seth Hill, Bryan Litson, Ryan Tudhope"
        }
      ]
    },
    {
      organization: "Golden Globe Awards",
      year: "2023 (80th)",
      wins: [],
      nominations: [
        {
          category: "Best Motion Picture – Drama",
          recipient: "Top Gun: Maverick"
        },
        {
          category: "Best Original Song (\"Hold My Hand\")",
          recipient: "Lady Gaga, BloodPop"
        }
      ]
    }
  ],
  cast: [
    {
      actor: "Tom Cruise",
      role: "Capt. Pete 'Maverick' Mitchell",
      description: "Legendary naval aviator and TOPGUN flight instructor"
    },
    {
      actor: "Miles Teller",
      role: "Lt. Bradley 'Rooster' Bradshaw",
      description: "F/A-18 pilot, son of late RIO Nick 'Goose' Bradshaw"
    },
    {
      actor: "Jennifer Connelly",
      role: "Penny Benjamin",
      description: "Bar owner, single mother, and Maverick's love interest"
    },
    {
      actor: "Jon Hamm",
      role: "Vice Adm. Beau 'Cyclone' Simpson",
      description: "Commander of Naval Air Forces"
    },
    {
      actor: "Glen Powell",
      role: "Lt. Jake 'Hangman' Seresin",
      description: "Skilled and cocky F/A-18 pilot"
    },
    {
      actor: "Ed Harris",
      role: "Rear Adm. Chester 'Hammer' Cain",
      description: "Supervisor of the hypersonic Darkstar scramjet program"
    },
    {
      actor: "Val Kilmer",
      role: "Adm. Tom 'Iceman' Kazansky",
      description: "Commander of the U.S. Pacific Fleet and Maverick's close friend"
    },
    {
      actor: "Monica Barbaro",
      role: "Lt. Natasha 'Phoenix' Trace",
      description: "Skilled TOPGUN strike pilot"
    },
    {
      actor: "Lewis Pullman",
      role: "Lt. Robert 'Bob' Floyd",
      description: "Phoenix's Weapon Systems Officer"
    },
    {
      actor: "Charles Parnell",
      role: "Rear Adm. Solomon 'Warlock' Bates",
      description: "Commander of the Naval Strike and Air Warfare Center"
    },
    {
      actor: "Jay Ellis",
      role: "Lt. Reuben 'Payback' Fitch",
      description: "TOPGUN strike pilot"
    },
    {
      actor: "Danny Ramirez",
      role: "Lt. Mickey 'Fanboy' Garcia",
      description: "Payback's Weapon Systems Officer"
    },
    {
      actor: "Greg Tarzan Davis",
      role: "Lt. Javy 'Coyote' Machado",
      description: "TOPGUN strike pilot"
    },
    {
      actor: "Bashir Salahuddin",
      role: "CWO4 Bernie 'Hondo' Coleman",
      description: "Chief Warrant Officer and Maverick's trusted crew chief"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/top-gun-maverick/ET00076943",
      icon: "pics/BookngWebSiteLogos/book-my-show.png",
      label: "Book Now",
      rank: 1
    },
    {
      provider: "District",
      url: "https://www.district.in/movies/top-gun-maverick-movie-tickets-MV134119?srsltid=AU7gw4WOp6xCG3R0Qx0T-Jvd9ZnXaNYaPLkhl8hljGnGW45AJeuBeTyI",
      icon: "pics/BookngWebSiteLogos/district.png",
      label: "Book Now",
      rank: 2
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/top-gun-maverick-2022-219625/movie-overview",
      icon: "pics/BookngWebSiteLogos/fandango.png",
      label: "Book Now",
      rank: 3
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/top-gun-maverick-movie-detail-134119",
      icon: "pics/BookngWebSiteLogos/ticket-new.png",
      label: "Book Now",
      rank: 4
    }
  ],
  watchOnline: [
    {
      provider: "Amazon Prime Video",
      platform: "Amazon Prime Video",
      url: "https://www.primevideo.com/dp/amzn1.dv.gti.a8c482a4-39a8-4009-91ad-080630b5a6d7?autoplay=0&ref_=atv_cf_strg_wb",
      icon: "pics/WatchOnline/amazon-prime.png",
      lang: "English, Hindi, Tamil, Telugu"
    },
    {
      provider: "JioHotstar",
      platform: "JioHotstar",
      url: "https://www.hotstar.com/in/movies/top-gun-maverick/1271399288?utm_source=gwa",
      icon: "pics/WatchOnline/JioHotstar.png",
      lang: "English, Hindi, Tamil, Telugu"
    },
    {
      provider: "Zee5",
      platform: "Zee5",
      url: "https://www.zee5.com/movies/details/top-gun-maverick/0-0-1z5754713?utm_source=google_web&utm_medium=watchaction&utm_campaign=google_watch&utm_content=top-gun-maverick",
      icon: "pics/WatchOnline/zee5.png",
      lang: "English, Hindi"
    },
    {
      provider: "Apple TV",
      platform: "Apple TV",
      url: "https://tv.apple.com/in/movie/top-gun-maverick/umc.cmc.670544bajp6s4pysx4rvctczz",
      icon: "pics/WatchOnline/apple.png",
      lang: "English, Hindi"
    },
    {
      provider: "YouTube",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=C8NnNtWPVgM",
      icon: "pics/WatchOnline/youtube.png",
      lang: "English, Hindi"
    }
  ],
  music: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/playlist/5LvECdnK3riEtPBzXxb7Ol",
      icon: "pics/MusicWebsiteLogos/spotify.png",
      label: "Listen on Spotify"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/album/top-gun-maverick-music-from-the-motion-picture/1621817793",
      icon: "pics/MusicWebsiteLogos/itunes.png",
      label: "Listen on Apple Music"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/top-gun-maverick-music-from-the-motion-picture/VolSNXd98eI_",
      icon: "pics/MusicWebsiteLogos/saavn.png",
      label: "Listen on JioSaavn"
    }
  ],
  officialWebsite: {
    url: "https://www.topgunmovie.com/",
    label: "Visit The Official Website For Top Gun: Maverick"
  },
  socials: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/TopGunMovie",
      icon: "pics/SocialWebsiteLogos/facebook.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "Twitter / X",
      url: "https://twitter.com/TopGunMovie",
      icon: "pics/SocialWebsiteLogos/x.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/topgunmovie/",
      icon: "pics/SocialWebsiteLogos/instagram.png",
      language: "",
      label: "Connect Now"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/paramountpictures",
      icon: "pics/SocialWebsiteLogos/youtube.png",
      language: "",
      label: "Connect Now"
    }
  ],
  similar: [
    {
      title: "Mission: Impossible – Fallout",
      link: "MissionImpossible6.html",
      poster: "pics/Films/MissionImpossibleFallout/2.jpg"
    },
    {
      title: "Mission: Impossible – Dead Reckoning",
      link: "DeadReckoning.html",
      poster: "pics/Films/DeadReckoning/2.jpg"
    },
    {
      title: "Dunkirk",
      link: "Dunkirk.html",
      poster: "pics/Films/Dunkirk/1.jpg"
    },
    {
      title: "First Man",
      link: "FirstMan.html",
      poster: "pics/Films/FirstMan/1.jpg"
    },
    {
      title: "American Made",
      link: "AmericanMade.html",
      poster: "pics/Films/AmericanMade/1.jpg"
    },
    {
      title: "Avatar: The Way of Water",
      link: "AvatarTheWayofWater.html",
      poster: "pics/Films/AvatarTheWayofWater/2.jpg"
    }
  ],
  trailers: [
    {
      title: "Top Gun: Maverick | Official Trailer (2022 Movie) - Tom Cruise",
      url: "https://www.youtube.com/watch?v=qSqVVswa420",
      embedUrl: "https://www.youtube-nocookie.com/embed/qSqVVswa420",
      youtubeId: "qSqVVswa420",
      type: "Main Trailer"
    },
    {
      title: "Top Gun: Maverick | Official Trailer 2 - Paramount Pictures",
      url: "https://www.youtube.com/watch?v=giXco2jaZ_4",
      embedUrl: "https://www.youtube-nocookie.com/embed/giXco2jaZ_4",
      youtubeId: "giXco2jaZ_4",
      type: "Trailer 2"
    },
    {
      title: "Lady Gaga - Hold My Hand (From 'Top Gun: Maverick') [Official Music Video]",
      url: "https://www.youtube.com/watch?v=mNEUkkoUoIA",
      embedUrl: "https://www.youtube-nocookie.com/embed/mNEUkkoUoIA",
      youtubeId: "mNEUkkoUoIA",
      type: "Song 1"
    },
    {
      title: "OneRepublic - I Ain't Worried (From 'Top Gun: Maverick') [Official Music Video]",
      url: "https://www.youtube.com/watch?v=mNEW4JqH4Z4",
      embedUrl: "https://www.youtube-nocookie.com/embed/mNEW4JqH4Z4",
      youtubeId: "mNEW4JqH4Z4",
      type: "Song 2"
    }
  ],
  videos: [
    {
      url: "https://www.youtube.com/watch?v=qSqVVswa420",
      youtubeId: "qSqVVswa420",
      title: "Top Gun: Maverick | Official Trailer (2022 Movie) - Tom Cruise"
    },
    {
      url: "https://www.youtube.com/watch?v=giXco2jaZ_4",
      youtubeId: "giXco2jaZ_4",
      title: "Top Gun: Maverick | Official Trailer 2 - Paramount Pictures"
    },
    {
      url: "https://www.youtube.com/watch?v=mNEUkkoUoIA",
      youtubeId: "mNEUkkoUoIA",
      title: "Lady Gaga - Hold My Hand (From 'Top Gun: Maverick') [Official Music Video]"
    },
    {
      url: "https://www.youtube.com/watch?v=mNEW4JqH4Z4",
      youtubeId: "mNEW4JqH4Z4",
      title: "OneRepublic - I Ain't Worried (From 'Top Gun: Maverick') [Official Music Video]"
    }
  ],
  articles: [
    {
      headline: "Top Gun: Maverick Review — Tom Cruise Flies High in Perfect Blockbuster",
      url: "https://www.denofgeek.com/movies/top-gun-maverick-review-tom-cruise/",
      author: "Den of Geek",
      date: "May 26, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Movie Review: Supersonic Sequel Expands The Myth of Tom Cruise",
      url: "https://www.firstpost.com/entertainment/top-gun-maverick-movie-review-supersonic-sequel-expands-the-myth-of-tom-cruise-10722091.html",
      author: "Firstpost",
      date: "May 27, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun Maverick Early Reviews: Critics Hail Tom Cruise Starrer As A Great Film That Improves On The Original",
      url: "https://www.hindustantimes.com/entertainment/hollywood/top-gun-maverick-early-reviews-critics-hail-tom-cruise-starrer-as-a-great-film-that-improves-on-the-orginal-101652435079400.html",
      author: "Hindustan Times",
      date: "May 13, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Review — A Rare Legacy Sequel That Hits Every High Note",
      url: "https://www.ign.com/articles/top-gun-maverick-review",
      author: "IGN",
      date: "May 12, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun Maverick Movie Review: Tom Cruise Starrer Aces The Skies, Burns The Roads",
      url: "https://indianexpress.com/article/entertainment/movie-review/top-gun-maverick-movie-review-tom-cruise-starrer-aces-the-skies-burns-the-roads-7936771/",
      author: "The Indian Express",
      date: "May 26, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun Maverick Review: Tom Cruise Takes You On A Breathtaking Joyride In Fighter Jet",
      url: "https://www.indiatoday.in/movies/hollywood/story/top-gun-maverick-review-tom-cruise-us-navy-fighter-jet-1954458-2022-05-26",
      author: "India Today",
      date: "May 26, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Review — Tom Cruise Back In The Cockpit After 36 Years Doesn't Miss The Target",
      url: "https://www.ndtv.com/entertainment/top-gun-maverick-review-tom-cruise-back-in-the-cockpit-after-36-years-doesnt-miss-the-target-3-stars-3014063",
      author: "NDTV",
      date: "May 27, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Review — Pure Adrenaline And Nostalgia",
      url: "https://www.rediff.com/movies/review/top-gun-maverick-review/20220521.htm",
      author: "Rediff",
      date: "May 21, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Review — Tom Cruise's Aerial Spectacle Outdoes The Original In Every Way",
      url: "https://www.rollingstone.com/tv-movies/tv-movie-reviews/top-gun-maverick-review-1350586/",
      author: "Rolling Stone",
      date: "May 12, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Review — Tom Cruise Soars in Riveting, Grippingly Directed Sequel",
      url: "https://www.theguardian.com/film/2022/may/29/top-gun-maverick-review-tom-cruise-joseph-kosinski",
      author: "The Guardian",
      date: "May 29, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Movie Review & Film Summary (2022)",
      url: "https://www.rogerebert.com/reviews/top-gun-maverick-movie-review-2022",
      author: "Roger Ebert",
      date: "May 27, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Review — Tom Cruise Makes Absurdly Exciting Return",
      url: "https://www.telegraph.co.uk/films/0/top-gun-maverick-review-tom-cruise-makes-absurdly-exciting-return/",
      author: "The Telegraph",
      date: "May 26, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Movie Review: Tom Cruise Soars In High-Octane Action Blockbuster",
      url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/top-gun-maverick/movie-review/91772508.cms",
      author: "Times of India",
      date: "May 27, 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Top Gun: Maverick Movie Review for Parents",
      url: "https://www.commonsensemedia.org/movie-reviews/top-gun-maverick",
      author: "Common Sense Media",
      date: "May 2022",
      section: "Critic Reviews"
    },
    {
      headline: "Tom Cruise Opens Up On Reuniting With Kate And William Three Years After Top Gun: Maverick, Calls It Amazing",
      url: "https://www.wionews.com/entertainment/hollywood/tom-cruise-opens-up-on-reuniting-with-kate-and-william-three-years-after-top-gun-maverick-calls-it-amazing-1790343595854",
      author: "WION News",
      date: "September 2026",
      section: "News"
    },
    {
      headline: "Maverick Viñales Comeback at Motegi: Thrills in MotoGP Racing",
      url: "https://www.speedweek.com/en/a/motogp/maverick-vinales-comeback-motegi-japan",
      author: "Speedweek",
      date: "September 2026",
      section: "News"
    }
  ],
  wikipedia: "https://en.wikipedia.org/wiki/Top_Gun:_Maverick",
  imdb: "https://www.imdb.com/title/tt1745960/",
  filePath: "E:/OakShow/TopGunMaverick.html"
};

// 1. Update movies.json
console.log('Updating movies.json...');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const movieIndex = movies.findIndex(m => m.id === 'TopGunMaverick' || m.filename === 'TopGunMaverick.html');
if (movieIndex !== -1) {
  movies[movieIndex] = topGunMaverickMovie;
  console.log('Updated existing TopGunMaverick entry in movies.json');
} else {
  movies.unshift(topGunMaverickMovie);
  console.log('Inserted new TopGunMaverick entry into movies.json');
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

// 2. Update search_index.json
console.log('Updating search_index.json...');
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: "TopGunMaverick",
  title: "Top Gun: Maverick",
  type: "movie",
  category: "Hollywood",
  genre: "Action, Drama, Thriller, Adventure",
  language: "English",
  year: "2022",
  score: 9.8,
  poster: "pics/Films/TopGunMaverick/1.jpg",
  url: "TopGunMaverick.html",
  keywords: "Tom Cruise, Miles Teller, Jennifer Connelly, Jon Hamm, Glen Powell, Joseph Kosinski, Pete Mitchell, Rooster, Maverick, TOPGUN, 17th highest grossing, Oscar winner"
};
const sIdx = searchIndex.findIndex(s => s.id === 'TopGunMaverick' || s.url === 'TopGunMaverick.html');
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
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Den of Geek",
    criticName: "David Crow",
    outlet: "Den of Geek",
    score: "3.5/5",
    rating: "3.5/5",
    date: "May 26, 2022",
    title: "Top Gun: Maverick Review — Tom Cruise Flies High in Perfect Blockbuster",
    url: "https://www.denofgeek.com/movies/top-gun-maverick-review-tom-cruise/"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Firstpost",
    criticName: "Prahlad Srihari",
    outlet: "Firstpost",
    score: "4/5",
    rating: "4/5",
    date: "May 27, 2022",
    title: "Top Gun: Maverick Movie Review: Supersonic Sequel Expands The Myth of Tom Cruise",
    url: "https://www.firstpost.com/entertainment/top-gun-maverick-movie-review-supersonic-sequel-expands-the-myth-of-tom-cruise-10722091.html"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Hindustan Times",
    criticName: "Hindustan Times",
    outlet: "Hindustan Times",
    score: "4.5/5",
    rating: "Recommended",
    date: "May 13, 2022",
    title: "Top Gun Maverick Early Reviews: Critics Hail Tom Cruise Starrer As A Great Film That Improves On The Original",
    url: "https://www.hindustantimes.com/entertainment/hollywood/top-gun-maverick-early-reviews-critics-hail-tom-cruise-starrer-as-a-great-film-that-improves-on-the-orginal-101652435079400.html"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "IGN",
    criticName: "Matt Donato",
    outlet: "IGN",
    score: "7/10",
    rating: "7/10",
    date: "May 12, 2022",
    title: "Top Gun: Maverick Review — A Rare Legacy Sequel That Hits Every High Note",
    url: "https://www.ign.com/articles/top-gun-maverick-review"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "The Indian Express",
    criticName: "Shalini Langer",
    outlet: "The Indian Express",
    score: "4/5",
    rating: "4/5",
    date: "May 26, 2022",
    title: "Top Gun Maverick Movie Review: Tom Cruise Starrer Aces The Skies, Burns The Roads",
    url: "https://indianexpress.com/article/entertainment/movie-review/top-gun-maverick-movie-review-tom-cruise-starrer-aces-the-skies-burns-the-roads-7936771/"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "India Today",
    criticName: "Tushar Joshi",
    outlet: "India Today",
    score: "3.5/5",
    rating: "3.5/5",
    date: "May 26, 2022",
    title: "Top Gun Maverick Review: Tom Cruise Takes You On A Breathtaking Joyride In Fighter Jet",
    url: "https://www.indiatoday.in/movies/hollywood/story/top-gun-maverick-review-tom-cruise-us-navy-fighter-jet-1954458-2022-05-26"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "NDTV",
    criticName: "Saibal Chatterjee",
    outlet: "NDTV",
    score: "3/5",
    rating: "3/5",
    date: "May 27, 2022",
    title: "Top Gun: Maverick Review — Tom Cruise Back In The Cockpit After 36 Years Doesn't Miss The Target",
    url: "https://www.ndtv.com/entertainment/top-gun-maverick-review-tom-cruise-back-in-the-cockpit-after-36-years-doesnt-miss-the-target-3-stars-3014063"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Rediff",
    criticName: "Sukanya Verma",
    outlet: "Rediff Movies",
    score: "2.5/5",
    rating: "2.5/5",
    date: "May 21, 2022",
    title: "Top Gun: Maverick Review — Pure Adrenaline And Nostalgia",
    url: "https://www.rediff.com/movies/review/top-gun-maverick-review/20220521.htm"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Rolling Stone",
    criticName: "David Fear",
    outlet: "Rolling Stone",
    score: "4/5",
    rating: "4/5",
    date: "May 12, 2022",
    title: "Top Gun: Maverick Review — Tom Cruise's Aerial Spectacle Outdoes The Original In Every Way",
    url: "https://www.rollingstone.com/tv-movies/tv-movie-reviews/top-gun-maverick-review-1350586/"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "The Guardian",
    criticName: "Peter Bradshaw",
    outlet: "The Guardian",
    score: "4/5",
    rating: "4/5",
    date: "May 29, 2022",
    title: "Top Gun: Maverick Review — Tom Cruise Soars in Riveting, Grippingly Directed Sequel",
    url: "https://www.theguardian.com/film/2022/may/29/top-gun-maverick-review-tom-cruise-joseph-kosinski"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Roger Ebert",
    criticName: "Tomris Laffly",
    outlet: "Roger Ebert",
    score: "4/4",
    rating: "4/4",
    date: "May 27, 2022",
    title: "Top Gun: Maverick Movie Review & Film Summary (2022)",
    url: "https://www.rogerebert.com/reviews/top-gun-maverick-movie-review-2022"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "The Telegraph",
    criticName: "Robbie Collin",
    outlet: "The Telegraph",
    score: "5/5",
    rating: "5/5",
    date: "May 26, 2022",
    title: "Top Gun: Maverick Review — Tom Cruise Makes Absurdly Exciting Return",
    url: "https://www.telegraph.co.uk/films/0/top-gun-maverick-review-tom-cruise-makes-absurdly-exciting-return/"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Times of India",
    criticName: "Times of India",
    outlet: "Times of India",
    score: "4/5",
    rating: "4/5",
    date: "May 27, 2022",
    title: "Top Gun: Maverick Movie Review: Tom Cruise Soars In High-Octane Action Blockbuster",
    url: "https://timesofindia.indiatimes.com/entertainment/english/movie-reviews/top-gun-maverick/movie-review/91772508.cms"
  },
  {
    movieId: "TopGunMaverick",
    movie: "Top Gun: Maverick",
    author: "Common Sense Media",
    criticName: "Jeffrey M. Anderson",
    outlet: "Common Sense Media",
    score: "4/5",
    rating: "4/5",
    date: "May 2022",
    title: "Top Gun: Maverick Movie Review for Parents",
    url: "https://www.commonsensemedia.org/movie-reviews/top-gun-maverick"
  }
];

reviewsToAdd.forEach((r, idx) => {
  const fIdx = reviews.findIndex(item => item.url === r.url);
  const reviewObj = {
    id: `top-gun-maverick-review-${idx + 1}`,
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
    movieId: "TopGunMaverick",
    movieTitle: "Top Gun: Maverick",
    title: "Tom Cruise opens up on reuniting with Kate and William three years after Top Gun: Maverick, calls it amazing",
    source: "WION News",
    date: "September 2026",
    url: "https://www.wionews.com/entertainment/hollywood/tom-cruise-opens-up-on-reuniting-with-kate-and-william-three-years-after-top-gun-maverick-calls-it-amazing-1790343595854",
    category: "Hollywood"
  },
  {
    movieId: "TopGunMaverick",
    movieTitle: "Top Gun: Maverick",
    title: "Maverick Viñales Comeback at Motegi: Thrills in MotoGP Racing",
    source: "Speedweek",
    date: "September 2026",
    url: "https://www.speedweek.com/en/a/motogp/maverick-vinales-comeback-motegi-japan",
    category: "Hollywood"
  }
];

newsToAdd.forEach((n, idx) => {
  const fIdx = news.findIndex(item => item.url === n.url);
  const newsObj = {
    id: `top-gun-maverick-news-${idx + 1}`,
    ...n
  };
  if (fIdx !== -1) {
    news[fIdx] = newsObj;
  } else {
    news.unshift(newsObj);
  }
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

console.log('Successfully updated movies.json, search_index.json, reviews.json, and news.json!');
