// Client-side Router for OakShow
import { useState, useEffect, useCallback } from 'react';

/**
 * Resolve any slug or filename (with or without .html, case-insensitive) to route object
 */
export function resolveSlugToRoute(rawSlug, rawPath = '') {
  if (!rawSlug) return { type: 'discover', id: null, raw: rawPath };
  
  const clean = rawSlug.trim().replace(/^\/+/, '').replace(/\.html$/i, '');
  const lower = clean.toLowerCase();

  // Root or index
  if (!clean || lower === 'index' || lower === 'legacy_index' || lower === 'discover') {
    return { type: 'discover', id: null, raw: rawPath };
  }

  // Core Sections & Hubs
  if (lower === 'oakshownews' || lower === 'news' || lower === 'newsroom') {
    return { type: 'news', id: null, raw: rawPath };
  }
  if (lower === 'oakshowgalleries' || lower === 'galleries' || lower === 'gallery') {
    return { type: 'galleries', id: null, raw: rawPath };
  }
  if (lower === 'oakshowreviews' || lower === 'oakshowreviews2018' || lower === 'oakshowreviews2019' || lower === 'oakshowreviews2020' || lower === 'reviews') {
    return { type: 'reviews', id: null, raw: rawPath };
  }
  if (lower === 'critics' || lower === 'criticprofiles') {
    return { type: 'reviews', tab: 'critics', id: null, raw: rawPath };
  }
  if (lower === 'oakshowblog' || lower === 'blog' || lower === 'blogs') {
    return { type: 'blog', id: null, raw: rawPath };
  }
  if (lower === 'oakshowemergency' || lower === 'emergencies' || lower === 'emergency') {
    return { type: 'emergencies', id: null, raw: rawPath };
  }
  if (lower === 'music') {
    return { type: 'music', id: null, raw: rawPath };
  }
  if (lower === 'trailers' || lower === 'videos') {
    return { type: 'trailers', id: null, raw: rawPath };
  }
  if (lower === 'events') {
    return { type: 'events', id: null, raw: rawPath };
  }
  if (lower === 'games') {
    return { type: 'games-books', subTab: 'games', id: null, raw: rawPath };
  }
  if (lower === 'books') {
    return { type: 'games-books', subTab: 'books', id: null, raw: rawPath };
  }
  if (lower === 'games-books') {
    return { type: 'games-books', id: null, raw: rawPath };
  }
  if (lower === 'sports' || lower === 'sports-hub') {
    return { type: 'sports-hub', id: null, raw: rawPath };
  }
  if (lower === 'remarks' || lower === 'remarksatoakshow') {
    return { type: 'remarks', id: null, raw: rawPath };
  }
  if (lower === 'releases') {
    return { type: 'releases', id: null, raw: rawPath };
  }
  if (lower === 'series' || lower === 'series-hub' || lower === 'webseries' || lower === 'tv' || lower === 'oakshowseries' || lower === 'shows') {
    return { type: 'series-hub', id: null, raw: rawPath };
  }
  if (lower === 'indian' || lower === 'hollywood' || lower === 'international') {
    return { type: lower, id: null, raw: rawPath };
  }
  if (lower === 'watchlist' || lower === 'bookmarks') {
    return { type: 'watchlist', id: null, raw: rawPath };
  }
  if (lower === 'copyrightpolicy' || lower === 'copyright-policy' || lower === 'privacypolicy' || lower === 'policy') {
    return { type: 'copyright-policy', id: null, raw: rawPath };
  }

  // Specific Known Emergency Slugs
  if (['keralafloods', 'keralafloods2019', 'coronavirusoutbreak'].includes(lower)) {
    return { type: 'emergency-detail', id: clean, raw: rawPath };
  }

  // Specific Gallery Slugs (e.g. JusticeLeaguePosters, KhaidiNo.150KajalStills, Galleries/...)
  if (lower.startsWith('galleries-') || lower.startsWith('galleries/') || lower.includes('posters') || lower.includes('stills') || lower.includes('wallpapers')) {
    return { type: 'gallery', id: clean, filename: `${clean}.html`, raw: rawPath };
  }

  // DBS Episodes
  if (lower.startsWith('dbsepisode')) {
    return { type: 'episode', id: clean, raw: rawPath };
  }

  // Critic Review Pages (e.g., unpregnant-review-by-jithin-j-prasad)
  if (lower.includes('-review-by-')) {
    return { type: 'reviews', id: clean, raw: rawPath };
  }

  // Release Monthly Calendars (e.g., IndianReleases2018August, HollywoodReleases2017April, Releases2016May)
  if (lower.startsWith('indianreleases') || lower.startsWith('hollywoodreleases') || lower.startsWith('releases20')) {
    return { type: 'releases', id: clean, raw: rawPath };
  }

  // Sports Tournaments (e.g., 2018FIFAWorldCup, 2018FIFAWorldCupFinal, ISL2018)
  if (lower.includes('fifaworldcup') || lower.includes('womenshockey') || lower === 'isl2018') {
    return { type: 'sports', id: clean, raw: rawPath };
  }

  // Fallback to legacy/movie lookup
  return { type: 'legacy', id: clean, filename: `${clean}.html`, raw: rawPath };
}

/**
 * Parse current URL location into route object
 * Supports:
 * - Hash routes: #/movie/:id, #/series/:id, #/news, #/galleries, #/reviews, #/102NotOut, #/102NotOut.html
 * - Direct pathname URLs: /102NotOut, /102NotOut.html, /OakShowNews.html, /OakShowGalleries.html, /news
 * - Query params: ?movie=2point0, ?series=GameofThrones, ?news=..., ?gallery=...
 */
export function parseCurrentRoute() {
  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '';
  const search = window.location.search || '';
  const searchParams = new URLSearchParams(search);

  // Check query parameter override first
  if (searchParams.get('movie')) {
    return { type: 'movie', id: searchParams.get('movie'), raw: hash || pathname };
  }
  if (searchParams.get('series')) {
    const sId = searchParams.get('series');
    return (sId && sId !== 'true' && sId !== 'all') ? { type: 'series', id: sId, raw: hash || pathname } : { type: 'series-hub', id: null, raw: hash || pathname };
  }
  if (searchParams.get('game')) {
    return { type: 'game', id: searchParams.get('game'), raw: hash || pathname };
  }
  if (searchParams.get('book')) {
    return { type: 'book', id: searchParams.get('book'), raw: hash || pathname };
  }
  if (searchParams.get('sports')) {
    return { type: 'sports', id: searchParams.get('sports'), raw: hash || pathname };
  }
  if (searchParams.get('news')) {
    return { type: 'news', id: searchParams.get('news'), raw: hash || pathname };
  }
  if (searchParams.get('gallery') || searchParams.get('galleries')) {
    return { type: 'galleries', id: searchParams.get('gallery') || searchParams.get('galleries'), raw: hash || pathname };
  }
  if (searchParams.get('review') || searchParams.get('reviews')) {
    return { type: 'reviews', id: searchParams.get('review') || searchParams.get('reviews'), raw: hash || pathname };
  }

  // Check Hash Route (e.g. '#/movie/2point0' or '#/news' or '#/102NotOut.html' or '#/102NotOut')
  if (hash.startsWith('#/')) {
    const cleanHash = hash.slice(2); // remove '#/'
    const parts = cleanHash.split('/').filter(Boolean);
    const primary = parts[0] || 'discover';
    const param = parts.slice(1).join('/');

    if (primary === 'movie' && param) {
      return { type: 'movie', id: param.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary === 'episode' && param) {
      return { type: 'episode', id: param.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary.toLowerCase().startsWith('dbsepisode')) {
      return { type: 'episode', id: primary.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary === 'series') {
      return param ? { type: 'series', id: param.replace(/\.html$/i, ''), raw: hash } : { type: 'series-hub', id: null, raw: hash };
    }
    if (primary === 'series-hub' || primary === 'tv') {
      return { type: 'series-hub', id: null, raw: hash };
    }
    if (primary === 'game' && param) {
      return { type: 'game', id: param.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary === 'book' && param) {
      return { type: 'book', id: param.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary === 'sports' && param) {
      return { type: 'sports', id: param.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary === 'critic' && param) {
      return { type: 'critic', id: param.replace(/\.html$/i, ''), raw: hash };
    }
    if (primary === 'critics') {
      return param ? { type: 'critic', id: param.replace(/\.html$/i, ''), raw: hash } : { type: 'reviews', tab: 'critics', id: null, raw: hash };
    }
    if (primary === 'releases') {
      return { type: 'releases', id: param ? param.replace(/\.html$/i, '') : null, raw: hash };
    }
    if (primary === 'reviews') {
      return { type: 'reviews', id: param ? param.replace(/\.html$/i, '') : null, raw: hash };
    }
    if (primary === 'news') {
      return { type: 'news', id: param ? param.replace(/\.html$/i, '') : null, raw: hash };
    }
    if (primary === 'blog' || primary === 'blogs') {
      return { type: 'blog', id: param ? param.replace(/\.html$/i, '') : null, raw: hash };
    }
    if (primary === 'gallery' || primary === 'galleries') {
      return param ? { type: 'gallery', id: param.replace(/\.html$/i, ''), raw: hash } : { type: 'galleries', id: null, raw: hash };
    }
    if (primary === 'emergency' || primary === 'emergencies') {
      return param ? { type: 'emergency-detail', id: param.replace(/\.html$/i, ''), raw: hash } : { type: 'emergencies', id: null, raw: hash };
    }

    return resolveSlugToRoute(cleanHash, hash);
  }

  // Check direct pathname (e.g., /102NotOut.html, /102NotOut, /OakShowNews.html, /Galleries/...)
  const normalizedPath = pathname.replace(/^\/+/, '').trim();
  if (normalizedPath && !normalizedPath.toLowerCase().startsWith('index')) {
    return resolveSlugToRoute(normalizedPath, pathname);
  }

  // Default fallback to discover home
  return { type: 'discover', id: null, raw: hash || pathname };
}

/**
 * Navigate to a specific route
 */
export function navigateTo(target, replace = false) {
  let targetHash = target;
  if (!target.startsWith('#/')) {
    targetHash = target.startsWith('/') ? `#${target}` : `#/${target}`;
  }

  if (replace) {
    window.location.replace(targetHash);
  } else {
    window.location.hash = targetHash;
  }
}

/**
 * Update Complete Document Metadata, OpenGraph, Twitter Cards, Canonical Link & JSON-LD Structured Data
 */
export function updatePageMeta(title, description, image, canonicalUrl = null, type = 'website', schemaObj = null) {
  const defaultTitle = 'OakShow-The One Destination For Everything On Entertainment';
  const defaultDesc = 'Unified movie ratings, critic reviews, showtimes, trailers, and ticket bookings across Indian Cinema, Hollywood, and World Entertainment.';
  
  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDesc;
  document.title = finalTitle;

  // Helper to ensure meta tag exists and set attribute
  const setMeta = (attrName, attrValue, content) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content || '');
  };

  // Standard Meta Description
  setMeta('name', 'description', finalDesc);
  setMeta('name', 'robots', 'index, follow');

  // Full Image URL for Social Sharing
  const fullImage = image 
    ? (image.startsWith('http') ? image : `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`)
    : `${window.location.origin}/favicon.png`;

  // Full Canonical URL
  const currentUrl = canonicalUrl || (window.location.href.split('#')[0] + (window.location.hash || ''));

  // Open Graph Tags
  setMeta('property', 'og:title', finalTitle);
  setMeta('property', 'og:description', finalDesc);
  setMeta('property', 'og:image', fullImage);
  setMeta('property', 'og:url', currentUrl);
  setMeta('property', 'og:type', type || 'website');
  setMeta('property', 'og:site_name', 'OakShow');

  // Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', finalTitle);
  setMeta('name', 'twitter:description', finalDesc);
  setMeta('name', 'twitter:image', fullImage);
  setMeta('name', 'twitter:site', '@OakShow');

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', currentUrl);

  // Schema.org JSON-LD Structured Data
  let jsonLdScript = document.getElementById('oakshow-jsonld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'oakshow-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const structuredData = schemaObj || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': finalTitle,
    'description': finalDesc,
    'url': currentUrl,
    'image': fullImage,
    'publisher': {
      '@type': 'Organization',
      'name': 'OakShow',
      'logo': {
        '@type': 'ImageObject',
        'url': `${window.location.origin}/favicon.png`
      },
      'sameAs': [
        'https://www.youtube.com/@OakShow',
        'https://www.linkedin.com/company/oakshow'
      ]
    }
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}

/**
 * Custom React Hook for Router
 */
export function useRouter() {
  const [route, setRoute] = useState(parseCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentRoute());
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handlePopState);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((target, replace = false) => {
    navigateTo(target, replace);
    setRoute(parseCurrentRoute());
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return { route, navigate };
}
