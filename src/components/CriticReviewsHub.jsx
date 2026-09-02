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
    </div>
  );
}
