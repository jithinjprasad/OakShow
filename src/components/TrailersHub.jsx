import React, { useState } from 'react';
import { Play, Film, Search, Sparkles, Clapperboard, Video, ArrowRight, ExternalLink } from 'lucide-react';

export default function TrailersHub({ trailersData, onPlayVideo, onSelectMovie }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Flatten & format trailers
  const formattedTrailers = (trailersData || []).flatMap((item) => {
    if (item.videos && item.videos.length > 0) {
      return item.videos.map((vid, idx) => ({
        id: `${item.id}-${idx}`,
        title: vid.title || item.title,
        youtubeId: vid.youtubeId || (vid.url?.includes('v=') ? vid.url.split('v=')[1]?.split('&')[0] : null),
        relatedMovie: item.relatedMovie || item.id,
        filename: item.filename,
        raw: vid
      }));
    }
    return [{
      id: item.id,
      title: item.title,
      youtubeId: item.youtubeId || (item.url?.includes('v=') ? item.url.split('v=')[1]?.split('&')[0] : null),
      relatedMovie: item.relatedMovie || item.id,
      filename: item.filename,
      raw: item
    }];
  }).filter(t => t.youtubeId);

  // Filter trailers
  const filteredTrailers = formattedTrailers.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.relatedMovie && t.relatedMovie.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="trailers-hub-root tab-view animate-fade-in">
      <div className="trailers-hero-banner glass-panel">
        <div className="badge badge-red">
          <Clapperboard size={14} />
          <span>OFFICIAL VIDEO VAULT & TRAILERS</span>
        </div>
        <h2 className="trailers-main-title">Trending Movie & Series Trailers</h2>
        <p className="trailers-subtitle">
          Watch high-definition teasers, official trailer launches, sneak peeks, and viral clips directly inside OakShow.
        </p>

        {/* Search Bar */}
        <div className="trailers-search-bar">
          <Search size={18} className="trailers-search-icon" />
          <input 
            type="text"
            placeholder="Search by movie title, series or trailer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="trailers-search-input"
          />
          {searchQuery && (
            <button className="trailers-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Featured Highlight Reel */}
      {filteredTrailers.length > 0 && (
        <div className="trailers-spotlight-box glass-panel">
          <div className="tsb-video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${filteredTrailers[0].youtubeId}?rel=0`}
              title={filteredTrailers[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="tsb-iframe"
            />
          </div>
          <div className="tsb-info">
            <span className="badge badge-gold">SPOTLIGHT TRAILER</span>
            <h3 className="tsb-title">{filteredTrailers[0].title}</h3>
            <p className="tsb-desc">Click below to explore full details and ratings for this title on OakShow.</p>
            {filteredTrailers[0].relatedMovie && (
              <button 
                className="btn btn-secondary tsb-action-btn"
                onClick={() => onSelectMovie && onSelectMovie(filteredTrailers[0].relatedMovie)}
              >
                <span>View Title Details</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Trailers Grid */}
      <div className="trailers-grid-section">
        <div className="section-header">
          <div className="section-title-group">
            <Video size={20} className="text-gold" />
            <h3>Trailers Archive ({filteredTrailers.length})</h3>
          </div>
        </div>

        {filteredTrailers.length > 0 ? (
          <div className="trailers-cards-grid">
            {filteredTrailers.slice(0, 48).map((t) => (
              <div 
                key={t.id} 
                className="trailer-card glass-card clickable"
                onClick={() => onPlayVideo && onPlayVideo(t.youtubeId, t.title)}
              >
                <div className="trailer-thumbnail-wrap">
                  <img 
                    src={`https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`} 
                    alt={t.title} 
                    className="trailer-thumb-img"
                    loading="lazy"
                  />
                  <div className="trailer-play-overlay">
                    <div className="play-icon-circle">
                      <Play size={22} fill="#ffffff" color="#ffffff" />
                    </div>
                  </div>
                </div>

                <div className="trailer-card-body">
                  <h4 className="trailer-card-title">{t.title}</h4>
                  <div className="trailer-card-footer">
                    <span className="trailer-provider-badge">YouTube HD</span>
                    {t.relatedMovie && (
                      <button 
                        className="trailer-movie-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectMovie) onSelectMovie(t.relatedMovie);
                        }}
                      >
                        <span>Movie Hub</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="trailers-empty-state glass-panel">
            <Clapperboard size={42} className="trailers-empty-icon" />
            <h3>No trailers match your search</h3>
            <p>Try searching for a different movie title or reset your search query.</p>
            <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        )}
      </div>

      {/* Dedicated Scoped Styles for Trailers Hub */}
      <style>{`
        .trailers-hub-root {
          padding-top: 10px;
          padding-bottom: 70px;
        }

        /* 1. Header Banner */
        .trailers-hero-banner {
          padding: 28px 32px;
          margin: 16px 0 28px;
          border-radius: var(--radius-lg, 16px);
          background: linear-gradient(135deg, rgba(20, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }
        .trailers-main-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 12px 0 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .trailers-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.6;
          max-width: 840px;
          margin-bottom: 22px;
        }
        .trailers-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 520px;
          background: rgba(10, 14, 26, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .trailers-search-bar:focus-within {
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }
        .trailers-search-icon {
          color: #94a3b8;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .trailers-search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.92rem;
          padding: 12px 0;
        }
        .trailers-search-input::placeholder {
          color: #64748b;
        }
        .trailers-clear-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        /* 2. Spotlight Box */
        .trailers-spotlight-box {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          padding: 24px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(24, 18, 30, 0.85) 0%, rgba(15, 23, 42, 0.85) 100%);
          border: 1px solid rgba(239, 68, 68, 0.25);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(239, 68, 68, 0.08);
          margin-bottom: 32px;
          align-items: center;
        }
        .tsb-video-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        }
        .tsb-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .tsb-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .tsb-title {
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
        }
        .tsb-desc {
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
        }
        .tsb-action-btn {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* 3. Trailers Archive Grid */
        .trailers-grid-section {
          margin-top: 16px;
        }
        .section-header {
          margin-bottom: 20px;
        }
        .section-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-title-group h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .trailers-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .trailer-card {
          display: flex;
          flex-direction: column;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .trailer-card:hover {
          transform: translateY(-4px);
          border-color: rgba(239, 68, 68, 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(239, 68, 68, 0.15);
        }
        .trailer-thumbnail-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0b0f19;
        }
        .trailer-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .trailer-card:hover .trailer-thumb-img {
          transform: scale(1.05);
        }
        .trailer-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .trailer-card:hover .trailer-play-overlay {
          background: rgba(0, 0, 0, 0.15);
        }
        .play-icon-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.5);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .trailer-card:hover .play-icon-circle {
          transform: scale(1.12);
          background: #ef4444;
        }
        .trailer-card-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .trailer-card-title {
          font-size: 0.96rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.4;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .trailer-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .trailer-provider-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .trailer-movie-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .trailer-movie-link:hover {
          color: #ffffff;
        }
        .trailers-empty-state {
          text-align: center;
          padding: 60px 20px;
          border-radius: 16px;
          margin-top: 20px;
        }
        .trailers-empty-icon {
          color: #64748b;
          margin-bottom: 14px;
        }

        /* Mobile Breakpoints */
        @media (max-width: 768px) {
          .trailers-spotlight-box {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 18px;
          }
          .tsb-info {
            width: 100%;
          }
          .tsb-action-btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .trailers-hero-banner {
            padding: 20px 16px;
            margin: 10px 0 18px;
          }
          .trailers-search-bar {
            max-width: 100%;
          }
          .trailers-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .trailer-card-body {
            padding: 10px 12px 12px;
          }
          .trailer-card-title {
            font-size: 0.85rem;
            line-height: 1.35;
            margin-bottom: 8px;
          }
          .play-icon-circle {
            width: 38px;
            height: 38px;
          }
        }
        @media (max-width: 420px) {
          .trailers-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

