import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroSpotlight from '../components/HeroSpotlight';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import VideoPlayerModal from '../components/VideoPlayerModal';
import SearchModal from '../components/SearchModal';
import ReleaseCalendarView from '../components/ReleaseCalendarView';
import CriticReviewsHub from '../components/CriticReviewsHub';
import SeriesHub from '../components/SeriesHub';
import SportsHub from '../components/SportsHub';
import GamesAndBooksHub from '../components/GamesAndBooksHub';
import NewsHub from '../components/NewsHub';
import BookmarksDrawer from '../components/BookmarksDrawer';
import Footer from '../components/Footer';

// Data imports
import moviesData from '../../data/movies.json';
import seriesData from '../../data/series.json';
import releasesData from '../../data/releases.json';
import reviewsData from '../../data/reviews.json';
import gamesData from '../../data/games.json';
import booksData from '../../data/books.json';
import sportsData from '../../data/sports.json';
import newsData from '../../data/news.json';
import searchIndexData from '../../data/search_index.json';

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
  ChevronDown
} from 'lucide-react';

export default function AppV2Modal({ onSwitchVersion }) {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);

  // Filter States for movies
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'newest', 'title'
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

  useEffect(() => {
    try {
      localStorage.setItem('oakshow_watchlist', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === item.id);
      if (exists) {
        return prev.filter(b => b.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  // Extract unique genres, languages, and years for filter dropdowns
  const { genres, languages, years } = useMemo(() => {
    const gSet = new Set();
    const lSet = new Set();
    const ySet = new Set();

    moviesData.forEach(m => {
      if (m.genre) {
        m.genre.split(/[,/|]/).forEach(g => {
          const clean = g.trim();
          if (clean && clean.length < 25) gSet.add(clean);
        });
      }
      if (m.language) {
        m.language.split(/[,/|]/).forEach(l => {
          const clean = l.trim();
          if (clean && clean.length < 20) lSet.add(clean);
        });
      }
      if (m.year && !isNaN(parseInt(m.year))) {
        ySet.add(parseInt(m.year));
      }
    });

    return {
      genres: ['All', ...Array.from(gSet).sort()],
      languages: ['All', ...Array.from(lSet).sort()],
      years: ['All', ...Array.from(ySet).sort((a, b) => b - a)]
    };
  }, []);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let result = [...moviesData];

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter(m => m.genre && m.genre.toLowerCase().includes(selectedGenre.toLowerCase()));
    }

    // Filter by language
    if (selectedLanguage !== 'All') {
      result = result.filter(m => m.language && m.language.toLowerCase().includes(selectedLanguage.toLowerCase()));
    }

    // Filter by year
    if (selectedYear !== 'All') {
      result = result.filter(m => m.year && parseInt(m.year) === selectedYear);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        const rA = a.oakshowRating || a.imdbRating || 0;
        const rB = b.oakshowRating || b.imdbRating || 0;
        return rB - rA;
      }
      if (sortBy === 'newest') {
        return (b.year || 0) - (a.year || 0);
      }
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    return result;
  }, [selectedGenre, selectedLanguage, selectedYear, sortBy]);

  const displayedMovies = useMemo(() => {
    return filteredMovies.slice(0, visibleCount);
  }, [filteredMovies, visibleCount]);

  // Spotlight movie (highest rated or curated)
  const spotlightMovie = useMemo(() => {
    return moviesData.find(m => m.id === 'Dangal' || m.id === '2point0' || m.id === 'BaahubaliTheConclusion') || moviesData[0];
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePlayTrailer = (trailerUrl, title) => {
    setActiveVideo({ url: trailerUrl, title: title || 'Trailer' });
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        totalMoviesCount={moviesData.length}
      />

      {/* Main Tab Views */}
      <main className="main-content">
        {activeTab === 'discover' && (
          <div className="tab-pane active fade-in">
            {/* Hero Banner Spotlight */}
            <HeroSpotlight 
              movie={spotlightMovie} 
              onDetailsClick={handleMovieClick}
              onPlayTrailer={handlePlayTrailer}
              isBookmarked={isBookmarked(spotlightMovie?.id)}
              onToggleBookmark={toggleBookmark}
            />

            {/* Quick Stats / Highlights Bar */}
            <div className="section-container stats-overview-bar">
              <div className="stat-pill">
                <Clapperboard className="stat-icon text-gold" size={20} />
                <div>
                  <span className="stat-value">{moviesData.length}+</span>
                  <span className="stat-label">Full Movies</span>
                </div>
              </div>
              <div className="stat-pill">
                <Star className="stat-icon text-red" size={20} />
                <div>
                  <span className="stat-value">{reviewsData.length}+</span>
                  <span className="stat-label">Critic Reviews</span>
                </div>
              </div>
              <div className="stat-pill">
                <Calendar className="stat-icon text-cyan" size={20} />
                <div>
                  <span className="stat-value">2015 - 2026</span>
                  <span className="stat-label">Release Archives</span>
                </div>
              </div>
              <div className="stat-pill">
                <Layers className="stat-icon text-purple" size={20} />
                <div>
                  <span className="stat-value">{seriesData.length + gamesData.length + booksData.length}+</span>
                  <span className="stat-label">Series, Games & Books</span>
                </div>
              </div>
            </div>

            {/* Filter and Control Bar */}
            <section className="section-container">
              <div className="section-header-row">
                <div className="section-title-group">
                  <h2 className="section-title">
                    <Sparkles className="title-icon text-gold" size={24} />
                    Explore Entertainment Catalog
                  </h2>
                  <p className="section-subtitle">
                    Showing {filteredMovies.length} curated releases with aggregated ratings and verified reviews
                  </p>
                </div>

                <div className="sort-control">
                  <span className="sort-label">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="custom-select sort-select"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="newest">Latest Release</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Filter Chips Bar */}
              <div className="filters-bar-wrapper">
                <div className="filter-group">
                  <label className="filter-label">Genre</label>
                  <select 
                    value={selectedGenre} 
                    onChange={(e) => { setSelectedGenre(e.target.value); setVisibleCount(24); }}
                    className="custom-select"
                  >
                    {genres.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Language</label>
                  <select 
                    value={selectedLanguage} 
                    onChange={(e) => { setSelectedLanguage(e.target.value); setVisibleCount(24); }}
                    className="custom-select"
                  >
                    {languages.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Year</label>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => { setSelectedYear(e.target.value === 'All' ? 'All' : parseInt(e.target.value)); setVisibleCount(24); }}
                    className="custom-select"
                  >
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {(selectedGenre !== 'All' || selectedLanguage !== 'All' || selectedYear !== 'All') && (
                  <button 
                    className="btn btn-secondary btn-sm reset-filters-btn"
                    onClick={() => {
                      setSelectedGenre('All');
                      setSelectedLanguage('All');
                      setSelectedYear('All');
                      setVisibleCount(24);
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Movies Grid */}
              {displayedMovies.length > 0 ? (
                <div className="movies-grid">
                  {displayedMovies.map(movie => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      onClick={() => handleMovieClick(movie)}
                      onPlayTrailer={(trailerUrl) => handlePlayTrailer(trailerUrl, movie.title)}
                      isBookmarked={isBookmarked(movie.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state-box">
                  <Filter size={48} className="text-dim mb-3" />
                  <h3>No titles match your active filters</h3>
                  <p>Try resetting filters or adjusting criteria to see more titles.</p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => {
                      setSelectedGenre('All');
                      setSelectedLanguage('All');
                      setSelectedYear('All');
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Load More Button */}
              {visibleCount < filteredMovies.length && (
                <div className="load-more-container text-center mt-5 mb-5">
                  <button 
                    className="btn btn-secondary btn-lg load-more-btn"
                    onClick={() => setVisibleCount(prev => prev + 24)}
                  >
                    <span>Load More Releases</span>
                    <ChevronDown size={18} className="ms-2" />
                  </button>
                  <p className="text-dim text-sm mt-2">
                    Displaying {displayedMovies.length} of {filteredMovies.length} titles
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Releases Calendar Archive Tab */}
        {activeTab === 'releases' && (
          <div className="tab-pane active fade-in">
            <ReleaseCalendarView 
              releasesData={releasesData} 
              onSelectMovie={(movieOrTitle) => {
                let found = null;
                if (typeof movieOrTitle === 'string') {
                  found = moviesData.find(m => m.title?.toLowerCase() === movieOrTitle.toLowerCase() || m.id?.toLowerCase() === movieOrTitle.toLowerCase());
                } else if (movieOrTitle && movieOrTitle.id) {
                  found = moviesData.find(m => m.id === movieOrTitle.id) || movieOrTitle;
                }
                if (found) setSelectedMovie(found);
              }} 
            />
          </div>
        )}

        {/* Critic Reviews Hub Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-pane active fade-in">
            <CriticReviewsHub 
              reviewsData={reviewsData} 
              moviesData={moviesData}
              onSelectMovie={handleMovieClick}
            />
          </div>
        )}

        {/* TV Series Hub Tab */}
        {activeTab === 'series' && (
          <div className="tab-pane active fade-in">
            <SeriesHub 
              seriesData={seriesData} 
              onPlayTrailer={handlePlayTrailer}
              onSelectSeries={(series) => setSelectedMovie(series)}
            />
          </div>
        )}

        {/* Sports Events Hub Tab */}
        {activeTab === 'sports' && (
          <div className="tab-pane active fade-in">
            <SportsHub 
              sportsData={sportsData} 
              onPlayTrailer={handlePlayTrailer}
            />
          </div>
        )}

        {/* Video Games & Books Tab */}
        {activeTab === 'games_books' && (
          <div className="tab-pane active fade-in">
            <GamesAndBooksHub 
              gamesData={gamesData} 
              booksData={booksData} 
              onPlayTrailer={handlePlayTrailer}
            />
          </div>
        )}

        {/* News & Editorial Tab */}
        {activeTab === 'news' && (
          <div className="tab-pane active fade-in">
            <NewsHub 
              newsData={newsData} 
            />
          </div>
        )}
      </main>

      {/* Global Interactive Modals */}
      <MovieDetailModal 
        movie={selectedMovie} 
        isOpen={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        onPlayTrailer={handlePlayTrailer}
        isBookmarked={selectedMovie ? isBookmarked(selectedMovie.id) : false}
        onToggleBookmark={toggleBookmark}
        onSelectRelatedMovie={(m) => setSelectedMovie(m)}
      />

      <VideoPlayerModal 
        video={activeVideo} 
        isOpen={!!activeVideo} 
        onClose={() => setActiveVideo(null)} 
      />

      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)}
        searchIndex={searchIndexData}
        moviesData={moviesData}
        onSelectResult={(item) => {
          setSearchOpen(false);
          if (item.type === 'movie' || !item.type) {
            const m = moviesData.find(x => x.id === item.id) || item;
            setSelectedMovie(m);
          } else if (item.type === 'series') {
            const s = seriesData.find(x => x.id === item.id) || item;
            setSelectedMovie(s);
          } else if (item.type === 'game') {
            setActiveTab('games_books');
          } else if (item.type === 'review') {
            setActiveTab('reviews');
          }
        }}
      />

      <BookmarksDrawer 
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={toggleBookmark}
        onSelectMovie={(movie) => {
          setBookmarksDrawerOpen(false);
          setSelectedMovie(movie);
        }}
      />

      {/* Global Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
