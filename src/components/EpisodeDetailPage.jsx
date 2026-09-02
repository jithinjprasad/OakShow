import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Play, 
  Bookmark, 
  Share2, 
  Calendar, 
  Globe, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Users, 
  Film, 
  Sparkles, 
  Award, 
  BookOpen, 
  Newspaper, 
  Eye, 
  X, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import ShareBar from './ShareBar';
import { getOakShowRemark } from '../utils/remarks';
import { getProfileImage, getShareImage, handlePosterError, getItemCanonicalUrl } from '../utils/mediaUtils';

function parseScorePercentage(scoreStr) {
  if (!scoreStr) return 80;
  if (scoreStr.includes('%')) return Math.min(100, Math.max(10, parseFloat(scoreStr) || 80));
  if (scoreStr.includes('/10')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 8;
    return Math.min(100, Math.max(10, (num / 10) * 100));
  }
  if (scoreStr.includes('/5')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 4;
    return Math.min(100, Math.max(10, (num / 5) * 100));
  }
  return 80;
}

export default function EpisodeDetailPage({
  episode,
  series,
  allEpisodes = [],
  onNavigate,
  isBookmarked,
  onToggleBookmark
}) {
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  // Scroll to top whenever episode changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [episode?.id, episode?.filename]);

  if (!episode) return null;

  // Find index in allEpisodes
  const currentIndex = allEpisodes.findIndex(e => 
    e.id === episode.id || 
    e.filename === episode.filename || 
    e.episodeNumber === episode.episodeNumber
  );

  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex >= 0 && currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null;

  const thumbUrl = episode.thumbnail ? (episode.thumbnail.startsWith('/') ? episode.thumbnail : `/${episode.thumbnail}`) : null;
  const seriesPoster = series ? getProfileImage(series) : '/favicon.png';
  const seriesShareImg = series ? getShareImage(series) : '/favicon.png';
  const canonicalUrl = getItemCanonicalUrl(episode);

  const ratings = episode.ratings || [];

  const handleSelectEp = (targetEp) => {
    if (!targetEp) return;
    const slug = targetEp.filename ? targetEp.filename.replace(/\.html$/, '') : targetEp.id;
    if (onNavigate) {
      onNavigate(`episode/${slug}`);
    }
  };

  const scrollToShare = () => {
    const el = document.getElementById('share-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="movie-page-root animate-fade-in episode-page-root">
      {/* Topbar Navigation */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button 
              className="topbar-back-btn" 
              onClick={() => onNavigate(series?.filename ? series.filename.replace(/\.html$/, '') : (series?.id ? `series/${series.id}` : 'series-hub'))}
            >
              <ArrowLeft size={18} />
              <span>Back to {series?.title || 'Series'}</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate('series-hub')}>TV Series</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span 
                className="crumb-link" 
                onClick={() => onNavigate(series?.filename ? series.filename.replace(/\.html$/, '') : (series?.id ? `series/${series.id}` : 'series-hub'))}
              >
                {series?.title || 'Dragon Ball Super'}
              </span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">Episode {episode.episodeNumber}</span>
            </div>

            <div className="topbar-actions">
              <button 
                className={`topbar-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={() => onToggleBookmark && onToggleBookmark(series || episode)}
              >
                <Bookmark size={16} fill={isBookmarked ? '#ffb800' : 'none'} />
                <span>{isBookmarked ? 'Saved' : 'Watchlist'}</span>
              </button>

              <button className="topbar-action-btn topbar-share-trigger" onClick={scrollToShare}>
                <Share2 size={16} />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Clean Hero Stage */}
      <section className="movie-hero-stage" style={{ backgroundImage: `url(${thumbUrl || seriesShareImg})` }}>
        <div className="movie-hero-overlay" />
        <div className="container">
          <div className="movie-hero-content">
            {/* Left Episode Poster Frame */}
            <div className="movie-hero-poster-wrap">
              {thumbUrl ? (
                <img 
                  src={thumbUrl} 
                  alt={episode.title} 
                  className="movie-hero-poster-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveLightboxImg(thumbUrl)}
                  onError={(e) => { e.target.src = seriesPoster; }}
                />
              ) : (
                <div className="movie-hero-poster-fallback"><Tv size={54} /></div>
              )}
            </div>

            {/* Right Details Column */}
            <div className="movie-hero-details">
              <div className="movie-badges-strip">
                <span 
                  className="badge badge-red clickable-badge"
                  onClick={() => onNavigate(series?.filename ? series.filename.replace(/\.html$/, '') : 'series-hub')}
                  style={{ cursor: 'pointer' }}
                >
                  <Tv size={12} style={{ marginRight: '4px' }} />
                  {series?.title || 'Dragon Ball Super'}
                </span>
                <span className="badge badge-gold">Episode {episode.episodeNumber} of {allEpisodes.length || 131}</span>
                <span className="badge badge-cyan">Universe Survival Saga</span>
              </div>

              <h1 className="movie-main-title">{episode.title}</h1>

              {episode.japaneseTitle && episode.japaneseTitle !== episode.title && (
                <p className="movie-sub-title" style={{ color: '#38bdf8', fontWeight: 600 }}>
                  🇯🇵 {episode.japaneseTitle}
                </p>
              )}

              {/* Dynamic Quick Ratings Summary Bar */}
              {ratings.length > 0 && (
                <div className="movie-hero-ratings-bar">
                  {ratings.map((r, idx) => {
                    const isOak = r.source === 'OakShow';
                    const oakRemark = isOak ? getOakShowRemark(r.score) : null;
                    if (isOak) {
                      return (
                        <div
                          key={idx}
                          className="rating-pill-source oakshow-hero-rating-pill"
                          title={oakRemark ? `OakShow Verdict: ${oakRemark.title} (${r.score}) — ${oakRemark.meaning}` : 'OakShow Rating'}
                        >
                          {oakRemark ? (
                            <img src={oakRemark.icon} alt={oakRemark.title} className="oakshow-cert-icon-inline" onError={(e) => { e.target.style.display = 'none'; }} />
                          ) : null}
                          <span className="source-tag">{r.source}</span>
                          <span className="source-score">{r.score}</span>
                          {oakRemark && <span className="source-verdict-tag">{oakRemark.shortLabel}</span>}
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
                      >
                        <span className="source-tag">{r.source}</span>
                        <span className="source-score">{r.score}</span>
                      </a>
                    );
                  })}
                </div>
              )}

              <div className="movie-meta-grid">
                {episode.japaneseAirDate && (
                  <div className="meta-item">
                    <span className="meta-lbl">🇯🇵 JP Air Date:</span>
                    <span className="meta-val">{episode.japaneseAirDate}</span>
                  </div>
                )}
                {episode.englishAirDate && (
                  <div className="meta-item">
                    <span className="meta-lbl">🇺🇸 US Air Date:</span>
                    <span className="meta-val">{episode.englishAirDate}</span>
                  </div>
                )}
                {episode.writer && (
                  <div className="meta-item">
                    <span className="meta-lbl">Screenplay / Writer:</span>
                    <span className="meta-val">{episode.writer}</span>
                  </div>
                )}
              </div>

              {/* Prev / Next / Jump Navigation Strip */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', margin: '14px 0 18px 0' }}>
                {prevEpisode && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleSelectEp(prevEpisode)}
                  >
                    <ChevronLeft size={14} />
                    <span>Ep {prevEpisode.episodeNumber}</span>
                  </button>
                )}

                {nextEpisode && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleSelectEp(nextEpisode)}
                  >
                    <span>Ep {nextEpisode.episodeNumber}</span>
                    <ChevronRight size={14} />
                  </button>
                )}

                {allEpisodes.length > 0 && (
                  <select
                    value={episode.id || episode.filename || ''}
                    onChange={(e) => {
                      const target = allEpisodes.find(ep => ep.id === e.target.value || ep.filename === e.target.value);
                      if (target) handleSelectEp(target);
                    }}
                    style={{ padding: '7px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    {allEpisodes.map((ep) => (
                      <option key={ep.id || ep.filename} value={ep.id || ep.filename}>
                        Episode {ep.episodeNumber}: {ep.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Hero CTA Row */}
              <div className="movie-hero-cta-row">
                <button 
                  className="btn btn-primary"
                  onClick={() => onNavigate(series?.filename ? series.filename.replace(/\.html$/, '') : 'series-hub')}
                >
                  <Tv size={18} />
                  <span>All Episodes Guide</span>
                </button>

                <button 
                  className={`btn btn-secondary ${isBookmarked ? 'active' : ''}`}
                  onClick={() => onToggleBookmark && onToggleBookmark(series || episode)}
                >
                  <Bookmark size={18} fill={isBookmarked ? '#ffb800' : 'none'} />
                  <span>{isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>

                <button className="btn btn-glass" onClick={scrollToShare}>
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container movie-main-body">
        {/* 1. Storyline & Narrative Summary */}
        <div className="section-block">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <Film size={20} className="text-red" />
              <h2>Episode Storyline & Narrative Breakdown</h2>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', lineHeight: '1.7', color: '#e2e8f0', fontSize: '1rem' }}>
            <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
              {episode.plot || 'Full detailed plot description of the tournament combat, dramatic climaxes, and character transformations in this episode.'}
            </p>
          </div>
        </div>

        {/* 2. All Ratings & Critic Reviews */}
        {ratings.length > 0 && (
          <div className="section-block">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Star size={20} className="text-gold" />
                <h2>Verified Episode Ratings & Reviews</h2>
              </div>
            </div>

            <div className="ratings-grid">
              {ratings.map((r, idx) => {
                const isOak = r.source === 'OakShow';
                const oakRemark = isOak ? getOakShowRemark(r.score) : null;
                const pct = parseScorePercentage(r.score);
                const isGold = pct >= 75;
                const isGreen = pct >= 55 && pct < 75;
                const iconSrc = isOak && oakRemark ? oakRemark.icon : (r.icon ? (r.icon.startsWith('/') ? r.icon : `/${r.icon}`) : null);

                return (
                  <div key={idx} className={`rating-card ${isOak ? 'card-oakshow' : ''}`}>
                    <div className="rc-header">
                      <div className="rc-source-group">
                        {iconSrc ? (
                          <img src={iconSrc} alt={r.source} className="rc-source-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                          <Star size={16} className="text-gold" />
                        )}
                        <span className="rc-source">{r.source}</span>
                      </div>
                      <span className={`rc-score-pill ${isOak && oakRemark ? oakRemark.badgeClass : (isGold ? 'pill-gold' : isGreen ? 'pill-green' : 'pill-yellow')}`}>
                        {r.score}
                      </span>
                    </div>

                    <div className="rc-body">
                      <span className="rc-score-main">{r.score}</span>
                      <span className="rc-label">Episode Score</span>
                    </div>

                    <div className="rc-meter">
                      <div className={`rc-fill ${isGold ? 'fill-gold' : isGreen ? 'fill-emerald' : 'fill-red'}`} style={{ width: `${pct}%` }} />
                    </div>

                    {r.source !== 'OakShow' && r.url && r.url !== '#' ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="rc-link">
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
        )}

        {/* 3. Key Characters Roster */}
        {episode.characters && episode.characters.length > 0 && (
          <div className="section-block">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Users size={20} className="text-cyan" />
                <h2>Key Characters in This Episode ({episode.characters.length})</h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {episode.characters.map((charName, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel"
                  style={{ padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{charName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. More Episodes Navigation Grid */}
        {allEpisodes.length > 1 && (
          <div className="section-block">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Tv size={20} className="text-red" />
                <h2>More Episodes from Universe Survival Saga</h2>
              </div>
              <button 
                className="view-more-section-btn"
                onClick={() => onNavigate(series?.filename ? series.filename.replace(/\.html$/, '') : 'series-hub')}
              >
                <span>View Full {allEpisodes.length} Episodes Guide</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="episodes-grid-layout">
              {allEpisodes
                .filter(e => e.id !== episode.id && e.episodeNumber !== episode.episodeNumber)
                .slice(0, 4)
                .map((ep) => {
                  const epThumb = ep.thumbnail ? (ep.thumbnail.startsWith('/') ? ep.thumbnail : `/${ep.thumbnail}`) : null;
                  const epRating = ep.ratings && ep.ratings.length > 0 ? ep.ratings[0] : null;
                  return (
                    <div 
                      key={ep.id}
                      className="episode-card glass-panel"
                      onClick={() => handleSelectEp(ep)}
                    >
                      <div className="episode-card-thumb-wrap">
                        {epThumb ? (
                          <img 
                            src={epThumb} 
                            alt={ep.title} 
                            className="episode-card-thumb-img" 
                            loading="lazy"
                            onError={(e) => { e.target.src = seriesPoster; }} 
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            <Tv size={36} />
                          </div>
                        )}
                        <span className="episode-card-badge-num">
                          Ep {ep.episodeNumber}
                        </span>
                        {epRating && (
                          <span className="episode-card-badge-rating">
                            <Star size={12} fill="#ffb800" color="#ffb800" />
                            <span>{epRating.score}</span>
                          </span>
                        )}
                      </div>

                      <div className="episode-card-body">
                        <h4 className="episode-card-title">{ep.title}</h4>
                        {ep.japaneseTitle && (
                          <p className="episode-card-jp-title">
                            🇯🇵 {ep.japaneseTitle}
                          </p>
                        )}
                        <div className="episode-card-meta-row">
                          {ep.japaneseAirDate && (
                            <span><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />{ep.japaneseAirDate}</span>
                          )}
                        </div>
                        {ep.plot && (
                          <p className="episode-card-plot">{ep.plot}</p>
                        )}
                        <div className="episode-card-cta-btn">
                          <span>Open Episode Page</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 5. Bottom Share Bar Section */}
        <div id="share-section" className="section-block share-section-wrap">
          <ShareBar 
            item={{
              ...episode,
              title: `${series?.title || 'Dragon Ball Super'} Episode ${episode.episodeNumber}: ${episode.title}`,
              type: 'series',
              poster: seriesPoster,
              filename: episode.filename || `${episode.id}.html`
            }}
            canonicalUrl={canonicalUrl}
          />
        </div>

        {/* 6. Prev / Next Episode Bottom Bar */}
        {(prevEpisode || nextEpisode) && (
          <div className="movie-page-bottom-nav glass-panel">
            {prevEpisode && (
              <button 
                className="bottom-nav-btn prev-btn"
                onClick={() => handleSelectEp(prevEpisode)}
              >
                <ChevronLeft size={20} />
                <div className="bnav-text">
                  <span className="bnav-label">Previous Episode</span>
                  <span className="bnav-title">Ep {prevEpisode.episodeNumber}: {prevEpisode.title}</span>
                </div>
              </button>
            )}

            {nextEpisode && (
              <button 
                className="bottom-nav-btn next-btn"
                onClick={() => handleSelectEp(nextEpisode)}
              >
                <div className="bnav-text">
                  <span className="bnav-label">Next Episode</span>
                  <span className="bnav-title">Ep {nextEpisode.episodeNumber}: {nextEpisode.title}</span>
                </div>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div className="lightbox-overlay" onClick={() => setActiveLightboxImg(null)}>
          <div className="lightbox-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setActiveLightboxImg(null)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="lightbox-image-wrap">
              <img src={activeLightboxImg} alt={episode.title} className="lightbox-large-img" />
            </div>
            <div className="lightbox-footer">
              <span className="lightbox-caption">{episode.title} (Episode {episode.episodeNumber})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
