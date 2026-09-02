import React, { useState } from 'react';
import { BookOpen, User, Calendar, Tag, ArrowRight, X, Sparkles, ExternalLink, Share2 } from 'lucide-react';

export default function BlogHub({ blogsData, onNavigate }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="blog-hub-root tab-view animate-fade-in">
      <div className="blog-hero-banner glass-panel">
        <div className="badge badge-gold">
          <Sparkles size={14} />
          <span>OAKSHOW EDITORIAL BLOG & SPECIAL ESSAYS</span>
        </div>
        <h2 className="blog-main-heading">Cinema Perspectives & Editorial Blogs</h2>
        <p className="blog-subtext">
          In-depth cinema features, director retrospectives, movie recommendations, and reflections on entertainment culture.
        </p>
      </div>

      <div className="blogs-grid">
        {blogsData && blogsData.map((blog) => {
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
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
                <span className="blog-category-badge">{blog.category}</span>
              </div>

              <div className="blog-card-content">
                <div className="blog-meta-line">
                  <span className="blog-author"><User size={13} className="inline-icon" /> {blog.author}</span>
                  <span className="blog-date"><Calendar size={13} className="inline-icon" /> {blog.date}</span>
                </div>

                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>

                <div className="blog-card-footer">
                  <button className="blog-read-btn">
                    <span>Read Full Essay</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

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
                <span>•</span>
                <span>Published on {selectedBlog.date}</span>
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
              <p className="reader-lead">{selectedBlog.excerpt}</p>
              <div className="reader-text">
                {selectedBlog.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="reader-footer">
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
    </div>
  );
}
