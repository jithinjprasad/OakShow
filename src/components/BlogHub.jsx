import React, { useState, useMemo } from 'react';
import { BookOpen, User, Calendar, Tag, ArrowRight, X, Sparkles, ExternalLink, Share2, Search, SlidersHorizontal } from 'lucide-react';

export default function BlogHub({ blogsData = [], onNavigate, initialBlogId = null }) {
  const [selectedBlog, setSelectedBlog] = useState(() => {
    if (initialBlogId) {
      const clean = String(initialBlogId).toLowerCase().replace(/\.html$/, '');
      return (blogsData || []).find(b => 
        b.id?.toLowerCase() === clean || 
        b.link?.toLowerCase().replace(/\.html$/, '').includes(clean)
      ) || null;
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    (blogsData || []).forEach(b => {
      if (b.category) cats.add(b.category);
    });
    return Array.from(cats);
  }, [blogsData]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return (blogsData || []).filter(b => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        b.title?.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.content?.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [blogsData, searchQuery, selectedCategory]);

  return (
    <div className="blog-hub-root tab-view animate-fade-in">
      {/* Hero Header Banner */}
      <div className="blog-hero-banner glass-panel">
        <div className="blog-hero-badge-row">
          <div className="badge badge-gold">
            <Sparkles size={14} />
            <span>OAKSHOW EDITORIAL BLOG & SPECIAL ESSAYS</span>
          </div>
          <span className="blog-count-pill">{blogsData?.length || 0} Curated Articles</span>
        </div>
        <h1 className="blog-main-heading">Cinema Perspectives & Editorial Blogs</h1>
        <p className="blog-subtext">
          In-depth cinema features, director retrospectives, movie recommendations, and reflections on entertainment culture.
        </p>

        {/* Search & Category Filter Row */}
        <div className="blog-controls-row">
          <div className="blog-search-box">
            <Search size={16} className="blog-search-icon" />
            <input 
              type="text"
              placeholder="Search essays by title, topic, director or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button className="blog-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear Search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="blog-category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Cards Grid */}
      <div className="blogs-grid">
        {filteredBlogs.map((blog) => {
          const imgSrc = blog.image ? (blog.image.startsWith('/') ? blog.image : `/${blog.image}`) : '/favicon.png';

          return (
            <article 
              key={blog.id} 
              className="blog-card glass-card clickable"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="blog-cover-wrap">
                <img 
                  src={imgSrc} 
                  alt={blog.title} 
                  className="blog-cover-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
                <div className="blog-cover-gradient" />
                {blog.category && <span className="blog-category-badge">{blog.category}</span>}
              </div>

              <div className="blog-card-content">
                <div className="blog-meta-line">
                  <span className="blog-author"><User size={13} className="inline-icon" /> {blog.author}</span>
                  <span className="blog-date"><Calendar size={13} className="inline-icon" /> {blog.date}</span>
                </div>

                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>

                <div className="blog-card-footer">
                  <span className="blog-read-btn">
                    <span>Read Full Essay</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="blog-empty-state glass-panel">
          <BookOpen size={42} className="blog-empty-icon" />
          <h3>No essays found</h3>
          <p>Try resetting your search query or selecting a different category.</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Full Article Reader Modal */}
      {selectedBlog && (
        <div className="reader-modal-backdrop animate-fade-in" onClick={() => setSelectedBlog(null)}>
          <div className="reader-modal-dialog glass-panel" onClick={e => e.stopPropagation()}>
            <button className="reader-close-btn" onClick={() => setSelectedBlog(null)} aria-label="Close">
              <X size={20} />
            </button>

            <div className="reader-header">
              <span className="badge badge-gold">{selectedBlog.category}</span>
              <h2 className="reader-title">{selectedBlog.title}</h2>
              <div className="reader-byline">
                <span>By <strong>{selectedBlog.author}</strong></span>
                <span className="reader-dot">•</span>
                <span><Calendar size={13} className="inline-icon" /> {selectedBlog.date}</span>
              </div>
            </div>

            {selectedBlog.image && (
              <div className="reader-banner-wrap">
                <img 
                  src={selectedBlog.image.startsWith('/') ? selectedBlog.image : `/${selectedBlog.image}`} 
                  alt={selectedBlog.title} 
                  className="reader-banner-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            <div className="reader-body">
              {selectedBlog.excerpt && <p className="reader-lead">{selectedBlog.excerpt}</p>}
              <div className="reader-text">
                {(selectedBlog.content || '').split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="reader-footer">
              {selectedBlog.link && (
                <a 
                  href={selectedBlog.link.startsWith('/') ? selectedBlog.link : `/${selectedBlog.link}`}
                  className="btn btn-gold"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={14} />
                  <span>Open Full Legacy Article</span>
                </a>
              )}
              {selectedBlog.authorLink && onNavigate && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    const cleanNav = selectedBlog.authorLink.replace('#/', '');
                    setSelectedBlog(null);
                    onNavigate(cleanNav);
                  }}
                >
                  <User size={14} />
                  <span>View Author / Hub</span>
                </button>
              )}
              <button className="btn btn-primary" onClick={() => setSelectedBlog(null)}>
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Scoped Styles for Desktop and Mobile */}
      <style>{`
        .blog-hub-root {
          padding-top: 10px;
          padding-bottom: 70px;
        }
        .blog-hero-banner {
          padding: 28px 32px;
          margin: 16px 0 28px;
          border-radius: var(--radius-lg, 16px);
          background: linear-gradient(135deg, rgba(20, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }
        .blog-hero-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }
        .blog-count-pill {
          font-size: 0.78rem;
          font-weight: 700;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 4px 12px;
          border-radius: 9999px;
          letter-spacing: 0.3px;
        }
        .blog-main-heading {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .blog-subtext {
          font-size: 0.95rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.6;
          max-width: 820px;
          margin-bottom: 20px;
        }
        .blog-controls-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .blog-search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1 1 260px;
          max-width: 420px;
          background: rgba(10, 14, 26, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .blog-search-box:focus-within {
          border-color: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
        }
        .blog-search-icon {
          color: #94a3b8;
          margin-right: 8px;
          flex-shrink: 0;
        }
        .blog-search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.9rem;
          padding: 10px 0;
        }
        .blog-search-input::placeholder {
          color: #64748b;
        }
        .blog-search-clear {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .blog-category-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .blog-cat-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .blog-cat-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .blog-cat-btn.active {
          background: #f59e0b;
          color: #000000;
          border-color: #f59e0b;
          font-weight: 700;
        }

        /* 2. Grid & Cards */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
          margin-top: 10px;
        }
        .blog-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.15);
        }
        .blog-cover-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0b0f19;
        }
        .blog-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .blog-card:hover .blog-cover-img {
          transform: scale(1.04);
        }
        .blog-cover-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(18, 24, 38, 0.95) 100%);
          pointer-events: none;
        }
        .blog-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10, 14, 26, 0.85);
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(251, 191, 36, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .blog-card-content {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .blog-meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        .blog-author, .blog-date {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .blog-card-title {
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
        .blog-excerpt {
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
        .blog-card-footer {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .blog-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #f59e0b;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .blog-card:hover .blog-read-btn {
          color: #fbbf24;
          gap: 12px;
        }
        .blog-empty-state {
          text-align: center;
          padding: 60px 20px;
          border-radius: 16px;
          margin-top: 20px;
        }
        .blog-empty-icon {
          color: #64748b;
          margin-bottom: 14px;
        }

        /* 3. Reader Modal */
        .reader-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .reader-modal-dialog {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 20px;
          background: #0e1320;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.1);
          padding: 32px;
          color: #e2e8f0;
          -webkit-overflow-scrolling: touch;
        }
        .reader-close-btn {
          position: sticky;
          top: 0;
          float: right;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .reader-close-btn:hover {
          background: rgba(239, 68, 68, 0.8);
          transform: rotate(90deg);
        }
        .reader-header {
          margin-bottom: 20px;
          padding-right: 48px;
        }
        .reader-title {
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 12px 0 8px;
          line-height: 1.3;
        }
        .reader-byline {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #94a3b8;
          flex-wrap: wrap;
        }
        .reader-dot {
          color: #64748b;
        }
        .reader-banner-wrap {
          margin: 16px 0 24px;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          max-height: 360px;
        }
        .reader-banner-img {
          width: 100%;
          height: 100%;
          max-height: 360px;
          object-fit: cover;
          display: block;
        }
        .reader-body {
          margin-bottom: 28px;
        }
        .reader-lead {
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.65;
          color: #f8fafc;
          margin-bottom: 18px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .reader-text p {
          font-size: 0.98rem;
          line-height: 1.75;
          color: #cbd5e1;
          margin-bottom: 16px;
        }
        .reader-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
        }

        /* Responsive Mobile Breakpoint */
        @media (max-width: 640px) {
          .blog-hero-banner {
            padding: 20px 16px;
            margin: 10px 0 18px;
          }
          .blog-controls-row {
            flex-direction: column;
            align-items: stretch;
          }
          .blog-search-box {
            max-width: 100%;
          }
          .blog-category-chips {
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            flex-wrap: nowrap;
          }
          .blog-category-chips::-webkit-scrollbar {
            display: none;
          }
          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .reader-modal-dialog {
            padding: 20px 16px;
            max-height: 94vh;
            border-radius: 16px;
          }
          .reader-header {
            padding-right: 36px;
          }
          .reader-footer {
            flex-direction: column;
            align-items: stretch;
          }
          .reader-footer .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

