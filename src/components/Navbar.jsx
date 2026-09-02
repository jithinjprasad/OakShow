import React, { useState, useEffect, useRef } from 'react';
import {
  Film,
  Search,
  Calendar,
  Star,
  Tv,
  Trophy,
  Gamepad2,
  Newspaper,
  Bookmark,
  Menu,
  X,
  Clapperboard,
  Globe,
  Sparkles,
  ShieldAlert,
  Music,
  BookOpen,
  Play,
  ShieldCheck,
  ChevronDown,
  Layers,
  Image,
  Sun,
  Moon
} from 'lucide-react';
import CopyrightPolicyModal from './CopyrightPolicyModal';

export default function Navbar({
  activeTab,
  setActiveTab,
  openSearch,
  bookmarkCount,
  onOpenBookmarks,
  totalMoviesCount,
  theme: propTheme,
  onToggleTheme: propToggleTheme
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topDropdownOpen, setTopDropdownOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('oakshow_theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (propTheme) {
      setCurrentTheme(propTheme);
    }
  }, [propTheme]);

  const handleToggleTheme = () => {
    if (propToggleTheme) {
      propToggleTheme();
    } else {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      setCurrentTheme(nextTheme);
      try {
        localStorage.setItem('oakshow_theme', nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        document.documentElement.style.colorScheme = nextTheme;
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Auto-close mobile menu on desktop screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1080) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // All Sections (Specialty & Multi-category Portals)
  const allSectionsList = [
    {
      id: 'releases',
      label: 'Release Matrix',
      icon: Calendar,
      badge: 'Calendar Matrix',
      desc: 'Theatrical releases, premiere dates & monthly calendar matrix (2015–2022+)'
    },
    {
      id: 'reviews',
      label: 'Critic Reviews',
      icon: Star,
      badge: 'Certified Reviews',
      desc: 'OakShow certified critic profiles, review matrix & remark ratings'
    },
    {
      id: 'sports',
      label: 'Sports',
      icon: Trophy,
      badge: 'Tournaments',
      desc: '2018 FIFA World Cup, Kerala Blasters & sports tournament coverage'
    },
    {
      id: 'games-books',
      label: 'Games & Books',
      icon: Gamepad2,
      badge: 'Gaming & Literature',
      desc: 'PlayStation, Xbox, PC game vault & literary book recommendations'
    },
    {
      id: 'news',
      label: 'News & Reports',
      icon: Newspaper,
      badge: 'Editorial',
      desc: 'Cinema news, box office data & verified investigative reports'
    },
    {
      id: 'emergencies',
      label: 'Emergencies',
      icon: ShieldAlert,
      badge: 'Crisis Relief',
      desc: 'Public safety hotlines, Kerala floods & COVID-19 relief archives'
    },
    {
      id: 'international',
      label: 'International Cinema',
      icon: Sparkles,
      badge: 'World Cinema',
      desc: 'Foreign cinema, multilingual releases & global classics'
    },
    {
      id: 'blog',
      label: 'OakShow Blogs',
      icon: BookOpen,
      badge: 'Essays',
      desc: 'Exclusive cinema essays, curated watchlists & editorial features'
    },
    {
      id: 'music',
      label: 'Music & Scores',
      icon: Music,
      badge: 'Audio Scores',
      desc: 'Soundtracks, album launch news & original audio jukebox'
    },
    {
      id: 'trailers',
      label: 'Trailers & Teasers',
      icon: Play,
      badge: 'Video Vault',
      desc: 'High-definition teasers, official promos & first looks'
    },
    {
      id: 'galleries',
      label: 'Galleries & Stills',
      icon: Image,
      badge: 'HD Wallpapers',
      desc: 'Official movie posters, photoshoot stills & high-res wallpapers'
    },
    {
      id: 'events',
      label: 'Events & Galas',
      icon: Sparkles,
      badge: 'Festivals',
      desc: 'Film festivals, audio launches & industry award ceremonies'
    },
    {
      id: 'copyright-policy',
      label: 'Copyright Policies',
      icon: ShieldCheck,
      badge: 'Compliance',
      desc: 'Content rights, DMCA policy & official takedown procedures'
    }
  ];

  // Main Header Nav Items (Clean, uncluttered primary channels)
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Film },
    { id: 'indian', label: 'Indian Cinema', icon: Globe },
    { id: 'hollywood', label: 'Hollywood', icon: Clapperboard },
    { id: 'series', label: 'Series', icon: Tv },
  ];

  const handleSectionSelect = (section) => {
    setTopDropdownOpen(false);
    setMobileMenuOpen(false);

    if (section.id === 'copyright-policy') {
      setPolicyModalOpen(true);
    } else {
      setActiveTab(section.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand */}
          <div className="brand-group" onClick={() => { setActiveTab('discover'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="brand-icon-wrap">
              <img src="/favicon.png" alt="OakShow Logo" className="brand-favicon-logo" />
            </div>
            <div className="brand-text">
              <span className="brand-name">OAK<span className="brand-accent">SHOW</span></span>
              <span className="brand-tagline">Shortlisting Everything</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Controls & Dropdown */}
          <div className="nav-actions">
            {/* ALL SECTIONS DROPDOWN (Right before search bar) */}
            <div className="nav-dropdown-wrapper" ref={dropdownRef}>
              <button
                className={`nav-sections-trigger-btn ${topDropdownOpen ? 'active' : ''}`}
                onClick={() => setTopDropdownOpen(!topDropdownOpen)}
                aria-expanded={topDropdownOpen}
                title="Browse all specialty sections & channels"
              >
                <Layers size={15} className="text-gold" />
                <span>All Sections</span>
                <ChevronDown size={14} className={`chevron-icon ${topDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* ALL SECTIONS MEGA DROPDOWN MENU */}
              {topDropdownOpen && (
                <div className="top-sections-dropdown-menu glass-panel animate-scale-in">
                  <div className="dropdown-menu-header">
                    <div className="dm-title-group">
                      <Layers size={16} className="text-gold" />
                      <div>
                        <h4>OakShow All Sections & Specialty Hubs</h4>
                        <span className="text-muted">Direct access to all channels</span>
                      </div>
                    </div>
                    <span className="dm-count-badge">{allSectionsList.length} Portals</span>
                  </div>

                  <div className="dropdown-sections-grid">
                    {allSectionsList.map((sec) => {
                      const SecIcon = sec.icon;
                      const isEmergency = sec.id === 'emergencies';
                      const isCopyright = sec.id === 'copyright-policy';
                      const isInternational = sec.id === 'international';

                      return (
                        <div
                          key={sec.id}
                          className={`dropdown-section-item ${isEmergency ? 'item-emergency' : isCopyright ? 'item-policy' : isInternational ? 'item-international' : ''}`}
                          onClick={() => handleSectionSelect(sec)}
                        >
                          <div className="ds-icon-wrap">
                            <SecIcon size={18} />
                          </div>
                          <div className="ds-info">
                            <div className="ds-top-row">
                              <span className="ds-title">{sec.label}</span>
                              <span className="ds-badge">{sec.badge}</span>
                            </div>
                            <p className="ds-desc">{sec.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="dropdown-menu-footer">
                    <span>Explore ratings, verified reviews & archives across all entertainment media.</span>
                    <button className="dm-close-btn" onClick={() => setTopDropdownOpen(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Search Button (Full pill on desktop, compact icon on mobile) */}
            <button className="search-trigger-btn" onClick={openSearch} title="Search (Ctrl + K)">
              <Search size={18} className="search-icon" />
              <span className="search-placeholder">Search {totalMoviesCount || '1,200+'} titles...</span>
              <kbd className="search-kbd">⌘K</kbd>
            </button>

            {/* Theme Toggle Button (Desktop only, moved into Hamburger on mobile) */}
            <button
              className="theme-toggle-btn desktop-only-control"
              onClick={handleToggleTheme}
              title={currentTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? (
                <Sun size={18} className="theme-icon text-gold" />
              ) : (
                <Moon size={18} className="theme-icon text-accent" />
              )}
            </button>

            {/* Bookmarks Counter (Desktop only, moved into Hamburger on mobile) */}
            <button
              className="bookmarks-btn desktop-only-control"
              onClick={onOpenBookmarks}
              title="Saved Movies"
            >
              <Bookmark size={18} />
              {bookmarkCount > 0 && <span className="bookmark-badge">{bookmarkCount}</span>}
            </button>

            {/* Mobile Menu Trigger (Hamburger 3 Lines) */}
            <button
              className={`mobile-toggle-btn ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              title="All Sections & Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* IMDb-STYLE MOBILE NAVIGATION DRAWER & FULL-SCREEN OVERLAY */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Dimmed backdrop to close on outside click */}
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Navigation Sheet */}
        <div className="mobile-nav-sheet">
          {/* Top Bar inside Sheet */}
          <div className="mobile-nav-sheet-header">
            <div
              className="brand-group"
              onClick={() => {
                setActiveTab('discover');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="brand-icon-wrap">
                <img src="/favicon.png" alt="OakShow Logo" className="brand-favicon-logo" />
              </div>
              <div className="brand-text">
                <span className="brand-name">OAK<span className="brand-accent">SHOW</span></span>
                <span className="brand-tagline">Shortlisting Everything</span>
              </div>
            </div>

            <button
              className="mobile-nav-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
              title="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Search inside Drawer */}
          <div className="mobile-nav-search-wrap">
            <button
              className="mobile-drawer-search-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                openSearch();
              }}
            >
              <Search size={18} className="search-pill-icon text-gold" />
              <span className="search-pill-text">Search {totalMoviesCount || '1,200+'} movies, series & stars...</span>
              <span className="search-pill-action">Search</span>
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="mobile-nav-scroll-area">
            {/* FUNCTION 1: PRIMARY CHANNELS */}
            <div className="mobile-primary-nav-block">
              <div className="mobile-section-header-wrap">
                <span className="mobile-section-header">Main Channels</span>
                <span className="mobile-count-pill">Core Hubs</span>
              </div>
              <div className="mobile-primary-grid">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      className={`mobile-primary-item ${isActive ? 'mobile-primary-item-active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="mpi-icon-wrap">
                        <Icon size={17} />
                      </div>
                      <span className="mpi-label">{item.label}</span>
                      {isActive && <span className="mpi-active-indicator" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FUNCTION 2 & 3: WATCHLIST & THEME TOGGLE */}
            <div className="mobile-quick-functions-block">
              <div className="mobile-section-header-wrap">
                <span className="mobile-section-header">Controls & Preferences</span>
              </div>
              <div className="mobile-controls-row">
                {/* Watchlist */}
                <button
                  className="mobile-control-card"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookmarks();
                  }}
                >
                  <div className="mc-left">
                    <div className="mc-icon-pill mc-icon-gold">
                      <Bookmark size={16} />
                    </div>
                    <div className="mc-text-col">
                      <span className="mc-title">Saved Watchlist</span>
                      <span className="mc-subtitle">{bookmarkCount} titles saved</span>
                    </div>
                  </div>
                  <span className="mc-badge-gold">{bookmarkCount}</span>
                </button>

                {/* Theme Switcher */}
                <button
                  className="mobile-control-card"
                  onClick={handleToggleTheme}
                >
                  <div className="mc-left">
                    <div className="mc-icon-pill mc-icon-theme">
                      {currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </div>
                    <div className="mc-text-col">
                      <span className="mc-title">Appearance</span>
                      <span className="mc-subtitle">{currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                  </div>
                  <span className="mc-badge-accent">{currentTheme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>

            {/* ALL 13 SPECIALTY SECTIONS */}
            <div className="mobile-specialty-block">
              <div className="mobile-specialty-header-row">
                <span className="mobile-section-header">All Sections & Matrix Portals</span>
                <span className="mobile-count-pill">{allSectionsList.length} Portals</span>
              </div>

              <div className="mobile-specialty-grid">
                {allSectionsList.map((sec) => {
                  const SecIcon = sec.icon;
                  const isEmergency = sec.id === 'emergencies';
                  const isCopyright = sec.id === 'copyright-policy';
                  const isInternational = sec.id === 'international';
                  const isActive = activeTab === sec.id;

                  return (
                    <button
                      key={sec.id}
                      className={`mobile-spec-item ${isActive ? 'mobile-spec-item-active' : ''} ${isEmergency ? 'item-emergency' : isCopyright ? 'item-policy' : isInternational ? 'item-international' : ''}`}
                      onClick={() => handleSectionSelect(sec)}
                    >
                      <div className="ms-icon-wrap">
                        <SecIcon size={17} />
                      </div>
                      <div className="ms-text-wrap">
                        <span className="ms-label">{sec.label}</span>
                        <span className="ms-badge">{sec.badge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="mobile-drawer-footer">
              <div className="mdf-brand-row">
                <span className="mdf-name">OAKSHOW</span>
                <span className="mdf-dot">•</span>
                <span className="mdf-tagline">Shortlisting Everything</span>
              </div>
              <p className="mdf-subtext">Theatrical records, certified remarks & comprehensive cinema database.</p>
              <div className="mdf-actions">
                <button
                  className="mdf-policy-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPolicyModalOpen(true);
                  }}
                >
                  <ShieldCheck size={14} className="text-accent" />
                  <span>DMCA & Copyright Compliance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Policy Modal */}
      <CopyrightPolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
      />

      <style>{`
        .navbar-root {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
          background: var(--bg-glass-strong);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          transition: all var(--transition-normal);
        }
        .navbar-scrolled {
          background: var(--bg-surface);
          box-shadow: var(--shadow-md);
          border-bottom-color: var(--border-focus);
        }

        /* Main Navbar layout */
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 16px;
        }
        .brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }
        .brand-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--logo-cerulean) 0%, var(--logo-navy-deep) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
          transition: transform var(--transition-bounce);
        }
        .brand-favicon-logo {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }
        .brand-group:hover .brand-icon-wrap {
          transform: scale(1.08) rotate(-4deg);
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--text-heading);
        }
        .brand-accent {
          color: var(--accent-primary);
        }
        .brand-tagline {
          font-size: 0.68rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          margin-top: 2px;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .desktop-nav::-webkit-scrollbar {
          display: none;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          color: var(--text-muted);
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          white-space: nowrap;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .nav-link:hover {
          color: var(--accent-primary);
          background: rgba(2, 132, 199, 0.08);
        }
        .nav-link-active {
          color: var(--accent-primary) !important;
          background: rgba(2, 132, 199, 0.14);
          font-weight: 700;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* All Sections Dropdown Button */
        .nav-dropdown-wrapper {
          position: relative;
        }
        .nav-sections-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(255, 184, 0, 0.12) 100%);
          border: 1px solid var(--border-subtle);
          color: var(--text-heading);
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .nav-sections-trigger-btn:hover,
        .nav-sections-trigger-btn.active {
          background: linear-gradient(135deg, var(--logo-cerulean) 0%, var(--logo-navy-deep) 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
          border-color: transparent;
        }
        .chevron-icon {
          transition: transform 0.25s ease;
        }
        .rotate-180 {
          transform: rotate(180deg);
        }

        /* 13-SECTION MEGA DROPDOWN PANEL */
        .top-sections-dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 680px;
          max-width: 95vw;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          overflow: hidden;
          padding: 0;
        }
        .dropdown-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: var(--bg-surface-elevated);
          border-bottom: 1px solid var(--border-subtle);
        }
        .dm-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dm-title-group h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
        }
        .dm-title-group span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .dm-count-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          background: var(--accent-primary);
          color: #ffffff;
        }
        .dropdown-sections-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 16px;
          max-height: 480px;
          overflow-y: auto;
        }
        .dropdown-section-item {
          display: flex;
          gap: 12px;
          padding: 12px 14px;
          border-radius: var(--radius-lg);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dropdown-section-item:hover {
          background: var(--bg-surface-elevated);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .item-emergency:hover {
          background: rgba(225, 29, 72, 0.08);
          border-color: var(--accent-red);
        }
        .item-policy:hover {
          background: rgba(2, 132, 199, 0.08);
          border-color: var(--accent-primary);
        }
        .item-international:hover {
          background: rgba(124, 58, 237, 0.08);
          border-color: var(--accent-purple);
        }
        .ds-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }
        .dropdown-section-item:hover .ds-icon-wrap {
          background: var(--accent-primary);
          color: #ffffff;
        }
        .item-emergency .ds-icon-wrap {
          color: var(--accent-red);
        }
        .item-emergency:hover .ds-icon-wrap {
          background: var(--accent-red);
          color: #ffffff;
        }
        .item-international .ds-icon-wrap {
          color: var(--accent-purple);
        }
        .item-international:hover .ds-icon-wrap {
          background: var(--accent-purple);
          color: #ffffff;
        }
        .ds-info {
          flex-grow: 1;
        }
        .ds-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3px;
        }
        .ds-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-heading);
        }
        .ds-badge {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: var(--radius-full);
          background: var(--bg-surface-elevated);
          color: var(--text-muted);
        }
        .ds-desc {
          font-size: 0.74rem;
          color: var(--text-muted);
          line-height: 1.35;
          margin: 0;
        }
        .dropdown-menu-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: var(--bg-surface-elevated);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.74rem;
          color: var(--text-dim);
        }
        .dm-close-btn {
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .dm-close-btn:hover {
          color: var(--text-main);
          border-color: var(--border-focus);
        }

        /* Search & Actions */
        .search-trigger-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .search-trigger-btn:hover {
          background: var(--bg-surface);
          border-color: var(--accent-primary);
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
        }
        .search-placeholder {
          display: none;
        }
        @media (min-width: 1200px) {
          .search-placeholder {
            display: inline;
          }
        }
        .search-kbd {
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 0.7rem;
          color: var(--text-dim);
        }

        /* Theme Toggle Button */
        .theme-toggle-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .theme-toggle-btn:hover {
          background: rgba(2, 132, 199, 0.12);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .text-accent {
          color: var(--accent-primary);
        }

        .bookmarks-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bookmarks-btn:hover {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
          background: rgba(217, 119, 6, 0.1);
          transform: translateY(-2px);
        }
        .bookmark-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--accent-gold);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          width: 18px;
          height: 18px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .mobile-toggle-btn {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .mobile-toggle-btn:hover,
        .mobile-toggle-btn.is-active {
          background: var(--bg-surface);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* Mobile Header Breakpoint (<= 1080px): Shows ONLY Search Icon & Hamburger */
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-only-control {
            display: none !important;
          }
          .nav-dropdown-wrapper {
            display: none !important;
          }
          .search-placeholder,
          .search-kbd {
            display: none !important;
          }
          .search-trigger-btn {
            width: 40px !important;
            height: 40px !important;
            padding: 0 !important;
            justify-content: center !important;
            border-radius: var(--radius-md) !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }

        /* ==========================================================================
           IMDb-STYLE MOBILE NAVIGATION OVERLAY & SLIDE-DOWN DRAWER
           Optimized for mobile viewing with fluid motion, no page layout shifts.
           ========================================================================== */
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-nav-overlay.is-open {
          pointer-events: auto;
          opacity: 1;
          visibility: visible;
        }

        /* Backdrop with rich blur */
        .mobile-nav-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Sliding Sheet */
        .mobile-nav-sheet {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          width: 100%;
          max-height: 90vh;
          max-height: 90dvh;
          background: var(--bg-surface);
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px;
          border-bottom: 1px solid var(--border-subtle);
          box-shadow: 0 24px 48px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--border-subtle);
          transform: translateY(-100%);
          transition: transform 0.36s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .mobile-nav-overlay.is-open .mobile-nav-sheet {
          transform: translateY(0);
        }

        /* Sheet Top Header */
        .mobile-nav-sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: var(--bg-surface-elevated);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .mobile-nav-close-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-heading);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .mobile-nav-close-btn:hover,
        .mobile-nav-close-btn:active {
          background: var(--accent-primary);
          color: #ffffff;
          transform: scale(1.06);
          border-color: transparent;
        }

        /* Search Pill inside Drawer */
        .mobile-nav-search-wrap {
          padding: 12px 20px 8px;
          background: var(--bg-surface);
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .mobile-drawer-search-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-muted);
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }
        .mobile-drawer-search-btn:hover,
        .mobile-drawer-search-btn:active {
          border-color: var(--accent-primary);
          background: var(--bg-primary);
          color: var(--text-main);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
        }
        .search-pill-icon {
          flex-shrink: 0;
        }
        .search-pill-text {
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .search-pill-action {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          background: rgba(2, 132, 199, 0.15);
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        /* Scroll Area with iOS-grade touch scrolling */
        .mobile-nav-scroll-area {
          flex: 1 1 auto;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 24px;
        }
        .mobile-nav-scroll-area::-webkit-scrollbar {
          width: 4px;
        }
        .mobile-nav-scroll-area::-webkit-scrollbar-thumb {
          background: var(--border-subtle);
          border-radius: 4px;
        }

        /* Section 1: Main Channels */
        .mobile-primary-nav-block {
          padding: 16px 20px 14px;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.012);
        }
        .mobile-section-header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .mobile-section-header {
          display: block;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
        }
        .mobile-count-pill {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          background: var(--bg-surface-elevated);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }
        .mobile-primary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .mobile-primary-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-heading);
          font-size: 0.86rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          position: relative;
        }
        .mobile-primary-item:hover,
        .mobile-primary-item-active {
          background: rgba(2, 132, 199, 0.12) !important;
          border-color: var(--accent-primary) !important;
          color: var(--accent-primary) !important;
        }
        .mpi-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }
        .mobile-primary-item:hover .mpi-icon-wrap,
        .mobile-primary-item-active .mpi-icon-wrap {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: transparent;
        }
        .mpi-label {
          flex-grow: 1;
          font-size: 0.84rem;
          font-weight: 700;
        }
        .mpi-active-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-primary);
        }

        /* Section 2: Quick Preferences */
        .mobile-quick-functions-block {
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .mobile-controls-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .mobile-control-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .mobile-control-card:hover,
        .mobile-control-card:active {
          border-color: var(--accent-primary);
          background: var(--bg-surface);
          transform: translateY(-1px);
        }
        .mc-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mc-icon-pill {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mc-icon-gold {
          background: rgba(217, 119, 6, 0.15);
          color: var(--accent-gold);
          border: 1px solid rgba(217, 119, 6, 0.3);
        }
        .mc-icon-theme {
          background: rgba(2, 132, 199, 0.15);
          color: var(--accent-primary);
          border: 1px solid rgba(2, 132, 199, 0.3);
        }
        .mc-text-col {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .mc-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.2;
        }
        .mc-subtitle {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
        .mc-badge-gold {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: var(--radius-full);
          background: rgba(217, 119, 6, 0.18);
          color: var(--accent-gold);
          border: 1px solid rgba(217, 119, 6, 0.35);
        }
        .mc-badge-accent {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: var(--radius-full);
          background: rgba(2, 132, 199, 0.18);
          color: var(--accent-primary);
          border: 1px solid rgba(2, 132, 199, 0.35);
        }

        /* Section 3: All 13 Specialty Matrix Portals */
        .mobile-specialty-block {
          padding: 16px 20px 20px;
        }
        .mobile-specialty-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .mobile-specialty-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .mobile-spec-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 11px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-heading);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }
        .mobile-spec-item:hover,
        .mobile-spec-item:active,
        .mobile-spec-item-active {
          background: var(--bg-surface) !important;
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-sm);
        }
        .item-emergency:hover,
        .item-emergency:active {
          border-color: var(--accent-red) !important;
          background: rgba(225, 29, 72, 0.08) !important;
        }
        .item-international:hover,
        .item-international:active {
          border-color: var(--accent-purple) !important;
          background: rgba(124, 58, 237, 0.08) !important;
        }
        .ms-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }
        .mobile-spec-item:hover .ms-icon-wrap,
        .mobile-spec-item-active .ms-icon-wrap {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: transparent;
        }
        .item-emergency .ms-icon-wrap {
          color: var(--accent-red);
        }
        .item-emergency:hover .ms-icon-wrap {
          background: var(--accent-red);
          color: #ffffff;
        }
        .item-international .ms-icon-wrap {
          color: var(--accent-purple);
        }
        .item-international:hover .ms-icon-wrap {
          background: var(--accent-purple);
          color: #ffffff;
        }
        .ms-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 1px;
          overflow: hidden;
        }
        .ms-label {
          font-size: 0.81rem;
          font-weight: 700;
          color: var(--text-heading);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .ms-badge {
          font-size: 0.65rem;
          color: var(--text-muted);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        /* Footer in Mobile Drawer */
        .mobile-drawer-footer {
          padding: 16px 20px;
          background: var(--bg-surface-elevated);
          border-top: 1px solid var(--border-subtle);
          text-align: center;
        }
        .mdf-brand-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 4px;
        }
        .mdf-dot {
          color: var(--accent-primary);
        }
        .mdf-tagline {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .mdf-subtext {
          font-size: 0.72rem;
          color: var(--text-dim);
          line-height: 1.4;
          margin: 0 0 10px;
        }
        .mdf-actions {
          display: flex;
          justify-content: center;
        }
        .mdf-policy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .mdf-policy-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        @media (min-width: 1081px) {
          .mobile-nav-overlay {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .mobile-primary-grid,
          .mobile-controls-row,
          .mobile-specialty-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .top-sections-dropdown-menu {
            width: 95vw;
            right: -10px;
          }
          .dropdown-sections-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
