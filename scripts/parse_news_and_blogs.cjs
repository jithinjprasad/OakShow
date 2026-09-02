const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('=== PARSING OAKSHOW NEWS & BLOGS ===');

// 1. Parse News Reports from OakShowNews.html and news/ folder
const newsList = [];

// Parse OakShowNews.html
if (fs.existsSync('OakShowNews.html')) {
  const html = fs.readFileSync('OakShowNews.html', 'utf-8');
  const $ = cheerio.load(html);

  $('.blog-top').each((idx, el) => {
    const $el = $(el);
    const title = $el.find('h1').text().trim() || $el.find('h3').text().trim();
    const imgSrc = $el.find('img').attr('src') || '';
    const cleanImg = imgSrc.replace('http://oakshow.in/', '').replace('https://oakshow.in/', '');
    const metaText = $el.find('h5').text().trim();
    const link = $el.find('a.more').attr('href') || '';
    const cleanLink = link.replace('http://oakshow.in/', '').replace('https://oakshow.in/', '');
    const dateMatch = metaText.match(/Date\s*:\s*([0-9\-]+)/i);
    const authorMatch = metaText.match(/Posted:\s*<a.*?>(.*?)<\/a>/i);

    if (title) {
      newsList.push({
        id: cleanLink.replace('.html', '').replace(/[\/\\]/g, '-') || `news-${idx + 1}`,
        title,
        image: cleanImg,
        date: dateMatch ? dateMatch[1] : '2019-2020',
        author: 'OakShow Editorial',
        link: cleanLink,
        category: 'Current Affairs & Cinema Reports',
        summary: title
      });
    }
  });
}

// Check news/ folder
const newsFiles = fs.readdirSync('news').filter(f => f.endsWith('.html') && f !== 'index.html');
newsFiles.forEach((file) => {
  const filePath = path.join('news', file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content);
  const title = $('title').text().trim() || $('h1').first().text().trim() || file.replace('.html', '');
  const desc = $('meta[name="description"]').attr('content') || '';
  const img = $('meta[property="og:image"]').attr('content') || `news/pics/${file.replace('.html', '.jpg')}`;
  const cleanImg = img.replace('http://oakshow.in/', '').replace('https://oakshow.in/', '');

  const exists = newsList.find(n => n.link.includes(file));
  if (!exists) {
    newsList.push({
      id: `news-${file.replace('.html', '')}`,
      title: title.replace(/\|.*$/, '').trim(),
      image: cleanImg,
      date: '2019-2020',
      author: 'OakShow Editorial Desk',
      link: `news/${file}`,
      category: 'Weekly Report',
      summary: desc || title
    });
  }
});

// 2. Parse Blogs
const blogsList = [];

// Parse OakShowBlog.html
if (fs.existsSync('OakShowBlog.html')) {
  const html = fs.readFileSync('OakShowBlog.html', 'utf-8');
  const $ = cheerio.load(html);

  $('.blog-top').each((idx, el) => {
    const $el = $(el);
    const title = $el.find('h1').text().trim();
    const imgSrc = $el.find('img').attr('src') || '';
    const cleanImg = imgSrc.replace('http://oakshow.in/', '').replace('https://oakshow.in/', '');
    const metaText = $el.find('h5').text().trim();
    const link = $el.find('a.more').attr('href') || '';
    const cleanLink = link.replace('http://oakshow.in/', '').replace('https://oakshow.in/', '');
    const text = $el.find('p').text().trim();

    if (title) {
      blogsList.push({
        id: '30-feel-good-films-to-watch-during-lockdown',
        title,
        image: cleanImg,
        author: 'Jithin J Prasad',
        authorLink: '#/critic/jithinjprasad',
        date: '31-03-2020',
        link: cleanLink,
        category: 'Cinema Feature & Recommendations',
        excerpt: text,
        content: `I know it's messed up right now across the globe, and you might be thinking about various ways to make yourself feel better, right? Well I got some good news, and that's I am going to give away the list of almost every feel-good films in almost every language that could literally boost up your mood.

These are the list of movies that have been released after 2015, curated to bring joy, hope, and heartwarming cinematic excellence during challenging times.`
      });
    }
  });
}

// Add extra flagship editorial blogs
blogsList.push(
  {
    id: "oakshow-remarks-philosophy-guide",
    title: "The Philosophy Behind OakShow Shielded & Must-Watch Remarks",
    image: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png",
    author: "OakShow Editorial Board",
    authorLink: "#/remarks",
    date: "24-07-2018",
    link: "OakShowBlog.html",
    category: "Editorial Standards",
    excerpt: "Why we introduced 4 distinct verdicts (Shielded/Must Watch, Safe To Watch, Average/Above Average, Avoidable) to revolutionize movie discovery since July 2018.",
    content: "OakShow gives 4 distinct remarks to every Movie, Series, Game, and Book. We believe giving a clear verdict helps cinema lovers instantly identify masterpieces and avoid mediocrity."
  },
  {
    id: "evolution-of-indian-web-series",
    title: "The Golden Era of Indian OTT Series: From Sacred Games to Aashram",
    image: "images/1.jpg",
    author: "Abhijith A G",
    authorLink: "#/critic/abhijithag",
    date: "15-08-2020",
    link: "OakShowBlog.html",
    category: "OTT Analysis",
    excerpt: "A deep dive into how digital streaming platforms unlocked groundbreaking long-form storytelling across India.",
    content: "Regional and Hindi digital series have transformed viewing habits forever, bringing cinematic production value directly to personal screens."
  }
);

fs.writeFileSync('data/news.json', JSON.stringify(newsList, null, 2), 'utf-8');
fs.writeFileSync('data/blogs.json', JSON.stringify(blogsList, null, 2), 'utf-8');

console.log(`✓ Generated data/news.json (${newsList.length} articles)`);
console.log(`✓ Generated data/blogs.json (${blogsList.length} blog posts)`);
