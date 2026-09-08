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
        <div className="gb-controls-bar">
          <div className="gb-search-wrap">
            <Search size={16} className="gb-search-icon" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'games' ? 'games by title, genre, developer...' : 'books by title, author, genre...'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gb-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="gb-clear-btn" aria-label="Clear Search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="gb-sort-wrap">
            <SlidersHorizontal size={16} className="text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="gb-sort-dropdown"
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
        <>
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
                      <img src={posterSrc} alt={g.title} className="gb-poster-img" loading="lazy" onError={(e) => { e.target.src = '/favicon.png'; }} />
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
                      <button className="btn btn-secondary btn-sm gb-action-btn">
                        <span>View Game Hub & Share</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredGames.length === 0 && (
            <div className="gb-empty-state glass-panel">
              <Gamepad2 size={42} className="gb-empty-icon" />
              <h3>No games match your search</h3>
              <p>Try searching by different title or clearing the search bar.</p>
              <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          )}
        </>
      )}

      {activeTab === 'books' && (
        <>
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
                      <img src={posterSrc} alt={b.title} className="gb-poster-img" loading="lazy" onError={(e) => { e.target.src = '/favicon.png'; }} />
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
                      <button className="btn btn-secondary btn-sm gb-action-btn">
                        <span>View Book Details & Share</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredBooks.length === 0 && (
            <div className="gb-empty-state glass-panel">
              <Book size={42} className="gb-empty-icon" />
              <h3>No books match your search</h3>
              <p>Try searching by different title or author.</p>
              <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          )}
        </>
      )}

      {/* Dedicated Scoped Styles for Games & Books Hub */}
      <style>{`
        .games-books-root {
          padding-top: 10px;
          padding-bottom: 70px;
        }

        /* 1. Header Banner */
        .games-books-banner {
          padding: 28px 32px;
          margin: 16px 0 28px;
          border-radius: var(--radius-lg, 16px);
          background: linear-gradient(135deg, rgba(20, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }
        .games-books-banner .main-heading {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 12px 0 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .games-books-banner .subtext {
          font-size: 0.95rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.6;
          max-width: 840px;
          margin-bottom: 22px;
        }

        /* Switch Tabs */
        .switch-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .switch-tabs::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .tab-btn-active {
          background: #06b6d4;
          color: #000000;
          border-color: #06b6d4;
          font-weight: 700;
        }

        /* Controls Bar */
        .gb-controls-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .gb-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1 1 280px;
          max-width: 440px;
          background: rgba(10, 14, 26, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .gb-search-wrap:focus-within {
          border-color: #06b6d4;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
        }
        .gb-search-icon {
          color: #94a3b8;
          margin-right: 8px;
          flex-shrink: 0;
        }
        .gb-search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.9rem;
          padding: 10px 0;
        }
        .gb-search-input::placeholder {
          color: #64748b;
        }
        .gb-clear-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }
        .gb-sort-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .gb-sort-dropdown {
          background: rgba(10, 14, 26, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        /* 2. Grid & Cards */
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
          margin-top: 10px;
        }
        .gb-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .gb-card:hover {
          transform: translateY(-4px);
          border-color: rgba(6, 182, 212, 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.15);
        }
        .gb-poster-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0b0f19;
        }
        .gb-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gb-card:hover .gb-poster-img {
          transform: scale(1.04);
        }
        .gb-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          background: rgba(15, 23, 42, 0.9);
        }
        .gb-platform-pill {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10, 14, 26, 0.88);
          color: #38bdf8;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .gb-content {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .gb-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.4;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gb-meta-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .gb-detail-line {
          font-size: 0.84rem;
          color: #cbd5e1;
          margin: 0 0 6px;
        }
        .gb-detail-line strong {
          color: #94a3b8;
        }
        .gb-synopsis {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 6px 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .gb-actions {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .gb-action-btn {
          width: 100%;
          justify-content: center;
          gap: 8px;
        }
        .gb-empty-state {
          text-align: center;
          padding: 60px 20px;
          border-radius: 16px;
          margin-top: 20px;
        }
        .gb-empty-icon {
          color: #64748b;
          margin-bottom: 14px;
        }

        /* Mobile Breakpoints */
        @media (max-width: 640px) {
          .games-books-banner {
            padding: 20px 16px;
            margin: 10px 0 18px;
          }
          .switch-tabs {
            width: 100%;
          }
          .tab-btn {
            flex: 1;
            justify-content: center;
            padding: 9px 12px;
            font-size: 0.82rem;
          }
          .gb-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .gb-search-wrap {
            max-width: 100%;
          }
          .gb-sort-dropdown {
            width: 100%;
          }
          .items-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}