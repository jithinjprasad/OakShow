import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  HeartHandshake, 
  ExternalLink, 
  Search, 
  Globe, 
  LifeBuoy, 
  FileText, 
  ChevronRight, 
  ArrowRight,
  Info,
  Activity,
  Trees,
  CloudRain,
  Flame,
  Radio
} from 'lucide-react';
import emergenciesData from '../../data/emergencies.json';

export default function EmergencyHub({ onNavigate, onSelectEmergency }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Natural Disaster', 'Public Health Epidemic', 'Environmental Emergency'];

  const filteredEmergencies = useMemo(() => {
    if (!emergenciesData) return [];
    return emergenciesData.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenEmergency = (item) => {
    if (onSelectEmergency) {
      onSelectEmergency(item);
    } else if (onNavigate) {
      onNavigate(`emergency/${item.id || item.slug}`);
    }
  };

  return (
    <div className="emergency-hub-root animate-fade-in">
      {/* Header Crisis Banner */}
      <div className="emergency-hero-banner glass-panel">
        <div className="emergency-alert-tag pulse-tag">
          <Radio size={14} className="pulse-icon text-red" />
          <span>OAKSHOW PUBLIC SAFETY & CRISIS RESPONSE DISPATCH</span>
        </div>

        <h1 className="emergency-main-heading">
          <ShieldAlert size={34} className="text-red me-2 inline-icon" />
          Verified Emergencies, Helplines & Disaster Relief
        </h1>
        
        <p className="emergency-subtext">
          During times of crisis, natural calamities, and public health outbreaks, OakShow provides a dedicated, verified public safety portal aggregating official rescue helplines, relief funds, disaster coordination maps, and medical guidance.
        </p>

        {/* Quick Emergency Dialing Bar */}
        <div className="quick-helplines-bar">
          <div className="helplines-title">
            <PhoneCall size={16} className="text-red" />
            <span>Immediate Emergency Helplines:</span>
          </div>

          <div className="quick-helpline-chips">
            <a href="tel:112" className="helpline-chip chip-emergency" title="Unified National Emergency Call">
              <span className="hl-label">Emergency Call:</span>
              <span className="hl-num">112</span>
            </a>
            <a href="tel:1077" className="helpline-chip chip-district" title="District Disaster Control Room">
              <span className="hl-label">District Control:</span>
              <span className="hl-num">1077</span>
            </a>
            <a href="tel:1070" className="helpline-chip chip-state" title="State Emergency Control Center">
              <span className="hl-label">State Control:</span>
              <span className="hl-num">1070</span>
            </a>
            <a href="tel:1075" className="helpline-chip chip-health" title="National Health Helpline (COVID-19)">
              <span className="hl-label">Health Helpline:</span>
              <span className="hl-num">1075</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="emergency-controls-row">
        <div className="emergency-category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`emergency-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? <LifeBuoy size={15} /> :
               cat === 'Natural Disaster' ? <CloudRain size={15} /> :
               cat === 'Public Health Epidemic' ? <Activity size={15} /> : <Trees size={15} />}
              <span>{cat === 'All' ? 'All Emergencies' : cat}</span>
            </button>
          ))}
        </div>

        <div className="emergency-search-wrap">
          <Search size={16} className="search-icon text-muted" />
          <input
            type="text"
            placeholder="Search emergencies, regions, helplines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="emergency-search-input"
          />
        </div>
      </div>

      {/* Emergencies Grid List */}
      <div className="emergency-cards-grid">
        {filteredEmergencies.map((item, idx) => {
          const bannerSrc = item.banner || item.poster || 'pics/Emergency/KeralaFloods/1.jpg';
          const isEpidemic = item.category.includes('Epidemic') || item.category.includes('Health');
          const isDisaster = item.category.includes('Disaster');

          return (
            <div key={item.id || idx} className="emergency-card glass-card">
              {/* Card Banner */}
              <div className="emergency-banner-wrap" onClick={() => handleOpenEmergency(item)}>
                <img 
                  src={bannerSrc.startsWith('/') ? bannerSrc : `/${bannerSrc}`} 
                  alt={item.title} 
                  className="emergency-banner-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/pics/Emergency/KeralaFloods/1.jpg'; }}
                />

                <div className={`emergency-alert-ribbon ${isEpidemic ? 'ribbon-epidemic' : isDisaster ? 'ribbon-disaster' : 'ribbon-climate'}`}>
                  <AlertTriangle size={13} />
                  <span>{item.alertLevel || item.status}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="emergency-card-body">
                <div className="emergency-meta-row">
                  <span className={`emergency-badge-cat ${item.categoryBadge || 'badge-red'}`}>
                    {item.category}
                  </span>

                  <span className="emergency-date">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                </div>

                <h2 className="emergency-card-title" onClick={() => handleOpenEmergency(item)}>
                  {item.title}
                </h2>

                <div className="emergency-location-tag">
                  <MapPin size={13} className="text-red" />
                  <span>{item.location}</span>
                </div>

                <p className="emergency-summary">
                  {item.summary}
                </p>

                {/* Direct Helplines Preview */}
                {item.helplines && item.helplines.length > 0 && (
                  <div className="card-helplines-preview">
                    <span className="chp-title">Verified Hotlines:</span>
                    <div className="chp-tags">
                      {item.helplines.slice(0, 3).map((hl, hIdx) => (
                        <a key={hIdx} href={`tel:${hl.tel || hl.number}`} className="card-hl-btn" title={hl.name}>
                          <PhoneCall size={11} />
                          <span>{hl.number}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Actions Footer */}
                <div className="emergency-card-footer">
                  <button 
                    className="btn btn-primary emergency-open-btn"
                    onClick={() => handleOpenEmergency(item)}
                  >
                    <span>View Emergency Portal & Relief</span>
                    <ArrowRight size={15} />
                  </button>

                  {item.reliefFunds && item.reliefFunds.length > 0 && (
                    <a 
                      href={item.reliefFunds[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary donate-btn"
                      title={item.reliefFunds[0].title}
                    >
                      <HeartHandshake size={15} className="text-emerald" />
                      <span>Donate</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEmergencies.length === 0 && (
        <div className="empty-emergencies-panel glass-panel text-center py-5">
          <Info size={40} className="text-muted mb-3" />
          <h3>No emergencies match your filter.</h3>
          <p className="text-muted">Try clearing search keywords or selecting "All Emergencies".</p>
          <button className="btn btn-secondary mt-2" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Emergency Preparedness & Helpline Directory Accordion */}
      <div className="emergency-guide-section glass-panel mt-5">
        <div className="egs-header">
          <ShieldAlert size={22} className="text-gold" />
          <div>
            <h3>Emergency Helpline Directory & Citizen Guidelines</h3>
            <p className="text-muted">Save these emergency contact lines on your phone for rapid response.</p>
          </div>
        </div>

        <div className="emergency-directory-grid">
          <div className="dir-box">
            <h4>🚨 National Emergency Number (112)</h4>
            <p>Single unified emergency response for police, fire, state disaster relief force (SDRF), and emergency ambulances across India.</p>
            <a href="tel:112" className="dir-call-link"><PhoneCall size={14} /> Call 112</a>
          </div>

          <div className="dir-box">
            <h4>🌧️ District Disaster Management Authority (1077)</h4>
            <p>Dial 1077 with your local district STD code to directly reach District Collectorate disaster management operations during floods and landslides.</p>
            <a href="tel:1077" className="dir-call-link"><PhoneCall size={14} /> Call 1077</a>
          </div>

          <div className="dir-box">
            <h4>🏥 National Health & Epidemic Helpline (1075)</h4>
            <p>National helpline for public health emergencies, COVID-19 consultations, infectious disease advisories, and quarantine support.</p>
            <a href="tel:1075" className="dir-call-link"><PhoneCall size={14} /> Call 1075</a>
          </div>

          <div className="dir-box">
            <h4>🌿 Environmental Campaign & Tree Plantation</h4>
            <p>Participate in OakShow's #SaveOurRaceandThePlanet movement. Plant a tree on every birthday to counter global warming.</p>
            <a href="mailto:oakshow0@gmail.com" className="dir-call-link"><Globe size={14} /> Join Campaign</a>
          </div>
        </div>
      </div>
    </div>
  );
}
