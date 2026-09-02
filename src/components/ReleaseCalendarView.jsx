import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Filter, 
  Film, 
  Play, 
  Star, 
  Search,
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  Globe, 
  Clapperboard,
  ArrowUpRight
} from 'lucide-react';

export default function ReleaseCalendarView({ 
  releases, 
  onSelectMovie, 
  onPlayTrailer, 
  onNavigate 
}) {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All'); // All, Indian, Hollywood, International
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest-high'); // latest-high, newest, oldest, rating-high, rating-low, title-asc, title-desc

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

  // Filter calendars by year, category and month
  const filteredCalendars = useMemo(() => {
    if (!releases) return [];
    return releases.filter(r => {
      const matchYear = selectedYear === 'All' || r.year === selectedYear;
      const matchMonth = selectedMonth === 'All' || (r.month && r.month.toLowerCase() === selectedMonth.toLowerCase());
      return matchYear && matchMonth;
    });
  }, [releases, selectedYear, selectedMonth]);

  // Flatten, filter, and sort all release items
  const allReleaseItems = useMemo(() => {
    const items = [];
    const seen = new Set();

    filteredCalendars.forEach(cal => {
      cal.items.forEach(item => {
        const itemCat = item.category || cal.category || 'Indian';
        
        // Category Filter
        if (selectedCategory !== 'All' && itemCat !== selectedCategory) {
          return;
        }

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchLang = item.language?.toLowerCase().includes(q);
          const matchGenre = item.genre?.toLowerCase().includes(q);
          if (!matchTitle && !matchLang && !matchGenre) return;
        }

        const uniqueKey = `${item.title}:${cal.year}:${cal.month}`;
        if (!seen.has(uniqueKey)) {
          seen.add(uniqueKey);
          items.push({ 
            ...item, 
            calendarId: cal.id,
            calendarTitle: cal.title, 
            category: itemCat, 
            year: cal.year,
            month: cal.month 
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
        const scoreA = parseFloat(a.ratings?.[0]?.score) || 0;
        const scoreB = parseFloat(b.ratings?.[0]?.score) || 0;
        return scoreB - scoreA;
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
        const scoreA = parseFloat(a.ratings?.[0]?.score) || 0;
        const scoreB = parseFloat(b.ratings?.[0]?.score) || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'rating-low') {
        const scoreA = parseFloat(a.ratings?.[0]?.score) || 0;
        const scoreB = parseFloat(b.ratings?.[0]?.score) || 0;
        if (scoreA !== scoreB) return scoreA - scoreB;
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
  }, [filteredCalendars, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="release-calendar-root animate-fade-in">
      {/* Header Banner */}
      <div className="calendar-header-banner glass-panel">
        <div className="badge badge-gold">
          <Calendar size={14} />
          <span>OFFICIAL THEATRICAL RELEASE MATRIX (2015 – 2022)</span>
        </div>
        <h2 className="calendar-main-heading">Movie Release Calendars</h2>
        <p className="calendar-subtext">
          Browse comprehensive theatrical release schedules across Indian Cinema, Hollywood, and International releases with verified ratings, trailers, and standalone pages.
        </p>

        {/* Filter Controls Bar */}
        <div className="calendar-filters-container">
          {/* Quick Search */}
          <div className="calendar-search-row">
            <div className="cal-search-input-wrap">
              <Search size={16} className="text-muted" />
              <input 
                type="text" 
                placeholder="Search releases by movie title, language, or genre..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="cal-search-input"
              />
              {searchQuery && (
                <button className="cal-search-clear" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          {/* Industry Category Filter */}
          <div className="filter-group">
            <span className="filter-label">Cinema Industry:</span>
            <div className="filter-pills">
              {[
                { id: 'All', label: '🌐 All Cinema' },
                { id: 'Indian', label: '🇮🇳 Indian Cinema' },
                { id: 'Hollywood', label: '🎬 Hollywood' },
                { id: 'International', label: '🌍 International' }
              ].map(cat => (
                <button
                  key={cat.id}
                  className={`pill-btn ${selectedCategory === cat.id ? 'pill-btn-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Year selector pills */}
          <div className="filter-group">
            <span className="filter-label">Release Year:</span>
            <div className="filter-pills">
              {years.map(yr => (
                <button
                  key={yr}
                  className={`pill-btn ${selectedYear === yr ? 'pill-btn-active' : ''}`}
                  onClick={() => setSelectedYear(yr)}
                >
                  {yr === 'All' ? 'All Years' : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Month selector */}
          <div className="filter-group">
            <span className="filter-label">Release Month:</span>
            <div className="filter-pills-scroll">
              {months.map(m => (
                <button
                  key={m}
                  className={`pill-btn ${selectedMonth === m ? 'pill-btn-active' : ''}`}
                  onClick={() => setSelectedMonth(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Selector */}
          <div className="filter-group" style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="filter-label" style={{ marginBottom: 0 }}>Sort Releases:</span>
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              className="critic-sort-dropdown"
              style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(20,20,28,0.85)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
            >
              <option value="latest-high">Latest Releases & Highest Rated (Default)</option>
              <option value="newest">Newest to Oldest (Release Year)</option>
              <option value="oldest">Oldest to Newest (Earliest Premieres)</option>
              <option value="rating-high">Highest Rated to Lowest</option>
              <option value="rating-low">Lowest Rated to Highest</option>
              <option value="title-asc">Movie Title (A to Z)</option>
              <option value="title-desc">Movie Title (Z to A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header & Monthly Standalone Hub Links */}
      <div className="calendar-results-meta">
        <div className="meta-left">
          <h3>
            Showing <span className="text-gold">{allReleaseItems.length}</span> releases {selectedMonth !== 'All' ? `for ${selectedMonth} ` : ''}{selectedYear !== 'All' ? `${selectedYear} ` : ''}{selectedCategory !== 'All' ? `(${selectedCategory})` : ''}
          </h3>
        </div>

        {selectedYear !== 'All' && selectedMonth !== 'All' && filteredCalendars.length > 0 && (
          <div className="meta-right">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                const targetCal = filteredCalendars[0];
                if (targetCal && onNavigate) {
                  onNavigate(`releases/${targetCal.id}`);
                }
              }}
            >
              <span>View Full {selectedMonth} {selectedYear} Hub</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Releases Cards Grid */}
      {allReleaseItems.length > 0 ? (
        <div className="grid-movies">
          {allReleaseItems.map((item, idx) => {
            const posterSrc = item.poster ? (item.poster.startsWith('/') ? item.poster : `/${item.poster}`) : null;
            const targetSlug = item.moreLink ? item.moreLink.replace('.html', '').replace(/^.*\//, '') : item.title.replace(/[^a-zA-Z0-9]/g, '');

            return (
              <div key={idx} className="movie-card-root release-calendar-card">
                <div 
                  className="poster-container"
                  onClick={() => {
                    if (onSelectMovie) {
                      onSelectMovie({ 
                        id: targetSlug, 
                        title: item.title, 
                        poster: item.poster, 
                        language: item.language, 
                        genre: item.genre, 
                        releaseDate: item.releaseDate,
                        year: item.year 
                      });
                    }
                  }}
                >
                  {posterSrc ? (
                    <img 
                      src={posterSrc} 
                      alt={item.title} 
                      className="poster-image poster-loaded"
                      loading="lazy"
                      onError={(e) => { e.target.src = '/favicon.png'; }}
                    />
                  ) : (
                    <div className="poster-fallback">
                      <Film size={36} />
                    </div>
                  )}

                  {/* Industry Badge */}
                  <div className="card-top-badges">
                    <span className={`badge ${item.category === 'Hollywood' ? 'badge-red' : item.category === 'International' ? 'badge-cyan' : 'badge-gold'}`}>
                      {item.category === 'Hollywood' ? 'Hollywood' : item.category === 'International' ? 'International' : 'Indian'}
                    </span>
                  </div>

                  {item.releaseDate && (
                    <div className="release-date-badge">
                      <Calendar size={11} />
                      <span>{item.releaseDate}</span>
                    </div>
                  )}

                  <div className="card-hover-overlay">
                    <span className="card-hover-prompt">View Film Details</span>
                  </div>
                </div>

                <div className="card-info">
                  <div className="card-meta-line">
                    {item.language && <span className="card-tag">{item.language}</span>}
                    {item.genre && <span className="card-tag card-genre">{item.genre}</span>}
                  </div>

                  <h4 
                    className="card-title" 
                    title={item.title}
                    onClick={() => {
                      if (onSelectMovie) {
                        onSelectMovie({ id: targetSlug, title: item.title });
                      }
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* Action row with trailer and details */}
                  <div className="release-action-footer">
                    {item.trailerLink && onPlayTrailer ? (
                      <button
                        className="btn-trailer-link-mini"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayTrailer({
                            title: `${item.title} — Official Trailer`,
                            url: item.trailerLink
                          });
                        }}
                      >
                        <Play size={12} fill="#ffffff" />
                        <span>Trailer</span>
                      </button>
                    ) : null}

                    <button
                      className="btn-film-link-mini"
                      onClick={() => {
                        if (onSelectMovie) {
                          onSelectMovie({ id: targetSlug, title: item.title });
                        }
                      }}
                    >
                      <span>Movie Hub</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="calendar-empty glass-panel">
          <Calendar size={48} className="text-gold" />
          <h3>No releases matched the selected filters</h3>
          <p>Try switching to another year, cinema industry, or reset the month filter.</p>
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
        .calendar-header-banner {
          border-radius: var(--radius-lg);
          padding: 30px;
          margin-bottom: 24px;
        }
        .calendar-main-heading {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 10px 0 6px;
        }
        .calendar-subtext {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 24px;
          max-width: 850px;
        }
        .calendar-filters-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: rgba(0, 0, 0, 0.35);
          padding: 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .calendar-search-row {
          width: 100%;
        }
        .cal-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          transition: border-color 0.2s ease;
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
          font-size: 0.92rem;
        }
        .cal-search-clear {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.9rem;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          min-width: 120px;
        }
        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .filter-pills-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }
        .filter-pills-scroll::-webkit-scrollbar {
          display: none;
        }
        .pill-btn {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          background: var(--bg-primary);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
          white-space: nowrap;
          cursor: pointer;
        }
        .pill-btn:hover {
          color: var(--accent-primary);
          background: var(--bg-surface-elevated);
          border-color: var(--border-focus);
        }
        .pill-btn-active {
          background: linear-gradient(135deg, #0284c7 0%, #05325d 100%) !important;
          color: #ffffff !important;
          border-color: var(--logo-sky) !important;
          font-weight: 700;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
        }
        .calendar-results-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .calendar-results-meta h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
        }
        .release-calendar-card {
          cursor: pointer;
        }
        .release-action-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid var(--border-subtle);
        }
        .btn-trailer-link-mini {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(229, 9, 20, 0.85);
          color: #ffffff;
          border: none;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .btn-trailer-link-mini:hover {
          background: #e50914;
        }
        .btn-film-link-mini {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-surface-elevated);
          color: var(--accent-primary);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          margin-left: auto;
          transition: all 0.15s ease;
        }
        .btn-film-link-mini:hover {
          background: var(--accent-primary);
          color: #ffffff;
        }
        .calendar-empty {
          padding: 60px 20px;
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
      `}</style>
    </div>
  );
}
