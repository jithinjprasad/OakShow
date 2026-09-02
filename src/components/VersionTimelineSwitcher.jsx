import React, { useState } from 'react';
import { History, LayoutGrid, FileText, Layers, ExternalLink, ChevronDown, Check } from 'lucide-react';

export default function VersionTimelineSwitcher({ currentVersion, onSelectVersion }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const versions = [
    {
      id: 'v1',
      num: 'v1.0 (2016–2022)',
      title: 'Original Classic HTML Archive',
      subtitle: '1,335 pure static Bootstrap/jQuery pages',
      isStatic: true,
      sampleLinks: [
        { label: '2.0 (Classic HTML)', url: '/2point0.html' },
        { label: 'Dangal (Classic HTML)', url: '/Dangal.html' },
        { label: '102 Not Out (Classic HTML)', url: '/102NotOut.html' },
        { label: 'Reviews Hub (Classic)', url: '/OakShowReviews.html' },
        { label: 'Hollywood Releases (Classic)', url: '/Hollywood.html' },
      ]
    },
    {
      id: 'v2',
      num: 'v2.0 (Aug 26)',
      title: 'Unified React SPA (Cinematic Modals)',
      subtitle: 'Single-page entertainment dashboard with pop-up detail modals & trailer players',
      isStatic: false,
    },
    {
      id: 'v3',
      num: 'v3.0 (Aug 28)',
      title: 'Modern Standalone Pages & Share Suite',
      subtitle: 'Dedicated URL routes (/#/movie/...) with multi-source ratings & 1-click social sharing',
      isStatic: false,
    }
  ];

  return (
    <aside aria-label="Version Timeline Switcher" className="version-timeline-bar">
      <div className="version-timeline-inner">
        <div className="version-timeline-badge">
          <img src="/favicon.png" alt="OakShow" style={{ width: 18, height: 18, borderRadius: 4, objectFit: 'contain' }} />
          <span className="badge-label">Timeline Architecture:</span>
        </div>

        <div className="version-pill-group">
          {/* V1 Static Button with dropdown */}
          <div className="version-dropdown-container">
            <button 
              className={`version-pill ${currentVersion === 'v1' ? 'active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Browse original 2016-2022 static HTML pages"
            >
              <FileText size={14} />
              <span className="v-num">v1.0 (Original Static)</span>
              <ChevronDown size={12} />
            </button>

            {dropdownOpen && (
              <div className="version-dropdown-menu">
                <div className="dropdown-header">
                  <strong>Classic HTML Pages (2016–2022)</strong>
                  <p className="text-xs text-dim">Restored pure static HTML files with zero redirects:</p>
                </div>
                <div className="dropdown-links">
                  {versions[0].sampleLinks.map(link => (
                    <a 
                      key={link.url} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="dropdown-item"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* V2 Modal SPA Button */}
          <button 
            className={`version-pill ${currentVersion === 'v2' ? 'active' : ''}`}
            onClick={() => { setDropdownOpen(false); onSelectVersion('v2'); }}
            title="Switch to August 26 Single-Page React App with Modals"
          >
            <Layers size={14} />
            <span className="v-num">v2.0 (Aug 26 Modal SPA)</span>
            {currentVersion === 'v2' && <Check size={14} className="text-emerald" />}
          </button>

          {/* V3 Standalone Route Button */}
          <button 
            className={`version-pill ${currentVersion === 'v3' ? 'active' : ''}`}
            onClick={() => { setDropdownOpen(false); onSelectVersion('v3'); }}
            title="Switch to August 28 Standalone Routes & Sharing Experience"
          >
            <LayoutGrid size={14} />
            <span className="v-num">v3.0 (Aug 28 Standalone Pages)</span>
            {currentVersion === 'v3' && <Check size={14} className="text-emerald" />}
          </button>
        </div>

        <div className="active-mode-indicator">
          <span className="dot-pulse"></span>
          <span className="indicator-text">
            Active: <strong>{currentVersion === 'v2' ? 'v2.0 (Modal Views)' : 'v3.0 (Standalone Pages)'}</strong>
          </span>
        </div>
      </div>
    </aside>
  );
}
