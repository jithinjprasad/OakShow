import React, { useState, useMemo, useEffect } from 'react';
import { 
  Star, 
  User, 
  Calendar, 
  Award, 
  ExternalLink, 
  X, 
  BookOpen, 
  Film, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal,
  Search,
  Sparkles,
  Users,
  Info
} from 'lucide-react';
import criticsData from '../../data/critics.json';
import { getOakShowRemark, OAKSHOW_REMARKS_LIST } from '../utils/remarks';
import RemarksGuideModal from './RemarksGuideModal';

const REVIEWS_PER_PAGE = 10;

export default function CriticReviewsHub({ reviews, onNavigate, onSelectCritic }) {
  const [activeTab, setActiveTab] = useState('all-reviews'); // 'all-reviews' | 'critics'
  const [selectedVerdict, setSelectedVerdict] = useState('All'); // All, Must Watch, Safe to Watch, Above Average
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, rating-desc, rating-asc
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReviewModal, setActiveReviewModal] = useState(null);
  const [remarksGuideOpen, setRemarksGuideOpen] = useState(false);

  const authors = useMemo(() => {
    if (!criticsData) return [];
    return criticsData.map(c => c.name);
  }, []);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    if (!reviews) return [];
    
    let list = reviews.filter(r => {
      const oakRemark = getOakShowRemark(r.remark || r.score);
      const matchVerdict = selectedVerdict === 'All' || 
        r.remark === selectedVerdict || 
        oakRemark.shortLabel === selectedVerdict || 
        oakRemark.title === selectedVerdict ||
        oakRemark.key === selectedVerdict;

      const matchAuthor = selectedAuthor === 'All' || r.author === selectedAuthor;
      const matchSearch = !searchQuery.trim() || 
        r.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.targetTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.fullReview?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchVerdict && matchAuthor && matchSearch;
    });

    return list.sort((a, b) => {
      if (sortBy === 'date-desc') return (b.timestamp || 0) - (a.timestamp || 0);
      if (sortBy === 'date-asc') return (a.timestamp || 0) - (b.timestamp || 0);
      if (sortBy === 'rating-desc') return (b.score || 0) - (a.score || 0);
      if (sortBy === 'rating-asc') return (a.score || 0) - (b.score || 0);
      if (sortBy === 'title-desc') return (b.targetTitle || b.title || '').localeCompare(a.targetTitle || a.title || '');
      if (sortBy === 'title-asc') return (a.targetTitle || a.title || '').localeCompare(b.targetTitle || b.title || '');
      return 0;
    });
  }, [reviews, selectedVerdict, selectedAuthor, sortBy, searchQuery]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedVerdict, selectedAuthor, sortBy, searchQuery]);

  // Pagination calculation: exactly 10 per page
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE));
  const paginatedReviews = useMemo(() => {
    const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
    return filteredReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);
  }, [filteredReviews, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleMovieNavigate = (targetId, movieSlug) => {
    const slug = targetId || movieSlug?.replace('.html', '').replace(/^\/+/, '');
    if (slug && onNavigate) {
      onNavigate(`movie/${slug}`);
    }
  };

  const handleCriticClick = (criticName) => {
    const critic = criticsData.find(c => c.name.toLowerCase() === criticName?.toLowerCase() || c.id === criticName);
    if (critic) {
      if (onSelectCritic) {
        onSelectCritic(critic);
      } else if (onNavigate) {
        onNavigate(`critic/${critic.id}`);
      }
    }
  };

  return (
    <div className="critic-hub-root animate-fade-in">
      {/* Header Banner */}
      <div className="critic-hub-banner">
        <div className="badge badge-gold">
          <Award size={14} />
          VERIFIED CRITIC OPINIONS & PROFILES
        </div>
        <h1 className="critic-main-heading">OakShow Editorial & Critic Reviews</h1>
        <p className="critic-subtext">
          Unbiased, in-depth film criticism, legacy ratings, and certified recommendations by OakShow reviewers.
        </p>

        <div className="critic-hub-actions-bar">
          {/* Tab Switcher: All Reviews vs Meet Our Critics */}
          <div className="critic-hub-tabs-row">
            <button 
              className={`critic-hub-tab-btn ${activeTab === 'all-reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('all-reviews')}
            >
              <BookOpen size={16} />
              <span>All Published Reviews ({reviews?.length || 0})</span>
            </button>
            <button 
              className={`critic-hub-tab-btn ${activeTab === 'critics' ? 'active' : ''}`}
              onClick={() => setActiveTab('critics')}
            >
              <Users size={16} />
              <span>Meet Our Critics ({criticsData.length})</span>
            </button>
          </div>

          <button 
            className="btn btn-secondary remarks-guide-btn"
            onClick={() => setRemarksGuideOpen(true)}
            title="Learn about OakShow's 4 Official Verdict Remarks"
          >
            <Award size={16} className="text-gold" />
            <span>OakShow Remarks Guide</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: MEET OUR CRITICS PROFILES GRID */}
      {activeTab === 'critics' && (
        <div className="critics-profiles-view animate-fade-in">
          <div className="section-header-row mb-3">
            <div className="section-title-wrap">
              <Users size={20} className="text-gold" />
              <h2>OakShow Film Critics & Editorial Panel</h2>
            </div>
            <span className="section-hint">Click on any critic profile to view their biography and all reviews organized by publication date</span>
          </div>

          <div className="critics-grid">
            {criticsData.map((critic) => {
              const avatar = critic.avatar ? (critic.avatar.startsWith('/') ? critic.avatar : `/${critic.avatar}`) : '/favicon.png';
              const criticReviewCount = reviews?.filter(r => r.criticId === critic.id || r.author === critic.name).length || 0;

              return (
                <div 
                  key={critic.id} 
                  className="critic-profile-card glass-card"
                  onClick={() => handleCriticClick(critic.id)}
                >
                  <div className="c-card-avatar-wrap">
                    <img 
                      src={avatar} 
                      alt={critic.name} 
                      className="c-card-avatar"
                      onError={(e) => { e.target.src = '/favicon.png'; }}
                    />
                  </div>

                  <div className="c-card-info">
                    <h3 className="c-card-name">{critic.name}</h3>
                    <span className="c-card-desig">{critic.designation}</span>
                    <span className="c-card-loc">{critic.location}</span>
                    <p className="c-card-bio-snippet">{critic.bio}</p>

                    <div className="c-card-meta-row">
                      <span className="c-card-pill">
                        <strong>{criticReviewCount}</strong> Reviews
                      </span>
                      <span className="c-card-pill pill-gold">
                        ⭐ <strong>{critic.avgRating}</strong> Avg
                      </span>
                    </div>

                    <button 
                      className="c-card-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCriticClick(critic.id);
                      }}
                    >
                      <span>View Profile & Reviews</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: ALL REVIEWS WITH 10-PER-PAGE PAGINATION */}
      {activeTab === 'all-reviews' && (
        <div className="reviews-feed-view animate-fade-in">
          {/* Filters and Search Bar */}
          <div className="critic-filters-bar glass-card">
            {/* Search Input */}
            <div className="critic-search-wrap">
              <Search size={16} className="search-icon" />
              <input 
                type="text"
                placeholder="Search reviews by movie title, keyword, or critic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="critic-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="critic-filters-row">
              {/* Verdict Filter */}
              <div className="filter-chip-group">
                <span className="filter-title">Verdict:</span>
                <button
                  className={`critic-filter-btn ${selectedVerdict === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedVerdict('All')}
                >
                  All Verdicts
                </button>
                {OAKSHOW_REMARKS_LIST.map(rem => (
                  <button
                    key={rem.key}
                    className={`critic-filter-btn ${selectedVerdict === rem.shortLabel || selectedVerdict === rem.title ? 'active' : ''}`}
                    onClick={() => setSelectedVerdict(rem.shortLabel)}
                    title={rem.meaning}
                  >
                    <img src={rem.icon} alt={rem.title} className="filter-cert-icon" />
                    <span>{rem.shortLabel}</span>
                  </button>
                ))}
              </div>

              {/* Critic Filter */}
              <div className="filter-chip-group">
                <span className="filter-title">Critic:</span>
                <button
                  className={`critic-filter-btn ${selectedAuthor === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedAuthor('All')}
                >
                  All Critics
                </button>
                {authors.map(auth => (
                  <button
                    key={auth}
                    className={`critic-filter-btn ${selectedAuthor === auth ? 'active' : ''}`}
                    onClick={() => setSelectedAuthor(auth)}
                  >
                    {auth}
                  </button>
                ))}
              </div>

              {/* Sorting */}
              <div className="filter-chip-group sort-group">
                <span className="filter-title">Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="critic-sort-dropdown"
                >
                  <option value="date-desc">Latest Date (Newest First) (Default)</option>
                  <option value="date-asc">Oldest to Newest Date</option>
                  <option value="rating-desc">Highest Rated to Lowest</option>
                  <option value="rating-asc">Lowest Rated to Highest</option>
                  <option value="title-asc">Movie Title (A to Z)</option>
                  <option value="title-desc">Movie Title (Z to A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Header */}
          <div className="reviews-results-header">
            <span className="results-count">
              Showing <strong>{filteredReviews.length === 0 ? 0 : (currentPage - 1) * REVIEWS_PER_PAGE + 1}–{Math.min(currentPage * REVIEWS_PER_PAGE, filteredReviews.length)}</strong> of <strong>{filteredReviews.length}</strong> reviews (10 per page)
            </span>
            {selectedVerdict !== 'All' || selectedAuthor !== 'All' || searchQuery ? (
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedVerdict('All');
                  setSelectedAuthor('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
            ) : null}
          </div>

          {/* Reviews Grid (10 items per page) */}
          {paginatedReviews.length > 0 ? (
            <div className="reviews-grid">
              {paginatedReviews.map((rev, idx) => {
                const bannerSrc = rev.banner ? (rev.banner.startsWith('/') ? rev.banner : `/${rev.banner}`) : '/favicon.png';
                const oakRemark = getOakShowRemark(rev.remark || rev.score);

                return (
                  <div key={idx} className="review-card glass-card" onClick={() => setActiveReviewModal(rev)}>
                    <div className="review-banner-wrap">
                      <img 
                        src={bannerSrc} 
                        alt={rev.title} 
                        className="review-banner-img"
                        loading="lazy"
                        onError={(e) => { e.target.src = '/favicon.png'; }}
                      />

                      <div className={`verdict-badge ${oakRemark.badgeClass}`} title={oakRemark.meaning}>
                        <img src={oakRemark.icon} alt={oakRemark.title} className="verdict-badge-icon" />
                        <span>{oakRemark.title}</span>
                      </div>
                    </div>

                    <div className="review-content-body">
                      <div className="review-rating-score-row">
                        <div className="rating-pill">
                          <img src={oakRemark.icon} alt={oakRemark.title} className="oakshow-cert-icon-inline" />
                          <span>{rev.rating || `${rev.score}/5`}</span>
                        </div>
                        {rev.date && (
                          <span className="review-date">
                            <Calendar size={12} />
                            {rev.date}
                          </span>
                        )}
                      </div>

                      <h3 className="review-card-title">{rev.title}</h3>
                      
                      <div 
                        className="review-author-meta hover-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCriticClick(rev.criticId || rev.author);
                        }}
                      >
                        <User size={13} className="author-icon" />
                        <span>By <strong>{rev.author || 'OakShow Critic'}</strong></span>
                      </div>

                      <p className="review-card-excerpt">
                        {rev.excerpt || 'Click to read this full review analysis.'}
                      </p>

                      <div className="review-card-footer">
                        <button className="read-review-btn">
                          <BookOpen size={14} />
                          <span>Read Full Review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-reviews-state glass-panel text-center py-5">
              <BookOpen size={36} className="text-muted mb-2" />
              <h3>No reviews match your filters</h3>
              <p>Try adjusting your search query, critic, or verdict filter.</p>
            </div>
          )}

          {/* 10-PER-PAGE PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination-controls glass-panel">
                <button 
                  className="page-btn page-nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <div className="page-numbers-group">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button 
                  className="page-btn page-nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  title="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <span className="pagination-indicator">Page {currentPage} of {totalPages} (10 reviews per page)</span>
            </div>
          )}
        </div>
      )}

      {/* Reader Modal */}
      {activeReviewModal && (
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
              {(() => {
                const modalRemark = getOakShowRemark(activeReviewModal.remark || activeReviewModal.score);
                return (
                  <>
                    <div className="reader-meta-bar">
                      <div className="rating-pill">
                        <img src={modalRemark.icon} alt={modalRemark.title} className="oakshow-cert-icon-inline" />
                        <span>Rating: {activeReviewModal.rating || `${activeReviewModal.score}/5`}</span>
                      </div>
                      <div className={`badge ${modalRemark.badgeClass}`} title={modalRemark.meaning}>
                        <img src={modalRemark.icon} alt={modalRemark.title} className="verdict-badge-icon" />
                        <span>{modalRemark.title}</span>
                      </div>
                      <button 
                        className="reader-author-btn"
                        onClick={() => {
                          setActiveReviewModal(null);
                          handleCriticClick(activeReviewModal.criticId || activeReviewModal.author);
                        }}
                      >
                        By <strong>{activeReviewModal.author}</strong>
                        <ExternalLink size={11} className="ms-1" />
                      </button>
                      {activeReviewModal.date && <span>• {activeReviewModal.date}</span>}
                    </div>

                    <h2 className="reader-title">{activeReviewModal.title}</h2>

                    <div className="reader-article-content">
                      {activeReviewModal.fullReview.split('\n\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>

                    <div className="reader-footer-actions">
                      {activeReviewModal.targetId && (
                        <button
                          className="btn btn-gold"
                          onClick={() => {
                            setActiveReviewModal(null);
                            handleMovieNavigate(activeReviewModal.targetId, activeReviewModal.movieSlug);
                          }}
                        >
                          <Film size={16} />
                          <span>View {activeReviewModal.targetTitle || 'Movie'} Hub, Ratings & Bookings</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Remarks & Meanings Guide Modal */}
      <RemarksGuideModal
        isOpen={remarksGuideOpen}
        onClose={() => setRemarksGuideOpen(false)}
      />

      {/* Dedicated Scoped Styles for Critic Reviews Hub */}
      <style>{`
        .critic-hub-root {
          padding-top: 10px;
          padding-bottom: 70px;
        }

        /* 1. Header Banner */
        .critic-hub-banner {
          padding: 28px 32px;
          margin: 16px 0 28px;
          border-radius: var(--radius-lg, 16px);
          background: linear-gradient(135deg, rgba(20, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }
        .critic-main-heading {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 12px 0 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .critic-subtext {
          font-size: 0.95rem;
          color: var(--text-muted, #94a3b8);
          line-height: 1.6;
          max-width: 840px;
          margin-bottom: 22px;
        }
        .critic-hub-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .critic-hub-tabs-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .critic-hub-tabs-row::-webkit-scrollbar {
          display: none;
        }
        .critic-hub-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .critic-hub-tab-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .critic-hub-tab-btn.active {
          background: #f59e0b;
          color: #000000;
          border-color: #f59e0b;
        }
        .remarks-guide-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 10px;
        }

        /* 2. Meet Our Critics Profiles View */
        .section-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .section-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-title-wrap h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .section-hint {
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .critics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .critic-profile-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-radius: 16px;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .critic-profile-card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.12);
        }
        .c-card-avatar-wrap {
          flex-shrink: 0;
        }
        .c-card-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f59e0b;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .c-card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .c-card-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px;
        }
        .c-card-desig {
          font-size: 0.82rem;
          font-weight: 600;
          color: #f59e0b;
          margin-bottom: 2px;
        }
        .c-card-loc {
          font-size: 0.78rem;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        .c-card-bio-snippet {
          font-size: 0.85rem;
          color: #cbd5e1;
          line-height: 1.5;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .c-card-meta-row {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }
        .c-card-pill {
          font-size: 0.76rem;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
        }
        .c-card-pill.pill-gold {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.3);
          color: #fbbf24;
        }
        .c-card-view-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #f59e0b;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: gap 0.2s ease;
        }
        .critic-profile-card:hover .c-card-view-btn {
          gap: 10px;
          color: #fbbf24;
        }

        /* 3. Filters Bar */
        .critic-filters-bar {
          padding: 20px 24px;
          border-radius: 16px;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 22px;
        }
        .critic-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(10, 14, 26, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0 14px;
          margin-bottom: 18px;
          transition: border-color 0.2s;
        }
        .critic-search-wrap:focus-within {
          border-color: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
        }
        .critic-search-wrap .search-icon {
          color: #94a3b8;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .critic-search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.92rem;
          padding: 12px 0;
        }
        .critic-search-input::placeholder {
          color: #64748b;
        }
        .clear-search-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .critic-filters-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }
        .filter-chip-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-right: 2px;
        }
        .critic-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .critic-filter-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .critic-filter-btn.active {
          background: #f59e0b;
          color: #000000;
          border-color: #f59e0b;
          font-weight: 700;
        }
        .filter-cert-icon {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }
        .critic-sort-dropdown {
          background: rgba(10, 14, 26, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        .reviews-results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 0.88rem;
          color: #94a3b8;
        }
        .reset-filters-btn {
          background: none;
          border: none;
          color: #f59e0b;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: underline;
        }

        /* 4. Reviews Grid (10 items per page) */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
        }
        .review-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(18, 24, 38, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .review-card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.15);
        }
        .review-banner-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0b0f19;
        }
        .review-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .review-card:hover .review-banner-img {
          transform: scale(1.04);
        }
        .verdict-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.76rem;
          font-weight: 700;
          background: rgba(10, 14, 26, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        .verdict-badge-icon {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }
        .review-content-body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .review-rating-score-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .oakshow-cert-icon-inline {
          width: 15px;
          height: 15px;
          object-fit: contain;
        }
        .review-date {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .review-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.4;
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .review-author-meta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: #94a3b8;
          margin-bottom: 12px;
          transition: color 0.2s ease;
        }
        .review-author-meta:hover {
          color: #f59e0b;
        }
        .review-card-excerpt {
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.55;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .review-card-footer {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .read-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          font-size: 0.85rem;
          font-weight: 600;
          color: #f59e0b;
          cursor: pointer;
          padding: 0;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .review-card:hover .read-review-btn {
          color: #fbbf24;
          gap: 12px;
        }

        /* 5. Pagination Controls */
        .pagination-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 36px;
        }
        .pagination-controls {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 12px;
          background: rgba(18, 24, 38, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .page-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .page-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .page-btn:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .page-numbers-group {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          max-width: 320px;
          padding: 2px;
        }
        .page-num-btn {
          min-width: 36px;
          height: 36px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .page-num-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .page-num-btn.active {
          background: #f59e0b;
          color: #000000;
          font-weight: 800;
        }
        .pagination-indicator {
          font-size: 0.82rem;
          color: #94a3b8;
        }

        /* 6. Reader Modal */
        .review-reader-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .review-reader-dialog {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 20px;
          background: #0e1320;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(245, 158, 11, 0.12);
          padding: 32px;
          color: #e2e8f0;
          -webkit-overflow-scrolling: touch;
        }
        .reader-hero-img-wrap {
          margin: -32px -32px 24px;
          max-height: 320px;
          overflow: hidden;
          background: #000;
        }
        .reader-hero-img {
          width: 100%;
          height: 100%;
          max-height: 320px;
          object-fit: cover;
        }
        .reader-meta-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .reader-author-btn {
          background: none;
          border: none;
          color: #f59e0b;
          cursor: pointer;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
        }
        .reader-article-content p {
          font-size: 1rem;
          line-height: 1.75;
          color: #cbd5e1;
          margin-bottom: 16px;
        }
        .reader-footer-actions {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Mobile Breakpoints */
        @media (max-width: 640px) {
          .critic-hub-banner {
            padding: 20px 16px;
            margin: 10px 0 18px;
          }
          .critic-hub-actions-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .critic-hub-tabs-row {
            width: 100%;
          }
          .critic-hub-tab-btn {
            flex: 1;
            justify-content: center;
            padding: 9px 12px;
            font-size: 0.82rem;
          }
          .remarks-guide-btn {
            width: 100%;
            justify-content: center;
          }
          .critics-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .critic-profile-card {
            padding: 16px;
          }
          .critic-filters-bar {
            padding: 16px 12px;
          }
          .critic-filters-row {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-chip-group {
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            flex-wrap: nowrap;
          }
          .filter-chip-group::-webkit-scrollbar {
            display: none;
          }
          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .review-reader-dialog {
            padding: 20px 16px;
            max-height: 94vh;
            border-radius: 16px;
          }
          .reader-hero-img-wrap {
            margin: -20px -16px 16px;
            max-height: 220px;
          }
          .reader-footer-actions .btn {
            width: 100%;
            justify-content: center;
          }
          .pagination-controls {
            width: 100%;
            max-width: 360px;
            justify-content: space-between;
          }
          .page-numbers-group {
            max-width: 180px;
          }
        }
      `}</style>
    </div>
  );
}

