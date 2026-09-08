import React from 'react';
import { X, Bookmark, Film, Trash2, ChevronRight, Play, CheckCircle2, Cloud } from 'lucide-react';

export default function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  bookmarkedMovies, 
  bookmarks,
  onSelectMovie, 
  onRemoveBookmark,
  onClearAll,
  currentUser,
  onOpenAuth
}) {
  if (!isOpen) return null;

  const list = Array.isArray(bookmarkedMovies) ? bookmarkedMovies : (Array.isArray(bookmarks) ? bookmarks : []);

  return (
    <div className="bookmarks-backdrop animate-fade-in" onClick={onClose}>
      <div className="bookmarks-drawer" onClick={e => e.stopPropagation()}>
        <div className="bookmarks-header">
          <div className="bookmarks-title-group">
            <Bookmark size={20} fill="#ffb800" color="#ffb800" />
            <h3>Your Watchlist ({list.length})</h3>
          </div>
          <button className="bookmarks-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Cloud Watchlist Status / Sync Banner */}
        {currentUser ? (
          <div className="watchlist-cloud-status-banner">
            <Cloud size={14} className="text-emerald" />
            <span>Watchlist synced with your account</span>
          </div>
        ) : (
          <div className="watchlist-signin-prompt-banner">
            <span>Save across devices?</span>
            <button 
              type="button" 
              className="watchlist-signin-link"
              onClick={() => {
                onClose();
                if (onOpenAuth) onOpenAuth('signin');
              }}
            >
              Sign in to sync
            </button>
          </div>
        )}

        <div className="bookmarks-body">
          {bookmarkedMovies.length > 0 ? (
            <div className="bookmarks-list">
              {bookmarkedMovies.map((movie) => {
                const posterSrc = movie.poster ? (movie.poster.startsWith('/') ? movie.poster : `/${movie.poster}`) : null;
                const targetUrl = movie.filename ? (movie.filename.startsWith('/') ? movie.filename : `/${movie.filename}`) : `/${movie.id}.html`;
                return (
                  <a 
                    key={movie.id} 
                    href={targetUrl}
                    className="bookmark-row"
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
                      e.preventDefault();
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
                  </a>
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
        .watchlist-cloud-status-banner {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 24px;
          background: rgba(5, 150, 105, 0.08);
          border-bottom: 1px solid rgba(5, 150, 105, 0.2);
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--accent-emerald);
        }
        .watchlist-signin-prompt-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 24px;
          background: rgba(2, 132, 199, 0.08);
          border-bottom: 1px solid rgba(2, 132, 199, 0.2);
          font-size: 0.76rem;
          color: var(--text-muted);
        }
        .watchlist-signin-link {
          background: none;
          border: none;
          padding: 0;
          color: var(--accent-primary);
          font-weight: 800;
          cursor: pointer;
          font-size: 0.76rem;
        }
        .watchlist-signin-link:hover {
          text-decoration: underline;
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
          text-decoration: none;
          color: inherit;
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
        .bookmark-row:visited,
        .bookmark-row:hover,
        .bookmark-row:active,
        .bookmark-row:focus {
          text-decoration: none;
          color: inherit;
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
