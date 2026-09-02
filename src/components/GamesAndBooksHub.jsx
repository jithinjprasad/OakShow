import React, { useState, useEffect, useMemo } from 'react';
import { Gamepad2, Book, Play, ExternalLink, Sparkles, Monitor, Layers, ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';

export default function GamesAndBooksHub({ games = [], books = [], onNavigate, initialTab = 'games' }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'games');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title-asc, title-desc

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleGameClick = (g) => {
    const slug = g.moreLink ? g.moreLink.replace('.html', '') : (g.title ? g.title.replace(/[^a-zA-Z0-9]/g, '') : 'game');
    if (onNavigate) onNavigate(`game/${slug}`);
  };

  const handleBookClick = (b) => {
    const slug = b.id || (b.title ? b.title.replace(/[^a-zA-Z0-9]/g, '') : 'book');
    if (onNavigate) onNavigate(`book/${slug}`);
  };

  // Filtered & sorted games
  const filteredGames = useMemo(() => {
    let list = (games || []).filter(g => {
      const q = searchQuery.toLowerCase();
      return !q ||
        g.title?.toLowerCase().includes(q) ||
        g.genre?.toLowerCase().includes(q) ||
        g.platform?.toLowerCase().includes(q) ||
        g.developer?.toLowerCase().includes(q);
    });

    list.sort((a, b) => {
      if (sortBy === 'oldest') {
        const yrA = parseInt(a.releaseDate, 10) || 9999;
        const yrB = parseInt(b.releaseDate, 10) || 9999;
        if (yrA !== yrB) return yrA - yrB;
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      // default: newest
      const yrA = parseInt(a.releaseDate, 10) || 0;
      const yrB = parseInt(b.releaseDate, 10) || 0;
      if (yrB !== yrA) return yrB - yrA;
      return (a.title || '').localeCompare(b.title || '');
    });

    return list;
  }, [games, searchQuery, sortBy]);

  // Filtered & sorted books
  const filteredBooks = useMemo(() => {
    let list = (books || []).filter(b => {
      const q = searchQuery.toLowerCase();
      return !q ||
        b.title?.toLowerCase().includes(q) ||
        b.genre?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q);
    });

    list.sort((a, b) => {
      if (sortBy === 'oldest') {
        const yrA = parseInt(b.releaseDate, 10) || 9999;
        const yrB = parseInt(b.releaseDate, 10) || 9999;
        if (yrA !== yrB) return yrA - yrB;
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      // default: newest
      const yrA = parseInt(a.releaseDate, 10) || 0;
      const yrB = parseInt(b.releaseDate, 10) || 0;
      if (yrB !== yrA) return yrB - yrA;
      return (a.title || '').localeCompare(b.title || '');
    });

    return list;
  }, [books, searchQuery, sortBy]);

  return (
    <div className="games-books-root">
      <div className="games-books-banner">
        <div className="badge badge-cyan">
          <Sparkles size={14} />
          INTERACTIVE ENTERTAINMENT & LITERATURE
        </div>
        <h2 className="main-heading">Video Games & Literature</h2>
        <p className="subtext">
          Explore critically acclaimed games across PlayStation, Xbox, PC & Mobile, alongside notable book summaries.
        </p>

        <div className="switch-tabs">
          <button
            className={`tab-btn ${activeTab === 'games' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            <Gamepad2 size={16} />
            <span>Video Games ({games?.length || 0})</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'books' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            <Book size={16} />
            <span>Books ({books?.length || 0})</span>
          </button>
        </div>

        {/* Search & Sort Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', flex: '1 1 240px', maxWidth: '400px' }}>
            <Search size={16} className="text-muted" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'games' ? 'games by title, genre, developer...' : 'books by title, author, genre...'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={14} /></button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} className="text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="critic-sort-dropdown"
              style={{ padding: '7px 14px', borderRadius: '8px', background: 'rgba(20,20,28,0.85)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
            >
              <option value="newest">Latest Releases (Newest First) (Default)</option>
              <option value="oldest">Earliest Releases (Oldest First)</option>
              <option value="title-asc">Title (A to Z)</option>
              <option value="title-desc">Title (Z to A)</option>
            </select>
          </div>
        </div>
      </div>

      {activeTab === 'games' && (
        <div className="items-grid">
          {filteredGames.map((g, idx) => {
            const posterSrc = g.poster ? (g.poster.startsWith('/') ? g.poster : `/${g.poster}`) : null;
            return (
              <div
                key={idx}
                className="gb-card glass-card clickable"
                onClick={() => handleGameClick(g)}
              >
                <div className="gb-poster-wrap">
                  {posterSrc ? (
                    <img src={posterSrc} alt={g.title} className="gb-poster-img" onError={(e) => { e.target.src = '/favicon.png'; }} />
                  ) : (
                    <div className="gb-fallback"><Gamepad2 size={40} /></div>
                  )}
                  {g.platform && <span className="gb-platform-pill">{g.platform}</span>}
                </div>

                <div className="gb-content">
                  <h3 className="gb-title">{g.title}</h3>
                  <div className="gb-meta-tags">
                    {g.genre && <span className="badge badge-gold">{g.genre}</span>}
                    {g.releaseDate && <span className="badge badge-cyan">{g.releaseDate}</span>}
                  </div>

                  {g.developer && <p className="gb-detail-line"><strong>Developer:</strong> {g.developer}</p>}
                  {g.publisher && <p className="gb-detail-line"><strong>Publisher:</strong> {g.publisher}</p>}

                  <div className="gb-actions">
                    <button className="btn btn-secondary btn-sm">
                      <span>View Game Hub & Share</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'books' && (
        <div className="items-grid">
          {filteredBooks.map((b, idx) => {
            const posterSrc = b.poster ? (b.poster.startsWith('/') ? b.poster : `/${b.poster}`) : null;
            return (
              <div
                key={idx}
                className="gb-card glass-card clickable"
                onClick={() => handleBookClick(b)}
              >
                <div className="gb-poster-wrap">
                  {posterSrc ? (
                    <img src={posterSrc} alt={b.title} className="gb-poster-img" onError={(e) => { e.target.src = '/favicon.png'; }} />
                  ) : (
                    <div className="gb-fallback"><Book size={40} /></div>
                  )}
                </div>

                <div className="gb-content">
                  <h3 className="gb-title">{b.title}</h3>
                  <div className="gb-meta-tags">
                    {b.genre && <span className="badge badge-emerald">{b.genre}</span>}
                    {b.releaseDate && <span className="badge badge-dark">{b.releaseDate}</span>}
                  </div>

                  {b.author && <p className="gb-detail-line"><strong>Author:</strong> {b.author}</p>}
                  {b.description && (
                    <p className="gb-synopsis">{b.description.slice(0, 140)}...</p>
                  )}

                  <div className="gb-actions">
                    <button className="btn btn-secondary btn-sm">
                      <span>View Book Details & Share</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}