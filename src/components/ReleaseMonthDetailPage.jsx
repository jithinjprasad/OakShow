import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Share2, 
  ChevronRight, 
  ArrowLeft, 
  Filter, 
  Film,
  Globe,
  Clapperboard,
  Play,
  Sparkles
} from 'lucide-react';
import ShareBar from './ShareBar';

export default function ReleaseMonthDetailPage({ 
  releaseItem, 
  onNavigate 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterLang, setFilterLang] = useState('All');

  if (!releaseItem) return null;

  const items = releaseItem.items || [];

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

  const filteredItems = useMemo(() => {
    return items.filter(it => {
      const matchCat = selectedCategory === 'All' || it.category === selectedCategory;
      const matchLang = filterLang === 'All' || (it.language && it.language.toLowerCase().includes(filterLang.toLowerCase()));
      return matchCat && matchLang;
    });
  }, [items, selectedCategory, filterLang]);

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

      {/* Header Banner */}
      <section className="release-month-banner">
        <div className="container">
          <div className="rmb-content">
            <div className="badge badge-cyan">{releaseItem.category || 'Cinema Releases'} • {releaseItem.year}</div>
            <h1 className="rmb-title">{releaseItem.title}</h1>
            <p className="rmb-subtitle">
              Comprehensive release schedule, posters, and review links for <strong>{releaseItem.month} {releaseItem.year}</strong> ({items.length} titles)
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
            {filteredItems.map((item, idx) => {
              const posterSrc = item.poster ? (item.poster.startsWith('/') ? item.poster : `/${item.poster}`) : null;
              const targetSlug = item.moreLink ? item.moreLink.replace('.html', '').replace(/^.*\//, '') : item.title.replace(/[^a-zA-Z0-9]/g, '');

              return (
                <div 
                  key={idx} 
                  className="movie-card-root"
                  onClick={() => {
                    if (targetSlug) onNavigate(`movie/${targetSlug}`);
                  }}
                >
                  <div className="poster-container">
                    {posterSrc ? (
                      <img src={posterSrc} alt={item.title} className="poster-image poster-loaded" loading="lazy" />
                    ) : (
                      <div className="poster-fallback"><Film size={36} /></div>
                    )}
                    
                    {/* Category badge */}
                    {item.category && (
                      <div className="card-top-badges">
                        <span className={`badge ${item.category === 'Hollywood' ? 'badge-red' : item.category === 'International' ? 'badge-cyan' : 'badge-gold'}`}>
                          {item.category}
                        </span>
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

                    <h4 className="card-title" title={item.title}>{item.title}</h4>
                    {item.releaseDate && (
                      <span className="card-tag" style={{ marginTop: '4px' }}>
                        <Calendar size={11} /> {item.releaseDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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
