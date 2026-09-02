import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search, X, Film, Tv, Star, Gamepad2, ArrowRight, Sparkles } from 'lucide-react';

function matchesCategory(item, category) {
  if (!item) return false;
  if (!category || category === 'all') return true;

  const itemType = (item.type || '').toLowerCase();
  const itemCategory = (item.category || '').toLowerCase();
  const catLower = category.toLowerCase();

  if (catLower === 'indian') {
    return itemCategory.includes('indian') || itemType === 'indian' || ['hindi', 'tamil', 'telugu', 'malayalam', 'kannada', 'bengali', 'marathi', 'punjabi'].some(l => (item.language || '').toLowerCase().includes(l));
  }
  if (catLower === 'hollywood') {
    return itemCategory.includes('hollywood') || itemType === 'hollywood';
  }
  if (catLower === 'international') {
    return itemCategory.includes('international') || itemType === 'international';
  }
  if (catLower === 'series') {
    return itemType === 'series' || itemCategory.includes('series');
  }
  if (catLower === 'review') {
    return itemType === 'review' || itemCategory.includes('review');
  }
  if (catLower === 'game') {
    return itemType === 'game' || itemType === 'book' || itemCategory.includes('game') || itemCategory.includes('book');
  }
  if (catLower === 'sports') {
    return itemType === 'sports' || itemCategory.includes('sports');
  }
  if (catLower === 'emergency') {
    return itemType === 'emergency' || itemCategory.includes('emergency') || itemCategory.includes('disaster');
  }

  return itemType === catLower || itemCategory.includes(catLower);
}

export default function SearchModal({ 
  isOpen, 
  onClose, 
  searchIndex, 
  onSelectItem 
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Initialize Fuse instance
  const fuse = React.useMemo(() => {
    if (!searchIndex || searchIndex.length === 0) return null;
    return new Fuse(searchIndex, {
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'genre', weight: 0.2 },
        { name: 'language', weight: 0.2 },
        { name: 'author', weight: 0.2 },
        { name: 'year', weight: 0.1 }
      ],
      threshold: 0.35,
      distance: 100,
    });
  }, [searchIndex]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchIndex || searchIndex.length === 0) {
      setResults([]);
      return;
    }

    if (!query.trim()) {
      // Default top suggestions for the selected category
      const pool = selectedCategory === 'all'
        ? searchIndex
        : searchIndex.filter(item => matchesCategory(item, selectedCategory));
      setResults(pool.slice(0, 15));
      setSelectedIndex(0);
      return;
    }

    if (fuse) {
      const searchRes = fuse.search(query).map(r => r.item);
      const filtered = selectedCategory === 'all' 
        ? searchRes 
        : searchRes.filter(item => matchesCategory(item, selectedCategory));
      setResults(filtered.slice(0, 25));
      setSelectedIndex(0);
    }
  }, [query, selectedCategory, fuse, searchIndex]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onSelectItem(results[selectedIndex]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="search-modal-container" onClick={e => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={20} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-text-input"
            placeholder="Search over 1,200+ movies, series, reviews, or cast..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button className="search-clear-btn" onClick={() => setQuery('')} title="Clear search">
              <X size={16} />
            </button>
          )}
          <button className="search-close-btn" onClick={onClose} title="Close search (ESC)">
            ESC
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="search-filter-chips">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'indian', label: '🇮🇳 Indian' },
            { id: 'hollywood', label: '🎬 Hollywood' },
            { id: 'international', label: '🌍 International' },
            { id: 'series', label: '📺 Web Series' },
            { id: 'review', label: '⭐ Critic Reviews' },
            { id: 'game', label: '🎮 Games & Books' },
            { id: 'sports', label: '🏆 Sports' },
            { id: 'emergency', label: '🚨 Emergencies' }
          ].map(cat => (
            <button
              key={cat.id}
              className={`search-chip ${selectedCategory === cat.id ? 'search-chip-active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="search-results-container" ref={listRef}>
          {results.length > 0 ? (
            <div className="search-results-list">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const posterSrc = item.poster ? (item.poster.startsWith('/') ? item.poster : `/${item.poster}`) : null;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className={`search-result-row ${isSelected ? 'search-result-selected' : ''}`}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="result-thumb-wrap">
                      {posterSrc ? (
                        <img 
                          src={posterSrc} 
                          alt={item.title} 
                          className="result-thumb-img" 
                          onError={(e) => { 
                            e.target.style.display = 'none'; 
                            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex'; 
                          }}
                        />
                      ) : null}
                      <div className="result-thumb-fallback" style={{ display: posterSrc ? 'none' : 'flex' }}>
                        <Film size={18} />
                      </div>
                    </div>

                    <div className="result-meta">
                      <h4 className="result-title" title={item.title}>{item.title}</h4>
                      <div className="result-tags">
                        <span className={`badge ${item.type === 'movie' ? 'badge-gold' : item.type === 'series' ? 'badge-red' : 'badge-cyan'}`}>
                          {item.type === 'movie' ? 'Movie' : item.type === 'series' ? 'Series' : item.type === 'game' ? 'Game' : item.type === 'book' ? 'Book' : item.type}
                        </span>
                        {item.category && (
                          <span className={`badge ${item.category === 'Hollywood' ? 'badge-red' : item.category === 'International' ? 'badge-cyan' : 'badge-gold'}`}>
                            {item.category}
                          </span>
                        )}
                        {item.year && <span className="result-tag">• {item.year}</span>}
                        {item.language && <span className="result-tag">• {item.language}</span>}
                        {item.author && <span className="result-tag">• By {item.author}</span>}
                      </div>
                    </div>

                    <ArrowRight size={18} className="result-arrow-icon" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-empty-state">
              <Sparkles size={36} className="empty-icon" />
              <h3>{query ? `No direct matches found for "${query}"` : 'No titles available in this category'}</h3>
              <p>Try searching for keywords like "Baahubali", "Avengers", "Tamil", "Jithin", or "2019".</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="search-modal-footer">
          <div className="shortcut-hint">
            <kbd>↑</kbd> <kbd>↓</kbd> <span>to navigate</span>
          </div>
          <div className="shortcut-hint">
            <kbd>↵</kbd> <span>to select</span>
          </div>
          <div className="shortcut-hint">
            <kbd>ESC</kbd> <span>to close</span>
          </div>
        </div>
      </div>

      <style>{`
        .search-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 8, 19, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 16px 40px;
        }
        .search-modal-container {
          width: 100%;
          max-width: 720px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg), 0 0 35px rgba(2, 132, 199, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 82vh;
        }
        .search-input-header {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-subtle);
          gap: 12px;
          background: var(--bg-surface-elevated);
        }
        .search-input-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }
        .search-text-input {
          flex: 1;
          background: transparent;
          border: none;
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-heading);
          outline: none;
          padding: 0;
          margin: 0;
          line-height: 1.4;
        }
        .search-text-input::placeholder {
          color: var(--text-dim);
        }
        .search-clear-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .search-clear-btn:hover {
          color: var(--text-heading);
          background: var(--border-subtle);
        }
        .search-close-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 4px 8px;
          border-radius: 6px;
          color: var(--text-muted);
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: all var(--transition-fast);
        }
        .search-close-btn:hover {
          color: var(--text-heading);
          border-color: var(--accent-primary);
          background: var(--bg-surface-elevated);
        }
        .search-filter-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-bottom: 1px solid var(--border-subtle);
          overflow-x: auto;
          scrollbar-width: none;
          background: var(--bg-surface);
        }
        .search-filter-chips::-webkit-scrollbar {
          display: none;
        }
        .search-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          background: var(--bg-surface-elevated);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
          white-space: nowrap;
          cursor: pointer;
        }
        .search-chip:hover {
          color: var(--text-heading);
          background: var(--bg-surface);
          border-color: var(--accent-primary);
        }
        .search-chip-active {
          background: rgba(2, 132, 199, 0.12);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          font-weight: 700;
        }
        .search-results-container {
          flex: 1;
          overflow-y: auto;
          padding: 8px 12px;
          max-height: 480px;
        }
        .search-results-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .search-result-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 12px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          border: 1px solid transparent;
        }
        .search-result-row:hover,
        .search-result-selected {
          background: var(--bg-surface-elevated);
          border-color: var(--border-subtle);
        }
        .result-thumb-wrap {
          width: 42px;
          height: 58px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        .result-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .result-thumb-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          background: var(--bg-surface-elevated);
        }
        .result-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }
        .result-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-heading);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }
        .result-tags {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          font-size: 0.75rem;
        }
        .result-tag {
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 500;
        }
        .result-arrow-icon {
          color: var(--text-dim);
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-4px);
          transition: all var(--transition-fast);
        }
        .search-result-row:hover .result-arrow-icon,
        .search-result-selected .result-arrow-icon {
          opacity: 1;
          color: var(--accent-primary);
          transform: translateX(0);
        }
        .search-empty-state {
          padding: 48px 20px;
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .empty-icon {
          color: var(--accent-primary);
        }
        .search-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          padding: 8px 20px;
          background: var(--bg-surface-elevated);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          color: var(--text-dim);
        }
        .shortcut-hint {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .shortcut-hint kbd {
          background: var(--bg-surface);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          font-weight: 700;
          font-size: 0.72rem;
        }
      `}</style>
    </div>
  );
}
