import React from 'react';
import { 
  Trophy, 
  Share2, 
  Calendar, 
  Globe, 
  ChevronRight, 
  ArrowLeft, 
  Star, 
  ExternalLink,
  Users,
  MapPin
} from 'lucide-react';
import ShareBar from './ShareBar';

export default function SportsDetailPage({ 
  tournament, 
  onNavigate 
}) {
  if (!tournament) return null;

  const posterSrc = tournament.meta?.ogImage 
    ? (tournament.meta.ogImage.startsWith('/') ? tournament.meta.ogImage : `/${tournament.meta.ogImage}`)
    : null;

  return (
    <div className="movie-page-root animate-fade-in">
      {/* Topbar */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button className="topbar-back-btn" onClick={() => onNavigate('sports-hub')}>
              <ArrowLeft size={18} />
              <span>Back to Sports Hub</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate('sports-hub')}>Sports & Schedules</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">{tournament.title?.slice(0, 40)}...</span>
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
                <img src={posterSrc} alt={tournament.title} className="movie-hero-poster-img" />
              ) : (
                <div className="movie-hero-poster-fallback"><Trophy size={54} /></div>
              )}
            </div>

            <div className="movie-hero-details">
              <div className="movie-badges-strip">
                <span className="badge badge-gold">Tournament & Schedule</span>
              </div>

              <h1 className="movie-main-title">{tournament.title}</h1>

              <div className="movie-meta-grid">
                {tournament.meta?.datePublished && (
                  <div className="meta-item">
                    <span className="meta-lbl">Published:</span>
                    <span className="meta-val">{tournament.meta.datePublished}</span>
                  </div>
                )}
              </div>

              {tournament.meta?.description && (
                <p className="movie-synopsis">{tournament.meta.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="container movie-main-body">
        {/* Match Fixtures Grid */}
        <div className="section-block">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <Calendar size={20} className="text-gold" />
              <h2>Match Schedules & Fixtures</h2>
            </div>
          </div>

          <div className="critic-reviews-list">
            <div className="critic-review-item glass-panel">
              <div className="cri-header">
                <span className="cri-source-name">Match Day Schedule</span>
                <span className="badge badge-emerald">Live / Official</span>
              </div>
              <p className="cri-quote">
                Full match timetable, kick-off times, broadcast channels and stadium position charts.
              </p>
            </div>
          </div>
        </div>

        {/* PROMINENT BOTTOM SHARE BAR */}
        <ShareBar
          title={tournament.title}
          type="sports"
          poster={posterSrc}
        />
      </div>
    </div>
  );
}
