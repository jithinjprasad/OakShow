import React, { useState, useEffect } from 'react';
import { Play, Info, Star, ChevronLeft, ChevronRight, Sparkles, Volume2 } from 'lucide-react';
import { getOakShowRemark } from '../utils/remarks';
import { getProfileImage, getShareImage } from '../utils/mediaUtils';

export default function HeroSpotlight({ movies, onSelectMovie, onPlayTrailer }) {
  // Pick latest movies released with their ratings and high quality posters/banners
  const spotlightCandidates = React.useMemo(() => {
    if (!movies || movies.length === 0) return [];
    
    // Sort movies by release year descending, then release date, ensuring ratings exist
    const sortedLatest = [...movies]
      .filter(m => m.poster && m.ratings && m.ratings.length > 0)
      .sort((a, b) => {
        const yearA = parseInt(a.year || '0', 10);
        const yearB = parseInt(b.year || '0', 10);
        if (yearB !== yearA) return yearB - yearA;
        const dateA = new Date(a.releaseDate || '1970-01-01').getTime() || 0;
        const dateB = new Date(b.releaseDate || '1970-01-01').getTime() || 0;
        return dateB - dateA;
      });

    return sortedLatest.slice(0, 8);
  }, [movies]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (spotlightCandidates.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightCandidates.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [spotlightCandidates.length]);

  if (!spotlightCandidates || spotlightCandidates.length === 0) return null;

  const current = spotlightCandidates[currentIndex];
  const oakRating = current.ratings?.find(r => r.source === 'OakShow')?.score;
  const imdbRating = current.ratings?.find(r => r.source === 'IMDb')?.score;
  const rtRating = current.ratings?.find(r => r.source === 'Rotten Tomatoes')?.score;
  const metaRating = current.ratings?.find(r => r.source === 'Metacritic')?.score;

  const backdropSrc = getShareImage(current);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + spotlightCandidates.length) % spotlightCandidates.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % spotlightCandidates.length);
  };

  return (
    <div className="hero-spotlight-root">
      {/* Background Poster Overlay (Uses 2.jpg wide format) */}
      <div 
        className="hero-backdrop" 
        style={{ backgroundImage: `url(${backdropSrc})` }}
      >
        <div className="hero-gradient-overlay" />
      </div>

      <div className="container hero-content-container">
        <div className="hero-badge-row">
          <span className="badge badge-gold">
            <Sparkles size={13} />
            LATEST RELEASE
          </span>
          {current.language && <span className="badge badge-cyan">{current.language}</span>}
          {current.genre && <span className="badge badge-red">{current.genre}</span>}
        </div>

        <h1 className="hero-title">{current.title}</h1>

        {/* Rating and Meta Row */}
        <div className="hero-meta-row">
          {oakRating && (() => {
            const remark = getOakShowRemark(oakRating);
            return (
              <div 
                className={`rating-pill oakshow-hero-pill ${remark.badgeClass}`}
                title={`OakShow Verdict: ${remark.title} (${remark.meaning})`}
              >
                <img 
                  src={remark.icon} 
                  alt={remark.title} 
                  className="oakshow-cert-icon-inline"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span>OakShow {oakRating} • {remark.shortLabel}</span>
              </div>
            );
          })()}
          {imdbRating && (
            <div className="rating-pill" style={{ borderColor: '#f5c518', color: '#f5c518' }}>
              <span>IMDb {imdbRating}</span>
            </div>
          )}
          {rtRating && (
            <div className="rating-pill" style={{ borderColor: '#fa320a', color: '#ff6347' }}>
              <span>🍅 {rtRating}</span>
            </div>
          )}
          {metaRating && (
            <div className="rating-pill" style={{ borderColor: '#3399cc', color: '#3399cc' }}>
              <span>Metacritic {metaRating}</span>
            </div>
          )}
          {current.duration && current.duration !== 'N/A' && (
            <span className="hero-duration">{current.duration}</span>
          )}
          {current.releaseDate && (
            <span className="hero-release-date">{current.releaseDate}</span>
          )}
        </div>

        {/* Synopsis snippet */}
        <p className="hero-description">
          {current.description || current.plot || 'An epic entertainment experience featuring blockbuster action, star performances, and thrilling drama.'}
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons-row">
          {current.videos && current.videos.length > 0 ? (
            <button 
              className="btn-primary hero-btn"
              onClick={() => onPlayTrailer(current.videos[0])}
            >
              <Play size={18} fill="#ffffff" />
              <span>Watch Trailer</span>
            </button>
          ) : (
            <button 
              className="btn-gold hero-btn"
              onClick={() => onSelectMovie(current)}
            >
              <Play size={18} fill="#0b0d14" />
              <span>View Trailer</span>
            </button>
          )}

          <a 
            href={current.filename ? (current.filename.startsWith('/') ? current.filename : `/${current.filename}`) : `/${current.id}.html`}
            className="btn-secondary hero-btn"
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
              e.preventDefault();
              onSelectMovie(current);
            }}
          >
            <Info size={18} />
            <span>Full Details & Ratings</span>
          </a>
        </div>

        {/* Carousel Slider Controls */}
        <div className="hero-controls-row">
          <div className="hero-dots">
            {spotlightCandidates.map((_, idx) => (
              <button
                key={idx}
                className={`hero-dot ${idx === currentIndex ? 'hero-dot-active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="hero-arrows">
            <button className="hero-arrow-btn" onClick={handlePrev} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="hero-arrow-btn" onClick={handleNext} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-spotlight-root {
          position: relative;
          min-height: 560px;
          display: flex;
          align-items: flex-end;
          padding: 80px 0 40px;
          margin-bottom: 30px;
          overflow: hidden;
        }
        .hero-backdrop {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 25%;
          filter: blur(2px) brightness(0.65);
          transform: scale(1.05);
          transition: background-image 0.8s ease-in-out;
        }
        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(3, 8, 19, 0.95) 0%,
            rgba(3, 8, 19, 0.8) 50%,
            rgba(3, 8, 19, 0.3) 100%
          ),
          linear-gradient(
            to top,
            var(--bg-dark) 0%,
            transparent 70%
          );
        }
        .hero-content-container {
          position: relative;
          z-index: 10;
          max-width: 900px;
        }
        .hero-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }
        .hero-title {
          font-size: 3.2rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
          margin-bottom: 14px;
          color: #ffffff;
        }
        .hero-meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .hero-duration, .hero-release-date {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }
        .hero-description {
          font-size: 1.05rem;
          color: #cbd5e1;
          line-height: 1.65;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 750px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
        }
        .hero-buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 30px;
        }
        .hero-btn {
          padding: 12px 26px;
          font-size: 1rem;
        }
        .hero-controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-dots {
          display: flex;
          gap: 8px;
        }
        .hero-dot {
          width: 28px;
          height: 5px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.25);
          transition: all var(--transition-fast);
        }
        .hero-dot-active {
          width: 44px;
          background: var(--accent-gold);
          box-shadow: 0 0 10px rgba(255, 184, 0, 0.6);
        }
        .hero-arrows {
          display: flex;
          gap: 8px;
        }
        .hero-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }
        .hero-arrow-btn:hover {
          background: rgba(255, 184, 0, 0.2);
          color: var(--accent-gold);
          border-color: rgba(255, 184, 0, 0.4);
        }
        @media (max-width: 768px) {
          .hero-spotlight-root {
            min-height: 480px;
            padding: 40px 0 20px;
          }
          .hero-title {
            font-size: 2.1rem;
          }
          .hero-description {
            font-size: 0.92rem;
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </div>
  );
}
