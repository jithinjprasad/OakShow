import fs from 'fs';
import path from 'path';

const moviesPath = path.resolve('data/movies.json');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

const mIdx = movies.findIndex(m => m.id === 'BethlehemKudumbaUnit');
if (mIdx !== -1) {
  const m = movies[mIdx];

  // Enhanced Cast with Roles
  m.cast = [
    { actor: "Nivin Pauly", role: "Justin Davis 'Mp3 King'", description: "An enthusiastic audio cassette & MP3 dealer and Ashley's love interest" },
    { actor: "Mamitha Baiju", role: "Ashley Thankachan 'Room 17'", description: "Justin's spirited love interest" },
    { actor: "Sangeeth Prathap", role: "Joel Davis", description: "Justin's younger brother" },
    { actor: "Roshan Shanavas", role: "Glixon", description: "Justin and Joel's close friend" },
    { actor: "Shyam Mohan", role: "Hari", description: "Sayoojya's brother" },
    { actor: "Suresh Krishna", role: "Baiju", description: "Justin's loyal friend" },
    { actor: "Vinay Forrt", role: "Alex", description: "Ashley's eccentric uncle" },
    { actor: "Srinda", role: "Reshma Moreli", description: "Justin's first cousin" },
    { actor: "Meenakshi Raveendran", role: "Riya Moreli", description: "Justin's cousin" },
    { actor: "Sreerenjini", role: "Renju Moreli", description: "Justin's cousin" },
    { actor: "Bindu Panicker", role: "Sister Cicily / Kunjaunty", description: "Justin and Joel's aunt" },
    { actor: "Shameer Khan", role: "Printo", description: "Justin's friend" },
    { actor: "Parvathy Ayyappadas", role: "Sayoojya", description: "Hari's sister and Joel's wife" },
    { actor: "Vineeth Vishwam", role: "Actor Nandanji", description: "Local film personality" },
    { actor: "Priya S Babu", role: "Printo's Wife", description: "" },
    { actor: "Abhiram", role: "Alan Thankachan", description: "Ashley's younger brother" },
    { actor: "Jazar Clicks", role: "Devadath", description: "Hari's cousin" },
    { actor: "Vettukili Prakash", role: "Davis", description: "Justin and Joel's father" },
    { actor: "Jayashankar Karimuttam", role: "Thankachan", description: "Ashley and Alan's father" },
    { actor: "Manjusree", role: "Biji", description: "Ashley and Alan's mother" },
    { actor: "Thankam Mohan", role: "Justin's Mother", description: "Justin and Joel's mother" },
    { actor: "Chembil Ashokan", role: "Grandfather", description: "Ashley and Alan's grandfather" },
    { actor: "Syam Pushkaran", role: "Father (Priest)", description: "Special Cameo Appearance" }
  ];

  // Key Crew & Production
  m.director = "Girish A. D.";
  m.writers = "Girish A. D., Kiran Josey";
  m.producers = "Fahadh Faasil, Dileesh Pothan, Syam Pushkaran";
  m.productionStudios = "Bhavana Studios, Working Class Hero, Fahadh Faasil and Friends";
  m.distributors = "Bhavana Release, Future RunUp Films, Mythri Movie Makers";
  m.cinematography = "Ajmal Sabu";
  m.editor = "Akash Joseph Varghese";
  m.musicComposer = "Vishnu Vijay";
  m.streamingPartner = "JioHotstar";

  // Box Office Data from Official Sources
  m.boxOffice = {
    budget: "₹23 Crore",
    openingDay: "₹16.20 Crore",
    openingWeekend: "₹128.80 Crore",
    indiaGross: "₹61.55 Crore",
    overseasGross: "₹67.25 Crore ($7.05M)",
    worldwideGross: "₹175.00 Crore",
    verdict: "All-Time Blockbuster",
    lastUpdated: "August 30, 2026",
    source: "Asianet News / Wikipedia"
  };

  // Music Soundtracks
  m.soundtracks = [
    {
      title: "Illey Illa",
      singers: "Kapil Kapilan",
      lyrics: "Suhail Koya",
      duration: "2:31",
      spotifyUrl: "https://open.spotify.com/album/5csusQmmo7K6fZmv2GmB0j",
      appleMusicUrl: "https://music.apple.com/in/song/illey-illa-from-bethlehem-kudumba-unit/6805903729",
      jioSaavnUrl: "https://www.jiosaavn.com/album/bethlehem-kudumba-unit/IdclyaFWIGI_"
    },
    {
      title: "Maanthrikam",
      singers: "M. G. Sreekumar",
      lyrics: "Vinayak Sasikumar",
      duration: "3:17"
    }
  ];

  // Social & External Links
  m.socials = [
    {
      platform: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Bethlehem_Kudumba_Unit",
      label: "Wikipedia Official Article"
    },
    {
      platform: "IMDb",
      url: "https://www.imdb.com/title/tt37535100/",
      label: "IMDb Database Page"
    },
    {
      platform: "Rotten Tomatoes",
      url: "https://www.rottentomatoes.com/m/bethlehem_kudumba_unit",
      label: "Rotten Tomatoes (100% Score)"
    }
  ];

  // Additional New Indian Express Critic Review
  const hasNIE = m.articles.some(a => a.author.includes('New Indian Express'));
  if (!hasNIE) {
    m.articles.push({
      headline: "Bethlehem Kudumba Unit Review: A charming slice-of-life drama that delivers big on laughs and warmth",
      author: "The New Indian Express (Vignesh Madhu)",
      date: "August 22, 2026",
      section: "Critic Review (3.5/5)",
      url: "https://www.newindianexpress.com/entertainment/review/2026/Aug/22/bethlehem-kudumba-unit-review"
    });
  }

  movies[mIdx] = m;
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`✅ Updated Bethlehem Kudumba Unit with complete Wikipedia production, cast, box office (₹175 Cr), and music data!`);
}
