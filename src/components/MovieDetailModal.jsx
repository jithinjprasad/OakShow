import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Star, 
  Play, 
  Bookmark, 
  Share2, 
  Ticket, 
  Music, 
  Film, 
  Users, 
  Clock, 
  Calendar, 
  Globe, 
  ChevronRight, 
  ExternalLink, 
  ThumbsUp, 
  Sparkles 
} from 'lucide-react';
import { getOakShowRemark, cleanRatingSource } from '../utils/remarks';

export default function MovieDetailModal({ 
  movie, 
  onClose, 
  onSelectSimilar, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, cast, videos, reviews
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (movie?.videos && movie.videos.length > 0) {
      setSelectedVideo(movie.videos[0]);
    } else {
      setSelectedVideo(null);
    }
    setActiveTab('overview');
  }, [movie]);

  if (!movie) return null;

  const posterSrc = movie.poster ? (movie.poster.startsWith('/') ? movie.poster : `/${movie.poster}`) : null;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = () => {
    onToggleBookmark(movie);
    if (!isBookmarked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffb800', '#e50914', '#ffffff']
      });
    }
  };

  return (
    <div className="detail-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="detail-modal-container" onClick={e => e.stopPropagation()}>
        {/* Backdrop Banner */}
        <div className="detail-hero-banner" style={{ backgroundImage: `url(${posterSrc || '/favicon.png'})` }}>
          <div className="detail-hero-gradient" />
          
          <button className="detail-close-btn" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>

          {/* Quick Header Details */}
          <div className="detail-header-content">
            <div className="detail-poster-wrap">
              {posterSrc ? (
                <img src={posterSrc} alt={movie.title} className="detail-poster-img" />
              ) : (
                <div className="detail-poster-fallback">
                  <Film size={40} />
                </div>
              )}
            </div>

            <div className="detail-header-info">
              <div className="detail-badges-row">
                {movie.type === 'series' && <span className="badge badge-red">TV Series</span>}
                {movie.language && <span className="badge badge-cyan">{movie.language}</span>}
                {movie.genre && <span className="badge badge-gold">{movie.genre}</span>}
              </div>

              <h2 className="detail-title">{movie.title}</h2>
              {movie.metaTitle && movie.metaTitle !== movie.title && (
                <p className="detail-subtitle text-muted text-sm">{movie.metaTitle}</p>
              )}

              <div className="detail-quick-meta">
                {movie.year && (
                  <span className="meta-item">
                    <Calendar size={14} />
                    {movie.year}
                  </span>
                )}
                {movie.duration && movie.duration !== 'N/A' && (
                  <span className="meta-item">
                    <Clock size={14} />
                    {movie.duration}
                  </span>
                )}
                {movie.director && (
                  <span className="meta-item">
                    <Users size={14} />
                    Dir: {movie.director}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="detail-actions-row">
                {movie.videos && movie.videos.length > 0 && (
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setSelectedVideo(movie.videos[0]);
                      setActiveTab('videos');
                    }}
                  >
                    <Play size={16} fill="#ffffff" />
                    <span>Watch Trailer ({movie.videos.length})</span>
                  </button>
                )}

                {movie.bookings && movie.bookings.length > 0 && (
                  <a 
                    href={movie.bookings[0].url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-gold"
                  >
                    <Ticket size={16} />
                    <span>Book Tickets</span>
                  </a>
                )}

                <button 
                  className={`btn-secondary ${isBookmarked ? 'btn-bookmarked' : ''}`}
                  onClick={handleBookmark}
                >
                  <Bookmark size={16} fill={isBookmarked ? '#ffb800' : 'none'} color={isBookmarked ? '#ffb800' : '#ffffff'} />
                  <span>{isBookmarked ? 'Saved' : 'Watchlist'}</span>
                </button>

                <button className="btn-secondary" onClick={handleShare} title="Share Link">
                  <Share2 size={16} />
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="detail-tabs-bar">
          {[
            { id: 'overview', label: 'Overview & Ratings' },
            { id: 'cast', label: `Cast & Roles (${movie.cast?.length || 0})` },
            { id: 'videos', label: `Trailers & Videos (${movie.videos?.length || 0})` },
            { id: 'reviews', label: `Critic Reviews (${movie.criticReviews?.length || 0})` }
          ].map(tab => (
            <button
              key={tab.id}
              className={`detail-tab-btn ${activeTab === tab.id ? 'detail-tab-btn-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="detail-body-container">
          {activeTab === 'overview' && (
            <div className="tab-overview-content">
              {/* Ratings Grid */}
              <div className="section-block">
                <h3 className="section-title">
                  <Star size={18} className="title-icon" />
                  Multi-Source Ratings Matrix
                </h3>

                {movie.ratings && movie.ratings.length > 0 ? (
                  <div className="ratings-matrix-grid">
                    {movie.ratings.map((r, idx) => {
                      const sourceClean = cleanRatingSource(r.source);
                      const isOak = sourceClean === 'OakShow' || r.source === 'OakShow';
                      const isIMDb = sourceClean === 'IMDb' || r.source === 'IMDb';
                      const isRT = sourceClean === 'Rotten Tomatoes' || r.source === 'Rotten Tomatoes';
                      const oakRemark = isOak ? getOakShowRemark(r.score) : null;
                      const Tag = (!isOak && r.url && r.url !== '#') ? 'a' : 'div';
                      return (
                        <Tag 
                          key={idx} 
                          href={Tag === 'a' ? r.url : undefined}
                          target={Tag === 'a' ? '_blank' : undefined}
                          rel={Tag === 'a' ? 'noreferrer' : undefined}
                          className={`rating-card ${isOak ? 'rating-card-oak' : ''}`}
                          title={oakRemark ? `OakShow Verdict: ${oakRemark.title} — ${oakRemark.meaning}` : undefined}
                        >
                          <div className="rating-card-header">
                            <span className="rating-source-name">{sourceClean}</span>
                            {isOak && oakRemark && (
                              <img src={oakRemark.icon} alt={oakRemark.title} className="oakshow-cert-icon-mini" />
                            )}
                            {!isOak && r.url && r.url !== '#' && <ExternalLink size={12} className="ext-icon" />}
                          </div>
                          <div className="rating-score-value">
                            {isRT && <span>🍅 </span>}
                            {r.score}
                          </div>
                          {isOak && oakRemark && (
                            <span className="rating-card-verdict-tag">{oakRemark.shortLabel}</span>
                          )}
                        </Tag>
                      );
                    })}
                  </div>
                ) : (
                  <p className="empty-text">Ratings are being compiled for this title.</p>
                )}
              </div>

              {/* Synopsis & Plot */}
              <div className="section-block">
                <h3 className="section-title">Synopsis & Storyline</h3>
                <p className="synopsis-text">
                  {movie.plot || movie.description || 'No detailed plot summary provided for this title.'}
                </p>
                {movie.basedOn && (
                  <p className="based-on-tag"><strong>Based On:</strong> {movie.basedOn}</p>
                )}
              </div>

              {/* Booking & Ticket Partners */}
              {movie.bookings && movie.bookings.length > 0 && (
                <div className="section-block">
                  <h3 className="section-title">
                    <Ticket size={18} className="title-icon" />
                    Grab Tickets Online
                  </h3>
                  <div className="booking-partners-grid">
                    {movie.bookings.map((b, idx) => (
                      <a
                        key={idx}
                        href={b.url}
                        target="_blank"
                        rel="noreferrer"
                        className="booking-partner-btn"
                      >
                        <Ticket size={16} />
                        <span>Book on {b.provider}</span>
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Music & Soundtracks */}
              {movie.music && movie.music.length > 0 && (
                <div className="section-block">
                  <h3 className="section-title">
                    <Music size={18} className="title-icon" />
                    Soundtrack & Songs
                  </h3>
                  <div className="music-links-grid">
                    {movie.music.map((m, idx) => (
                      <a
                        key={idx}
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="music-partner-btn"
                      >
                        <Music size={16} />
                        <span>Listen on {m.provider}</span>
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar Movies */}
              {movie.similar && movie.similar.length > 0 && (
                <div className="section-block">
                  <h3 className="section-title">Similar Recommended Titles</h3>
                  <div className="similar-movies-grid">
                    {movie.similar.map((sim, idx) => (
                      <div 
                        key={idx}
                        className="similar-movie-item"
                        onClick={() => onSelectSimilar(sim)}
                      >
                        <div className="similar-thumb">
                          <img 
                            src={sim.poster ? (sim.poster.startsWith('/') ? sim.poster : `/${sim.poster}`) : '/favicon.png'} 
                            alt={sim.title} 
                            onError={(e) => { e.target.src = '/favicon.png'; }}
                          />
                        </div>
                        <span className="similar-title">{sim.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'cast' && (
            <div className="tab-cast-content">
              {movie.cast && movie.cast.length > 0 ? (
                <div className="cast-grid">
                  {movie.cast.map((c, idx) => (
                    <div key={idx} className="cast-card">
                      <div className="cast-avatar">
                        <Users size={24} />
                      </div>
                      <div className="cast-info">
                        <h4 className="cast-actor">{c.actor}</h4>
                        <span className="cast-role">{c.role || 'Cast'}</span>
                        {c.description && <p className="cast-bio">{c.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-text">No detailed cast directory found for this title.</p>
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="tab-videos-content">
              {selectedVideo && selectedVideo.youtubeId ? (
                <div className="video-player-container">
                  <iframe
                    title={selectedVideo.title}
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                  />
                  <h4 className="active-video-title">{selectedVideo.title}</h4>
                </div>
              ) : (
                <p className="empty-text">No YouTube videos attached to this entry.</p>
              )}

              {movie.videos && movie.videos.length > 1 && (
                <div className="video-playlist">
                  <h4 className="playlist-heading">All Videos & Promos</h4>
                  <div className="playlist-grid">
                    {movie.videos.map((vid, idx) => (
                      <button
                        key={idx}
                        className={`playlist-item ${selectedVideo?.youtubeId === vid.youtubeId ? 'playlist-item-active' : ''}`}
                        onClick={() => setSelectedVideo(vid)}
                      >
                        <Play size={14} />
                        <span>{vid.title || `Promo ${idx + 1}`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-reviews-content">
              {movie.criticReviews && movie.criticReviews.length > 0 ? (
                <div className="critic-reviews-list">
                  {movie.criticReviews.map((cr, idx) => (
                    <div key={idx} className="critic-review-card">
                      <p className="review-quote">"{cr.text}"</p>
                      {cr.link && (
                        <a 
                          href={cr.link.startsWith('http') ? cr.link : `/${cr.link}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="review-read-link"
                        >
                          <span>Read Full Article</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-text">No dedicated editorial reviews compiled yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .detail-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 6, 10, 0.88);
          backdrop-filter: blur(16px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
        }
        .detail-modal-container {
          width: 100%;
          max-width: 960px;
          max-height: 90vh;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 184, 0, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .detail-hero-banner {
          position: relative;
          min-height: 280px;
          background-size: cover;
          background-position: center 20%;
          padding: 30px 30px 20px;
          display: flex;
          align-items: flex-end;
        }
        .detail-hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-surface) 0%, rgba(13, 17, 23, 0.75) 50%, rgba(7, 9, 14, 0.85) 100%);
        }
        .detail-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-subtle);
          z-index: 10;
          transition: all var(--transition-fast);
        }
        .detail-close-btn:hover {
          background: var(--accent-red);
          transform: scale(1.1);
        }
        .detail-header-content {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 24px;
          align-items: flex-end;
          width: 100%;
        }
        .detail-poster-wrap {
          width: 140px;
          height: 200px;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
          background: #000000;
        }
        .detail-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .detail-poster-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          background: #182030;
        }
        .detail-header-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .detail-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .detail-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }
        .detail-quick-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
          font-size: 0.88rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .detail-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }
        .btn-bookmarked {
          background: rgba(255, 184, 0, 0.15) !important;
          border-color: rgba(255, 184, 0, 0.4) !important;
          color: var(--accent-gold) !important;
        }
        .detail-tabs-bar {
          display: flex;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-surface-elevated);
          padding: 0 20px;
          overflow-x: auto;
        }
        .detail-tab-btn {
          padding: 14px 18px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .detail-tab-btn:hover {
          color: var(--text-main);
        }
        .detail-tab-btn-active {
          color: var(--accent-gold);
          border-bottom-color: var(--accent-gold);
        }
        .detail-body-container {
          padding: 24px 30px;
          overflow-y: auto;
          flex: 1;
        }
        .section-block {
          margin-bottom: 26px;
        }
        .section-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title-icon {
          color: var(--accent-gold);
        }
        .ratings-matrix-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 12px;
        }
        .rating-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all var(--transition-fast);
        }
        .rating-card:hover {
          border-color: rgba(255, 184, 0, 0.4);
          background: var(--bg-surface);
          transform: translateY(-2px);
        }
        .rating-card-oak {
          background: rgba(255, 184, 0, 0.08);
          border-color: rgba(255, 184, 0, 0.35);
        }
        .rating-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .rating-score-value {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--accent-gold);
        }
        .synopsis-text {
          font-size: 0.98rem;
          color: var(--text-muted);
          line-height: 1.7;
        }
        .based-on-tag {
          margin-top: 10px;
          font-size: 0.88rem;
          color: var(--text-dim);
        }
        .booking-partners-grid, .music-links-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .booking-partner-btn, .music-partner-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 10px 18px;
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        .booking-partner-btn:hover, .music-partner-btn:hover {
          background: var(--accent-gold);
          color: #07090e;
          border-color: var(--accent-gold);
          transform: translateY(-2px);
        }
        .similar-movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 14px;
        }
        .similar-movie-item {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: transform var(--transition-fast);
        }
        .similar-movie-item:hover {
          transform: scale(1.05);
        }
        .similar-thumb {
          width: 100%;
          padding-top: 140%;
          position: relative;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #000000;
          border: 1px solid var(--border-subtle);
        }
        .similar-thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .similar-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
          line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .cast-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 14px;
          border-radius: var(--radius-md);
          display: flex;
          gap: 12px;
        }
        .cast-avatar {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .cast-actor {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-heading);
        }
        .cast-role {
          font-size: 0.8rem;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-bottom: 4px;
          display: block;
        }
        .cast-bio {
          font-size: 0.78rem;
          color: var(--text-dim);
          line-height: 1.4;
        }
        .video-player-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 */
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000000;
          margin-bottom: 20px;
        }
        .video-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .active-video-title {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 10px;
          color: var(--text-heading);
        }
        .video-playlist {
          margin-top: 20px;
        }
        .playlist-heading {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .playlist-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .playlist-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 8px 14px;
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }
        .playlist-item:hover {
          color: var(--text-main);
          background: var(--bg-primary);
        }
        .playlist-item-active {
          background: var(--accent-red) !important;
          color: #ffffff !important;
          border-color: var(--accent-red) !important;
        }
        .critic-reviews-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .critic-review-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 18px 20px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .review-quote {
          font-size: 0.95rem;
          color: var(--text-muted);
          font-style: italic;
          line-height: 1.6;
        }
        .review-read-link {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--accent-gold);
          font-size: 0.85rem;
          font-weight: 600;
        }
        .empty-text {
          color: var(--text-dim);
          font-size: 0.9rem;
          font-style: italic;
        }
        @media (max-width: 768px) {
          .detail-header-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .detail-poster-wrap {
            width: 120px;
            height: 170px;
          }
          .detail-quick-meta {
            justify-content: center;
          }
          .detail-actions-row {
            justify-content: center;
          }
          .detail-body-container {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
