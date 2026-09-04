import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroSpotlight from '../components/HeroSpotlight';
import MovieCard from '../components/MovieCard';
import MovieDetailPage from '../components/MovieDetailPage';
import SeriesDetailPage from '../components/SeriesDetailPage';
import EpisodeDetailPage from '../components/EpisodeDetailPage';
import GameDetailPage from '../components/GameDetailPage';
import BookDetailPage from '../components/BookDetailPage';
import SportsDetailPage from '../components/SportsDetailPage';
import ReleaseMonthDetailPage from '../components/ReleaseMonthDetailPage';
import VideoPlayerModal from '../components/VideoPlayerModal';
import SearchModal from '../components/SearchModal';
import ReleaseCalendarView from '../components/ReleaseCalendarView';
import CriticReviewsHub from '../components/CriticReviewsHub';
import CriticProfilePage from '../components/CriticProfilePage';
import SeriesHub from '../components/SeriesHub';
import SportsHub from '../components/SportsHub';
import GamesAndBooksHub from '../components/GamesAndBooksHub';
import NewsHub from '../components/NewsHub';
import EmergencyHub from '../components/EmergencyHub';
import EmergencyDetailPage from '../components/EmergencyDetailPage';
import MusicHub from '../components/MusicHub';
import TrailersHub from '../components/TrailersHub';
import EventsHub from '../components/EventsHub';
import BlogHub from '../components/BlogHub';
import GalleriesHub from '../components/GalleriesHub';
import CopyrightPolicyModal from '../components/CopyrightPolicyModal';
import BookmarksDrawer from '../components/BookmarksDrawer';
import Footer from '../components/Footer';

// Data imports
import moviesData from '../../data/movies.json';
import seriesData from '../../data/series.json';
import releasesData from '../../data/releases.json';
import reviewsData from '../../data/reviews.json';
import criticsData from '../../data/critics.json';
import gamesData from '../../data/games.json';
import booksData from '../../data/books.json';
import sportsData from '../../data/sports.json';
import newsData from '../../data/news.json';
import blogsData from '../../data/blogs.json';
import galleriesData from '../../data/galleries.json';
import emergenciesData from '../../data/emergencies.json';
import musicData from '../../data/music.json';
import eventsData from '../../data/events.json';
import trailersData from '../../data/trailers.json';
import searchIndexData from '../../data/search_index.json';

import { useRouter, updatePageMeta } from '../utils/router';
import { getProfileImage, getShareImage, getItemCanonicalUrl } from '../utils/mediaUtils';

import { 
  Sparkles, 
  Filter, 
  SlidersHorizontal, 
  TrendingUp, 
  Clapperboard, 
  Globe, 
  Star, 
  Calendar,
  Layers,
  ChevronDown,
  ArrowRight,
  Tv,
  MonitorPlay,
  Gamepad2,
  Trophy,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const { route, navigate } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);

  // Filter States for movies in catalog
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [sortBy, setSortBy] = useState('latest-high'); // 'latest-high', 'rating', 'newest', 'title'
  const [visibleCount, setVisibleCount] = useState(24);

  // Watchlist Local Storage
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('oakshow_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Theme State: 'dark' by default for mobile browsers, 'light' for desktop, switchable
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('oakshow_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      const isMobile = typeof window !== 'undefined' && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth && window.innerWidth <= 768));
      return isMobile ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      localStorage.setItem('oakshow_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('oakshow_watchlist', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Global Keyboard Shortcuts (Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset pagination when route or filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [route, selectedGenre, selectedLanguage, selectedYear, selectedPlatform, sortBy]);

  // Reset category filters when navigating between hubs
  useEffect(() => {
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSelectedYear('All');
    setSelectedPlatform('All');
  }, [route.type]);

  // Bookmark toggle
  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      const exists = prev.some(m => m.id === item.id);
      if (exists) {
        return prev.filter(m => m.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(m => m.id !== id));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  // Extract all distinct genres, languages, and years based on active category
  const { allGenres, allLanguages, allYears, allPlatforms } = useMemo(() => {
    const genreSet = new Set();
    const langSet = new Set();
    const yearSet = new Set();
    const platformSet = new Set();

    let pool = moviesData;
    if (route.type === 'indian') pool = moviesData.filter(m => m.category === 'Indian');
    else if (route.type === 'hollywood') pool = moviesData.filter(m => m.category === 'Hollywood');
    else if (route.type === 'international') pool = moviesData.filter(m => m.category === 'International');
    else if (route.type === 'ott') pool = moviesData.filter(m => m.watchOnline && Array.isArray(m.watchOnline) && m.watchOnline.some(w => w.url && w.url.trim() && w.url !== '#'));

    pool.forEach(m => {
      if (m.genre) m.genre.split(/[\/, ]+/).forEach(g => { if (g.trim() && g.length > 2) genreSet.add(g.trim()); });
      if (m.language) m.language.split(/[\/, ]+/).forEach(l => { if (l.trim() && l.length > 2) langSet.add(l.trim()); });
      if (m.year) yearSet.add(m.year);
      if (m.watchOnline && Array.isArray(m.watchOnline)) {
        m.watchOnline.forEach(w => {
          if (w.platform && w.platform.trim() && w.url && w.url.trim() && w.url !== '#') {
            platformSet.add(w.platform.trim());
          }
        });
      }
    });

    return {
      allGenres: ['All', ...Array.from(genreSet).sort()],
      allLanguages: ['All', ...Array.from(langSet).sort()],
      allYears: ['All', ...Array.from(yearSet).sort((a, b) => b.localeCompare(a))],
      allPlatforms: ['All', ...Array.from(platformSet).sort()]
    };
  }, [route.type]);

  // Main movie catalog filtering
  const filteredMovies = useMemo(() => {
    let list = [...moviesData];

    // Industry / Tab Filtering
    if (route.type === 'indian') {
      list = list.filter(m => m.category === 'Indian');
    } else if (route.type === 'hollywood') {
      list = list.filter(m => m.category === 'Hollywood');
    } else if (route.type === 'international') {
      list = list.filter(m => m.category === 'International');
    } else if (route.type === 'ott') {
      list = list.filter(m => m.watchOnline && Array.isArray(m.watchOnline) && m.watchOnline.some(w => w.url && w.url.trim() && w.url !== '#'));
    }

    // Platform filter (for OTT releases)
    if (selectedPlatform !== 'All') {
      list = list.filter(m => m.watchOnline && Array.isArray(m.watchOnline) && m.watchOnline.some(w => w.platform && w.platform.trim().toLowerCase() === selectedPlatform.toLowerCase() && w.url && w.url.trim() && w.url !== '#'));
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      list = list.filter(m => m.genre && m.genre.toLowerCase().includes(selectedGenre.toLowerCase()));
    }

    // Language filter
    if (selectedLanguage !== 'All') {
      list = list.filter(m => m.language && m.language.toLowerCase().includes(selectedLanguage.toLowerCase()));
    }

    // Year filter
    if (selectedYear !== 'All') {
      list = list.filter(m => m.year === selectedYear);
    }

    // Comprehensive Sorting
    list.sort((a, b) => {
      if (sortBy === 'latest-high') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        if (yrB !== yrA) return yrB - yrA;
        return (b.score || 0) - (a.score || 0);
      } else if (sortBy === 'newest') {
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        if (yrB !== yrA) return yrB - yrA;
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'oldest') {
        const yrA = parseInt(a.year, 10) || 9999;
        const yrB = parseInt(b.year, 10) || 9999;
        if (yrA !== yrB) return yrA - yrB;
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'rating-high' || sortBy === 'rating') {
        const scoreA = typeof a.score === 'number' ? a.score : (parseFloat(a.ratings?.[0]?.score) || 0);
        const scoreB = typeof b.score === 'number' ? b.score : (parseFloat(b.ratings?.[0]?.score) || 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'rating-low') {
        const scoreA = typeof a.score === 'number' ? a.score : (parseFloat(a.ratings?.[0]?.score) || 0);
        const scoreB = typeof b.score === 'number' ? b.score : (parseFloat(b.ratings?.[0]?.score) || 0);
        if (scoreA !== scoreB) return scoreA - scoreB;
        const yrA = parseInt(a.year, 10) || 0;
        const yrB = parseInt(b.year, 10) || 0;
        return yrB - yrA;
      } else if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      } else {
        // title-asc / title
        return (a.title || '').localeCompare(b.title || '');
      }
    });

    return list;
  }, [route.type, selectedGenre, selectedLanguage, selectedYear, selectedPlatform, sortBy]);

  // Latest & Highest Rated Blockbusters arranged strictly in release dates from newest 1st
  const latestBlockbusters = useMemo(() => {
    const parseDate = (item) => {
      if (!item) return 0;
      if (item.releaseDate) {
        const clean = item.releaseDate.replace(/\(.*?\)/g, '').replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
        const t = Date.parse(clean);
        if (!isNaN(t) && t > 0) return t;
        const m = clean.match(/(\d{4})/);
        if (m) return new Date(parseInt(m[1], 10), 0, 1).getTime();
      }
      if (item.year) {
        const y = parseInt(item.year, 10);
        if (!isNaN(y) && y > 0) return new Date(y, 0, 1).getTime();
      }
      return 0;
    };

    return [...moviesData].sort((a, b) => {
      const timeA = parseDate(a);
      const timeB = parseDate(b);
      if (timeB !== timeA) return timeB - timeA;
      return (a.title || '').localeCompare(b.title || '');
    });
  }, []);

  // Movies streaming on verified OTT platforms arranged with newest release dates first
  const ottMovies = useMemo(() => {
    const parseDate = (item) => {
      if (!item) return 0;
      if (item.releaseDate) {
        const clean = item.releaseDate.replace(/\(.*?\)/g, '').replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
        const t = Date.parse(clean);
        if (!isNaN(t) && t > 0) return t;
        const m = clean.match(/(\d{4})/);
        if (m) return new Date(parseInt(m[1], 10), 0, 1).getTime();
      }
      if (item.year) {
        const y = parseInt(item.year, 10);
        if (!isNaN(y) && y > 0) return new Date(y, 0, 1).getTime();
      }
      return 0;
    };

    return moviesData
      .filter(m => m.watchOnline && Array.isArray(m.watchOnline) && m.watchOnline.some(w => w.url && w.url.trim() && w.url !== '#'))
      .sort((a, b) => {
        const timeA = parseDate(a);
        const timeB = parseDate(b);
        if (timeB !== timeA) return timeB - timeA;
        return (a.title || '').localeCompare(b.title || '');
      });
  }, []);

  // Handle item select from SearchModal
  const handleSelectItem = (item) => {
    setSearchOpen(false);
    if (item.type === 'emergency' || item.type === 'emergencies') {
      navigate(`emergency/${item.id}`);
    } else if (item.type === 'music') {
      navigate('music');
    } else if (item.type === 'trailer' || item.type === 'trailers') {
      navigate('trailers');
    } else if (item.type === 'event' || item.type === 'events') {
      navigate('events');
    } else if (item.type === 'movie') {
      const found = moviesData.find(m => m.id?.toLowerCase() === item.id?.toLowerCase() || m.title?.toLowerCase() === item.title?.toLowerCase());
      const slug = found ? found.id : item.id;
      navigate(`movie/${slug}`);
    } else if (item.type === 'episode' || item.id?.toLowerCase().startsWith('dbsepisode')) {
      navigate(item.filename ? item.filename.replace(/\.html$/, '') : `episode/${item.id}`);
    } else if (item.type === 'series') {
      navigate(`series/${item.id}`);
    } else if (item.type === 'game') {
      navigate(`game/${item.id}`);
    } else if (item.type === 'book') {
      navigate(`book/${item.id}`);
    } else if (item.type === 'sports') {
      navigate(`sports/${item.id}`);
    } else if (item.type === 'review') {
      navigate('reviews');
    } else {
      navigate(`movie/${item.id}`);
    }
  };

  // Map route.type to activeTab name for navbar highlighting
  const currentNavTab = useMemo(() => {
    if (['discover', 'indian', 'hollywood', 'international', 'ott', 'reviews', 'releases', 'sports-hub', 'games-books', 'news', 'blog', 'galleries', 'emergencies', 'music', 'trailers', 'events'].includes(route.type)) {
      return route.type;
    }
    if (route.type === 'emergency' || route.type === 'emergency-detail') return 'emergencies';
    if (route.type === 'gallery') return 'galleries';
    if (route.type === 'series' || route.type === 'series-hub' || route.type === 'episode') return 'series';
    if (route.type === 'sports') return 'sports';
    if (route.type === 'game' || route.type === 'book' || route.type === 'games' || route.type === 'books') return 'games-books';
    if (route.type === 'movie') return 'discover';
    return 'discover';
  }, [route.type]);

  // =========================================================================
  // ROUTE RENDERING DISPATCHER
  // =========================================================================

  // 1. Standalone MOVIE / LEGACY PAGE
  if (route.type === 'movie' || route.type === 'legacy') {
    const cleanId = (route.id || '').toLowerCase().replace(/\.html$/, '');
    
    // Check if it's an emergency in legacy files
    const targetEmergency = emergenciesData.find(e => 
      e.id?.toLowerCase() === cleanId || 
      e.slug?.toLowerCase() === cleanId || 
      e.legacyFilename?.toLowerCase().includes(cleanId)
    );
    if (targetEmergency) {
      updatePageMeta(
        `${targetEmergency.title} — OakShow Emergency & Disaster Relief Dispatch`,
        targetEmergency.summary,
        targetEmergency.banner || targetEmergency.poster
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="emergencies"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <EmergencyDetailPage
            emergency={targetEmergency}
            onNavigate={navigate}
            onBack={() => navigate('emergencies')}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // Check if it's a photo gallery (e.g. JusticeLeaguePosters, Galleries/...)
    const targetGallery = galleriesData.find(g => 
      g.id?.toLowerCase() === cleanId ||
      g.filename?.toLowerCase().replace('.html', '') === cleanId ||
      g.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    );
    if (targetGallery || cleanId.includes('posters') || cleanId.includes('wallpapers') || cleanId.includes('stills')) {
      const gToDisplay = targetGallery || galleriesData[0];
      updatePageMeta(
        `${gToDisplay.title} — OakShow HD Wallpapers & Photo Vault`,
        gToDisplay.description,
        gToDisplay.coverImage
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="galleries"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <div className="container tab-view">
            <GalleriesHub
              galleriesData={galleriesData}
              onNavigate={navigate}
              onSelectMovie={(slug) => navigate(`movie/${slug}`)}
            />
          </div>
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // Check if it's a specific critic review (e.g. unpregnant-review-by-jithin-j-prasad)
    const targetReview = reviewsData.find(r => 
      r.id?.toLowerCase() === cleanId ||
      r.file?.toLowerCase().replace('.html', '') === cleanId
    );
    if (targetReview) {
      updatePageMeta(
        `${targetReview.title} — OakShow Critic Review by ${targetReview.author}`,
        targetReview.excerpt,
        targetReview.banner
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="reviews"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <div className="container tab-view">
            <CriticReviewsHub
              reviews={reviewsData}
              onNavigate={navigate}
            />
          </div>
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // Check if it's a release month calendar (e.g. IndianReleases2018August)
    const targetRelease = releasesData.find(r => 
      r.id?.toLowerCase() === cleanId ||
      r.filename?.toLowerCase().replace('.html', '') === cleanId
    );
    if (targetRelease) {
      updatePageMeta(
        targetRelease.title ? `${targetRelease.title} — OakShow Release Matrix` : `Cinema Releases ${targetRelease.month} ${targetRelease.year} — OakShow`,
        `Explore all movies released in ${targetRelease.month} ${targetRelease.year} on OakShow`
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="releases"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <ReleaseMonthDetailPage
            releaseItem={targetRelease}
            onNavigate={navigate}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // Check if it's a sports tournament (e.g. 2018FIFAWorldCup, ISL2018)
    const targetSport = sportsData.find(s => 
      s.id?.toLowerCase() === cleanId ||
      s.filename?.toLowerCase().replace('.html', '') === cleanId
    );
    if (targetSport) {
      updatePageMeta(
        targetSport.metaTitle || `${targetSport.title} Schedule & Results — OakShow Sports`,
        targetSport.meta?.description,
        targetSport.meta?.ogImage
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="sports"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <SportsDetailPage
            tournament={targetSport}
            onNavigate={navigate}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // Check if it's a video game
    const targetGame = gamesData.find(g => 
      g.moreLink?.toLowerCase().replace('.html', '') === cleanId ||
      g.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    );
    if (targetGame) {
      updatePageMeta(
        targetGame.metaTitle || `${targetGame.title} Game Ratings & Reviews — OakShow`,
        targetGame.description,
        targetGame.poster
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="games-books"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <GameDetailPage
            game={targetGame}
            onNavigate={navigate}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // Check if it's a book
    const targetBook = booksData.find(b => 
      b.id?.toLowerCase() === cleanId ||
      b.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    );
    if (targetBook) {
      updatePageMeta(
        targetBook.metaTitle || `${targetBook.title} Book Review & Overview — OakShow`,
        targetBook.description,
        targetBook.poster
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="games-books"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <BookDetailPage
            book={targetBook}
            onNavigate={navigate}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // 1. Look up in seriesData first (for series routes, TV series slugs, or multi-seasons)
    let targetSeries = null;
    let targetSeasonNum = 1;

    targetSeries = seriesData.find(s => 
      s.id?.toLowerCase() === cleanId || 
      s.slug?.toLowerCase() === cleanId || 
      s.filename?.toLowerCase() === `${cleanId}.html` ||
      s.filename?.toLowerCase().replace(/\.html$/, '') === cleanId ||
      s.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '') ||
      (cleanId === 'scam1992' && (s.id === 'Scam1992S1' || s.id === 'Scam1992'))
    );

    if (!targetSeries) {
      for (const s of seriesData) {
        // Check DBS Episodes
        if (s.episodes && s.episodes.length > 0) {
          const targetEp = s.episodes.find(ep => 
            ep.id?.toLowerCase() === cleanId || 
            ep.filename?.toLowerCase().replace(/\.html$/, '') === cleanId ||
            `dbsepisode${ep.episodeNumber}` === cleanId
          );
          if (targetEp) {
            const epTitle = `${s.title} Episode ${targetEp.episodeNumber}: ${targetEp.title} — OakShow`;
            const epThumb = targetEp.thumbnail ? (targetEp.thumbnail.startsWith('/') ? targetEp.thumbnail : `/${targetEp.thumbnail}`) : getShareImage(s);
            const epCanonical = `https://oakshow.in/${targetEp.filename || `${targetEp.id}.html`}`;

            updatePageMeta(epTitle, targetEp.plot || s.description, epThumb, epCanonical, 'video.episode');
            return (
              <div className="app-root">
                <Navbar
                  activeTab="series"
                  setActiveTab={navigate}
                  openSearch={() => setSearchOpen(true)}
                  bookmarkCount={bookmarks.length}
                  onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
                  totalMoviesCount={moviesData.length}
                />
                <EpisodeDetailPage
                  episode={targetEp}
                  series={s}
                  allEpisodes={s.episodes || []}
                  onNavigate={navigate}
                  isBookmarked={bookmarks.some(b => b.id === targetEp.id || b.id === s.id)}
                  onToggleBookmark={toggleBookmark}
                />
                <Footer onSelectCategory={navigate} />
                <SearchModal
                  isOpen={searchOpen}
                  onClose={() => setSearchOpen(false)}
                  searchIndex={searchIndexData}
                  onSelectItem={handleSelectItem}
                />
              </div>
            );
          }
        }

        // Check Multi-Seasons
        if (s.seasonsData && s.seasonsData.length > 0) {
          const sIdx = s.seasonsData.findIndex(sd => 
            sd.filename?.toLowerCase().replace(/\.html$/, '') === cleanId ||
            sd.seasonId?.toLowerCase() === cleanId ||
            sd.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
          );
          if (sIdx !== -1) {
            targetSeries = s;
            targetSeasonNum = sIdx + 1;
            break;
          }
        }
      }
    }

    if (targetSeries && (route.type === 'series' || route.type === 'legacy' || !moviesData.some(m => m.id?.toLowerCase() === cleanId || m.filename?.toLowerCase() === `${cleanId}.html`))) {
      const seriesPageTitle = targetSeries.metaTitle || `${targetSeries.title} All Ratings, Episodes & Reviews — OakShow`;
      const seriesCanonical = getItemCanonicalUrl(targetSeries);
      const seriesShareImg = getShareImage(targetSeries);
      const seriesSchema = {
        '@context': 'https://schema.org',
        '@type': 'TVSeries',
        'name': targetSeries.title,
        'description': targetSeries.description,
        'image': seriesShareImg,
        'url': seriesCanonical
      };
      updatePageMeta(seriesPageTitle, targetSeries.description, seriesShareImg, seriesCanonical, 'video.tv_show', seriesSchema);
      return (
        <div className="app-root">
          <Navbar
            activeTab="series"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <SeriesDetailPage
            series={targetSeries}
            allSeries={seriesData}
            initialEpisodeId={route.episodeId}
            initialSeason={targetSeasonNum}
            onNavigate={navigate}
            isBookmarked={bookmarks.some(b => b.id === targetSeries.id)}
            onToggleBookmark={toggleBookmark}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }

    // 2. Look up in moviesData
    let targetMovie = moviesData.find(m => 
      m.id?.toLowerCase() === cleanId || 
      m.slug?.toLowerCase() === cleanId || 
      m.filename?.toLowerCase() === `${cleanId}.html` ||
      m.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    );

    // If still not found, create clean placeholder entry
    if (!targetMovie) {
      const formattedTitle = (route.id || 'Movie Title').replace(/([A-Z])/g, ' $1').trim();
      targetMovie = {
        id: route.id,
        title: formattedTitle,
        year: '2018',
        language: 'Hindi / English',
        genre: 'Drama, Action',
        poster: '',
        ratings: [
          { source: 'OakShow', score: '8.0/10' },
          { source: 'IMDb', score: '7.5/10' }
        ],
        bookings: [
          { provider: 'BookMyShow', url: 'https://in.bookmyshow.com', label: 'Book Tickets' }
        ],
        cast: [],
        videos: [],
        gallery: []
      };
    }

    const moviePageTitle = targetMovie.metaTitle || `${targetMovie.title}${targetMovie.year ? ` (${targetMovie.year})` : ''} All Ratings, Reviews, Tickets & Stills — OakShow`;
    const movieCanonical = getItemCanonicalUrl(targetMovie);
    const movieShareImg = getShareImage(targetMovie);
    const movieSchema = {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      'name': targetMovie.title,
      'description': targetMovie.description || targetMovie.plot,
      'image': movieShareImg,
      'url': movieCanonical,
      'datePublished': targetMovie.year || targetMovie.releaseDate,
      'director': targetMovie.director ? { '@type': 'Person', 'name': targetMovie.director } : undefined,
      'aggregateRating': targetMovie.ratings && targetMovie.ratings.length > 0 ? {
        '@type': 'AggregateRating',
        'ratingValue': targetMovie.ratings[0].score,
        'bestRating': '10',
        'ratingCount': '100'
      } : undefined
    };
    updatePageMeta(moviePageTitle, targetMovie.description, movieShareImg, movieCanonical, 'video.movie', movieSchema);

    return (
      <div className="app-root">
        <Navbar
          activeTab={currentNavTab}
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <MovieDetailPage
          movie={targetMovie}
          allMovies={moviesData}
          onNavigate={navigate}
          isBookmarked={bookmarks.some(b => b.id === targetMovie.id)}
          onToggleBookmark={toggleBookmark}
        />
        <Footer onSelectCategory={navigate} />
        {/* Modals */}
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
        <BookmarksDrawer
          isOpen={bookmarksDrawerOpen}
          onClose={() => setBookmarksDrawerOpen(false)}
          bookmarks={bookmarks}
          onRemoveBookmark={removeBookmark}
          onClearAll={clearAllBookmarks}
          onSelectMovie={(m) => navigate(`movie/${m.id}`)}
        />
      </div>
    );
  }

  // 2. Standalone TV SERIES PAGE
  if (route.type === 'series' && route.id) {
    const cleanId = route.id.toLowerCase().replace(/\.html$/, '');
    let targetSeasonNum = 1;
    let targetSeries = seriesData.find(s => 
      s.id?.toLowerCase() === cleanId || 
      s.slug?.toLowerCase() === cleanId ||
      s.filename?.toLowerCase() === `${cleanId}.html` ||
      s.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    );

    // If not found directly, check if cleanId matches a season inside seasonsData
    if (!targetSeries) {
      for (const s of seriesData) {
        if (s.seasonsData && s.seasonsData.length > 0) {
          const sIdx = s.seasonsData.findIndex(sd => 
            sd.filename?.toLowerCase().replace(/\.html$/, '') === cleanId ||
            sd.seasonId?.toLowerCase() === cleanId ||
            sd.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
          );
          if (sIdx !== -1) {
            targetSeries = s;
            targetSeasonNum = sIdx + 1;
            break;
          }
        }
      }
    }

    if (!targetSeries) {
      targetSeries = moviesData.find(m => 
        m.id?.toLowerCase() === cleanId || 
        m.slug?.toLowerCase() === cleanId || 
        m.filename?.toLowerCase() === `${cleanId}.html` ||
        m.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
      );
    }

    if (!targetSeries) {
      targetSeries = seriesData[0];
    }
    
    const seriesPageTitle = targetSeries?.metaTitle || `${targetSeries?.title} All Ratings, Episodes & Reviews — OakShow`;
    const seriesCanonical = getItemCanonicalUrl(targetSeries);
    const seriesShareImg = getShareImage(targetSeries);
    const seriesSchema = {
      '@context': 'https://schema.org',
      '@type': 'TVSeries',
      'name': targetSeries?.title,
      'description': targetSeries?.description,
      'image': seriesShareImg,
      'url': seriesCanonical
    };
    updatePageMeta(seriesPageTitle, targetSeries?.description, seriesShareImg, seriesCanonical, 'video.tv_show', seriesSchema);

    return (
      <div className="app-root">
        <Navbar
          activeTab="series"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <SeriesDetailPage
          series={targetSeries}
          allSeries={seriesData}
          initialEpisodeId={route.episodeId}
          initialSeason={targetSeasonNum}
          onNavigate={navigate}
          isBookmarked={bookmarks.some(b => b.id === targetSeries.id)}
          onToggleBookmark={toggleBookmark}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
      </div>
    );
  }

  // 2.1 Standalone TV EPISODE PAGE (e.g. Dragon Ball Super episodes: dbsepisode131.html)
  if (route.type === 'episode' && route.id) {
    const cleanId = route.id.toLowerCase().replace(/\.html$/, '');
    
    // Find parent series
    const targetSeries = seriesData.find(s => s.id === 'DragonBallSuperTvSeries') || seriesData[0];
    const allEps = targetSeries?.episodes || [];
    
    let targetEpisode = allEps.find(ep => 
      ep.id?.toLowerCase() === cleanId ||
      ep.filename?.toLowerCase() === `${cleanId}.html` ||
      ep.filename?.toLowerCase() === cleanId ||
      ep.episodeNumber === parseInt(cleanId.replace(/\D/g, ''), 10)
    );

    if (!targetEpisode) {
      targetEpisode = allEps[allEps.length - 1] || allEps[0];
    }

    const epTitle = targetEpisode?.title || 'Episode';
    const epNum = targetEpisode?.episodeNumber || '';
    const seriesTitle = targetSeries?.title || 'Dragon Ball Super';
    const pageTitle = `${seriesTitle} Episode ${epNum}: ${epTitle} — All Ratings, Air Dates & Plot — OakShow`;
    const canonical = getItemCanonicalUrl(targetEpisode);
    const shareImg = getShareImage(targetSeries);
    const epSchema = {
      '@context': 'https://schema.org',
      '@type': 'TVEpisode',
      'name': epTitle,
      'episodeNumber': epNum,
      'partOfSeries': {
        '@type': 'TVSeries',
        'name': seriesTitle
      },
      'description': targetEpisode?.plot,
      'image': targetEpisode?.thumbnail ? (targetEpisode.thumbnail.startsWith('/') ? targetEpisode.thumbnail : `/${targetEpisode.thumbnail}`) : shareImg,
      'url': canonical
    };
    updatePageMeta(pageTitle, targetEpisode?.plot, shareImg, canonical, 'video.tv_show', epSchema);

    return (
      <div className="app-root">
        <Navbar
          activeTab="series"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <EpisodeDetailPage
          episode={targetEpisode}
          series={targetSeries}
          allEpisodes={allEps}
          onNavigate={navigate}
          isBookmarked={bookmarks.some(b => b.id === targetSeries.id)}
          onToggleBookmark={toggleBookmark}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
      </div>
    );
  }

  // 3. Standalone VIDEO GAME PAGE
  if (route.type === 'game' && route.id) {
    const cleanId = route.id.toLowerCase();
    const targetGame = gamesData.find(g => 
      g.moreLink?.toLowerCase().replace('.html', '') === cleanId || 
      g.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    ) || gamesData[0];

    updatePageMeta(targetGame?.metaTitle || `${targetGame?.title} Game Ratings & Reviews — OakShow`, targetGame?.description, targetGame?.poster);

    return (
      <div className="app-root">
        <Navbar
          activeTab="games-books"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <GameDetailPage
          game={targetGame}
          onNavigate={navigate}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
      </div>
    );
  }

  // 4. Standalone BOOK PAGE
  if (route.type === 'book' && route.id) {
    const cleanId = route.id.toLowerCase();
    const targetBook = booksData.find(b => 
      b.id?.toLowerCase() === cleanId || 
      b.title?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    ) || booksData[0];

    updatePageMeta(targetBook?.metaTitle || `${targetBook?.title} Book Review & Overview — OakShow`, targetBook?.description, targetBook?.poster);

    return (
      <div className="app-root">
        <Navbar
          activeTab="games-books"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <BookDetailPage
          book={targetBook}
          onNavigate={navigate}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
      </div>
    );
  }

  // 5. Standalone SPORTS PAGE
  if (route.type === 'sports' && route.id) {
    const cleanId = route.id.toLowerCase();
    const targetTournament = sportsData.find(s => 
      s.id?.toLowerCase() === cleanId || 
      s.filename?.toLowerCase().replace('.html', '') === cleanId
    ) || sportsData[0];

    updatePageMeta(targetTournament?.metaTitle || `${targetTournament?.title} Schedule & Results — OakShow Sports`, targetTournament?.meta?.description, targetTournament?.meta?.ogImage);

    return (
      <div className="app-root">
        <Navbar
          activeTab="sports"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <SportsDetailPage
          tournament={targetTournament}
          onNavigate={navigate}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
      </div>
    );
  }

  // 5.5 Standalone EPISODE DETAIL PAGE (Dragon Ball Super, etc.)
  if (route.type === 'episode' || (route.id && route.id.toLowerCase().startsWith('dbsepisode'))) {
    const cleanEpId = (route.id || '').toLowerCase().replace(/\.html$/, '');
    const parentSeries = seriesData.find(s => s.id === 'DragonBallSuperTvSeries' || s.id === 'DragonBallSuper') || seriesData[0];
    const targetEpisode = parentSeries?.episodes?.find(ep => 
      ep.id?.toLowerCase() === cleanEpId ||
      ep.filename?.toLowerCase().replace(/\.html$/, '') === cleanEpId ||
      `dbsepisode${ep.episodeNumber}` === cleanEpId
    ) || parentSeries?.episodes?.[0];

    if (targetEpisode) {
      const epTitle = `${parentSeries.title} Episode ${targetEpisode.episodeNumber}: ${targetEpisode.title} — OakShow`;
      const epThumb = targetEpisode.thumbnail ? (targetEpisode.thumbnail.startsWith('/') ? targetEpisode.thumbnail : `/${targetEpisode.thumbnail}`) : getShareImage(parentSeries);
      const epCanonical = `https://oakshow.in/${targetEpisode.filename || `${targetEpisode.id}.html`}`;

      updatePageMeta(
        epTitle,
        targetEpisode.plot || parentSeries.description,
        epThumb,
        epCanonical,
        'video.episode'
      );

      return (
        <div className="app-root">
          <Navbar
            activeTab="series"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <EpisodeDetailPage
            episode={targetEpisode}
            series={parentSeries}
            allEpisodes={parentSeries.episodes || []}
            onNavigate={navigate}
            isBookmarked={bookmarks.some(b => b.id === targetEpisode.id || b.id === parentSeries.id)}
            onToggleBookmark={toggleBookmark}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }
  }

  // 6. Standalone RELEASE CALENDAR MONTH PAGE
  if (route.type === 'releases' && route.id) {
    const cleanId = route.id.toLowerCase();
    const targetRelease = releasesData.find(r => 
      r.id?.toLowerCase() === cleanId || 
      r.filename?.toLowerCase().replace('.html', '') === cleanId
    );

    if (targetRelease) {
      updatePageMeta(
        targetRelease.title ? `${targetRelease.title} — OakShow Release Matrix` : `Cinema Releases ${targetRelease.month} ${targetRelease.year} — OakShow`,
        `Explore all movies released in ${targetRelease.month} ${targetRelease.year} on OakShow`
      );
      return (
        <div className="app-root">
          <Navbar
            activeTab="releases"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <ReleaseMonthDetailPage
            releaseItem={targetRelease}
            onNavigate={navigate}
          />
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
        </div>
      );
    }
  }

  // 7. Standalone CRITIC PROFILE PAGE
  if (route.type === 'critic' && route.id) {
    const cleanId = route.id.toLowerCase();
    const targetCritic = criticsData.find(c => 
      c.id.toLowerCase() === cleanId || 
      c.slug.toLowerCase() === cleanId ||
      c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    ) || criticsData[0];

    updatePageMeta(
      `${targetCritic.name} — OakShow Certified Critic Profile`, 
      targetCritic.bio, 
      targetCritic.avatar
    );

    return (
      <div className="app-root">
        <Navbar
          activeTab="reviews"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <CriticProfilePage
          critic={targetCritic}
          allReviews={reviewsData}
          onNavigate={navigate}
          onBack={() => navigate('reviews')}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
        <BookmarksDrawer
          isOpen={bookmarksDrawerOpen}
          onClose={() => setBookmarksDrawerOpen(false)}
          bookmarks={bookmarks}
          onRemoveBookmark={removeBookmark}
          onClearAll={clearAllBookmarks}
          onSelectMovie={(m) => navigate(`movie/${m.id}`)}
        />
      </div>
    );
  }

  // 8. Standalone EMERGENCY DETAIL PAGE
  if ((route.type === 'emergency-detail' || route.type === 'emergency') && route.id) {
    const cleanId = route.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const targetEmergency = emergenciesData.find(e => 
      e.id.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId ||
      e.slug.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId ||
      e.legacyFilename?.toLowerCase().includes(cleanId)
    ) || emergenciesData[0];

    updatePageMeta(
      `${targetEmergency.title} — OakShow Emergency & Disaster Relief Dispatch`,
      targetEmergency.summary,
      targetEmergency.banner || targetEmergency.poster
    );

    return (
      <div className="app-root">
        <Navbar
          activeTab="emergencies"
          setActiveTab={navigate}
          openSearch={() => setSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          totalMoviesCount={moviesData.length}
        />
        <EmergencyDetailPage
          emergency={targetEmergency}
          onNavigate={navigate}
          onBack={() => navigate('emergencies')}
        />
        <Footer onSelectCategory={navigate} />
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchIndex={searchIndexData}
          onSelectItem={handleSelectItem}
        />
      </div>
    );
  }

  // 9. Standalone PHOTO GALLERY & STILLS PAGE (IMDb Photo Gallery Experience)
  if ((route.type === 'gallery' || route.type === 'galleries') && route.id) {
    const cleanId = route.id.toLowerCase().replace(/\.html$/i, '');
    const targetGallery = galleriesData.find(g => {
      const gId = (g.id || '').toLowerCase().replace(/\.html$/i, '');
      const gFilename = (g.filename || '').toLowerCase().replace(/\.html$/i, '').replace(/^galleries\//i, '');
      const gSlug = (g.movieSlug || '').toLowerCase();
      return gId === cleanId || gFilename === cleanId || gSlug === cleanId || cleanId.includes(gId) || gId.includes(cleanId) || (g.title && g.title.toLowerCase().includes(cleanId));
    });

    if (targetGallery) {
      updatePageMeta(
        `${targetGallery.title} — OakShow HD Gallery & Posters Vault`,
        targetGallery.description || `Explore ${targetGallery.title} official HD posters, photoshoot stills, and wallpapers on OakShow`,
        targetGallery.coverImage
      );

      return (
        <div className="app-root">
          <Navbar
            activeTab="galleries"
            setActiveTab={navigate}
            openSearch={() => setSearchOpen(true)}
            bookmarkCount={bookmarks.length}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
            totalMoviesCount={moviesData.length}
          />
          <div className="container">
            <GalleriesHub
              galleriesData={galleriesData}
              initialGalleryId={targetGallery.id}
              onNavigate={navigate}
              onSelectMovie={(slug) => navigate(`movie/${slug}`)}
            />
          </div>
          <Footer onSelectCategory={navigate} />
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchIndex={searchIndexData}
            onSelectItem={handleSelectItem}
          />
          <BookmarksDrawer
            isOpen={bookmarksDrawerOpen}
            onClose={() => setBookmarksDrawerOpen(false)}
            bookmarks={bookmarks}
            onRemoveBookmark={removeBookmark}
            onClearAll={clearAllBookmarks}
            onSelectMovie={(m) => navigate(`movie/${m.id}`)}
          />
        </div>
      );
    }
  }

  // =========================================================================
  // CATEGORY HUBS & DISCOVER HOME DYNAMIC META TITLES
  // =========================================================================
  if (route.type === 'discover') {
    updatePageMeta('OakShow-The One Destination For Everything On Entertainment', 'Unified movie ratings, critic reviews, showtimes, trailers and bookings in one place.');
  } else if (route.type === 'indian') {
    updatePageMeta('Indian Cinema (Bollywood, Tollywood, Kollywood & Mollywood) — OakShow', 'Browse verified ratings, reviews, streaming providers and bookings for Indian movies.');
  } else if (route.type === 'hollywood') {
    updatePageMeta('Hollywood Studio Blockbusters & Classics — OakShow', 'Browse verified ratings, reviews, streaming providers and bookings for Hollywood blockbusters.');
  } else if (route.type === 'international') {
    updatePageMeta('International Cinema, Anime & World Movies — OakShow', 'Explore global cinema, Japanese anime, and European releases on OakShow.');
  } else if (route.type === 'ott') {
    updatePageMeta('Movies on OTT & Online Streaming Platforms — OakShow', 'Browse movies streaming on Netflix, Amazon Prime Video, Sun NXT, Disney+ Hotstar, SonyLIV, ZEE5, Apple TV, and more.');
  } else if (route.type === 'series-hub' || route.type === 'series') {
    updatePageMeta('Web Series & Television Shows Vault — OakShow', 'Binge-worthy web series, episode guides, ratings, and streaming platforms.');
  } else if (route.type === 'releases') {
    updatePageMeta('Cinema Release Matrix & Monthly Calendars (2015–2022+) — OakShow', 'Complete month-by-month release schedules for Indian and Hollywood films.');
  } else if (route.type === 'reviews') {
    updatePageMeta('OakShow Editorial & Critic Reviews — Certified Ratings & Remarks', 'Unbiased film criticism, certified reviewer profiles, and OakShow official remarks.');
  } else if (route.type === 'remarks') {
    updatePageMeta('OakShow Remarks & Meaning Guide — 4 Certified Verdicts', 'Understanding OakShow official verdict remarks: Must Watch, Safe to Watch, Above Average, and Warning.');
  } else if (route.type === 'sports-hub' || route.type === 'sports') {
    updatePageMeta('Sports Tournaments & World Cup Archives — OakShow', '2018 FIFA World Cup, Women\'s Hockey World Cup, and football schedules.');
  } else if (route.type === 'games-books' || route.type === 'games' || route.type === 'books') {
    updatePageMeta('Video Games & Recommended Literature Shortlists — OakShow', 'Shortlisted top video games and must-read books.');
  } else if (route.type === 'news') {
    updatePageMeta('OakShow News & Current Affairs Reports — Verified Cinema & Box Office Bulletins', 'Verified cinema headlines, box office milestones, and current affairs reports.');
  } else if (route.type === 'galleries' || route.type === 'gallery') {
    updatePageMeta('OakShow Movie Galleries & Character Posters Vault — HD Wallpapers & Stills', 'High-definition official movie wallpapers, photoshoot stills, character posters, and photo archives.');
  } else if (route.type === 'blog') {
    updatePageMeta('OakShow Cinema Perspectives & Editorial Essays', 'In-depth cinema features, retrospectives, and cultural commentary.');
  } else if (route.type === 'emergencies' || route.type === 'emergency') {
    updatePageMeta('Public Emergencies, Helplines & Disaster Relief — OakShow', 'Official helplines, relief funds, and emergency response portals.');
  } else if (route.type === 'music') {
    updatePageMeta('Soundtracks, Scores & Audio Launches — OakShow', 'Explore official movie soundtracks, audio jukeboxes, and background scores.');
  } else if (route.type === 'trailers') {
    updatePageMeta('Trailers, Teasers & Video Vault — OakShow', 'High-definition official teasers, promos, and first look trailers.');
  } else if (route.type === 'events') {
    updatePageMeta('Film Festivals, Award Galas & Cinema Events — OakShow', 'Coverage of film awards, galas, and industry festivals.');
  }

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar
        activeTab={currentNavTab}
        setActiveTab={navigate}
        openSearch={() => setSearchOpen(true)}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        totalMoviesCount={moviesData.length}
      />

      <main className="main-content">
        {/* DISCOVER (HOME) */}
        {route.type === 'discover' && (
          <div className="tab-view animate-fade-in">
            {/* Spotlight Banner */}
            <HeroSpotlight
              movies={moviesData}
              onSelectMovie={(m) => navigate(`movie/${m.id}`)}
              onPlayTrailer={setActiveVideo}
            />

            <div className="container">
              {/* Category Quick Selector Chips */}
              <div className="home-quick-hubs glass-panel">
                <button className="hub-chip" onClick={() => navigate('indian')}>
                  <Globe size={18} className="text-gold" />
                  <span>Indian Cinema</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('hollywood')}>
                  <Clapperboard size={18} className="text-red" />
                  <span>Hollywood</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('international')}>
                  <Sparkles size={18} className="text-cyan" />
                  <span>International</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('ott')}>
                  <MonitorPlay size={18} className="text-cyan" />
                  <span>OTT Releases</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('series-hub')}>
                  <Tv size={18} className="text-red" />
                  <span>Web Series</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('releases')}>
                  <Calendar size={18} className="text-cyan" />
                  <span>Movies Released</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('reviews')}>
                  <Star size={18} className="text-gold" />
                  <span>Critic Reviews</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('sports-hub')}>
                  <Trophy size={18} className="text-gold" />
                  <span>Sports</span>
                </button>
                <button className="hub-chip" onClick={() => navigate('games-books')}>
                  <Gamepad2 size={18} className="text-cyan" />
                  <span>Games & Books</span>
                </button>
                <button className="hub-chip emergency-hub-chip" onClick={() => navigate('emergencies')}>
                  <ShieldAlert size={18} className="text-red" />
                  <span>🚨 Emergencies & Relief</span>
                </button>
              </div>

              {/* Latest & High-Rated Blockbusters */}
              <section className="feed-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <TrendingUp size={22} className="text-red" />
                    <h2>Latest & Highest Rated Blockbusters</h2>
                  </div>
                  <span className="section-badge">{moviesData.length}+ Available Titles</span>
                </div>

                <div className="grid-movies">
                  {latestBlockbusters.slice(0, 12).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={(m) => navigate(`movie/${m.id}`)}
                      onPlayTrailer={setActiveVideo}
                      isBookmarked={bookmarks.some(b => b.id === movie.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* Movies on OTT & Online Streaming */}
              <section className="feed-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <MonitorPlay size={22} className="text-cyan" />
                    <h2>Movies Streaming on OTT Platforms</h2>
                  </div>
                  <button className="view-all-link" onClick={() => navigate('ott')}>
                    <span>View All OTT Releases ({ottMovies.length})</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid-movies">
                  {ottMovies.slice(0, 12).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={(m) => navigate(`movie/${m.id}`)}
                      onPlayTrailer={setActiveVideo}
                      isBookmarked={bookmarks.some(b => b.id === movie.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* Indian Cinema Showcase */}
              <section className="feed-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <Globe size={22} className="text-gold" />
                    <h2>Indian Cinema Blockbusters</h2>
                  </div>
                  <button className="view-all-link" onClick={() => navigate('indian')}>
                    <span>View All Indian Cinema</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid-movies">
                  {moviesData
                    .filter(m => m.category === 'Indian')
                    .slice(0, 12)
                    .map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={(m) => navigate(`movie/${m.id}`)}
                        onPlayTrailer={setActiveVideo}
                        isBookmarked={bookmarks.some(b => b.id === movie.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                </div>
              </section>

              {/* Hollywood Studio Hits */}
              <section className="feed-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <Clapperboard size={22} className="text-red" />
                    <h2>Hollywood Studio Blockbusters</h2>
                  </div>
                  <button className="view-all-link" onClick={() => navigate('hollywood')}>
                    <span>View All Hollywood</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid-movies">
                  {moviesData
                    .filter(m => m.category === 'Hollywood')
                    .slice(0, 12)
                    .map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={(m) => navigate(`movie/${m.id}`)}
                        onPlayTrailer={setActiveVideo}
                        isBookmarked={bookmarks.some(b => b.id === movie.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                </div>
              </section>

              {/* International & Anime Showcase */}
              <section className="feed-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <Sparkles size={22} className="text-cyan" />
                    <h2>International Cinema, Anime & World Movies</h2>
                  </div>
                  <button className="view-all-link" onClick={() => navigate('international')}>
                    <span>View All International</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid-movies">
                  {moviesData
                    .filter(m => m.category === 'International')
                    .slice(0, 12)
                    .map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={(m) => navigate(`movie/${m.id}`)}
                        onPlayTrailer={setActiveVideo}
                        isBookmarked={bookmarks.some(b => b.id === movie.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                </div>
              </section>

              {/* Web Series & Television Showcase */}
              <section className="feed-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <Tv size={22} className="text-cyan" />
                    <h2>Binge-Worthy Web Series & Television</h2>
                  </div>
                  <button className="view-all-link" onClick={() => navigate('series-hub')}>
                    <span>Explore Series Hub</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid-movies">
                  {seriesData.slice(0, 12).map((show) => (
                    <MovieCard
                      key={show.id}
                      movie={show}
                      onSelect={(s) => navigate(`series/${s.id}`)}
                      onPlayTrailer={setActiveVideo}
                      isBookmarked={bookmarks.some(b => b.id === show.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* INDIAN / HOLLYWOOD / INTERNATIONAL / OTT CATALOG */}
        {(route.type === 'indian' || route.type === 'hollywood' || route.type === 'international' || route.type === 'ott') && (
          <div className="tab-view animate-fade-in container">
            <div className="catalog-header-banner glass-panel">
              <div className={`badge ${route.type === 'hollywood' ? 'badge-red' : route.type === 'international' ? 'badge-cyan' : route.type === 'ott' ? 'badge-cyan' : 'badge-gold'}`}>
                {route.type === 'indian' ? 'INDIAN CINEMA ARCHIVE' : route.type === 'hollywood' ? 'HOLLYWOOD PORTAL' : route.type === 'ott' ? 'OTT & ONLINE STREAMING' : 'INTERNATIONAL CINEMA PORTAL'}
              </div>
              <h2 className="catalog-main-title">
                {route.type === 'indian' 
                  ? 'Bollywood, Tollywood, Kollywood & Mollywood' 
                  : route.type === 'hollywood' 
                  ? 'Hollywood Studio Blockbusters & Classics'
                  : route.type === 'ott'
                  ? 'Movies Streaming on OTT Platforms'
                  : 'World Cinema, Japanese Anime, K-Dramas & European Cinema'}
              </h2>
              <p className="catalog-subtitle">
                {route.type === 'ott'
                  ? `Browse verified streaming providers, ratings, and direct watch links for ${filteredMovies.length} movies available on OTT.`
                  : `Showing verified ratings, reviews, streaming providers and ticket bookings for ${filteredMovies.length} titles.`}
              </p>
            </div>

            {/* Filter Bar */}
            <div className="catalog-filters-bar glass-panel">
              {route.type === 'ott' && allPlatforms.length > 1 && (
                <div className="filter-item">
                  <label>Streaming Platform</label>
                  <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)}>
                    {allPlatforms.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              )}

              <div className="filter-item">
                <label>Genre</label>
                <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
                  {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="filter-item">
                <label>Language</label>
                <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
                  {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="filter-item">
                <label>Release Year</label>
                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                  {allYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="filter-item">
                <label>Sort By</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="latest-high">Latest & Highest Rated (Default)</option>
                  <option value="newest">Newest to Oldest (Release Year)</option>
                  <option value="oldest">Oldest to Newest (Earliest Releases)</option>
                  <option value="rating-high">Highest Rated to Lowest</option>
                  <option value="rating-low">Lowest Rated to Highest</option>
                  <option value="title-asc">Title (A to Z)</option>
                  <option value="title-desc">Title (Z to A)</option>
                </select>
              </div>
            </div>

            <div className="grid-movies">
              {filteredMovies.slice(0, visibleCount).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={(m) => navigate(`movie/${m.id}`)}
                  onPlayTrailer={setActiveVideo}
                  isBookmarked={bookmarks.some(b => b.id === movie.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>

            {visibleCount < filteredMovies.length && (
              <div className="load-more-wrap">
                <button 
                  className="btn btn-secondary load-more-btn"
                  onClick={() => setVisibleCount(prev => prev + 24)}
                >
                  <span>Load More Movies ({filteredMovies.length - visibleCount} remaining)</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* SERIES HUB */}
        {(route.type === 'series-hub' || (route.type === 'series' && !route.id)) && (
          <div className="tab-view animate-fade-in container">
            <SeriesHub
              series={seriesData}
              onSelectSeries={(s) => navigate(s.filename ? s.filename.replace(/\.html$/, '') : `series/${s.id}`)}
              onNavigate={navigate}
              onPlayTrailer={setActiveVideo}
              bookmarkedIds={bookmarks.map(b => b.id)}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
            />
          </div>
        )}

        {/* RELEASE CALENDARS */}
        {route.type === 'releases' && (
          <div className="tab-view animate-fade-in container">
            <ReleaseCalendarView
              releases={releasesData}
              onSelectMovie={(m) => navigate(`movie/${m.id || m.title}`)}
              onPlayTrailer={setActiveVideo}
              onNavigate={navigate}
            />
          </div>
        )}

        {/* CRITIC REVIEWS & REMARKS GUIDE */}
        {(route.type === 'reviews' || route.type === 'remarks') && (
          <div className="tab-view animate-fade-in container">
            <CriticReviewsHub
              reviews={reviewsData}
              onNavigate={navigate}
            />
          </div>
        )}

        {/* SPORTS HUB */}
        {(route.type === 'sports-hub' || route.type === 'sports') && (
          <div className="tab-view animate-fade-in container">
            <SportsHub
              sports={sportsData}
              onNavigate={navigate}
            />
          </div>
        )}

        {/* GAMES & BOOKS */}
        {(route.type === 'games-books' || route.type === 'game' || route.type === 'book' || route.type === 'games' || route.type === 'books') && (
          <div className="tab-view animate-fade-in container">
            <GamesAndBooksHub
              games={gamesData}
              books={booksData}
              onNavigate={navigate}
              initialTab={route.subTab || (route.type === 'book' || route.type === 'books' ? 'books' : 'games')}
            />
          </div>
        )}

        {/* MUSIC HUB */}
        {route.type === 'music' && (
          <div className="tab-view animate-fade-in container">
            <MusicHub
              musicData={musicData}
              onPlayTrack={(ytId, title) => setActiveVideo(ytId)}
            />
          </div>
        )}

        {/* TRAILERS & VIDEO VAULT */}
        {route.type === 'trailers' && (
          <div className="tab-view animate-fade-in container">
            <TrailersHub
              trailersData={trailersData}
              onPlayVideo={(ytId, title) => setActiveVideo(ytId)}
              onSelectMovie={(mId) => navigate(`movie/${mId}`)}
            />
          </div>
        )}

        {/* EVENTS & GALAS HUB */}
        {route.type === 'events' && (
          <div className="tab-view animate-fade-in container">
            <EventsHub
              eventsData={eventsData}
              onPlayTrailer={(ytId, title) => setActiveVideo(ytId)}
            />
          </div>
        )}

        {/* NEWS HUB */}
        {route.type === 'news' && (
          <div className="tab-view animate-fade-in container">
            <NewsHub news={newsData} onNavigate={navigate} />
          </div>
        )}

        {/* BLOG HUB */}
        {route.type === 'blog' && (
          <div className="tab-view animate-fade-in container">
            <BlogHub blogsData={blogsData} onNavigate={navigate} />
          </div>
        )}

        {/* GALLERIES & STILLS HUB */}
        {(route.type === 'galleries' || route.type === 'gallery') && (
          <div className="tab-view animate-fade-in container">
            <GalleriesHub
              galleriesData={galleriesData}
              initialGalleryId={route.id}
              onNavigate={navigate}
              onSelectMovie={(slug) => navigate(`movie/${slug}`)}
            />
          </div>
        )}

        {/* PUBLIC EMERGENCIES & DISASTER RELIEF HUB */}
        {(route.type === 'emergencies' || route.type === 'emergency') && (
          <div className="tab-view animate-fade-in container">
            <EmergencyHub
              onNavigate={navigate}
              onSelectEmergency={(e) => navigate(`emergency/${e.id || e.slug}`)}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectCategory={navigate} />

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchIndex={searchIndexData}
        onSelectItem={handleSelectItem}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={removeBookmark}
        onClearAll={clearAllBookmarks}
        onSelectMovie={(m) => {
          setBookmarksDrawerOpen(false);
          navigate(`movie/${m.id}`);
        }}
      />
    </div>
  );
}
