import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { 
  Star, 
  Play, 
  Bookmark, 
  Share2, 
  Ticket, 
  Music, 
  Film, 
  Users, 
  Clock, 
  Calendar, 
  Globe, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ExternalLink,
  ThumbsUp,
  Sparkles,
  ArrowLeft,
  Tv,
  Check,
  MessageSquare,
  Flame,
  Award,
  Eye,
  Info,
  Newspaper,
  Radio,
  Share,
  Tv2,
  ArrowRight,
  BookOpen,
  TrendingUp,
  X
} from 'lucide-react';
import ShareBar, { XTwitterIcon, FacebookIcon } from './ShareBar';
import VideoPlayerModal from './VideoPlayerModal';
import reviewsData from '../../data/reviews.json';
import criticsData from '../../data/critics.json';
import galleriesData from '../../data/galleries.json';
import { getOakShowRemark, cleanRatingSource } from '../utils/remarks';
import { getProfileImage, getBannerImage, getShareImage, handlePosterError, getItemCanonicalUrl, getBookingProviderInfo, getWatchOnlineProviderInfo, getYoutubeId } from '../utils/mediaUtils';

function parseScorePercentage(scoreStr) {
  if (!scoreStr) return 75;
  if (scoreStr.includes('%')) return Math.min(100, Math.max(10, parseFloat(scoreStr) || 70));
  if (scoreStr.includes('/10')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 7;
    return Math.min(100, Math.max(10, (num / 10) * 100));
  }
  if (scoreStr.includes('/5')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 3.5;
    return Math.min(100, Math.max(10, (num / 5) * 100));
  }
  if (scoreStr.includes('/100')) {
    const num = parseFloat(scoreStr.split('/')[0]) || 70;
    return Math.min(100, Math.max(10, num));
  }
  const n = parseFloat(scoreStr);
  if (!isNaN(n)) {
    if (n <= 5) return (n / 5) * 100;
    if (n <= 10) return (n / 10) * 100;
    return Math.min(100, n);
  }
  return 75;
}

export default function MovieDetailPage({ 
  movie, 
  allMovies = [], 
  onNavigate, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'watch', 'music', 'bookings', 'socials', 'cast', 'videos', 'community'
  const [userRating, setUserRating] = useState(0);
  const [userReviewText, setUserReviewText] = useState('');
  const [userReviewerName, setUserReviewerName] = useState('');
  const [hasSpoiler, setHasSpoiler] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  // Automatically scroll to top whenever movie page loads or changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [movie?.id]);

  const [activeInternalReviewModal, setActiveInternalReviewModal] = useState(null);

  // Check if OakShow internal critics reviewed this movie
  const internalReviews = useMemo(() => {
    if (!movie) return [];
    const cleanId = (movie.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTitle = (movie.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    return (reviewsData || []).filter(r => {
      const rMovieId = (r.movieId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const rMovie = (r.movie || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return (rMovieId && (rMovieId === cleanId || cleanId.includes(rMovieId) || rMovieId.includes(cleanId))) ||
             (rMovie && (rMovie === cleanTitle || cleanTitle.includes(rMovie) || rMovie.includes(cleanTitle)));
    });
  }, [movie]);

  // Find if this movie has an official photo gallery / wallpapers
  const movieGallery = useMemo(() => {
    if (!movie) return null;
    const cleanId = (movie.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTitle = (movie.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return (galleriesData || []).find(g => {
      const gSlug = (g.movieSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const gTitle = (g.movieTitle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return (gSlug && (gSlug === cleanId || cleanId.includes(gSlug) || gSlug.includes(cleanId))) ||
             (gTitle && (gTitle === cleanTitle || cleanTitle.includes(gTitle) || gTitle.includes(cleanTitle)));
    });
  }, [movie]);

  // Combined Cinema Stills & Gallery Images (preserving all original asset paths and directories)
  const movieStills = useMemo(() => {
    if (!movie) return [];
    const list = [];
    if (movie.gallery && movie.gallery.length > 0) {
      list.push(...movie.gallery);
    } else if (movieGallery && movieGallery.images && movieGallery.images.length > 0) {
      list.push(...movieGallery.images);
    }

    // Ensure primary poster is always available at index 0
    const pSrc = getProfileImage(movie);
    if (pSrc && pSrc !== '/favicon.png') {
      const hasPoster = list.some(item => {
        const s = (item.src || '').toLowerCase();
        return s === pSrc.toLowerCase() || s.endsWith('/1.jpg') || s.endsWith('/1.jpeg') || s.endsWith('/1.png');
      });
      if (!hasPoster) {
        list.unshift({ src: pSrc, alt: `${movie.title} Official Poster` });
      }
    }

    // Fallback if list is empty
    if (list.length === 0) {
      const bSrc = getBannerImage(movie);
      if (bSrc && bSrc !== '/favicon.png') {
        list.push({ src: bSrc, alt: `${movie.title} Cinematic Banner` });
      }
    }
    return list;
  }, [movie, movieGallery]);

  // Combined Trailers, Songs & Videos with robust YouTube ID resolution
  const movieVideos = useMemo(() => {
    if (!movie) return [];
    const list = [];
    const seen = new Set();
    const add = (v) => {
      if (!v) return;
      const ytid = getYoutubeId(v);
      const key = ytid || v.url || v.title;
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push({ ...v, youtubeId: ytid || v.youtubeId });
      }
    };
    if (Array.isArray(movie.videos)) movie.videos.forEach(add);
    if (Array.isArray(movie.trailers)) movie.trailers.forEach(add);
    return list;
  }, [movie]);

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex === null || movieStills.length === 0) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % movieStills.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null || movieStills.length === 0) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + movieStills.length) % movieStills.length);
  };

  // Lock body scroll on mobile and desktop when lightbox is active
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [activeLightboxIndex]);

  // Mobile Touch Swipe Handling (left = next, right = prev)
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchStartX.current = e.targetTouches[0].clientX;
      touchEndX.current = null;
    }
  };

  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        nextLightbox();
      } else if (diff < -45) {
        prevLightbox();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Smoothly scroll to the tabs navigation header when changing tabs
  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
    const navEl = document.querySelector('.movie-tabs-nav');
    if (navEl) {
      const targetPos = navEl.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Local community reviews stored in localStorage
  const [communityReviews, setCommunityReviews] = useState(() => {
    try {
      if (!movie) return [];
      const saved = localStorage.getItem(`oakshow_reviews_${movie.id}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: '1',
        author: 'Rahul Sharma',
        rating: 9,
        date: 'Recent',
        comment: `Incredible cinematic experience. Outstanding performances and direction. A must watch for every film lover!`,
        likes: 14,
        isUser: false
      },
      {
        id: '2',
        author: 'Priya M.',
        rating: 8.5,
        date: 'Recent',
        comment: `Brilliant storytelling with fantastic background score and visuals. Highly recommended!`,
        likes: 9,
        isUser: false
      }
    ];
  });

  // Calculate next & previous movies for bottom navigation
  const { prevMovie, nextMovie } = useMemo(() => {
    if (!allMovies || allMovies.length === 0 || !movie) return { prevMovie: null, nextMovie: null };
    const currentIndex = allMovies.findIndex(m => m.id === movie.id);
    if (currentIndex === -1) return { prevMovie: null, nextMovie: null };
    const prev = currentIndex > 0 ? allMovies[currentIndex - 1] : allMovies[allMovies.length - 1];
    const next = currentIndex < allMovies.length - 1 ? allMovies[currentIndex + 1] : allMovies[0];
    return { prevMovie: prev, nextMovie: next };
  }, [allMovies, movie]);

  // Similar movies
  const similarMovies = useMemo(() => {
    if (!allMovies || !movie) return [];
    return allMovies
      .filter(m => m.id !== movie.id && (
        (movie.genre && m.genre && m.genre.toLowerCase().includes(movie.genre.split(',')[0]?.trim().toLowerCase())) ||
        (movie.language && m.language === movie.language)
      ))
      .slice(0, 8);
  }, [allMovies, movie]);

  // Profile picture dimension poster (1.jpg / 1.JPG with fallback)
  const posterSrc = getProfileImage(movie);
  // Cinematic wide hero backdrop banner (2.jpg / 2.JPG with fallback)
  const bannerSrc = getBannerImage(movie);
  // Social share image (2.jpg / 2.JPG with fallback)
  const shareImageSrc = getShareImage(movie);

  // Handle Review Submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userReviewText.trim() || userRating === 0) return;

    const newRev = {
      id: Date.now().toString(),
      author: userReviewerName.trim() || 'OakShow Cinephile',
      rating: userRating,
      date: 'Just now',
      comment: userReviewText.trim(),
      hasSpoiler,
      likes: 0,
      isUser: true
    };

    const updated = [newRev, ...communityReviews];
    setCommunityReviews(updated);
    try {
      localStorage.setItem(`oakshow_reviews_${movie.id}`, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setUserReviewText('');
    setReviewSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffb800', '#10b981', '#ffffff']
    });
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleLikeReview = (revId) => {
    setCommunityReviews(prev => prev.map(r => r.id === revId ? { ...r, likes: r.likes + 1 } : r));
  };

  const handleBookmarkToggle = () => {
    onToggleBookmark(movie);
    if (!isBookmarked) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#ffb800', '#e50914', '#ffffff']
      });
    }
  };

  const scrollToShare = () => {
    const el = document.getElementById('share-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const allRatings = movie.ratings || [];
  const watchOnlineList = movie.watchOnline || [];
  const musicList = movie.music || [];
  const socialsList = movie.socials || [];
  const officialWebsite = movie.officialWebsite || null;

  // Include District, PVR, Cinepolis, Cineworld, BookMyShow, Paytm, etc. strictly when hyperlinks are present
  const allowedBookings = useMemo(() => {
    if (!movie || !movie.bookings || movie.bookings.length === 0) return [];
    const getRank = (provider = '', url = '') => {
      const s = `${provider} ${url}`.toLowerCase();
      if (s.includes('bookmyshow') || s.includes('book my show') || s.includes('in.bookmyshow.com')) return { name: 'BookMyShow', rank: 1 };
      if (s.includes('district') || s.includes('insider.in') || s.includes('district.in')) return { name: 'District', rank: 2 };
      if (s.includes('paytm')) return { name: 'Paytm', rank: 3 };
      if (s.includes('pvr') || s.includes('pvrcinemas')) return { name: 'PVR', rank: 4 };
      if (s.includes('cinepolis') || s.includes('cinepolisindia')) return { name: 'Cinepolis', rank: 5 };
      if (s.includes('ticketnew') || s.includes('ticket new')) return { name: 'TicketNew', rank: 6 };
      if (s.includes('fandango')) return { name: 'Fandango', rank: 7 };
      if (s.includes('cineworld')) return { name: 'Cineworld', rank: 8 };
      if (s.includes('odeon')) return { name: 'ODEON', rank: 9 };
      if (s.includes('eventbrite')) return { name: 'Eventbrite', rank: 10 };
      if (url && url.trim() && url !== '#') return { name: provider || 'Tickets', rank: 99 };
      return null;
    };

    const list = [];
    const seen = new Set();
    movie.bookings.forEach(b => {
      if (!b.url || b.url.trim() === '' || b.url === '#') return; // only if hyperlink is present
      const match = getRank(b.provider, b.url);
      if (match) {
        const key = `${match.name}:${b.url}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ ...b, provider: match.name, rank: match.rank });
        }
      }
    });
    list.sort((a, b) => a.rank - b.rank);
    return list;
  }, [movie?.bookings]);

  return (
    <div className="movie-page-root animate-fade-in">
      {/* Top Breadcrumb & Quick Controls */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button className="topbar-back-btn" onClick={() => onNavigate('discover')}>
              <ArrowLeft size={18} />
              <span>Back to Catalog</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate(movie.type === 'series' ? 'series-hub' : 'discover')}>
                {movie.type === 'series' ? 'TV Series' : 'Movies'}
              </span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">{movie.title}</span>
            </div>

            <div className="topbar-actions">
              <button 
                className={`topbar-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={handleBookmarkToggle}
                title={isBookmarked ? 'Saved to Watchlist' : 'Add to Watchlist'}
              >
                <Bookmark size={16} fill={isBookmarked ? '#ffb800' : 'none'} color={isBookmarked ? '#ffb800' : 'currentColor'} />
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

      {/* Cinematic Hero Backdrop Stage (2.jpg / banner) */}
      <section className="movie-hero-stage" style={{ backgroundImage: `url(${bannerSrc || posterSrc || '/favicon.png'})` }}>
        <div className="movie-hero-overlay" />
        <div className="container">
          <div className="movie-hero-content">
            {/* Poster Card */}
            <div 
              className="movie-hero-poster-wrap clickable-poster"
              onClick={() => openLightbox(0)}
              title="Click to view full-size poster & stills"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(0); } }}
            >
              {posterSrc ? (
                <img 
                  src={posterSrc} 
                  alt={movie.title} 
                  className="movie-hero-poster-img"
                  onError={(e) => handlePosterError(e, movie.poster)}
                />
              ) : (
                <div className="movie-hero-poster-fallback">
                  <Film size={54} />
                  <span>{movie.title}</span>
                </div>
              )}

              <div className="poster-zoom-hint">
                <Eye size={15} />
                <span>View Poster</span>
              </div>

              {/* Quick Trailer Play Button on Poster */}
              {movie.videos && movie.videos.length > 0 && (
                <button 
                  className="poster-play-trailer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideo(movie.videos[0]);
                  }}
                  title="Play Official Trailer"
                >
                  <Play size={22} fill="#ffffff" />
                  <span>Play Trailer</span>
                </button>
              )}
            </div>

            {/* Title & Metadata Info */}
            <div className="movie-hero-details">
              <div className="movie-hero-header-info">
                <div className="movie-badges-strip">
                  {movie.type === 'series' && <span className="badge badge-red">TV Series</span>}
                  {movie.language && <span className="badge badge-cyan">{movie.language}</span>}
                  {movie.genre && <span className="badge badge-gold">{movie.genre}</span>}
                  {movie.year && <span className="badge badge-dark">Year {movie.year}</span>}
                  {movie.duration && movie.duration !== 'N/A' && <span className="badge badge-dark">{movie.duration}</span>}
                </div>

                <h1 className="movie-main-title">{movie.title}</h1>
                {movie.metaTitle && movie.metaTitle !== movie.title && (
                  <p className="movie-sub-title">{movie.metaTitle}</p>
                )}
              </div>

              {/* Mobile Only: All Ratings, Reviews, Songs, Videos, Bookings and News (Positioned just below poster & name, and above description) */}
              <div className="mobile-hero-quick-nav">
                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('overview')}
                >
                  <Star size={12} className="mh-nav-icon text-gold" />
                  <span>All Ratings</span>
                </button>

                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'articles' || activeTab === 'community' ? 'active' : ''}`}
                  onClick={() => handleTabSelect(movie.articles && movie.articles.length > 0 ? 'articles' : 'community')}
                >
                  <Award size={12} className="mh-nav-icon text-accent" />
                  <span>Reviews</span>
                </button>

                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'music' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('music')}
                >
                  <Music size={12} className="mh-nav-icon text-purple" />
                  <span>Songs</span>
                </button>

                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'videos' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('videos')}
                >
                  <Play size={12} className="mh-nav-icon text-red" />
                  <span>Videos</span>
                </button>

                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('bookings')}
                >
                  <Ticket size={12} className="mh-nav-icon text-emerald" />
                  <span>Bookings</span>
                </button>

                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'articles' ? 'active' : ''}`}
                  onClick={() => handleTabSelect(movie.articles && movie.articles.length > 0 ? 'articles' : 'overview')}
                >
                  <Newspaper size={12} className="mh-nav-icon text-cyan" />
                  <span>News</span>
                </button>
              </div>

              {/* Dynamic Quick Ratings Summary Bar */}
              <div className="movie-hero-ratings-bar">
                {allRatings.map((r, idx) => {
                  const sourceClean = cleanRatingSource(r.source);
                  const isOak = sourceClean === 'OakShow' || r.source === 'OakShow';
                  const oakRemark = isOak ? getOakShowRemark(r.score) : null;
                  
                  if (isOak) {
                    return (
                      <div
                        key={idx}
                        className="rating-pill-source oakshow-hero-rating-pill"
                        title={oakRemark ? `OakShow Verdict: ${oakRemark.title} (${r.score}) — ${oakRemark.meaning}` : 'OakShow Rating'}
                      >
                        {oakRemark ? (
                          <img 
                            src={oakRemark.icon} 
                            alt={oakRemark.title} 
                            className="oakshow-cert-icon-inline"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : null}
                        <span className="source-tag">{sourceClean}</span>
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
                      title={r.url ? `View on ${sourceClean}` : sourceClean}
                    >
                      <span className="source-tag">{sourceClean}</span>
                      <span className="source-score">{r.score}</span>
                    </a>
                  );
                })}
              </div>

              {/* Quick Meta Row */}
              <div className="movie-meta-grid">
                {movie.director && (
                  <div className="meta-item">
                    <span className="meta-lbl">Director:</span>
                    <span className="meta-val">{movie.director}</span>
                  </div>
                )}
                {movie.releaseDate && (
                  <div className="meta-item">
                    <span className="meta-lbl">Release Date:</span>
                    <span className="meta-val">{movie.releaseDate}</span>
                  </div>
                )}
                {officialWebsite && (
                  <div className="meta-item">
                    <span className="meta-lbl">Website:</span>
                    <a 
                      href={officialWebsite.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="meta-val link-highlight"
                    >
                      Official Site <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* Synopsis / Description with Expandable Mobile View */}
              {(movie.description || movie.plot) && (
                <div className="movie-synopsis-wrap">
                  <p className={`movie-synopsis ${!synopsisExpanded ? 'synopsis-truncated' : 'synopsis-full'}`}>
                    {movie.description || movie.plot}
                  </p>
                  {(movie.description || movie.plot).length > 180 && (
                    <button 
                      className="synopsis-toggle-btn"
                      onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                      type="button"
                    >
                      <span>{synopsisExpanded ? 'Show Less' : 'Read Full Synopsis...'}</span>
                      <ChevronDown size={14} className={`synopsis-toggle-icon ${synopsisExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              )}

              {/* Hero Call-To-Action Buttons */}
              <div className="movie-hero-cta-row">
                {movie.videos && movie.videos.length > 0 && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveVideo(movie.videos[0])}
                  >
                    <Play size={18} fill="#ffffff" />
                    <span>Watch Trailer</span>
                  </button>
                )}

                {watchOnlineList.length > 0 && (
                  <a 
                    href={watchOnlineList[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-cyan"
                  >
                    <Tv2 size={18} />
                    <span>Watch Online ({watchOnlineList[0].provider})</span>
                  </a>
                )}

                {musicList.length > 0 && (
                  <a 
                    href={musicList[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-purple"
                  >
                    <Music size={18} />
                    <span>Listen Songs ({musicList[0].provider})</span>
                  </a>
                )}

                {movie.bookings && movie.bookings.length > 0 && (
                  <a 
                    href={movie.bookings[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-emerald"
                  >
                    <Ticket size={18} />
                    <span>Book Tickets</span>
                  </a>
                )}

                <button 
                  className={`btn btn-secondary ${isBookmarked ? 'active' : ''}`}
                  onClick={handleBookmarkToggle}
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

      {/* Main Content Area with Navigation Tabs */}
      <div className="container movie-main-body">
        {/* Navigation Tabs Header */}
        <div className="movie-tabs-nav glass-panel">
          <button 
            className={`movie-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabSelect('overview')}
          >
            <span>All Ratings & Overview ({allRatings.length})</span>
          </button>

          {movie.articles && movie.articles.length > 0 && (
            <button 
              className={`movie-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => handleTabSelect('articles')}
            >
              <span>Reviews & News ({movie.articles.length})</span>
            </button>
          )}

          {watchOnlineList.length > 0 && (
            <button 
              className={`movie-tab-btn ${activeTab === 'watch' ? 'active' : ''}`}
              onClick={() => handleTabSelect('watch')}
            >
              <span>Watch Online ({watchOnlineList.length})</span>
            </button>
          )}

          {musicList.length > 0 && (
            <button 
              className={`movie-tab-btn ${activeTab === 'music' ? 'active' : ''}`}
              onClick={() => handleTabSelect('music')}
            >
              <span>Songs & Music ({musicList.length})</span>
            </button>
          )}

          {allowedBookings.length > 0 && (
            <button 
              className={`movie-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => handleTabSelect('bookings')}
            >
              <span>Bookings ({allowedBookings.length})</span>
            </button>
          )}

          {(socialsList.length > 0 || officialWebsite) && (
            <button 
              className={`movie-tab-btn ${activeTab === 'socials' ? 'active' : ''}`}
              onClick={() => handleTabSelect('socials')}
            >
              <span>Socials & Website</span>
            </button>
          )}

          <button 
            className={`movie-tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
            onClick={() => handleTabSelect('cast')}
          >
            <span>Cast & Crew ({movie.cast?.length || 0})</span>
          </button>

          <button 
            className={`movie-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => handleTabSelect('videos')}
          >
            <span>Trailers & Gallery ({(movie.videos?.length || 0) + (movieGallery?.images?.length || movie.gallery?.length || 0)})</span>
          </button>

          <button 
            className={`movie-tab-btn ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => handleTabSelect('community')}
          >
            <span>Community Reviews ({communityReviews.length})</span>
          </button>
        </div>

        {/* Tab 1: OVERVIEW / ALL RATINGS & SUMMARY */}
        {activeTab === 'overview' && (
          <div className="tab-pane animate-fade-in">
            {/* OAKSHOW IN-HOUSE CRITIC REVIEWS COLUMN (Displayed ONLY if internal reviews exist) */}
            {internalReviews.length > 0 && (
              <div className="section-block in-house-critic-section">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Award size={22} className="text-gold" />
                    <h2>OakShow In-House Critic Review ({internalReviews.length} Official {internalReviews.length > 1 ? 'Reviews' : 'Review'})</h2>
                  </div>
                  <span className="section-badge badge-gold">OakShow Certified Editorial</span>
                </div>

                <div className="in-house-reviews-grid">
                  {internalReviews.map((rev, idx) => {
                    const oakRemark = getOakShowRemark(rev.remark || rev.score);
                    const avatar = rev.criticAvatar ? (rev.criticAvatar.startsWith('/') ? rev.criticAvatar : `/${rev.criticAvatar}`) : '/favicon.png';
                    const pct = (rev.score / 5) * 100;

                    return (
                      <div key={idx} className={`in-house-review-card glass-card ${oakRemark.badgeClass}`}>
                        <div className="ihr-top-bar">
                          <div 
                            className="ihr-critic-info hover-link"
                            onClick={() => onNavigate(`critic/${rev.criticId || rev.author}`)}
                          >
                            <img 
                              src={avatar} 
                              alt={rev.author} 
                              className="ihr-critic-avatar"
                              onError={(e) => { e.target.src = '/favicon.png'; }}
                            />
                            <div className="ihr-critic-text">
                              <span className="ihr-critic-name">{rev.author}</span>
                              <span className="ihr-critic-sub">OakShow Certified Critic</span>
                            </div>
                          </div>

                          <div className="ihr-meta-right">
                            <div className={`verdict-badge ${oakRemark.badgeClass}`} title={oakRemark.meaning}>
                              <img src={oakRemark.icon} alt={oakRemark.title} className="verdict-badge-icon" />
                              <span>{oakRemark.title}</span>
                            </div>
                            {rev.date && (
                              <span className="ihr-date">
                                <Calendar size={12} />
                                {rev.date}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="ihr-rating-row">
                          <div className="ihr-rating-pill">
                            <img src={oakRemark.icon} alt={oakRemark.title} className="oakshow-cert-icon-inline" />
                            <span className="ihr-score">{rev.rating || `${rev.score}/5`}</span>
                          </div>
                          <div className="ihr-meter-wrap">
                            <div className="ihr-meter-fill" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="ihr-verdict-label">{oakRemark.shortLabel}</span>
                        </div>

                        <h3 className="ihr-headline" onClick={() => setActiveInternalReviewModal(rev)}>
                          "{rev.title}"
                        </h3>

                        <p className="ihr-excerpt">
                          {rev.excerpt}
                        </p>

                        <div className="ihr-actions">
                          <button className="btn btn-gold ihr-read-btn" onClick={() => setActiveInternalReviewModal(rev)}>
                            <BookOpen size={14} />
                            <span>Read Full In-House Review</span>
                          </button>
                          <button 
                            className="btn btn-secondary ihr-profile-btn"
                            onClick={() => onNavigate(`critic/${rev.criticId || rev.author}`)}
                          >
                            <Users size={14} />
                            <span>Critic Profile</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Verified Ratings Cards Grid */}
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Star size={20} className="text-gold" />
                  <h2>All Ratings & Critic Reviews ({allRatings.length} Available Sources)</h2>
                </div>
                <span className="section-hint">Click on any source card to read the complete review on the original publication</span>
              </div>

              {allRatings.length > 0 ? (
                <div className="ratings-grid">
                  {allRatings.map((r, idx) => {
                    const sourceClean = cleanRatingSource(r.source);
                    const isOak = sourceClean === 'OakShow' || r.source === 'OakShow';
                    const oakRemark = isOak ? getOakShowRemark(r.score) : null;
                    const pct = parseScorePercentage(r.score);
                    const isGold = pct >= 75;
                    const isGreen = pct >= 55 && pct < 75;
                    const iconSrc = isOak && oakRemark ? oakRemark.icon : (r.icon ? (r.icon.startsWith('/') ? r.icon : `/${r.icon}`) : null);

                    return (
                      <div 
                        key={idx} 
                        className={`rating-card ${isOak ? 'card-oakshow' : ''}`}
                      >
                        <div className="rc-header">
                          <div className="rc-source-group">
                            {iconSrc ? (
                              <img 
                                src={iconSrc} 
                                alt={sourceClean} 
                                className={`rc-source-icon ${isOak ? 'rc-oakshow-cert-icon' : ''}`} 
                                onError={(e) => { e.target.style.display = 'none'; }} 
                              />
                            ) : (
                              <Star size={16} className="text-gold" />
                            )}
                            <span className="rc-source">{sourceClean}</span>
                          </div>
                          <span className={`rc-score-pill ${isOak && oakRemark ? oakRemark.badgeClass : (isGold ? 'pill-gold' : isGreen ? 'pill-green' : 'pill-yellow')}`}>
                            {r.score}
                          </span>
                        </div>

                        <div className="rc-body">
                          <span className="rc-score-main">{r.score}</span>
                          <span className="rc-label">{isOak && oakRemark ? `Official Verdict: ${oakRemark.title}` : 'Verified Reviewer Verdict'}</span>
                        </div>

                        <div className="rc-meter">
                          <div 
                            className={`rc-fill ${isGold ? 'fill-gold' : isGreen ? 'fill-emerald' : 'fill-red'}`} 
                            style={{ width: `${pct}%` }} 
                          />
                        </div>

                        {!isOak && r.url && r.url !== '#' ? (
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
              ) : (
                <div className="empty-state-card glass-panel">
                  <Star size={36} className="text-gold" />
                  <p>Ratings and reviews will be updated shortly for this title.</p>
                </div>
              )}
            </div>

            {/* Box Office Performance & Financial Breakdown */}
            {movie.boxOffice && (
              <div className="section-block boxoffice-section">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <TrendingUp size={20} className="text-emerald" />
                    <h2>Box Office Collections & Financial Verdict</h2>
                  </div>
                  {movie.boxOffice.verdict && (
                    <span className="badge badge-emerald">🏆 {movie.boxOffice.verdict}</span>
                  )}
                </div>

                <div className="boxoffice-card glass-panel">
                  <div className="bo-main-highlight">
                    <div className="bo-main-stat">
                      <span className="bo-stat-label">Worldwide Box Office Gross</span>
                      <span className="bo-stat-val text-emerald">{movie.boxOffice.worldwideGross || '—'}</span>
                    </div>
                    {movie.boxOffice.verdict && (
                      <div className="bo-verdict-tag">
                        <span>Commercial Status:</span>
                        <strong>{movie.boxOffice.verdict}</strong>
                      </div>
                    )}
                  </div>

                  <div className="bo-metrics-grid">
                    {movie.boxOffice.openingDay && (
                      <div className="bo-metric-box">
                        <span className="bo-m-label">Opening Day</span>
                        <span className="bo-m-val">{movie.boxOffice.openingDay}</span>
                      </div>
                    )}
                    {movie.boxOffice.openingWeekend && (
                      <div className="bo-metric-box">
                        <span className="bo-m-label">Opening Weekend</span>
                        <span className="bo-m-val">{movie.boxOffice.openingWeekend}</span>
                      </div>
                    )}
                    {movie.boxOffice.indiaGross && (
                      <div className="bo-metric-box">
                        <span className="bo-m-label">India Gross</span>
                        <span className="bo-m-val">{movie.boxOffice.indiaGross}</span>
                      </div>
                    )}
                    {movie.boxOffice.overseasGross && (
                      <div className="bo-metric-box">
                        <span className="bo-m-label">Overseas Total</span>
                        <span className="bo-m-val">{movie.boxOffice.overseasGross}</span>
                      </div>
                    )}
                    {movie.boxOffice.budget && (
                      <div className="bo-metric-box">
                        <span className="bo-m-label">Estimated Budget</span>
                        <span className="bo-m-val">{movie.boxOffice.budget}</span>
                      </div>
                    )}
                  </div>

                  {(movie.boxOffice.lastUpdated || movie.boxOffice.source) && (
                    <div className="bo-footer-meta">
                      {movie.boxOffice.lastUpdated && <span>Updated: {movie.boxOffice.lastUpdated}</span>}
                      {movie.boxOffice.source && <span> • Source: {movie.boxOffice.source}</span>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SQUEEZED 3 LARGER DIMENSION CINEMA STILLS & POSTERS SHOWCASE */}
            {movieStills.length > 0 && (
              <div className="section-block cinema-stills-section">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Film size={20} className="text-gold" />
                    <h2>Official Production Stills & HD Posters ({movieStills.length} Photos)</h2>
                  </div>
                  {movieStills.length > 3 && (
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('videos')}>
                      <span>View All {movieStills.length} Stills & Posters</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>

                <div className="cinema-stills-3grid">
                  {movieStills.map((still, idx) => {
                    const src = still.src.startsWith('/') ? still.src : `/${still.src}`;
                    return (
                      <div 
                        key={idx} 
                        className="cinema-still-card glass-card clickable"
                        onClick={() => openLightbox(idx)}
                        title="Click to expand high-resolution still"
                      >
                        <div className="cinema-still-img-wrap">
                          <img 
                            src={src} 
                            alt={still.alt || `${movie.title} Production Still ${idx + 1}`} 
                            className="cinema-still-img"
                            loading="lazy"
                            onError={(e) => { e.target.src = '/favicon.png'; }}
                          />
                          <div className="cinema-still-overlay">
                            <Eye size={24} className="text-white" />
                            <span className="still-number-badge">HD Still #{idx + 1}</span>
                          </div>
                        </div>
                        {still.alt && (
                          <div className="cinema-still-caption">
                            <span>{still.alt}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Watch It Online (OTT Streaming Links) - Top 3 Preview */}
            {watchOnlineList.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Tv2 size={20} className="text-cyan" />
                    <h2>Watch It Online & OTT Streaming ({watchOnlineList.length} Options)</h2>
                  </div>
                </div>
                <div className="media-partner-grid">
                  {watchOnlineList.slice(0, 3).map((w, idx) => {
                    const info = getWatchOnlineProviderInfo(w);
                    return (
                      <a
                        key={idx}
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="media-link-card glass-panel"
                      >
                        <div className="mlc-icon-wrap">
                          {info.icon ? (
                            <img 
                              src={info.icon} 
                              alt={info.provider} 
                              className="mlc-icon-img" 
                              onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'block';
                              }} 
                            />
                          ) : null}
                          <Tv2 size={24} className="text-cyan" style={{ display: info.icon ? 'none' : 'block' }} />
                        </div>
                        <div className="mlc-info">
                          <div className="mlc-header-row">
                            <span className="mlc-provider">{info.provider}</span>
                            {w.language && <span className="badge badge-cyan mlc-lang">{w.language}</span>}
                          </div>
                          <span className="mlc-action">{w.label || `Watch on ${info.provider}`}</span>
                        </div>
                        <ExternalLink size={16} className="mlc-arrow" />
                      </a>
                    );
                  })}
                </div>
                {watchOnlineList.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('watch')}>
                      <span>View all {watchOnlineList.length} Streaming Places & Languages</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Download / Listen To All Songs (Music & Soundtracks) - Top 3 Preview */}
            {musicList.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Music size={20} className="text-purple" />
                    <h2>Download / Listen To All Songs ({musicList.length} Links)</h2>
                  </div>
                </div>
                <div className="media-partner-grid">
                  {musicList.slice(0, 3).map((m, idx) => (
                    <a
                      key={idx}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-link-card glass-panel"
                    >
                      <div className="mlc-icon-wrap">
                        {m.icon ? (
                          <img src={m.icon.startsWith('/') ? m.icon : `/${m.icon}`} alt={m.provider} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                          <Music size={24} className="text-purple" />
                        )}
                      </div>
                      <div className="mlc-info">
                        <div className="mlc-header-row">
                          <span className="mlc-provider">{m.provider}</span>
                          {m.language && <span className="badge badge-gold mlc-lang">{m.language}</span>}
                        </div>
                        <span className="mlc-action">{m.label || 'Listen Soundtrack'}</span>
                      </div>
                      <ExternalLink size={16} className="mlc-arrow" />
                    </a>
                  ))}
                </div>
                {musicList.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('music')}>
                      <span>View all {musicList.length} Music Platforms</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Official Website & Social Media Accounts - Top 3 Preview */}
            {(socialsList.length > 0 || officialWebsite) && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Globe size={20} className="text-emerald" />
                    <h2>Official Website & Social Media Accounts</h2>
                  </div>
                </div>

                <div className="media-partner-grid">
                  {officialWebsite && (
                    <a
                      href={officialWebsite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-link-card glass-panel highlight-border"
                    >
                      <div className="mlc-icon-wrap">
                        <Globe size={24} className="text-emerald" />
                      </div>
                      <div className="mlc-info">
                        <span className="mlc-provider">Official Website</span>
                        <span className="mlc-action">{officialWebsite.label || 'Visit Official Movie Site'}</span>
                      </div>
                      <ExternalLink size={16} className="mlc-arrow" />
                    </a>
                  )}

                  {socialsList.slice(0, 3).map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-link-card glass-panel"
                    >
                      <div className="mlc-icon-wrap">
                        {s.icon ? (
                          <img src={s.icon.startsWith('/') ? s.icon : `/${s.icon}`} alt={s.platform} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : s.platform.toLowerCase().includes('twitter') ? (
                          <XTwitterIcon size={22} />
                        ) : s.platform.toLowerCase().includes('facebook') ? (
                          <FacebookIcon size={22} />
                        ) : (
                          <Globe size={22} />
                        )}
                      </div>
                      <div className="mlc-info">
                        <div className="mlc-header-row">
                          <span className="mlc-provider">{s.platform}</span>
                          {s.language && <span className="badge badge-dark mlc-lang">{s.language}</span>}
                        </div>
                        <span className="mlc-action">{s.label || `Follow on ${s.platform}`}</span>
                      </div>
                      <ExternalLink size={16} className="mlc-arrow" />
                    </a>
                  ))}
                </div>
                {socialsList.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('socials')}>
                      <span>View All Social Links & Website</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Post-Release News and Reviews Articles - Top 3 Preview */}
            {movie.articles && movie.articles.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Newspaper size={20} className="text-cyan" />
                    <h2>Reviews & News Articles ({movie.articles.length} Reports)</h2>
                  </div>
                </div>

                <div className="critic-reviews-list">
                  {movie.articles.slice(0, 3).map((art, idx) => (
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
                        <span>Read full article</span>
                        <ExternalLink size={14} />
                      </div>
                    </a>
                  ))}
                </div>
                {movie.articles.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('articles')}>
                      <span>Read all {movie.articles.length} Press Reviews & Reports</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quick Booking Strip - Top 3 Preview */}
            {allowedBookings.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Ticket size={20} className="text-emerald" />
                    <h2>Instant Ticket Bookings ({allowedBookings.length} Options)</h2>
                  </div>
                </div>
                <div className="booking-partners-row">
                  {allowedBookings.slice(0, 3).map((b, idx) => {
                    const info = getBookingProviderInfo(b);
                    return (
                      <a 
                        key={idx} 
                        href={b.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`booking-partner-card ${info.themeClass || ''}`}
                      >
                        <div className="bp-icon-wrap">
                          {info.icon ? (
                            <img 
                              src={info.icon} 
                              alt={info.provider} 
                              className="bp-icon-img" 
                              onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'block';
                              }} 
                            />
                          ) : null}
                          <Ticket size={22} className="text-emerald" style={{ display: info.icon ? 'none' : 'block' }} />
                        </div>
                        <div className="bp-info">
                          <span className="bp-provider">{info.provider}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
                {allowedBookings.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('bookings')}>
                      <span>View all {allowedBookings.length} Booking Partners</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Featured Trailers Quick Section - Top 3 Preview */}
            {movieVideos.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Play size={20} className="text-red" />
                    <h2>Official Trailers & Teasers ({movieVideos.length} Videos)</h2>
                  </div>
                </div>
                <div className="videos-grid">
                  {movieVideos.map((vid, idx) => {
                    const ytid = getYoutubeId(vid);
                    return (
                      <div 
                        key={idx} 
                        className="video-card glass-panel"
                        onClick={() => setActiveVideo(vid)}
                      >
                        <div className="video-thumb-wrap">
                          <img 
                            src={ytid ? `https://img.youtube.com/vi/${ytid}/hqdefault.jpg` : (vid.thumbnail || '/favicon.png')} 
                            alt={vid.title} 
                            className="video-thumb-img"
                            onError={(e) => {
                              if (ytid && !e.target.src.includes('mqdefault')) {
                                e.target.src = `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
                              } else {
                                e.target.src = '/favicon.png';
                              }
                            }}
                          />
                          <div className="video-play-overlay">
                            <Play size={24} fill="#ffffff" />
                          </div>
                        </div>
                        <h4 className="video-card-title">{vid.title}</h4>
                      </div>
                    );
                  })}
                </div>
                {movieVideos.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('videos')}>
                      <span>Watch all {movieVideos.length} Videos & View Gallery</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab: REVIEWS & NEWS REPORTS */}
        {activeTab === 'articles' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Newspaper size={20} className="text-cyan" />
                  <h2>All Reviews, Critic Columns & News Reports ({movie.articles?.length || 0})</h2>
                </div>
                <span className="section-hint">Complete coverage from major publications & critics</span>
              </div>

              {movie.articles && movie.articles.length > 0 ? (
                <div className="critic-reviews-list">
                  {movie.articles.map((art, idx) => (
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
                          {art.section && <span className="badge badge-dark ms-2">{art.section}</span>}
                        </div>
                      </div>
                      <div className="article-open-hint">
                        <span>Read full review / article</span>
                        <ExternalLink size={14} />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Newspaper size={36} className="text-muted" />
                  <p>No press articles found for this title.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: WATCH ONLINE & OTT STREAMING */}
        {activeTab === 'watch' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Tv2 size={20} className="text-cyan" />
                  <h2>Watch Online & Streaming Partners</h2>
                </div>
              </div>

              {watchOnlineList.length > 0 ? (
                <div className="media-partner-grid">
                  {watchOnlineList.map((w, idx) => {
                    const info = getWatchOnlineProviderInfo(w);
                    return (
                      <a
                        key={idx}
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="media-link-card glass-panel large"
                      >
                        <div className="mlc-icon-wrap">
                          {info.icon ? (
                            <img 
                              src={info.icon} 
                              alt={info.provider} 
                              className="mlc-icon-img" 
                              onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'block';
                              }} 
                            />
                          ) : null}
                          <Tv2 size={28} className="text-cyan" style={{ display: info.icon ? 'none' : 'block' }} />
                        </div>
                        <div className="mlc-info">
                          <div className="mlc-header-row">
                            <span className="mlc-provider">{info.provider}</span>
                            {w.language && <span className="badge badge-cyan mlc-lang">{w.language}</span>}
                          </div>
                          <span className="mlc-action">{w.label || `Watch on ${info.provider}`}</span>
                          <span className="mlc-url-hint">{w.url}</span>
                        </div>
                        <ExternalLink size={18} className="mlc-arrow" />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Tv2 size={36} className="text-muted" />
                  <p>Streaming availability will be updated shortly.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: SONGS & MUSIC */}
        {activeTab === 'music' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Music size={20} className="text-purple" />
                  <h2>Download & Stream All Songs</h2>
                </div>
              </div>

              {musicList.length > 0 ? (
                <div className="media-partner-grid">
                  {musicList.map((m, idx) => (
                    <a
                      key={idx}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-link-card glass-panel large"
                    >
                      <div className="mlc-icon-wrap">
                        {m.icon ? (
                          <img src={m.icon.startsWith('/') ? m.icon : `/${m.icon}`} alt={m.provider} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                          <Music size={28} className="text-purple" />
                        )}
                      </div>
                      <div className="mlc-info">
                        <div className="mlc-header-row">
                          <span className="mlc-provider">{m.provider}</span>
                          {m.language && <span className="badge badge-gold mlc-lang">{m.language}</span>}
                        </div>
                        <span className="mlc-action">{m.label || 'Listen Full Album'}</span>
                        <span className="mlc-url-hint">{m.url}</span>
                      </div>
                      <ExternalLink size={18} className="mlc-arrow" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Music size={36} className="text-muted" />
                  <p>Music album streaming on Spotify, Apple Music, and JioSaavn.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Ticket size={20} className="text-emerald" />
                  <h2>Available Ticket Bookings</h2>
                </div>
              </div>

              {allowedBookings.length > 0 ? (
                <div className="booking-partners-row">
                  {allowedBookings.map((b, idx) => {
                    const info = getBookingProviderInfo(b);
                    return (
                      <a 
                        key={idx} 
                        href={b.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`booking-partner-card large ${info.themeClass || ''}`}
                      >
                        <div className="bp-icon-wrap">
                          {info.icon ? (
                            <img 
                              src={info.icon} 
                              alt={info.provider} 
                              className="bp-icon-img" 
                              onError={(e) => { 
                                e.target.style.display = 'none'; 
                                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'block';
                              }} 
                            />
                          ) : null}
                          <Ticket size={26} className="text-emerald" style={{ display: info.icon ? 'none' : 'block' }} />
                        </div>
                        <div className="bp-info">
                          <span className="bp-provider">{info.provider}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Ticket size={36} className="text-muted" />
                  <h3>No Direct Ticketing Links Available</h3>
                  <p>Check BookMyShow, Paytm, TicketNew, Fandango, Cineworld, or ODEON for local theater showtimes.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: SOCIALS & WEBSITE */}
        {activeTab === 'socials' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Globe size={20} className="text-emerald" />
                  <h2>Official Website & Social Accounts</h2>
                </div>
              </div>

              <div className="media-partner-grid">
                {officialWebsite && (
                  <a
                    href={officialWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="media-link-card glass-panel large highlight-border"
                  >
                    <div className="mlc-icon-wrap">
                      <Globe size={28} className="text-emerald" />
                    </div>
                    <div className="mlc-info">
                      <span className="mlc-provider">Official Website</span>
                      <span className="mlc-action">{officialWebsite.label || 'Visit Official Movie Website'}</span>
                      <span className="mlc-url-hint">{officialWebsite.url}</span>
                    </div>
                    <ExternalLink size={18} className="mlc-arrow" />
                  </a>
                )}

                {socialsList.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="media-link-card glass-panel large"
                  >
                    <div className="mlc-icon-wrap">
                      {s.icon ? (
                        <img src={s.icon.startsWith('/') ? s.icon : `/${s.icon}`} alt={s.platform} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : s.platform.toLowerCase().includes('twitter') ? (
                        <XTwitterIcon size={26} />
                      ) : s.platform.toLowerCase().includes('facebook') ? (
                        <FacebookIcon size={26} />
                      ) : (
                        <Globe size={26} />
                      )}
                    </div>
                    <div className="mlc-info">
                      <div className="mlc-header-row">
                        <span className="mlc-provider">{s.platform}</span>
                        {s.language && <span className="badge badge-dark mlc-lang">{s.language}</span>}
                      </div>
                      <span className="mlc-action">{s.label || `Follow on ${s.platform}`}</span>
                      <span className="mlc-url-hint">{s.url}</span>
                    </div>
                    <ExternalLink size={18} className="mlc-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: CAST & CREW */}
        {activeTab === 'cast' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Users size={20} className="text-cyan" />
                  <h2>Starring Cast & Crew</h2>
                </div>
              </div>

              {movie.cast && movie.cast.length > 0 ? (
                <div className="cast-grid">
                  {movie.cast.map((c, idx) => (
                    <div key={idx} className="cast-card glass-panel">
                      <div className="cast-avatar">
                        <Users size={24} />
                      </div>
                      <div className="cast-info">
                        <h4 className="cast-actor">{c.actor}</h4>
                        <span className="cast-role">{c.role}</span>
                        {c.description && <p className="cast-bio">{c.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Users size={36} className="text-muted" />
                  <p>Cast information being updated.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 7: VIDEOS & GALLERY */}
        {activeTab === 'videos' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Play size={20} className="text-red" />
                  <h2>All Trailers, Songs & Clips</h2>
                </div>
              </div>

              {movieVideos.length > 0 ? (
                <div className="videos-grid">
                  {movieVideos.map((vid, idx) => {
                    const ytid = getYoutubeId(vid);
                    return (
                      <div 
                        key={idx} 
                        className="video-card glass-panel"
                        onClick={() => setActiveVideo(vid)}
                      >
                        <div className="video-thumb-wrap">
                          <img 
                            src={ytid ? `https://img.youtube.com/vi/${ytid}/hqdefault.jpg` : (vid.thumbnail || '/favicon.png')} 
                            alt={vid.title} 
                            className="video-thumb-img"
                            onError={(e) => {
                              if (ytid && !e.target.src.includes('mqdefault')) {
                                e.target.src = `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
                              } else {
                                e.target.src = '/favicon.png';
                              }
                            }}
                          />
                          <div className="video-play-overlay">
                            <Play size={26} fill="#ffffff" />
                          </div>
                        </div>
                        <h4 className="video-card-title">{vid.title}</h4>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Play size={36} className="text-muted" />
                  <p>No video trailers found for this title.</p>
                </div>
              )}
            </div>

            {/* Official Photo Gallery & Wallpapers */}
            {(movieGallery || (movie.gallery && movie.gallery.length > 0)) && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Film size={20} className="text-gold" />
                    <h2>Official Photo Gallery & Wallpapers ({movieGallery ? movieGallery.imagesCount : movie.gallery.length} Photos)</h2>
                  </div>
                  {movieGallery && (
                    <span className="badge badge-gold">{movieGallery.category}</span>
                  )}
                </div>

                <div className="gallery-grid">
                  {(movieGallery ? movieGallery.images : movie.gallery).map((g, idx) => {
                    const src = g.src.startsWith('/') ? g.src : `/${g.src}`;
                    return (
                      <div 
                        key={idx} 
                        className="gallery-item glass-panel clickable"
                        onClick={() => openLightbox(idx)}
                      >
                        <img 
                          src={src} 
                          alt={g.alt || movie.title} 
                          className="gallery-img"
                          loading="lazy"
                          onError={(e) => { e.target.src = '/favicon.png'; }}
                        />
                        <div className="gallery-overlay">
                          <Eye size={20} className="text-white" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 8: COMMUNITY REVIEWS & RATING FORM */}
        {activeTab === 'community' && (
          <div className="tab-pane animate-fade-in">
            {/* Review Submission Form */}
            <div className="review-form-card glass-panel">
              <h3 className="rfc-title">Rate & Review <span>{movie.title}</span></h3>
              <p className="rfc-desc">Share your verdict with the OakShow community.</p>

              <form onSubmit={handleReviewSubmit}>
                <div className="star-rating-selector">
                  <span className="srs-label">Your Rating:</span>
                  <div className="srs-stars">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(starVal => (
                      <button
                        type="button"
                        key={starVal}
                        className={`star-select-btn ${userRating >= starVal ? 'selected' : ''}`}
                        onClick={() => setUserRating(starVal)}
                        title={`${starVal} / 10 stars`}
                      >
                        <Star size={20} fill={userRating >= starVal ? '#ffb800' : 'none'} color="#ffb800" />
                      </button>
                    ))}
                  </div>
                  <span className="srs-score-text">{userRating > 0 ? `${userRating} / 10 Stars` : 'Select stars'}</span>
                </div>

                <div className="form-group-row">
                  <input
                    type="text"
                    placeholder="Your Name or Cinephile Handle"
                    value={userReviewerName}
                    onChange={e => setUserReviewerName(e.target.value)}
                    className="form-input"
                  />
                  <label className="spoiler-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={hasSpoiler} 
                      onChange={e => setHasSpoiler(e.target.checked)} 
                    />
                    <span>Contains Spoilers</span>
                  </label>
                </div>

                <textarea
                  rows="4"
                  placeholder={`Write your comprehensive thoughts or review on ${movie.title}...`}
                  value={userReviewText}
                  onChange={e => setUserReviewText(e.target.value)}
                  className="form-textarea"
                />

                <div className="review-form-footer">
                  <span className="rf-char-count">{userReviewText.length} characters</span>
                  <button type="submit" className="btn btn-gold" disabled={!userReviewText.trim() || userRating === 0}>
                    <MessageSquare size={16} />
                    <span>Submit Certified Review</span>
                  </button>
                </div>

                {reviewSubmitted && (
                  <div className="review-success-msg animate-fade-in">
                    <Check size={18} />
                    <span>Your certified review for {movie.title} has been recorded!</span>
                  </div>
                )}
              </form>
            </div>

            {/* Community Reviews List */}
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <MessageSquare size={20} className="text-gold" />
                  <h2>Cinephile Community Discussions ({communityReviews.length})</h2>
                </div>
              </div>

              <div className="community-reviews-list">
                {communityReviews.map(rev => (
                  <div key={rev.id} className="comm-review-card glass-panel">
                    <div className="comm-review-header">
                      <div className="comm-author-info">
                        <div className="comm-avatar">
                          {rev.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="comm-author-text">
                          <span className="comm-author-name">{rev.author}</span>
                          <span className="comm-date">{rev.date}</span>
                        </div>
                      </div>
                      <div className="comm-rating-badge">
                        <Star size={14} fill="#ffb800" color="#ffb800" />
                        <span>{rev.rating}/10</span>
                      </div>
                    </div>
                    {rev.hasSpoiler && (
                      <div className="spoiler-warning-pill">
                        ⚠️ Contains Spoilers
                      </div>
                    )}
                    <p className="comm-comment">{rev.comment}</p>
                    <div className="comm-actions">
                      <button className="comm-like-btn" onClick={() => handleLikeReview(rev.id)}>
                        <ThumbsUp size={14} />
                        <span>{rev.likes} Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Similar / Related Movies Carousel */}
        {similarMovies.length > 0 && (
          <section className="section-block similar-section">
            <div className="section-header-row">
              <div className="section-title-wrap">
                <Flame size={20} className="text-red" />
                <h2>More Like This</h2>
              </div>
            </div>
            <div className="similar-carousel-grid">
              {similarMovies.map(sim => (
                <a 
                  key={sim.id} 
                  href={sim.filename ? (sim.filename.startsWith('/') ? sim.filename : `/${sim.filename}`) : `/${sim.id}.html`}
                  className="similar-card glass-panel"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
                    e.preventDefault();
                    onNavigate(`movie/${sim.id}`);
                  }}
                >
                  <div className="similar-poster-wrap">
                    {sim.poster ? (
                      <img 
                        src={sim.poster.startsWith('/') ? sim.poster : `/${sim.poster}`} 
                        alt={sim.title} 
                        className="similar-poster-img"
                      />
                    ) : (
                      <div className="similar-fallback"><Film size={24} /></div>
                    )}
                  </div>
                  <h4 className="similar-title">{sim.title}</h4>
                  <span className="similar-meta">{sim.year || sim.language}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PROMINENT BOTTOM SHARE SECTION (USER'S EXPLICIT REQUIREMENT)              */}
        {/* ========================================================================= */}
        <ShareBar
          title={movie.title}
          type={movie.type || 'movie'}
          rating={allRatings.length > 0 ? allRatings[0].score : null}
          poster={shareImageSrc}
          description={movie.description || movie.plot}
          customUrl={getItemCanonicalUrl(movie)}
          year={movie.year}
          language={movie.language}
        />

        {/* Next / Previous Movie Bottom Bar */}
        {(prevMovie || nextMovie) && (
          <div className="movie-page-bottom-nav glass-panel">
            {prevMovie ? (
              <button 
                className="bottom-nav-btn prev"
                onClick={() => onNavigate(`movie/${prevMovie.id}`)}
              >
                <ChevronLeft size={20} />
                <div className="btn-text-wrap">
                  <span className="nav-sub">Previous Film</span>
                  <span className="nav-title">{prevMovie.title}</span>
                </div>
              </button>
            ) : <div />}

            {nextMovie && (
              <button 
                className="bottom-nav-btn next"
                onClick={() => onNavigate(`movie/${nextMovie.id}`)}
              >
                <div className="btn-text-wrap text-right">
                  <span className="nav-sub">Next Film</span>
                  <span className="nav-title">{nextMovie.title}</span>
                </div>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Interactive Lightbox for Gallery / 3 Stills */}
      {activeLightboxIndex !== null && movieStills[activeLightboxIndex] && typeof document !== 'undefined' && createPortal(
        <div className="lightbox-backdrop animate-fade-in" onClick={() => setActiveLightboxIndex(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setActiveLightboxIndex(null)} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            <div 
              className="lightbox-main-view"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {movieStills.length > 1 && (
                <button className="lightbox-nav-btn prev-btn" onClick={prevLightbox} aria-label="Previous image">
                  <ChevronLeft size={32} />
                </button>
              )}

              <div className="lightbox-img-wrap">
                <img 
                  src={movieStills[activeLightboxIndex].src.startsWith('/') ? movieStills[activeLightboxIndex].src : `/${movieStills[activeLightboxIndex].src}`} 
                  alt={movieStills[activeLightboxIndex].alt || movie.title} 
                  className="lightbox-full-img" 
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
              </div>

              {movieStills.length > 1 && (
                <button className="lightbox-nav-btn next-btn" onClick={nextLightbox} aria-label="Next image">
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            <div className="lightbox-footer-bar">
              <div className="lightbox-caption">
                <h4>{movie.title} — Production Still & Wallpaper</h4>
                <span>Photo {activeLightboxIndex + 1} of {movieStills.length} • {movieStills[activeLightboxIndex].alt || 'High-Resolution Cinema Still'}</span>
              </div>
              <div className="lightbox-actions">
                <a 
                  href={movieStills[activeLightboxIndex].src.startsWith('/') ? movieStills[activeLightboxIndex].src : `/${movieStills[activeLightboxIndex].src}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  download
                >
                  <Eye size={14} />
                  <span>View Full Resolution</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* In-House Review Reader Modal */}
      {activeInternalReviewModal && (
        <div className="review-reader-backdrop animate-fade-in" onClick={() => setActiveInternalReviewModal(null)}>
          <div className="review-reader-dialog" onClick={e => e.stopPropagation()}>
            <button className="reader-close-btn" onClick={() => setActiveInternalReviewModal(null)}>
              <X size={20} />
            </button>

            {activeInternalReviewModal.banner && (
              <div className="reader-hero-img-wrap">
                <img 
                  src={activeInternalReviewModal.banner.startsWith('/') ? activeInternalReviewModal.banner : `/${activeInternalReviewModal.banner}`} 
                  alt={activeInternalReviewModal.title}
                  className="reader-hero-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            <div className="reader-body">
              <div className="reader-meta-bar">
                <div className="rating-pill">
                  <Star size={15} fill="#ffb800" color="#ffb800" />
                  <span>Rating: {activeInternalReviewModal.rating || `${activeInternalReviewModal.score}/5`}</span>
                </div>
                <div className={`badge ${activeInternalReviewModal.remark === 'Must Watch' ? 'badge-gold' : 'badge-green'}`}>
                  {activeInternalReviewModal.remark}
                </div>
                <button 
                  className="reader-author-btn"
                  onClick={() => {
                    setActiveInternalReviewModal(null);
                    onNavigate(`critic/${activeInternalReviewModal.criticId || activeInternalReviewModal.author}`);
                  }}
                >
                  By <strong>{activeInternalReviewModal.author}</strong>
                  <ExternalLink size={11} className="ms-1" />
                </button>
                {activeInternalReviewModal.date && <span>• {activeInternalReviewModal.date}</span>}
              </div>

              <h2 className="reader-title">{activeInternalReviewModal.title}</h2>

              <div className="reader-article-content">
                {activeInternalReviewModal.fullReview.split('\n\n').map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
