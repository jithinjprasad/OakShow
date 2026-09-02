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
  const [activeReviewModal, setActiveReviewModal] = useState(null);

  // Filter reviews by this critic
  const criticReviews = useMemo(() => {
    if (!allReviews || !critic) return [];
    const list = allReviews.filter(r => r.criticId === critic.id || r.author?.toLowerCase() === critic.name?.toLowerCase());
    
    return [...list].sort((a, b) => {
      if (sortBy === 'date-desc') return (b.timestamp || 0) - (a.timestamp || 0);
      if (sortBy === 'date-asc') return (a.timestamp || 0) - (b.timestamp || 0);
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
                const oakRemark = getOakShowRemark(rev.remark || rev.score);
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
                    <div className="timeline-poster-wrap" onClick={() => setActiveReviewModal(rev)}>
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
                          <span className="score-val">{rev.rating || `${rev.score}/5`}</span>
                          <span className="score-out">/ 5.0</span>
                        </div>

                        {rev.targetTitle && (
                          <span className="target-movie-tag">
                            <Film size={12} />
                            {rev.targetTitle}
                          </span>
                        )}
                      </div>

                      <h3 className="timeline-review-title" onClick={() => setActiveReviewModal(rev)}>
                        {rev.title}
                      </h3>

                      <p className="timeline-review-excerpt">
                        {rev.excerpt}
                      </p>

                      <div className="timeline-actions-row">
                        <button className="btn-read-review" onClick={() => setActiveReviewModal(rev)}>
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

      {/* Full Review Article Reader Modal */}
      {activeReviewModal && (() => {
        const modalRemark = getOakShowRemark(activeReviewModal.remark || activeReviewModal.score);
        return (
          <div className="review-reader-backdrop animate-fade-in" onClick={() => setActiveReviewModal(null)}>
            <div className="review-reader-dialog" onClick={e => e.stopPropagation()}>
              <button className="reader-close-btn" onClick={() => setActiveReviewModal(null)}>
                <X size={20} />
              </button>

              {activeReviewModal.banner && (
                <div className="reader-hero-img-wrap">
                  <img 
                    src={activeReviewModal.banner.startsWith('/') ? activeReviewModal.banner : `/${activeReviewModal.banner}`} 
                    alt={activeReviewModal.title}
                    className="reader-hero-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              <div className="reader-body">
                <div className="reader-meta-bar">
                  <div className="rating-pill">
                    <img src={modalRemark.icon} alt={modalRemark.title} className="oakshow-cert-icon-inline" />
                    <span>Rating: {activeReviewModal.rating || `${activeReviewModal.score}/5`}</span>
                  </div>
                  <div className={`badge ${modalRemark.badgeClass}`} title={modalRemark.meaning}>
                    <img src={modalRemark.icon} alt={modalRemark.title} className="verdict-badge-icon" />
                    <span>{modalRemark.title}</span>
                  </div>
                  <span className="reader-author">By <strong>{activeReviewModal.author}</strong></span>
                  {activeReviewModal.date && <span>• {activeReviewModal.date}</span>}
                </div>

                <h2 className="reader-title">{activeReviewModal.title}</h2>

                <div className="reader-article-content">
                  {activeReviewModal.fullReview.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="reader-footer-actions">
                  {activeReviewModal.targetId && (
                    <button
                      className="btn btn-gold"
                      onClick={() => {
                        setActiveReviewModal(null);
                        onNavigate(`movie/${activeReviewModal.targetId}`);
                      }}
                    >
                      <Film size={16} />
                      <span>View Movie Hub, Ratings & Bookings</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
