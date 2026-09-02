import React, { useState } from 'react';
import { 
  Gamepad2, 
  Play, 
  Share2, 
  Calendar, 
  Globe, 
  ChevronRight, 
  ArrowLeft, 
  Star, 
  ExternalLink,
  Download,
  ShieldCheck,
  ShoppingBag,
  Newspaper
} from 'lucide-react';
import ShareBar from './ShareBar';
import VideoPlayerModal from './VideoPlayerModal';

function parseScorePercentage(scoreStr) {
  if (!scoreStr) return 85;
  if (scoreStr.includes('%')) return Math.min(100, Math.max(10, parseFloat(scoreStr) || 85));
  if (scoreStr.includes('/10')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 8.5;
    return Math.min(100, Math.max(10, (num / 10) * 100));
  }
  if (scoreStr.includes('/5')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 4;
    return Math.min(100, Math.max(10, (num / 5) * 100));
  }
  if (scoreStr.includes('/100')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 85;
    return Math.min(100, Math.max(10, num));
  }
  return 85;
}

export default function GameDetailPage({ 
  game, 
  onNavigate 
}) {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!game) return null;

  const posterSrc = game.poster 
    ? (game.poster.startsWith('/') ? game.poster : `/${game.poster}`)
    : null;

  const youtubeMatch = game.promoLink ? game.promoLink.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/|^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=)([\w-]{11})/) : null;
  const youtubeId = youtubeMatch ? youtubeMatch[1] : null;

  const allRatings = game.ratings || [
    { source: 'OakShow Game Index', score: '9.0/10', url: '#' },
    { source: 'Metacritic', score: '86/100', url: 'https://www.metacritic.com' },
    { source: 'IGN', score: '9.2/10', url: 'https://www.ign.com' }
  ];

  const bookings = game.bookings || [
    { provider: 'Amazon', url: 'https://www.amazon.com', label: 'Order / Pre-Book Online' },
    { provider: 'GameStop', url: 'https://www.gamestop.com', label: 'Order at GameStop' }
  ];

  return (
    <div className="movie-page-root animate-fade-in">
      {/* Topbar */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button className="topbar-back-btn" onClick={() => onNavigate('games-books')}>
              <ArrowLeft size={18} />
              <span>Back to Games Hub</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate('games-books')}>Games & Books</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">{game.title}</span>
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
                <img src={posterSrc} alt={game.title} className="movie-hero-poster-img" />
              ) : (
                <div className="movie-hero-poster-fallback"><Gamepad2 size={54} /></div>
              )}
              {youtubeId && (
                <button 
                  className="poster-play-trailer-btn"
                  onClick={() => setActiveVideo({ youtubeId, title: `${game.title} Official Gameplay Trailer` })}
                >
                  <Play size={22} fill="#ffffff" />
                  <span>Play Gameplay</span>
                </button>
              )}
            </div>

            <div className="movie-hero-details">
              <div className="movie-badges-strip">
                <span className="badge badge-purple">Video Game</span>
                {game.platform && <span className="badge badge-cyan">{game.platform}</span>}
                {game.genre && <span className="badge badge-gold">{game.genre}</span>}
                {game.type && <span className="badge badge-dark">{game.type}</span>}
              </div>

              <h1 className="movie-main-title">{game.title}</h1>

              <div className="movie-hero-ratings-bar">
                {allRatings.map((r, idx) => {
                  const isOak = r.source === 'OakShow';
                  if (isOak) {
                    return (
                      <div
                        key={idx}
                        className="rating-pill-source oakshow-hero-rating-pill"
                        title="OakShow Rating"
                      >
                        <span className="source-tag">{r.source}</span>
                        <span className="source-score">{r.score}</span>
                      </div>
                    );
                  }
                  return (
                    <a
                      key={idx}
                      href={r.url || '#'}
                      target={r.url && r.url !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="rating-pill-source clickable-pill"
                      title={r.url ? `View on ${r.source}` : r.source}
                    >
                      <span className="source-tag">{r.source}</span>
                      <span className="source-score">{r.score}</span>
                    </a>
                  );
                })}
              </div>

              <div className="movie-meta-grid">
                {game.developer && (
                  <div className="meta-item">
                    <span className="meta-lbl">Developer:</span>
                    <span className="meta-val">{game.developer}</span>
                  </div>
                )}
                {game.publisher && (
                  <div className="meta-item">
                    <span className="meta-lbl">Publisher:</span>
                    <span className="meta-val">{game.publisher}</span>
                  </div>
                )}
                {game.releaseDate && (
                  <div className="meta-item">
                    <span className="meta-lbl">Release Date:</span>
                    <span className="meta-val">{game.releaseDate}</span>
                  </div>
                )}
              </div>

              {game.description && (
                <p className="movie-synopsis">{game.description}</p>
              )}

              <div className="movie-hero-cta-row">
                {youtubeId && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveVideo({ youtubeId, title: `${game.title} Gameplay Trailer` })}
                  >
                    <Play size={18} fill="#ffffff" />
                    <span>Watch Gameplay</span>
                  </button>
                )}
                {bookings.length > 0 && (
                  <a 
                    href={bookings[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-emerald"
                  >
                    <ShoppingBag size={18} />
                    <span>{bookings[0].label || 'Get / Purchase Game'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="container movie-main-body">
        {/* All Ratings with exact hyperlinks */}
        <div className="section-block">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <Star size={20} className="text-gold" />
              <h2>All Game Ratings & Critic Scores ({allRatings.length} Sources)</h2>
            </div>
          </div>

          <div className="ratings-grid">
            {allRatings.map((r, idx) => {
              const pct = parseScorePercentage(r.score);
              const isGold = pct >= 75;
              const isGreen = pct >= 55 && pct < 75;
              const iconSrc = r.icon ? (r.icon.startsWith('/') ? r.icon : `/${r.icon}`) : null;

              return (
                <div key={idx} className="rating-card">
                  <div className="rc-header">
                    <div className="rc-source-group">
                      {iconSrc ? (
                        <img 
                          src={iconSrc} 
                          alt={r.source} 
                          className="rc-source-icon" 
                          onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                      ) : (
                        <Gamepad2 size={16} className="text-cyan" />
                      )}
                      <span className="rc-source">{r.source}</span>
                    </div>
                    <span className={`rc-score-pill ${isGold ? 'pill-gold' : isGreen ? 'pill-green' : 'pill-yellow'}`}>
                      {r.score}
                    </span>
                  </div>

                  <div className="rc-body">
                    <span className="rc-score-main">{r.score}</span>
                    <span className="rc-label">Critic Verdict & Rating</span>
                  </div>

                  <div className="rc-meter">
                    <div 
                      className={`rc-fill ${isGold ? 'fill-gold' : isGreen ? 'fill-emerald' : 'fill-red'}`} 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>

                  {r.source !== 'OakShow' && r.url && r.url !== '#' ? (
                    <a 
                      href={r.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="rc-link"
                    >
                      <span>Read review on {r.source}</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="rc-link-disabled">Official Verified Score</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pre-Book / Store Download Links */}
        <div className="section-block">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <ShoppingBag size={20} className="text-emerald" />
              <h2>Pre-Book, Purchase & Download Links</h2>
            </div>
          </div>

          <div className="booking-partners-row">
            {bookings.map((b, idx) => (
              <a
                key={idx}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="booking-partner-card large"
              >
                <div className="bp-icon-wrap">
                  <ShoppingBag size={24} className="text-emerald" />
                </div>
                <div className="bp-info">
                  <span className="bp-provider">{b.provider}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* News & Updates */}
        {game.articles && game.articles.length > 0 && (
          <div className="section-block">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Newspaper size={20} className="text-cyan" />
                <h2>News & Gameplay Updates ({game.articles.length} Reports)</h2>
              </div>
            </div>

            <div className="critic-reviews-list">
              {game.articles.map((art, idx) => (
                <a
                  key={idx}
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="critic-review-item glass-panel article-row-link"
                >
                  <div className="cri-header">
                    <span className="cri-source-name">{art.headline}</span>
                    <div className="article-by-badge">
                      <span>{art.author}</span>
                      {art.date && <span> • {art.date}</span>}
                    </div>
                  </div>
                  <div className="article-open-hint">
                    <span>Read full report on original portal</span>
                    <ExternalLink size={14} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* PROMINENT BOTTOM SHARE BAR */}
        <ShareBar
          title={game.title}
          type="game"
          rating="9.0/10"
          poster={posterSrc}
        />
      </div>

      {activeVideo && (
        <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
