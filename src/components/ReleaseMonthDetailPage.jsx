import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  ArrowLeft, 
  Film,
  Sparkles
} from 'lucide-react';
import MovieCard from './MovieCard';
import ShareBar from './ShareBar';

export default function ReleaseMonthDetailPage({ 
  releaseItem, 
  movies = [],
  onNavigate,
  onPlayTrailer,
  bookmarks = [],
  onToggleBookmark
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterLang, setFilterLang] = useState('All');

  if (!releaseItem) return null;

  const items = releaseItem.items || [];

  // Fast movie lookup map
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

  const languages = useMemo(() => {
    const set = new Set();
    items.forEach(it => {
      if (it.language) {
        it.language.split(/[\/, ]+/).forEach(l => {
          if (l.trim() && l.length > 2) set.add(l.trim());
        });
      }
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  const enrichedItems = useMemo(() => {
    return items.map(item => {
      const targetSlug = item.moreLink 
        ? item.moreLink.replace(/\.html$/i, '').replace(/^.*\//, '') 
        : (item.id || (item.title || '').replace(/[^a-zA-Z0-9]/g, ''));

      const movieMatch = movieLookup.get(targetSlug.toLowerCase()) || 
                         movieLookup.get((item.title || '').toLowerCase().trim());

      const ratings = (movieMatch?.ratings && movieMatch.ratings.length > 0) 
        ? movieMatch.ratings 
        : (item.ratings || []);

      return {
        id: movieMatch?.id || targetSlug,
        title: item.title,
        poster: item.poster || movieMatch?.poster,
        alt: item.alt || movieMatch?.alt || item.title,
        category: item.category || movieMatch?.category || releaseItem.category || 'Indian',
        language: item.language || movieMatch?.language || 'English',
        genre: item.genre || movieMatch?.genre || '',
        year: item.year || movieMatch?.year || releaseItem.year,
        month: releaseItem.month,
        releaseDate: item.releaseDate || movieMatch?.releaseDate || (releaseItem.month ? `${releaseItem.month} ${releaseItem.year}` : releaseItem.year),
        ratings: ratings,
        duration: movieMatch?.duration,
        booking: movieMatch?.booking,
        videos: item.trailerLink 
          ? [{ title: `${item.title} — Official Trailer`, url: item.trailerLink }] 
          : (movieMatch?.videos || []),
        filename: item.moreLink || movieMatch?.filename || `${targetSlug}.html`
      };
    });
  }, [items, movieLookup, releaseItem]);

  const filteredItems = useMemo(() => {
    return enrichedItems.filter(it => {
      const matchCat = selectedCategory === 'All' || it.category === selectedCategory;
      const matchLang = filterLang === 'All' || (it.language && it.language.toLowerCase().includes(filterLang.toLowerCase()));
      return matchCat && matchLang;
    });
  }, [enrichedItems, selectedCategory, filterLang]);

  return (
    <div className="movie-page-root animate-fade-in">
      {/* Topbar */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button className="topbar-back-btn" onClick={() => onNavigate('releases')}>
              <ArrowLeft size={18} />
              <span>Back to Release Matrix</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate('releases')}>Releases</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">{releaseItem.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="release-month-banner">
        <div className="container">
          <div className="rmb-content">
            <div className="badge badge-gold">{releaseItem.category || 'Cinema Releases'} • {releaseItem.year}</div>
            <h1 className="rmb-title">{releaseItem.title}</h1>
            <p className="rmb-subtitle">
              Comprehensive theatrical premiere schedule, verified ratings, and reviews for <strong>{releaseItem.month} {releaseItem.year}</strong> ({items.length} titles).
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Filter Bar */}
      <div className="container movie-main-body">
        {/* Filter controls */}
        <div className="catalog-filters-bar glass-panel" style={{ marginBottom: '24px' }}>
          <div className="filter-item">
            <label>Cinema Industry</label>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="All">All Industries</option>
              <option value="Indian">🇮🇳 Indian Cinema</option>
              <option value="Hollywood">🎬 Hollywood</option>
              <option value="International">🌍 International</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Language</label>
            <select value={filterLang} onChange={e => setFilterLang(e.target.value)}>
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="section-block">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <Film size={20} className="text-gold" />
              <h2>Titles Released in {releaseItem.month} {releaseItem.year} ({filteredItems.length})</h2>
            </div>
          </div>

          <div className="grid-movies">
            {filteredItems.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie}
                onSelect={(m) => onNavigate(m.filename ? m.filename.replace(/\.html$/, '') : `movie/${m.id}`)}
                onPlayTrailer={onPlayTrailer}
                isBookmarked={bookmarks.some(b => b.id === movie.id)}
                onToggleBookmark={onToggleBookmark || (() => {})}
              />
            ))}
          </div>
        </div>

        {/* PROMINENT BOTTOM SHARE BAR */}
        <ShareBar
          title={releaseItem.title}
          type="releases"
          year={releaseItem.year}
        />
      </div>
    </div>
  );
}
