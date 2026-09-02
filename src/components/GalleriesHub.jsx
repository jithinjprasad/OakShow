import React, { useState, useEffect, useMemo } from 'react';
import { 
  Image, 
  Sparkles, 
  Film, 
  ArrowRight, 
  ArrowLeft,
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Search, 
  SlidersHorizontal,
  Layers,
  Grid,
  Play,
  Maximize2
} from 'lucide-react';

export default function GalleriesHub({ galleriesData = [], initialGalleryId = null, onNavigate, onSelectMovie }) {
  // If an initial gallery ID is passed or selected, we show that gallery's IMDb-style view.
  // When null, we show the Letterboxd-style Galleries Index page.
  const [selectedGalleryId, setSelectedGalleryId] = useState(initialGalleryId || null);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [photoTagFilter, setPhotoTagFilter] = useState('All');

  // Sync if initialGalleryId changes
  useEffect(() => {
    if (initialGalleryId) {
      setSelectedGalleryId(initialGalleryId);
    }
  }, [initialGalleryId]);

  const categories = [
    { id: 'All', label: 'All Collections' },
    { id: 'Posters & Wallpapers', label: 'Posters & Wallpapers' },
    { id: 'Stills & Photoshoots', label: 'Stills & Photoshoots' },
    { id: 'Character Posters', label: 'Character Posters' }
  ];

  // Filtered and sorted galleries list for index page
  const filteredGalleries = useMemo(() => {
    let list = galleriesData.filter((g) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        g.title?.toLowerCase().includes(q) ||
        g.movieTitle?.toLowerCase().includes(q) ||
        g.movieSlug?.toLowerCase().includes(q) ||
        g.description?.toLowerCase().includes(q);

      if (!matchSearch) return false;

      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Posters & Wallpapers') {
        return g.title?.toLowerCase().includes('poster') || g.title?.toLowerCase().includes('wallpaper') || g.category?.toLowerCase().includes('wallpaper');
      }
      if (selectedCategory === 'Stills & Photoshoots') {
        return g.title?.toLowerCase().includes('still') || g.title?.toLowerCase().includes('photo') || g.category?.toLowerCase().includes('still');
      }
      if (selectedCategory === 'Character Posters') {
        return g.title?.toLowerCase().includes('character') || g.title?.toLowerCase().includes('cast');
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'count-high') {
        return (b.images?.length || 0) - (a.images?.length || 0);
      }
      if (sortBy === 'oldest') {
        return (a.id || '').localeCompare(b.id || '');
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return (b.id || '').localeCompare(a.id || '');
    });

    return list;
  }, [galleriesData, searchQuery, selectedCategory, sortBy]);

  // Current active gallery when viewing a single gallery
  const activeGallery = useMemo(() => {
    if (!selectedGalleryId) return null;
    return galleriesData.find(g => g.id === selectedGalleryId) || null;
  }, [galleriesData, selectedGalleryId]);

  // Filtered photos inside the active gallery (IMDb style)
  const activeGalleryPhotos = useMemo(() => {
    if (!activeGallery || !Array.isArray(activeGallery.images)) return [];
    if (photoTagFilter === 'All') return activeGallery.images;
    if (photoTagFilter === 'Posters') {
      return activeGallery.images.filter(img => (img.alt || '').toLowerCase().includes('poster') || (img.src || '').toLowerCase().includes('poster'));
    }
    if (photoTagFilter === 'Stills') {
      return activeGallery.images.filter(img => (img.alt || '').toLowerCase().includes('still') || (img.src || '').toLowerCase().includes('still') || (img.src || '').toLowerCase().includes('photo'));
    }
    return activeGallery.images;
  }, [activeGallery, photoTagFilter]);

  const openLightbox = (gallery, index) => {
    setLightboxIndex(index);
    setActiveLightboxImg(gallery.images[index]);
  };

  const nextLightbox = () => {
    if (!activeGallery || !activeGallery.images?.length) return;
    const nextIdx = (lightboxIndex + 1) % activeGallery.images.length;
    setLightboxIndex(nextIdx);
    setActiveLightboxImg(activeGallery.images[nextIdx]);
  };

  const prevLightbox = () => {
    if (!activeGallery || !activeGallery.images?.length) return;
    const prevIdx = (lightboxIndex - 1 + activeGallery.images.length) % activeGallery.images.length;
    setLightboxIndex(prevIdx);
    setActiveLightboxImg(activeGallery.images[prevIdx]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightboxImg) return;
      if (e.key === 'ArrowRight') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      } else if (e.key === 'Escape') {
        setActiveLightboxImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImg, lightboxIndex, activeGallery]);

  // Total photos count across all galleries
  const totalPhotosCount = useMemo(() => {
    return galleriesData.reduce((acc, g) => acc + (g.images?.length || g.imagesCount || 0), 0);
  }, [galleriesData]);

  // Trending & Character slices for Letterboxd-style curated rows
  const trendingGalleries = useMemo(() => {
    return galleriesData.slice(0, 8);
  }, [galleriesData]);

  const characterGalleries = useMemo(() => {
    const filtered = galleriesData.filter(g => 
      g.title?.toLowerCase().includes('character') || 
      g.title?.toLowerCase().includes('cast') || 
      g.category?.toLowerCase().includes('character') ||
      g.title?.toLowerCase().includes('stills')
    );
    return filtered.length > 0 ? filtered : galleriesData.slice(3, 10);
  }, [galleriesData]);

  const handleOpenGallery = (gallery) => {
    if (onNavigate) {
      const targetRoute = gallery.filename ? gallery.filename.replace(/\.html$/i, '') : `gallery/${gallery.id}`;
      onNavigate(targetRoute);
    } else {
      setSelectedGalleryId(gallery.id);
    }
  };

  const handleBackToAll = () => {
    if (onNavigate) {
      onNavigate('galleries');
    }
    setSelectedGalleryId(null);
  };

  // =========================================================================
  // VIEW 1: INDIVIDUAL GALLERY PAGE (IMDb Photo Gallery Experience)
  // =========================================================================
  if (activeGallery) {
    return (
      <div className="imdb-gallery-view animate-fade-in">
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="gallery-breadcrumb-bar">
          <button className="gallery-back-nav-btn" onClick={handleBackToAll}>
            <ArrowLeft size={16} />
            <span>All Photo Galleries</span>
          </button>
          <div className="gallery-breadcrumbs-trail">
            <span className="crumb-dim" onClick={() => onNavigate && onNavigate('discover')}>Home</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-dim" onClick={handleBackToAll}>Galleries</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{activeGallery.title}</span>
          </div>
        </div>

        {/* IMDb-Style Gallery Header */}
        <div className="imdb-gallery-header glass-panel">
          <div className="imdb-gh-main">
            <div className="imdb-gh-badges">
              <span className="badge badge-cyan">{activeGallery.category || 'Official Photo Gallery'}</span>
              <span className="imdb-photo-count-pill">
                <Image size={13} />
                <span>{activeGallery.images?.length || activeGallery.imagesCount || 0} Photos</span>
              </span>
            </div>

            <h1 className="imdb-gh-title">{activeGallery.title}</h1>
            {activeGallery.description && (
              <p className="imdb-gh-desc">{activeGallery.description}</p>
            )}

            <div className="imdb-gh-meta-strip">
              <span>Published: <strong>{activeGallery.date || 'OakShow Vault'}</strong></span>
              {activeGallery.movieSlug && onNavigate && (
                <>
                  <span>•</span>
                  <button 
                    className="imdb-movie-link-btn"
                    onClick={() => onNavigate(`movie/${activeGallery.movieSlug}`)}
                  >
                    <Film size={14} />
                    <span>View Movie Details ({activeGallery.movieTitle || activeGallery.movieSlug})</span>
                    <ArrowRight size={13} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="imdb-gh-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => openLightbox(activeGallery, 0)}
            >
              <Play size={14} fill="#ffffff" />
              <span>Start Slideshow</span>
            </button>
          </div>
        </div>

        {/* IMDb-Style Photo Filter Tabs */}
        <div className="imdb-photo-filters-bar">
          <div className="imdb-filter-chips">
            <button 
              className={`imdb-chip ${photoTagFilter === 'All' ? 'active' : ''}`}
              onClick={() => setPhotoTagFilter('All')}
            >
              All Photos ({activeGallery.images?.length || 0})
            </button>
            <button 
              className={`imdb-chip ${photoTagFilter === 'Posters' ? 'active' : ''}`}
              onClick={() => setPhotoTagFilter('Posters')}
            >
              Posters & Wallpapers
            </button>
            <button 
              className={`imdb-chip ${photoTagFilter === 'Stills' ? 'active' : ''}`}
              onClick={() => setPhotoTagFilter('Stills')}
            >
              Production Stills
            </button>
          </div>

          <span className="imdb-showing-text">
            Showing <strong>{activeGalleryPhotos.length}</strong> high-resolution photos
          </span>
        </div>

        {/* IMDb-Style Photo Gallery Grid */}
        <div className="imdb-photos-grid">
          {activeGalleryPhotos.map((img, idx) => {
            const src = img.src?.startsWith('/') ? img.src : `/${img.src}`;
            return (
              <div 
                key={idx} 
                className="imdb-photo-card glass-card clickable"
                onClick={() => openLightbox(activeGallery, idx)}
                title="Click to view full screen"
              >
                <div className="imdb-photo-wrap">
                  <img 
                    src={src} 
                    alt={img.alt || `${activeGallery.title} Photo #${idx + 1}`} 
                    className="imdb-photo-img" 
                    loading="lazy"
                    onError={(e) => { e.target.src = '/favicon.png'; }}
                  />
                  <div className="imdb-photo-overlay">
                    <Eye size={26} className="text-white" />
                    <span className="imdb-expand-prompt">View High-Res</span>
                  </div>
                  <span className="imdb-photo-index">#{idx + 1}</span>
                  <span className="imdb-hd-badge">HD 1080p</span>
                </div>
                {img.alt && (
                  <div className="imdb-photo-caption">
                    <span>{img.alt}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* IMDb-Style Fullscreen Lightbox with Bottom Filmstrip */}
        {activeLightboxImg && (
          <div className="lightbox-backdrop animate-fade-in" onClick={() => setActiveLightboxImg(null)}>
            <div className="lightbox-content imdb-lightbox-content" onClick={e => e.stopPropagation()}>
              {/* Top Header Bar */}
              <div className="imdb-lb-top-bar">
                <div className="imdb-lb-title-group">
                  <h3>{activeGallery.title}</h3>
                  <span className="imdb-lb-counter">Photo {lightboxIndex + 1} of {activeGallery.images.length}</span>
                </div>
                <button className="lightbox-close-btn" onClick={() => setActiveLightboxImg(null)} aria-label="Close Lightbox">
                  <X size={22} />
                </button>
              </div>

              {/* Main Photo Area with Navigation */}
              <div className="lightbox-main-view">
                <button className="lightbox-nav-btn prev-btn" onClick={prevLightbox} aria-label="Previous image">
                  <ChevronLeft size={30} />
                </button>

                <div className="lightbox-img-wrap">
                  <img 
                    src={activeLightboxImg.src?.startsWith('/') ? activeLightboxImg.src : `/${activeLightboxImg.src}`} 
                    alt={activeLightboxImg.alt || activeGallery.title} 
                    className="lightbox-full-img"
                  />
                </div>

                <button className="lightbox-nav-btn next-btn" onClick={nextLightbox} aria-label="Next image">
                  <ChevronRight size={30} />
                </button>
              </div>

              {/* Bottom Interactive Filmstrip (IMDb Signature) */}
              <div className="imdb-lb-filmstrip">
                {activeGallery.images.map((img, fIdx) => {
                  const fSrc = img.src?.startsWith('/') ? img.src : `/${img.src}`;
                  const isCurrent = fIdx === lightboxIndex;
                  return (
                    <div 
                      key={fIdx} 
                      className={`imdb-lb-thumb-card ${isCurrent ? 'active' : ''}`}
                      onClick={() => {
                        setLightboxIndex(fIdx);
                        setActiveLightboxImg(activeGallery.images[fIdx]);
                      }}
                    >
                      <img src={fSrc} alt={`Thumb ${fIdx + 1}`} onError={(e) => { e.target.src = '/favicon.png'; }} />
                    </div>
                  );
                })}
              </div>

              {/* Footer Actions Bar */}
              <div className="lightbox-footer-bar">
                <div className="lightbox-caption">
                  <span>{activeLightboxImg.alt || `${activeGallery.title} - Official Still`}</span>
                </div>
                <div className="lightbox-actions">
                  <a 
                    href={activeLightboxImg.src?.startsWith('/') ? activeLightboxImg.src : `/${activeLightboxImg.src}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    download
                  >
                    <Download size={14} />
                    <span>Download Original</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: GALLERIES INDEX PAGE (Letterboxd Lists & Curated Collections Style)
  // =========================================================================
  return (
    <div className="letterboxd-galleries-index animate-fade-in">
      {/* Letterboxd-Style Hero Banner */}
      <div className="lb-galleries-hero glass-panel">
        <div className="badge badge-cyan">
          <Image size={14} />
          <span>CURATED PHOTO VAULT • {totalPhotosCount}+ HD IMAGES</span>
        </div>
        <h1 className="lb-hero-title">Movie Galleries, Posters & Stills</h1>
        <p className="lb-hero-subtext">
          Explore curated collections of official high-resolution movie wallpapers, photoshoot stills, character posters, and production archives.
        </p>

        {/* Search & Category Filter Controls */}
        <div className="lb-controls-bar">
          <div className="lb-search-box">
            <Search size={18} className="text-muted" />
            <input 
              type="text"
              placeholder="Search galleries by movie title or actor (e.g. 2.0, Justice League, Kajal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lb-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="lb-category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`lb-cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="lb-sort-wrap">
            <SlidersHorizontal size={15} className="text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="lb-sort-dropdown"
            >
              <option value="latest">Latest Collections (Default)</option>
              <option value="count-high">Most Photos First</option>
              <option value="title-asc">Title (A to Z)</option>
              <option value="oldest">Oldest Collections</option>
            </select>
          </div>
        </div>
      </div>

      {/* Letterboxd Curated Row 1: Trending Photo Collections & Official Wallpapers */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="lb-feed-section">
          <div className="section-header">
            <div className="section-title-group">
              <Sparkles size={20} className="text-gold" />
              <h2>Trending Photo Collections & Wallpapers</h2>
            </div>
            <span className="section-badge">{trendingGalleries.length} Curated Decks</span>
          </div>

          <div className="lb-horizontal-strip">
            {trendingGalleries.map((gallery) => (
              <LetterboxdDeckCard 
                key={gallery.id} 
                gallery={gallery} 
                onOpen={() => handleOpenGallery(gallery)} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Letterboxd Curated Row 2: Character Posters & Exclusive Stills */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="lb-feed-section">
          <div className="section-header">
            <div className="section-title-group">
              <Film size={20} className="text-cyan" />
              <h2>Character Posters & Exclusive Stills</h2>
            </div>
            <span className="section-badge">{characterGalleries.length} Featured Sets</span>
          </div>

          <div className="lb-horizontal-strip">
            {characterGalleries.map((gallery) => (
              <LetterboxdDeckCard 
                key={gallery.id} 
                gallery={gallery} 
                onOpen={() => handleOpenGallery(gallery)} 
              />
            ))}
          </div>
        </section>
      )}

      {/* All Galleries Grid (Letterboxd Style Grid of Collections) */}
      <section className="lb-all-galleries-section mt-4">
        <div className="section-header">
          <div className="section-title-group">
            <Layers size={20} className="text-cyan" />
            <h2 className="section-title">All Photo Vault Collections ({filteredGalleries.length})</h2>
          </div>
        </div>

        <div className="lb-collections-grid">
          {filteredGalleries.map((gallery) => (
            <LetterboxdDeckCard 
              key={gallery.id} 
              gallery={gallery} 
              onOpen={() => handleOpenGallery(gallery)} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// Letterboxd Deck Card Component (Featuring 3-layered stacked preview)
function LetterboxdDeckCard({ gallery, onOpen }) {
  const images = gallery.images || [];
  const img1 = images[0]?.src ? (images[0].src.startsWith('/') ? images[0].src : `/${images[0].src}`) : (gallery.coverImage || '/favicon.png');
  const img2 = images[1]?.src ? (images[1].src.startsWith('/') ? images[1].src : `/${images[1].src}`) : img1;
  const img3 = images[2]?.src ? (images[2].src.startsWith('/') ? images[2].src : `/${images[2].src}`) : img1;

  const count = gallery.imagesCount || images.length || 0;

  return (
    <div className="lb-deck-card glass-card clickable" onClick={onOpen}>
      {/* 3-Layered Stacked Poster Effect */}
      <div className="lb-deck-stack">
        <div className="lb-stack-layer layer-3">
          <img src={img3} alt="" onError={(e) => { e.target.src = '/favicon.png'; }} />
        </div>
        <div className="lb-stack-layer layer-2">
          <img src={img2} alt="" onError={(e) => { e.target.src = '/favicon.png'; }} />
        </div>
        <div className="lb-stack-layer layer-1">
          <img src={img1} alt={gallery.title} onError={(e) => { e.target.src = '/favicon.png'; }} />
          <div className="lb-deck-count-pill">
            <Image size={11} />
            <span>{count} Photos</span>
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="lb-deck-info">
        <span className="lb-deck-category">{gallery.category || 'Movie Gallery'}</span>
        <h4 className="lb-deck-title" title={gallery.title}>{gallery.title}</h4>
        <div className="lb-deck-meta">
          <span>{gallery.date || 'OakShow Archive'}</span>
          <span className="lb-deck-action">View Gallery ↗</span>
        </div>
      </div>
    </div>
  );
}
