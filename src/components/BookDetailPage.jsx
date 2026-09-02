import React from 'react';
import { 
  BookOpen, 
  Share2, 
  Calendar, 
  Globe, 
  ChevronRight, 
  ArrowLeft, 
  Star, 
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import ShareBar from './ShareBar';

export default function BookDetailPage({ 
  book, 
  onNavigate 
}) {
  if (!book) return null;

  const posterSrc = book.poster 
    ? (book.poster.startsWith('/') ? book.poster : `/${book.poster}`)
    : null;

  return (
    <div className="movie-page-root animate-fade-in">
      {/* Topbar */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button className="topbar-back-btn" onClick={() => onNavigate('games-books')}>
              <ArrowLeft size={18} />
              <span>Back to Books Hub</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate('games-books')}>Games & Books</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">{book.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="movie-hero-stage" style={{ backgroundImage: `url(${posterSrc || '/favicon.png'})` }}>
        <div className="movie-hero-overlay" />
        <div className="container">
          <div className="movie-hero-content">
            <div className="movie-hero-poster-wrap">
              {posterSrc ? (
                <img src={posterSrc} alt={book.title} className="movie-hero-poster-img" />
              ) : (
                <div className="movie-hero-poster-fallback"><BookOpen size={54} /></div>
              )}
            </div>

            <div className="movie-hero-details">
              <div className="movie-badges-strip">
                <span className="badge badge-emerald">Book</span>
                {book.genre && <span className="badge badge-gold">{book.genre}</span>}
              </div>

              <h1 className="movie-main-title">{book.title}</h1>

              <div className="movie-hero-ratings-bar">
                <div className="rating-pill-highlight">
                  <Star size={20} fill="#ffb800" color="#ffb800" />
                  <div className="rating-pill-text">
                    <span className="rating-num">4.6 / 5</span>
                    <span className="rating-lbl">Goodreads Score</span>
                  </div>
                </div>
              </div>

              <div className="movie-meta-grid">
                {book.author && (
                  <div className="meta-item">
                    <span className="meta-lbl">Author:</span>
                    <span className="meta-val">{book.author}</span>
                  </div>
                )}
                {book.releaseDate && (
                  <div className="meta-item">
                    <span className="meta-lbl">Published:</span>
                    <span className="meta-val">{book.releaseDate}</span>
                  </div>
                )}
              </div>

              {book.description && (
                <p className="movie-synopsis">{book.description}</p>
              )}

              <div className="movie-hero-cta-row">
                <a 
                  href="https://www.amazon.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-gold"
                >
                  <ShoppingBag size={18} />
                  <span>Buy Book Online</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="container movie-main-body">
        {/* PROMINENT BOTTOM SHARE BAR */}
        <ShareBar
          title={book.title}
          type="book"
          rating="4.6/5"
          poster={posterSrc}
        />
      </div>
    </div>
  );
}
