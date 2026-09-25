import React, { useState, useMemo, useRef } from 'react';
import { Film, Tv, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Calendar, Star, Ticket, MonitorPlay } from 'lucide-react';
import { getProfileImage, handlePosterError } from '../utils/mediaUtils';
import { getOakShowRemark } from '../utils/remarks';
import rawMoviesData from '../../data/movies.json';
import rawSeriesData from '../../data/series.json';

// Helper to parse dates reliably from various release date formats
function parseItemReleaseDate(item) {
  if (!item) return 0;
  if (item.releaseDate) {
    const clean = item.releaseDate.replace(/\(.*?\)/g, '').replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
    const t = Date.parse(clean);
    if (!isNaN(t) && t > 0) return t;
    const m = clean.match(/(\d{4})/);
    if (m) return new Date(parseInt(m[1], 10), 0, 1).getTime();
  }
  if (item.year) {
    const y = parseInt(item.year, 10);
    if (!isNaN(y) && y > 0) return new Date(y, 0, 1).getTime();
  }
  return 0;
}

// Format date into clean, human-readable display string
function formatDisplayDate(item) {
  if (item.releaseDate && item.releaseDate.trim()) {
    const cleaned = item.releaseDate.replace(/\s+\d{1,2}:\d{2}\s*(am|pm)?/i, '').replace(/\(.*?\)/g, '').trim();
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return cleaned;
  }
  if (item.year && item.year.trim()) return `Year ${item.year}`;
  if (item.id === 'Supergirl') return '2015 – 2021';
  if (item.id === 'TheFlash') return '2014 – 2023';
  if (item.id === 'HarleyandtheDavidsons') return '2016 Miniseries';
  return 'Released';
}

export default function RecentReleasesSection({
  currentId = '',
  currentType = 'movie',
  allMovies = [],
  allSeries = [],
  onNavigate
}) {
  // Default to 'theatres' on movies, 'tv' on series
  const [activeFilter, setActiveFilter] = useState(currentType === 'series' ? 'tv' : 'theatres'); // 'theatres', 'ott', 'tv', 'all'
  const scrollRef = useRef(null);

  // Pool of movies and series (fall back to imported JSON data if props are empty)
  const moviesPool = allMovies && allMovies.length > 0 ? allMovies : rawMoviesData;
  const seriesPool = allSeries && allSeries.length > 0 ? allSeries : rawSeriesData;

  const currentNormalized = (currentId || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Last 10 released in theatres
  const theatrical10 = useMemo(() => {
    const now = Date.now();
    const seen = new Set();
    const list = [];

    for (const m of moviesPool) {
      if (!m || !m.title) continue;
      const status = (m.status || '').toLowerCase().trim();
      if (status === 'upcoming' || status.includes('postponed')) continue;

      const normKey = (m.id || m.slug || m.title).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (currentNormalized && (normKey === currentNormalized || currentNormalized.includes(normKey))) continue;
      if (seen.has(normKey)) continue;

      const timestamp = parseItemReleaseDate(m);
      if (timestamp <= 0 || timestamp > now) continue;

      const hasOtt = m.watchOnline && Array.isArray(m.watchOnline) && m.watchOnline.some(w => w.url && w.url.trim() && w.url !== '#');
      // Theatrical releases (no direct OTT streaming link)
      if (hasOtt) continue;

      seen.add(normKey);
      list.push({
        ...m,
        mediaType: 'movie',
        categoryTag: 'theatrical',
        releaseTimestamp: timestamp
      });
    }

    return list.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp).slice(0, 10);
  }, [moviesPool, currentNormalized]);

  // 2. Last 10 released on OTT
  const ott10 = useMemo(() => {
    const now = Date.now();
    const seen = new Set();
    const list = [];

    for (const m of moviesPool) {
      if (!m || !m.title) continue;
      const status = (m.status || '').toLowerCase().trim();
      if (status === 'upcoming' || status.includes('postponed')) continue;

      const normKey = (m.id || m.slug || m.title).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (currentNormalized && (normKey === currentNormalized || currentNormalized.includes(normKey))) continue;
      if (seen.has(normKey)) continue;

      const timestamp = parseItemReleaseDate(m);
      if (timestamp <= 0 || timestamp > now) continue;

      const hasOtt = m.watchOnline && Array.isArray(m.watchOnline) && m.watchOnline.some(w => w.url && w.url.trim() && w.url !== '#');
      const isOttCat = (m.category || '').toLowerCase() === 'ott';
      if (!hasOtt && !isOttCat) continue;

      // Extract primary streaming platform name if available
      const primaryProvider = m.watchOnline?.find(w => w.platform && w.platform.trim())?.platform || 'OTT';

      seen.add(normKey);
      list.push({
        ...m,
        mediaType: 'movie',
        categoryTag: 'ott',
        ottPlatform: primaryProvider,
        releaseTimestamp: timestamp
      });
    }

    return list.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp).slice(0, 10);
  }, [moviesPool, currentNormalized]);

  // 3. User's exact selection for TV shows: Last 5 released series + Supergirl, Flash, Harley and the Davidsons only
  const tvSeriesList = useMemo(() => {
    const now = Date.now();
    const specificNormKeys = ['supergirl', 'theflash', 'harleyandthedavidsons'];

    // 1) Find the 3 requested flagship series
    const requestedItems = [];
    const findItem = (idKey) => {
      let found = seriesPool.find(s => s?.id?.toLowerCase() === idKey || s?.slug?.toLowerCase() === idKey);
      if (!found) {
        found = moviesPool.find(m => m?.id?.toLowerCase() === idKey || m?.slug?.toLowerCase() === idKey);
      }
      return found;
    };

    const sSupergirl = findItem('supergirl');
    if (sSupergirl) {
      const norm = (sSupergirl.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!currentNormalized || (norm !== currentNormalized && !currentNormalized.includes(norm))) {
        requestedItems.push({
          ...sSupergirl,
          mediaType: 'series',
          categoryTag: 'tv',
          releaseTimestamp: parseItemReleaseDate(sSupergirl) || 1
        });
      }
    }

    const sFlash = findItem('theflash');
    if (sFlash) {
      const norm = (sFlash.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!currentNormalized || (norm !== currentNormalized && !currentNormalized.includes(norm))) {
        requestedItems.push({
          ...sFlash,
          mediaType: 'series',
          categoryTag: 'tv',
          releaseTimestamp: parseItemReleaseDate(sFlash) || 1
        });
      }
    }

    const sHarley = findItem('harleyandthedavidsons');
    if (sHarley) {
      const norm = (sHarley.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!currentNormalized || (norm !== currentNormalized && !currentNormalized.includes(norm))) {
        requestedItems.push({
          ...sHarley,
          mediaType: 'series',
          categoryTag: 'tv',
          releaseTimestamp: parseItemReleaseDate(sHarley) || 1
        });
      }
    }

    // 2) Get the last 5 released series (excluding current item and the 3 specific ones)
    const otherSeries = [];
    const seen = new Set([...specificNormKeys]);
    if (currentNormalized) seen.add(currentNormalized);

    for (const s of seriesPool) {
      if (!s || !s.title) continue;
      const status = (s.status || '').toLowerCase().trim();
      if (status === 'upcoming' || status.includes('postponed')) continue;

      const normKey = (s.id || s.slug || s.title).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(normKey)) continue;

      const timestamp = parseItemReleaseDate(s);
      if (timestamp <= 0 || timestamp > now) continue;

      seen.add(normKey);
      otherSeries.push({
        ...s,
        mediaType: 'series',
        categoryTag: 'tv',
        releaseTimestamp: timestamp
      });
    }

    otherSeries.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
    const top5Other = otherSeries.slice(0, 5);

    // List: top 5 latest series + Supergirl, Flash, Harley and the Davidsons only
    return [...top5Other, ...requestedItems];
  }, [seriesPool, moviesPool, currentNormalized]);

  // Combined all (10 in Theatres + 10 in OTT + user's TV series selection)
  const allCombined = useMemo(() => {
    const seen = new Set();
    const list = [];
    [...theatrical10, ...ott10, ...tvSeriesList].forEach(it => {
      const key = `${it.mediaType}-${it.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        list.push(it);
      }
    });
    return list.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
  }, [theatrical10, ott10, tvSeriesList]);

  // Active items based on selected tab
  const itemsToDisplay = useMemo(() => {
    if (activeFilter === 'theatres') return theatrical10;
    if (activeFilter === 'ott') return ott10;
    if (activeFilter === 'tv') return tvSeriesList;
    return allCombined;
  }, [activeFilter, theatrical10, ott10, tvSeriesList, allCombined]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCardClick = (e, item) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (onNavigate) {
      if (item.mediaType === 'series') {
        onNavigate(`series/${item.id}`);
      } else {
        onNavigate(`movie/${item.id}`);
      }
    }
  };

  if (theatrical10.length === 0 && ott10.length === 0 && tvSeriesList.length === 0) return null;

  return (
    <section className="recent-releases-section section-block">
      <div className="section-header-row rr-header-row">
        <div className="section-title-wrap">
          <Sparkles size={22} className="text-gold" />
          <div>
            <h2 className="rr-title">Recently Released Movies & Shows</h2>
            <span className="rr-subtitle">
              {activeFilter === 'theatres' && 'Last 10 blockbusters released in theatres'}
              {activeFilter === 'ott' && 'Last 10 movies released on OTT streaming platforms'}
              {activeFilter === 'tv' && 'Last 5 released series + Supergirl, The Flash & Harley and the Davidsons'}
              {activeFilter === 'all' && 'Last 10 in theatres, 10 on OTT, and featured TV shows'}
            </span>
          </div>
        </div>

        <div className="rr-header-actions">
          {/* Category Tabs: In Theatres (10), On OTT (10), TV Shows (8), All */}
          <div className="rr-filter-tabs">
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'theatres' ? 'active' : ''}`}
              onClick={() => setActiveFilter('theatres')}
            >
              <Ticket size={13} />
              In Theatres ({theatrical10.length})
            </button>
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'ott' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ott')}
            >
              <MonitorPlay size={13} />
              On OTT ({ott10.length})
            </button>
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'tv' ? 'active' : ''}`}
              onClick={() => setActiveFilter('tv')}
            >
              <Tv size={13} />
              TV Shows ({tvSeriesList.length})
            </button>
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({allCombined.length})
            </button>
          </div>

          {/* Desktop Left/Right Scroll Arrows */}
          <div className="rr-nav-arrows">
            <button
              type="button"
              className="rr-nav-arrow"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="rr-nav-arrow"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* View Full Calendar Button */}
          {onNavigate && (
            <button
              type="button"
              className="rr-calendar-link"
              onClick={() => onNavigate('releases')}
              title="Browse complete release calendar by month"
            >
              <span>Release Calendar</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Rail */}
      <div className="rr-carousel-rail" ref={scrollRef}>
        {itemsToDisplay.map((item) => {
          const posterSrc = getProfileImage(item);
          const oakRating = item.ratings?.find(r => r.source === 'OakShow')?.score;
          const imdbRating = item.ratings?.find(r => r.source === 'IMDb')?.score;
          const displayScore = oakRating || imdbRating;
          const formattedDate = formatDisplayDate(item);
          const targetUrl = item.filename
            ? (item.filename.startsWith('/') ? item.filename : `/${item.filename}`)
            : (item.mediaType === 'series' ? `/series/${item.id}` : `/${item.id}.html`);

          return (
            <a
              key={`${item.categoryTag || item.mediaType}-${item.id}`}
              href={targetUrl}
              className="rr-card glass-panel"
              onClick={(e) => handleCardClick(e, item)}
            >
              <div className="rr-poster-wrap">
                {posterSrc ? (
                  <img
                    src={posterSrc}
                    alt={item.title}
                    className="rr-poster-img"
                    onError={(e) => handlePosterError(e, item.poster)}
                    loading="lazy"
                  />
                ) : (
                  <div className="rr-fallback">
                    {item.mediaType === 'series' ? <Tv size={32} /> : <Film size={32} />}
                  </div>
                )}

                {/* Media Type & Platform Badge */}
                <div className="rr-type-badge-wrap">
                  {item.categoryTag === 'tv' || item.mediaType === 'series' ? (
                    <span className="badge badge-red rr-media-badge">
                      <Tv size={10} /> TV Series
                    </span>
                  ) : item.categoryTag === 'ott' ? (
                    <span className="badge badge-cyan rr-media-badge">
                      <MonitorPlay size={10} /> {item.ottPlatform || 'OTT'}
                    </span>
                  ) : (
                    <span className="badge badge-gold rr-media-badge">
                      <Ticket size={10} /> Theatres
                    </span>
                  )}
                </div>

                {/* Release Date Pill */}
                <div className="rr-date-pill">
                  <Calendar size={11} />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="rr-content">
                <h4 className="rr-card-title" title={item.title}>
                  {item.title}
                </h4>

                <div className="rr-meta-row">
                  {displayScore && (
                    <div className="rr-rating-pill">
                      <Star size={11} fill="#ffb800" color="#ffb800" />
                      <span>{displayScore}</span>
                    </div>
                  )}
                  <span className="rr-lang-genre">
                    {[item.language, item.genre?.split(/[\/,]/)[0]].filter(Boolean).join(' • ')}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
