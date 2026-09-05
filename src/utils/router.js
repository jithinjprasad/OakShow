// Client-side Router for OakShow
import { useState, useEffect, useCallback } from 'react';

/**
 * Standardize and clean any raw path, hash, or URL into a pure slug
 * Handles:
 * - /DilBechara, /DilBechara.html
 * - DilBechara, DilBechara.html
 * - #/movies/DilBechara.html, #/movie/DilBechara, #/DilBechara, #/DilBechara.html
 * - /movies/DilBechara.html, /movie/DilBechara.html
 * - /series/SacredGames.html, /SacredGames.html, /SacredGames
 */
export function cleanSlugFromPath(rawSlug) {
  if (!rawSlug) return '';
  return rawSlug.trim()
    .replace(/^#\/?/, '')
    .replace(/^\/+/, '')
    .replace(/^(movies|movie|series|episode|sports|game|book|emergency|dbs|blog|news|galleries|profiles\/criticprofiles\/[^\/]+|profiles\/criticprofiles|profiles\/reports\/[^\/]+|profiles\/reports|profiles)\//i, '')
    .replace(/\.html$/i, '');
}

/**
 * Resolve any slug or filename (with or without .html, case-insensitive) to route object
 */
export function resolveSlugToRoute(rawSlug, rawPath = '') {
  if (!rawSlug) return { type: 'discover', id: null, raw: rawPath };
  
  const clean = cleanSlugFromPath(rawSlug);
  const lower = clean.toLowerCase();

  // Root or index
  if (!clean || lower === 'index' || lower === 'legacy_index' || lower === 'discover' || lower === 'home') {
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
  if (lower === 'releases' || lower === 'movies-released' || lower === 'moviesreleased') {
    return { type: 'releases', id: null, raw: rawPath };
  }
  if (lower === 'upcoming' || lower === 'upcoming-movies' || lower === 'upcomingmovies' || lower === 'upcoming2' || lower === 'upcoming3') {
    return { type: 'upcoming', id: null, raw: rawPath };
  }
  if (lower === 'series' || lower === 'series-hub' || lower === 'webseries' || lower === 'tv' || lower === 'oakshowseries' || lower === 'shows') {
    return { type: 'series-hub', id: null, raw: rawPath };
  }
  if (lower === 'indian' || lower === 'hollywood' || lower === 'international') {
    return { type: lower, id: null, raw: rawPath };
  }
  if (lower === 'ott' || lower === 'ott-movies' || lower === 'watch-online' || lower === 'streaming' || lower === 'ottmovies') {
    return { type: 'ott', id: null, raw: rawPath };
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
 * - Direct pathname URLs: /DilBechara, /DilBechara.html, /OakShowNews.html, /news
 * - Automatic redirect and clean-up of legacy Hash routes: #/movies/DilBechara.html, #/DilBechara -> /DilBechara.html
 * - Query params: ?movie=..., ?series=..., ?news=..., ?gallery=...
 */
export function parseCurrentRoute() {
  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '';
  const search = window.location.search || '';
  const searchParams = new URLSearchParams(search);

  // Check query parameter override first
  if (searchParams.get('movie')) {
    return { type: 'movie', id: searchParams.get('movie'), raw: pathname };
  }
  if (searchParams.get('series')) {
    const sId = searchParams.get('series');
    return (sId && sId !== 'true' && sId !== 'all') ? { type: 'series', id: sId, raw: pathname } : { type: 'series-hub', id: null, raw: pathname };
  }
  if (searchParams.get('game')) {
    return { type: 'game', id: searchParams.get('game'), raw: pathname };
  }
  if (searchParams.get('book')) {
    return { type: 'book', id: searchParams.get('book'), raw: pathname };
  }
  if (searchParams.get('sports')) {
    return { type: 'sports', id: searchParams.get('sports'), raw: pathname };
  }
  if (searchParams.get('news')) {
    return { type: 'news', id: searchParams.get('news'), raw: pathname };
  }
  if (searchParams.get('gallery') || searchParams.get('galleries')) {
    return { type: 'galleries', id: searchParams.get('gallery') || searchParams.get('galleries'), raw: pathname };
  }
  if (searchParams.get('review') || searchParams.get('reviews')) {
    return { type: 'reviews', id: searchParams.get('review') || searchParams.get('reviews'), raw: pathname };
  }

  // 1. Check & cleanly redirect any legacy Hash Route (e.g. '#/movies/DilBechara.html' or '#/DilBechara' or '#/news')
  if (hash.startsWith('#')) {
    const cleanFromHash = cleanSlugFromPath(hash);
    if (cleanFromHash) {
      const resolved = resolveSlugToRoute(cleanFromHash, hash);
      let cleanUrl = `/${cleanFromHash}.html`;
      const hubs = ['indian', 'hollywood', 'international', 'ott', 'series-hub', 'releases', 'upcoming', 'reviews', 'sports-hub', 'games-books', 'emergencies', 'news', 'blog', 'galleries', 'music', 'trailers', 'events', 'remarks', 'watchlist'];
      if (resolved.type === 'discover') {
        cleanUrl = '/';
      } else if (hubs.includes(cleanFromHash.toLowerCase())) {
        cleanUrl = `/${cleanFromHash}`;
      }
      
      // Update address bar seamlessly to clean HTML URL without reloading
      try {
        window.history.replaceState(null, '', cleanUrl);
      } catch (e) {
        // ignore
      }
      return resolved;
    }
  }

  // 2. Direct pathname (e.g., /DilBechara, /DilBechara.html, /OakShowNews.html, /news, /emergency/KeralaFloods.html)
  const normalizedPath = pathname.replace(/^\/+/, '').trim();
  if (normalizedPath && !normalizedPath.toLowerCase().startsWith('index')) {
    const resolved = resolveSlugToRoute(normalizedPath, pathname);
    
    // Automatically redirect indexed legacy subfolder URLs to clean canonical URLs
    const clean = cleanSlugFromPath(normalizedPath);
    const hubs = [
      'indian', 'hollywood', 'international', 'ott', 'series-hub', 'releases', 'upcoming',
      'reviews', 'sports-hub', 'games-books', 'emergencies', 'news', 
      'blog', 'galleries', 'music', 'trailers', 'events', 'remarks', 'watchlist'
    ];
    let canonicalUrl = hubs.includes(clean.toLowerCase()) ? `/${clean}` : (clean ? `/${clean}.html` : '/');
    if (pathname !== canonicalUrl && !pathname.endsWith(`/${clean}`) && !pathname.endsWith(`/${clean}.html`)) {
      try {
        window.history.replaceState(null, '', canonicalUrl);
      } catch (e) {
        // ignore
      }
    }

    return resolved;
  }

  // 3. Default fallback to discover home
  return { type: 'discover', id: null, raw: pathname };
}

/**
 * Navigate to a specific route cleanly without hash '#'
 * Formats destination as /<slug>.html or /<hub>
 */
export function navigateTo(target, replace = false) {
  if (!target || target === '/' || target === 'discover' || target === 'home') {
    if (replace) {
      window.history.replaceState(null, '', '/');
    } else {
      window.history.pushState(null, '', '/');
    }
    window.dispatchEvent(new PopStateEvent('popstate'));
    return;
  }

  const clean = cleanSlugFromPath(target);
  const lower = clean.toLowerCase();

  const hubs = [
    'indian', 'hollywood', 'international', 'ott', 'series-hub', 'releases', 'upcoming',
    'reviews', 'sports-hub', 'games-books', 'emergencies', 'news', 
    'blog', 'galleries', 'music', 'trailers', 'events', 'remarks', 'watchlist'
  ];

  let targetPath = '';
  if (hubs.includes(lower)) {
    targetPath = `/${clean}`;
  } else {
    // Everything else (movies, series, episodes, items) navigates to /<name>.html
    targetPath = `/${clean}.html`;
  }

  // Set preliminary title before pushState so GA4 history change listeners don't grab stale title
  if (clean && !hubs.includes(lower)) {
    const preliminary = clean.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ');
    document.title = `${preliminary} All Ratings, Reviews and Watch Online — OakShow`;
  }

  if (replace) {
    window.history.replaceState(null, '', targetPath);
  } else {
    window.history.pushState(null, '', targetPath);
  }

  window.dispatchEvent(new PopStateEvent('popstate'));
}

// Track last sent pageview to deduplicate React re-renders
let lastTrackedUrl = '';
let lastTrackedTitle = '';

/**
 * Update Complete Document Metadata, OpenGraph, Twitter Cards, Canonical Link & JSON-LD Structured Data
 */
export function updatePageMeta(title, description, image, canonicalUrl = null, type = 'website', schemaObj = null) {
  const defaultTitle = 'OakShow-The One Destination For Everything On Entertainment';
  const defaultDesc = 'Unified movie ratings, critic reviews, showtimes, trailers, and ticket bookings across Indian Cinema, Hollywood, and World Entertainment.';
  
  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDesc;
  document.title = finalTitle;

  // Enforce OakShow logo favicon across all pages and browsers
  const favTypes = [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=oakshow3' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png?v=oakshow3' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico?v=oakshow3' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.png?v=oakshow3' }
  ];
  favTypes.forEach(({ rel, type, href }) => {
    let link = document.querySelector(`link[rel="${rel}"][href*="favicon"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    if (type) link.setAttribute('type', type);
    link.setAttribute('href', href);
  });

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

  // Full Canonical URL (always clean without hash)
  const currentUrl = canonicalUrl || (window.location.origin + window.location.pathname);

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

  // Google Analytics & Google Tag Manager tracking (deduplicated)
  const currentPath = window.location.pathname || '/';
  if (lastTrackedUrl !== currentUrl || lastTrackedTitle !== finalTitle) {
    lastTrackedUrl = currentUrl;
    lastTrackedTitle = finalTitle;

    try {
      if (typeof window.gtag === 'function') {
        window.gtag('set', {
          page_title: finalTitle,
          page_location: currentUrl,
          page_path: currentPath
        });
        window.gtag('config', 'UA-77818206-1', {
          page_title: finalTitle,
          page_location: currentUrl,
          page_path: currentPath
        });
        window.gtag('event', 'page_view', {
          page_title: finalTitle,
          page_location: currentUrl,
          page_path: currentPath
        });
      }

      if (typeof window.ga === 'function') {
        window.ga('set', 'page', currentPath);
        window.ga('set', 'title', finalTitle);
        window.ga('set', 'location', currentUrl);
        window.ga('send', 'pageview');
      }

      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: currentPath,
          page_title: finalTitle,
          page_location: currentUrl
        });
        window.dataLayer.push({
          event: 'virtual_pageview',
          page_path: currentPath,
          page_title: finalTitle,
          page_location: currentUrl
        });
      }
    } catch (e) {}
  }
}

/**
 * Custom React Hook for Router
 */
export function useRouter() {
  const [route, setRoute] = useState(parseCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentRoute());
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
  }, []);

  return { route, navigate };
}
