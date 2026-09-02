import React from 'react';
import { X, Bookmark, Film, Trash2, ChevronRight, Play } from 'lucide-react';

export default function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  bookmarkedMovies, 
  onSelectMovie, 
  onRemoveBookmark,
  onClearAll 
}) {
  if (!isOpen) return null;

  return (
    <div className="bookmarks-backdrop animate-fade-in" onClick={onClose}>
      <div className="bookmarks-drawer" onClick={e => e.stopPropagation()}>
        <div className="bookmarks-header">
          <div className="bookmarks-title-group">
            <Bookmark size={20} fill="#ffb800" color="#ffb800" />
            <h3>Your Watchlist ({bookmarkedMovies.length})</h3>
          </div>
          <button className="bookmarks-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="bookmarks-body">
          {bookmarkedMovies.length > 0 ? (
            <div className="bookmarks-list">
              {bookmarkedMovies.map((movie) => {
                const posterSrc = movie.poster ? (movie.poster.startsWith('/') ? movie.poster : `/${movie.poster}`) : null;
                return (
                  <div 
                    key={movie.id} 
                    className="bookmark-row"
                    onClick={() => {
                      onSelectMovie(movie);
                      onClose();
                    }}
                  >
                    <div className="bookmark-poster">
                      {posterSrc ? (
                        <img src={posterSrc} alt={movie.title} onError={(e) => { e.target.src = '/favicon.png'; }} />
                      ) : (
                        <Film size={18} />
                      )}
                    </div>

                    <div className="bookmark-meta">
                      <h4 className="bookmark-movie-title">{movie.title}</h4>
                      <div className="bookmark-tags">
                        {movie.year && <span>{movie.year}</span>}
                        {movie.language && <span>• {movie.language.split(' ')[0]}</span>}
                      </div>
                    </div>

                    <button 
                      className="bookmark-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(movie.id);
                      }}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bookmarks-empty">
              <Bookmark size={40} className="empty-bm-icon" />
              <h4>Your Watchlist is empty</h4>
              <p>Click the bookmark icon on any movie or show card to save it for quick access.</p>
            </div>
          )}
        </div>

        {bookmarkedMovies.length > 0 && (
          <div className="bookmarks-footer">
            <button className="clear-all-btn" onClick={onClearAll}>
              <Trash2 size={14} />
              <span>Clear Entire Watchlist</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .bookmarks-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 5, 8, 0.75);
          backdrop-filter: blur(8px);
          z-index: 1050;
          display: flex;
          justify-content: flex-end;
        }
        .bookmarks-drawer {
          width: 100%;
          max-width: 420px;
          height: 100%;
          background: var(--bg-surface);
          border-left: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .bookmarks-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-surface-elevated);
        }
        .bookmarks-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bookmarks-title-group h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-heading);
        }
        .bookmarks-close-btn {
          color: var(--text-muted);
          padding: 4px;
        }
        .bookmarks-close-btn:hover {
          color: var(--text-main);
        }
        .bookmarks-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }
        .bookmarks-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bookmark-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          padding: 10px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bookmark-row:hover {
          background: var(--bg-surface-elevated);
          border-color: var(--accent-primary);
          transform: translateX(-3px);
        }
        .bookmark-poster {
          width: 44px;
          height: 60px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--bg-surface-elevated);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
        }
        .bookmark-poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .bookmark-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bookmark-movie-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.3;
        }
        .bookmark-tags {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .bookmark-delete-btn {
          color: var(--text-dim);
          padding: 6px;
          border-radius: 4px;
          transition: color var(--transition-fast);
        }
        .bookmark-delete-btn:hover {
          color: var(--accent-red);
        }
        .bookmarks-empty {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .empty-bm-icon {
          color: var(--accent-gold);
          opacity: 0.5;
        }
        .bookmarks-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-surface-elevated);
        }
        .clear-all-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--accent-red);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px;
        }
        .clear-all-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
