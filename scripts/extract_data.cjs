const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(WORKSPACE_ROOT, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function cleanText(str) {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function normalizePath(p) {
  if (!p) return '';
  let clean = p.replace(/^https?:\/\/oakshow\.in\//i, '').replace(/^(\.\.\/)+/, '');
  return clean.replace(/\\/g, '/');
}

function extractMeta($) {
  const meta = {
    title: cleanText($('title').text()),
    description: $('meta[name="description"]').attr('content') || $('meta[name="twitter:description"]').attr('content') || '',
    keywords: $('meta[name="keywords"]').attr('content') || '',
    ogImage: normalizePath($('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || ''),
    datePublished: $('meta[itemprop="datePublished"]').attr('content') || '',
    dateModified: $('meta[itemprop="dateModified"]').attr('content') || '',
    author: $('meta[name="author"]').attr('content') || 'OakShow'
  };
  return meta;
}

function getRatingSource(link, alt, img, text) {
  const l = (link || '').toLowerCase();
  const a = (alt || '').toLowerCase();
  const i = (img || '').toLowerCase();

  if (l.includes('imdb.com') || a.includes('imdb') || i.includes('imdb')) return 'IMDb';
  if (l.includes('rottentomatoes.com') || a.includes('rotten') || i.includes('rotten')) return 'Rotten Tomatoes';
  if (l.includes('metacritic.com') || a.includes('metacritic') || i.includes('metacritic')) return 'Metacritic';
  if (a.includes('oakshow') || i.includes('oakshow') || (text && text.toLowerCase().includes('oakshow'))) return 'OakShow';
  if (l.includes('hindustantimes') || a.includes('hindustan') || i.includes('hindustan')) return 'Hindustan Times';
  if (l.includes('firstpost') || a.includes('firstpost') || i.includes('firstpost')) return 'Firstpost';
  if (l.includes('timesofindia') || a.includes('times of india') || i.includes('times-of-india')) return 'Times of India';
  if (l.includes('timesnownews') || a.includes('times now') || i.includes('times-now')) return 'Times Now';
  if (l.includes('indiatoday') || a.includes('india today') || i.includes('india-today')) return 'India Today';
  if (l.includes('dnaindia') || a.includes('dna india') || i.includes('dnaindia')) return 'DNA India';
  if (l.includes('indianexpress') || a.includes('indian express') || i.includes('indian-express')) return 'The Indian Express';
  if (l.includes('ndtv') || a.includes('ndtv') || i.includes('ndtv')) return 'NDTV';
  if (l.includes('rediff') || a.includes('rediff') || i.includes('rediff')) return 'Rediff';
  if (l.includes('thehindu') || a.includes('the hindu') || i.includes('the-hindu')) return 'The Hindu';
  if (l.includes('behindwoods') || a.includes('behindwoods') || i.includes('behindwoods')) return 'Behindwoods';
  if (l.includes('sify') || a.includes('sify') || i.includes('sify')) return 'Sify';
  if (l.includes('greatandhra') || a.includes('greatandhra')) return 'GreatAndhra';
  if (l.includes('123telugu') || a.includes('123telugu')) return '123telugu';
  if (l.includes('cinemaexpress') || a.includes('cinema express')) return 'Cinema Express';
  if (l.includes('filmcompanion') || a.includes('film companion')) return 'Film Companion';
  if (l.includes('bollywoodhungama') || a.includes('bollywood hungama')) return 'Bollywood Hungama';
  if (l.includes('theguardian.com') || a.includes('guardian')) return 'The Guardian';
  if (l.includes('ign.com') || a.includes('ign') || i.includes('ign')) return 'IGN';
  if (l.includes('gamespot.com') || a.includes('gamespot')) return 'GameSpot';
  if (l.includes('pcgamer.com') || a.includes('pc gamer') || a.includes('pcgamer')) return 'PC Gamer';
  if (l.includes('dexerto.com') || a.includes('dexerto')) return 'Dexerto';
  if (l.includes('gamingbolt.com') || a.includes('gamingbolt')) return 'GamingBolt';
  if (l.includes('vgr.com') || a.includes('vgr')) return 'VGR';
  if (l.includes('bookmyshow.com') || a.includes('bookmyshow') || i.includes('book-my-show')) return 'BookMyShow';

  if (alt) {
    let cleaned = alt.replace(/^.*?(film|movie|series|game)\s*/i, '')
                     .replace(/^.*?-\s*/, '')
                     .replace(/\s*ratings?.*$/i, '')
                     .replace(/\s*reviews?.*$/i, '')
                     .trim();
    if (cleaned && cleaned.length > 2) return cleaned;
  }

  // fallback to domain name
  if (link && link.startsWith('http')) {
    try {
      const u = new URL(link);
      const host = u.hostname.replace('www.', '').split('.')[0];
      return host.charAt(0).toUpperCase() + host.slice(1);
    } catch(e){}
  }

  return 'Critic Portal';
}

function extractRatings($) {
  const ratings = [];
  $('div.grid-container .grid-item, div.ratings-list, details summary:contains("Ratings"), details summary:contains("ratings"), .bath3 a, .bath2 a, .bath a').each((_, el) => {
    const $el = $(el);
    // Find all links inside
    const links = $el.is('a') ? [$el] : $el.find('a').toArray().map(a => $(a));

    links.forEach($a => {
      const link = $a.attr('href') || '';
      const img = normalizePath($a.find('img').attr('src'));
      const alt = $a.find('img').attr('alt') || '';
      const text = cleanText($a.text());

      // Extract score if present like "9.1/10", "96%", "4/5", "77/100", "3.5/5", "3.25/5"
      const scoreMatch = text.match(/([0-9.]+\s*\/\s*[0-9.]+|[0-9]+%)/);
      if (scoreMatch || img.includes('RatingSiteLogos') || link.includes('imdb.com') || link.includes('rottentomatoes.com') || link.includes('metacritic.com') || link.includes('hindustantimes') || link.includes('firstpost') || link.includes('timesofindia') || link.includes('ndtv') || link.includes('rediff') || link.includes('indianexpress')) {
        const source = getRatingSource(link, alt, img, text);
        const score = scoreMatch ? scoreMatch[1].replace(/\s+/g, '') : text;
        if (score || link) {
          ratings.push({
            source: source || 'Critic Review',
            score: score || 'Verified',
            url: link && link !== '#' ? link : '',
            icon: img
          });
        }
      }
    });
  });

  // deduplicate ratings by source and url
  const seen = new Set();
  return ratings.filter(r => {
    const key = r.source.toLowerCase() + ':' + r.score;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractBookingLinks($) {
  const bookings = [];
  $('details summary:contains("Tickets"), details:contains("Tickets"), details:contains("Grab Your Tickets")').parent().find('a').each((_, el) => {
    const $el = $(el);
    const url = $el.attr('href');
    if (!url || url === '#' || url.includes('javascript:')) return;
    const img = normalizePath($el.find('img').attr('src'));
    const alt = $el.find('img').attr('alt') || '';
    const text = cleanText($el.text());

    let provider = null;
    let rank = 99;
    const u = url.toLowerCase();
    const a = alt.toLowerCase();

    if (u.includes('paytm.com') || a.includes('paytm')) {
      provider = 'Paytm';
      rank = 1;
    } else if (u.includes('bookmyshow.com') || a.includes('book my show') || a.includes('bookmyshow')) {
      provider = 'BookMyShow';
      rank = 2;
    } else if (u.includes('district') || a.includes('district')) {
      provider = 'District';
      rank = 3;
    } else if (u.includes('ticketnew.com') || a.includes('ticket new') || a.includes('ticketnew')) {
      provider = 'TicketNew';
      rank = 4;
    } else if (u.includes('pvrcinemas') || a.includes('pvr')) {
      provider = 'PVR';
      rank = 5;
    } else if (u.includes('cinepolis') || a.includes('cinepolis')) {
      provider = 'Cinepolis';
      rank = 6;
    } else if (u.includes('fandango.com') || a.includes('fandango')) {
      provider = 'Fandango';
      rank = 7;
    } else if (u.includes('cineworld.co.uk') || a.includes('cineworld')) {
      provider = 'Cineworld';
      rank = 8;
    } else if (u.includes('odeon.co.uk') || a.includes('odeon')) {
      provider = 'ODEON';
      rank = 9;
    } else if (u.includes('eventbrite') || a.includes('eventbrite')) {
      provider = 'Eventbrite';
      rank = 10;
    }

    if (provider) {
      bookings.push({
        provider,
        url,
        icon: img,
        label: text || `Book on ${provider}`,
        rank
      });
    }
  });

  if (bookings.length === 0) {
    $('a[href*="paytm.com"], a[href*="bookmyshow.com"], a[href*="ticketnew.com"], a[href*="fandango.com"], a[href*="cineworld.co.uk"], a[href*="odeon.co.uk"]').each((_, el) => {
      const $el = $(el);
      const url = $el.attr('href');
      if (!url || url === '#' || url.includes('javascript:')) return;
      let provider = null;
      let rank = 99;
      const u = url.toLowerCase();

      if (u.includes('paytm.com')) { provider = 'Paytm'; rank = 1; }
      else if (u.includes('bookmyshow.com')) { provider = 'BookMyShow'; rank = 2; }
      else if (u.includes('ticketnew.com')) { provider = 'TicketNew'; rank = 3; }
      else if (u.includes('fandango.com')) { provider = 'Fandango'; rank = 4; }
      else if (u.includes('cineworld.co.uk')) { provider = 'Cineworld'; rank = 5; }
      else if (u.includes('odeon.co.uk')) { provider = 'ODEON'; rank = 6; }

      if (provider) {
        bookings.push({
          provider,
          url,
          icon: normalizePath($el.find('img').attr('src')),
          label: cleanText($el.text()) || `Book on ${provider}`,
          rank
        });
      }
    });
  }

  const seen = new Set();
  const filtered = bookings.filter(b => {
    const key = b.provider + ':' + b.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  filtered.sort((a, b) => a.rank - b.rank);
  return filtered;
}

function extractWatchOnlineLinks($) {
  const watchLinks = [];
  $('details').each((_, el) => {
    const summary = cleanText($(el).find('summary').text());
    if (/Watch it Online|Watch Online|Rent|Stream|Watch in/i.test(summary)) {
      let lang = '';
      const langMatch = summary.match(/\((.*?)\)/);
      if (langMatch) lang = langMatch[1].replace(/^for\s*/i, '').trim();

      $(el).find('.grid-item a, a').each((_, aEl) => {
        const $a = $(aEl);
        const href = $a.attr('href') || '';
        if (!href || href === '#' || href.includes('javascript:')) return;
        const img = normalizePath($a.find('img').attr('src'));
        const alt = $a.find('img').attr('alt') || '';
        const text = cleanText($a.text());

        let provider = 'Streaming Partner';
        const h = href.toLowerCase();
        const a = alt.toLowerCase();
        const i = (img || '').toLowerCase();

        if (h.includes('netflix.com') || a.includes('netflix') || i.includes('netflix')) provider = 'Netflix';
        else if (h.includes('primevideo.com') || h.includes('amazon.com') || a.includes('prime') || i.includes('prime') || i.includes('amazon')) provider = 'Amazon Prime Video';
        else if (h.includes('hotstar.com') || h.includes('disneyplus.com') || a.includes('hotstar') || i.includes('hotstar')) provider = 'Disney+ Hotstar';
        else if (h.includes('sunnxt.com') || a.includes('sun nxt') || i.includes('sun-nxt')) provider = 'Sun NXT';
        else if (h.includes('zee5.com') || a.includes('zee5') || i.includes('zee5')) provider = 'ZEE5';
        else if (h.includes('sonyliv.com') || a.includes('sonyliv') || i.includes('sonyliv')) provider = 'SonyLIV';
        else if (h.includes('aha.video') || a.includes('aha') || i.includes('aha')) provider = 'Aha';
        else if (h.includes('jiocinema.com') || a.includes('jiocinema') || i.includes('jio')) provider = 'JioCinema';
        else if (h.includes('youtube.com') || a.includes('youtube') || i.includes('youtube')) provider = 'YouTube Movies';
        else if (h.includes('apple.com') || a.includes('apple') || i.includes('itunes')) provider = 'Apple TV / iTunes';
        else if (h.includes('play.google.com') || a.includes('google play') || i.includes('google')) provider = 'Google Play Movies';
        else if (alt) provider = alt.replace(/^watch\s*/i, '').replace(/\s*via\s*/i, ' ').trim();

        watchLinks.push({
          provider,
          url: href,
          icon: img,
          language: lang,
          label: text || 'Watch Now'
        });
      });
    }
  });

  // Top level fallback
  if (watchLinks.length === 0) {
    $('a[href*="netflix.com"], a[href*="sunnxt.com"], a[href*="primevideo.com"], a[href*="hotstar.com"], a[href*="zee5.com"], a[href*="sonyliv.com"], a[href*="aha.video"]').each((_, aEl) => {
      const $a = $(aEl);
      const href = $a.attr('href') || '';
      if (!href || href === '#' || href.includes('javascript:')) return;
      const img = normalizePath($a.find('img').attr('src'));
      let provider = 'Streaming Platform';
      if (href.includes('netflix.com')) provider = 'Netflix';
      else if (href.includes('sunnxt.com')) provider = 'Sun NXT';
      else if (href.includes('primevideo.com') || href.includes('amazon.com')) provider = 'Amazon Prime Video';
      else if (href.includes('hotstar.com')) provider = 'Disney+ Hotstar';
      else if (href.includes('zee5.com')) provider = 'ZEE5';
      else if (href.includes('sonyliv.com')) provider = 'SonyLIV';
      else if (href.includes('aha.video')) provider = 'Aha';

      watchLinks.push({
        provider,
        url: href,
        icon: img,
        language: '',
        label: cleanText($a.text()) || 'Watch Online'
      });
    });
  }

  const seen = new Set();
  return watchLinks.filter(w => {
    const key = w.provider + ':' + w.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractMusicLinks($) {
  const links = [];
  $('details').each((_, el) => {
    const summary = cleanText($(el).find('summary').text());
    if (/Songs|Music|Soundtrack|Download\/Listen/i.test(summary)) {
      let lang = '';
      const langMatch = summary.match(/\((.*?)\)/);
      if (langMatch) lang = langMatch[1].replace(/^for\s*/i, '').trim();

      $(el).find('.grid-item a, a').each((_, aEl) => {
        const $a = $(aEl);
        const href = $a.attr('href') || '';
        if (!href || href === '#' || href.includes('javascript:')) return;
        const img = normalizePath($a.find('img').attr('src'));
        const alt = $a.find('img').attr('alt') || '';
        const text = cleanText($a.text());

        let provider = 'Music Platform';
        const h = href.toLowerCase();
        const a = alt.toLowerCase();
        const i = (img || '').toLowerCase();

        if (h.includes('spotify.com') || a.includes('spotify') || i.includes('spotify')) provider = 'Spotify';
        else if (h.includes('apple.com') || h.includes('itunes') || a.includes('itunes') || a.includes('apple') || i.includes('itunes') || i.includes('apple')) provider = 'Apple Music / iTunes';
        else if (h.includes('gaana.com') || a.includes('gaana') || i.includes('gaana')) provider = 'Gaana';
        else if (h.includes('saavn.com') || h.includes('jiosaavn.com') || a.includes('saavn') || i.includes('saavn')) provider = 'JioSaavn';
        else if (h.includes('wynk.in') || a.includes('wynk') || i.includes('wynk')) provider = 'Wynk Music';
        else if (h.includes('hungama.com') || a.includes('hungama') || i.includes('hungama')) provider = 'Hungama';
        else if (h.includes('amazon.com/music') || a.includes('amazon music')) provider = 'Amazon Music';
        else if (alt) provider = alt.replace(/^listen to\s*/i, '').replace(/\s*via\s*/i, ' ').trim();

        links.push({
          provider,
          url: href,
          icon: img,
          language: lang,
          label: text || 'Listen Now'
        });
      });
    }
  });

  // Top level fallback
  if (links.length === 0) {
    $('a[href*="itunes.apple.com"], a[href*="music.apple.com"], a[href*="spotify.com"], a[href*="gaana.com"], a[href*="jiosaavn.com"], a[href*="saavn.com"], a[href*="wynk.in"]').each((_, aEl) => {
      const $a = $(aEl);
      const href = $a.attr('href') || '';
      if (!href || href === '#' || href.includes('javascript:')) return;
      const img = normalizePath($a.find('img').attr('src'));
      let provider = 'Music Platform';
      if (href.includes('apple') || href.includes('itunes')) provider = 'Apple Music / iTunes';
      else if (href.includes('spotify')) provider = 'Spotify';
      else if (href.includes('gaana')) provider = 'Gaana';
      else if (href.includes('saavn')) provider = 'JioSaavn';
      else if (href.includes('wynk')) provider = 'Wynk Music';

      links.push({
        provider,
        url: href,
        icon: img,
        language: '',
        label: cleanText($a.text()) || 'Listen Now'
      });
    });
  }

  const seen = new Set();
  return links.filter(m => {
    const key = m.provider + ':' + m.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractOfficialWebsite($) {
  let site = null;
  $('details summary:contains("Official Website")').parent().find('a').each((_, aEl) => {
    if (site) return;
    const href = $(aEl).attr('href');
    const text = cleanText($(aEl).text());
    if (href && href.startsWith('http') && !href.includes('oakshow') && !href.includes('facebook') && !href.includes('twitter')) {
      site = { url: href, label: text || 'Official Website' };
    }
  });
  if (!site) {
    $('a').each((_, aEl) => {
      if (site) return;
      const text = cleanText($(aEl).text());
      const href = $(aEl).attr('href') || '';
      if (/official website/i.test(text) && href.startsWith('http') && !href.includes('oakshow') && !href.includes('facebook') && !href.includes('twitter')) {
        site = { url: href, label: text };
      }
    });
  }
  return site;
}

function extractSocialLinks($) {
  const socials = [];
  $('details').each((_, el) => {
    const summary = cleanText($(el).find('summary').text());
    if (/Official Social Media|Social Media Accounts|Social Media|Connect With/i.test(summary)) {
      let lang = '';
      const langMatch = summary.match(/\((.*?)\)/);
      if (langMatch) lang = langMatch[1].replace(/^for\s*/i, '').trim();

      $(el).find('.grid-item a, a').each((_, aEl) => {
        const $a = $(aEl);
        const href = $a.attr('href') || '';
        if (!href || href.includes('sharer') || href.includes('intent') || href.includes('oak_show') || href.includes('129192287245139') || href.includes('oakshow.in')) return;
        const img = normalizePath($a.find('img').attr('src'));
        const alt = $a.find('img').attr('alt') || '';
        const text = cleanText($a.text());

        let platform = 'Social Network';
        if (href.includes('facebook.com')) platform = 'Facebook';
        else if (href.includes('twitter.com') || href.includes('x.com')) platform = 'Twitter / X';
        else if (href.includes('instagram.com')) platform = 'Instagram';
        else if (href.includes('youtube.com')) platform = 'YouTube';

        socials.push({
          platform,
          url: href,
          icon: img,
          language: lang,
          label: text || `Connect on ${platform}`
        });
      });
    }
  });

  // Top level fallback
  if (socials.length === 0) {
    $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"], a[href*="youtube.com"]').each((_, aEl) => {
      const $a = $(aEl);
      const href = $a.attr('href') || '';
      if (!href || href.includes('sharer') || href.includes('intent') || href.includes('oak_show') || href.includes('129192287245139') || href.includes('watch') || href.includes('embed')) return;
      const img = normalizePath($a.find('img').attr('src'));
      let platform = 'Social Network';
      if (href.includes('facebook.com')) platform = 'Facebook';
      else if (href.includes('twitter.com')) platform = 'Twitter / X';
      else if (href.includes('instagram.com')) platform = 'Instagram';
      else if (href.includes('youtube.com')) platform = 'YouTube';

      socials.push({
        platform,
        url: href,
        icon: img,
        language: '',
        label: cleanText($a.text()) || `Connect on ${platform}`
      });
    });
  }

  const seen = new Set();
  return socials.filter(s => {
    const key = s.platform + ':' + s.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractCast($) {
  const castList = [];
  $('details summary:contains("Cast"), details:contains("Cast")').find('li').each((_, el) => {
    const $li = $(el);
    const actor = cleanText($li.find('b, strong').first().text());
    let fullText = cleanText($li.text());
    let role = '';
    let bio = cleanText($li.find('p').text());

    if (fullText.includes(' as ')) {
      const parts = fullText.split(' as ');
      role = parts[1] ? parts[1].split('.')[0].trim() : '';
    }
    if (actor) {
      castList.push({
        actor,
        role: role || 'Cast',
        description: bio
      });
    }
  });
  return castList;
}

function extractSimilarMovies($) {
  const similar = [];
  $('details').each((_, el) => {
    const summary = cleanText($(el).find('summary').text());
    if (/similar/i.test(summary)) {
      $(el).find('.grid-item').each((_, item) => {
        const $item = $(item);
        const link = $item.find('a').attr('href');
        const poster = normalizePath($item.find('img').attr('src'));
        const title = cleanText($item.find('.fur-name, a').first().text()) || cleanText($item.text());
        if (title && link && link.endsWith('.html') && !link.includes('index.html')) {
          similar.push({
            title: title.replace(/\s+/g, ' ').trim(),
            link: normalizePath(link),
            poster: poster && !poster.includes('RatingSiteLogos') ? poster : ''
          });
        }
      });
    }
  });

  const seen = new Set();
  return similar.filter(s => {
    if (!s.title || seen.has(s.title.toLowerCase())) return false;
    seen.add(s.title.toLowerCase());
    return true;
  });
}

function extractGalleryImages($) {
  const images = [];
  $('ul.slides li img, .flexslider img, .buying-top img').each((_, el) => {
    const src = normalizePath($(el).attr('src') || $(el).parent().attr('data-thumb'));
    const alt = $(el).attr('alt') || '';
    if (src && !src.includes('RatingSiteLogos') && !src.includes('favicon') && !src.includes('SocialWebsiteLogos') && !src.includes('BookngWebSiteLogos')) {
      images.push({ src, alt });
    }
  });
  const seen = new Set();
  return images.filter(i => {
    if (seen.has(i.src)) return false;
    seen.add(i.src);
    return true;
  });
}

function extractVideos($, filename) {
  const videos = [];
  $('.youtube-player, [data-id]').each((_, el) => {
    const yid = $(el).attr('data-id');
    if (yid) {
      const parentTitle = cleanText($(el).closest('.box-col, .single-box, .blog-top').find('h4, h1, .blog-title').first().text());
      videos.push({
        url: `https://www.youtube.com/watch?v=${yid}`,
        youtubeId: yid,
        title: parentTitle || 'Official Trailer / Teaser'
      });
    }
  });

  $('iframe[src*="youtube.com"], iframe[src*="youtu.be"], a[href*="youtube.com/watch"], a[href*="youtu.be/"]').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('href');
    const title = cleanText($(el).text()) || cleanText($(el).attr('title')) || cleanText($(el).find('img').attr('alt')) || 'Official Video';
    if (src) {
      let youtubeId = '';
      const match = src.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/|^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=)([\w-]{11})/);
      if (match) youtubeId = match[1];
      if (youtubeId) {
        videos.push({ 
          url: `https://www.youtube.com/watch?v=${youtubeId}`, 
          youtubeId, 
          title: title.length > 3 ? title : 'Official Video Clip' 
        });
      }
    }
  });
  const seen = new Set();
  return videos.filter(v => {
    if (!v.youtubeId || seen.has(v.youtubeId)) return false;
    seen.add(v.youtubeId);
    return true;
  });
}

function extractAfterReleaseArticles($) {
  const articles = [];
  $('details').each((_, el) => {
    const summary = cleanText($(el).find('summary').text());
    if (/Reviews|News|Updates|Articles|Reports|Media Coverage|Critic/i.test(summary) && 
        !/Watch it Online|Watch Online|Songs|Music|Soundtrack|Ratings|Click To See|Tickets|Pre-Book|Social|Similar|Plot|Cast/i.test(summary)) {
      $(el).find('p').each((_, pEl) => {
        const $p = $(pEl);
        const link = $p.find('a').attr('href');
        const headline = cleanText($p.find('a').text());
        const fullText = cleanText($p.text());
        if (link && headline) {
          let author = '';
          let date = '';
          const byMatch = fullText.match(/By\s*:\s*([^-\n]+)(?:-\s*(.*))?/i);
          if (byMatch) {
            author = byMatch[1]?.trim() || '';
            date = byMatch[2]?.trim() || '';
          }
          articles.push({
            headline,
            url: link,
            author: author || 'Critic / News Desk',
            date: date || '',
            section: summary
          });
        }
      });
    }
  });

  const seen = new Set();
  return articles.filter(a => {
    const key = (a.headline || '') + ':' + (a.url || '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractBoxOffice($) {
  let bo = null;
  $('details').each((_, el) => {
    const summary = cleanText($(el).find('summary').text());
    if (/Box Office/i.test(summary)) {
      bo = {};
      $(el).find('p, li, div').each((_, pEl) => {
        const text = cleanText($(pEl).text());
        if (/Worldwide\s*(?:Gross|Total)?\s*:\s*(.*)/i.test(text)) {
          bo.worldwideGross = text.replace(/Worldwide\s*(?:Gross|Total)?\s*:\s*/i, '').trim();
        } else if (/India\s*(?:Domestic\s*)?(?:Gross|Total)?\s*:\s*(.*)/i.test(text)) {
          bo.indiaGross = text.replace(/India\s*(?:Domestic\s*)?(?:Gross|Total)?\s*:\s*/i, '').trim();
        } else if (/Overseas\s*(?:Gross|Total)?\s*:\s*(.*)/i.test(text)) {
          bo.overseasGross = text.replace(/Overseas\s*(?:Gross|Total)?\s*:\s*/i, '').trim();
        } else if (/Opening\s*Day\s*:\s*(.*)/i.test(text)) {
          bo.openingDay = text.replace(/Opening\s*Day\s*:\s*/i, '').trim();
        } else if (/Opening\s*Weekend\s*:\s*(.*)/i.test(text)) {
          bo.openingWeekend = text.replace(/Opening\s*Weekend\s*:\s*/i, '').trim();
        } else if (/Budget\s*:\s*(.*)/i.test(text)) {
          bo.budget = text.replace(/Budget\s*:\s*/i, '').trim();
        } else if (/(?:Commercial\s*)?Verdict\s*:\s*(.*)/i.test(text)) {
          bo.verdict = text.replace(/(?:Commercial\s*)?Verdict\s*:\s*/i, '').trim();
        }
      });
      if (Object.keys(bo).length === 0) {
        bo = null;
      } else {
        bo.lastUpdated = 'August 2026';
        bo.source = 'Trade Reports / Sacnilk & Pinkvilla';
      }
    }
  });
  return bo;
}


function extractEntityTitle($, filename, meta) {
  // 1. Check itemprop="name" (e.g. <h1 itemprop="name">AA19</h1>)
  const itempropName = cleanText($('[itemprop="name"]').first().text());
  if (itempropName && !/^description$/i.test(itempropName)) {
    return itempropName;
  }

  // 2. Check h4 that is NOT "Description", "Reviews", "Trailers", "Cast", etc.
  let h4Title = '';
  $('h4').each((_, el) => {
    if (h4Title) return;
    const txt = cleanText($(el).text());
    if (txt && !/^(description|trailers?|reviews?|cast|grab your tickets|download|listen|official social|similar|news)/i.test(txt)) {
      h4Title = txt;
    }
  });
  if (h4Title) return h4Title;

  // 3. Check h1 that is NOT "Description"
  const h1Title = cleanText($('h1').first().text());
  if (h1Title && !/^(description|trailers?|reviews?)/i.test(h1Title)) {
    return h1Title;
  }

  // 4. Extract from meta title (preserves multi-language titles like 365 Days/365 Dni, 7:20 Once a Week/En tu piel, AA19)
  if (meta && meta.title) {
    let t = meta.title;
    t = t.split(/\s*\|\s*All Ratings/i)[0];
    t = t.split(/\s*All Ratings/i)[0];
    t = t.split(/\s*All Reviews/i)[0];
    t = t.split(/\s*Movie Reviews and Ratings/i)[0];
    t = t.split(/\s*Reviews and Ratings/i)[0];
    t = t.split(/\s*Ratings and Reviews/i)[0];
    t = t.split(/\s*Ratings,Reviews/i)[0];
    t = t.split(/\s*Ratings Reviews/i)[0];
    t = t.split(/\s*Ratings/i)[0];
    t = t.trim();
    if (t && !/^description$/i.test(t)) {
      return t;
    }
  }

  // 5. Fallback to filename
  return path.basename(filename, '.html');
}


const INDIAN_LANGS = [
  'hindi', 'tamil', 'telugu', 'malayalam', 'malyalam', 'kannada', 
  'marathi', 'bengali', 'punjabi', 'gujarati', 'urdu', 'hinid', 
  'sinhala', 'bhojpuri', 'odia', 'assamese'
];

const INTL_LANGS = [
  'japanese', 'korean', 'chinese', 'mandarin', 'spanish', 'polish', 
  'norwegian', 'indonesian', 'french', 'german', 'italian', 'russian', 
  'turkish', 'thai', 'danish', 'swedish'
];

const KNOWN_SERIES_SLUGS = new Set([
  'gameofthrones', 'sacredgames', 'sherlock', 'suits', 'supergirl', 'theboys', 'theboyss1', 'theboyss2',
  'theflash', 'westworld', 'madeinheaven', 'moneyheist', 'aashram', 'aashrams1',
  'littlethings', 'littlethingss1', 'littlethingss2', 'littlethingss3', 
  'mastram', 'mastrams1', 'mugilan', 'mugilans1', 'poison', 'prabhakidiary', 
  'raginimmreturns', 'raginimmreturnss1', 'raginimmreturnss2', 'stargirl', 
  'stargirls1', 'wannahaveagoodtime', 'wannahaveagoodtimes2', 'soulmate', 
  'officescandal', 'fuhsefantasy', 'mycousinsister', 'thebutterflystroke', 
  'theyogaexperience', 'flip', 'arrow', 'peakyblinders', 'breakingbad', 'dark',
  'squidgame', 'narcos', 'loki', 'wandavision', 'strangerthings'
]);

const ROOT_HUB_PAGES = new Set([
  'hollywood', 'indian', 'recent', 'popular', 'trending', 'upcoming', 'upcoming2', 'upcoming3',
  'home', 'contact', 'privacypolicy', 'terms', 'disclaimer', 'dmca', 'about', 'aboutus',
  'callofdutyblackops4', 'remarksatoakshow', 'submityourreviews', 'oakshowgalleries', 'legacy_index',
  'trailers', 'trailers2', 'careers'
]);

function isHubOrTrailerPage(cleanId) {
  if (ROOT_HUB_PAGES.has(cleanId)) return true;
  if (/officialtrailer\d*$/i.test(cleanId) || /trailer\d*$/i.test(cleanId) || /teaser\d*$/i.test(cleanId)) return true;
  return false;
}

function detectType(filename, title, genre, metaTitle, filePath) {
  const cleanId = path.basename(filename, '.html').toLowerCase();
  if (KNOWN_SERIES_SLUGS.has(cleanId)) return 'series';

  const text = `${filename} ${title} ${genre} ${metaTitle} ${filePath}`.toLowerCase();
  
  if (text.includes('web series') || 
      text.includes('(tv series)') || 
      text.includes('tv series') || 
      text.includes('tv show') || 
      /\bseason\s*\d+\b/i.test(text) || 
      /\bepisode\s*\d+\b/i.test(text) ||
      filePath.includes('/dbs/') || 
      filePath.includes('\\dbs\\')) {
    return 'series';
  }

  return 'movie';
}

function detectCategory(language, title, genre) {
  const l = (language || '').toLowerCase();
  const t = (title || '').toLowerCase();

  if (INDIAN_LANGS.some(k => l.includes(k))) return 'Indian';

  if (INTL_LANGS.some(k => new RegExp('\\b' + k + '\\b', 'i').test(l) || new RegExp('\\b' + k + '\\b', 'i').test(t))) {
    return 'International';
  }

  if (l.includes('english') || l.includes('eng')) {
    return 'Hollywood';
  }

  return 'Indian';
}

function calculateScore(ratings) {
  if (!ratings || ratings.length === 0) return 7.5;
  const oakRating = ratings.find(r => r.source === 'OakShow');
  if (oakRating && oakRating.score) {
    const s = oakRating.score;
    const num = parseFloat(s);
    if (!isNaN(num)) {
      if (s.includes('/10')) return num;
      if (s.includes('/5')) return num * 2;
      if (s.includes('%')) return num / 10;
      if (num <= 10) return num;
      if (num <= 100) return num / 10;
    }
  }
  const imdbRating = ratings.find(r => r.source === 'IMDb');
  if (imdbRating && imdbRating.score) {
    const num = parseFloat(imdbRating.score);
    if (!isNaN(num)) {
      if (num <= 10) return num;
      if (num <= 100) return num / 10;
    }
  }
  for (const r of ratings) {
    const num = parseFloat(r.score);
    if (!isNaN(num)) {
      if (num <= 10) return num;
      if (num <= 100) return num / 10;
    }
  }
  return 7.5;
}

function processMovieOrShow($, filename, filePath, meta) {
  const title = extractEntityTitle($, filename, meta);
  
  let language = '';
  let releaseDate = '';
  let genre = '';
  let duration = '';
  let director = '';
  let basedOn = '';
  let plot = '';

  $('p').each((_, el) => {
    const text = cleanText($(el).text());
    if (/^Language\s*:\s*(.*)/i.test(text)) {
      language = text.replace(/^Language\s*:\s*/i, '').trim();
    } else if (/^Release Date\s*:\s*(.*)/i.test(text)) {
      if (!releaseDate) releaseDate = text.replace(/^Release Date\s*:\s*/i, '').trim();
    } else if (/^Genre\s*:\s*(.*)/i.test(text)) {
      genre = text.replace(/^Genre\s*:\s*/i, '').trim();
    } else if (/^Duration\s*:\s*(.*)/i.test(text)) {
      duration = text.replace(/^Duration\s*:\s*/i, '').trim();
    } else if (/^Director\(s\)\s*:\s*(.*)/i.test(text)) {
      director = text.replace(/^Director\(s\)\s*:\s*/i, '').trim();
    } else if (/^Based on\s*:\s*(.*)/i.test(text)) {
      basedOn = text.replace(/^Based on\s*:\s*/i, '').trim();
    }
  });

  // Extract plot from details summary "Plot"
  $('details').each((_, el) => {
    const summaryText = cleanText($(el).find('summary').text());
    if (/Plot/i.test(summaryText)) {
      plot = cleanText($(el).find('p').text());
    }
  });

  const gallery = extractGalleryImages($);
  let poster = meta.ogImage || (gallery.length > 0 ? gallery[0].src : '');
  if (!poster) {
    const firstImg = $('img.img-responsive, .buying-top img, .left-side img').first().attr('src');
    if (firstImg) poster = normalizePath(firstImg);
  }

  const ratings = extractRatings($);
  const bookings = extractBookingLinks($);
  const watchOnline = extractWatchOnlineLinks($);
  const music = extractMusicLinks($);
  const officialWebsite = extractOfficialWebsite($);
  const socials = extractSocialLinks($);
  const cast = extractCast($);
  const similar = extractSimilarMovies($);
  const videos = extractVideos($);
  const articles = extractAfterReleaseArticles($);
  const boxOffice = extractBoxOffice($);

  const type = detectType(filename, title, genre, meta.title, filePath);
  const category = detectCategory(language, title, genre);
  const score = calculateScore(ratings);
  const yearStr = (releaseDate || meta.datePublished || '').match(/\b(20\d\d)\b/)?.[1] || '';

  return {
    id: path.basename(filename, '.html'),
    slug: path.basename(filename, '.html').toLowerCase(),
    type,
    category,
    score,
    filename,
    title,
    metaTitle: meta.title,
    description: meta.description || plot,
    plot,
    language: language || (category === 'Hollywood' ? 'English' : 'Hindi'),
    releaseDate: releaseDate || meta.datePublished || '',
    year: yearStr,
    genre: genre || 'Entertainment',
    duration: duration || 'N/A',
    director,
    basedOn,
    boxOffice,
    poster,
    gallery,
    ratings,
    cast,
    bookings,
    watchOnline,
    music,
    officialWebsite,
    socials,
    similar,
    videos,
    articles,
    filePath: normalizePath(filePath)
  };
}

function processReleaseCalendar($, filename) {
  const pageTitle = cleanText($('h3, title').first().text());
  const yearMatch = filename.match(/20\d\d/);
  const year = yearMatch ? yearMatch[0] : '';
  
  const monthMatch = filename.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
  const month = monthMatch ? monthMatch[0] : '';
  
  const isIndian = filename.toLowerCase().includes('indian') || filename.toLowerCase().startsWith('releases');
  const isHollywood = filename.toLowerCase().includes('hollywood');
  const category = isHollywood ? 'Hollywood' : 'Indian';

  const items = [];
  $('div.box-col').each((_, el) => {
    const $el = $(el);
    const title = cleanText($el.find('h4').text());
    const poster = normalizePath($el.find('img').attr('src'));
    const alt = $el.find('img').attr('alt') || '';
    
    let language = '';
    let releaseDate = '';
    let genre = '';

    $el.find('p').each((_, pel) => {
      const text = cleanText($(pel).text());
      if (/Language\s*:\s*(.*)/i.test(text)) language = text.replace(/^Language\s*:\s*/i, '').trim();
      else if (/Release Date\s*:\s*(.*)/i.test(text)) releaseDate = text.replace(/^Release Date\s*:\s*/i, '').trim();
      else if (/Genre\s*:\s*(.*)/i.test(text)) genre = text.replace(/^Genre\s*:\s*/i, '').trim();
    });

    const moreLink = normalizePath($el.find('a:contains("More"), a:contains("Check")').attr('href'));
    const trailerLink = $el.find('a:contains("Trailer"), a:contains("Video")').attr('href') || '';
    const ratings = [];
    $el.find('.grid-item a').each((_, ra) => {
      const rScore = cleanText($(ra).text());
      const rImg = normalizePath($(ra).find('img').attr('src'));
      const rAlt = $(ra).find('img').attr('alt') || '';
      const rUrl = $(ra).attr('href') || '';
      if (rScore) {
        ratings.push({ source: rAlt.replace(/ ratings?/i, '') || 'Critic', score: rScore, icon: rImg, url: rUrl });
      }
    });

    if (title) {
      const itemCategory = detectCategory(language, title, genre);
      items.push({
        title,
        poster,
        alt,
        language: language || (category === 'Hollywood' ? 'English' : 'Hindi'),
        category: itemCategory,
        releaseDate,
        genre,
        moreLink,
        trailerLink,
        ratings
      });
    }
  });

  return {
    id: path.basename(filename, '.html'),
    title: pageTitle || filename,
    year,
    month,
    category,
    filename,
    totalItems: items.length,
    items
  };
}

function processCriticReviewsPage($, filename, filePath, meta) {
  const reviews = [];
  
  $('div.box-col').each((_, el) => {
    const $el = $(el);
    const title = cleanText($el.find('h4').text());
    const banner = normalizePath($el.find('img').attr('src'));
    const ratingMeter = $el.find('meter').attr('value') || '';
    const ratingText = cleanText($el.find('meter').parent().text()).match(/([0-9.]+\s*\/\s*5)/)?.[1] || (ratingMeter ? `${ratingMeter}/5` : '');
    const author = cleanText($el.find('p:contains("By"), p:contains("Author")').text()).replace(/^By\s*:\s*/i, '').trim();
    const date = cleanText($el.find('p:contains("Date")').text()).replace(/^Date\s*:\s*/i, '').trim();
    const link = normalizePath($el.find('a:contains("Read Full Review"), a:contains("More")').attr('href'));
    const remark = banner.includes('must-watch') ? 'Must Watch' : (banner.includes('safe-to-watch') ? 'Safe to Watch' : 'Critic Review');
    const remarkBadge = banner.includes('must-watch') ? '🌟 Must Watch' : '👍 Safe to Watch';
    const excerpt = cleanText($el.find('p').not(':contains("By"), :contains("Date"), :contains("Genre")').text());

    if (title) {
      reviews.push({
        title,
        banner,
        link,
        rating: ratingText || (ratingMeter ? `${ratingMeter}/5` : 'N/A'),
        score: parseFloat(ratingMeter) || 0,
        author,
        date,
        remark,
        remarkBadge,
        excerpt
      });
    }
  });

  if (reviews.length === 0 && filePath.includes('CriticProfiles')) {
    const title = cleanText($('h1').text()) || meta.title;
    const author = cleanText($('h5:contains("Posted By")').text()).split('|')[0]?.replace('Posted By :', '').trim() || 'OakShow Critic';
    const date = cleanText($('h5:contains("Date")').text()).split('|')[1]?.replace('Date :', '').trim() || meta.datePublished || '';
    const ratingMeter = $('meter').attr('value') || '';
    const ratingText = cleanText($('meter').parent().text()).match(/([0-9.]+\s*\/\s*5)/)?.[1] || (ratingMeter ? `${ratingMeter}/5` : '');
    const banner = meta.ogImage || normalizePath($('.blog-top img').first().attr('src'));
    const fullText = cleanText($('.blog-top').text());
    
    reviews.push({
      id: path.basename(filename, '.html'),
      title,
      banner,
      link: normalizePath(filename),
      rating: ratingText || (ratingMeter ? `${ratingMeter}/5` : 'N/A'),
      score: parseFloat(ratingMeter) || 0,
      author,
      date,
      remark: banner.includes('must-watch') ? 'Must Watch' : 'Safe to Watch',
      excerpt: meta.description || fullText.substring(0, 200) + '...',
      fullReview: fullText
    });
  }

  return reviews;
}

function processGamesPage($, filename) {
  const games = [];
  $('div.box-col').each((_, el) => {
    const $el = $(el);
    const title = cleanText($el.find('h4').text());
    const poster = normalizePath($el.find('img').attr('src'));
    let platform = '', releaseDate = '', genre = '', developer = '', publisher = '', type = '';
    
    $el.find('p').each((_, pel) => {
      const text = cleanText($(pel).text());
      if (/Platform\s*:\s*(.*)/i.test(text)) platform = text.replace(/^Platform\s*:\s*/i, '').trim();
      else if (/Release Date\s*:\s*(.*)/i.test(text)) releaseDate = text.replace(/^Release Date\s*:\s*/i, '').trim();
      else if (/Genre\s*:\s*(.*)/i.test(text)) genre = text.replace(/^Genre\s*:\s*/i, '').trim();
      else if (/Developer\(s\)\s*:\s*(.*)/i.test(text)) developer = text.replace(/^Developer\(s\)\s*:\s*/i, '').trim();
      else if (/Publisher\(s\)\s*:\s*(.*)/i.test(text)) publisher = text.replace(/^Publisher\(s\)\s*:\s*/i, '').trim();
      else if (/Type\s*:\s*(.*)/i.test(text)) type = text.replace(/^Type\s*:\s*/i, '').trim();
    });

    const promoLink = $el.find('a:contains("Promo"), a[href*="youtube.com"]').attr('href') || '';
    const moreLink = normalizePath($el.find('a:contains("More"), a:contains("Get it")').attr('href'));

    if (title) {
      games.push({
        title,
        poster,
        platform,
        releaseDate,
        genre,
        developer,
        publisher,
        type,
        promoLink,
        moreLink
      });
    }
  });
  return games;
}

function processBooksPage($, filename) {
  const books = [];
  $('div.box-col, .blog-top').each((_, el) => {
    const $el = $(el);
    const title = cleanText($el.find('h4, h1').text());
    const cover = normalizePath($el.find('img').attr('src'));
    let author = '', releaseDate = '', genre = '', publisher = '';

    $el.find('p').each((_, pel) => {
      const text = cleanText($(pel).text());
      if (/Author\(s\)\s*:\s*(.*)/i.test(text)) author = text.replace(/^Author\(s\)\s*:\s*/i, '').trim();
      else if (/Release Date\s*:\s*(.*)/i.test(text)) releaseDate = text.replace(/^Release Date\s*:\s*/i, '').trim();
      else if (/Genre\s*:\s*(.*)/i.test(text)) genre = text.replace(/^Genre\s*:\s*/i, '').trim();
      else if (/Publisher\(s\)\s*:\s*(.*)/i.test(text)) publisher = text.replace(/^Publisher\(s\)\s*:\s*/i, '').trim();
    });

    const moreLink = normalizePath($el.find('a:contains("More"), a:contains("Read")').attr('href'));

    if (title) {
      books.push({
        title,
        cover,
        author,
        releaseDate,
        genre,
        publisher,
        moreLink
      });
    }
  });
  return books;
}

function processEpisodeFile($, filename, filePath, meta) {
  const epMatch = filename.match(/\d+/);
  const epNum = epMatch ? parseInt(epMatch[0], 10) : 1;
  let engTitle = '';
  let japTitle = '';
  let writer = '';
  let japaneseAirDate = '';
  let englishAirDate = '';
  let plot = '';

  $('p').each((_, el) => {
    const text = cleanText($(el).text());
    if (/^Title\(English\)\s*:\s*(.*)/i.test(text)) {
      engTitle = text.replace(/^Title\(English\)\s*:\s*/i, '').trim();
    } else if (/^Title\(Japanese\)\s*:\s*(.*)/i.test(text)) {
      japTitle = text.replace(/^Title\(Japanese\)\s*:\s*/i, '').trim();
    } else if (/^Writer\s*:\s*(.*)/i.test(text)) {
      writer = text.replace(/^Writer\s*:\s*/i, '').trim();
    }
  });

  $('details').each((_, el) => {
    const sum = cleanText($(el).find('summary').text());
    if (/Japanes|Japanese/i.test(sum)) {
      japaneseAirDate = cleanText($(el).find('p:contains("Date"), p:contains("First")').text()).replace(/^.*Date\s*:\s*/i, '').trim();
    }
    if (/English/i.test(sum)) {
      englishAirDate = cleanText($(el).find('p:contains("Date"), p:contains("First")').text()).replace(/^.*Date\s*:\s*/i, '').trim();
    }
    if (/Plot/i.test(sum)) {
      plot = cleanText($(el).find('p').text());
    }
  });

  const characters = [];
  $('details summary:contains("Characters")').parent().find('li b, li').each((_, el) => {
    const name = cleanText($(el).text());
    if (name && !characters.includes(name)) characters.push(name);
  });

  const ratings = extractRatings($);
  const articles = [];
  $('details summary:contains("Reviews and News")').parent().find('p').each((_, el) => {
    const $p = $(el);
    const $a = $p.find('a');
    if ($a.length > 0) {
      const headline = cleanText($a.text());
      const url = $a.attr('href') || '';
      const text = cleanText($p.text());
      const authorMatch = text.match(/By:\s*([^-\n]+)/i);
      const dateMatch = text.match(/-\s*([0-9A-Za-z, ]+)/);
      articles.push({
        headline,
        url,
        author: authorMatch ? authorMatch[1].trim() : 'Press Report',
        date: dateMatch ? dateMatch[1].trim() : ''
      });
    }
  });

  const watchOnline = extractWatchOnlineLinks($);

  const thumbRel = `dbs/epsiodes/${epNum}.jpg`;
  const thumbPath = fs.existsSync(path.join(WORKSPACE_ROOT, thumbRel)) ? thumbRel : (meta.ogImage || '');

  return {
    id: path.basename(filename, '.html'),
    episodeNumber: epNum,
    title: engTitle || `Episode ${epNum}`,
    englishTitle: engTitle || `Episode ${epNum}`,
    japaneseTitle: japTitle,
    writer: writer || 'Akira Toriyama',
    japaneseAirDate,
    englishAirDate,
    characters,
    plot: plot || meta.description || '',
    ratings,
    articles,
    watchOnline,
    thumbnail: thumbPath,
    filename
  };
}

// -------------------------------------------------------------
// MAIN EXTRACTION LOOP
// -------------------------------------------------------------
async function runExtraction() {
  console.log('Starting full data extraction from OakShow repository...');

  const allHtmlFiles = [];
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory() && !ent.name.startsWith('.') && ent.name !== 'node_modules' && ent.name !== 'dist') {
        scanDir(full);
      } else if (ent.isFile() && ent.name.endsWith('.html') && ent.name.toLowerCase() !== 'index.html') {
        allHtmlFiles.push(full);
      }
    }
  }
  scanDir(WORKSPACE_ROOT);

  console.log(`Found total ${allHtmlFiles.length} HTML files across repository.`);

  const movies = [];
  const series = [];
  const releases = [];
  const reviews = [];
  let games = [];
  let books = [];
  const sports = [];
  const news = [];
  const dbsEpisodes = [];
  const standaloneSeasons = [];

  for (const filePath of allHtmlFiles) {
    const filename = path.basename(filePath);
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      const $ = cheerio.load(html);
      const meta = extractMeta($);

      // Check DBS Episode Files
      if (filename.toLowerCase().startsWith('dbsepisode') || filePath.includes('/dbs/') || filePath.includes('\\dbs\\')) {
        if (filename.toLowerCase().startsWith('dbsepisode')) {
          const epData = processEpisodeFile($, filename, filePath, meta);
          dbsEpisodes.push(epData);
          continue;
        }
      }

      // Check Release Calendars
      if (/Releases\d{4}/i.test(filename)) {
        const cal = processReleaseCalendar($, filename);
        releases.push(cal);
        continue;
      }

      // Check Critic Reviews Hubs
      if (/OakShowReviews/i.test(filename) || filePath.includes('CriticProfiles')) {
        const revs = processCriticReviewsPage($, filename, filePath, meta);
        reviews.push(...revs);
        continue;
      }

      // Check Games
      if (filename.toLowerCase() === 'games.html') {
        games = processGamesPage($, filename);
        continue;
      }

      // Check Books
      if (filename.toLowerCase() === 'books.html') {
        books = processBooksPage($, filename);
        continue;
      }

      // Check Sports
      if (/worldcup|fifa|hockey|isl|sports/i.test(filename)) {
        sports.push({
          id: path.basename(filename, '.html'),
          title: meta.title || filename,
          meta,
          filename
        });
        continue;
      }

      // Check News
      if (/OakShowNews|OakShowBlog/i.test(filename)) {
        news.push({
          id: path.basename(filename, '.html'),
          title: meta.title,
          meta,
          filename
        });
        continue;
      }

      const cleanId = path.basename(filename, '.html').toLowerCase();

      // Check Games like Call of Duty
      if (cleanId === 'callofdutyblackops4') {
        games.push({
          title: 'Call of Duty: Black Ops 4',
          poster: 'pics/Games/Call of Duty Black Ops 4/1.jpg',
          platform: 'PlayStation 4, Xbox One, Microsoft Windows',
          releaseDate: 'October 12, 2018',
          genre: 'First-Person Shooter, Battle Royale',
          developer: 'Treyarch',
          publisher: 'Activision',
          type: 'Full Game',
          promoLink: 'https://www.youtube.com/watch?v=6uqVGcdM7n4',
          moreLink: 'CallofDutyBlackOps4.html'
        });
        continue;
      }

      // Skip non-entertainment utility pages, hub listings, and trailer pages
      if (isHubOrTrailerPage(cleanId)) {
        continue;
      }

      // Otherwise, process as Movie / Show / Item
      const item = processMovieOrShow($, filename, filePath, meta);
      if (item.type === 'series') {
        // Check if this is a standalone season entry like GameofThronesSeason1
        const seasonMatch = filename.match(/^(.*?)(Season\d+|S\d+)\.html$/i);
        if (seasonMatch && seasonMatch[1] && !['series02', 'wannahaveagoodtimes2'].includes(cleanId)) {
          standaloneSeasons.push({ parentPrefix: seasonMatch[1].toLowerCase(), seasonItem: item });
        }
        series.push(item);
      } else {
        movies.push(item);
      }

    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }

  // Attach DBS episodes to the parent DragonBallSuperTvSeries
  dbsEpisodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
  let dbsParent = series.find(s => s.id === 'DragonBallSuperTvSeries' || s.id?.toLowerCase() === 'dragonballsupertvseries');
  if (dbsParent) {
    dbsParent.episodes = dbsEpisodes;
    dbsParent.totalEpisodes = 131;
    dbsParent.availableEpisodesCount = dbsEpisodes.length;
    dbsParent.sagas = ["Universe Survival Saga (Episodes 101 - 131)"];
    if (!dbsParent.poster && dbsEpisodes.length > 0) {
      dbsParent.poster = 'pics/Serieses/DragonBallSuper/2.png';
    }
  } else {
    // If not scanned yet, create main series entry
    dbsParent = {
      id: 'DragonBallSuperTvSeries',
      slug: 'dragonballsupertvseries',
      type: 'series',
      category: 'International',
      score: 8.8,
      filename: 'DragonBallSuperTvSeries.html',
      title: 'Dragon Ball Super',
      metaTitle: 'Dragon Ball Super (TV Series) All Ratings,Reviews,Songs,Videos,Bookings and News',
      description: '6 months after the defeat of Majin Buu, The mighty Saiyan Son Goku continues his quest on becoming stronger.',
      plot: '6 months after the defeat of Majin Buu, The mighty Saiyan Son Goku continues his quest on becoming stronger.',
      language: 'Japanese, English',
      releaseDate: 'July 05, 2015',
      year: '2015',
      genre: 'Action, Anime, Shonen',
      duration: '20 Mins',
      director: 'Akira Toriyama',
      poster: 'pics/Serieses/DragonBallSuper/2.png',
      gallery: [{ src: 'pics/Serieses/DragonBallSuper/Dragon-Ball-Super-Movie-Reviews-and-Ratings.jpg', alt: 'Dragon Ball Super' }],
      ratings: [
        { source: 'OakShow', score: '9/10', icon: 'pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png' },
        { source: 'IMDb', score: '8.2/10', url: 'https://www.imdb.com/title/tt4644488/', icon: 'pics/RatingSiteLogos/imdb.png' },
        { source: 'TV.com', score: '8.3/10', url: 'http://www.tv.com/shows/dragon-ball-super/', icon: 'pics/RatingSiteLogos/tv.png' },
        { source: 'Common Sense Media', score: '3/5', url: 'https://www.commonsensemedia.org/tv-reviews/dragon-ball-super', icon: 'pics/RatingSiteLogos/common-sense-media.png' }
      ],
      episodes: dbsEpisodes,
      totalEpisodes: 131,
      availableEpisodesCount: dbsEpisodes.length,
      sagas: ["Universe Survival Saga (Episodes 101 - 131)"],
      cast: [
        { actor: 'Masako Nozawa / Sean Schemmel', role: 'Son Goku' },
        { actor: 'Ryo Horikawa / Christopher Sabat', role: 'Vegeta' },
        { actor: 'Ryusei Nakao / Chris Ayres', role: 'Frieza' }
      ]
    };
    series.push(dbsParent);
  }

  // Deduplicate and consolidate Series so individual season/episode child files do not pollute the main catalog
  const parentAliases = {
    'theboyss1': 'theboys',
    'theboyss2': 'theboys',
    'littlethingss1': 'littlethings',
    'littlethingss2': 'littlethings',
    'littlethingss3': 'littlethings',
    'gameofthronesseason1': 'gameofthrones',
    'gameofthronesseason2': 'gameofthrones',
    'gameofthronesseason3': 'gameofthrones',
    'gameofthronesseason4': 'gameofthrones',
    'gameofthronesseason5': 'gameofthrones',
    'gameofthronesseason6': 'gameofthrones',
    'gameofthronesseason7': 'gameofthrones',
    'gameofthronesseason8': 'gameofthrones',
    'theflashseason2': 'theflash',
    'theflashseason3': 'theflash',
    'arrowseason5': 'arrow',
    'quanticoseason1': 'quantico',
    'quanticoseason2': 'quantico',
    'raginimmss1': 'raginimmssreturns',
    'raginimmssreturns1': 'raginimmssreturns',
    'raginimmssreturns2': 'raginimmssreturns',
    'raginimmssreturnss1': 'raginimmssreturns',
    'raginimmssreturnss2': 'raginimmssreturns',
    'aashrams1': 'aashram',
    'mastrams1': 'mastram',
    'patipatniaurwohseriess1': 'patipatniaurwohseries',
    'mugilans1': 'mugilan',
    'stargirls1': 'stargirl',
    '24season2': '24'
  };

  // Filter series to only retain top-level main series
  const filteredSeries = [];
  const seenSeriesKeys = new Set();

  for (const s of series) {
    const sid = s.id.toLowerCase();
    
    // Skip if it's an episode file
    if (sid.startsWith('dbsepisode') || s.title.toLowerCase().includes('|episode')) {
      continue;
    }

    // Check if it's a child season of an existing parent
    const parentKey = parentAliases[sid];
    if (parentKey && series.some(other => other.id.toLowerCase() === parentKey)) {
      // Link into parent's seasonsData if exists
      const parentObj = series.find(other => other.id.toLowerCase() === parentKey);
      if (parentObj) {
        if (!parentObj.seasonsData) parentObj.seasonsData = [];
        parentObj.seasonsData.push({
          seasonId: s.id,
          title: s.title,
          year: s.year,
          ratings: s.ratings,
          filename: s.filename
        });
      }
      continue;
    }

    if (seenSeriesKeys.has(sid)) continue;
    seenSeriesKeys.add(sid);
    filteredSeries.push(s);
  }

  // Sort Movies and Series by Recency (year desc) then Rating Score (score desc)
  const sortFn = (a, b) => {
    const yrA = parseInt(a.year, 10) || 0;
    const yrB = parseInt(b.year, 10) || 0;
    if (yrB !== yrA) return yrB - yrA;
    return (b.score || 0) - (a.score || 0);
  };

  movies.sort(sortFn);
  filteredSeries.sort(sortFn);

  // Build Search Index
  const searchIndex = [];
  movies.forEach(m => searchIndex.push({ id: m.id, title: m.title, type: 'movie', category: m.category, genre: m.genre, language: m.language, year: m.year, poster: m.poster }));
  filteredSeries.forEach(s => searchIndex.push({ id: s.id, title: s.title, type: 'series', category: s.category, genre: s.genre, language: s.language, year: s.year, poster: s.poster, episodesCount: s.episodes?.length || 0 }));
  games.forEach(g => searchIndex.push({ id: g.moreLink ? g.moreLink.replace('.html', '') : g.title, title: g.title, type: 'game', genre: g.genre, poster: g.poster }));
  books.forEach(b => searchIndex.push({ id: b.moreLink ? b.moreLink.replace('.html', '') : b.title, title: b.title, type: 'book', genre: b.genre, author: b.author, poster: b.cover }));
  reviews.forEach(r => searchIndex.push({ id: r.link, title: r.title, type: 'review', author: r.author, rating: r.rating, poster: r.banner }));
  sports.forEach(sp => searchIndex.push({ id: sp.id, title: sp.title, type: 'sports', poster: sp.meta?.ogImage }));

  // Save extracted files
  fs.writeFileSync(path.join(DATA_DIR, 'movies.json'), JSON.stringify(movies, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'series.json'), JSON.stringify(filteredSeries, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'releases.json'), JSON.stringify(releases, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'reviews.json'), JSON.stringify(reviews, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'games.json'), JSON.stringify(games, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'books.json'), JSON.stringify(books, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'sports.json'), JSON.stringify(sports, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'news.json'), JSON.stringify(news, null, 2), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'search_index.json'), JSON.stringify(searchIndex, null, 2), 'utf8');

  console.log(`Extraction completed:`);
  console.log(`- Movies: ${movies.length}`);
  console.log(`- TV Series: ${filteredSeries.length}`);
  console.log(`- Releases Calendars: ${releases.length}`);
  console.log(`- Critic Reviews: ${reviews.length}`);
  console.log(`- Games: ${games.length}`);
  console.log(`- Books: ${books.length}`);
  console.log(`- Sports: ${sports.length}`);
  console.log(`- Search Index Items: ${searchIndex.length}`);
}

runExtraction();


