import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  X, 
  TrendingUp, 
  Filter, 
  SlidersHorizontal,
  Share2,
  Clock,
  ChevronDown
} from 'lucide-react';

export default function NewsHub({ news = [], onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeReport, setActiveReport] = useState(null);

  const categories = [
    { id: 'All', label: 'All Bulletins & Reports' },
    { id: 'Current Affairs', label: 'Current Affairs' },
    { id: 'Monthly Wrap-ups', label: 'Monthly Archives' },
    { id: 'Weekly Bulletins', label: 'Weekly Reports' },
    { id: 'Cinema Reports', label: 'Cinema & Box Office' }
  ];

  const filteredNews = useMemo(() => {
    let list = (news || []).filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.summary && item.summary.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.date && item.date.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Current Affairs') {
        return (item.category && item.category.toLowerCase().includes('current affairs')) || item.title?.toLowerCase().includes('current affairs');
      }
      if (selectedCategory === 'Monthly Wrap-ups') {
        return item.title?.toLowerCase().includes('january') || 
               item.title?.toLowerCase().includes('december') || 
               item.link?.includes('january-') || 
               item.link?.includes('december-');
      }
      if (selectedCategory === 'Weekly Bulletins') {
        return item.title?.toLowerCase().includes('from') || item.link?.includes('-to-') || item.title?.includes('-');
      }
      if (selectedCategory === 'Cinema Reports') {
        return (item.category && item.category.toLowerCase().includes('cinema')) || item.title?.toLowerCase().includes('cinema') || item.title?.toLowerCase().includes('movie');
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = a.date ? new Date(a.date.split('-').reverse().join('-')).getTime() : 0;
        const dateB = b.date ? new Date(b.date.split('-').reverse().join('-')).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'oldest') {
        const dateA = a.date ? new Date(a.date.split('-').reverse().join('-')).getTime() : 0;
        const dateB = b.date ? new Date(b.date.split('-').reverse().join('-')).getTime() : 0;
        return dateA - dateB;
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      return (a.title || '').localeCompare(b.title || '');
    });

    return list;
  }, [news, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="news-hub-root tab-view animate-fade-in">
      {/* Hero Header Banner */}
      <div className="news-hub-banner glass-panel">
        <div className="badge badge-gold">
          <Newspaper size={14} />
          <span>OAKSHOW NEWSROOM & ARCHIVE VAULT</span>
        </div>
        <h1 className="news-main-heading">OakShow News & Current Affairs Reports</h1>
        <p className="news-subtext">
          Curated cinema headlines, box office milestones, and weekly current affairs summaries (100% genuine information from verified sources).
        </p>

        {/* Quick Stats Bar */}
        <div className="news-metrics-strip">
          <div className="news-metric-pill">
            <span className="nmp-num">{news.length}</span>
            <span className="nmp-lbl">Total Archived Bulletins</span>
          </div>
          <div className="news-metric-pill">
            <span className="nmp-num">100%</span>
            <span className="nmp-lbl">Fact-Checked Sources</span>
          </div>
          <div className="news-metric-pill">
            <span className="nmp-num">Weekly & Monthly</span>
            <span className="nmp-lbl">Chronological Coverage</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="news-controls-bar">
          <div className="news-search-bar">
            <Search size={18} className="text-muted" />
            <input 
              type="text"
              placeholder="Search reports by headline, month, or keyword (e.g. September 2019, January 2020)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              className="news-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="news-sort-selector">
            <SlidersHorizontal size={16} className="text-muted" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Latest Date (Newest First) (Default)</option>
              <option value="oldest">Oldest Date (Earliest First)</option>
              <option value="title-asc">Headline (A to Z)</option>
              <option value="title-desc">Headline (Z to A)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="news-categories-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`news-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(12);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of News Cards */}
      <div className="news-grid">
        {filteredNews.slice(0, visibleCount).map((item, idx) => {
          const imgSrc = item.image ? (item.image.startsWith('/') ? item.image : `/${item.image}`) : '/favicon.png';

          return (
            <article 
              key={item.id || idx} 
              className="news-card glass-card clickable"
              onClick={() => setActiveReport(item)}
            >
              <div className="news-img-wrap">
                <img 
                  src={imgSrc} 
                  alt={item.title} 
                  className="news-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
                <span className="news-badge">{item.category || 'Current Affairs'}</span>
              </div>

              <div className="news-content">
                <div className="news-meta-row">
                  <span className="news-date"><Calendar size={12} className="inline-icon" /> {item.date}</span>
                  <span className="news-author"><User size={12} className="inline-icon" /> {item.author || 'OakShow Editorial'}</span>
                </div>

                <h3 className="news-title">{item.title}</h3>
                {item.summary && <p className="news-excerpt">{item.summary}</p>}

                <div className="news-card-footer">
                  <button className="news-read-btn" onClick={(e) => { e.stopPropagation(); setActiveReport(item); }}>
                    <span>Read Full Report</span>
                    <ArrowRight size={13} />
                  </button>
                  {item.link && (
                    <a
                      href={item.link.startsWith('http') ? item.link : `/${item.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="news-external-link"
                      onClick={(e) => e.stopPropagation()}
                      title="Open Original Source / Page"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredNews.length === 0 && (
        <div className="empty-state-panel glass-panel text-center">
          <Newspaper size={48} className="text-muted mb-3" />
          <h3>No reports matching "{searchQuery}"</h3>
          <p className="text-muted">Try a different keyword or reset filters.</p>
          <button className="btn btn-secondary mt-3" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Reset Filters
          </button>
        </div>
      )}

      {visibleCount < filteredNews.length && (
        <div className="load-more-wrap text-center mt-4">
          <button 
            className="btn btn-secondary load-more-btn"
            onClick={() => setVisibleCount(prev => prev + 12)}
          >
            <span>Load More Reports ({filteredNews.length - visibleCount} remaining)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* Interactive Report Reader Modal */}
      {activeReport && (
        <div className="reader-modal-backdrop animate-fade-in" onClick={() => setActiveReport(null)}>
          <div className="reader-modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="reader-close-btn" onClick={() => setActiveReport(null)} aria-label="Close">
              <X size={22} />
            </button>

            <div className="reader-header">
              <span className="badge badge-gold">{activeReport.category || 'OakShow Report'}</span>
              <h2 className="reader-title">{activeReport.title}</h2>
              <div className="reader-byline">
                <span>By <strong>{activeReport.author || 'OakShow Editorial Team'}</strong></span>
                <span>•</span>
                <span><Calendar size={13} className="inline-icon" /> {activeReport.date}</span>
              </div>
            </div>

            {activeReport.image && (
              <div className="reader-banner-wrap">
                <img 
                  src={activeReport.image.startsWith('/') ? activeReport.image : `/${activeReport.image}`} 
                  alt={activeReport.title} 
                  className="reader-banner-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            <div className="reader-body">
              <p className="reader-lead">{activeReport.summary || activeReport.title}</p>
              
              <div className="reader-report-details">
                <p>
                  This official report was documented by the OakShow Editorial desk covering key entertainment breakthroughs, weekly headlines, box office milestones, and public affairs.
                </p>
                <p>
                  All reports are cataloged chronologically to maintain a complete history of entertainment and cinema records.
                </p>
              </div>

              {activeReport.link && (
                <div className="reader-source-box glass-card">
                  <h4>Original Bulletin Reference:</h4>
                  <a 
                    href={activeReport.link.startsWith('http') ? activeReport.link : `/${activeReport.link}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <span>View Archival File ({activeReport.link})</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>

            <div className="reader-footer">
              <button className="btn btn-primary" onClick={() => setActiveReport(null)}>
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Scoped Styles for News Hub */}
      <style>{`
        .news-hub-root {
          padding-top: 10px;
          padding-bottom: 70px;
        }

        /* 1. Header Banner */
        .news-hub-banner {
          padding: 28px 32px;
          margin: 16px 0 28px;
          border-radius: var(--radius-lg, 16px);
          background: linear-gradient(135deg, rgba(20, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }
        .news-main-heading {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 12px 0 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .news-subtext {
          font-size: 0.95rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.6;
          max-width: 840px;
          margin-bottom: 20px;
        }

        /* Metrics Strip */
        .news-metrics-strip {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }
        .news-metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nmp-num {
          font-size: 0.85rem;
          font-weight: 800;
          color: #f59e0b;
        }
        .nmp-lbl {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Controls Bar */
        .news-controls-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
        }
        .news-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1 1 280px;
          max-width: 480px;
          background: rgba(10, 14, 26, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .news-search-bar:focus-within {
          border-color: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
        }
        .news-search-bar .text-muted {
          margin-right: 8px;
          flex-shrink: 0;
        }
        .news-search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.9rem;
          padding: 10px 0;
        }
        .news-search-input::placeholder {
          color: #64748b;
        }
        .search-clear-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .news-sort-selector {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .news-sort-selector select {
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

        /* Category Tabs */
        .news-categories-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-top: 4px;
        }
        .news-categories-tabs::-webkit-scrollbar {
          display: none;
        }
        .news-cat-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .news-cat-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .news-cat-btn.active {
          background: #f59e0b;
          color: #000000;
          border-color: #f59e0b;
          font-weight: 700;
        }

        /* 2. News Grid & Cards */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
          margin-top: 8px;
        }
        .news-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .news-card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.15);
        }
        .news-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0b0f19;
        }
        .news-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .news-card:hover .news-img {
          transform: scale(1.04);
        }
        .news-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10, 14, 26, 0.88);
          color: #fbbf24;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(251, 191, 36, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .news-content {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .news-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        .news-date, .news-author {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .news-title {
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
        .news-excerpt {
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.55;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .news-card-footer {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .news-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          font-size: 0.85rem;
          font-weight: 600;
          color: #f59e0b;
          cursor: pointer;
          padding: 0;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .news-card:hover .news-read-btn {
          color: #fbbf24;
          gap: 11px;
        }
        .news-external-link {
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s ease;
        }
        .news-external-link:hover {
          color: #ffffff;
        }

        /* 3. Empty & Load More */
        .empty-state-panel {
          padding: 60px 20px;
          border-radius: 16px;
          margin-top: 20px;
        }
        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
        }

        /* 4. Reader Modal */
        .reader-report-details p {
          font-size: 0.96rem;
          line-height: 1.7;
          color: #cbd5e1;
          margin-bottom: 12px;
        }
        .reader-source-box {
          margin-top: 20px;
          padding: 16px 20px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .reader-source-box h4 {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0 0 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Mobile Breakpoints */
        @media (max-width: 640px) {
          .news-hub-banner {
            padding: 20px 16px;
            margin: 10px 0 18px;
          }
          .news-metrics-strip {
            gap: 8px;
          }
          .news-metric-pill {
            padding: 5px 10px;
            font-size: 0.75rem;
          }
          .news-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .news-search-bar {
            max-width: 100%;
          }
          .news-sort-selector select {
            width: 100%;
          }
          .news-categories-tabs {
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }
          .news-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .reader-modal-dialog {
            padding: 20px 16px;
            max-height: 94vh;
            border-radius: 16px;
          }
          .reader-banner-wrap {
            margin: -20px -16px 16px;
            max-height: 220px;
          }
        }
      `}</style>
    </div>
  );
}

