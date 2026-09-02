// OakShow Official Verdict & Certificate Remarks Definition
// Introduced July 24th, 2018 (Legacy reference: RemarksAtOakShow.html)

export const OAKSHOW_REMARKS = {
  MUST_WATCH: {
    key: 'must-watch',
    title: 'Shielded / Must Watch',
    shortLabel: 'Must Watch',
    range: '80% – 100%',
    minPercentage: 80,
    maxPercentage: 100,
    icon: '/pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png',
    badgeClass: 'verdict-must-watch',
    color: '#ffb800',
    meaning: 'Shielded/Must Watch, OakShow gives this verdict to every movies/series/games/books which were able to get a minimum of 80% of the maximum ratings. By giving this verdict OakShow is saying that anyone could watch/read/play and enjoy it.'
  },
  SAFE_TO_WATCH: {
    key: 'safe-to-watch',
    title: 'Safe To Watch',
    shortLabel: 'Safe to Watch',
    range: '60% – 79%',
    minPercentage: 60,
    maxPercentage: 79,
    icon: '/pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-safe.png',
    badgeClass: 'verdict-safe',
    color: '#00d26a',
    meaning: 'Safe To Watch, Every movies/series/games/books which falls under the category of acquiring 60% to 79% of the total ratings will get this verdict. Giving this verdict OakShow says that you can watch/read/play it without fear but not everyone might be able to enjoy it to the core.'
  },
  ABOVE_AVERAGE: {
    key: 'above-average',
    title: 'Average / Above Average',
    shortLabel: 'Above Average',
    range: '50% – 59%',
    minPercentage: 50,
    maxPercentage: 59,
    icon: '/pics/RatingSiteLogos/OakShowCertificates/oakshow-says-this-one-is-above-average.png',
    badgeClass: 'verdict-above',
    color: '#38bdf8',
    meaning: 'Average/Above Average, Movies/Series/Games/Books with a minimum of 50% to 59% gets this verdict, and they probably are 1 time watchers/readers.'
  },
  WATCH_AT_RISK: {
    key: 'watch-at-risk',
    title: 'Watch it at Your Risk',
    shortLabel: 'Watch at Risk',
    range: '0% – 49%',
    minPercentage: 0,
    maxPercentage: 49,
    icon: '/pics/RatingSiteLogos/OakShowCertificates/oakshow-says-to-watch-it-at-your-own-risk.png',
    badgeClass: 'verdict-risk',
    color: '#ff4d58',
    meaning: 'Watch it at Your Risk, Those which scores 49% and below gets this verdict.'
  }
};

export const OAKSHOW_REMARKS_LIST = [
  OAKSHOW_REMARKS.MUST_WATCH,
  OAKSHOW_REMARKS.SAFE_TO_WATCH,
  OAKSHOW_REMARKS.ABOVE_AVERAGE,
  OAKSHOW_REMARKS.WATCH_AT_RISK
];

export function parseOakShowScorePercentage(scoreStr) {
  if (scoreStr === null || scoreStr === undefined) return 75;
  if (typeof scoreStr === 'number') {
    if (scoreStr <= 5) return (scoreStr / 5) * 100;
    if (scoreStr <= 10) return (scoreStr / 10) * 100;
    return Math.min(100, Math.max(0, scoreStr));
  }
  
  const clean = scoreStr.toString().trim();
  if (clean.includes('%')) {
    const n = parseFloat(clean);
    return isNaN(n) ? 75 : Math.min(100, Math.max(0, n));
  }
  if (clean.includes('/10')) {
    const num = parseFloat(clean.split('/')[0]) || 7;
    return Math.min(100, Math.max(0, (num / 10) * 100));
  }
  if (clean.includes('/5')) {
    const num = parseFloat(clean.split('/')[0]) || 3.5;
    return Math.min(100, Math.max(0, (num / 5) * 100));
  }
  if (clean.includes('/100')) {
    const num = parseFloat(clean.split('/')[0]) || 70;
    return Math.min(100, Math.max(0, num));
  }
  const n = parseFloat(clean);
  if (!isNaN(n)) {
    if (n <= 5) return (n / 5) * 100;
    if (n <= 10) return (n / 10) * 100;
    return Math.min(100, Math.max(0, n));
  }
  return 75;
}

export function getOakShowRemark(scoreOrRemark) {
  if (!scoreOrRemark) return OAKSHOW_REMARKS.SAFE_TO_WATCH;

  if (typeof scoreOrRemark === 'string') {
    const lower = scoreOrRemark.toLowerCase().trim();
    if (lower.includes('must') || lower.includes('shield')) return OAKSHOW_REMARKS.MUST_WATCH;
    if (lower.includes('safe')) return OAKSHOW_REMARKS.SAFE_TO_WATCH;
    if (lower.includes('above') || (lower.includes('average') && !lower.includes('safe') && !lower.includes('risk'))) return OAKSHOW_REMARKS.ABOVE_AVERAGE;
    if (lower.includes('risk')) return OAKSHOW_REMARKS.WATCH_AT_RISK;
  }

  const pct = parseOakShowScorePercentage(scoreOrRemark);
  if (pct >= 80) return OAKSHOW_REMARKS.MUST_WATCH;
  if (pct >= 60) return OAKSHOW_REMARKS.SAFE_TO_WATCH;
  if (pct >= 50) return OAKSHOW_REMARKS.ABOVE_AVERAGE;
  return OAKSHOW_REMARKS.WATCH_AT_RISK;
}

export const KNOWN_RATING_SOURCES = [
  { match: /roger\s*ebert/i, name: 'Roger Ebert' },
  { match: /common\s*[sa]ense\s*media|commonsense/i, name: 'Common Sense Media' },
  { match: /rolling\s*stone|rollingstone/i, name: 'Rolling Stone' },
  { match: /den\s*of\s*geek|denofgeek/i, name: 'Den of Geek' },
  { match: /digital\s*spy/i, name: 'Digital Spy' },
  { match: /deccan\s*chronicle|deccanchronicle/i, name: 'Deccan Chronicle' },
  { match: /news\s*18|news18/i, name: 'News18' },
  { match: /book\s*my\s*show|bookmyshow/i, name: 'BookMyShow' },
  { match: /independent(\.ie)?|indipendent/i, name: 'The Independent' },
  { match: /telegraph/i, name: 'The Telegraph' },
  { match: /the\s*guardian|guardian/i, name: 'The Guardian' },
  { match: /the\s*indian\s*express|indian\s*express/i, name: 'The Indian Express' },
  { match: /times\s*of\s*india/i, name: 'Times of India' },
  { match: /hindustan\s*times/i, name: 'Hindustan Times' },
  { match: /india\s*today/i, name: 'India Today' },
  { match: /bollywood\s*hungama/i, name: 'Bollywood Hungama' },
  { match: /firstpost/i, name: 'Firstpost' },
  { match: /ndtv/i, name: 'NDTV' },
  { match: /rediff/i, name: 'Rediff' },
  { match: /behindwoods/i, name: 'Behindwoods' },
  { match: /times\s*now/i, name: 'Times Now' },
  { match: /mid[\s-]*day/i, name: 'Mid-Day' },
  { match: /dna\s*india/i, name: 'DNA India' },
  { match: /\bnme\b/i, name: 'NME' },
  { match: /\bvox\b/i, name: 'Vox' },
  { match: /\bew\b|entertainment\s*weekly/i, name: 'Entertainment Weekly' },
  { match: /\bign\b/i, name: 'IGN' },
  { match: /indiewire/i, name: 'IndieWire' },
  { match: /slashfilm/i, name: 'SlashFilm' },
  { match: /avclub/i, name: 'The A.V. Club' },
  { match: /empireonline|empire/i, name: 'Empire' },
  { match: /screenrant/i, name: 'Screen Rant' },
  { match: /cinemablend/i, name: 'CinemaBlend' },
  { match: /tribute/i, name: 'Tribute.ca' },
  { match: /kidzworld/i, name: 'Kidzworld' },
  { match: /letterboxd/i, name: 'Letterboxd' },
  { match: /koimoi/i, name: 'Koimoi' },
  { match: /123telugu/i, name: '123telugu' },
  { match: /mirchi9/i, name: 'Mirchi9' },
  { match: /telugu360/i, name: 'Telugu360' },
  { match: /pocketgamer/i, name: 'Pocket Gamer' },
  { match: /goodreads/i, name: 'Goodreads' },
  { match: /tvguide/i, name: 'TV Guide' },
  { match: /tv\.com/i, name: 'TV.com' },
  { match: /rotten\s*tomatoes/i, name: 'Rotten Tomatoes' },
  { match: /metacritic/i, name: 'Metacritic' },
  { match: /imdb/i, name: 'IMDb' },
  { match: /oakshow/i, name: 'OakShow' }
];

export function cleanRatingSource(src) {
  if (!src) return src;
  for (const item of KNOWN_RATING_SOURCES) {
    if (item.match.test(src)) {
      return item.name;
    }
  }
  return src.replace(/^\W+/, '').trim();
}
