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
    </div>
  );
}
