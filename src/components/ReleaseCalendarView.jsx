import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Film, 
  Play, 
  Star, 
  Search,
  ChevronDown,
  ArrowUpRight,
  Filter,
  Sparkles,
  Clapperboard
} from 'lucide-react';
import MovieCard from './MovieCard';

export default function ReleaseCalendarView({ 
  releases, 
  movies = [],
  onSelectMovie, 
  onPlayTrailer, 
  onNavigate,
  bookmarks = [],
  onToggleBookmark
}) {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All'); // All, Indian, Hollywood, International
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest-high');
  const [visibleCount, setVisibleCount] = useState(24);

  // Fast movie lookup map by slug, id, title, and filename
  const movieLookup = useMemo(() => {
    const map = new Map();
    if (!movies || !Array.isArray(movies)) return map;
    movies.forEach(m => {
      if (m.id) map.set(m.id.toLowerCase(), m);
      if (m.title) map.set(m.title.toLowerCase().trim(), m);
      if (m.filename) map.set(m.filename.toLowerCase().replace(/\.html$/, ''), m);
    });
    return map;
  }, [movies]);

  // Extract all available years sorted descending
  const years = useMemo(() => {
    if (!releases) return [];
    const set = new Set();
    releases.forEach(r => { if (r.year) set.add(r.year); });
    return ['All', ...Array.from(set).sort((a, b) => b.localeCompare(a))];
  }, [releases]);

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter calendars by year and month
  const filteredCalendars = useMemo(() => {
    if (!releases) return [];
    return releases.filter(r => {
      const matchYear = selectedYear === 'All' || r.year === selectedYear;
      const matchMonth = selectedMonth === 'All' || (r.month && r.month.toLowerCase() === selectedMonth.toLowerCase());
      return matchYear && matchMonth;
    });
  }, [releases, selectedYear, selectedMonth]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedYear, selectedCategory, selectedMonth, searchQuery, sortBy]);

  // Flatten, filter, enrich, and sort all release items
  const allReleaseItems = useMemo(() => {
    const items = [];
    const seen = new Set();

    filteredCalendars.forEach(cal => {
      if (!cal.items) return;
      cal.items.forEach(item => {
        const itemCat = item.category || cal.category || 'Indian';
        
        // Category Filter
        if (selectedCategory !== 'All' && itemCat !== selectedCategory) {
          return;
        }

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchLang = item.language?.toLowerCase().includes(q);
          const matchGenre = item.genre?.toLowerCase().includes(q);
          if (!matchTitle && !matchLang && !matchGenre) return;
        }

        const uniqueKey = `${(item.title || '').toLowerCase()}:${cal.year}:${cal.month}`;
        if (!seen.has(uniqueKey)) {
          seen.add(uniqueKey);

          const targetSlug = item.moreLink 
            ? item.moreLink.replace(/\.html$/i, '').replace(/^.*\//, '') 
            : (item.id || (item.title || '').replace(/[^a-zA-Z0-9]/g, ''));

          const movieMatch = movieLookup.get(targetSlug.toLowerCase()) || 
                             movieLookup.get((item.title || '').toLowerCase().trim());

          const ratings = (movieMatch?.ratings && movieMatch.ratings.length > 0) 
            ? movieMatch.ratings 
            : (item.ratings || []);

          const oakRating = ratings.find(r => r.source === 'OakShow')?.score;
          const scoreNum = parseFloat(oakRating || ratings[0]?.score) || 0;

          // Enriched item matching MovieCard standard interface
          items.push({ 
            id: movieMatch?.id || targetSlug, 
            title: item.title, 
            poster: item.poster || movieMatch?.poster, 
            alt: item.alt || movieMatch?.alt || item.title,
            category: itemCat, 
            language: item.language || movieMatch?.language || 'English', 
            genre: item.genre || movieMatch?.genre || '',
            year: item.year || movieMatch?.year || cal.year,
            month: cal.month,
            releaseDate: item.releaseDate || movieMatch?.releaseDate || (cal.month ? `${cal.month} ${cal.year}` : cal.year),
            ratings: ratings,
            scoreNum: scoreNum,
            duration: movieMatch?.duration,
            booking: movieMatch?.booking,
            videos: item.trailerLink 
              ? [{ title: `${item.title} — Official Trailer`, url: item.trailerLink }] 
              : (movieMatch?.videos || []),
            filename: item.moreLink || movieMatch?.filename || `${targetSlug}.html`,
            calendarId: cal.id,
            calendarTitle: cal.title
          });
        }
      });
    });

    // Comprehensive Sorting
    items.sort((a, b) => {
      if (sortBy === 'latest-high') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        if (yrB !== yrA) return yrB - yrA;
        if (b.scoreNum !== a.scoreNum) return b.scoreNum - a.scoreNum;
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'newest') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        if (yrB !== yrA) return yrB - yrA;
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'oldest') {
        const yrA = parseInt(a.year, 10) || 9999;
        const yrB = parseInt(b.year, 10) || 9999;
        if (yrA !== yrB) return yrA - yrB;
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'rating-high') {
        if (b.scoreNum !== a.scoreNum) return b.scoreNum - a.scoreNum;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'rating-low') {
        if (a.scoreNum !== b.scoreNum) return a.scoreNum - b.scoreNum;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      } else {
        // title-asc
        return (a.title || '').localeCompare(b.title || '');
      }
    });

    return items;
  }, [filteredCalendars, selectedCategory, searchQuery, sortBy, movieLookup]);

  const displayedItems = useMemo(() => {
    return allReleaseItems.slice(0, visibleCount);
  }, [allReleaseItems, visibleCount]);

  const activeMonthCal = useMemo(() => {
    if (selectedYear === 'All' || selectedMonth === 'All') return null;
    return filteredCalendars.find(c => {
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      return matchCat;
    }) || filteredCalendars[0] || null;
  }, [filteredCalendars, selectedYear, selectedMonth, selectedCategory]);

  return (
    <div className="release-calendar-root animate-fade-in">
      {/* Header Banner - Matches Indian, Hollywood, and OTT Catalog portals */}
      <div className="catalog-header-banner glass-panel">
        <div className="badge badge-gold">
          <Calendar size={14} />
          <span>OFFICIAL THEATRICAL RELEASE MATRIX (2015 – 2026)</span>
        </div>
        <h2 className="catalog-main-title">Movies Released</h2>
        <p className="catalog-subtitle">
          Explore complete premiere schedules, monthly release calendars, verified critic reviews, ratings, and trailers across Indian Cinema, Hollywood, and International releases.
        </p>

        {/* Quick Industry Filter Chips */}
        <div className="release-quick-chips">
          {[
            { id: 'All', label: '🌐 All Cinema' },
            { id: 'Indian', label: '🇮🇳 Indian Cinema' },
            { id: 'Hollywood', label: '🎬 Hollywood' },
            { id: 'International', label: '🌍 International' }
          ].map(cat => (
            <button
              key={cat.id}
              className={`release-chip ${selectedCategory === cat.id ? 'release-chip-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Filters Bar - Matches all other catalog sections for desktop and mobile */}
      <div className="catalog-filters-bar glass-panel">
        {/* Search Input */}
        <div className="filter-item release-search-item">
          <label>Search Releases</label>
          <div className="cal-search-input-wrap">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Title, language, or genre..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="cal-search-input"
            />
            {searchQuery && (
              <button className="cal-search-clear" onClick={() => setSearchQuery('')} title="Clear search">✕</button>
            )}
          </div>
        </div>

        {/* Cinema Industry */}
        <div className="filter-item">
          <label>Cinema Industry</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="All">All Cinema</option>
            <option value="Indian">🇮🇳 Indian Cinema</option>
            <option value="Hollywood">🎬 Hollywood</option>
            <option value="International">🌍 International</option>
          </select>
        </div>

        {/* Release Year */}
        <div className="filter-item">
          <label>Release Year</label>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            {years.map(yr => (
              <option key={yr} value={yr}>
                {yr === 'All' ? 'All Years' : yr}
              </option>
            ))}
          </select>
        </div>

        {/* Release Month */}
        <div className="filter-item">
          <label>Release Month</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            {months.map(m => (
              <option key={m} value={m}>
                {m === 'All' ? 'All Months' : m}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-item">
          <label>Sort By</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="latest-high">Latest & Highest Rated (Default)</option>
            <option value="newest">Newest to Oldest (Release Year)</option>
            <option value="oldest">Oldest to Newest (Earliest Premieres)</option>
            <option value="rating-high">Highest Rated to Lowest</option>
            <option value="rating-low">Lowest Rated to Highest</option>
            <option value="title-asc">Movie Title (A to Z)</option>
            <option value="title-desc">Movie Title (Z to A)</option>
          </select>
        </div>
      </div>

      {/* Results Header & Monthly Standalone Hub Link */}
      <div className="calendar-results-meta">
        <div className="meta-left">
          <span className="results-count-text">
            Showing <strong className="text-gold">{allReleaseItems.length}</strong> releases {selectedMonth !== 'All' ? `for ${selectedMonth} ` : ''}{selectedYear !== 'All' ? `${selectedYear} ` : ''}{selectedCategory !== 'All' ? `(${selectedCategory})` : ''}
          </span>
        </div>

        {activeMonthCal && onNavigate && (
          <div className="meta-right">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate(`releases/${activeMonthCal.id}`)}
              title={`Open dedicated ${selectedMonth} ${selectedYear} monthly calendar archive`}
            >
              <span>View Full {selectedMonth} {selectedYear} Hub</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Releases Movie Cards Grid - Uses unified MovieCard for responsive desktop/mobile layout */}
      {allReleaseItems.length > 0 ? (
        <>
          <div className="grid-movies">
            {displayedItems.map((movie) => (
              <MovieCard
                key={`${movie.id}-${movie.year}-${movie.month}`}
                movie={movie}
                onSelect={(m) => {
                  if (onSelectMovie) {
                    onSelectMovie(m);
                  } else if (onNavigate) {
                    onNavigate(m.filename ? m.filename.replace(/\.html$/, '') : `movie/${m.id}`);
                  }
                }}
                onPlayTrailer={onPlayTrailer}
                isBookmarked={bookmarks.some(b => b.id === movie.id)}
                onToggleBookmark={onToggleBookmark || (() => {})}
              />
            ))}
          </div>

          {/* Load More Pagination - Ensures instantaneous 60fps performance on mobile */}
          {visibleCount < allReleaseItems.length && (
            <div className="load-more-wrap" style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
              <button 
                className="btn btn-secondary load-more-btn"
                onClick={() => setVisibleCount(prev => prev + 24)}
              >
                <span>Load More Movies ({allReleaseItems.length - visibleCount} remaining)</span>
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="calendar-empty glass-panel">
          <Calendar size={48} className="text-gold" />
          <h3>No releases matched the selected filters</h3>
          <p>Try switching to another year, cinema industry, or reset your search query.</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSelectedYear('All');
              setSelectedCategory('All');
              setSelectedMonth('All');
              setSearchQuery('');
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}

      <style>{`
        .release-calendar-root {
          padding-bottom: 60px;
        }
        .release-quick-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }
        .release-chip {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .release-chip:hover {
          color: var(--text-heading);
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--border-focus);
        }
        .release-chip-active {
          background: linear-gradient(135deg, #0284c7 0%, #05325d 100%) !important;
          color: #ffffff !important;
          border-color: var(--logo-sky) !important;
          font-weight: 700;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
        }
        .release-search-item {
          grid-column: span 1;
        }
        .cal-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          transition: border-color var(--transition-fast);
        }
        .cal-search-input-wrap:focus-within {
          border-color: var(--logo-sky);
        }
        .cal-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          font-size: 0.88rem;
          font-family: inherit;
        }
        .cal-search-clear {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.85rem;
          padding: 2px 6px;
        }
        .cal-search-clear:hover {
          color: #ffffff;
        }
        .calendar-results-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .results-count-text {
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .results-count-text strong {
          color: var(--text-heading);
        }
        .calendar-empty {
          padding: 60px 20px;
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          border-radius: var(--radius-lg);
        }
        .calendar-empty h3 {
          font-size: 1.35rem;
          color: var(--text-heading);
          margin: 0;
        }
        .calendar-empty p {
          max-width: 500px;
          margin: 0;
          font-size: 0.92rem;
        }

        @media (max-width: 768px) {
          .release-quick-chips {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .release-quick-chips::-webkit-scrollbar {
            display: none;
          }
          .release-chip {
            padding: 5px 12px;
            font-size: 0.78rem;
            flex-shrink: 0;
          }
          .catalog-filters-bar {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 14px !important;
          }
          .calendar-results-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
