import React, { useState } from 'react';
import { Music, Play, Disc3, Clock, Star, Volume2, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

export default function MusicHub({ musicData, onPlayTrack }) {
  const [selectedAlbum, setSelectedAlbum] = useState(musicData ? musicData[0] : null);

  return (
    <div className="music-hub-root tab-view animate-fade-in">
      <div className="music-hero-banner glass-panel">
        <div className="badge badge-gold">
          <Music size={14} />
          <span>OAKSHOW AUDIO & SOUNDTRACK VAULT</span>
        </div>
        <h2 className="music-main-title">Music Albums & Motion Picture Scores</h2>
        <p className="music-subtitle">
          Explore curated studio albums, chart-topping original film soundtracks, and critical music ratings from OakShow and global publications.
        </p>
      </div>

      <div className="music-grid-layout">
        {/* Featured Album Player Showcase */}
        {selectedAlbum && (
          <div className="featured-album-card glass-panel animate-fade-in">
            <div className="fac-cover-wrap">
              <img 
                src={selectedAlbum.poster ? (selectedAlbum.poster.startsWith('/') ? selectedAlbum.poster : `/${selectedAlbum.poster}`) : '/favicon.png'} 
                alt={selectedAlbum.title} 
                className="fac-cover-img"
                onError={(e) => { e.target.src = '/favicon.png'; }}
              />
              <div className="fac-disc-spin">
                <Disc3 size={80} className="text-gold" />
              </div>
            </div>

            <div className="fac-details">
              <div className="fac-badges-row">
                <span className="badge badge-gold">{selectedAlbum.genre}</span>
                <span className="badge badge-cyan">{selectedAlbum.language}</span>
                <span className="fac-duration"><Clock size={13} className="inline-icon" /> {selectedAlbum.duration}</span>
              </div>

              <h3 className="fac-title">{selectedAlbum.title}</h3>
              <span className="fac-artist">By {selectedAlbum.artist} • Released {selectedAlbum.releaseDate}</span>
              <p className="fac-summary">{selectedAlbum.summary}</p>

              {/* Ratings Grid */}
              <div className="fac-ratings-box">
                <div className="frb-item">
                  <span className="frb-label">OakShow Score</span>
                  <span className="frb-val text-gold"><Star size={14} fill="currentColor" /> {selectedAlbum.ratings.oakshowScore}</span>
                  <span className="frb-remark">({selectedAlbum.ratings.oakshowRemark})</span>
                </div>
                <div className="frb-item">
                  <span className="frb-label">Metacritic</span>
                  <span className="frb-val">{selectedAlbum.ratings.metacritic}</span>
                </div>
                <div className="frb-item">
                  <span className="frb-label">The Guardian</span>
                  <span className="frb-val">{selectedAlbum.ratings.guardian}</span>
                </div>
                <div className="frb-item">
                  <span className="frb-label">NME</span>
                  <span className="frb-val">{selectedAlbum.ratings.nme}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fac-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => onPlayTrack && onPlayTrack(selectedAlbum.youtubeId, selectedAlbum.title)}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Play Music Promo</span>
                </button>
              </div>

              {/* Tracklist */}
              {selectedAlbum.tracks && selectedAlbum.tracks.length > 0 && (
                <div className="fac-tracklist">
                  <h4>Featured Tracks</h4>
                  <div className="tracklist-items">
                    {selectedAlbum.tracks.map((track, idx) => (
                      <div key={idx} className="track-row" onClick={() => onPlayTrack && onPlayTrack(selectedAlbum.youtubeId, `${selectedAlbum.title} - ${track.title}`)}>
                        <span className="track-num">{idx + 1}</span>
                        <Volume2 size={14} className="text-gold" />
                        <span className="track-name">{track.title}</span>
                        <span className="track-time">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Albums Catalog Grid */}
        <div className="albums-catalog-section">
          <h3 className="section-title">All Featured Soundtracks & Studio Albums</h3>
          <div className="albums-cards-grid">
            {musicData && musicData.map((album) => {
              const isSelected = selectedAlbum?.id === album.id;
              const posterSrc = album.poster ? (album.poster.startsWith('/') ? album.poster : `/${album.poster}`) : '/favicon.png';

              return (
                <div 
                  key={album.id}
                  className={`album-card glass-card ${isSelected ? 'album-card-active' : ''}`}
                  onClick={() => {
                    setSelectedAlbum(album);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                >
                  <div className="album-card-img-wrap">
                    <img 
                      src={posterSrc} 
                      alt={album.title} 
                      className="album-card-img"
                      onError={(e) => { e.target.src = '/favicon.png'; }}
                    />
                    <div className="album-overlay-btn">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="album-card-body">
                    <span className="album-card-genre">{album.genre}</span>
                    <h4 className="album-card-title">{album.title}</h4>
                    <span className="album-card-artist">{album.artist}</span>
                    <div className="album-card-footer">
                      <span className="album-rating-pill">
                        <Star size={12} fill="currentColor" className="text-gold" />
                        <span>{album.ratings.oakshowScore}</span>
                      </span>
                      <span className="album-date">{album.releaseDate?.split(',')[1] || album.releaseDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
