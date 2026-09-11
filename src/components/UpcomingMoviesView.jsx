import React, { useState, useMemo, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Search, 
  Sparkles, 
  Film, 
  Globe, 
  Clapperboard, 
  Filter, 
  SlidersHorizontal,
  ChevronDown,
  Play,
  Ticket,
  ExternalLink,
  Flame,
  X,
  Bookmark,
  Check,
  ArrowRight,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import MovieCard from './MovieCard';

export default function UpcomingMoviesView({
  movies = [],
  onSelectMovie,
  onPlayTrailer,
  onNavigate,
  bookmarks = [],
  onToggleBookmark
}) {
  const [selectedIndustry, setSelectedIndustry] = useState('All'); // All, Indian, Hollywood, International
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-asc'); // date-asc (soonest), date-desc, title-asc
  const [visibleCount, setVisibleCount] = useState(24);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Parse release date helper
  const parseDate = (item) => {
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
  };

  // Calculate human-friendly days remaining until premiere
  const getDaysUntil = (dateStr) => {
    if (!dateStr) return null;
    const clean = dateStr.replace(/\(.*?\)/g, '').replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
    const t = Date.parse(clean);
    if (isNaN(t) || t <= 0) return null;
    const diff = t - Date.now();
    if (diff <= 0) return 'Premieres Soon';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 1) return 'Premieres Tomorrow';
    return `${days} Days to Premiere`;
  };

  // Base list of upcoming movies:
  // - ONLY movies that have NOT yet released
  // - Strictly exclude movies that are already released / already in the released section
  const allUpcomingMovies = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];
    const now = Date.now();

    return movies.filter((m) => {
      if (!m || !m.title) return false;

      // Exclude if already has ratings, reviews, or certified score (already released)
      const hasRatings = (Array.isArray(m.ratings) && m.ratings.length > 0) || (typeof m.score === 'number' && m.score > 0);
      if (hasRatings) return false;

      const statusLower = (m.status || '').toLowerCase().trim();
      if (statusLower === 'released') return false;

      const isUpcomingStatus = statusLower === 'upcoming';
      const releaseTime = parseDate(m);
      const isFutureRelease = releaseTime > 0 && releaseTime > now;

      // Only include if explicitly marked upcoming OR has a verified future release date
      return isUpcomingStatus || isFutureRelease;
    });
  }, [movies]);

  // Featured spotlight movie (most anticipated / soonest upcoming release)
  const spotlightMovie = useMemo(() => {
    if (!allUpcomingMovies || allUpcomingMovies.length === 0) return null;
    return [...allUpcomingMovies].sort((a, b) => {
      const tA = parseDate(a) || Infinity;
      const tB = parseDate(b) || Infinity;
      return tA - tB;
    })[0];
  }, [allUpcomingMovies]);

  // Extract unique genres and languages strictly from upcoming pool
  const availableGenres = useMemo(() => {
    const set = new Set();
    allUpcomingMovies.forEach(m => {
      if (m.genre) {
        m.genre.split(/[,/]/).forEach(g => {
          const trimmed = g.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [allUpcomingMovies]);

  const availableLanguages = useMemo(() => {
    const set = new Set();
    allUpcomingMovies.forEach(m => {
      if (m.language) {
        const l = m.language.trim();
        if (l) set.add(l);
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [allUpcomingMovies]);

  // Reset visibleCount on filter change
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedIndustry, selectedGenre, selectedLanguage, searchQuery, sortBy]);

  // Filtered and sorted upcoming movies
  const filteredMovies = useMemo(() => {
    let list = allUpcomingMovies.filter((movie) => {
      // Industry / Category filter
      if (selectedIndustry !== 'All') {
        const cat = movie.category || '';
        if (selectedIndustry === 'Indian' && cat !== 'Indian') return false;
        if (selectedIndustry === 'Hollywood' && cat !== 'Hollywood') return false;
        if (selectedIndustry === 'International' && cat !== 'International') return false;
      }

      // Genre filter
      if (selectedGenre !== 'All') {
        const g = movie.genre || '';
        if (!g.toLowerCase().includes(selectedGenre.toLowerCase())) return false;
      }

      // Language filter
      if (selectedLanguage !== 'All') {
        const l = movie.language || '';
        if (!l.toLowerCase().includes(selectedLanguage.toLowerCase())) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const title = (movie.title || '').toLowerCase();
        const cast = Array.isArray(movie.cast) 
          ? movie.cast.map(c => typeof c === 'string' ? c : c.actor).join(' ').toLowerCase() 
          : '';
        const director = (movie.director || '').toLowerCase();
        const desc = (movie.description || movie.summary || movie.plot || '').toLowerCase();
        if (!title.includes(q) && !cast.includes(q) && !director.includes(q) && !desc.includes(q)) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'date-asc') {
        const timeA = parseDate(a) || Infinity;
        const timeB = parseDate(b) || Infinity;
        return timeA - timeB;
      }
      if (sortBy === 'date-desc') {
        const timeA = parseDate(a) || 0;
        const timeB = parseDate(b) || 0;
        return timeB - timeA;
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      return 0;
    });
  }, [allUpcomingMovies, selectedIndustry, selectedGenre, selectedLanguage, searchQuery, sortBy]);

  // Count highlights
  const hollywoodCount = useMemo(() => allUpcomingMovies.filter(m => m.category === 'Hollywood').length, [allUpcomingMovies]);
  const indianCount = useMemo(() => allUpcomingMovies.filter(m => m.category === 'Indian').length, [allUpcomingMovies]);

  // Handle trailer click
  const handleSpotlightTrailer = () => {
    if (!spotlightMovie) return;
    if (spotlightMovie.videos && spotlightMovie.videos.length > 0) {
      onPlayTrailer(spotlightMovie.videos[0]);
    } else if (onPlayTrailer) {
      onPlayTrailer({
        url: 'https://www.youtube.com/watch?v=qORTe1wW3Wg',
        title: `${spotlightMovie.title} - Official Trailer`
      });
    }
  };

  const isSpotlightBookmarked = spotlightMovie && bookmarks.some(b => b.id === spotlightMovie.id);

  return (
    <div className="upcoming-view-root tab-view animate-fade-in container">
      {/* Header Banner */}
      <div className="upcoming-header-banner glass-panel">
        <div className="upcoming-badge-row">
          <div className="badge badge-gold">
            <Flame size={14} className="badge-flame-icon" />
            <span>IN THEATERS SOON • OFFICIAL PREMIERES</span>
          </div>
          <span className="upcoming-verified-tag">
            <Sparkles size={13} className="text-gold" />
            <span>Official OakShow Calendar</span>
          </span>
        </div>
        <h1 className="upcoming-main-title">Upcoming Movies & Premiere Countdown</h1>
        <p className="upcoming-subtitle">
          Explore confirmed theatrical premieres, upcoming studio blockbusters, advance booking alerts, and official trailers across Hollywood, Indian Cinema, and World Entertainment.
        </p>

        {/* Quick Industry Filter Chips */}
        <div className="upcoming-quick-chips">
          {[
            { id: 'All', label: `🌐 All Upcoming (${allUpcomingMovies.length})` },
            { id: 'Hollywood', label: `🎬 Hollywood (${hollywoodCount})` },
            { id: 'Indian', label: `🇮🇳 Indian Cinema (${indianCount})` }
          ].map(cat => (
            <button
              key={cat.id}
              className={`upcoming-chip ${selectedIndustry === cat.id ? 'upcoming-chip-active' : ''}`}
              onClick={() => setSelectedIndustry(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Spotlight Premiere Card */}
      {spotlightMovie && (
        <section className="upcoming-spotlight-section">
          <div className="upcoming-spotlight-card">
            {/* Ambient Background Graphic & Vignette */}
            <div 
              className="upcoming-spotlight-bg"
              style={{
                backgroundImage: `url(${
                  spotlightMovie.gallery?.[1]?.src 
                    ? (spotlightMovie.gallery[1].src.startsWith('/') ? spotlightMovie.gallery[1].src : `/${spotlightMovie.gallery[1].src}`)
                    : (spotlightMovie.poster?.startsWith('/') ? spotlightMovie.poster : `/${spotlightMovie.poster}`)
                })`
              }}
            />
            <div className="upcoming-spotlight-overlay" />

            {/* Spotlight Content Container */}
            <div className="upcoming-spotlight-inner">
              {/* Media Visual Column */}
              <div className="upcoming-spotlight-media-col">
                <div 
                  className="upcoming-spotlight-poster-wrap"
                  onClick={() => onSelectMovie(spotlightMovie.filename ? spotlightMovie.filename.replace(/\.html$/, '') : `movie/${spotlightMovie.id}`)}
                >
                  <img 
                    src={spotlightMovie.poster?.startsWith('/') ? spotlightMovie.poster : `/${spotlightMovie.poster}`}
                    alt={spotlightMovie.title}
                    className="upcoming-spotlight-poster"
                    onError={(e) => { e.target.src = '/favicon.png'; }}
                  />
                  <div className="upcoming-poster-play-overlay" onClick={(e) => { e.stopPropagation(); handleSpotlightTrailer(); }}>
                    <div className="upcoming-play-circle">
                      <Play size={20} className="fill-current" />
                    </div>
                    <span>Watch Trailer</span>
                  </div>
                  <span className="upcoming-spotlight-countdown-chip">
                    <Clock size={12} className="text-gold" />
                    <span>{getDaysUntil(spotlightMovie.releaseDate) || 'Premieres Soon'}</span>
                  </span>
                </div>
              </div>

              {/* Info Column */}
              <div className="upcoming-spotlight-info">
                {/* Header Badges */}
                <div className="upcoming-spotlight-meta-top">
                  <span className="spotlight-prem-badge">
                    <Sparkles size={12} />
                    <span>NEXT MAJOR PREMIERE</span>
                  </span>
                  <span className="spotlight-cat-badge">{spotlightMovie.category || 'Hollywood'}</span>
                  {spotlightMovie.year && <span className="upcoming-meta-tag">• {spotlightMovie.year}</span>}
                  {spotlightMovie.duration && <span className="upcoming-meta-tag">• {spotlightMovie.duration}</span>}
                </div>

                {/* Title */}
                <h2 
                  className="upcoming-spotlight-title"
                  onClick={() => onSelectMovie(spotlightMovie.filename ? spotlightMovie.filename.replace(/\.html$/, '') : `movie/${spotlightMovie.id}`)}
                >
                  {spotlightMovie.title}
                </h2>

                {/* Director & Genre Bar */}
                <div className="upcoming-spotlight-credits">
                  {spotlightMovie.director && (
                    <span className="upcoming-credit-item">
                      <strong>Directed by:</strong> {spotlightMovie.director}
                    </span>
                  )}
                  {spotlightMovie.genre && (
                    <span className="upcoming-credit-item">
                      <strong>Genre:</strong> {spotlightMovie.genre}
                    </span>
                  )}
                </div>

                {/* Star Cast Pills */}
                {Array.isArray(spotlightMovie.cast) && spotlightMovie.cast.length > 0 && (
                  <div className="upcoming-spotlight-cast">
                    <span className="cast-label">Starring:</span>
                    <div className="cast-pills-wrap">
                      {spotlightMovie.cast.slice(0, 5).map((actorObj, idx) => {
                        const actorName = typeof actorObj === 'string' ? actorObj : actorObj.actor;
                        return (
                          <span key={idx} className="cast-pill">{actorName}</span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Synopsis Excerpt */}
                <p className="upcoming-spotlight-desc">
                  {spotlightMovie.summary || spotlightMovie.plot || spotlightMovie.description}
                </p>

                {/* Release Schedule Bar */}
                <div className="upcoming-spotlight-date-row">
                  <div className="upcoming-date-box">
                    <Calendar size={18} className="text-gold" />
                    <div>
                      <span className="date-sub-label">Confirmed Theatrical Premiere</span>
                      <strong className="date-value">{spotlightMovie.releaseDate || `${spotlightMovie.year} TBA`}</strong>
                    </div>
                  </div>
                  {getDaysUntil(spotlightMovie.releaseDate) && (
                    <div className="upcoming-countdown-badge">
                      <Flame size={15} className="badge-flame-icon" />
                      <span>{getDaysUntil(spotlightMovie.releaseDate)}</span>
                    </div>
                  )}
                </div>

                {/* Interactive Action Buttons */}
                <div className="upcoming-spotlight-actions">
                  <button 
                    className="upcoming-btn-trailer"
                    onClick={handleSpotlightTrailer}
                    title="Watch Official Theatrical Trailer"
                  >
                    <Play size={16} className="fill-current" />
                    <span>Watch Trailer</span>
                  </button>

                  <button
                    className="upcoming-btn-details"
                    onClick={() => onSelectMovie(spotlightMovie.filename ? spotlightMovie.filename.replace(/\.html$/, '') : `movie/${spotlightMovie.id}`)}
                    title="View Full Movie Details, Stills & Cast"
                  >
                    <Info size={16} />
                    <span>Movie Details</span>
                  </button>

                  {/* Book Tickets Quick Link */}
                  {Array.isArray(spotlightMovie.bookings) && spotlightMovie.bookings.length > 0 && (
                    <a
                      href={spotlightMovie.bookings[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="upcoming-btn-booking"
                      title="Advance Ticket Booking"
                    >
                      <Ticket size={16} />
                      <span>Book on {spotlightMovie.bookings[0].provider || 'BookMyShow'}</span>
                    </a>
                  )}

                  {/* Watchlist Toggle Button */}
                  <button
                    className={`upcoming-bookmark-btn ${isSpotlightBookmarked ? 'bookmarked' : ''}`}
                    onClick={() => onToggleBookmark && onToggleBookmark(spotlightMovie)}
                    title={isSpotlightBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    {isSpotlightBookmarked ? <Check size={18} className="text-emerald" /> : <Bookmark size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Catalog Filters Bar */}
      <div className="upcoming-filters-bar glass-panel">
        <div className="upcoming-filters-grid">
          {/* Industry Filter */}
          <div className="filter-item">
            <label>Industry</label>
            <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}>
              <option value="All">All Cinema</option>
              <option value="Hollywood">🎬 Hollywood ({hollywoodCount})</option>
              <option value="Indian">🇮🇳 Indian Cinema ({indianCount})</option>
            </select>
          </div>

          {/* Genre Filter */}
          <div className="filter-item">
            <label>Genre</label>
            <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
              {availableGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="filter-item">
            <label>Language</label>
            <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
              {availableLanguages.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="filter-item">
            <label>Sort By</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="date-asc">Premiere Date (Soonest First)</option>
              <option value="date-desc">Premiere Date (Furthest First)</option>
              <option value="title-asc">Movie Title (A to Z)</option>
              <option value="title-desc">Movie Title (Z to A)</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="filter-item upcoming-search-item">
            <label>Search Upcoming</label>
            <div className="cal-search-input-wrap">
              <Search size={16} className="text-muted" />
              <input 
                type="text" 
                placeholder="Title, actor, director..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="cal-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="cal-search-clear" 
                  onClick={() => setSearchQuery('')}
                  title="Clear Search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Meta Count */}
      <div className="upcoming-results-meta">
        <div className="results-count-group">
          <Clock size={16} className="text-gold" />
          <span className="results-count-text">
            Showing <strong>{filteredMovies.length}</strong> upcoming {filteredMovies.length === 1 ? 'theatrical release' : 'theatrical releases'}
          </span>
        </div>
        {(selectedIndustry !== 'All' || selectedGenre !== 'All' || selectedLanguage !== 'All' || searchQuery) && (
          <button
            className="clear-all-filters-btn"
            onClick={() => {
              setSelectedIndustry('All');
              setSelectedGenre('All');
              setSelectedLanguage('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="upcoming-movies-grid">
          {filteredMovies.slice(0, visibleCount).map((movie) => (
            <div key={movie.id} className="upcoming-card-wrapper">
              <MovieCard
                movie={movie}
                onSelect={(m) => onSelectMovie(m.filename ? m.filename.replace(/\.html$/, '') : `movie/${m.id}`)}
                onPlayTrailer={onPlayTrailer}
                isBookmarked={bookmarks.some(b => b.id === movie.id)}
                onToggleBookmark={onToggleBookmark}
              />
              {/* Upcoming Specific Badge Strip below poster */}
              <div className="upcoming-card-info-strip">
                <span className="upcoming-date-badge">
                  <Calendar size={13} className="text-gold" />
                  <span>{movie.releaseDate || `${movie.year} TBA`}</span>
                </span>
                {Array.isArray(movie.bookings) && movie.bookings.length > 0 && (
                  <span className="upcoming-booking-chip" title="Advance Tickets Open">
                    <Ticket size={11} />
                    <span>Booking Open</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-catalog glass-panel">
          <Film size={44} className="text-muted mb-2" />
          <h3>No Upcoming Movies Found</h3>
          <p>No upcoming movies matched your selected filters or search query.</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              setSelectedIndustry('All');
              setSelectedGenre('All');
              setSelectedLanguage('All');
              setSearchQuery('');
            }}
          >
            Show All Upcoming Movies
          </button>
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredMovies.length && (
        <div className="load-more-wrap">
          <button
            className="btn btn-secondary load-more-btn"
            onClick={() => setVisibleCount(prev => prev + 24)}
          >
            <span>Load More Upcoming Movies ({filteredMovies.length - visibleCount} remaining)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* Cross-Section Navigation / Notice Banner */}
      <section className="upcoming-notice-section glass-panel">
        <div className="upcoming-notice-content">
          <div className="upcoming-notice-icon-wrap">
            <Layers size={24} className="text-cyan" />
          </div>
          <div className="upcoming-notice-text">
            <h4>Looking for Movies Already in Theaters or on OTT?</h4>
            <p>
              Films that have premiered (including 2026 releases like <em>I'm Game</em>, <em>Gail Daughtry</em>, and <em>Devadas & Chandra</em>) are archived in our full <strong>Cinema Release Calendars</strong> and verified <strong>Editorial Critic Reviews</strong>.
            </p>
          </div>
        </div>
        <div className="upcoming-notice-links">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate ? onNavigate('releases') : null}
          >
            <span>Browse Release Calendars</span>
            <ArrowRight size={14} />
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate ? onNavigate('reviews') : null}
          >
            <span>Verified Ratings & Reviews</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Component Specific Modern CSS */}
      <style>{`
        .upcoming-view-root {
          padding-top: 10px;
          padding-bottom: 70px;
        }
        .badge-flame-icon {
          color: #ef4444;
          animation: flamePulse 1.8s infinite ease-in-out;
        }
        @keyframes flamePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        /* 1. Header Banner */
        .upcoming-header-banner {
          padding: 24px 28px;
          margin: 16px 0 24px;
          border-radius: var(--radius-lg, 16px);
          background: var(--bg-surface, rgba(15, 23, 42, 0.65));
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .upcoming-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .upcoming-verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted, #94a3b8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .upcoming-main-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--text-heading, #ffffff);
          margin: 4px 0 8px;
          letter-spacing: -0.02em;
        }
        .upcoming-subtitle {
          font-size: 0.92rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.55;
          max-width: 860px;
          margin-bottom: 16px;
        }
        .upcoming-quick-chips {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .upcoming-quick-chips::-webkit-scrollbar {
          display: none;
        }
        .upcoming-chip {
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--bg-surface-elevated, rgba(255, 255, 255, 0.05));
          color: var(--text-secondary, #cbd5e1);
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .upcoming-chip:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-gold, #f59e0b);
          color: #ffffff;
        }
        .upcoming-chip-active {
          background: var(--accent-gold, #f59e0b) !important;
          color: #0f172a !important;
          border-color: var(--accent-gold, #f59e0b) !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
        }

        /* 2. Spotlight Hero Card */
        .upcoming-spotlight-section {
          margin-bottom: 24px;
        }
        .upcoming-spotlight-card {
          position: relative;
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background: linear-gradient(140deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid rgba(245, 158, 11, 0.45);
          box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08), 0 0 24px rgba(245, 158, 11, 0.12);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .upcoming-spotlight-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 25%;
          opacity: 0.12;
          filter: blur(1px);
          transform: scale(1.02);
          transition: transform 0.6s ease;
        }
        .upcoming-spotlight-card:hover .upcoming-spotlight-bg {
          transform: scale(1.05);
        }
        .upcoming-spotlight-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 55%, rgba(248, 250, 252, 0.75) 100%);
        }
        .upcoming-spotlight-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          padding: 32px;
          align-items: start;
        }
        .upcoming-spotlight-media-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .upcoming-spotlight-poster-wrap {
          width: 100%;
          position: relative;
          border-radius: var(--radius-md, 14px);
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(15, 23, 42, 0.12);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .upcoming-spotlight-poster-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.22);
        }
        .upcoming-spotlight-poster {
          width: 100%;
          aspect-ratio: 2/3;
          object-fit: cover;
          display: block;
        }
        .upcoming-poster-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(3px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: opacity 0.25s ease;
        }
        .upcoming-spotlight-poster-wrap:hover .upcoming-poster-play-overlay {
          opacity: 1;
        }
        .upcoming-play-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #0b0f19;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.55);
          transition: transform 0.2s ease;
        }
        .upcoming-spotlight-poster-wrap:hover .upcoming-play-circle {
          transform: scale(1.1);
        }
        .upcoming-spotlight-countdown-chip {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(8px);
          color: #fbbf24;
          font-size: 0.74rem;
          font-weight: 800;
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid rgba(245, 158, 11, 0.4);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }
        .upcoming-spotlight-info {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .upcoming-spotlight-meta-top {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .spotlight-prem-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.16) 100%);
          border: 1px solid rgba(245, 158, 11, 0.6);
          color: #b45309;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.12);
        }
        .spotlight-cat-badge {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #dc2626;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .upcoming-meta-tag {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-muted, #475569);
        }
        .upcoming-spotlight-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 900;
          color: var(--text-heading, #091e42);
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .upcoming-spotlight-title:hover {
          color: #f59e0b;
        }
        .upcoming-spotlight-credits {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.88rem;
          color: var(--text-secondary, #334155);
        }
        .upcoming-credit-item strong {
          color: var(--text-muted, #475569);
          margin-right: 5px;
          font-weight: 700;
        }
        .upcoming-spotlight-cast {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 0.84rem;
        }
        .cast-label {
          color: var(--text-muted, #475569);
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.72rem;
          letter-spacing: 0.6px;
        }
        .cast-pills-wrap {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .cast-pill {
          background: rgba(15, 23, 42, 0.05);
          color: #1e293b;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid rgba(15, 23, 42, 0.1);
        }
        .upcoming-spotlight-desc {
          font-size: 0.9rem;
          color: var(--text-muted, #475569);
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .upcoming-spotlight-date-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 2px;
        }
        .upcoming-date-box {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, #ffffff 100%);
          border: 1px solid rgba(245, 158, 11, 0.45);
          padding: 10px 18px;
          border-radius: var(--radius-md, 12px);
          box-shadow: inset 0 0 14px rgba(245, 158, 11, 0.06);
        }
        .date-sub-label {
          display: block;
          font-size: 0.68rem;
          text-transform: uppercase;
          color: var(--text-muted, #475569);
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .date-value {
          display: block;
          font-size: 0.98rem;
          color: var(--text-heading, #091e42);
          font-weight: 800;
        }
        .upcoming-countdown-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%);
          color: #b91c1c;
          border: 1px solid rgba(239, 68, 68, 0.4);
          padding: 10px 18px;
          border-radius: var(--radius-md, 12px);
          font-weight: 800;
          font-size: 0.9rem;
          box-shadow: 0 0 18px rgba(239, 68, 68, 0.12);
        }
        .upcoming-spotlight-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 6px;
        }
        .upcoming-btn-trailer {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          font-size: 0.92rem;
          font-weight: 800;
          border-radius: var(--radius-md, 10px);
          background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%);
          color: #0b0f19 !important;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.4);
          transition: all 0.2s ease;
        }
        .upcoming-btn-trailer:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 26px rgba(245, 158, 11, 0.6);
        }
        .upcoming-btn-details {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 0.92rem;
          font-weight: 700;
          border-radius: var(--radius-md, 10px);
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.18);
          color: #0f172a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .upcoming-btn-details:hover {
          background: #f8fafc;
          border-color: rgba(15, 23, 42, 0.3);
          transform: translateY(-2px);
        }
        .upcoming-btn-booking {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 0.92rem;
          font-weight: 800;
          border-radius: var(--radius-md, 10px);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.18) 100%);
          border: 1px solid #10b981;
          color: #047857 !important;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .upcoming-btn-booking:hover {
          background: #10b981;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        }
        .upcoming-bookmark-btn {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.18);
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .upcoming-bookmark-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
          transform: scale(1.06);
        }
        .upcoming-bookmark-btn.bookmarked {
          background: rgba(16, 185, 129, 0.25);
          border-color: #10b981;
          color: #047857;
        }

        /* 3. Filters Bar */
        .upcoming-filters-bar {
          padding: 16px 20px;
          margin-bottom: 20px;
          border-radius: var(--radius-lg, 16px);
          background: var(--bg-surface, rgba(15, 23, 42, 0.65));
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          box-shadow: var(--shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.15));
        }
        .upcoming-filters-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr) 1.5fr;
          gap: 14px;
          align-items: end;
        }
        .upcoming-filters-bar .filter-item label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--text-muted, #94a3b8);
          margin-bottom: 6px;
        }
        .upcoming-filters-bar select,
        .upcoming-filters-bar .cal-search-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-md, 10px);
          background: var(--bg-surface-elevated, rgba(255, 255, 255, 0.05));
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
          color: var(--text-heading, #ffffff);
          font-size: 0.88rem;
          font-weight: 600;
          outline: none;
          transition: all 0.2s ease;
        }
        .upcoming-filters-bar select:focus,
        .upcoming-filters-bar select:hover,
        .upcoming-filters-bar .cal-search-input:focus {
          border-color: var(--accent-gold, #f59e0b);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }
        .cal-search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .cal-search-input-wrap svg.text-muted {
          position: absolute;
          left: 12px;
          pointer-events: none;
        }
        .cal-search-input-wrap input {
          padding-left: 36px !important;
          padding-right: 32px !important;
        }
        .cal-search-clear {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: var(--text-muted, #94a3b8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 4. Results Meta */
        .upcoming-results-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 0 4px;
        }
        .results-count-group {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-secondary, #cbd5e1);
        }
        .results-count-group strong {
          color: var(--text-heading, #ffffff);
        }
        .clear-all-filters-btn {
          background: transparent;
          border: none;
          color: var(--accent-red, #ef4444);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }

        /* 5. Responsive Grid */
        .upcoming-movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }
        .upcoming-card-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .upcoming-card-info-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2px 4px;
          gap: 8px;
        }
        .upcoming-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary, #cbd5e1);
          font-weight: 700;
          font-size: 0.8rem;
        }
        .upcoming-booking-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 2px 7px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.7rem;
        }

        /* 6. Notice Section */
        .upcoming-notice-section {
          margin-top: 36px;
          padding: 24px 28px;
          border-radius: var(--radius-lg, 16px);
          background: var(--bg-surface, rgba(15, 23, 42, 0.65));
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .upcoming-notice-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          max-width: 700px;
        }
        .upcoming-notice-icon-wrap {
          padding: 10px;
          border-radius: 10px;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .upcoming-notice-text h4 {
          margin: 0 0 6px;
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-heading, #ffffff);
        }
        .upcoming-notice-text p {
          margin: 0;
          font-size: 0.86rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.5;
        }
        .upcoming-notice-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* 7. Mobile & Tablet Responsive Queries */
        @media (max-width: 992px) {
          .upcoming-spotlight-inner {
            grid-template-columns: 200px 1fr;
            gap: 22px;
            padding: 24px;
          }
          .upcoming-spotlight-title {
            font-size: 1.85rem;
          }
          .upcoming-filters-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .upcoming-search-item {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .upcoming-view-root {
            padding-left: 12px;
            padding-right: 12px;
          }
          .upcoming-header-banner {
            padding: 16px;
            margin-top: 10px;
            margin-bottom: 16px;
          }
          .upcoming-spotlight-card {
            border-radius: var(--radius-md, 14px);
          }
          .upcoming-spotlight-inner {
            display: flex;
            flex-direction: column;
            padding: 16px;
            gap: 14px;
            align-items: stretch;
            text-align: left;
          }
          .upcoming-spotlight-media-col {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 14px;
          }
          .upcoming-spotlight-poster-wrap {
            width: 110px;
            flex-shrink: 0;
            border-radius: 10px;
          }
          .upcoming-spotlight-poster {
            aspect-ratio: 2/3;
          }
          .upcoming-spotlight-title {
            font-size: 1.45rem;
            line-height: 1.2;
          }
          .upcoming-spotlight-desc {
            font-size: 0.84rem;
            -webkit-line-clamp: 3;
          }
          .upcoming-spotlight-date-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          .upcoming-date-box,
          .upcoming-countdown-badge {
            width: 100%;
            justify-content: flex-start;
            padding: 9px 12px;
          }
          .upcoming-spotlight-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            width: 100%;
          }
          .upcoming-btn-trailer,
          .upcoming-btn-details {
            width: 100%;
            justify-content: center;
            padding: 11px 12px;
            font-size: 0.86rem;
          }
          .upcoming-btn-booking {
            grid-column: 1 / -1;
            width: 100%;
            justify-content: center;
            padding: 11px 14px;
            font-size: 0.86rem;
          }
          .upcoming-bookmark-btn {
            grid-column: 1 / -1;
            width: 100%;
            border-radius: 10px;
            height: 40px;
          }
          .upcoming-filters-bar {
            padding: 14px 12px;
            border-radius: var(--radius-md, 12px);
          }
          .upcoming-filters-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .upcoming-search-item {
            grid-column: 1 / -1;
          }
          .upcoming-movies-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .upcoming-notice-section {
            padding: 18px 16px;
            flex-direction: column;
            align-items: stretch;
          }
          .upcoming-notice-links {
            width: 100%;
            flex-direction: column;
          }
          .upcoming-notice-links .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
