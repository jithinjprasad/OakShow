const fs = require('fs');
const path = require('path');
const pubDir = path.resolve(__dirname, '../public');

const missing = [
  'sorandtp/plant-a-tree.jpg',
  'pics/Films/JusticeLeague/posters/1.jpg',
  'pics/Films/KhaidiNo150/1.jpg',
  'pics/Games/DragonBallLegends/Dragon-Ball-Legends-Ratings-Reviews-Download.jpg',
  'images/web.png',
  'pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-an-average-movie.png',
  'pics/RatingSiteLogos/hindustan-times.ico',
  'pics/Films/TheLegoBatmanMovie/1.jpg',
  'pics/RatingSiteLogos/roger-ebert.ico',
  'pics/Films/JasonBourne/1.jpg',
  'pics/RatingSiteLogos/rogerebert.png',
  'pics/Films/PiecesofaWoman/2.jpg',
  'pics/Films/Good Time/1.jpg',
  'pics/RatingSiteLogos/mid-day.ico',
  'pics/Films/Call Me by Your Name/1.jpg',
  'pics/Films/LaLaLand/1.jpg',
  'pics/Films/KnivesOut/2.jpg',
  'pics/RatingSiteLogos/hindus-tantimes.png',
  'pics/Films/Gundala/Gundala-Movie-Reviews-and-Ratings-2.jpg',
  'pics/RatingSiteLogos/ndtv.png',
  'pics/WatchOnline/hot-star.png',
  'pics/Films/Comali/posters/1.jpg',
  'news/pics/november-17-2019-november-23-2019.jpg',
  'pics/DBS/95.JPG',
  'pics/RatingSiteLogos/behind-woods.png',
  'pics/Films/Virus/1.jpg',
  'pics/RatingSiteLogos/news18.png',
  'pics/Films/RogueOneAStarWarsStory/1.jpg',
  'pics/Filmls/Nayaki/1.jpg',
  'pics/Films/MissionImpossibleFallout/.jpg',
  'pics/RatingSiteLogos/oakshow.png',
  'pics/RatingSiteLogos/denofgeek.png',
  'pics/Films/Traffik/1.jpg',
  'pics/Films/BhaveshJoshiSuperheroSuperhero/1.jpg',
  'pics/Films/2point0/1.jpg',
  'pics/Films/The Lego Batman/1.jpg',
  'pics/Films/WindRivert/1.jpg',
  'pics/Films/MaragadhaNaanayam/1.jpg',
  'pics/Films/Muskurahatein/1.jpg',
  'pics/Films/ProfessorMarstonandtheWonderWomen/1.jpg',
  'pics/Films/Rum/4.JPG',
  'pics/Films/Bushwick/1.jpg',
  'pics/WatchOnline/you-tube.png',
  'pics/Films/Budhia Singh – Born to Run/4.jpg',
  'pics/Films/Great Grand Masti/2.jpg',
  'pics/Films/The Promise/1.jpg',
  'Gif/animalrights.gif',
  'assets/img/Personal/1.jpg',
  'pics/Bottom/1.jpg',
  'images/3.jpg',
  'VishnuPc/pics/1.jpg',
  'JithinJPrasad/pics/1.jpg',
  'AchuthanKarnnan/pics/1.jpg',
  'ManojAswin/pics/1.jpg',
  'AbhijithAG/pics/1.jpg',
  'MsMrOakShow/pics/1.jpg',
  'pics/Serieses/PlayingGuest/2.jpg',
  'misc/pics/1.jpg',
  'pics/Films/Sherlock/1.jpg',
  'pics/WatchOnline/apple-tv.png',
  'dbs/epsiodes/101.jpg'
];

function findSimilar(subPath) {
  const parts = subPath.split('/');
  const base = parts.pop();
  let curr = pubDir;
  for (const p of parts) {
    if (!fs.existsSync(curr)) return null;
    const entries = fs.readdirSync(curr);
    const match = entries.find(e => e.toLowerCase().replace(/[\s\-_.]/g, '') === p.toLowerCase().replace(/[\s\-_.]/g, ''));
    if (match) curr = path.join(curr, match);
    else return null;
  }
  if (!fs.existsSync(curr)) return null;
  const files = fs.readdirSync(curr);
  const matchFile = files.find(f => f.toLowerCase().replace(/[\s\-_.]/g, '') === base.toLowerCase().replace(/[\s\-_.]/g, ''));
  if (matchFile) {
    return path.relative(pubDir, path.join(curr, matchFile)).replace(/\\/g, '/');
  }
  return { dirExists: true, actualDir: path.relative(pubDir, curr).replace(/\\/g, '/'), filesInDir: files.slice(0, 5) };
}

for (const m of missing) {
  const sim = findSimilar(m);
  if (sim) {
    console.log(`${m}  ==>  ${JSON.stringify(sim)}`);
  }
}
