const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const baseDir = path.resolve('Profiles/CriticProfiles');
const movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf-8'));
const series = JSON.parse(fs.readFileSync('data/series.json', 'utf-8'));

const movieMap = new Map();
movies.forEach(m => {
  movieMap.set(m.id.toLowerCase(), m);
  if (m.slug) movieMap.set(m.slug.toLowerCase(), m);
  if (m.filename) movieMap.set(m.filename.replace('.html', '').toLowerCase(), m);
  if (m.title) movieMap.set(m.title.toLowerCase().replace(/[^a-z0-9]/g, ''), m);
});

const seriesMap = new Map();
series.forEach(s => {
  seriesMap.set(s.id.toLowerCase(), s);
  if (s.slug) seriesMap.set(s.slug.toLowerCase(), s);
  if (s.filename) seriesMap.set(s.filename.replace('.html', '').toLowerCase(), s);
  if (s.title) seriesMap.set(s.title.toLowerCase().replace(/[^a-z0-9]/g, ''), s);
});

// Month map for parsing dates like "02 June,2019", "11 Sep,2018", "04 Feberuary,2020"
const monthMap = {
  jan: '01', january: '01',
  feb: '02', feberuary: '02', february: '02',
  mar: '03', march: '03',
  apr: '04', april: '04',
  may: '05',
  jun: '06', june: '06',
  jul: '07', july: '07',
  aug: '08', august: '08',
  sep: '09', september: '09',
  oct: '10', october: '10',
  nov: '11', november: '11',
  dec: '12', december: '12'
};

function parseDateToISO(raw) {
  if (!raw) return { iso: '2018-01-01', formatted: 'Jan 01, 2018', timestamp: new Date('2018-01-01').getTime() };
  let str = raw.trim();

  // Pattern: DD-MM-YYYY or DD/MM/YYYY
  const numMatch = str.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{4})$/);
  if (numMatch) {
    const d = numMatch[1].padStart(2, '0');
    const m = numMatch[2].padStart(2, '0');
    const y = numMatch[3];
    const iso = `${y}-${m}-${d}`;
    const dt = new Date(`${y}-${m}-${d}T12:00:00Z`);
    const formatted = dt.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return { iso, formatted, timestamp: dt.getTime() };
  }

  // Pattern: DD Month, YYYY or DD Month YYYY
  const textMatch = str.match(/([0-9]{1,2})\s*([A-Za-z]+),?\s*([0-9]{4})/);
  if (textMatch) {
    const d = textMatch[1].padStart(2, '0');
    const monStr = textMatch[2].toLowerCase();
    const m = monthMap[monStr] || '01';
    const y = textMatch[3];
    const iso = `${y}-${m}-${d}`;
    const dt = new Date(`${y}-${m}-${d}T12:00:00Z`);
    const formatted = `${d} ${textMatch[2]} ${y}`;
    return { iso, formatted, timestamp: dt.getTime() };
  }

  return { iso: '2018-01-01', formatted: str, timestamp: new Date('2018-01-01').getTime() };
}

// 1. Define Critics metadata
const criticsInfo = [
  {
    id: 'abhijith-a-g',
    slug: 'AbhijithAG',
    name: 'Abhijith A G',
    designation: 'Certified Film Critic & Columnist',
    location: 'Kerala, India',
    joiningDate: 'July 28, 2018',
    avatar: 'Profiles/CriticProfiles/AbhijithAG/pics/abhijith-a-g-character-icon.png',
    coverImage: 'Profiles/CriticProfiles/AbhijithAG/pics/1.jpg',
    bio: 'Environmentalist, cinema aficionado, and avid pop-culture reviewer writing comprehensive reviews across Hollywood and South Indian Cinema.',
    hobbies: 'Watching Movies and Series, Tech Research, World Cinema',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/abhijithag1' },
      { platform: 'Twitter', url: 'https://twitter.com/oak_show' },
      { platform: 'Instagram', url: 'https://instagram.com/oak_show' }
    ],
    featuredPosters: [
      'Profiles/CriticProfiles/AbhijithAG/pics/lucifer.jpg',
      'Profiles/CriticProfiles/AbhijithAG/pics/deadpool-2.jpg'
    ]
  },
  {
    id: 'jithin-j-prasad',
    slug: 'JithinJPrasad',
    name: 'Jithin J Prasad',
    designation: 'Senior Movie Critic & Feature Writer',
    location: 'Kerala, India',
    joiningDate: 'June 15, 2018',
    avatar: 'Profiles/CriticProfiles/JithinJPrasad/pics/jithin-j-prasad-character-icon.png',
    coverImage: 'Profiles/CriticProfiles/JithinJPrasad/pics/1.jpg',
    bio: 'Environmentalist, cinephile, and culture writer striving to bring audiences together with authentic, thoughtful reviews and social themes.',
    hobbies: 'Watching Movies, Gaming, Singing, Writing',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/jithinjprasad' },
      { platform: 'Twitter', url: 'https://twitter.com/jithinjprasad' },
      { platform: 'LinkedIn', url: 'https://in.linkedin.com/jithinjp' },
      { platform: 'Instagram', url: 'https://instagram.com/jithin_jp' }
    ],
    featuredPosters: [
      'Profiles/CriticProfiles/JithinJPrasad/pics/DarkWatersReview/1.jpg',
      'Profiles/CriticProfiles/JithinJPrasad/pics/DilBecharaReview/1.jpg'
    ]
  },
  {
    id: 'achuthan-karnnan',
    slug: 'AchuthanKarnnan',
    name: 'Achuthan Karnnan',
    designation: 'OakShow Film Critic & Science Columnist',
    location: 'Kerala, India',
    joiningDate: 'July 23, 2018',
    avatar: 'Profiles/CriticProfiles/AchuthanKarnnan/pics/achuthan-karnnan-character-icon.png',
    coverImage: 'Profiles/CriticProfiles/AchuthanKarnnan/pics/1.jpg',
    bio: 'Amateur astronomer, fitness enthusiast, and sci-fi film critic focusing on technical storytelling and space adventures.',
    hobbies: 'Browsing Tech & Science, Music, Workout, Amateur Astronomy',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/achuthan.karnnan' },
      { platform: 'Twitter', url: 'https://twitter.com/achuthanium' },
      { platform: 'YouTube', url: 'https://www.youtube.com/channel/UC25R9MfiAWtluaEz9VEiEPw' },
      { platform: 'Instagram', url: 'https://www.instagram.com/me_achu_in.sta/' },
      { platform: 'Website', url: 'https://achuthankarnnan.wordpress.com/' }
    ],
    featuredPosters: [
      'Profiles/CriticProfiles/AchuthanKarnnan/pics/baahubali-2.jpg',
      'Profiles/CriticProfiles/AchuthanKarnnan/pics/infinity-war.jpg',
      'Profiles/CriticProfiles/AchuthanKarnnan/pics/sacred-games.jpg'
    ]
  },
  {
    id: 'manoj-aswin',
    slug: 'ManojAswin',
    name: 'Manoj Aswin',
    designation: 'OakShow Film Critic & Tamil Cinema Specialist',
    location: 'Tamil Nadu, India',
    joiningDate: 'July 26, 2018',
    avatar: 'Profiles/CriticProfiles/ManojAswin/pics/manoj-aswin-character-icon.png',
    coverImage: 'Profiles/CriticProfiles/ManojAswin/pics/1.jpg',
    bio: 'Avid follower of South Indian and World Cinema, specializing in action, comedy, and family entertainers.',
    hobbies: 'Music, Movies, Visual Arts',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/Manoj.sparks.77' }
    ],
    featuredPosters: [
      'Profiles/CriticProfiles/ManojAswin/pics/kadaikutty-singam.jpg',
      'Profiles/CriticProfiles/ManojAswin/pics/tik-tik-tik.jpg'
    ]
  },
  {
    id: 'vishnu-pc',
    slug: 'VishnuPc',
    name: 'Vishnu Pc',
    designation: 'OakShow Film Critic & Musician',
    location: 'Kerala, India',
    joiningDate: 'July 15, 2018',
    avatar: 'Profiles/CriticProfiles/VishnuPc/pics/vishnu-pc-character-icon.png',
    coverImage: 'Profiles/CriticProfiles/VishnuPc/pics/1.jpg',
    bio: 'Musician and movie lover analyzing emotional narrative arcs, background scores, and artistic direction.',
    hobbies: 'Watching Movies, Guitar, Film Score Analysis',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/jeyamvishnu' },
      { platform: 'Twitter', url: 'https://twitter.com/vishnu_pc' }
    ],
    featuredPosters: [
      'Profiles/CriticProfiles/VishnuPc/pics/vishnu-pc-thani-oruvan.jpg',
      'Profiles/CriticProfiles/VishnuPc/pics/vishnu-pc-dagal.jpg'
    ]
  },
  {
    id: 'ms-mr-oakshow',
    slug: 'MsMrOakShow',
    name: 'Ms./Mr. OakShow',
    designation: 'Chief Editorial & Curatorial Critic',
    location: 'OakShow Editorial, Global',
    joiningDate: 'May 10, 2016',
    avatar: 'Profiles/CriticProfiles/MsMrOakShow/pics/dummy-character-icon.png',
    coverImage: 'Profiles/CriticProfiles/MsMrOakShow/pics/1.jpg',
    bio: 'The signature editorial voice and critic persona of OakShow, curating classic retrospectives, award season highlights, and timeless cinema.',
    hobbies: 'Cinema History, Pop Culture Archiving, Soundtracks',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/OakShowReal/' },
      { platform: 'Twitter', url: 'https://twitter.com/oak_show' },
      { platform: 'LinkedIn', url: 'https://in.linkedin.com/company/oakshow' },
      { platform: 'Instagram', url: 'https://instagram.com/oak_show' },
      { platform: 'YouTube', url: 'https://www.youtube.com/oakshow' }
    ],
    featuredPosters: [
      'Profiles/CriticProfiles/MsMrOakShow/pics/about-dummy-critic-oakshow-1.jpg',
      'Profiles/CriticProfiles/MsMrOakShow/pics/about-dummy-critic-oakshow-2.jpg'
    ]
  }
];

// 2. Parse all reviews from each critic's directory
const allReviews = [];

criticsInfo.forEach(critic => {
  const cDir = path.join(baseDir, critic.slug);
  const files = fs.readdirSync(cDir).filter(f => f.endsWith('.html') && f !== 'index.html');
  
  files.forEach(f => {
    const filePath = path.join(cDir, f);
    const content = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(content);

    const title = $('h1 font a, h1 a, h1 font strong a, h1 strong a, h1 font, h1').first().text().trim() || $('title').text().trim();
    const fullHeading = $('h1').text().trim() || title;
    
    // Ratings
    let meterVal = $('meter').attr('value');
    let meterMax = $('meter').attr('max') || '5';
    let score = meterVal ? parseFloat(meterVal) : null;
    let ratingStr = '';

    if (meterMax === '10' && score !== null) {
      ratingStr = `${score}/10`;
      score = parseFloat((score / 2).toFixed(1)); // normalize to out of 5
    } else {
      const ratingTextMatch = content.match(/My\s*Rating\s*:\s*([0-9.]+\s*\/\s*[0-9.]+)/i) ||
                              content.match(/Rating\s*:\s*([0-9.]+\s*\/\s*5)/i) ||
                              content.match(/([0-9.]+\s*\/\s*5)/);
      if (ratingTextMatch) {
        ratingStr = ratingTextMatch[1].replace(/\s+/g, '');
        const parts = ratingStr.split('/');
        score = parseFloat(parts[0]);
      } else if (score) {
        ratingStr = `${score}/5`;
      } else {
        score = 3.5;
        ratingStr = '3.5/5';
      }
    }

    // Remark / Certificate
    let remark = 'Safe to Watch';
    if (content.includes('oakshow-says-it-is-a-must-watch.png') || content.includes('Must Watch') || content.includes('must watch') || content.includes('Must watch')) {
      remark = 'Must Watch';
    } else if (content.includes('oakshow-says-this-one-is-above-average.png') || content.includes('Above Average') || content.includes('above average')) {
      remark = 'Above Average';
    } else if (content.includes('oakshow-says-it-is-safe.png') || content.includes('Safe to Watch') || content.includes('safe to watch')) {
      remark = 'Safe to Watch';
    } else if (content.includes('Watch at your own risk') || content.includes('watch at your own risk')) {
      remark = 'Watch At Your Own Risk';
    }

    // Date extraction
    let rawDate = '';
    const dateMatch = content.match(/Date\s*:\s*([0-9]{1,2}[-\/][0-9]{1,2}[-\/][0-9]{4}|[0-9]{1,2}\s+[A-Za-z]+,?\s*[0-9]{4})/i);
    if (dateMatch) {
      rawDate = dateMatch[1].trim();
    }
    const dateObj = parseDateToISO(rawDate);

    // Excerpt & Content
    const paragraphs = [];
    $('.blog-top p, .buy-sin p, .single-box p, p').each((_, p) => {
      const t = $(p).text().trim();
      if (t && !t.startsWith('Genre:') && !t.startsWith('Language:') && !t.startsWith('Year:') && !t.startsWith('Posted By') && !t.startsWith('My Rating') && !t.startsWith('You can check') && !t.includes('Share Buttons') && !t.startsWith('Place:') && !t.startsWith('Designation:') && !t.startsWith('Joining Date:') && !t.startsWith('Tags') && !t.includes('Simple Share')) {
        paragraphs.push(t);
      }
    });

    const excerpt = paragraphs.find(p => p.length > 25) || paragraphs[0] || 'Read full critique and in-depth analysis on OakShow.';
    const fullReview = paragraphs.join('\n\n');

    // Banner image
    let banner = '';
    $('img').each((_, img) => {
      const src = $(img).attr('src') || '';
      if (!banner && src && !src.includes('SocialWebsiteLogos') && !src.includes('RatingSiteLogos') && !src.includes('images/fb') && !src.includes('twitter.png') && !src.includes('pinterest') && !src.includes('linkedin') && !src.includes('print.png') && !src.includes('tumblr') && !src.includes('buffer') && !src.includes('diggit') && !src.includes('google+')) {
        banner = src;
      }
    });

    if (banner) {
      if (banner.startsWith('http://oakshow.in/')) {
        banner = banner.replace('http://oakshow.in/', '');
      } else if (!banner.startsWith('http') && !banner.startsWith('/')) {
        banner = `Profiles/CriticProfiles/${critic.slug}/${banner}`.replace(/\\/g, '/');
      }
    }

    // Movie matching
    let movieSlug = '';
    $('a[href*=".html"]').each((_, a) => {
      const h = $(a).attr('href') || '';
      if (!h.includes('Profiles') && !h.includes('Releases') && !h.includes('OakShowReviews') && !h.includes('index.html') && !h.includes('basic') && !h.includes('mobile_app') && !movieSlug) {
        const cleaned = h.replace(/http:\/\/oakshow\.in\//g, '').replace(/https:\/\/oakshow\.in\//g, '').replace(/\.html/g, '').replace(/^\.\.\/\.\.\//, '').replace(/^\.\.\//, '').replace(/^\//, '');
        movieSlug = cleaned;
      }
    });

    let matchedMovie = null;
    let targetType = 'movie';
    if (movieSlug && movieMap.has(movieSlug.toLowerCase())) {
      matchedMovie = movieMap.get(movieSlug.toLowerCase());
    } else if (movieSlug && seriesMap.has(movieSlug.toLowerCase())) {
      matchedMovie = seriesMap.get(movieSlug.toLowerCase());
      targetType = 'series';
    }

    if (!banner && matchedMovie && matchedMovie.poster) {
      banner = matchedMovie.poster;
    }

    allReviews.push({
      id: f.replace('.html', ''),
      criticId: critic.id,
      author: critic.name,
      criticAvatar: critic.avatar,
      title: title,
      fullHeading: fullHeading,
      score: score,
      rating: ratingStr,
      remark: remark,
      date: dateObj.formatted,
      isoDate: dateObj.iso,
      timestamp: dateObj.timestamp,
      banner: banner || '/favicon.png',
      movieSlug: movieSlug || (matchedMovie ? matchedMovie.id : ''),
      targetId: matchedMovie ? matchedMovie.id : '',
      targetTitle: matchedMovie ? matchedMovie.title : title,
      targetType: targetType,
      excerpt: excerpt,
      fullReview: fullHeading + '\n\n' + fullReview,
      file: f
    });
  });
});

// Sort reviews globally by timestamp descending (newest publication first)
allReviews.sort((a, b) => b.timestamp - a.timestamp);

// Calculate review counts for each critic
criticsInfo.forEach(c => {
  const criticReviews = allReviews.filter(r => r.criticId === c.id);
  c.totalReviews = criticReviews.length;
  const totalScore = criticReviews.reduce((sum, r) => sum + r.score, 0);
  c.avgRating = criticReviews.length > 0 ? (totalScore / criticReviews.length).toFixed(1) : '4.0';
});

console.log(`Successfully processed ${criticsInfo.length} critics and ${allReviews.length} reviews.`);

fs.writeFileSync('data/critics.json', JSON.stringify(criticsInfo, null, 2));
fs.writeFileSync('data/reviews.json', JSON.stringify(allReviews, null, 2));
console.log('Saved data/critics.json and data/reviews.json successfully!');
