import React from 'react';
import { Sparkles, Calendar, MapPin, Play, Ticket, ExternalLink, Award, Users } from 'lucide-react';

export default function EventsHub({ eventsData, onPlayTrailer }) {
  return (
    <div className="events-hub-root tab-view animate-fade-in">
      <div className="events-hero-banner glass-panel">
        <div className="badge badge-gold">
          <Sparkles size={14} />
          <span>CINEMA GALA, AWARDS & FESTIVALS</span>
        </div>
        <h2 className="events-main-title">Entertainment Events & Film Galas</h2>
        <p className="events-subtitle">
          Discover prestigious film festivals, short film award ceremonies, audio launch events, and industry summits covered by OakShow.
        </p>
      </div>

      <div className="events-cards-container">
        {eventsData && eventsData.map((ev) => {
          const posterSrc = ev.poster ? (ev.poster.startsWith('/') ? ev.poster : `/${ev.poster}`) : '/favicon.png';

          return (
            <div key={ev.id} className="event-feature-card glass-panel animate-fade-in">
              <div className="efc-poster-col">
                <img 
                  src={posterSrc} 
                  alt={ev.title} 
                  className="efc-poster-img"
                  onError={(e) => { e.target.src = '/favicon.png'; }}
                />
                <span className="efc-status-badge">{ev.status}</span>
              </div>

              <div className="efc-info-col">
                <div className="efc-meta-tags">
                  <span className="badge badge-cyan">{ev.category}</span>
                  <span className="badge badge-gold"><Calendar size={12} className="inline-icon" /> {ev.dates}</span>
                </div>

                <h3 className="efc-title">{ev.title}</h3>

                <div className="efc-location-row">
                  <span className="efc-loc-item">
                    <MapPin size={15} className="text-red" />
                    <strong>Venue:</strong> {ev.venueLink ? <a href={ev.venueLink} target="_blank" rel="noopener noreferrer">{ev.venue}</a> : ev.venue} ({ev.location})
                  </span>
                </div>

                <p className="efc-summary">{ev.summary}</p>

                {ev.highlights && (
                  <div className="efc-highlights">
                    <h4>Event Highlights:</h4>
                    <ul>
                      {ev.highlights.map((h, i) => (
                        <li key={i}><Award size={14} className="text-gold flex-shrink-0" /> <span>{h}</span></li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="efc-actions">
                  {ev.youtubeId && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => onPlayTrailer && onPlayTrailer(ev.youtubeId, `${ev.title} - Official Promo`)}
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Watch Event Trailer</span>
                    </button>
                  )}
                  {ev.venueLink && (
                    <a 
                      href={ev.venueLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <span>Official Portal</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
