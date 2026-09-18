import React, { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Check, 
  Film, 
  BookOpen, 
  Star, 
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  Heart,
  Bookmark
} from 'lucide-react';
import criticsData from '../../data/critics.json';
import moviesData from '../../data/movies.json';
import { getOakShowRemark } from '../utils/remarks';


export default function CriticReviewDetailPage({ 
  review, 
  allReviews = [], 
  onNavigate,
  bookmarks = [],
  onToggleBookmark
}) {
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount or when review changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [review?.id, review?.link]);

  // Find corresponding critic
  const critic = useMemo(() => {
    if (!review) return null;
    const authorName = (review.author || '').trim().toLowerCase();
    return criticsData.find(c => 
      c.name?.toLowerCase() === authorName || 
      c.id === review.criticId ||
      authorName.includes(c.name?.toLowerCase())
    ) || {
      name: review.author || 'OakShow Critic',
      designation: 'Certified Film Reviewer',
      avatar: '/favicon.png'
    };
  }, [review]);

  // Find linked movie if available
  const linkedMovie = useMemo(() => {
    if (!review) return null;
    if (review.movieId) {
      const found = moviesData.find(m => m.id?.toLowerCase() === review.movieId.toLowerCase());
      if (found) return found;
    }
    if (review.targetId) {
      const found = moviesData.find(m => m.id?.toLowerCase() === review.targetId.toLowerCase());
      if (found) return found;
    }
    // Attempt match by slug or title
    const cleanSlug = (review.id || review.link || '')
      .replace(/-review-by-.*$/i, '')
      .replace(/-review.*$/i, '')
      .replace(/[^a-z0-9]/gi, '')
      .toLowerCase();

    if (cleanSlug) {
      const found = moviesData.find(m => {
        const mSlug = (m.id || m.title || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
        return mSlug === cleanSlug || cleanSlug.startsWith(mSlug) || mSlug.startsWith(cleanSlug);
      });
      if (found) return found;
    }

    return null;
  }, [review]);

  // Calculate OakShow Remark info
  const oakRemark = useMemo(() => {
    if (!review) return getOakShowRemark(3.5);
    return getOakShowRemark(review.score != null ? review.score : review.remark);
  }, [review]);

  // Other reviews by the same critic or similar verdict for continuous discovery
  const relatedReviews = useMemo(() => {
    if (!allReviews || !review) return [];
    return allReviews
      .filter(r => (r.id !== review.id && r.link !== review.link) && (
        r.author === review.author || 
        r.criticId === review.criticId ||
        r.remark === review.remark
      ))
      .slice(0, 4);
  }, [allReviews, review]);

  // Clean full review text paragraphs
  const paragraphs = useMemo(() => {
    if (!review?.fullReview) {
      return review?.excerpt ? [review.excerpt] : ['No review text available.'];
    }

    let text = review.fullReview;
    const safeTitle = (review.title || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Strip redundant leading headers if already shown in UI
    let stripped = text.replace(new RegExp(`^${safeTitle}[\\s\\S]*?Year\\s*[:-]\\s*\\d{4}`, 'i'), '');
    if (stripped === text) {
      stripped = text.replace(new RegExp(`^${safeTitle}[\\s\\S]*?Date\\s*:\\s*\\d{2}-\\d{2}-\\d{4}`, 'i'), '');
    }
    if (stripped === text) {
      stripped = text.replace(/^[\s\S]*?Posted By\s*:\s*[^|]+\|\s*Date\s*:\s*\d{2}-\d{2}-\d{4}/i, '');
    }
    text = stripped.trim();
    // Clean trailing metadata if it was placed after the matched block
    text = text.replace(/^(?:Genre|Language)\s*[:-][^\n]*?(?=[A-Z\u0D00-\u0D7F])/i, '').trim();

    // Clean common trailing scraping artifacts at the end of the review
    text = text.replace(/(?:(?:Thank You\s*)?Watch the Trailer Here|To check (?:more|out)(?: about)? the film visit|You can check everything tou wanna know about the movie from:|To check his blog visit:?)[\s\S]*$/i, '').trim();

    // Split by newlines or standard double newlines
    let rawParas = text.split(/\n+/).map(p => p.trim()).filter(Boolean);
    
    // Heuristic Paragraph Recovery: 
    // If the scraped review data lost its newlines and is compiled into a single giant block,
    // we intelligently reconstruct the paragraphs by looking for obvious section headers and glued sentences.
    if (rawParas.length === 1 && text.length > 400) {
      let recovered = text
        // Fix missing spaces after dots and colons that cause sentences to glue together
        .replace(/([a-z\u0D00-\u0D7F])\.([A-Z\u0D00-\u0D7F])/g, '$1. $2')
        .replace(/(:)([A-Z\u0D00-\u0D7F])/g, '$1 $2')
        // Force new paragraphs before major review sections
        .replace(/(My Rating\s*:|Final Verdict\s*:|To check out the film visit|The pros such as;|Now The Cons:)/gi, '\n\n$1')
        // Force new paragraphs before Title-cased phrases ending in a colon (e.g., "Good acting:", "Few Plot holes:")
        // Only split if there is a clear sentence or clause boundary before it (punctuation)
        .replace(/([.?!;:]\s+)([A-Z][a-zA-Z\s']+:\s*)/g, '$1\n\n$2')
        // Force new paragraphs at logical transitional words for massive walls of text (English)
        .replace(/([a-z]\.)\s+(However|Although|But|Moreover|Furthermore|In conclusion|Overall|Ultimately)\b/gi, '$1\n\n$2')
        // Force new paragraphs at logical transitional words for massive walls of text (Malayalam)
        .replace(/([a-zA-Z\u0D00-\u0D7F]\.)\s+(മൊത്തത്തിൽ|എന്നിരുന്നാലും|എങ്കിലും|പക്ഷെ|കൂടാതെ|അവസാനമായി|ചുരുക്കത്തിൽ|അതുകൊണ്ട്|അതാണ്|തീർച്ചയായും)/g, '$1\n\n$2');
        
      rawParas = recovered.split(/\n+/).map(p => p.trim()).filter(Boolean);
    }

    // Final pass: gracefully chunk any remaining massive paragraphs (e.g. plot summaries) 
    // into standard editorial paragraphs based on natural sentence boundaries.
    let finalParas = [];
    for (let p of rawParas) {
      if (p.length < 500) {
        finalParas.push(p);
        continue;
      }
      
      let tokens = p.split(/([.?!;:]\s+)/);
      let currentPara = "";
      
      for (let i = 0; i < tokens.length; i += 2) {
        let text = tokens[i];
        let punct = tokens[i + 1] || "";
        let sentence = text + punct;
        
        // Avoid splitting directly after common titles
        let isTitle = /^(Dr|Mr|Mrs|Ms|Prof|Sr|Jr)$/i.test(text.trim().split(/\s+/).pop());
        
        if (currentPara.length > 400 && !isTitle) {
          finalParas.push(currentPara.trim());
          currentPara = sentence.trimStart();
        } else {
          currentPara += currentPara ? sentence : sentence.trimStart();
        }
      }
      if (currentPara.trim()) {
        finalParas.push(currentPara.trim());
      }
    }
    rawParas = finalParas;

    if (rawParas.length === 0) {
      return [review.fullReview];
    }
    return rawParas;
  }, [review]);

  // Share handler
  const handleShare = async () => {
    const shareData = {
      title: review?.title || 'OakShow Critic Review',
      text: review?.excerpt || `Read verified review by ${review?.author} on OakShow`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fall back to clipboard copy
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        // ignore
      }
    }
  };

  if (!review) {
    return (
      <div className="container py-5 text-center critic-review-not-found">
        <BookOpen size={48} className="text-gold mb-3 mx-auto" />
        <h2>Review Not Found</h2>
        <p className="text-muted">The review you are looking for does not exist or has been moved.</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => onNavigate ? onNavigate('reviews') : window.history.back()}
        >
          <ArrowLeft size={16} />
          <span>Back to OakShow Reviews Hub</span>
        </button>
      </div>
    );
  }

  const bannerSrc = review.banner 
    ? (review.banner.startsWith('/') ? review.banner : `/${review.banner}`) 
    : (linkedMovie?.poster ? `/${linkedMovie.poster}` : '/favicon.png');

  const criticAvatar = critic?.avatar 
    ? (critic.avatar.startsWith('/') ? critic.avatar : `/${critic.avatar}`) 
    : '/favicon.png';

  const cleanScore = review.score != null && !isNaN(Number(review.score))
    ? Number(review.score) 
    : parseFloat(review.rating?.replace(/[^0-9.]/g, '') || '3.5');

  const isBookmarked = linkedMovie ? bookmarks.some(b => b.id === linkedMovie.id) : false;

  return (
    <div className="critic-review-detail-root animate-fade-in">
      {/* Dynamic Ambient Background Glow based on verdict color */}
      <div className={`ambient-glow-mesh glow-${oakRemark.key || 'safe'}`} />

      <div className="container review-detail-container">
        {/* Top Breadcrumb Navigation & Action Bar */}
        <div className="review-top-nav-bar">
          <button 
            className="review-back-btn"
            onClick={() => onNavigate ? onNavigate('reviews') : window.history.back()}
            title="Return to all reviews"
          >
            <ArrowLeft size={16} />
            <span>OakShow Reviews</span>
          </button>

          <div className="review-top-actions">
              <button 
                className="review-action-btn"
                onClick={() => onNavigate('remarks')}
                title="Learn about OakShow's 4 Official Remarks"
              >
              <Award size={15} className="text-gold" />
              <span className="hide-on-mobile">Remarks Guide</span>
            </button>

            <button 
              className={`review-action-btn share-btn ${copied ? 'copied' : ''}`}
              onClick={handleShare}
              title="Share this review"
            >
              {copied ? <Check size={15} className="text-success" /> : <Share2 size={15} />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Main Article Header Showcase */}
        <header className="review-header-showcase glass-card">
          {/* Verdict Banner Strip */}


          <div className="review-header-main-content">
            <h1 className="review-headline">{review.title}</h1>

            {/* Rating and Critic Byline Row */}
            <div className="review-byline-bar">
              {/* Reviewer Badge */}
              <div 
                className="critic-byline-card"
                onClick={() => {
                  if (critic?.id && onNavigate) {
                    onNavigate(`critic/${critic.id}`);
                  }
                }}
                title={`View all reviews and profile of ${critic.name}`}
              >
                <img 
                  src={criticAvatar} 
                  alt={critic.name} 
                  className="critic-byline-avatar"
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
                <div className="critic-byline-text">
                  <div className="critic-byline-name-row">
                    <span className="critic-byline-name">{critic.name}</span>
                    <span className="badge-verified-critic" title="OakShow Certified Film Critic">✓ Certified</span>
                  </div>
                  <span className="critic-byline-role">{critic.designation || 'Film Critic & Reviewer'}</span>
                </div>
              </div>

              {/* Score & Publication Date Pill */}
              <div className="review-meta-score-box">
                <div className="score-meter-wrap">
                  <div className="score-badge">
                    <Star size={16} className="text-gold fill-gold" />
                    <span className="score-number">{cleanScore.toFixed(1)}</span>
                    <span className="score-base">/ 5.0</span>
                  </div>
                  <div className="score-bar-bg">
                    <div 
                      className="score-bar-fill" 
                      style={{ width: `${Math.min(100, (cleanScore / 5) * 100)}%` }}
                    />
                  </div>
                </div>

                {review.date && (
                  <div className="review-pub-date">
                    <Calendar size={13} />
                    <span>Published: <strong>{review.date}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Hero Banner */}
        <div className="review-banner-showcase glass-panel">
          <img 
            src={bannerSrc} 
            alt={review.title} 
            className="review-featured-banner"
            onError={(e) => {
              if (linkedMovie?.poster) {
                e.target.src = linkedMovie.poster.startsWith('/') ? linkedMovie.poster : `/${linkedMovie.poster}`;
              } else {
                e.target.src = '/favicon.png';
              }
            }}
          />
          <div className="banner-overlay-gradient" />
          <div className="banner-caption-pill">
            <Film size={14} className="text-gold" />
            <span>Official OakShow Critic Evaluation</span>
          </div>
        </div>

        {/* Associated Movie Quick-Hub Card (if linked movie detected) */}
        {linkedMovie && (
          <div className="review-linked-movie-card glass-card">
            <div className="movie-quick-col-poster">
              <img 
                src={linkedMovie.poster ? (linkedMovie.poster.startsWith('/') ? linkedMovie.poster : `/${linkedMovie.poster}`) : '/favicon.png'} 
                alt={linkedMovie.title} 
                className="movie-quick-poster-img"
                onError={(e) => { e.target.src = '/favicon.png'; }}
              />
            </div>
            <div className="movie-quick-col-info">
              <div className="movie-quick-header">
                <span className="badge badge-gold">THEATRICAL / OTT FEATURE</span>
                {linkedMovie.year && <span className="movie-quick-year">({linkedMovie.year})</span>}
              </div>
              <h3 className="movie-quick-title">{linkedMovie.title}</h3>
              <p className="movie-quick-meta">
                <span>{linkedMovie.genre || 'Cinema'}</span>
                {linkedMovie.language && <span>• {linkedMovie.language}</span>}
                {linkedMovie.director && <span>• Dir: {linkedMovie.director}</span>}
              </p>
              <p className="movie-quick-plot">
                {linkedMovie.description || linkedMovie.plot || 'Explore complete movie ratings, showtimes, songs, and booking links on OakShow.'}
              </p>
            </div>
            <div className="movie-quick-col-cta">
              <button 
                className="btn btn-gold btn-view-hub"
                onClick={() => onNavigate(`movie/${linkedMovie.id}`)}
              >
                <Film size={16} />
                <span>Explore Movie Hub</span>
                <ArrowRight size={14} />
              </button>
              {onToggleBookmark && (
                <button 
                  className={`btn btn-secondary btn-bookmark-quick ${isBookmarked ? 'active' : ''}`}
                  onClick={() => onToggleBookmark(linkedMovie)}
                  title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Bookmark size={16} className={isBookmarked ? 'fill-gold text-gold' : ''} />
                  <span>{isBookmarked ? 'In Watchlist' : 'Watchlist'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <article className="review-article-wrapper glass-card">
          <div className="article-inner-content">
            {/* Highlights / Excerpt Lead */}
            {review.excerpt && (
              <div className="review-lead-callout">
                <p className="lead-text">
                  "{review.excerpt}"
                </p>
              </div>
            )}

            {/* Formatted Article Body */}
            <div className="review-body-text">
              {paragraphs.map((para, idx) => {
                // If paragraph is a rating or verdict line, give it dedicated accent callout styling
                if (para.toLowerCase().startsWith('my rating') || para.toLowerCase().startsWith('final verdict')) {
                  return (
                    <div key={idx} className="review-verdict-callout glass-panel">
                      <Award size={18} className="text-gold flex-shrink-0" />
                      <p className="verdict-callout-text">{para}</p>
                    </div>
                  );
                }

                return (
                  <p key={idx} className="review-paragraph">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Official Certification Footer Banner */}
            <div className="review-certification-footer">
              <div className="cert-seal-wrap">
                <img src={oakRemark.icon} alt={oakRemark.title} className="cert-seal-icon" />
              </div>
              <div className="cert-seal-details">
                <h4 className="cert-seal-title">OakShow Official Remark: {oakRemark.title}</h4>
                <p className="cert-seal-meaning">{oakRemark.meaning}</p>
                <span className="cert-seal-author">Verified by <strong>{critic.name}</strong> • OakShow Editorial Board</span>
              </div>
            </div>
          </div>
        </article>

        {/* Discovery & More Reviews by Critic Section */}
        {relatedReviews.length > 0 && (
          <section className="more-reviews-section">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <BookOpen size={20} className="text-gold" />
                <h2>More Reviews & Critic Highlights</h2>
              </div>
              <button 
                className="view-all-link-btn"
                onClick={() => onNavigate('reviews')}
              >
                <span>All Reviews ({allReviews.length})</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="related-reviews-grid">
              {relatedReviews.map((rel, idx) => {
                const relRemark = getOakShowRemark(rel.score != null ? rel.score : rel.remark);
                const relBanner = rel.banner 
                  ? (rel.banner.startsWith('/') ? rel.banner : `/${rel.banner}`) 
                  : '/favicon.png';

                return (
                  <div 
                    key={idx} 
                    className="related-review-card glass-card"
                    onClick={() => onNavigate(rel.id || rel.link.replace('.html', ''))}
                  >
                    <div className="rel-banner-wrap">
                      <img 
                        src={relBanner} 
                        alt={rel.title} 
                        className="rel-banner-img"
                        loading="lazy"
                        onError={(e) => { e.target.src = '/favicon.png'; }}
                      />
                      <div className={`verdict-badge ${relRemark.badgeClass}`}>
                        <span>{relRemark.shortLabel || relRemark.title}</span>
                      </div>
                    </div>
                    <div className="rel-card-body">
                      <div className="rel-score-row">
                        <span className="rel-score text-gold">⭐ {rel.score != null ? `${rel.score}/5` : rel.rating}</span>
                        {rel.date && <span className="rel-date">{rel.date}</span>}
                      </div>
                      <h4 className="rel-card-title">{rel.title}</h4>
                      <span className="rel-critic-name">By {rel.author}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Floating/Sticky Action Bar */}
        <div className="review-bottom-actions-row">
          <button 
            className="btn btn-secondary btn-bottom-nav"
            onClick={() => onNavigate('reviews')}
          >
            <ArrowLeft size={16} />
            <span>Back to All Reviews</span>
          </button>

          {linkedMovie && (
            <button 
              className="btn btn-gold btn-bottom-movie"
              onClick={() => onNavigate(`movie/${linkedMovie.id}`)}
            >
              <Film size={16} />
              <span>Explore {linkedMovie.title} Hub</span>
            </button>
          )}

          <button 
            className="btn btn-secondary btn-bottom-share"
            onClick={handleShare}
          >
            <Share2 size={16} />
            <span>{copied ? 'Copied!' : 'Share Review'}</span>
          </button>
        </div>
      </div>



      <style>{`
        .critic-review-detail-root {
          position: relative;
          padding-bottom: 140px;
        }
        .ambient-glow-mesh {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 600px;
          opacity: 0.15;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 0%, var(--glow-color, rgba(255,255,255,0.1)) 0%, transparent 70%);
        }
        .glow-must-watch { --glow-color: rgba(16, 185, 129, 0.6); }
        .glow-safe { --glow-color: rgba(59, 130, 246, 0.6); }
        .glow-above-avg { --glow-color: rgba(245, 158, 11, 0.6); }
        .glow-skip { --glow-color: rgba(239, 68, 68, 0.6); }

        .review-detail-container {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding-top: 24px;
        }
        .review-top-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .review-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-hover, rgba(255, 255, 255, 0.05));
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
          padding: 8px 16px;
          border-radius: 20px;
          color: var(--text-main, #e2e8f0);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .review-back-btn:hover {
          background: var(--bg-hover, rgba(255, 255, 255, 0.1));
          color: var(--text-heading, #ffffff);
        }
        .review-top-actions {
          display: flex;
          gap: 12px;
        }
        .review-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--text-muted, #94a3b8);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .review-action-btn:hover {
          color: var(--accent-primary, #f59e0b);
        }

        .review-header-showcase {
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          margin-bottom: 40px;
        }

        .review-verdict-ribbon {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          font-weight: 600;
          /* Removed hardcoded color: #fff to let the dynamic badge class dictate the perfect theme colors */
        }
        
        .ribbon-cert-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }
        
        .verdict-name {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .verdict-divider {
          opacity: 0.5;
        }
        
        .verdict-desc-snip {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        .review-header-main-content {
          padding: 32px 40px;
        }
        
        .review-headline {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--text-heading);
          line-height: 1.15;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        
        .review-byline-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }
        
        .critic-byline-card {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }
        .critic-byline-card:hover {
          transform: translateY(-2px);
        }
        
        .critic-byline-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid var(--accent-gold);
          object-fit: cover;
        }
        
        .critic-byline-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .critic-byline-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .critic-byline-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-heading);
        }
        
        .badge-verified-critic {
          font-size: 0.7rem;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .critic-byline-role {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        
        .review-meta-score-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        
        .score-meter-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        
        .score-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--accent-gold);
        }
        
        .score-base {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        
        .score-bar-bg {
          width: 140px;
          height: 6px;
          background: var(--bg-surface-elevated);
          border-radius: 3px;
          overflow: hidden;
        }
        
        .score-bar-fill {
          height: 100%;
          background: var(--accent-gold);
          border-radius: 3px;
        }
        
        .review-pub-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        
        .review-banner-showcase {
          position: relative;
          aspect-ratio: 21/9;
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-bottom: 40px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
        }
        
        .review-featured-banner {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .banner-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-surface, rgba(10, 15, 26, 1)) 0%, transparent 60%);
        }
        
        .banner-caption-pill {
          position: absolute;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(10, 15, 26, 0.75);
          backdrop-filter: blur(12px);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .review-linked-movie-card {
          display: grid;
          grid-template-columns: 120px 1fr auto;
          gap: 24px;
          padding: 24px;
          margin-bottom: 40px;
          align-items: flex-start;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }
        
        .movie-quick-col-poster {
          width: 100%;
          aspect-ratio: 2/3;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          background: var(--bg-surface-elevated, #f1f5f9);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .movie-quick-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          color: transparent; /* hides the ugly alt text and broken icon when image fails */
        }
        
        .movie-quick-col-info {
          flex-grow: 1;
          min-width: 250px;
        }
        
        .movie-quick-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        
        .movie-quick-year {
          font-weight: 700;
          color: var(--text-muted);
        }
        
        .movie-quick-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0 0 8px;
        }
        
        .movie-quick-meta {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0 0 12px;
        }
        
        .movie-quick-plot {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin: 0;
        }
        
        .movie-quick-col-cta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 200px;
          margin-top: 4px;
        }
        
        .btn-view-hub, .btn-bookmark-quick {
          width: 100%;
        }
        
        .review-article-wrapper {
          padding: 48px;
          margin-bottom: 120px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }
        
        .article-inner-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .review-lead-callout {
          font-size: 1.35rem;
          font-style: italic;
          color: var(--text-heading) !important;
          border-left: 4px solid var(--accent-primary);
          padding: 24px 32px;
          margin-bottom: 40px;
          line-height: 1.7;
          background: var(--bg-surface-elevated);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        
        .lead-text {
          color: var(--text-heading) !important;
          margin: 0;
        }
        
        .review-body-text {
          font-size: 1.15rem;
          line-height: 1.85;
          color: var(--text-main);
        }
        
        .review-paragraph {
          margin-bottom: 28px;
          text-indent: 2.5rem;
          text-align: justify;
          hyphens: auto; /* Optional: helps with justification spacing */
        }
        
        .review-verdict-callout {
          display: flex;
          gap: 16px;
          padding: 24px;
          border-radius: var(--radius-md);
          margin: 40px 0;
          border: 1px solid var(--accent-gold-glow);
          background: rgba(245, 158, 11, 0.05);
          align-items: center;
        }
        
        .verdict-callout-text {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-heading);
          margin: 0;
        }
        
        .review-certification-footer {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 48px;
          background: var(--bg-surface-elevated) !important;
        }
        
        .cert-seal-icon {
          width: 72px;
          height: 72px;
          object-fit: contain;
        }
        
        .cert-seal-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .cert-seal-title {
          font-weight: 800;
          color: var(--text-heading);
          font-size: 1.2rem;
          margin: 0;
        }
        
        .cert-seal-meaning {
          font-size: 0.95rem;
          color: var(--text-main);
          margin: 0;
        }
        
        .cert-seal-author {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        
        .more-reviews-section {
          margin-bottom: 60px;
        }
        
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .section-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .section-title-wrap h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text-heading);
        }
        
        .view-all-link-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .view-all-link-btn:hover {
          color: var(--accent-primary);
        }
        
        .related-reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .related-review-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        
        .related-review-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        
        .rel-banner-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--bg-surface-elevated);
        }
        
        .rel-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }
        
        .related-review-card:hover .rel-banner-img {
          transform: scale(1.05);
        }
        
        .verdict-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        
        .rel-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        
        .rel-score-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 700;
        }
        
        .rel-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-heading);
          line-height: 1.35;
          margin: 0;
        }
        
        .rel-critic-name {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .review-bottom-actions-row {
          position: sticky;
          bottom: 24px;
          z-index: 50;
          display: flex;
          justify-content: center;
          gap: 16px;
          background: var(--bg-glass-strong);
          backdrop-filter: blur(12px);
          padding: 16px 24px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          margin-top: 40px;
          max-width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 900px) {
          .review-linked-movie-card {
            grid-template-columns: 110px 1fr;
          }
          .movie-quick-col-cta {
            grid-column: 1 / -1;
            flex-direction: row;
          }
        }

        @media (max-width: 768px) {
          .review-verdict-ribbon {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 16px 20px;
          }
          .verdict-divider {
            display: none;
          }
          .review-header-main-content {
            padding: 24px 20px;
          }
          .review-headline {
            font-size: 1.8rem;
          }
          .review-byline-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .review-meta-score-box {
            align-items: flex-start;
          }
          .score-meter-wrap {
            align-items: flex-start;
          }
          .review-banner-showcase {
            aspect-ratio: 16/9;
          }
          .review-article-wrapper {
            padding: 30px 20px;
          }
          .review-bottom-actions-row {
            flex-wrap: wrap;
            border-radius: var(--radius-md);
            padding: 12px;
          }
          .review-linked-movie-card {
            grid-template-columns: 100px 1fr;
            padding: 20px;
            gap: 16px;
          }
          .movie-quick-col-cta {
            flex-direction: column;
          }
        }
        
        @media (max-width: 480px) {
          .review-linked-movie-card {
            grid-template-columns: 1fr;
          }
          .movie-quick-col-poster {
            max-width: 140px;
            margin: 0 auto;
          }
          .movie-quick-header, .movie-quick-meta, .movie-quick-title {
            text-align: center;
            justify-content: center;
          }
          .movie-quick-plot {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
