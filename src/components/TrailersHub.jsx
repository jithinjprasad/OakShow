import React, { useState } from 'react';
import { Play, Film, Search, Sparkles, Clapperboard, Video, ArrowRight, ExternalLink } from 'lucide-react';

export default function TrailersHub({ trailersData, onPlayVideo, onSelectMovie }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Flatten & format trailers
  const formattedTrailers = (trailersData || []).flatMap((item) => {
    if (item.videos && item.videos.length > 0) {
      return item.videos.map((vid, idx) => ({
        id: `${item.id}-${idx}`,
        title: vid.title || item.title,
        youtubeId: vid.youtubeId || (vid.url?.includes('v=') ? vid.url.split('v=')[1]?.split('&')[0] : null),
        relatedMovie: item.relatedMovie || item.id,
        filename: item.filename,
        raw: vid
      }));
    }
    return [{
      id: item.id,
      title: item.title,
      youtubeId: item.youtubeId || (item.url?.includes('v=') ? item.url.split('v=')[1]?.split('&')[0] : null),
      relatedMovie: item.relatedMovie || item.id,
      filename: item.filename,
      raw: item
    }];
  }).filter(t => t.youtubeId);

  // Filter trailers
  const filteredTrailers = formattedTrailers.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.relatedMovie && t.relatedMovie.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="trailers-hub-root tab-view animate-fade-in">
      <div className="trailers-hero-banner glass-panel">
        <div className="badge badge-red">
          <Clapperboard size={14} />
          <span>OFFICIAL VIDEO VAULT & TRAILERS</span>
        </div>
        <h2 className="trailers-main-title">Trending Movie & Series Trailers</h2>
        <p className="trailers-subtitle">
          Watch high-definition teasers, official trailer launches, sneak peeks, and viral clips directly inside OakShow.
        </p>

        {/* Search Bar */}
        <div className="trailers-search-bar">
          <Search size={18} className="text-muted" />
          <input 
            type="text"
            placeholder="Search by movie title, series or trailer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="trailers-search-input"
          />
        </div>
      </div>

      {/* Featured Highlight Reel */}
      {filteredTrailers.length > 0 && (
        <div className="trailers-spotlight-box glass-panel">
          <div className="tsb-video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${filteredTrailers[0].youtubeId}?rel=0`}
              title={filteredTrailers[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="tsb-iframe"
            />
          </div>
          <div className="tsb-info">
            <span className="badge badge-gold">SPOTLIGHT TRAILER</span>
            <h3>{filteredTrailers[0].title}</h3>
            <p>Click below to explore full details and ratings for this title on OakShow.</p>
            {filteredTrailers[0].relatedMovie && (
              <button 
                className="btn btn-secondary"
                onClick={() => onSelectMovie && onSelectMovie(filteredTrailers[0].relatedMovie)}
              >
                <span>View Title Details</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Trailers Grid */}
      <div className="trailers-grid-section">
        <div className="section-header">
          <div className="section-title-group">
            <Video size={20} className="text-gold" />
            <h3>Trailers Archive ({filteredTrailers.length})</h3>
          </div>
        </div>

        <div className="trailers-cards-grid">
          {filteredTrailers.slice(0, 48).map((t) => (
            <div 
              key={t.id} 
              className="trailer-card glass-card clickable"
              onClick={() => onPlayVideo && onPlayVideo(t.youtubeId, t.title)}
            >
              <div className="trailer-thumbnail-wrap">
                <img 
                  src={`https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`} 
                  alt={t.title} 
                  className="trailer-thumb-img"
                  loading="lazy"
                />
                <div className="trailer-play-overlay">
                  <div className="play-icon-circle">
                    <Play size={24} fill="#ffffff" color="#ffffff" />
                  </div>
                </div>
              </div>

              <div className="trailer-card-body">
                <h4 className="trailer-card-title">{t.title}</h4>
                <div className="trailer-card-footer">
                  <span className="trailer-provider-badge">YouTube HD</span>
                  {t.relatedMovie && (
                    <button 
                      className="trailer-movie-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectMovie) onSelectMovie(t.relatedMovie);
                      }}
                    >
                      <span>Movie Hub</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
