import React, { useState, useMemo, useEffect } from 'react';
import { 
  Tv, 
  Search, 
  ChevronDown, 
  Sparkles, 
  Filter, 
  ArrowUpDown, 
  Globe, 
  Film, 
  Play
} from 'lucide-react';
import MovieCard from './MovieCard';

export default function SeriesHub({ 
  series = [], 
  onSelectSeries, 
  onNavigate,
  bookmarks = [],
  onToggleBookmark 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('latest-high');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Compute genres
  const genres = useMemo(() => {
    const set = new Set();
    series.forEach(s => {
      if (s.genre) {
        s.genre.split(',').forEach(g => set.add(g.trim()));
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [series]);

  // Compute languages
  const languages = useMemo(() => {
    const set = new Set();
    series.forEach(s => {
      if (s.language) {
        s.language.split(/[\/,]/).forEach(l => {
          const clean = l.trim();
          if (clean && clean.length > 2) set.add(clean);
        });
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, [series]);

  // Filtered & Sorted Series List
  const filteredSeries = useMemo(() => {
    let list = [...series];

    // 1. Category Filter
    if (selectedCategory === 'Indian') {
      list = list.filter(s => {
        const lang = (s.language || '').toLowerCase();
        return lang.includes('hindi') || lang.includes('tamil') || lang.includes('telugu') || lang.includes('malayalam') || lang.includes('bengali') || s.industry === 'Indian' || (s.cast && s.cast.length > 0 && !lang.includes('japanese') && !lang.includes('korean'));
      });
    } else if (selectedCategory === 'Hollywood') {
      list = list.filter(s => {
        const lang = (s.language || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        return (lang.includes('english') || s.industry === 'Hollywood') && !id.includes('dragonball') && !lang.includes('japanese');
      });
    } else if (selectedCategory === 'International') {
      list = list.filter(s => {
        const lang = (s.language || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        return lang.includes('japanese') || lang.includes('spanish') || lang.includes('korean') || lang.includes('german') || id.includes('dragonball') || id.includes('moneyheist');
      });
    }

    // 2. Language Filter
    if (selectedLanguage !== 'All') {
      list = list.filter(s => (s.language || '').toLowerCase().includes(selectedLanguage.toLowerCase()));
    }

    // 3. Genre Filter
    if (selectedGenre !== 'All') {
      list = list.filter(s => (s.genre || '').toLowerCase().includes(selectedGenre.toLowerCase()));
    }

    // 4. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        (s.title || '').toLowerCase().includes(q) ||
        (s.genre || '').toLowerCase().includes(q) ||
        (s.language || '').toLowerCase().includes(q) ||
        (s.director || '').toLowerCase().includes(q) ||
        (s.cast && s.cast.some(c => (c.actor || c.name || '').toLowerCase().includes(q))) ||
        (s.seasonsData && s.seasonsData.some(sd => (sd.title || '').toLowerCase().includes(q)))
      );
    }

    // 5. Sorting
    list.sort((a, b) => {
      if (sortBy === 'latest-high') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        if (yrB !== yrA) return yrB - yrA;
        const scoreA = typeof a.score === 'number' ? a.score : (parseFloat(a.ratings?.[0]?.score) || 0);
        const scoreB = typeof b.score === 'number' ? b.score : (parseFloat(b.ratings?.[0]?.score) || 0);
        return scoreB - scoreA;
      } else if (sortBy === 'newest') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'oldest') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrA - yrB;
      } else if (sortBy === 'rating-high') {
        const scoreA = typeof a.score === 'number' ? a.score : (parseFloat(a.ratings?.[0]?.score) || 0);
        const scoreB = typeof b.score === 'number' ? b.score : (parseFloat(b.ratings?.[0]?.score) || 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'rating-low') {
        const scoreA = typeof a.score === 'number' ? a.score : (parseFloat(a.ratings?.[0]?.score) || 0);
        const scoreB = typeof b.score === 'number' ? b.score : (parseFloat(b.ratings?.[0]?.score) || 0);
        if (scoreA !== scoreB) return scoreA - scoreB;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      } else {
        return (a.title || '').localeCompare(b.title || '');
      }
    });

    return list;
  }, [series, selectedCategory, selectedLanguage, selectedGenre, sortBy, searchQuery]);

  return (
    <div className="tab-view animate-fade-in container">
      {/* Standard Catalog Header Banner (Matches Indian / Hollywood / International Movie Catalogs) */}
      <div className="catalog-header-banner glass-panel">
        <div className="badge badge-red">
          WEB SERIES & TELEVISION ARCHIVE
        </div>
        <h2 className="catalog-main-title">
          Web Series, Television & International Anime
        </h2>
        <p className="catalog-subtitle">
          Showing verified ratings, reviews, episode guides and streaming providers for {filteredSeries.length} titles.
        </p>
      </div>

      {/* Standard Catalog Filter Bar (Exact Match with Movie Catalogs) */}
      <div className="catalog-filters-bar glass-panel">
        <div className="filter-item">
          <label>Category</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="All">All Series ({series.length})</option>
            <option value="Indian">Indian Web Series</option>
            <option value="Hollywood">Hollywood TV</option>
            <option value="International">International & Anime</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Genre</label>
          <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="filter-item">
          <label>Language</label>
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="filter-item">
          <label>Sort By</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="latest-high">Latest & Highest Rated (Default)</option>
            <option value="newest">Newest to Oldest (Release Year)</option>
            <option value="oldest">Oldest to Newest (Earliest Releases)</option>
            <option value="rating-high">Highest Rated to Lowest</option>
            <option value="rating-low">Lowest Rated to Highest</option>
            <option value="title-asc">Title (A to Z)</option>
            <option value="title-desc">Title (Z to A)</option>
          </select>
        </div>
      </div>

      {/* Standard Movies & Series Card Grid (Matches Movie Sections) */}
      <div className="grid-movies">
        {filteredSeries.slice(0, visibleCount).map((s) => (
          <MovieCard
            key={s.id}
            movie={s}
            onSelect={(item) => {
              if (onSelectSeries) {
                onSelectSeries(item);
              } else if (onNavigate) {
                onNavigate(item.filename ? item.filename.replace(/\.html$/, '') : `series/${item.id}`);
              }
            }}
            isBookmarked={bookmarks.some(b => b.id === s.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>

      {/* Standard Load More Pagination Button */}
      {visibleCount < filteredSeries.length && (
        <div className="load-more-wrap">
          <button 
            className="btn btn-secondary load-more-btn"
            onClick={() => setVisibleCount(prev => prev + 24)}
          >
            <span>Load More Series ({filteredSeries.length - visibleCount} remaining)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
