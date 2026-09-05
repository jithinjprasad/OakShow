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
  X
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

  // Base list of upcoming movies:
  // - Explicit status: "Upcoming"
  // - Year >= 2026
  // - Future release date
  // - Legacy upcoming filenames (Upcoming.html, etc.)
  const allUpcomingMovies = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];
    return movies.filter((m) => {
      const isUpcomingStatus = m.status && m.status.toLowerCase().includes('upcoming');
      const is2026Plus = parseInt(m.year, 10) >= 2026;
      const releaseTime = parseDate(m);
      const isFutureRelease = releaseTime > 0 && releaseTime >= new Date('2026-07-01T00:00:00Z').getTime();
      const isUpcomingLegacy = ['upcoming.html', 'upcoming2.html', 'upcoming3.html'].includes((m.filename || '').toLowerCase());

      return isUpcomingStatus || is2026Plus || isFutureRelease || isUpcomingLegacy;
    });
  }, [movies]);

  // Extract unique genres and languages
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
        const cast = (movie.cast || []).join(' ').toLowerCase();
        const director = (movie.director || '').toLowerCase();
        const desc = (movie.description || movie.storyline || '').toLowerCase();
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

  return (
    <div className="upcoming-view-root tab-view animate-fade-in container">
      {/* Header Banner */}
      <div className="catalog-header-banner glass-panel">
        <div className="badge badge-gold">
          <Flame size={14} className="badge-flame-icon" />
          <span>IN THEATERS SOON • OFFICIAL PREMIERES</span>
        </div>
        <h2 className="catalog-main-title">Upcoming Movies & Release Countdown</h2>
        <p className="catalog-subtitle">
          Discover the most anticipated theatrical releases, upcoming blockbusters, exclusive trailers, premiere dates, and advance ticket booking alerts across Indian Cinema, Hollywood, and International releases.
        </p>

        {/* Quick Industry Filter Chips */}
        <div className="release-quick-chips">
          {[
            { id: 'All', label: `🌐 All Cinema (${allUpcomingMovies.length})` },
            { id: 'Hollywood', label: `🎬 Hollywood (${hollywoodCount})` },
            { id: 'Indian', label: `🇮🇳 Indian Cinema (${indianCount})` }
          ].map(cat => (
            <button
              key={cat.id}
              className={`release-chip ${selectedIndustry === cat.id ? 'release-chip-active' : ''}`}
              onClick={() => setSelectedIndustry(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Filters Bar */}
      <div className="catalog-filters-bar glass-panel">
        {/* Industry */}
        <div className="filter-item">
          <label>Industry</label>
          <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}>
            <option value="All">All Cinema</option>
            <option value="Hollywood">🎬 Hollywood</option>
            <option value="Indian">🇮🇳 Indian Cinema</option>
          </select>
        </div>

        {/* Genre */}
        <div className="filter-item">
          <label>Genre</label>
          <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
            {availableGenres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="filter-item">
          <label>Language</label>
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
            {availableLanguages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-item">
          <label>Sort By</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date-asc">Premiere Date (Soonest First)</option>
            <option value="date-desc">Premiere Date (Furthest First)</option>
            <option value="title-asc">Movie Title (A to Z)</option>
            <option value="title-desc">Movie Title (Z to A)</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="filter-item search-filter-item">
          <label>Search Upcoming</label>
          <div className="cal-search-input-wrap">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Title, cast, director, genre..."
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

      {/* Results Header / Meta */}
      <div className="calendar-results-meta">
        <div className="results-count-group">
          <Clock size={16} className="text-gold" />
          <span className="results-count-text">
            Showing <strong>{filteredMovies.length}</strong> upcoming {filteredMovies.length === 1 ? 'movie' : 'movies'}
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
        <div className="grid-movies">
          {filteredMovies.slice(0, visibleCount).map((movie) => (
            <div key={movie.id} className="upcoming-card-wrapper">
              <MovieCard
                movie={movie}
                onSelect={(m) => onSelectMovie(m.filename ? m.filename.replace(/\.html$/, '') : `movie/${m.id}`)}
                onPlayTrailer={onPlayTrailer}
                isBookmarked={bookmarks.some(b => b.id === movie.id)}
                onToggleBookmark={onToggleBookmark}
              />
              {/* Upcoming Specific Badge Bar below poster */}
              <div className="upcoming-card-info-strip">
                <span className="upcoming-date-badge">
                  <Calendar size={12} />
                  <span>{movie.releaseDate || `${movie.year} TBA`}</span>
                </span>
                {movie.booking && movie.booking.length > 0 && (
                  <span className="upcoming-booking-chip" title="Advance Tickets Available">
                    <Ticket size={12} />
                    <span>Booking Open</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-catalog glass-panel">
          <Film size={48} className="text-muted mb-2" />
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

      {/* Embedded Component Specific CSS */}
      <style>{`
        .upcoming-view-root {
          padding-bottom: 60px;
        }
        .badge-flame-icon {
          color: #ef4444;
          animation: flamePulse 1.8s infinite ease-in-out;
        }
        .upcoming-card-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .upcoming-card-info-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
          gap: 8px;
          font-size: 0.75rem;
        }
        .upcoming-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--text-secondary);
          font-weight: 600;
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
          font-weight: 600;
          font-size: 0.7rem;
        }
        .clear-all-filters-btn {
          background: transparent;
          border: none;
          color: var(--accent-red, #ef4444);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }
        @keyframes flamePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
