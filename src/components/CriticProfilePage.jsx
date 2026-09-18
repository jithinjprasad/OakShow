import React, { useState, useMemo } from 'react';
import { 
  Award, 
  MapPin, 
  Calendar, 
  Star, 
  ExternalLink, 
  BookOpen, 
  Film, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Share2, 
  Sparkles,
  SlidersHorizontal,
  X,
  CheckCircle2
} from 'lucide-react';
import { getOakShowRemark } from '../utils/remarks';

export default function CriticProfilePage({ critic, allReviews, onNavigate, onBack }) {
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, rating-desc, rating-asc

  const handleReviewClick = (rev) => {
    const targetSlug = rev.id || (rev.link ? rev.link.replace('.html', '') : rev.targetId);
    if (targetSlug && onNavigate) {
      onNavigate(targetSlug);
    } else if (rev.targetId && onNavigate) {
      onNavigate(`movie/${rev.targetId}`);
    }
  };

  // Filter reviews by this critic
  const criticReviews = useMemo(() => {
    if (!allReviews || !critic) return [];
    const list = allReviews.filter(r => r.criticId === critic.id || r.author?.toLowerCase() === critic.name?.toLowerCase());
    
    return [...list].sort((a, b) => {
      const parseDate = (d) => {
        if (!d) return 0;
        const parts = d.split('-');
        if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
        return new Date(d).getTime() || 0;
      };
      
      const timeA = a.timestamp || parseDate(a.date);
      const timeB = b.timestamp || parseDate(b.date);

      if (sortBy === 'date-desc') return timeB - timeA;
      if (sortBy === 'date-asc') return timeA - timeB;
      if (sortBy === 'rating-desc') return (b.score || 0) - (a.score || 0);
      if (sortBy === 'rating-asc') return (a.score || 0) - (b.score || 0);
      return 0;
    });
  }, [allReviews, critic, sortBy]);

  if (!critic) {
    return (
      <div className="container py-5 text-center">
        <h2>Critic Profile Not Found</h2>
        <button className="btn btn-primary mt-3" onClick={() => onNavigate ? onNavigate('reviews') : null}>
          Back to All Reviews
        </button>
      </div>
    );
  }

  const avatarSrc = critic.avatar ? (critic.avatar.startsWith('/') ? critic.avatar : `/${critic.avatar}`) : '/favicon.png';
  const coverSrc = critic.coverImage ? (critic.coverImage.startsWith('/') ? critic.coverImage : `/${critic.coverImage}`) : null;

  return (
    <div className="critic-profile-page-root animate-fade-in">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="profile-top-nav">
          <button className="back-link-btn" onClick={() => onBack ? onBack() : onNavigate('reviews')}>
            <ArrowLeft size={16} />
            <span>Back to Critic Reviews & Remarks</span>
          </button>
        </div>

        {/* Hero Profile Banner Card */}
        <div className="critic-hero-card glass-card">
          <div className="critic-hero-body">
            <div className="critic-avatar-wrapper">
              <img 
                src={avatarSrc} 
                alt={critic.name} 
                className="critic-profile-avatar"
                onError={(e) => { e.target.src = '/favicon.png'; }}
              />
              <div className="critic-verified-pill" title="OakShow Certified Reviewer">
                <CheckCircle2 size={16} fill="#00d26a" color="#0a0e17" />
              </div>
            </div>

            <div className="critic-main-info">
              <div className="critic-badge-row">
                <span className="badge badge-gold">
                  <Award size={13} />
                  OAKSHOW CERTIFIED CRITIC
                </span>
                {critic.location && (
                  <span className="critic-location-tag">
                    <MapPin size={13} />
                    {critic.location}
                  </span>
                )}
                {critic.joiningDate && (
                  <span className="critic-date-tag">
                    <Calendar size={13} />
                    Active Since: {critic.joiningDate}
                  </span>
                )}
              </div>

              <h1 className="critic-profile-name">{critic.name}</h1>
              <p className="critic-profile-designation">{critic.designation || 'OakShow Movie Critic & Reviewer'}</p>

              <p className="critic-profile-bio">
                {critic.bio || 'Unbiased, analytical cinema critique and authentic reviews.'}
              </p>

              {/* Social Media & Web Links */}
              {critic.socials && critic.socials.length > 0 && (
                <div className="critic-socials-row">
                  <span className="socials-label">Connect:</span>
                  {critic.socials.map((s, idx) => (
                    <a 
                      key={idx} 
                      href={s.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="critic-social-chip"
                    >
                      <Globe size={13} />
                      <span>{s.platform}</span>
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats Column */}
            <div className="critic-stats-column glass-panel">
              <div className="c-stat-box">
                <span className="c-stat-num">{criticReviews.length}</span>
                <span className="c-stat-lbl">Reviews Published</span>
              </div>
              <div className="c-stat-divider" />
              <div className="c-stat-box">
                <span className="c-stat-num text-gold">{critic.avgRating || '3.5'} / 5</span>
                <span className="c-stat-lbl">Average Rating</span>
              </div>
              {critic.hobbies && (
                <>
                  <div className="c-stat-divider" />
                  <div className="c-stat-box hobbies-box">
                    <span className="hobbies-lbl">Hobbies:</span>
                    <span className="hobbies-txt">{critic.hobbies}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section Header & Sort Controls */}
        <div className="critic-reviews-section">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <Star size={20} className="text-gold" />
              <h2>Reviews by {critic.name} ({criticReviews.length} Publications)</h2>
            </div>

            <div className="reviews-sort-bar">
              <SlidersHorizontal size={14} className="text-muted" />
              <label htmlFor="critic-sort">Sort By:</label>
              <select 
                id="critic-sort"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="critic-sort-select"
              >
                <option value="date-desc">Date of Publication (Newest First)</option>
                <option value="date-asc">Date of Publication (Oldest First)</option>
                <option value="rating-desc">Highest Rated First</option>
                <option value="rating-asc">Lowest Rated First</option>
              </select>
            </div>
          </div>

          <p className="section-subtitle">
            All reviews written by {critic.name}, organized chronologically by date of publication with authentic OakShow score ratings.
          </p>

          {/* Timeline / Chronological Review Cards List */}
          {criticReviews.length > 0 ? (
            <div className="critic-timeline-list">
              {criticReviews.map((rev, idx) => {
                const oakRemark = getOakShowRemark(rev.score != null ? rev.score : rev.remark);
                const bannerSrc = rev.banner ? (rev.banner.startsWith('/') ? rev.banner : `/${rev.banner}`) : '/favicon.png';

                return (
                  <div key={idx} className="critic-timeline-item glass-card">
                    {/* Publication Date Badge Column */}
                    <div className="timeline-date-col">
                      <div className="date-badge-pill">
                        <Calendar size={14} />
                        <span>{rev.date || 'Publication'}</span>
                      </div>
                      <span className="timeline-seq-num">#{criticReviews.length - idx}</span>
                    </div>

                    {/* Movie Poster / Banner */}
                    <div className="timeline-poster-wrap" onClick={() => handleReviewClick(rev)}>
                      <img 
                        src={bannerSrc} 
                        alt={rev.title} 
                        className="timeline-poster-img"
                        loading="lazy"
                        onError={(e) => { e.target.src = '/favicon.png'; }}
                      />
                      <div className={`verdict-ribbon ${oakRemark.badgeClass}`} title={oakRemark.meaning}>
                        <img src={oakRemark.icon} alt={oakRemark.title} className="ribbon-cert-icon" />
                        <span>{oakRemark.title}</span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <div className="timeline-content-col">
                      <div className="timeline-header-meta">
                        <div className="legacy-rating-badge">
                          <img src={oakRemark.icon} alt={oakRemark.title} className="oakshow-cert-icon-inline" />
                          <span className="score-val">{rev.score != null ? `${rev.score} / 5.0` : rev.rating}</span>
                        </div>

                        {rev.targetTitle && (
                          <span className="target-movie-tag">
                            <Film size={12} />
                            {rev.targetTitle}
                          </span>
                        )}
                      </div>

                      <h3 className="timeline-review-title" onClick={() => handleReviewClick(rev)}>
                        {rev.title}
                      </h3>

                      <p className="timeline-review-excerpt">
                        {rev.excerpt}
                      </p>

                      <div className="timeline-actions-row">
                        <button className="btn-read-review" onClick={() => handleReviewClick(rev)}>
                          <BookOpen size={14} />
                          <span>Read Full Review</span>
                        </button>

                        {rev.targetId && (
                          <button 
                            className="btn-view-movie"
                            onClick={() => onNavigate(`movie/${rev.targetId}`)}
                          >
                            <Film size={14} />
                            <span>View {rev.targetTitle || 'Movie'} Hub</span>
                            <ArrowRight size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-reviews-state glass-panel text-center py-5">
              <BookOpen size={36} className="text-muted mb-2" />
              <p>No reviews found for this critic.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .critic-profile-page-root {
          padding-top: 20px;
          padding-bottom: 80px;
        }
        .critic-hero-card {
          margin: 24px 0 40px;
          padding: 40px;
          border-radius: 24px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }
        .critic-hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 140px;
          background: linear-gradient(to right, rgba(245, 158, 11, 0.15), transparent);
          z-index: 0;
        }
        .critic-hero-body {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .critic-avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }
        .critic-profile-avatar {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #f59e0b;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.2);
        }
        .critic-verified-pill {
          position: absolute;
          bottom: 10px;
          right: 5px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          padding: 2px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
        .critic-main-info {
          flex: 1;
        }
        .critic-profile-name {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .critic-profile-designation {
          font-size: 1.1rem;
          color: var(--accent-gold);
          font-weight: 600;
          margin-bottom: 16px;
        }
        .critic-profile-bio {
          font-size: 1.05rem;
          color: var(--text-main);
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 24px;
        }
        .critic-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }
        .critic-location-tag, .critic-date-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: 8px;
        }
        .critic-stats-column {
          width: 240px;
          flex-shrink: 0;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .c-stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .c-stat-num {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-heading);
        }
        .c-stat-lbl {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
        .c-stat-divider {
          height: 1px;
          background: var(--border-subtle);
          width: 100%;
        }
        
        .hobbies-lbl {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .hobbies-txt {
          font-size: 0.95rem;
          color: var(--text-heading);
          font-weight: 500;
        }
        .socials-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .critic-social-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 0.8rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .critic-social-chip:hover {
          background: var(--bg-surface);
          border-color: var(--accent-gold);
          color: var(--accent-gold);
          transform: translateY(-2px);
        }
        .btn-view-movie:hover {
          background: var(--bg-surface-elevated);
          transform: translateY(-2px);
        }
        .back-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 24px;
        }
        .back-link-btn:hover {
          background: var(--bg-surface);
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }

        /* Timeline Items */
        .critic-timeline-item {
          display: flex;
          gap: 24px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 24px;
          border-radius: 20px;
          margin-bottom: 24px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .critic-timeline-item:hover {
          transform: translateY(-4px);
          border-color: var(--accent-gold);
          background: var(--bg-surface-elevated);
        }
        .timeline-date-col {
          width: 120px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
        .timeline-poster-wrap {
          width: 160px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .timeline-poster-img {
          width: 100%;
          aspect-ratio: 2/3;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .timeline-poster-wrap:hover .timeline-poster-img {
          transform: scale(1.05);
        }
        .timeline-content-col {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .timeline-review-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 12px 0;
          cursor: pointer;
        }
        .timeline-review-title:hover {
          color: var(--accent-gold);
        }
        .timeline-review-excerpt {
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .critic-hero-body {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .critic-hero-card {
            padding: 30px 20px;
          }
          .critic-stats-column {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            padding: 16px;
          }
          .c-stat-divider {
            width: 1px;
            height: auto;
          }
          .critic-badge-row {
            justify-content: center;
          }
          .critic-timeline-item {
            flex-direction: column;
            gap: 16px;
          }
          .timeline-date-col {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .timeline-poster-wrap {
            width: 100%;
            aspect-ratio: 16/9;
          }
          .timeline-poster-img {
            aspect-ratio: 16/9;
          }
        }
      `}</style>
    </div>
  );
}
