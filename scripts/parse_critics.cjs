const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const baseDir = path.resolve('Profiles/CriticProfiles');
const critics = fs.readdirSync(baseDir).filter(d => fs.statSync(path.join(baseDir, d)).isDirectory());

console.log('Critics directories:', critics);
let totalReviews = 0;
const results = [];

critics.forEach(critic => {
  const cDir = path.join(baseDir, critic);
  const files = fs.readdirSync(cDir).filter(f => f.endsWith('.html') && f !== 'index.html');
  console.log(critic + ' has ' + files.length + ' review files.');
  files.forEach(f => {
    totalReviews++;
    const content = fs.readFileSync(path.join(cDir, f), 'utf-8');
    const $ = cheerio.load(content);
    const title = $('h1 font a, h1 a, h1 font strong a, h1 strong a, h1 font, h1').first().text().trim() || $('title').text().trim();
    const fullHeading = $('h1').text().trim();
    const meterVal = $('meter').attr('value') || '';
    const meterMax = $('meter').attr('max') || '5';

    // Extract rating string (e.g. 3/5, 3.5/5, 4/5)
    let score = meterVal ? parseFloat(meterVal) : null;
    let ratingStr = meterVal ? `${meterVal}/${meterMax}` : '';

    const ratingTextMatch = content.match(/My\s*Rating\s*:\s*([0-9.]+\s*\/\s*[0-9.]+)/i) ||
      content.match(/([0-9.]+\s*\/\s*5)/);
    if (ratingTextMatch) {
      ratingStr = ratingTextMatch[1].replace(/\s+/g, '');
      const parts = ratingStr.split('/');
      score = parseFloat(parts[0]);
    }

    // Remark / Certificate
    let remark = 'Safe to Watch';
    if (content.includes('oakshow-says-it-is-a-must-watch.png') || content.includes('Must Watch')) {
      remark = 'Must Watch';
    } else if (content.includes('oakshow-says-this-one-is-above-average.png') || content.includes('Above Average')) {
      remark = 'Above Average';
    } else if (content.includes('oakshow-says-it-is-safe.png') || content.includes('Safe to Watch')) {
      remark = 'Safe to Watch';
    } else if (content.includes('Watch at your own risk')) {
      remark = 'Watch At Your Own Risk';
    }

    // Date
    let date = '';
    const dateMatch = content.match(/Date\s*:\s*([0-9]{1,2}[-\/][0-9]{1,2}[-\/][0-9]{4}|[0-9]{1,2}\s+[A-Za-z]+,?\s*[0-9]{4})/i);
    if (dateMatch) {
      date = dateMatch[1].trim();
    }

    // Excerpt / paragraphs
    const paragraphs = [];
    $('.blog-top p, .buy-sin p, .single-box p, p').each((_, p) => {
      const t = $(p).text().trim();
      if (t && !t.startsWith('Genre:') && !t.startsWith('Language:') && !t.startsWith('Year:') && !t.startsWith('Posted By') && !t.startsWith('My Rating') && !t.startsWith('You can check') && !t.includes('Share Buttons') && !t.startsWith('Place:') && !t.startsWith('Designation:') && !t.startsWith('Joining Date:')) {
        paragraphs.push(t);
      }
    });

    const excerpt = paragraphs[0] || '';
    const fullReview = paragraphs.join('\n\n');

    // Banner / image
    let banner = '';
    const imgEl = $('.blog-top img, img.img-responsive').first();
    if (imgEl.length) {
      banner = imgEl.attr('src') || '';
      if (banner && !banner.startsWith('http') && !banner.startsWith('/')) {
        banner = `Profiles/CriticProfiles/${critic}/${banner}`.replace(/\\/g, '/');
      }
    }

    // Target movie slug / link
    let movieSlug = '';
    let movieName = '';
    $('a[href*=".html"]').each((_, a) => {
      const h = $(a).attr('href') || '';
      if (!h.includes('Profiles') && !h.includes('Releases') && !h.includes('OakShowReviews') && !h.includes('index.html') && !h.includes('basic') && !h.includes('mobile_app') && !movieSlug) {
        const cleaned = h.replace(/http:\/\/oakshow\.in\//g, '').replace(/https:\/\/oakshow\.in\//g, '').replace(/\.html/g, '').replace(/^\.\.\/\.\.\//, '').replace(/^\.\.\//, '').replace(/^\//, '');
        movieSlug = cleaned;
        movieName = $(a).text().trim();
      }
    });

    results.push({
      id: f.replace('.html', ''),
      file: f,
      critic,
      author: critic === 'AbhijithAG' ? 'Abhijith A G' :
        critic === 'JithinJPrasad' ? 'Jithin J Prasad' :
          critic === 'AchuthanKarnnan' ? 'Achuthan Karnnan' :
            critic === 'ManojAswin' ? 'Manoj Aswin' :
              critic === 'VishnuPc' ? 'Vishnu Pc' : 'Ms./Mr. OakShow',
      title: title || f.replace('.html', ''),
      fullHeading,
      score: score || 3.5,
      rating: ratingStr || (score ? `${score}/5` : '3.5/5'),
      remark,
      date,
      banner,
      movieSlug,
      movieName,
      excerpt,
      fullReview: fullHeading + '\n\n' + fullReview
    });
  });
});

console.log('Total review files processed:', totalReviews);
console.log('Sample parsed:');
console.log(JSON.stringify(results.slice(0, 5), null, 2));
fs.writeFileSync('scripts/parsed_critic_reviews.json', JSON.stringify(results, null, 2));
