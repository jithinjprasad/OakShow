import React, { useState } from 'react';
import { Star, Play, Bookmark, Film, Calendar } from 'lucide-react';
import { getOakShowRemark } from '../utils/remarks';
import { getProfileImage, handlePosterError } from '../utils/mediaUtils';

export default function MovieCard({ 
  movie, 
  onSelect, 
  onPlayTrailer, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const oakRating = movie.ratings?.find(r => r.source === 'OakShow')?.score;
  const imdbRating = movie.ratings?.find(r => r.source === 'IMDb')?.score;
  const displayRating = oakRating || imdbRating;
  const oakRemark = oakRating ? getOakShowRemark(oakRating) : null;

  const posterSrc = getProfileImage(movie);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleBookmark(movie);
  };

  const handleTrailerClick = (e) => {
    e.stopPropagation();
    if (movie.videos && movie.videos.length > 0) {
      onPlayTrailer(movie.videos[0]);
    } else {
      onSelect(movie);
    }
  };

  return (
    <div className="movie-card-root" onClick={() => onSelect(movie)}>
      {/* Poster Container */}
      <div className="poster-container">
        {posterSrc ? (
          <img
            src={posterSrc}
            alt={movie.title}
            className={`poster-image ${imageLoaded ? 'poster-loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => handlePosterError(e, movie.poster)}
          />
        ) : (
          <div className="poster-fallback">
            <Film size={36} className="fallback-icon" />
            <span className="fallback-title">{movie.title}</span>
          </div>
        )}

        {/* Rating Badge Overlay */}
        {displayRating && (
          <div 
            className={`card-rating-badge ${oakRemark ? `badge-oak-${oakRemark.key}` : ''}`}
            title={oakRemark ? `OakShow Verdict: ${oakRemark.title} (${oakRating})` : `Rating: ${displayRating}`}
          >
            {oakRemark ? (
              <img 
                src={oakRemark.icon} 
                alt={oakRemark.title} 
                className="card-cert-icon" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <Star size={12} fill="#ffb800" color="#ffb800" />
            )}
            <span>{displayRating}</span>
          </div>
        )}

        {/* Bookmark Button */}
        <button
          className={`card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
          title={isBookmarked ? 'Remove from Saved' : 'Save to Watchlist'}
          aria-label="Bookmark"
        >
          <Bookmark size={15} fill={isBookmarked ? '#ffb800' : 'none'} color={isBookmarked ? '#ffb800' : '#ffffff'} />
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="card-hover-overlay">
          <button className="card-quick-play-btn" onClick={handleTrailerClick}>
            <Play size={20} fill="#ffffff" />
          </button>
          <span className="card-hover-prompt">Click for Details</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="card-info">
        <h4 className="card-title" title={movie.title}>{movie.title}</h4>
        
        <div className="card-tags-row">
          {movie.year && (
            <span className="card-tag">
              <Calendar size={11} />
              {movie.year}
            </span>
          )}
          {movie.language && (
            <span className="card-tag card-tag-lang">
              {movie.language.split(' ')[0]}
            </span>
          )}
          {movie.genre && (
            <span className="card-tag card-tag-genre">
              {movie.genre.split(',')[0]}
            </span>
          )}
        </div>
      </div>

      <style>{`
        .movie-card-root {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .movie-card-root:hover {
          transform: translateY(-6px);
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-md);
        }
        .poster-container {
          position: relative;
          width: 100%;
          padding-top: 145%; /* Aspect ratio ~ 1:1.45 */
          background: var(--bg-surface-elevated);
          overflow: hidden;
        }
        .poster-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.3s ease, transform var(--transition-normal);
        }
        .poster-loaded {
          opacity: 1;
        }
        .movie-card-root:hover .poster-image {
          transform: scale(1.06);
        }
        .poster-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
          text-align: center;
          background: var(--bg-surface-elevated);
          color: var(--text-dim);
          gap: 8px;
        }
        .fallback-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-rating-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(3, 8, 19, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 184, 0, 0.4);
          padding: 3px 7px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-gold);
          z-index: 2;
        }
        .card-bookmark-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 30px;
          height: 30px;
          border-radius: var(--radius-full);
          background: rgba(3, 8, 19, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: transform var(--transition-fast), background var(--transition-fast);
        }
        .card-bookmark-btn:hover {
          transform: scale(1.15);
          background: rgba(255, 184, 0, 0.25);
        }
        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(3, 8, 19, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          backdrop-filter: blur(3px);
          transition: opacity var(--transition-fast);
          z-index: 1;
        }
        .movie-card-root:hover .card-hover-overlay {
          opacity: 1;
        }
        .card-quick-play-btn {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--logo-cerulean) 0%, var(--logo-navy-deep) 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(2, 132, 199, 0.5);
          transition: transform var(--transition-bounce);
        }
        .card-quick-play-btn:hover {
          transform: scale(1.15);
        }
        .card-hover-prompt {
          font-size: 0.78rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.02em;
        }
        .card-info {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }
        .card-tags-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
        }
        .card-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .card-tag-lang {
          background: rgba(2, 132, 199, 0.1);
          color: var(--accent-primary);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .card-tag-genre {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
