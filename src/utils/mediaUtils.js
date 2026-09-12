/**
 * Media & SEO Utilities for OakShow
 * Handles profile pictures (1.jpg/1.JPG), social share images (2.jpg/2.JPG),
 * link sharing payloads, and structured metadata.
 */

/**
 * Get directory path from a poster or asset path
 */
export function getFolderFromPath(pathStr) {
  if (!pathStr || typeof pathStr !== 'string') return '';
  const clean = pathStr.replace(/^[/\\]+/, '');
  const lastSlash = Math.max(clean.lastIndexOf('/'), clean.lastIndexOf('\\'));
  if (lastSlash === -1) return '';
  return clean.substring(0, lastSlash);
}

/**
 * Derive root media folder for an item across Films, Serieses, Books, and Games
 */
export function getFolderForItem(item) {
  if (!item) return '';
  if (item.folder) return item.folder.replace(/^[/\\]+/, '').replace(/[/\\]+$/, '');
  if (item.poster) {
    const f = getFolderFromPath(item.poster);
    if (f) return f;
  }
  if (item.type === 'series' || item.episodes) {
    return `pics/Serieses/${item.slug || item.id}`;
  }
  if (item.type === 'book' || item.author) {
    const bId = (item.moreLink || item.id || '').replace(/\.html$/, '');
    return `pics/Books/${bId}`;
  }
  if (item.type === 'game') {
    const gId = (item.moreLink || item.id || '').replace(/\.html$/, '');
    return `pics/Games/${gId}`;
  }
  if (item.id) {
    return `pics/Films/${item.id}`;
  }
  return '';
}

/**
 * Get Profile Picture Dimension Image (1.jpg or 1.JPG)
 * Used as the primary portrait profile poster for every movie/show/item
 */
export function getProfileImage(item) {
  if (!item) return '/favicon.png';

  // 1. If explicit poster already specifies 1.jpg or 1.JPG
  if (item.poster && /(?:^|[/\\])1\.(?:jpg|jpeg|png)$/i.test(item.poster)) {
    return item.poster.startsWith('/') ? item.poster : `/${item.poster}`;
  }

  // 2. Check gallery for 1.jpg / 1.JPG
  if (Array.isArray(item.gallery)) {
    const found1 = item.gallery.find(g => g.src && /(?:^|[/\\])1\.(?:jpg|jpeg|png)$/i.test(g.src));
    if (found1) {
      return found1.src.startsWith('/') ? found1.src : `/${found1.src}`;
    }
  }

  // 3. Derive 1.jpg from item folder (e.g. pics/Films/DilBechara/1.jpg)
  const folder = getFolderForItem(item);
  if (folder) {
    return `/${folder}/1.jpg`;
  }

  if (item.poster) {
    return item.poster.startsWith('/') ? item.poster : `/${item.poster}`;
  }

  return '/favicon.png';
}

/**
 * Get Hero Stage Banner Image (2.jpg or 2.JPG)
 * Used for the cinematic wide hero backdrop banner
 */
export function getBannerImage(item) {
  if (!item) return '';

  // 1. If explicit banner specifies 2.jpg or 2.JPG
  if (item.banner && /(?:^|[/\\])2\.(?:jpg|jpeg|png)$/i.test(item.banner)) {
    return item.banner.startsWith('/') ? item.banner : `/${item.banner}`;
  }

  // 2. Check gallery for 2.jpg / 2.JPG
  if (Array.isArray(item.gallery)) {
    const found2 = item.gallery.find(g => g.src && /(?:^|[/\\])2\.(?:jpg|jpeg|png)$/i.test(g.src));
    if (found2) {
      return found2.src.startsWith('/') ? found2.src : `/${found2.src}`;
    }
  }

  // 3. Derive 2.jpg from item folder (e.g. pics/Films/DilBechara/2.jpg)
  const folder = getFolderForItem(item);
  if (folder) {
    return `/${folder}/2.jpg`;
  }

  if (item.banner) {
    return item.banner.startsWith('/') ? item.banner : `/${item.banner}`;
  }

  if (item.poster) {
    return item.poster.startsWith('/') ? item.poster : `/${item.poster}`;
  }

  return '';
}

/**
 * Get Social Media Share Image (2.jpg or 2.JPG)
 * Used for Open Graph (og:image), Twitter Card (twitter:image), and Social Sharing previews
 */
export function getShareImage(item) {
  if (!item) return `${window.location.origin}/favicon.png`;

  let relativePath = '';

  // 1. If explicit poster already specifies 2.jpg or 2.JPG
  if (item.poster && /(?:^|[/\\])2\.(?:jpg|jpeg|png)$/i.test(item.poster)) {
    relativePath = item.poster;
  }
  // 2. Check gallery for 2.jpg / 2.JPG
  else if (Array.isArray(item.gallery)) {
    const found2 = item.gallery.find(g => g.src && /(?:^|[/\\])2\.(?:jpg|jpeg|png)$/i.test(g.src));
    if (found2) {
      relativePath = found2.src;
    }
  }

  // 3. Derive 2.jpg from item folder
  if (!relativePath) {
    const folder = getFolderForItem(item);
    if (folder) {
      relativePath = `${folder}/2.jpg`;
    } else if (item.poster) {
      relativePath = item.poster;
    }
  }

  if (!relativePath) {
    return `${window.location.origin}/favicon.png`;
  }

  const clean = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${window.location.origin}${clean}`;
}

/**
 * Get Canonical Full URL for an Item or Route
 */
export function getItemCanonicalUrl(item, rawPath = '') {
  const origin = window.location.origin;
  if (!item) {
    return rawPath ? `${origin}/${rawPath.replace(/^\/+/, '')}` : origin;
  }

  if (item.filename) {
    return `${origin}/${item.filename.replace(/^\/+/, '')}`;
  }
  if (item.slug) {
    return `${origin}/${item.slug.replace(/^\/+/, '')}.html`;
  }
  if (item.id) {
    return `${origin}/${item.id.replace(/^\/+/, '')}.html`;
  }
  return origin;
}

/**
 * Get rich share text and payload for social sharing (WhatsApp, X, LinkedIn, Facebook, Telegram)
 */
export function getSharePayload(item, customUrl = null) {
  const title = item?.title || 'OakShow Entertainment';
  const year = item?.year ? ` (${item.year})` : '';
  const type = item?.type === 'series' ? 'TV Series' : 'Movie';
  const url = customUrl || getItemCanonicalUrl(item);
  const shareImage = getShareImage(item);

  // Description / plot
  const desc = item?.description || item?.plot || item?.summary || 'Check out verified ratings, reviews, streaming providers and showtimes on OakShow.';
  
  // Rating snippet
  const ratingScore = item?.ratings && item.ratings.length > 0 ? item.ratings[0].score : (item?.rating || null);
  const ratingText = ratingScore ? `⭐ Rating: ${ratingScore}` : '';

  const shareHeadline = `${title}${year} — ${type} on OakShow`;
  const shareBody = `${shareHeadline}\n${desc}\n${ratingText ? `${ratingText}\n` : ''}Explore ratings, critic reviews, trailers & bookings:\n${url}`;

  return {
    title: shareHeadline,
    description: desc,
    text: shareBody,
    url,
    image: shareImage,
    rating: ratingScore
  };
}

/**
 * Handle image load error with multi-stage fallback:
 * 1.jpg -> 1.JPG -> item.poster -> /favicon.png
 */
export function handlePosterError(e, fallbackPoster = null) {
  const currentSrc = e.target.src || '';
  
  // 1. If failed on /1.jpg, try /1.JPG
  if (currentSrc.endsWith('/1.jpg')) {
    e.target.src = currentSrc.replace('/1.jpg', '/1.JPG');
    return;
  }

  // 2. If failed on /1.JPG, try /2.jpg (banner image as poster fallback)
  if (currentSrc.endsWith('/1.JPG')) {
    e.target.src = currentSrc.replace('/1.JPG', '/2.jpg');
    return;
  }

  // 3. If failed on /2.jpg, try /2.JPG
  if (currentSrc.endsWith('/2.jpg')) {
    e.target.src = currentSrc.replace('/2.jpg', '/2.JPG');
    return;
  }

  // 4. If failed on /2.JPG and fallbackPoster provided, try fallback
  if (currentSrc.endsWith('/2.JPG') && fallbackPoster) {
    const cleanFallback = fallbackPoster.startsWith('/') ? fallbackPoster : `/${fallbackPoster}`;
    if (!currentSrc.endsWith(cleanFallback)) {
      e.target.src = cleanFallback;
      return;
    }
  }

  // 5. Ultimate fallback
  if (!currentSrc.endsWith('/favicon.png')) {
    e.target.src = '/favicon.png';
  }
}

/**
 * Known booking partner logos map
 */
const BOOKING_LOGOS = {
  'bookmyshow': '/pics/BookngWebSiteLogos/book-my-show.png',
  'book my show': '/pics/BookngWebSiteLogos/book-my-show.png',
  'district': '/pics/BookngWebSiteLogos/district.png',
  'district app': '/pics/BookngWebSiteLogos/district.png',
  'paytm': '/pics/BookngWebSiteLogos/paytm.png',
  'paytm insider': '/pics/BookngWebSiteLogos/district.png',
  'insider': '/pics/BookngWebSiteLogos/district.png',
  'pvr': '/pics/BookngWebSiteLogos/pvr.png',
  'pvr cinemas': '/pics/BookngWebSiteLogos/pvr.png',
  'cinepolis': '/pics/BookngWebSiteLogos/cinepolisindia.png',
  'cinepolisindia': '/pics/BookngWebSiteLogos/cinepolisindia.png',
  'fandango': '/pics/BookngWebSiteLogos/fandango.png',
  'ticketnew': '/pics/BookngWebSiteLogos/ticket-new.png',
  'ticket new': '/pics/BookngWebSiteLogos/ticket-new.png',
  'cineworld': '/pics/BookngWebSiteLogos/cineworld.png',
  'odeon': '/pics/BookngWebSiteLogos/odeon.png',
  'eventbrite': '/pics/BookngWebSiteLogos/eventbrite.png',
  'movietickets': '/pics/BookngWebSiteLogos/movie-tickets.png'
};

/**
 * Known watch online / OTT streaming logos map
 */
const WATCH_ONLINE_LOGOS = {
  'netflix': '/pics/WatchOnline/netflix.png',
  'amazon prime': '/pics/WatchOnline/amazon-prime.png',
  'prime video': '/pics/WatchOnline/amazon-prime.png',
  'amazon': '/pics/WatchOnline/amazon-prime.png',
  'hotstar': '/pics/WatchOnline/hotstar.png',
  'disney': '/pics/WatchOnline/hotstar.png',
  'disney+ hotstar': '/pics/WatchOnline/hotstar.png',
  'apple': '/pics/WatchOnline/apple.png',
  'apple tv': '/pics/WatchOnline/apple.png',
  'itunes': '/pics/WatchOnline/apple.png',
  'hbo max': '/pics/WatchOnline/hbo-max.png',
  'hbo': '/pics/WatchOnline/hbo-max.png',
  'max': '/pics/WatchOnline/hbo-max.png',
  'hulu': '/pics/WatchOnline/hulu.png',
  'youtube': '/pics/WatchOnline/youtube.png',
  'youtube movies': '/pics/WatchOnline/youtube.png',
  'zee5': '/pics/WatchOnline/zee5.png',
  'sonyliv': '/pics/WatchOnline/sony-liv.png',
  'sony liv': '/pics/WatchOnline/sony-liv.png',
  'aha': '/pics/WatchOnline/aha.png',
  'sun nxt': '/pics/WatchOnline/sun-nxt.png',
  'sunnxt': '/pics/WatchOnline/sun-nxt.png',
  'voot': '/pics/WatchOnline/voot.png',
  'jiocinema': '/pics/WatchOnline/voot.png',
  'jio cinema': '/pics/WatchOnline/voot.png',
  'jiosaavn': '/pics/WatchOnline/hotstar.png',
  'jio saavn': '/pics/WatchOnline/hotstar.png',
  'saavn': '/pics/WatchOnline/hotstar.png',
  'mx player': '/pics/WatchOnline/mx-player.png',
  'mxplayer': '/pics/WatchOnline/mx-player.png',
  'airtel xstream': '/pics/WatchOnline/airtel-xstream.png',
  'airtel': '/pics/WatchOnline/airtel-xstream.png',
  'altbalaji': '/pics/WatchOnline/alt-balaji.png',
  'alt balaji': '/pics/WatchOnline/alt-balaji.png',
  'eros now': '/pics/WatchOnline/eros-now.png',
  'erosnow': '/pics/WatchOnline/eros-now.png',
  'google play': '/pics/WatchOnline/google-play.png',
  'adult swim': '/pics/WatchOnline/adult-swim.png',
  'cw tv': '/pics/WatchOnline/cw-tv.png',
  'the cw': '/pics/WatchOnline/cw-tv.png',
  'ullu': '/pics/WatchOnline/ullu.png',
  'kooku': '/pics/WatchOnline/kooku.png',
  'reddit': '/pics/WatchOnline/reddit.png'
};

/**
 * Normalizes and resolves booking partner provider name and logo icon
 */
export function getBookingProviderInfo(booking) {
  if (!booking) return { provider: 'Ticketing Partner', icon: null, themeClass: 'bp-theme-emerald' };
  const rawProvider = (booking.provider || '').trim();
  const lower = rawProvider.toLowerCase();
  
  let cleanProvider = rawProvider;
  let themeClass = 'bp-theme-emerald';

  if (/district\s*app|district/i.test(rawProvider)) {
    cleanProvider = 'District App';
    themeClass = 'bp-theme-cyan';
  } else if (/paytm\s*insider/i.test(rawProvider)) {
    cleanProvider = 'District (Paytm Insider)';
    themeClass = 'bp-theme-cyan';
  } else if (/book\s*my\s*show/i.test(rawProvider)) {
    cleanProvider = 'BookMyShow';
    themeClass = 'bp-theme-red';
  } else if (/pvr/i.test(rawProvider)) {
    cleanProvider = 'PVR Cinemas';
    themeClass = 'bp-theme-gold';
  } else if (/cinepolis/i.test(rawProvider)) {
    cleanProvider = 'Cinepolis';
    themeClass = 'bp-theme-blue';
  } else if (/paytm/i.test(rawProvider)) {
    cleanProvider = 'Paytm';
    themeClass = 'bp-theme-cyan';
  } else if (/fandango/i.test(rawProvider)) {
    cleanProvider = 'Fandango';
    themeClass = 'bp-theme-orange';
  } else if (/ticket\s*new/i.test(rawProvider)) {
    cleanProvider = 'TicketNew';
    themeClass = 'bp-theme-purple';
  } else if (/cineworld/i.test(rawProvider)) {
    cleanProvider = 'Cineworld';
    themeClass = 'bp-theme-orange';
  } else if (/odeon/i.test(rawProvider)) {
    cleanProvider = 'ODEON';
    themeClass = 'bp-theme-cyan';
  } else if (/eventbrite/i.test(rawProvider)) {
    cleanProvider = 'Eventbrite';
    themeClass = 'bp-theme-orange';
  }

  let icon = null;
  const key = Object.keys(BOOKING_LOGOS).find(k => lower.includes(k));
  if (key) {
    icon = BOOKING_LOGOS[key];
  } else if (booking.icon && booking.icon.trim() && !booking.icon.includes('hbo-max') && !booking.icon.includes('firstpost')) {
    icon = booking.icon.startsWith('/') ? booking.icon : `/${booking.icon}`;
  }

  return { provider: cleanProvider, icon, themeClass };
}

/**
 * Normalizes and resolves watch online / OTT streaming provider name and logo icon
 */
export function getWatchOnlineProviderInfo(item) {
  if (!item) return { provider: 'OTT Streaming', icon: null };
  const rawProvider = (item.provider || '').trim();
  const lower = rawProvider.toLowerCase();

  let cleanProvider = rawProvider;
  if (/netflix/i.test(rawProvider)) cleanProvider = 'Netflix';
  else if (/amazon|prime\s*video/i.test(rawProvider)) cleanProvider = 'Amazon Prime Video';
  else if (/disney|hotstar/i.test(rawProvider)) cleanProvider = 'Disney+ Hotstar';
  else if (/apple\s*tv|itunes/i.test(rawProvider)) cleanProvider = 'Apple TV';
  else if (/hbo|max/i.test(rawProvider)) cleanProvider = 'HBO Max';
  else if (/hulu/i.test(rawProvider)) cleanProvider = 'Hulu';
  else if (/youtube/i.test(rawProvider)) cleanProvider = 'YouTube Movies';
  else if (/zee5/i.test(rawProvider)) cleanProvider = 'ZEE5';
  else if (/sony\s*liv|sonyliv/i.test(rawProvider)) cleanProvider = 'SonyLIV';
  else if (/aha/i.test(rawProvider)) cleanProvider = 'Aha';
  else if (/sun\s*nxt|sunnxt/i.test(rawProvider)) cleanProvider = 'Sun NXT';
  else if (/voot/i.test(rawProvider)) cleanProvider = 'Voot';
  else if (/jiocinema|jio\s*cinema/i.test(rawProvider)) cleanProvider = 'JioCinema';
  else if (/jio\s*saavn|saavn/i.test(rawProvider)) cleanProvider = 'JioSaavn';
  else if (/spotify/i.test(rawProvider)) cleanProvider = 'Spotify';
  else if (/gaana/i.test(rawProvider)) cleanProvider = 'Gaana';
  else if (/wynk/i.test(rawProvider)) cleanProvider = 'Wynk Music';
  else if (/mx\s*player|mxplayer/i.test(rawProvider)) cleanProvider = 'MX Player';
  else if (/airtel/i.test(rawProvider)) cleanProvider = 'Airtel Xstream';
  else if (/alt\s*balaji|altbalaji/i.test(rawProvider)) cleanProvider = 'ALTBalaji';
  else if (/eros\s*now|erosnow/i.test(rawProvider)) cleanProvider = 'Eros Now';
  else if (/google\s*play/i.test(rawProvider)) cleanProvider = 'Google Play Movies';
  else if (/adult\s*swim/i.test(rawProvider)) cleanProvider = 'Adult Swim';
  else if (/cw\s*tv|the\s*cw/i.test(rawProvider)) cleanProvider = 'The CW';
  else if (/ullu/i.test(rawProvider)) cleanProvider = 'ULLU Originals';
  else if (/kooku/i.test(rawProvider)) cleanProvider = 'Kooku';
  else if (/book\s*my\s*show|bms/i.test(rawProvider)) cleanProvider = 'BookMyShow Stream';
  else if (/crunchyroll/i.test(rawProvider)) cleanProvider = 'Crunchyroll';
  else if (/reddit/i.test(rawProvider)) cleanProvider = 'Reddit';

  let icon = null;
  const key = Object.keys(WATCH_ONLINE_LOGOS).find(k => lower.includes(k));
  if (key) {
    icon = WATCH_ONLINE_LOGOS[key];
  } else if (item.icon && item.icon.trim()) {
    let fixedIcon = item.icon.replace('hot-star.png', 'hotstar.png').replace('you-tube.png', 'youtube.png');
    icon = fixedIcon.startsWith('/') ? fixedIcon : `/${fixedIcon}`;
  }

  return { provider: cleanProvider, icon };
}

/**
 * Robustly extract YouTube Video ID from any YouTube URL, embed URL, or video object
 */
export function getYoutubeId(videoOrUrl) {
  if (!videoOrUrl) return '';
  if (typeof videoOrUrl === 'string') {
    const m = videoOrUrl.match(/(?:embed\/|v=|youtu\.be\/|\/v\/|\/e\/|watch\?v=|\?v=)([a-zA-Z0-9_-]{11})/i);
    return m ? m[1] : '';
  }
  if (videoOrUrl.youtubeId) return videoOrUrl.youtubeId;
  const src = videoOrUrl.embedUrl || videoOrUrl.url || '';
  const m = src.match(/(?:embed\/|v=|youtu\.be\/|\/v\/|\/e\/|watch\?v=|\?v=)([a-zA-Z0-9_-]{11})/i);
  return m ? m[1] : '';
}
