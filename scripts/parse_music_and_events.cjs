const fs = require('fs');
const path = require('path');

// 1. MUSIC DATA
const musicData = [
  {
    id: "kamikaze-eminem",
    title: "Kamikaze (Eminem album)",
    artist: "Eminem",
    language: "English",
    genre: "Hip Hop",
    duration: "45:49",
    releaseDate: "August 31, 2018",
    poster: "pics/Music/Kamikaze/Kamikaze-Reviews-and-Ratings.jpg",
    summary: "Kamikaze is the tenth studio album by American rapper Eminem. Featuring unannounced release with hard-hitting tracks responding to critics.",
    ratings: {
      oakshowRemark: "Must Listen",
      oakshowScore: "8.3/10",
      metacritic: "65/100",
      guardian: "3/5",
      nme: "3/5"
    },
    youtubeId: "MfTbHITdhEI",
    tracks: [
      { title: "The Ringer", duration: "5:37" },
      { title: "Greatest", duration: "3:46" },
      { title: "Lucky You (feat. Joyner Lucas)", duration: "4:04" },
      { title: "Fall", duration: "4:22" },
      { title: "Kamikaze", duration: "3:36" },
      { title: "Venom (Music from the Motion Picture)", duration: "4:29" }
    ]
  },
  {
    id: "dil-bechara-soundtrack",
    title: "Dil Bechara (Original Motion Picture Soundtrack)",
    artist: "A. R. Rahman",
    language: "Hindi",
    genre: "Soundtrack / Romance",
    duration: "29:48",
    releaseDate: "July 10, 2020",
    poster: "images/4.jpg",
    summary: "Heartfelt and emotional musical composition by Academy Award winner A. R. Rahman for Sushant Singh Rajput's final film.",
    ratings: {
      oakshowRemark: "Must Listen",
      oakshowScore: "9.1/10",
      metacritic: "88/100",
      guardian: "4/5",
      nme: "4.5/5"
    },
    youtubeId: "PMCu0JtizCk",
    tracks: [
      { title: "Dil Bechara", duration: "2:43" },
      { title: "Taare Ginn", duration: "4:17" },
      { title: "Khulke Jeene Ka", duration: "4:06" },
      { title: "Main Tumhara", duration: "4:18" },
      { title: "Maskhari", duration: "3:14" }
    ]
  },
  {
    id: "baahubali-2-soundtrack",
    title: "Baahubali 2: The Conclusion (Soundtrack)",
    artist: "M. M. Keeravani",
    language: "Telugu / Tamil / Hindi / Malayalam",
    genre: "Epic Soundtrack",
    duration: "22:15",
    releaseDate: "March 26, 2017",
    poster: "images/1.jpg",
    summary: "Grand orchestral and classical Indian score by M. M. Keeravani driving the biggest Indian blockbuster of all time.",
    ratings: {
      oakshowRemark: "Must Listen",
      oakshowScore: "8.9/10",
      metacritic: "85/100",
      guardian: "4/5",
      nme: "4/5"
    },
    youtubeId: "qD-6d8Wo3do",
    tracks: [
      { title: "Saahore Baahubali", duration: "3:22" },
      { title: "Hamsa Naava", duration: "3:23" },
      { title: "Kannaa Nidurinchara", duration: "4:51" },
      { title: "Dandaalayyaa", duration: "3:30" }
    ]
  },
  {
    id: "half-girlfriend-ost",
    title: "Half Girlfriend (Original Motion Picture Soundtrack)",
    artist: "Mithoon, Tanishk Bagchi, Rishi Rich, Farhan Saeed",
    language: "Hindi",
    genre: "Bollywood Pop / Romance",
    duration: "40:12",
    releaseDate: "April 28, 2017",
    poster: "images/3.jpg",
    summary: "Chart-topping romantic melodies featuring Baarish, Phir Bhi Tumko Chaahunga, and Thodi Der.",
    ratings: {
      oakshowRemark: "Safe To Listen",
      oakshowScore: "7.8/10",
      metacritic: "70/100",
      guardian: "3.5/5",
      nme: "3.5/5"
    },
    youtubeId: "BNfAf4To73c",
    tracks: [
      { title: "Baarish", duration: "4:36" },
      { title: "Phir Bhi Tumko Chaahunga", duration: "5:51" },
      { title: "Thodi Der", duration: "4:56" },
      { title: "Tu Hi Hai", duration: "5:22" }
    ]
  }
];

// 2. EVENTS DATA
const eventsData = [
  {
    id: "tesffa-2019",
    title: "The 3rd Eye Short Film Festival and Awards (TESFFA) 2019",
    category: "Film Festival & Awards Gala",
    venue: "Don Bosco Art School",
    venueLink: "https://www.3rdeyemovieclub.com/",
    dates: "April 27th - 28th, 2019",
    year: "2019",
    location: "Kochi, Kerala, India",
    poster: "pics/Events/TESFFA2019/TESFFA-2019.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=_RWMz8yuki_U",
    youtubeId: "_RWMz8yuki_U",
    summary: "The prestigious annual short film festival celebrating visionary independent directors, student cinema, screenwriting excellence, and documentary filmmaking in South India.",
    highlights: [
      "Screening of over 50 shortlisted international & regional short films",
      "Masterclass with veteran cinematographers and award-winning editors",
      "Annual Grand Jury Awards Gala & Cash Prizes",
      "Interactive Q&A and networking lounge with film industry producers"
    ],
    bookingInfo: "Official attendee passes available via OakShow Events Desk.",
    status: "Concluded (Archive Verified)"
  },
  {
    id: "oakshow-cinema-awards-2020",
    title: "OakShow Annual Cinema & Critical Acclaim Awards",
    category: "Annual Critic Awards",
    venue: "Virtual Gala & Broadcast",
    venueLink: "http://oakshow.in",
    dates: "December 30, 2020",
    year: "2020",
    location: "Online / Digital Premiere",
    poster: "favicon.png",
    trailerUrl: "",
    youtubeId: "GODAlxW5Pes",
    summary: "Recognizing outstanding achievements across Indian Cinema, Hollywood releases, and emerging web series based on OakShow Shielded Remarks.",
    highlights: [
      "Shielded / Must Watch Film of the Year",
      "Best Directorial Vision in Regional Cinema",
      "Breakout Performance in Web Television",
      "Technical Excellence in Sound & Visual Effects"
    ],
    bookingInfo: "Free public access on OakShow archives.",
    status: "Archive Recorded"
  }
];

fs.writeFileSync('data/music.json', JSON.stringify(musicData, null, 2), 'utf-8');
fs.writeFileSync('data/events.json', JSON.stringify(eventsData, null, 2), 'utf-8');

console.log('✓ Created data/music.json (' + musicData.length + ' albums)');
console.log('✓ Created data/events.json (' + eventsData.length + ' events)');
