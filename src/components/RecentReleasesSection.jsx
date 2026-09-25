import React, { useState, useMemo, useRef } from 'react';
import { Film, Tv, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Calendar, Star } from 'lucide-react';
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
  if (item.releaseDate) {
    const cleaned = item.releaseDate.replace(/\s+\d{1,2}:\d{2}\s*(am|pm)?/i, '').replace(/\(.*?\)/g, '').trim();
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return cleaned;
  }
  return item.year ? `Year ${item.year}` : 'Released';
}

export default function RecentReleasesSection({
  currentId = '',
  currentType = 'movie',
  allMovies = [],
  allSeries = [],
  onNavigate
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'movies', 'series'
  const scrollRef = useRef(null);

  // Pool of movies and series (fall back to imported JSON data if props are empty)
  const moviesPool = allMovies && allMovies.length > 0 ? allMovies : rawMoviesData;
  const seriesPool = allSeries && allSeries.length > 0 ? allSeries : rawSeriesData;

  const currentNormalized = (currentId || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // Extract released movies (newest first, excluding current item)
  const releasedMovies = useMemo(() => {
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

      seen.add(normKey);
      list.push({
        ...m,
        mediaType: 'movie',
        releaseTimestamp: timestamp
      });
    }

    return list.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
  }, [moviesPool, currentNormalized]);

  // Extract released series (newest first, excluding current item)
  const releasedSeries = useMemo(() => {
    const now = Date.now();
    const seen = new Set();
    const list = [];

    for (const s of seriesPool) {
      if (!s || !s.title) continue;
      const status = (s.status || '').toLowerCase().trim();
      if (status === 'upcoming' || status.includes('postponed')) continue;

      const normKey = (s.id || s.slug || s.title).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (currentNormalized && (normKey === currentNormalized || currentNormalized.includes(normKey))) continue;
      if (seen.has(normKey)) continue;

      const timestamp = parseItemReleaseDate(s);
      if (timestamp <= 0 || timestamp > now) continue;

      seen.add(normKey);
      list.push({
        ...s,
        mediaType: 'series',
        releaseTimestamp: timestamp
      });
    }

    return list.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
  }, [seriesPool, currentNormalized]);

  // Combined recently released items
  const itemsToDisplay = useMemo(() => {
    if (activeFilter === 'movies') {
      return releasedMovies.slice(0, 16);
    }
    if (activeFilter === 'series') {
      return releasedSeries.slice(0, 16);
    }

    // In 'all' mode: interleave top recent movies & top recent series so users see both
    const topMovies = releasedMovies.slice(0, 10);
    const topSeries = releasedSeries.slice(0, 6);
    const combined = [...topMovies, ...topSeries].sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
    return combined.slice(0, 16);
  }, [activeFilter, releasedMovies, releasedSeries]);

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

  if (itemsToDisplay.length === 0) return null;

  return (
    <section className="recent-releases-section section-block">
      <div className="section-header-row rr-header-row">
        <div className="section-title-wrap">
          <Sparkles size={22} className="text-gold" />
          <div>
            <h2 className="rr-title">Recently Released Movies & Shows</h2>
            <span className="rr-subtitle">Fresh in theatres, streaming on OTT, and on demand</span>
          </div>
        </div>

        <div className="rr-header-actions">
          {/* Filter Pills */}
          <div className="rr-filter-tabs">
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({releasedMovies.length + releasedSeries.length})
            </button>
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveFilter('movies')}
            >
              <Film size={13} />
              Movies ({releasedMovies.length})
            </button>
            <button
              type="button"
              className={`rr-tab-btn ${activeFilter === 'series' ? 'active' : ''}`}
              onClick={() => setActiveFilter('series')}
            >
              <Tv size={13} />
              Shows ({releasedSeries.length})
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
          const oakRemark = oakRating ? getOakShowRemark(oakRating) : null;
          const formattedDate = formatDisplayDate(item);
          const targetUrl = item.filename
            ? (item.filename.startsWith('/') ? item.filename : `/${item.filename}`)
            : (item.mediaType === 'series' ? `/series/${item.id}` : `/${item.id}.html`);

          return (
            <a
              key={`${item.mediaType}-${item.id}`}
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

                {/* Media Type Chip */}
                <div className="rr-type-badge-wrap">
                  {item.mediaType === 'series' ? (
                    <span className="badge badge-red rr-media-badge">
                      <Tv size={10} /> Series
                    </span>
                  ) : (
                    <span className="badge badge-cyan rr-media-badge">
                      <Film size={10} /> Movie
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
