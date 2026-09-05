import React from 'react';
import { Film, Heart, Shield, Archive, Globe, Share2, ExternalLink, Map } from 'lucide-react';
import { navigateTo } from '../utils/router';

export default function Footer({ onSelectCategory, stats }) {
  return (
    <footer className="footer-root">
      <div className="container">
        {/* Stats Row */}
        <div className="footer-stats-bar glass-panel">
          <div className="stat-col">
            <span className="stat-number">{stats?.moviesCount || '1,099+'}</span>
            <span className="stat-label">Movies Indexed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-col">
            <span className="stat-number">{stats?.seriesCount || '50+'}</span>
            <span className="stat-label">Web Series</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-col">
            <span className="stat-number">{stats?.calendarsCount || '126'}</span>
            <span className="stat-label">Monthly Calendars</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-col">
            <span className="stat-number">{stats?.reviewsCount || '50+'}</span>
            <span className="stat-label">Critic Reviews</span>
          </div>
        </div>

        {/* Footer Main */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="brand-group">
              <div className="brand-icon-wrap">
                <img src="/favicon.png" alt="OakShow Logo" className="brand-favicon-logo" />
              </div>
              <div className="brand-text">
                <span className="brand-name">OAK<span className="brand-accent">SHOW</span></span>
                <span className="brand-tagline">The One Destination For Everything On Entertainment</span>
              </div>
            </div>
            <p className="footer-about-text">
              OakShow shortlists movies, series, video games, sports, and books with unified ratings, reviews, bookings, and trailers in one place.
            </p>
            
            {/* Social Links including YouTube and LinkedIn */}
            <div className="footer-social-links">
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@OakShow" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon-btn social-icon-yt" 
                aria-label="OakShow YouTube Channel"
                title="OakShow YouTube Channel (@OakShow)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/oakshow" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon-btn social-icon-li" 
                aria-label="OakShow LinkedIn Page"
                title="OakShow Official LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M5.07 18.5h2.79v-8.37H5.07v8.37z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="https://x.com/oak_show?lang=uk" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon-btn" 
                aria-label="X (Twitter)"
                title="OakShow on X (@oak_show)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/OakShowReal/" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon-btn" 
                aria-label="Facebook"
                title="OakShow on Facebook (@OakShowReal)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/oak_show/" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon-btn" 
                aria-label="Instagram"
                title="OakShow on Instagram (@oak_show)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Hubs Column */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Cinema & Shows</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectCategory ? onSelectCategory('ott') : navigateTo('ott')}>OTT & Online Movies</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('indian') : navigateTo('indian')}>Indian Movies</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('hollywood') : navigateTo('hollywood')}>Hollywood</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('international') : navigateTo('international')}>International & World Cinema</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('series-hub') : navigateTo('series-hub')}>Web Series & Television</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('releases') : navigateTo('releases')}>Movies Released</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('upcoming') : navigateTo('upcoming')}>Upcoming Movies</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('reviews') : navigateTo('reviews')}>Critic Reviews & Remarks</button></li>
            </ul>
          </div>

          {/* Special Hubs & Sitemap Column */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Special Hubs & Index</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectCategory ? onSelectCategory('news') : navigateTo('news')}>OakShow News</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('emergencies') : navigateTo('emergencies')}>🚨 Emergencies, Helplines & Relief</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('remarks') : navigateTo('remarks')}>OakShow Remarks & Meanings Guide</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('games-books') : navigateTo('games-books')}>Video Games & Literature</button></li>
              <li><button onClick={() => onSelectCategory ? onSelectCategory('blog') : navigateTo('blog')}>OakShow Editorial Blogs & Essays</button></li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="sitemap-xml-link" title="View Full XML Sitemap Index">
                  <Map size={13} className="inline-icon text-gold" />
                  <span>XML Sitemap (Full Index)</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li><a href="/legacy_index.html" target="_blank" rel="noreferrer" className="legacy-link"><Archive size={13} /> View Original Legacy Archive</a></li>
              <li><a href="/PrivacyPolicy.html" target="_blank" rel="noreferrer">Privacy & Copyright Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright, Creator Credit and Sitemap */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-group">
            <p className="footer-copy-text">
              © 2016 – 2026 <strong>OakShow</strong>. All original movie posters, logos, and trademarks belong to their respective studios and creators.
            </p>
            <p className="footer-dev-credit">
              Designed and Developed by{' '}
              <a 
                href="https://jithinjp.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-creator-link"
                title="Visit Jithin J Prasad's Official Website (jithinjp.com)"
              >
                <span>Jithin J Prasad</span>
                <ExternalLink size={12} className="inline-icon ms-1" />
              </a>
            </p>
          </div>
          
          <div className="footer-bottom-links">
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="footer-bottom-link">
              <Map size={12} className="inline-icon" />
              <span>sitemap.xml</span>
            </a>
            <span className="footer-bullet">•</span>
            <a href="https://www.youtube.com/@OakShow" target="_blank" rel="noreferrer" className="footer-bottom-link">
              YouTube
            </a>
            <span className="footer-bullet">•</span>
            <a href="https://www.linkedin.com/company/oakshow" target="_blank" rel="noreferrer" className="footer-bottom-link">
              LinkedIn
            </a>
            <span className="footer-bullet">•</span>
            <a href="/PrivacyPolicy.html" target="_blank" rel="noreferrer" className="footer-bottom-link">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
          padding: 48px 0 28px;
          margin-top: 48px;
        }
        .footer-stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 24px;
          margin-bottom: 40px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .stat-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-primary);
        }
        .stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border-subtle);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-about-text {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 420px;
        }
        .footer-social-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }
        .social-icon-btn:hover {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }
        .social-icon-yt:hover {
          background: #ff0000;
          color: #ffffff;
          border-color: #ff0000;
        }
        .social-icon-li:hover {
          background: #0a66c2;
          color: #ffffff;
          border-color: #0a66c2;
        }
        .footer-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links-list button, .footer-links-list a {
          color: var(--text-muted);
          font-size: 0.88rem;
          transition: color var(--transition-fast);
          text-align: left;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .footer-links-list button:hover, .footer-links-list a:hover {
          color: var(--accent-primary);
        }
        .sitemap-xml-link {
          color: var(--accent-primary) !important;
          font-weight: 600;
        }
        .legacy-link {
          color: var(--accent-primary) !important;
          font-weight: 600;
        }
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8rem;
          color: var(--text-dim);
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-bottom-link {
          color: var(--text-muted);
          transition: color var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .footer-bottom-link:hover {
          color: var(--accent-gold);
        }
        .footer-bullet {
          color: var(--text-dim);
          font-size: 0.7rem;
        }
        .footer-copyright-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .footer-copy-text {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin: 0;
        }
        .footer-dev-credit {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .footer-creator-link {
          color: var(--accent-primary);
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          transition: all var(--transition-fast);
        }
        .footer-creator-link:hover {
          color: var(--accent-gold);
          text-decoration: underline;
        }
        .footer-badge-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .footer-badge-link:hover {
          color: var(--accent-primary);
        }
        .footer-bottom-badge {
          background: var(--bg-surface-elevated);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 768px) {
          .footer-stats-bar {
            flex-wrap: wrap;
            gap: 16px;
          }
          .stat-divider {
            display: none;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}
