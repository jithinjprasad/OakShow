import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { 
  Tv, 
  Play, 
  Bookmark, 
  Share2, 
  Calendar, 
  Globe, 
  ChevronRight, 
  ChevronDown,
  ChevronLeft,
  ArrowLeft, 
  Star, 
  ExternalLink,
  Users,
  Film,
  Ticket,
  Music,
  Newspaper,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Search,
  X,
  Eye,
  Tv2,
  ThumbsUp,
  MessageSquare,
  Layers,
  Clock,
  Radio
} from 'lucide-react';
import ShareBar from './ShareBar';
import VideoPlayerModal from './VideoPlayerModal';
import reviewsData from '../../data/reviews.json';
import criticsData from '../../data/critics.json';
import galleriesData from '../../data/galleries.json';
import { getOakShowRemark, cleanRatingSource } from '../utils/remarks';
import { getProfileImage, getBannerImage, getShareImage, handlePosterError, getItemCanonicalUrl, getBookingProviderInfo, getWatchOnlineProviderInfo } from '../utils/mediaUtils';

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

export default function SeriesDetailPage({ 
  series, 
  allSeries = [], 
  initialEpisodeId = null,
  initialSeason = null,
  onNavigate, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(() => {
    if (initialSeason) return initialSeason;
    if (series?.seasonsData && series.seasonsData.length > 0) return 1;
    return null;
  });
  const [activeTab, setActiveTab] = useState(initialEpisodeId ? 'seasons' : 'overview');
  const [episodeSearch, setEpisodeSearch] = useState('');
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [activeInternalReviewModal, setActiveInternalReviewModal] = useState(null);
  const [activeEpisodeModal, setActiveEpisodeModal] = useState(null);

  // Community Reviews & User Rating Form States
  const [userRating, setUserRating] = useState(0);
  const [userReviewText, setUserReviewText] = useState('');
  const [userReviewerName, setUserReviewerName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Local community reviews stored in localStorage
  const [communityReviews, setCommunityReviews] = useState(() => {
    try {
      if (!series) return [];
      const saved = localStorage.getItem(`oakshow_series_reviews_${series.id}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: '1',
        author: 'Arun Kumar',
        rating: 9.5,
        date: 'Recent',
        comment: 'Exceptional storyline and character arcs. One of the finest series in modern television!',
        likes: 18,
        isUser: false
      },
      {
        id: '2',
        author: 'Sneha Patel',
        rating: 9.0,
        date: 'Recent',
        comment: 'Brilliant direction and edge-of-the-seat screenplay. A binge-worthy masterpiece.',
        likes: 11,
        isUser: false
      }
    ];
  });

  // Multi-season data resolution
  const seasonsData = series?.seasonsData && series.seasonsData.length > 0 ? series.seasonsData : null;
  const activeSeasonData = useMemo(() => {
    if (!seasonsData) return null;
    if (selectedSeason) {
      return seasonsData[selectedSeason - 1] || seasonsData[0];
    }
    return null;
  }, [seasonsData, selectedSeason]);

  const episodesList = useMemo(() => {
    if (activeSeasonData?.episodes && activeSeasonData.episodes.length > 0) {
      return activeSeasonData.episodes;
    }
    if (selectedSeason && seasonsData?.[selectedSeason - 1]?.episodes) {
      return seasonsData[selectedSeason - 1].episodes;
    }
    return series?.episodes || [];
  }, [series, activeSeasonData, selectedSeason, seasonsData]);

  const isDbsSeries = useMemo(() => {
    return series?.id === 'DragonBallSuperTvSeries' || series?.id === 'DragonBallSuper' || series?.slug === 'DragonBallSuperTvSeries' || series?.filename === 'DragonBallSuperTvSeries.html';
  }, [series]);

  // Sync initialSeason
  useEffect(() => {
    if (initialSeason) {
      setSelectedSeason(initialSeason);
    } else if (series?.seasonsData && series.seasonsData.length > 0) {
      setSelectedSeason(1);
    } else {
      setSelectedSeason(null);
    }
  }, [initialSeason, series?.id]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [series?.id, selectedSeason]);

  // Calculate prev & next series for bottom bar navigation
  const { prevSeries, nextSeries } = useMemo(() => {
    if (!allSeries || allSeries.length === 0 || !series) return { prevSeries: null, nextSeries: null };
    const currentIndex = allSeries.findIndex(s => s.id === series.id);
    if (currentIndex === -1) return { prevSeries: null, nextSeries: null };
    const prev = currentIndex > 0 ? allSeries[currentIndex - 1] : allSeries[allSeries.length - 1];
    const next = currentIndex < allSeries.length - 1 ? allSeries[currentIndex + 1] : allSeries[0];
    return { prevSeries: prev, nextSeries: next };
  }, [allSeries, series]);

  // Check if OakShow internal critics reviewed this series
  const internalReviews = useMemo(() => {
    if (!reviewsData || !series) return [];
    const cleanId = (series.id || '').toLowerCase();
    const cleanSlug = (series.slug || '').toLowerCase();
    const cleanFilename = (series.filename || '').replace('.html', '').toLowerCase();
    const cleanTitle = (series.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    return reviewsData.filter(r => {
      const tId = (r.targetId || '').toLowerCase();
      const mSlug = (r.movieSlug || '').toLowerCase();
      const tTitle = (r.targetTitle || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      return (
        (tId && (tId === cleanId || tId === cleanSlug || tId === cleanFilename)) ||
        (mSlug && (mSlug === cleanId || mSlug === cleanSlug || mSlug === cleanFilename)) ||
        (tTitle && tTitle === cleanTitle)
      );
    });
  }, [series]);

  // Extract Squeezed Cinema Stills
  const seriesStills = useMemo(() => {
    if (!series) return [];
    const list = [];
    if (Array.isArray(series.gallery) && series.gallery.length > 0) {
      series.gallery.forEach((g, idx) => {
        if (g.src && !/(?:^|[/\\])1\.(?:jpg|jpeg|png)$/i.test(g.src)) {
          list.push({ src: g.src, alt: g.alt || `${series.title} HD Still ${idx + 1}` });
        }
      });
    }
    if (list.length === 0) {
      const folder = series.id ? `pics/Films/${series.id}` : '';
      if (folder) {
        list.push({ src: `/${folder}/2.jpg`, alt: `${series.title} Key Art & Official Poster` });
        list.push({ src: `/${folder}/3.jpg`, alt: `${series.title} Production Still & Cinematic Scene` });
        list.push({ src: `/${folder}/4.jpg`, alt: `${series.title} Character Poster & High-Res Still` });
      }
    }
    return list;
  }, [series]);

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

  const scrollToShare = () => {
    const el = document.getElementById('share-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered episodes based on search
  const filteredEpisodes = useMemo(() => {
    if (!episodesList || episodesList.length === 0) return [];
    if (!episodeSearch.trim()) return episodesList;

    const q = episodeSearch.toLowerCase().trim();
    return episodesList.filter(ep => {
      const numMatch = ep.episodeNumber?.toString().includes(q) || `ep ${ep.episodeNumber}`.includes(q) || `episode ${ep.episodeNumber}`.includes(q);
      const titleMatch = ep.title?.toLowerCase().includes(q) || ep.englishTitle?.toLowerCase().includes(q) || ep.japaneseTitle?.toLowerCase().includes(q);
      const plotMatch = ep.plot?.toLowerCase().includes(q);
      const charMatch = ep.characters?.some(c => c.toLowerCase().includes(q));
      return numMatch || titleMatch || plotMatch || charMatch;
    });
  }, [episodesList, episodeSearch]);

  if (!series) return null;

  const posterSrc = getProfileImage(series);
  const bannerSrc = getBannerImage(series);
  const shareImageSrc = getShareImage(series);

  const getSeasonPoster = (sd, sIdx) => {
    if (sd?.poster) {
      return sd.poster.startsWith('/') ? sd.poster : `/${sd.poster}`;
    }
    if (series?.id === 'GameofThrones') {
      return `/pics/Serieses/GameofThrones/Seasons/${sIdx + 1}.jpg`;
    }
    if (series?.id === 'TheBoys') {
      return `/pics/Serieses/TheBoys/S0${sIdx + 1}/2.jpg`;
    }
    if (series?.id === 'LittleThings') {
      return `/pics/Serieses/LittleThings/S0${sIdx + 1}/2.jpg`;
    }
    return posterSrc || '/favicon.png';
  };

  const canonicalUrl = activeSeasonData?.filename 
    ? `https://oakshow.in/${activeSeasonData.filename}`
    : getItemCanonicalUrl(series);

  // Active ratings resolution (dynamic per season or series)
  const allRatings = (activeSeasonData && activeSeasonData.ratings && activeSeasonData.ratings.length > 0)
    ? activeSeasonData.ratings
    : (series.ratings || []);

  const activeTitle = activeSeasonData?.title || series.title;
  const activeYear = activeSeasonData?.year || series.year;
  const activePlot = activeSeasonData?.plot || activeSeasonData?.description || series.description || series.plot;

  const watchOnlineList = activeSeasonData?.watchOnline || series.watchOnline || [];
  const musicList = series.music || [];
  const socialsList = series.socials || [];
  const officialWebsite = series.officialWebsite;
  const castList = series.cast || [];

  const handleSelectEpisode = (ep) => {
    if (!ep) return;
    const slug = ep.filename ? ep.filename.replace(/\.html$/, '') : ep.id;
    if (onNavigate) {
      onNavigate(`episode/${slug}`);
    }
  };

  const handleSeasonChange = (seasonNum) => {
    setSelectedSeason(seasonNum);
    const targetSeason = seasonsData?.[seasonNum - 1];
    if (targetSeason?.filename) {
      if (onNavigate) {
        onNavigate(targetSeason.filename);
      } else {
        window.history.pushState(null, '', `/${targetSeason.filename.replace(/\.html$/, '')}.html`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userReviewText.trim() || userRating === 0) return;

    const newRev = {
      id: Date.now().toString(),
      author: userReviewerName.trim() || 'Verified Audience Member',
      rating: userRating,
      date: 'Just now',
      comment: userReviewText.trim(),
      likes: 0
    };

    const updated = [newRev, ...communityReviews];
    setCommunityReviews(updated);
    try {
      localStorage.setItem(`oakshow_series_reviews_${series.id}`, JSON.stringify(updated));
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

  return (
    <div className="movie-page-root animate-fade-in">
      {/* Top Breadcrumb & Quick Controls */}
      <div className="movie-page-topbar">
        <div className="container">
          <div className="topbar-inner">
            <button className="topbar-back-btn" onClick={() => onNavigate('series-hub')}>
              <ArrowLeft size={18} />
              <span>Back to Series</span>
            </button>

            <div className="topbar-breadcrumbs">
              <span className="crumb-link" onClick={() => onNavigate('discover')}>Home</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-link" onClick={() => onNavigate('series-hub')}>TV Series</span>
              <ChevronRight size={14} className="crumb-sep" />
              <span 
                className="crumb-link" 
                onClick={() => onNavigate(series.filename ? series.filename.replace(/\.html$/, '') : `series/${series.id}`)}
              >
                {series.title}
              </span>
              {seasonsData && selectedSeason && (
                <>
                  <ChevronRight size={14} className="crumb-sep" />
                  <span className="crumb-current">Season {selectedSeason}</span>
                </>
              )}
            </div>

            <div className="topbar-actions">
              <button 
                className={`topbar-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={() => onToggleBookmark(series)}
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
              onClick={() => {
                if (seriesStills.length > 0) {
                  setActiveLightboxImg(seriesStills[0].src);
                } else if (posterSrc) {
                  setActiveLightboxImg(posterSrc);
                }
              }}
              title="Click to view full-size poster & stills"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' || e.key === ' ') { 
                  e.preventDefault(); 
                  if (seriesStills.length > 0) setActiveLightboxImg(seriesStills[0].src);
                  else if (posterSrc) setActiveLightboxImg(posterSrc);
                } 
              }}
            >
              {posterSrc ? (
                <img 
                  src={posterSrc} 
                  alt={activeTitle} 
                  className="movie-hero-poster-img"
                  onError={(e) => handlePosterError(e, series.poster)}
                />
              ) : (
                <div className="movie-hero-poster-fallback">
                  <Tv size={54} />
                  <span>{activeTitle}</span>
                </div>
              )}

              <div className="poster-zoom-hint">
                <Eye size={15} />
                <span>View Poster</span>
              </div>

              {series.videos && series.videos.length > 0 && (
                <button 
                  className="poster-play-trailer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideo(series.videos[0]);
                  }}
                  title="Play Official Promo"
                >
                  <Play size={22} fill="#ffffff" />
                  <span>Play Promo</span>
                </button>
              )}
            </div>

            {/* Right Details Column */}
            <div className="movie-hero-details">
              <div className="movie-hero-header-info">
                <div className="movie-badges-strip">
                  {series.type && <span className="badge badge-red">{series.type === 'anime' ? 'Anime Series' : 'TV Series'}</span>}
                  {series.genre && <span className="badge badge-gold">{series.genre}</span>}
                  {series.totalSeasons && <span className="badge badge-cyan">{series.totalSeasons} Seasons</span>}
                  {(series.totalEpisodes || episodesList.length > 0) && (
                    <span className="badge badge-emerald">
                      {series.totalEpisodes || episodesList.length} Episodes
                    </span>
                  )}
                  {activeYear && <span className="badge badge-dark">Year {activeYear}</span>}
                  {series.duration && <span className="badge badge-dark">{series.duration}/Episode</span>}
                </div>

                <h1 className="movie-main-title">{activeTitle}</h1>
                {series.metaTitle && series.metaTitle !== series.title && (
                  <p className="movie-sub-title">{series.metaTitle}</p>
                )}
              </div>

              {/* Mobile Only: All Ratings, Reviews, Songs, Videos, Bookings/Episodes, News */}
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
                  className={`mh-nav-pill ${activeTab === 'community' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('community')}
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
                  className={`mh-nav-pill ${activeTab === 'seasons' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('seasons')}
                >
                  <Ticket size={12} className="mh-nav-icon text-emerald" />
                  <span>Episodes</span>
                </button>

                <button 
                  type="button"
                  className={`mh-nav-pill ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => handleTabSelect('overview')}
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

              {/* Multi-Season Quick Selector Switcher */}
              {seasonsData && seasonsData.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '10px 0 14px 0' }}>
                  <span style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 700 }}>Select Season:</span>
                  {seasonsData.map((sd, sIdx) => {
                    const sNum = sIdx + 1;
                    const isAct = selectedSeason === sNum;
                    return (
                      <button
                        key={sIdx}
                        className={`pill-btn ${isAct ? 'pill-btn-active' : ''}`}
                        onClick={() => handleSeasonChange(sNum)}
                        style={{ padding: '4px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <span style={{ fontWeight: isAct ? 800 : 600 }}>Season {sNum}</span>
                        {sd.year && <span style={{ opacity: 0.8, fontSize: '0.76rem' }}>({sd.year})</span>}
                        {sd.totalEpisodes && <span style={{ opacity: 0.7, fontSize: '0.74rem' }}>• {sd.totalEpisodes}</span>}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Quick Meta Row */}
              <div className="movie-meta-grid">
                {series.director && (
                  <div className="meta-item">
                    <span className="meta-lbl">Creator / Director:</span>
                    <span className="meta-val">{series.director}</span>
                  </div>
                )}
                {series.releaseDate && (
                  <div className="meta-item">
                    <span className="meta-lbl">Air Date:</span>
                    <span className="meta-val">{series.releaseDate}</span>
                  </div>
                )}
                {series.sagas && series.sagas.length > 0 && (
                  <div className="meta-item">
                    <span className="meta-lbl">Story Arc / Saga:</span>
                    <span className="meta-val">{series.sagas.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Synopsis with Expandable Mobile View */}
              {activePlot && (
                <div className="movie-synopsis-wrap">
                  <p className={`movie-synopsis ${!synopsisExpanded ? 'synopsis-truncated' : 'synopsis-full'}`}>
                    {activePlot}
                  </p>
                  {activePlot.length > 180 && (
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
                {series.videos && series.videos.length > 0 && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveVideo(series.videos[0])}
                  >
                    <Play size={18} fill="#ffffff" />
                    <span>Watch Promo</span>
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

                {episodesList.length > 0 && (
                  <button 
                    className="btn btn-gold"
                    onClick={() => handleTabSelect('seasons')}
                  >
                    <Tv size={18} />
                    <span>Browse All {episodesList.length} Episodes</span>
                  </button>
                )}

                {seasonsData && (
                  <button 
                    className="btn btn-gold"
                    onClick={() => handleTabSelect('seasons')}
                  >
                    <Layers size={18} />
                    <span>All {seasonsData.length} Seasons Guide</span>
                  </button>
                )}

                <button 
                  className={`btn btn-secondary ${isBookmarked ? 'active' : ''}`}
                  onClick={() => onToggleBookmark(series)}
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
        {/* Navigation Tabs Header */}
        <div className="movie-tabs-nav glass-panel">
          <button 
            className={`movie-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabSelect('overview')}
          >
            <span>All Ratings & Overview ({allRatings.length})</span>
          </button>

          <button 
            className={`movie-tab-btn ${activeTab === 'seasons' ? 'active' : ''}`}
            onClick={() => handleTabSelect('seasons')}
          >
            <span>Episodes & Seasons Guide ({episodesList.length > 0 ? episodesList.length : (seasonsData?.length || 'All')})</span>
          </button>

          {series.articles && series.articles.length > 0 && (
            <button 
              className={`movie-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => handleTabSelect('articles')}
            >
              <span>Reviews & News ({series.articles.length})</span>
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
            <span>Cast & Crew ({castList.length})</span>
          </button>

          <button 
            className={`movie-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => handleTabSelect('videos')}
          >
            <span>Trailers & Clips ({series.videos?.length || 0})</span>
          </button>

          <button 
            className={`movie-tab-btn ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => handleTabSelect('community')}
          >
            <span>Community Reviews ({communityReviews.length})</span>
          </button>
        </div>

        {/* Tab 1: Overview & Ratings */}
        {activeTab === 'overview' && (
          <div className="tab-pane animate-fade-in">
            {/* 1. OakShow In-House Review */}
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

                        <p className="ihr-excerpt">{rev.excerpt}</p>

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

            {/* 2. All Ratings & Critic Reviews */}
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
                      <div key={idx} className={`rating-card ${isOak ? 'card-oakshow' : ''}`}>
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
                          <span className="rc-label">{isOak && oakRemark ? `Official Verdict: ${oakRemark.title}` : 'Critic Verdict & Rating'}</span>
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
                  <p>Check back soon for updated episode & season ratings.</p>
                </div>
              )}
            </div>

            {/* 3. 3 Squeezed Cinema Stills & HD Posters */}
            {seriesStills.length > 0 && (
              <div className="section-block cinema-stills-section">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Film size={20} className="text-gold" />
                    <h2>Official Production Stills & HD Posters ({seriesStills.length} Photos)</h2>
                  </div>
                  {seriesStills.length > 3 && (
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('videos')}>
                      <span>View All {seriesStills.length} Stills & Posters</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>

                <div className="cinema-stills-3grid">
                  {seriesStills.map((still, idx) => {
                    const src = still.src.startsWith('/') ? still.src : `/${still.src}`;
                    return (
                      <div 
                        key={idx} 
                        className="cinema-still-card glass-card clickable"
                        onClick={() => setActiveLightboxImg(src)}
                        title="Click to expand high-resolution still"
                      >
                        <div className="cinema-still-img-wrap">
                          <img 
                            src={src} 
                            alt={still.alt || `${series.title} Production Still ${idx + 1}`} 
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

            {/* 4. Multi-Season Quick Showcase */}
            {seasonsData && seasonsData.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Layers size={20} className="text-emerald" />
                    <h2>Available Seasons Archive ({seasonsData.length} {seasonsData.length === 1 ? 'Season' : 'Seasons'})</h2>
                  </div>
                  <button className="view-more-section-btn" onClick={() => handleTabSelect('seasons')}>
                    <span>Open Complete Seasons Guide</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                <div className="seasons-archive-grid">
                  {seasonsData.map((sd, sIdx) => {
                    const sNum = sIdx + 1;
                    const isAct = selectedSeason === sNum;
                    const seasonPoster = getSeasonPoster(sd, sIdx);
                    const topScore = sd.ratings && sd.ratings.length > 0 ? sd.ratings[0] : null;

                    return (
                      <div 
                        key={sIdx}
                        className={`season-archive-card glass-panel ${isAct ? 'season-card-active' : ''}`}
                        onClick={() => handleSeasonChange(sNum)}
                      >
                        {/* Card Top: Poster & Badges */}
                        <div className="season-card-poster-wrap">
                          <img 
                            src={seasonPoster} 
                            alt={sd.title || `${series.title} Season ${sNum}`} 
                            className="season-card-poster-img"
                            loading="lazy"
                            onError={(e) => { 
                              if (posterSrc && e.target.src !== posterSrc) {
                                e.target.src = posterSrc;
                              } else {
                                e.target.src = '/favicon.png'; 
                              }
                            }} 
                          />
                          <div className="season-card-poster-overlay" />
                          
                          <div className="season-badge-top-left">
                            <span className={`season-num-badge ${isAct ? 'badge-active-emerald' : 'badge-normal'}`}>
                              Season {sNum}
                            </span>
                            {isAct && <span className="season-now-viewing-tag">Active</span>}
                          </div>

                          <div className="season-badge-top-right">
                            {topScore && (
                              <span className="season-score-badge">
                                <Star size={12} fill="#ffb800" color="#ffb800" />
                                <span>{topScore.score}</span>
                              </span>
                            )}
                          </div>

                          <div className="season-badge-bottom-bar">
                            {sd.totalEpisodes && (
                              <span className="season-meta-chip">
                                <Tv size={11} />
                                <span>{sd.totalEpisodes}</span>
                              </span>
                            )}
                            {sd.duration && (
                              <span className="season-meta-chip">
                                <Clock size={11} />
                                <span>{sd.duration}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Body: Info, Ratings & OTT Badges */}
                        <div className="season-card-body">
                          <div className="season-card-header">
                            <h4 className="season-card-title">{sd.title || `${series.title} Season ${sNum}`}</h4>
                            <div className="season-card-meta-line">
                              <span className="season-year-chip">
                                <Calendar size={12} />
                                <span>{sd.releaseDate || sd.year || series.year}</span>
                              </span>
                            </div>
                          </div>

                          {/* Rating Pills Row */}
                          {sd.ratings && sd.ratings.length > 0 && (
                            <div className="season-ratings-pills-row">
                              {sd.ratings.map((r, rIdx) => {
                                const isOak = r.source === 'OakShow';
                                const remark = isOak ? getOakShowRemark(r.score) : null;
                                return (
                                  <span 
                                    key={rIdx} 
                                    className={`season-mini-rating-pill ${isOak ? 'mini-pill-oakshow' : ''}`}
                                    title={r.source}
                                  >
                                    {remark ? (
                                      <img src={remark.icon} alt={r.source} className="mini-cert-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : (
                                      <span className="mini-pill-source">{r.source}:</span>
                                    )}
                                    <span className="mini-pill-score">{r.score}</span>
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {/* OTT Streaming Partners */}
                          {sd.watchOnline && sd.watchOnline.length > 0 && (
                            <div className="season-ott-strip">
                              <span className="season-ott-label">Stream on:</span>
                              <div className="season-ott-icons">
                                {sd.watchOnline.map((w, wIdx) => {
                                  const info = getWatchOnlineProviderInfo(w);
                                  return (
                                    <a 
                                      key={wIdx} 
                                      href={w.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="season-ott-badge" 
                                      title={`Watch on ${info.provider}`}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {info.icon ? (
                                        <img src={info.icon} alt={info.provider} onError={(e) => { e.target.style.display = 'none'; }} />
                                      ) : null}
                                      <span>{info.provider}</span>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Synopsis */}
                          <p className="season-card-plot">
                            {sd.plot || sd.description || `Explore storyline, critical verdict, and episode summaries for ${series.title} Season ${sNum}.`}
                          </p>

                          {/* Card Footer Action */}
                          <div className="season-card-action-bar">
                            <button 
                              type="button"
                              className={`season-select-btn ${isAct ? 'btn-selected-active' : 'btn-select-season'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSeasonChange(sNum);
                              }}
                            >
                              {isAct ? (
                                <>
                                  <span className="active-dot" />
                                  <span>Currently Active Season</span>
                                </>
                              ) : (
                                <>
                                  <span>Select Season {sNum}</span>
                                  <ChevronRight size={15} />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. Episodic Series Quick Preview (Top 3 Episodes) */}
            {episodesList.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Tv size={20} className="text-gold" />
                    <h2>Featured Episodes & Storyline ({episodesList.length} Total Episodes)</h2>
                  </div>
                  <button className="view-more-section-btn" onClick={() => handleTabSelect('seasons')}>
                    <span>View All {episodesList.length} Episodes</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                <div className="episodes-grid-layout">
                  {episodesList.slice(0, 3).map((ep) => {
                    const thumbUrl = ep.thumbnail ? (ep.thumbnail.startsWith('/') ? ep.thumbnail : `/${ep.thumbnail}`) : null;
                    const topRating = ep.ratings && ep.ratings.length > 0 ? ep.ratings[0] : null;

                    return (
                      <div 
                        key={ep.id}
                        className="episode-card glass-panel"
                        onClick={() => handleSelectEpisode(ep)}
                      >
                        <div className="episode-card-thumb-wrap">
                          {thumbUrl ? (
                            <img 
                              src={thumbUrl} 
                              alt={ep.title} 
                              className="episode-card-thumb-img" 
                              loading="lazy"
                              onError={(e) => { e.target.src = posterSrc; }} 
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                              <Tv size={36} />
                            </div>
                          )}
                          <span className="episode-card-badge-num">
                            Ep {ep.episodeNumber}
                          </span>
                          {topRating && (
                            <span className="episode-card-badge-rating">
                              <Star size={12} fill="#ffb800" color="#ffb800" />
                              <span>{topRating.score}</span>
                            </span>
                          )}
                        </div>

                        <div className="episode-card-body">
                          <h4 className="episode-card-title">{ep.title}</h4>
                          {ep.japaneseTitle && ep.japaneseTitle !== ep.title && (
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

            {/* 6. Watch It Online (OTT Streaming Providers) */}
            {watchOnlineList.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Tv2 size={20} className="text-cyan" />
                    <h2>Watch It Online & OTT Streaming ({watchOnlineList.length} Options)</h2>
                  </div>
                </div>
                <div className="media-partner-grid">
                  {watchOnlineList.map((w, idx) => (
                    <a
                      key={idx}
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-link-card glass-panel"
                    >
                      <div className="mlc-icon-wrap">
                        {w.icon ? (
                          <img src={w.icon.startsWith('/') ? w.icon : `/${w.icon}`} alt={w.provider} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                          <Tv2 size={24} className="text-cyan" />
                        )}
                      </div>
                      <div className="mlc-info">
                        <div className="mlc-header-row">
                          <span className="mlc-provider">{w.provider}</span>
                          {w.language && <span className="badge badge-cyan mlc-lang">{w.language}</span>}
                        </div>
                        <span className="mlc-action">{w.label || 'Watch Series'}</span>
                      </div>
                      <ExternalLink size={16} className="mlc-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Star Cast & Crew Preview */}
            {castList.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Users size={20} className="text-gold" />
                    <h2>Star Cast & Creative Ensemble ({castList.length} Actors)</h2>
                  </div>
                  {castList.length > 4 && (
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('cast')}>
                      <span>View All {castList.length} Cast Members</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>

                <div className="cast-grid">
                  {castList.slice(0, 4).map((actor, idx) => (
                    <div key={idx} className="cast-card glass-panel">
                      <div className="cast-avatar">
                        <Users size={22} />
                      </div>
                      <div className="cast-info">
                        <h4 className="cast-actor">{actor.actor || actor.name}</h4>
                        <span className="cast-role">{actor.role || 'Cast Member'}</span>
                        {actor.description && <p className="cast-bio">{actor.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Reviews & News Articles */}
            {series.articles && series.articles.length > 0 && (
              <div className="section-block">
                <div className="section-header-row">
                  <div className="section-title-wrap">
                    <Newspaper size={20} className="text-cyan" />
                    <h2>Reviews & News Articles ({series.articles.length} Reports)</h2>
                  </div>
                </div>

                <div className="critic-reviews-list">
                  {series.articles.slice(0, 3).map((art, idx) => (
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
                {series.articles.length > 3 && (
                  <div className="section-footer-row">
                    <button className="view-more-section-btn" onClick={() => handleTabSelect('articles')}>
                      <span>Read all {series.articles.length} Reviews & Articles</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 9. Community Reviews & Audience Ratings */}
            <div className="section-block community-reviews-section">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <MessageSquare size={20} className="text-emerald" />
                  <h2>Audience Ratings & Community Reviews</h2>
                </div>
                <span className="section-badge badge-emerald">{communityReviews.length} Verified Audience Reviews</span>
              </div>

              <div className="reviews-layout-grid">
                <div className="user-review-form-card glass-card">
                  <h3>Rate "{activeTitle}"</h3>
                  <p className="form-subtitle">Share your verified verdict with other viewers</p>

                  <form onSubmit={handleReviewSubmit}>
                    <div className="rating-select-group">
                      <label>Your Score: {userRating > 0 ? `${userRating}/10` : 'Tap to rate'}</label>
                      <div className="star-rating-row">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${userRating >= star ? 'active' : ''}`}
                            onClick={() => setUserRating(star)}
                            title={`${star}/10`}
                          >
                            <Star size={18} fill={userRating >= star ? '#ffb800' : 'none'} color={userRating >= star ? '#ffb800' : '#475569'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-field-group">
                      <input 
                        type="text" 
                        placeholder="Your Name (Optional)"
                        value={userReviewerName}
                        onChange={(e) => setUserReviewerName(e.target.value)}
                        className="form-text-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <textarea
                        placeholder="Write your review... (Acting, screenplay, climax, pacing...)"
                        value={userReviewText}
                        onChange={(e) => setUserReviewText(e.target.value)}
                        rows={3}
                        className="form-textarea"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-review-btn">
                      <ThumbsUp size={16} />
                      <span>Post Audience Review</span>
                    </button>

                    {reviewSubmitted && (
                      <div className="review-success-msg animate-fade-in">
                        <span>✨ Your review has been posted!</span>
                      </div>
                    )}
                  </form>
                </div>

                <div className="community-reviews-stream">
                  {communityReviews.map((rev) => (
                    <div key={rev.id} className="audience-review-card glass-card">
                      <div className="arc-header">
                        <div className="arc-user-info">
                          <div className="arc-avatar">{rev.author.charAt(0).toUpperCase()}</div>
                          <div>
                            <span className="arc-username">{rev.author}</span>
                            <span className="arc-date">{rev.date}</span>
                          </div>
                        </div>
                        <div className="arc-score-badge">
                          <Star size={14} fill="#ffb800" color="#ffb800" />
                          <span>{rev.rating}/10</span>
                        </div>
                      </div>

                      <p className="arc-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 10. Bottom Share Bar Section */}
            <div id="share-section" className="section-block share-section-wrap">
              <ShareBar 
                item={{
                  ...series,
                  title: activeTitle,
                  filename: activeSeasonData?.filename || series.filename
                }} 
                canonicalUrl={canonicalUrl} 
              />
            </div>

            {/* 11. Next / Prev Series Navigation Bar */}
            {(prevSeries || nextSeries) && (
              <div className="movie-page-bottom-nav glass-panel">
                {prevSeries && (
                  <button 
                    className="bottom-nav-btn prev-btn"
                    onClick={() => onNavigate(prevSeries.filename ? prevSeries.filename.replace(/\.html$/, '') : `series/${prevSeries.id}`)}
                  >
                    <ChevronLeft size={20} />
                    <div className="bnav-text">
                      <span className="bnav-label">Previous Series</span>
                      <span className="bnav-title">{prevSeries.title}</span>
                    </div>
                  </button>
                )}

                {nextSeries && (
                  <button 
                    className="bottom-nav-btn next-btn"
                    onClick={() => onNavigate(nextSeries.filename ? nextSeries.filename.replace(/\.html$/, '') : `series/${nextSeries.id}`)}
                  >
                    <div className="bnav-text">
                      <span className="bnav-label">Next Series</span>
                      <span className="bnav-title">{nextSeries.title}</span>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Episodes & Seasons Guide */}
        {activeTab === 'seasons' && (
          <div className="tab-pane animate-fade-in">
            {/* Episodic Series (Dragon Ball Super, Scam 1992, etc.) */}
            {episodesList.length > 0 && (
              <div className="section-block">
                <div className="catalog-header-banner glass-panel" style={{ marginBottom: '20px' }}>
                  <div className="badge badge-gold">EPISODE CATALOG</div>
                  <h2 className="catalog-main-title">{series.title} — Full Episode Guide</h2>
                  <p className="catalog-subtitle">
                    {isDbsSeries
                      ? `Showing all ${episodesList.length} indexed episodes with broadcast air dates, storyline summaries, and verified ratings. Click any episode to view full details.`
                      : `Explore all ${episodesList.length} episodes with storyline summaries and verified scores.`}
                  </p>
                </div>

                {/* Filter and Jump Row - ONLY for Dragon Ball Super */}
                {isDbsSeries && (
                  <div className="catalog-filters-bar glass-panel" style={{ marginBottom: '20px' }}>
                    <div className="filter-item" style={{ flex: '2 1 240px' }}>
                      <label>Filter Episodes</label>
                      <div className="search-input-wrapper" style={{ position: 'relative', width: '100%' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                          type="text" 
                          placeholder="Search by episode #, title (English/Japanese), character..."
                          value={episodeSearch}
                          onChange={(e) => setEpisodeSearch(e.target.value)}
                          style={{ width: '100%', padding: '9px 34px 9px 36px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.88rem' }}
                        />
                        {episodeSearch && (
                          <button 
                            onClick={() => setEpisodeSearch('')}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="filter-item">
                      <label>Quick Jump</label>
                      <select 
                        value="" 
                        onChange={(e) => {
                          const found = episodesList.find(ep => ep.id === e.target.value || ep.filename === e.target.value);
                          if (found) handleSelectEpisode(found);
                        }}
                      >
                        <option value="">Jump to Episode ({episodesList.length} total)...</option>
                        {episodesList.map((ep) => (
                          <option key={ep.id} value={ep.id}>
                            Ep {ep.episodeNumber}: {ep.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Episodes Grid */}
                <div className="episodes-grid-layout">
                  {filteredEpisodes.map((ep) => {
                    const thumbUrl = ep.thumbnail ? (ep.thumbnail.startsWith('/') ? ep.thumbnail : `/${ep.thumbnail}`) : null;
                    const topRating = ep.ratings && ep.ratings.length > 0 ? ep.ratings[0] : null;

                    return (
                      <div 
                        key={ep.id}
                        className="episode-card glass-panel"
                        onClick={() => handleSelectEpisode(ep)}
                      >
                        <div className="episode-card-thumb-wrap">
                          {thumbUrl ? (
                            <img 
                              src={thumbUrl} 
                              alt={ep.title} 
                              className="episode-card-thumb-img" 
                              loading="lazy"
                              onError={(e) => { e.target.src = posterSrc; }} 
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                              <Tv size={36} />
                            </div>
                          )}
                          <span className="episode-card-badge-num">
                            Ep {ep.episodeNumber}
                          </span>
                          {topRating && (
                            <span className="episode-card-badge-rating">
                              <Star size={12} fill="#ffb800" color="#ffb800" />
                              <span>{topRating.score}</span>
                            </span>
                          )}
                        </div>

                        <div className="episode-card-body">
                          <h4 className="episode-card-title">{ep.title}</h4>
                          {ep.japaneseTitle && ep.japaneseTitle !== ep.title && (
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
                         {/* Multi-Season Series (The Boys, Little Things, Game of Thrones, etc.) */}
            {episodesList.length === 0 && seasonsData && seasonsData.length > 0 && (
              <div className="section-block">
                <div className="catalog-header-banner glass-panel" style={{ marginBottom: '20px' }}>
                  <div className="badge badge-emerald">MULTI-SEASON ARCHIVE</div>
                  <h2 className="catalog-main-title">{series.title} — All {seasonsData.length} Seasons Guide</h2>
                  <p className="catalog-subtitle">
                    Select any season below to explore its ratings, release year, streaming links, and storyline.
                  </p>
                </div>

                {/* Season Selector Filter */}
                <div className="catalog-filters-bar glass-panel" style={{ marginBottom: '20px' }}>
                  <div className="filter-item" style={{ flex: '1 1 240px' }}>
                    <label>Active Season</label>
                    <select value={selectedSeason || 1} onChange={e => handleSeasonChange(parseInt(e.target.value, 10))}>
                      {seasonsData.map((sd, sIdx) => (
                        <option key={sIdx} value={sIdx + 1}>
                          Season {sIdx + 1} {sd.year ? `(${sd.year})` : ''} — {sd.title || `${series.title} Season ${sIdx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Grid of Season Cards */}
                <div className="seasons-archive-grid" style={{ marginBottom: '28px' }}>
                  {seasonsData.map((sd, sIdx) => {
                    const sNum = sIdx + 1;
                    const isAct = selectedSeason === sNum;
                    const seasonPoster = getSeasonPoster(sd, sIdx);
                    const topScore = sd.ratings && sd.ratings.length > 0 ? sd.ratings[0] : null;

                    return (
                      <div 
                        key={sIdx}
                        className={`season-archive-card glass-panel ${isAct ? 'season-card-active' : ''}`}
                        onClick={() => handleSeasonChange(sNum)}
                      >
                        <div className="season-card-poster-wrap">
                          <img 
                            src={seasonPoster} 
                            alt={sd.title || `${series.title} Season ${sNum}`} 
                            className="season-card-poster-img"
                            loading="lazy"
                            onError={(e) => { 
                              if (posterSrc && e.target.src !== posterSrc) {
                                e.target.src = posterSrc;
                              } else {
                                e.target.src = '/favicon.png'; 
                              }
                            }} 
                          />
                          <div className="season-card-poster-overlay" />
                          
                          <div className="season-badge-top-left">
                            <span className={`season-num-badge ${isAct ? 'badge-active-emerald' : 'badge-normal'}`}>
                              Season {sNum}
                            </span>
                            {isAct && <span className="season-now-viewing-tag">Active</span>}
                          </div>

                          <div className="season-badge-top-right">
                            {topScore && (
                              <span className="season-score-badge">
                                <Star size={12} fill="#ffb800" color="#ffb800" />
                                <span>{topScore.score}</span>
                              </span>
                            )}
                          </div>

                          <div className="season-badge-bottom-bar">
                            {sd.totalEpisodes && (
                              <span className="season-meta-chip">
                                <Tv size={11} />
                                <span>{sd.totalEpisodes}</span>
                              </span>
                            )}
                            {sd.duration && (
                              <span className="season-meta-chip">
                                <Clock size={11} />
                                <span>{sd.duration}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="season-card-body">
                          <div className="season-card-header">
                            <h4 className="season-card-title">{sd.title || `${series.title} Season ${sNum}`}</h4>
                            <div className="season-card-meta-line">
                              <span className="season-year-chip">
                                <Calendar size={12} />
                                <span>{sd.releaseDate || sd.year || series.year}</span>
                              </span>
                            </div>
                          </div>

                          {sd.ratings && sd.ratings.length > 0 && (
                            <div className="season-ratings-pills-row">
                              {sd.ratings.map((r, rIdx) => {
                                const isOak = r.source === 'OakShow';
                                const remark = isOak ? getOakShowRemark(r.score) : null;
                                return (
                                  <span 
                                    key={rIdx} 
                                    className={`season-mini-rating-pill ${isOak ? 'mini-pill-oakshow' : ''}`}
                                    title={r.source}
                                  >
                                    {remark ? (
                                      <img src={remark.icon} alt={r.source} className="mini-cert-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : (
                                      <span className="mini-pill-source">{r.source}:</span>
                                    )}
                                    <span className="mini-pill-score">{r.score}</span>
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {sd.watchOnline && sd.watchOnline.length > 0 && (
                            <div className="season-ott-strip">
                              <span className="season-ott-label">Stream on:</span>
                              <div className="season-ott-icons">
                                {sd.watchOnline.map((w, wIdx) => (
                                  <a 
                                    key={wIdx} 
                                    href={w.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="season-ott-badge" 
                                    title={`Watch on ${w.provider}`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {w.icon ? (
                                      <img src={w.icon.startsWith('/') ? w.icon : `/${w.icon}`} alt={w.provider} onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : null}
                                    <span>{w.provider}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          <p className="season-card-plot">
                            {sd.plot || sd.description || `Explore storyline, critical verdict, and episode summaries for ${series.title} Season ${sNum}.`}
                          </p>

                          <div className="season-card-action-bar">
                            <button 
                              type="button"
                              className={`season-select-btn ${isAct ? 'btn-selected-active' : 'btn-select-season'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSeasonChange(sNum);
                              }}
                            >
                              {isAct ? (
                                <>
                                  <span className="active-dot" />
                                  <span>Currently Viewing Spotlight Below</span>
                                </>
                              ) : (
                                <>
                                  <span>View Season {sNum} Spotlight</span>
                                  <ChevronRight size={15} />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Season Detail Spotlight Card */}
                {activeSeasonData && (
                  <div className="active-season-spotlight glass-panel animate-fade-in">
                    <div className="spotlight-top-header">
                      <div className="spotlight-header-left">
                        <div className="spotlight-badge-row">
                          <span className="badge badge-emerald">SEASON {selectedSeason} SPOTLIGHT</span>
                          {activeSeasonData.year && <span className="badge badge-dark">Year {activeSeasonData.year}</span>}
                          {activeSeasonData.totalEpisodes && <span className="badge badge-cyan">{activeSeasonData.totalEpisodes}</span>}
                          {activeSeasonData.duration && <span className="badge badge-gold">{activeSeasonData.duration}</span>}
                        </div>
                        <h3 className="spotlight-season-title">
                          {activeSeasonData.title || `${series.title} Season ${selectedSeason}`}
                        </h3>
                        <p className="spotlight-season-subtitle">
                          Air Date: {activeSeasonData.releaseDate || activeSeasonData.year || series.year} • {activeSeasonData.totalEpisodes || 'Full Season'}
                        </p>
                      </div>

                      {activeSeasonData.filename && (
                        <div className="spotlight-header-right">
                          <span className="badge badge-gold">
                            Archive Link: {activeSeasonData.filename}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="spotlight-main-grid">
                      <div className="spotlight-poster-side">
                        <img 
                          src={getSeasonPoster(activeSeasonData, selectedSeason ? selectedSeason - 1 : 0)} 
                          alt={activeSeasonData.title} 
                          className="spotlight-season-poster-img"
                          onError={(e) => { e.target.src = posterSrc || '/favicon.png'; }}
                        />
                      </div>

                      <div className="spotlight-info-side">
                        {/* Storyline */}
                        <div className="spotlight-storyline-box">
                          <h4 className="spotlight-section-heading">📖 Season {selectedSeason} Storyline & Overview</h4>
                          <p className="spotlight-plot-text">
                            {activeSeasonData.plot || activeSeasonData.description || `Full season ${selectedSeason} storyline, character developments, and season finale resolution for ${series.title}.`}
                          </p>
                        </div>

                        {/* Season Ratings */}
                        {activeSeasonData.ratings && activeSeasonData.ratings.length > 0 && (
                          <div className="spotlight-ratings-section">
                            <h4 className="spotlight-section-heading">⭐ Verified Season {selectedSeason} Critic Scores:</h4>
                            <div className="ratings-grid">
                              {activeSeasonData.ratings.map((sr, srIdx) => {
                                const isOak = sr.source === 'OakShow';
                                const oakRemark = isOak ? getOakShowRemark(sr.score) : null;
                                const pct = parseScorePercentage(sr.score);
                                const isGold = pct >= 75;
                                const isGreen = pct >= 55 && pct < 75;
                                const iconSrc = isOak && oakRemark ? oakRemark.icon : (sr.icon ? (sr.icon.startsWith('/') ? sr.icon : `/${sr.icon}`) : null);

                                return (
                                  <div key={srIdx} className={`rating-card ${isOak ? 'card-oakshow' : ''}`}>
                                    <div className="rc-header">
                                      <div className="rc-source-group">
                                        {iconSrc ? (
                                          <img src={iconSrc} alt={sr.source} className="rc-source-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                                        ) : (
                                          <Star size={16} className="text-gold" />
                                        )}
                                        <span className="rc-source">{sr.source}</span>
                                      </div>
                                      <span className={`rc-score-pill ${isOak && oakRemark ? oakRemark.badgeClass : (isGold ? 'pill-gold' : isGreen ? 'pill-green' : 'pill-yellow')}`}>
                                        {sr.score}
                                      </span>
                                    </div>
                                    <div className="rc-body">
                                      <span className="rc-score-main">{sr.score}</span>
                                      <span className="rc-label">{isOak && oakRemark ? `Verdict: ${oakRemark.title}` : `Season ${selectedSeason} Score`}</span>
                                    </div>
                                    <div className="rc-meter">
                                      <div className={`rc-fill ${isGold ? 'fill-gold' : isGreen ? 'fill-emerald' : 'fill-red'}`} style={{ width: `${pct}%` }} />
                                    </div>
                                    {!isOak && sr.url && sr.url !== '#' ? (
                                      <a href={sr.url} target="_blank" rel="noopener noreferrer" className="rc-link">
                                        <span>Read season review on {sr.source}</span>
                                        <ExternalLink size={13} />
                                      </a>
                                    ) : (
                                      <span className="rc-link-disabled">Verified Season Score</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Season Streaming Links */}
                        {activeSeasonData.watchOnline && activeSeasonData.watchOnline.length > 0 && (
                          <div className="spotlight-ott-section">
                            <h4 className="spotlight-section-heading">📺 Watch Season {selectedSeason} Online:</h4>
                            <div className="media-partner-grid">
                              {activeSeasonData.watchOnline.map((w, idx) => (
                                <a
                                  key={idx}
                                  href={w.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="media-link-card glass-panel"
                                >
                                  <div className="mlc-icon-wrap">
                                    {w.icon ? (
                                      <img src={w.icon.startsWith('/') ? w.icon : `/${w.icon}`} alt={w.provider} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : (
                                      <Tv2 size={24} className="text-cyan" />
                                    )}
                                  </div>
                                  <div className="mlc-info">
                                    <span className="mlc-provider">{w.provider}</span>
                                    <span className="mlc-action">{w.label || 'Watch Season'}</span>
                                  </div>
                                  <ExternalLink size={16} className="mlc-arrow" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Dedicated Articles Tab */}
        {activeTab === 'articles' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Newspaper size={20} className="text-cyan" />
                  <h2>All Reviews, Press Columns & News Reports ({series.articles?.length || 0})</h2>
                </div>
              </div>

              {series.articles && series.articles.length > 0 ? (
                <div className="critic-reviews-list">
                  {series.articles.map((art, idx) => (
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
              ) : (
                <div className="empty-state-card glass-panel">
                  <Newspaper size={36} className="text-cyan" />
                  <p>No press articles currently linked for this series.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Watch Online Tab */}
        {activeTab === 'watch' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Tv2 size={20} className="text-cyan" />
                  <h2>Official OTT Streaming Providers ({watchOnlineList.length} Options)</h2>
                </div>
              </div>

              {watchOnlineList.length > 0 ? (
                <div className="media-partner-grid">
                  {watchOnlineList.map((w, idx) => (
                    <a
                      key={idx}
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-link-card glass-panel large highlight-border"
                    >
                      <div className="mlc-icon-wrap">
                        {w.icon ? (
                          <img src={w.icon.startsWith('/') ? w.icon : `/${w.icon}`} alt={w.provider} className="mlc-icon-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                          <Tv2 size={28} className="text-cyan" />
                        )}
                      </div>
                      <div className="mlc-info">
                        <div className="mlc-header-row">
                          <span className="mlc-provider">{w.provider}</span>
                          {w.language && <span className="badge badge-cyan mlc-lang">{w.language}</span>}
                        </div>
                        <span className="mlc-action">{w.label || 'Watch Series'}</span>
                        <span className="mlc-url-hint">{w.url}</span>
                      </div>
                      <ExternalLink size={18} className="mlc-arrow" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Tv2 size={36} className="text-cyan" />
                  <p>Official streaming links being updated.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Songs & Music Tab */}
        {musicList.length > 0 && activeTab === 'music' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Music size={20} className="text-gold" />
                  <h2>Original Soundtrack & Music ({musicList.length} Platforms)</h2>
                </div>
              </div>

              <div className="media-partner-grid">
                {musicList.map((m, idx) => (
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
                        <Music size={24} className="text-gold" />
                      )}
                    </div>
                    <div className="mlc-info">
                      <span className="mlc-provider">{m.provider}</span>
                      <span className="mlc-action">{m.label || 'Listen Soundtrack'}</span>
                    </div>
                    <ExternalLink size={16} className="mlc-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Socials & Website */}
        {activeTab === 'socials' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Globe size={20} className="text-emerald" />
                  <h2>Official Website & Social Profiles</h2>
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
                      <span className="mlc-action">{officialWebsite.label || 'Visit Official Series Website'}</span>
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

        {/* Tab 7: Cast & Crew Tab */}
        {activeTab === 'cast' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Users size={20} className="text-cyan" />
                  <h2>Starring Cast & Creative Ensemble ({castList.length} Actors)</h2>
                </div>
              </div>

              {castList.length > 0 ? (
                <div className="cast-grid">
                  {castList.map((actor, idx) => (
                    <div key={idx} className="cast-card glass-panel">
                      <div className="cast-avatar">
                        <Users size={22} />
                      </div>
                      <div className="cast-info">
                        <h4 className="cast-actor">{actor.actor || actor.name}</h4>
                        <span className="cast-role">{actor.role || 'Cast Member'}</span>
                        {actor.description && <p className="cast-bio">{actor.description}</p>}
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

        {/* Tab 8: Videos & Trailers Tab */}
        {activeTab === 'videos' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <Play size={20} className="text-red" />
                  <h2>Trailers, Teasers & Official Video Promos ({series.videos?.length || 0})</h2>
                </div>
              </div>

              {series.videos && series.videos.length > 0 ? (
                <div className="videos-grid">
                  {series.videos.map((vid, idx) => (
                    <div 
                      key={idx} 
                      className="video-card glass-panel clickable"
                      onClick={() => setActiveVideo(vid)}
                    >
                      <div className="video-thumb-wrap">
                        <img 
                          src={vid.thumbnail || shareImageSrc} 
                          alt={vid.title} 
                          className="video-thumb-img"
                          onError={(e) => { e.target.src = shareImageSrc; }}
                        />
                        <div className="video-play-overlay">
                          <Play size={36} fill="#ffffff" />
                        </div>
                      </div>
                      <div className="video-info">
                        <h4 className="video-title">{vid.title}</h4>
                        <span className="video-type-tag">{vid.type || 'Official Promo'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card glass-panel">
                  <Play size={36} className="text-red" />
                  <p>Official promotional videos will be updated shortly.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 9: Community Reviews Tab */}
        {activeTab === 'community' && (
          <div className="tab-pane animate-fade-in">
            <div className="section-block community-reviews-section">
              <div className="section-header-row">
                <div className="section-title-wrap">
                  <MessageSquare size={20} className="text-emerald" />
                  <h2>All Community Reviews & Ratings</h2>
                </div>
                <span className="section-badge badge-emerald">{communityReviews.length} Verified Audience Reviews</span>
              </div>

              <div className="reviews-layout-grid">
                <div className="user-review-form-card glass-card">
                  <h3>Rate "{activeTitle}"</h3>
                  <p className="form-subtitle">Share your verified verdict with other viewers</p>

                  <form onSubmit={handleReviewSubmit}>
                    <div className="rating-select-group">
                      <label>Your Score: {userRating > 0 ? `${userRating}/10` : 'Tap to rate'}</label>
                      <div className="star-rating-row">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${userRating >= star ? 'active' : ''}`}
                            onClick={() => setUserRating(star)}
                            title={`${star}/10`}
                          >
                            <Star size={18} fill={userRating >= star ? '#ffb800' : 'none'} color={userRating >= star ? '#ffb800' : '#475569'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-field-group">
                      <input 
                        type="text" 
                        placeholder="Your Name (Optional)"
                        value={userReviewerName}
                        onChange={(e) => setUserReviewerName(e.target.value)}
                        className="form-text-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <textarea
                        placeholder="Write your review... (Acting, screenplay, climax, pacing...)"
                        value={userReviewText}
                        onChange={(e) => setUserReviewText(e.target.value)}
                        rows={3}
                        className="form-textarea"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-review-btn">
                      <ThumbsUp size={16} />
                      <span>Post Audience Review</span>
                    </button>

                    {reviewSubmitted && (
                      <div className="review-success-msg animate-fade-in">
                        <span>✨ Your review has been posted!</span>
                      </div>
                    )}
                  </form>
                </div>

                <div className="community-reviews-stream">
                  {communityReviews.map((rev) => (
                    <div key={rev.id} className="audience-review-card glass-card">
                      <div className="arc-header">
                        <div className="arc-user-info">
                          <div className="arc-avatar">{rev.author.charAt(0).toUpperCase()}</div>
                          <div>
                            <span className="arc-username">{rev.author}</span>
                            <span className="arc-date">{rev.date}</span>
                          </div>
                        </div>
                        <div className="arc-score-badge">
                          <Star size={14} fill="#ffb800" color="#ffb800" />
                          <span>{rev.rating}/10</span>
                        </div>
                      </div>

                      <p className="arc-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <VideoPlayerModal 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}

      {/* Lightbox Modal */}
      {activeLightboxImg && typeof document !== 'undefined' && createPortal(
        <div className="lightbox-backdrop animate-fade-in" onClick={() => setActiveLightboxImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setActiveLightboxImg(null)} aria-label="Close Lightbox">
              <X size={22} />
            </button>
            <div className="lightbox-main-view">
              <div className="lightbox-img-wrap">
                <img 
                  src={activeLightboxImg.startsWith('/') ? activeLightboxImg : `/${activeLightboxImg}`} 
                  alt={activeTitle} 
                  className="lightbox-full-img" 
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
              </div>
            </div>
            <div className="lightbox-footer-bar">
              <div className="lightbox-caption">
                <h4>{activeTitle}</h4>
                <span>{activeTitle} — Official Production Still & Poster</span>
              </div>
              <div className="lightbox-actions">
                <a 
                  href={activeLightboxImg.startsWith('/') ? activeLightboxImg : `/${activeLightboxImg}`} 
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

      {/* In-House Critic Review Modal */}
      {activeInternalReviewModal && (
        <div className="lightbox-overlay" onClick={() => setActiveInternalReviewModal(null)}>
          <div className="internal-review-modal glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', width: '90%', maxHeight: '85vh', overflowY: 'auto', padding: '30px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={22} className="text-gold" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>OakShow In-House Review</h3>
              </div>
              <button className="lightbox-close-btn" onClick={() => setActiveInternalReviewModal(null)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffb800', marginBottom: '14px' }}>
              "{activeInternalReviewModal.title}"
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>Critic: {activeInternalReviewModal.author}</span>
              <span>•</span>
              <span style={{ color: '#ffb800', fontWeight: 800 }}>Rating: {activeInternalReviewModal.rating || `${activeInternalReviewModal.score}/5`}</span>
            </div>

            <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {activeInternalReviewModal.fullReview || activeInternalReviewModal.excerpt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
