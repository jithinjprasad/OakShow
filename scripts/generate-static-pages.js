/**
 * OakShow Multi-Page Static Site Generator (SSG) Prerender Script
 * 
 * Generates standalone, crawler-friendly, metadata-complete .html files in dist/
 * for all movies, web series, category hubs, emergencies, and archives.
 * 
 * Preserves 100% of backlinks, canonical URLs, and OpenGraph social previews (WhatsApp/FB/X).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const dataDir = path.resolve(rootDir, 'data');

const DOMAIN = 'https://oakshow.in';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getShareImage(item, folderPrefix = 'Films') {
  if (!item) return `${DOMAIN}/favicon.png`;
  
  if (item.poster && /(?:^|[/\\])2\.(?:jpg|jpeg|png)$/i.test(item.poster)) {
    const clean = item.poster.replace(/^[/\\]+/, '');
    return `${DOMAIN}/${clean}`;
  }
  if (Array.isArray(item.gallery)) {
    const found = item.gallery.find(g => g.src && /(?:^|[/\\])2\.(?:jpg|jpeg|png)$/i.test(g.src));
    if (found) {
      const clean = found.src.replace(/^[/\\]+/, '');
      return `${DOMAIN}/${clean}`;
    }
  }
  if (item.id) {
    return `${DOMAIN}/pics/${folderPrefix}/${item.id}/2.jpg`;
  }
  if (item.poster) {
    const clean = item.poster.replace(/^[/\\]+/, '');
    return `${DOMAIN}/${clean}`;
  }
  return `${DOMAIN}/favicon.png`;
}

function generatePrerenderHtml(baseHtml, {
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaJson = null,
  bodyContent = ''
}) {
  const finalTitle = escapeHtml(title || 'OakShow-The One Destination For Everything On Entertainment');
  const finalDesc = escapeHtml(description || 'Unified movie ratings, critic reviews, showtimes, trailers, and ticket bookings across Indian Cinema, Hollywood, and World Entertainment.');
  const finalUrl = canonicalUrl || DOMAIN;
  const finalImage = ogImage || `${DOMAIN}/favicon.png`;

  let html = baseHtml;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${finalTitle}</title>`);

  // Replace Meta Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${finalDesc}" />`);
  }

  // Replace Canonical Link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${finalUrl}" />`);
  }

  // Replace OpenGraph Tags
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${finalTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${finalDesc}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${finalUrl}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${finalImage}" />`);

  // Replace Twitter Card Tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${finalTitle}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${finalDesc}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${finalImage}" />`);

  // Replace Schema.org JSON-LD if provided
  if (schemaJson) {
    const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n</script>`;
    if (html.includes('<script type="application/ld+json">')) {
      html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaScript);
    } else {
      html = html.replace('</head>', `  ${schemaScript}\n</head>`);
    }
  }

  // Inject crawler-friendly semantic fallback into root if present
  if (bodyContent) {
    const noscriptContent = `<noscript>\n<div class="oakshow-crawler-fallback" style="padding:24px;font-family:sans-serif;color:#fff;background:#0d1117;">\n${bodyContent}\n</div>\n</noscript>`;
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${noscriptContent}`);
  }

  return html;
}

function loadJson(filename) {
  const p = path.join(dataDir, filename);
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.warn(`[WARN] Could not parse ${filename}:`, err.message);
    return [];
  }
}

async function run() {
  console.log('🚀 Starting OakShow Multi-Page Static Site Generator (SSG)...');

  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ Error: dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  let count = 0;

  // 1. Process Movies
  const movies = loadJson('movies.json');
  console.log(`📦 Prerendering ${movies.length} movies...`);

  for (const m of movies) {
    const fileProp = m.fileName || m.filename;
    const filename = fileProp ? fileProp.replace(/^\/+/, '') : (m.id ? `${m.id}.html` : null);
    if (!filename) continue;

    const outPath = path.join(distDir, filename);
    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const title = m.metaTitle || `${m.title}${m.year ? ` (${m.year})` : ''} All Ratings, Reviews, Songs, Videos, Bookings and News — OakShow`;
    const desc = m.description || m.plot || `Checkout verified ratings, reviews, streaming links, and tickets for ${m.title} on OakShow.`;
    const canonical = `${DOMAIN}/${filename}`;
    const ogImage = getShareImage(m, 'Films');

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      'name': m.title,
      'description': desc,
      'image': ogImage,
      'url': canonical,
      'datePublished': m.year || m.releaseDate,
      ...(m.director ? { 'director': { '@type': 'Person', 'name': m.director } } : {}),
      ...(m.ratings && m.ratings.length > 0 ? {
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': m.ratings[0].score,
          'bestRating': '10',
          'ratingCount': '100'
        }
      } : {})
    };

    const bodyContent = `
      <h1>${escapeHtml(m.title)} ${m.year ? `(${escapeHtml(m.year)})` : ''}</h1>
      <p><strong>Genre:</strong> ${escapeHtml(m.genre || 'Cinema')} | <strong>Language:</strong> ${escapeHtml(m.language || 'All')}</p>
      <p>${escapeHtml(desc)}</p>
      <p><a href="${DOMAIN}/">Explore OakShow Entertainment</a></p>
    `;

    const html = generatePrerenderHtml(baseHtml, {
      title,
      description: desc,
      canonicalUrl: canonical,
      ogImage,
      ogType: 'video.movie',
      schemaJson: schema,
      bodyContent
    });

    fs.writeFileSync(outPath, html, 'utf8');
    count++;

    if (m.aliases && Array.isArray(m.aliases)) {
      for (const alias of m.aliases) {
        const aliasFilename = alias.endsWith('.html') ? alias : `${alias}.html`;
        const aliasOutPath = path.join(distDir, aliasFilename);
        fs.writeFileSync(aliasOutPath, html, 'utf8');
      }
    }
  }

  // 2. Process Web Series
  const series = loadJson('series.json');
  console.log(`📦 Prerendering ${series.length} web series...`);

  for (const s of series) {
    const filename = s.filename ? s.filename.replace(/^\/+/, '') : (s.id ? `${s.id}.html` : null);
    if (!filename) continue;

    const outPath = path.join(distDir, filename);
    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const title = s.metaTitle || `${s.title}${s.year ? ` (${s.year})` : ''} All Ratings, Episodes, Streaming & Reviews — OakShow`;
    const desc = s.description || s.plot || `Stream and check verified episode ratings for ${s.title} on OakShow.`;
    const canonical = `${DOMAIN}/${filename}`;
    const ogImage = getShareImage(s, 'Serieses');

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'TVSeries',
      'name': s.title,
      'description': desc,
      'image': ogImage,
      'url': canonical,
      'datePublished': s.year || s.releaseDate,
      ...(s.director ? { 'director': { '@type': 'Person', 'name': s.director } } : {})
    };

    const bodyContent = `
      <h1>${escapeHtml(s.title)}</h1>
      <p><strong>Genre:</strong> ${escapeHtml(s.genre || 'Web Series')} | <strong>Language:</strong> ${escapeHtml(s.language || 'All')}</p>
      <p>${escapeHtml(desc)}</p>
      <p><a href="${DOMAIN}/#/series-hub">Back to Web Series Vault</a></p>
    `;

    const html = generatePrerenderHtml(baseHtml, {
      title,
      description: desc,
      canonicalUrl: canonical,
      ogImage,
      ogType: 'video.tv_show',
      schemaJson: schema,
      bodyContent
    });

    fs.writeFileSync(outPath, html, 'utf8');
    count++;

    // Prerender season pages if present
    if (Array.isArray(s.seasonsData)) {
      for (const sd of s.seasonsData) {
        if (!sd.filename) continue;
        const sOutPath = path.join(distDir, sd.filename);
        const sTitle = `${sd.title || `${s.title} Season ${sd.seasonNumber}`} All Episode Ratings, Reviews and Watch Online — OakShow`;
        const sDesc = `Stream and check verified ratings for ${sd.title || `${s.title} Season ${sd.seasonNumber}`} on OakShow.`;
        const sCanonical = `${DOMAIN}/${sd.filename}`;
        const sHtml = generatePrerenderHtml(baseHtml, {
          title: sTitle,
          description: sDesc,
          canonicalUrl: sCanonical,
          ogImage: sd.poster ? `${DOMAIN}/${sd.poster}` : ogImage,
          ogType: 'video.tv_show',
          bodyContent: `<h1>${escapeHtml(sTitle)}</h1><p>${escapeHtml(sDesc)}</p><p><a href="${DOMAIN}/${filename}">Back to ${escapeHtml(s.title)} Main Page</a></p>`
        });
        fs.writeFileSync(sOutPath, sHtml, 'utf8');
        count++;
      }
    }

    // Prerender individual episodes if present
    if (Array.isArray(s.episodes)) {
      for (const ep of s.episodes) {
        if (!ep.filename) continue;
        const epOutPath = path.join(distDir, ep.filename);
        const epTitle = `${s.title} Episode ${ep.episodeNumber}: ${ep.title} All Ratings, Reviews & Synopsis — OakShow`;
        const epDesc = ep.plot || `Checkout episode ${ep.episodeNumber} of ${s.title} on OakShow.`;
        const epCanonical = `${DOMAIN}/${ep.filename}`;
        const epHtml = generatePrerenderHtml(baseHtml, {
          title: epTitle,
          description: epDesc,
          canonicalUrl: epCanonical,
          ogImage: ep.thumbnail ? `${DOMAIN}/${ep.thumbnail}` : ogImage,
          ogType: 'video.episode',
          bodyContent: `<h1>${escapeHtml(epTitle)}</h1><p>${escapeHtml(epDesc)}</p><p><a href="${DOMAIN}/${filename}">Back to ${escapeHtml(s.title)} Main Page</a></p>`
        });
        fs.writeFileSync(epOutPath, epHtml, 'utf8');
        count++;
      }
    }
  }

  // 3. Process Category Hubs & Specialty Portals
  const hubs = [
    { filename: 'indian.html', title: 'Indian Cinema (Bollywood, Tollywood, Kollywood & Mollywood) — OakShow', desc: 'Browse verified ratings, reviews, streaming providers and bookings for Indian movies.' },
    { filename: 'hollywood.html', title: 'Hollywood Studio Blockbusters & Classics — OakShow', desc: 'Browse verified ratings, reviews, streaming providers and bookings for Hollywood blockbusters.' },
    { filename: 'international.html', title: 'International Cinema, Anime & World Movies — OakShow', desc: 'Explore global cinema, Japanese anime, and European releases on OakShow.' },
    { filename: 'ott.html', title: 'Movies on OTT & Online Streaming Platforms — OakShow', desc: 'Browse movies streaming on Netflix, Amazon Prime Video, Sun NXT, Disney+ Hotstar, SonyLIV, ZEE5, Apple TV, and more.' },
    { filename: 'series-hub.html', title: 'Web Series & Television Shows Vault — OakShow', desc: 'Binge-worthy web series, episode guides, ratings, and streaming platforms.' },
    { filename: 'releases.html', title: 'Cinema Release Matrix & Monthly Calendars — OakShow', desc: 'Complete month-by-month release schedules for Indian and Hollywood films.' },
    { filename: 'upcoming.html', title: 'Upcoming Movies & Premiere Countdown — OakShow', desc: 'Discover anticipated theatrical releases, upcoming blockbusters, exclusive trailers, and advance ticket booking alerts.' },
    { filename: 'Upcoming.html', title: 'Upcoming Movies & Premiere Countdown — OakShow', desc: 'Discover anticipated theatrical releases, upcoming blockbusters, exclusive trailers, and advance ticket booking alerts.' },
    { filename: 'Upcoming2.html', title: 'Upcoming Movies & Premiere Countdown — OakShow', desc: 'Discover anticipated theatrical releases, upcoming blockbusters, exclusive trailers, and advance ticket booking alerts.' },
    { filename: 'Upcoming3.html', title: 'Upcoming Movies & Premiere Countdown — OakShow', desc: 'Discover anticipated theatrical releases, upcoming blockbusters, exclusive trailers, and advance ticket booking alerts.' },
    { filename: 'reviews.html', title: 'OakShow Editorial & Critic Reviews — Certified Ratings & Remarks', desc: 'Unbiased film criticism, certified reviewer profiles, and OakShow official remarks.' },
    { filename: 'remarks.html', title: 'OakShow Remarks & Meaning Guide — 4 Certified Verdicts', desc: 'Understanding OakShow official verdict remarks: Must Watch, Safe to Watch, Above Average, and Warning.' },
    { filename: 'sports-hub.html', title: 'Sports Tournaments & World Cup Archives — OakShow', desc: '2018 FIFA World Cup, Women\'s Hockey World Cup, and football schedules.' },
    { filename: 'games-books.html', title: 'Video Games & Recommended Literature Shortlists — OakShow', desc: 'Shortlisted top video games and must-read books.' },
    { filename: 'news.html', title: 'OakShow News & Current Affairs Reports — Verified Bulletins', desc: 'Verified cinema headlines, box office milestones, and current affairs reports.' },
    { filename: 'galleries.html', title: 'OakShow Movie Galleries & Character Posters Vault — HD Wallpapers', desc: 'High-definition official movie wallpapers, photoshoot stills, and character posters.' },
    { filename: 'emergencies.html', title: 'Public Emergencies, Helplines & Disaster Relief — OakShow', desc: 'Official helplines, relief funds, and emergency response portals.' },
    { filename: 'music.html', title: 'Soundtracks, Scores & Audio Launches — OakShow', desc: 'Explore official movie soundtracks, audio jukeboxes, and background scores.' },
    { filename: 'trailers.html', title: 'Trailers, Teasers & Video Vault — OakShow', desc: 'High-definition official teasers, promos, and first look trailers.' },
    { filename: 'events.html', title: 'Film Festivals, Award Galas & Cinema Events — OakShow', desc: 'Coverage of film awards, galas, and industry festivals.' },
    { filename: 'copyright-policy.html', title: 'Privacy & Copyright Policy — OakShow', desc: 'Official privacy policy, copyright guidelines, and terms of service for OakShow.' },
    { filename: 'OakShowNews.html', title: 'OakShow News — Verified Cinema & Box Office Bulletins', desc: 'Verified cinema headlines, box office milestones, and current affairs reports.' },
    { filename: 'OakShowGalleries.html', title: 'OakShow Galleries — HD Posters, Wallpapers & Stills', desc: 'High-definition official movie wallpapers, photoshoot stills, character posters.' },
    { filename: 'OakShowReviews.html', title: 'OakShow Reviews — Certified Critic Ratings & Remarks', desc: 'Unbiased film criticism, certified reviewer profiles, and OakShow official remarks.' },
    { filename: 'OakShowBlog.html', title: 'OakShow Cinema Perspectives & Editorial Essays', desc: 'In-depth cinema features, retrospectives, and cultural commentary.' },
    { filename: 'OakShowEmergency.html', title: 'Public Emergencies, Helplines & Relief Portals — OakShow', desc: 'Official helplines, relief funds, and disaster management portals.' },
    { filename: 'Careers.html', title: 'Careers at OakShow | Now Become a Critic', desc: 'Be a critic with OakShow. Join the OakForce and publish your movie, series, and video game reviews with full credits.', ogImage: `${DOMAIN}/images/become-a-movie-critic.jpg` },
    { filename: 'careers.html', title: 'Careers at OakShow | Now Become a Critic', desc: 'Be a critic with OakShow. Join the OakForce and publish your movie, series, and video game reviews with full credits.', ogImage: `${DOMAIN}/images/become-a-movie-critic.jpg` }
  ];

  console.log(`📦 Prerendering ${hubs.length} category hubs & index sections...`);

  for (const h of hubs) {
    const outPath = path.join(distDir, h.filename);
    const canonical = `${DOMAIN}/${h.filename}`;
    let bodyContent = `
      <h1>${escapeHtml(h.title)}</h1>
      <p>${escapeHtml(h.desc)}</p>
      <p><a href="${DOMAIN}/">Explore OakShow Homepage</a></p>
    `;

    if (h.filename.toLowerCase().startsWith('careers')) {
      bodyContent = `
        <div class="careers-prerender-container" style="max-width:900px;margin:0 auto;padding:24px;font-family:sans-serif;">
          <h1>Careers at OakShow | Now Become a Critic</h1>
          <p>Have you ever dreamed to be a movie/series/game critic? With OakShow, we provide the platform for each and every movie, series, and game buff to explore the world of becoming a critic.</p>
          <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:20px 0;background:#000;">
            <iframe src="https://player.vimeo.com/video/318354607" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="autoplay; fullscreen" allowfullscreen></iframe>
          </div>
          <h3>Submit Your Critic Application</h3>
          <form action="https://formspree.io/oakshow0@gmail.com" method="post" style="display:flex;flex-direction:column;gap:12px;max-width:500px;">
            <input type="text" name="Your Name" placeholder="Your Name" required style="padding:10px;" />
            <input type="email" name="Your Email" placeholder="Your Email" required style="padding:10px;" />
            <input type="tel" name="Phone Number" placeholder="Phone Number" required style="padding:10px;" />
            <textarea name="Message" placeholder="Message & Sample Review" required rows="4" style="padding:10px;"></textarea>
            <input type="submit" value="Submit Application" style="padding:12px;background:#0284c7;color:#fff;border:none;cursor:pointer;font-weight:bold;" />
          </form>
          <div style="margin-top:30px;">
            <p><strong>The OakForce:</strong> "Just For the record, our force is 'Gender Neutral', 'Race Neutral', 'Religious Neutral' and 'Political Neutral', We are the OakForce. PS: Thanks Deadpool 2"</p>
          </div>
        </div>
      `;
    }

    const html = generatePrerenderHtml(baseHtml, {
      title: h.title,
      description: h.desc,
      canonicalUrl: canonical,
      ogImage: h.ogImage || `${DOMAIN}/favicon.png`,
      ogType: 'website',
      bodyContent
    });

    fs.writeFileSync(outPath, html, 'utf8');
    count++;
  }

  // 4. Specific Emergencies
  const emergencies = [
    { filename: 'keralafloods.html', title: '2018 Kerala Floods Relief, Helplines & Rescue Portals — OakShow Emergency', desc: 'Official relief funds, district control rooms, emergency helplines and rescue contacts for Kerala Floods 2018.' },
    { filename: 'keralafloods2019.html', title: '2019 Kerala Floods Relief, District Helplines & CMDRF — OakShow Emergency', desc: 'Official relief funds, district control rooms, and emergency helplines for Kerala Floods 2019.' },
    { filename: 'coronavirusoutbreak.html', title: 'COVID-19 Coronavirus Outbreak Helplines, Relief Funds & Advisories — OakShow Emergency', desc: 'Official emergency helplines, testing centers, PM CARES fund and verified medical advisories.' }
  ];

  for (const em of emergencies) {
    const outPath = path.join(distDir, em.filename);
    const canonical = `${DOMAIN}/${em.filename}`;
    const html = generatePrerenderHtml(baseHtml, {
      title: em.title,
      description: em.desc,
      canonicalUrl: canonical,
      ogImage: `${DOMAIN}/favicon.png`,
      ogType: 'website'
    });
    fs.writeFileSync(outPath, html, 'utf8');
    count++;
  }

  console.log(`✅ Successfully generated ${count} static prerendered HTML pages in dist/!`);
}

run().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
