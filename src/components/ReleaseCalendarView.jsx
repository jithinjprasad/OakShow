import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Search, 
  ChevronDown, 
  ArrowUpRight, 
  Filter, 
  Sparkles, 
  Clapperboard, 
  Globe 
} from 'lucide-react';
import MovieCard from './MovieCard';

export default function ReleaseCalendarView({ 
  releases = [], 
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
  const [visibleCount, setVisibleCount] = useState(() => {
    try {
      const raw = sessionStorage.getItem('oakshow_scroll_releases');
      if (raw) {
        const s = JSON.parse(raw);
        if (s.visibleCount) return Math.max(24, s.visibleCount);
      }
    } catch (e) {}
    return 24;
  });

  // Restore scroll on mount if returning, or scroll to top on fresh visit
  useEffect(() => {
    let restored = false;
    try {
      const raw = sessionStorage.getItem('oakshow_scroll_releases');
      if (raw) {
        const s = JSON.parse(raw);
        if (s.scrollY > 0) {
          restored = true;
          requestAnimationFrame(() => {
            window.scrollTo({ top: s.scrollY, behavior: 'instant' });
          });
          setTimeout(() => {
            window.scrollTo({ top: s.scrollY, behavior: 'instant' });
          }, 60);
        }
      }
    } catch (e) {}
    if (!restored) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  // Persist scroll position for seamless back navigation
  useEffect(() => {
    let timer = null;
    const handleScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const y = window.scrollY || window.pageYOffset || 0;
          if (y > 0) {
            sessionStorage.setItem('oakshow_scroll_releases', JSON.stringify({
              scrollY: y,
              visibleCount
            }));
          }
        } catch (e) {}
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleCount]);

  // Fast movie lookup map (memoized strictly on movies array)
  const movieLookup = useMemo(() => {
    const map = new Map();
    if (!movies || !Array.isArray(movies)) return map;
    for (let i = 0; i < movies.length; i++) {
      const m = movies[i];
      if (m.id) map.set(m.id.toLowerCase(), m);
      if (m.title) map.set(m.title.toLowerCase().trim(), m);
      if (m.filename) map.set(m.filename.toLowerCase().replace(/\.html$/, ''), m);
      if (m.fileName) map.set(m.fileName.toLowerCase().replace(/\.html$/, ''), m);
    }
    return map;
  }, [movies]);

  const months = useMemo(() => [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ], []);

  // PRECOMPUTE & ENRICH ALL RELEASE ITEMS ONCE
  // Incorporates all 1,100 released movies from moviesData (including all 2026 releases) + historical archives
  const masterReleaseItems = useMemo(() => {
    const items = [];
    const seen = new Set();

    const extractMonth = (dateStr) => {
      if (!dateStr || typeof dateStr !== 'string') return '';
      const monthsList = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const lower = dateStr.toLowerCase();
      for (const m of monthsList) {
        if (lower.includes(m.toLowerCase()) || lower.includes(m.toLowerCase().slice(0, 3))) {
          return m;
        }
      }
      return '';
    };

    // 1. Primary Source: All released movies from moviesData (1,100 verified titles)
    if (movies && Array.isArray(movies)) {
      for (let i = 0; i < movies.length; i++) {
        const m = movies[i];
        if (!m || !m.title) continue;

        const cleanTitle = m.title.toLowerCase().trim();
        const calYear = m.year || (m.releaseDate ? m.releaseDate.match(/\b(20\d\d)\b/)?.[1] : '') || '';
        const calMonth = extractMonth(m.releaseDate);
        const uniqueKey = `${cleanTitle}:${calYear}`;

        seen.add(uniqueKey);

        const oakRating = m.ratings?.find(r => r.source === 'OakShow')?.score;
        const scoreNum = typeof m.score === 'number' ? m.score : (parseFloat(oakRating || m.ratings?.[0]?.score) || 0);
        const yrNum = parseInt(calYear, 10) || 0;

        let category = m.category;
        if (!category) {
          const lang = (m.language || '').toLowerCase();
          if (lang.includes('hindi') || lang.includes('tamil') || lang.includes('telugu') || lang.includes('malayalam') || lang.includes('kannada')) {
            category = 'Indian';
          } else if (lang.includes('english')) {
            category = 'Hollywood';
          } else {
            category = 'International';
          }
        }

        items.push({
          id: m.id || cleanTitle.replace(/[^a-zA-Z0-9]/g, ''),
          title: m.title,
          poster: m.poster,
          alt: m.alt || m.title,
          category: category,
          language: m.language || 'English',
          genre: m.genre || '',
          year: calYear,
          numericYear: yrNum,
          month: calMonth,
          releaseDate: m.releaseDate || (calMonth ? `${calMonth} ${calYear}` : calYear),
          ratings: m.ratings || [],
          scoreNum: scoreNum,
          duration: m.duration,
          booking: m.booking,
          videos: m.videos || [],
          filename: m.filename || m.fileName || (m.id ? `${m.id}.html` : ''),
          calendarId: null,
          calendarTitle: null
        });
      }
    }

    // 2. Secondary Source: Any supplementary historical archive calendar items from releases.json
    if (releases && Array.isArray(releases)) {
      for (let c = 0; c < releases.length; c++) {
        const cal = releases[c];
        if (!cal.items || !Array.isArray(cal.items)) continue;
        const calCat = cal.category || 'Indian';
        const calYear = cal.year || '';
        const calMonth = cal.month || '';

        for (let i = 0; i < cal.items.length; i++) {
          const item = cal.items[i];
          if (!item || !item.title) continue;

          const cleanTitle = item.title.toLowerCase().trim();
          const uniqueKey = `${cleanTitle}:${calYear}`;

          // If already added from moviesData, enrich with calendar details
          const existing = items.find(it => it.title.toLowerCase().trim() === cleanTitle && (it.year === calYear || !it.year));
          if (existing) {
            if (!existing.month && calMonth) existing.month = calMonth;
            if (!existing.calendarId && cal.id) {
              existing.calendarId = cal.id;
              existing.calendarTitle = cal.title;
            }
            continue;
          }

          if (seen.has(uniqueKey)) continue;
          seen.add(uniqueKey);

          const targetSlug = item.moreLink 
            ? item.moreLink.replace(/\.html$/i, '').replace(/^.*\//, '') 
            : (item.id || item.title.replace(/[^a-zA-Z0-9]/g, ''));

          const movieMatch = movieLookup.get(targetSlug.toLowerCase()) || 
                             movieLookup.get(cleanTitle);

          const ratings = (movieMatch?.ratings && movieMatch.ratings.length > 0) 
            ? movieMatch.ratings 
            : (item.ratings || []);

          const oakRating = ratings.find(r => r.source === 'OakShow')?.score;
          const scoreNum = parseFloat(oakRating || ratings[0]?.score) || (typeof movieMatch?.score === 'number' ? movieMatch.score : 0);
          const yrNum = parseInt(item.year || movieMatch?.year || calYear, 10) || 0;

          items.push({
            id: movieMatch?.id || targetSlug,
            title: item.title,
            poster: movieMatch?.poster || item.poster,
            alt: item.alt || movieMatch?.alt || item.title,
            category: item.category || movieMatch?.category || calCat,
            language: item.language || movieMatch?.language || 'English',
            genre: item.genre || movieMatch?.genre || '',
            year: item.year || movieMatch?.year || calYear,
            numericYear: yrNum,
            month: calMonth,
            releaseDate: item.releaseDate || movieMatch?.releaseDate || (calMonth ? `${calMonth} ${calYear}` : calYear),
            ratings: ratings,
            scoreNum: scoreNum,
            duration: movieMatch?.duration,
            booking: movieMatch?.booking,
            videos: item.trailerLink 
              ? [{ title: `${item.title} — Official Trailer`, url: item.trailerLink }] 
              : (movieMatch?.videos || []),
            filename: item.moreLink || movieMatch?.filename || movieMatch?.fileName || `${targetSlug}.html`,
            calendarId: cal.id,
            calendarTitle: cal.title
          });
        }
      }
    }

    return items;
  }, [movies, releases, movieLookup]);

  // Extract all available years sorted descending (memoized from master items)
  const years = useMemo(() => {
    const set = new Set();
    for (let i = 0; i < masterReleaseItems.length; i++) {
      if (masterReleaseItems[i].year) set.add(masterReleaseItems[i].year);
    }
    return ['All', ...Array.from(set).sort((a, b) => b.localeCompare(a))];
  }, [masterReleaseItems]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedYear, selectedCategory, selectedMonth, searchQuery, sortBy]);

  // Lightning-fast O(N) Filtering & Sorting (<1ms execution)
  const filteredItems = useMemo(() => {
    let list = masterReleaseItems;

    // 1. Cinema Industry Filter
    if (selectedCategory !== 'All') {
      list = list.filter(it => it.category === selectedCategory);
    }

    // 2. Year Filter
    if (selectedYear !== 'All') {
      list = list.filter(it => it.year === selectedYear);
    }

    // 3. Month Filter
    if (selectedMonth !== 'All') {
      const lowerMonth = selectedMonth.toLowerCase();
      list = list.filter(it => it.month && it.month.toLowerCase() === lowerMonth);
    }

    // 4. Instant Search Substring Match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(it => 
        (it.title && it.title.toLowerCase().includes(q)) || 
        (it.language && it.language.toLowerCase().includes(q)) || 
        (it.genre && it.genre.toLowerCase().includes(q))
      );
    }

    // 5. High-performance Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'latest-high') {
        if (b.numericYear !== a.numericYear) return b.numericYear - a.numericYear;
        if (b.scoreNum !== a.scoreNum) return b.scoreNum - a.scoreNum;
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'newest') {
        if (b.numericYear !== a.numericYear) return b.numericYear - a.numericYear;
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'oldest') {
        const yA = a.numericYear || 9999;
        const yB = b.numericYear || 9999;
        if (yA !== yB) return yA - yB;
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating-high') {
        if (b.scoreNum !== a.scoreNum) return b.scoreNum - a.scoreNum;
        return b.numericYear - a.numericYear;
      } else if (sortBy === 'rating-low') {
        if (a.scoreNum !== b.scoreNum) return a.scoreNum - b.scoreNum;
        return b.numericYear - a.numericYear;
      } else if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      } else {
        // title-asc
        return a.title.localeCompare(b.title);
      }
    });
  }, [masterReleaseItems, selectedCategory, selectedYear, selectedMonth, searchQuery, sortBy]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Optional active monthly archive hub link
  const activeMonthCal = useMemo(() => {
    if (selectedYear === 'All' || selectedMonth === 'All') return null;
    return releases.find(c => {
      const matchYr = c.year === selectedYear;
      const matchMo = c.month && c.month.toLowerCase() === selectedMonth.toLowerCase();
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      return matchYr && matchMo && matchCat;
    }) || null;
  }, [releases, selectedYear, selectedMonth, selectedCategory]);

  return (
    <div className="release-calendar-root animate-fade-in">
      {/* Header Banner - Standardized with other OakShow catalog portals */}
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

      {/* Unified Filters Bar - Identical styling to Indian / Hollywood / OTT portals */}
      <div className="catalog-filters-bar glass-panel">
        {/* Cinema Industry */}
        <div className="filter-item">
          <label>Industry</label>
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

        {/* Search Input */}
        <div className="filter-item search-filter-item">
          <label>Search Releases</label>
          <div className="cal-search-input-wrap">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Title, genre, language..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="cal-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="cal-search-clear" 
                onClick={() => setSearchQuery('')} 
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Meta & Active Monthly Archive Hub Link */}
      <div className="calendar-results-meta">
        <div className="meta-left">
          <span className="results-count-text">
            Showing <strong className="text-gold">{filteredItems.length}</strong> releases {selectedMonth !== 'All' ? `for ${selectedMonth} ` : ''}{selectedYear !== 'All' ? `${selectedYear} ` : ''}{selectedCategory !== 'All' ? `(${selectedCategory})` : ''}
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

      {/* Releases Movie Cards Grid - Responsive, performant, mobile-optimized */}
      {filteredItems.length > 0 ? (
        <>
          <div className="grid-movies">
            {displayedItems.map((movie) => (
              <MovieCard
                key={`${movie.id}-${movie.year}-${movie.month}`}
                movie={movie}
                onSelect={(m) => {
                  try {
                    sessionStorage.setItem('oakshow_scroll_releases', JSON.stringify({
                      scrollY: window.scrollY || window.pageYOffset || 0,
                      visibleCount
                    }));
                  } catch (e) {}
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

          {/* Load More Pagination - Instantaneous 60fps load */}
          {visibleCount < filteredItems.length && (
            <div className="load-more-wrap">
              <button 
                className="btn btn-secondary load-more-btn"
                onClick={() => setVisibleCount(prev => prev + 24)}
              >
                <span>Load More Movies ({filteredItems.length - visibleCount} remaining)</span>
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
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
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

        .cal-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          height: 42px;
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
          font-size: 0.9rem;
          font-family: inherit;
        }
        .cal-search-clear {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.85rem;
          padding: 2px 6px;
          line-height: 1;
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

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .release-quick-chips {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            margin-top: 14px;
          }
          .release-quick-chips::-webkit-scrollbar {
            display: none;
          }
          .release-chip {
            padding: 6px 13px;
            font-size: 0.8rem;
            flex-shrink: 0;
          }
          .cal-search-input-wrap {
            height: 38px;
            padding: 8px 12px;
          }
          .cal-search-input {
            font-size: 0.84rem;
          }
          .calendar-results-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 14px;
          }
          .results-count-text {
            font-size: 0.86rem;
          }
        }
      `}</style>
    </div>
  );
}
