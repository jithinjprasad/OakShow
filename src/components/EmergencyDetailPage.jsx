import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  HeartHandshake, 
  ExternalLink, 
  ArrowLeft, 
  Globe, 
  LifeBuoy, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Share2, 
  Newspaper, 
  Video, 
  Image as ImageIcon,
  Radio,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function EmergencyDetailPage({ emergency, onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview | guidelines | relief | media
  const [expandedFaq, setExpandedFaq] = useState(0);

  if (!emergency) {
    return (
      <div className="container py-5 text-center">
        <h2>Emergency record not found.</h2>
        <button className="btn btn-secondary mt-3" onClick={onBack}>
          <ArrowLeft size={16} /> Return to Emergency Hub
        </button>
      </div>
    );
  }

  const bannerSrc = emergency.banner || emergency.poster || 'pics/Emergency/KeralaFloods/1.jpg';
  const isEpidemic = emergency.category?.includes('Epidemic') || emergency.category?.includes('Health');
  const isDisaster = emergency.category?.includes('Disaster');

  return (
    <div className="emergency-detail-root animate-fade-in">
      {/* Top Back Navigation Bar */}
      <div className="emergency-nav-top container">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to All Emergencies</span>
        </button>

        <div className="emergency-alert-live-tag">
          <Radio size={14} className="pulse-icon text-red" />
          <span>OFFICIAL OAKSHOW CRISIS DISPATCH</span>
        </div>
      </div>

      {/* Hero Banner Header */}
      <div className="emergency-hero-detail container">
        <div className="emergency-hero-grid glass-panel">
          <div className="emergency-hero-left">
            <div className="emergency-hero-badges-row">
              <span className={`badge ${emergency.categoryBadge || 'badge-red'}`}>
                {emergency.category}
              </span>
              <span className="emergency-alert-level-badge">
                <AlertTriangle size={13} />
                {emergency.alertLevel || emergency.status}
              </span>
            </div>

            <h1 className="emergency-detail-title">{emergency.title}</h1>

            <div className="emergency-detail-meta">
              <div className="meta-item">
                <MapPin size={15} className="text-red" />
                <span><strong>Region:</strong> {emergency.location}</span>
              </div>
              <div className="meta-item">
                <Calendar size={15} className="text-gold" />
                <span><strong>Timeline:</strong> {emergency.date}</span>
              </div>
              <div className="meta-item">
                <ShieldAlert size={15} className="text-emerald" />
                <span><strong>Status:</strong> {emergency.status}</span>
              </div>
            </div>

            <p className="emergency-hero-summary">
              {emergency.summary}
            </p>

            {/* Direct Call Helplines Box */}
            {emergency.helplines && emergency.helplines.length > 0 && (
              <div className="emergency-quick-dial-box">
                <div className="eqd-title">
                  <PhoneCall size={16} className="text-red" />
                  <span>Immediate Emergency Hotlines (Tap to Call):</span>
                </div>
                <div className="eqd-grid">
                  {emergency.helplines.map((hl, idx) => (
                    <a key={idx} href={`tel:${hl.tel || hl.number}`} className="eqd-card">
                      <div className="eqd-icon-wrap">
                        <PhoneCall size={16} />
                      </div>
                      <div className="eqd-info">
                        <span className="eqd-name">{hl.name}</span>
                        <span className="eqd-num">{hl.number}</span>
                        <span className="eqd-desc">{hl.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="emergency-hero-right">
            <div className="emergency-poster-frame">
              <img 
                src={bannerSrc.startsWith('/') ? bannerSrc : `/${bannerSrc}`} 
                alt={emergency.title}
                className="emergency-poster-img"
                onError={(e) => { e.target.src = '/pics/Emergency/KeralaFloods/1.jpg'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Navigation Tabs */}
      <div className="emergency-content-tabs-bar container">
        <button 
          className={`emergency-content-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FileText size={16} />
          <span>Overview & Rescue Actions</span>
        </button>

        {emergency.faqsAndGuidelines && emergency.faqsAndGuidelines.length > 0 && (
          <button 
            className={`emergency-content-tab ${activeTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => setActiveTab('guidelines')}
          >
            <ShieldAlert size={16} />
            <span>Guidelines & FAQs ({emergency.faqsAndGuidelines.length})</span>
          </button>
        )}

        {emergency.reliefFunds && emergency.reliefFunds.length > 0 && (
          <button 
            className={`emergency-content-tab ${activeTab === 'relief' ? 'active' : ''}`}
            onClick={() => setActiveTab('relief')}
          >
            <HeartHandshake size={16} />
            <span>Relief Funds & Donations</span>
          </button>
        )}

        {((emergency.gallery && emergency.gallery.length > 0) || (emergency.liveUpdates && emergency.liveUpdates.length > 0)) && (
          <button 
            className={`emergency-content-tab ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            <Newspaper size={16} />
            <span>News, Media & Gallery</span>
          </button>
        )}
      </div>

      {/* Main Content Body */}
      <div className="emergency-detail-content-body container">
        {/* TAB 1: OVERVIEW & RESCUE ACTIONS */}
        {activeTab === 'overview' && (
          <div className="tab-section-block">
            <div className="section-card glass-panel mb-4">
              <h2 className="section-card-title">
                <LifeBuoy size={20} className="text-red" />
                Emergency Situation & Crisis Background
              </h2>
              <p className="emergency-full-desc">{emergency.description}</p>
            </div>

            {/* Direct Rescue Actions Grid */}
            {emergency.rescueActions && emergency.rescueActions.length > 0 && (
              <div className="section-card glass-panel mb-4">
                <h2 className="section-card-title">
                  <ExternalLink size={20} className="text-gold" />
                  Official Live Rescue Portals & Action Tools
                </h2>

                <div className="rescue-actions-grid">
                  {emergency.rescueActions.map((action, idx) => (
                    <a 
                      key={idx} 
                      href={action.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="rescue-action-card"
                    >
                      <div className="rac-header">
                        <span className="rac-badge">{action.badge || 'Official Link'}</span>
                        <ExternalLink size={14} className="text-gold" />
                      </div>
                      <h3 className="rac-title">{action.title}</h3>
                      <span className="rac-provider">Provided by: {action.provider}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GUIDELINES & FAQS */}
        {activeTab === 'guidelines' && emergency.faqsAndGuidelines && (
          <div className="tab-section-block">
            <div className="section-card glass-panel">
              <h2 className="section-card-title">
                <ShieldAlert size={20} className="text-gold" />
                Verified Guidelines, FAQs & Safety Measures
              </h2>

              <div className="emergency-faqs-accordion">
                {emergency.faqsAndGuidelines.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                      <button 
                        className="faq-question-btn"
                        onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                      >
                        <span className="faq-q-text">{faq.question}</span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div className="faq-answer-body">
                          <p className="faq-a-text">{faq.answer}</p>
                          {faq.source && (
                            <span className="faq-source-tag">
                              Source: <strong>{faq.source}</strong>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RELIEF FUNDS & DONATIONS */}
        {activeTab === 'relief' && emergency.reliefFunds && (
          <div className="tab-section-block">
            <div className="section-card glass-panel">
              <h2 className="section-card-title">
                <HeartHandshake size={20} className="text-emerald" />
                Verified Relief Funds & Direct Aid Channels
              </h2>
              <p className="text-muted mb-4">
                All donations go directly to official government relief authorities and verified crisis response partners.
              </p>

              <div className="relief-funds-grid">
                {emergency.reliefFunds.map((fund, idx) => (
                  <div key={idx} className="relief-fund-card glass-card">
                    <div className="rfc-icon-wrap">
                      <HeartHandshake size={24} className="text-emerald" />
                    </div>
                    <div className="rfc-body">
                      <h3 className="rfc-title">{fund.title}</h3>
                      <span className="rfc-provider">{fund.provider}</span>
                      <p className="rfc-desc">{fund.desc}</p>
                      <a 
                        href={fund.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary rfc-btn"
                      >
                        <span>Contribute to Relief Fund</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NEWS, MEDIA & GALLERY */}
        {activeTab === 'media' && (
          <div className="tab-section-block">
            {emergency.liveUpdates && emergency.liveUpdates.length > 0 && (
              <div className="section-card glass-panel mb-4">
                <h2 className="section-card-title">
                  <Newspaper size={20} className="text-gold" />
                  Authoritative News Bulletins & Live Reports
                </h2>
                <div className="emergency-news-list">
                  {emergency.liveUpdates.map((news, idx) => (
                    <a key={idx} href={news.url} target="_blank" rel="noopener noreferrer" className="emergency-news-item">
                      <div className="eni-left">
                        <h4 className="eni-headline">{news.headline}</h4>
                        <span className="eni-meta">By <strong>{news.author}</strong> • {news.date}</span>
                      </div>
                      <ExternalLink size={16} className="text-muted" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {emergency.gallery && emergency.gallery.length > 0 && (
              <div className="section-card glass-panel mb-4">
                <h2 className="section-card-title">
                  <ImageIcon size={20} className="text-gold" />
                  Photographic Documentation & Crisis Maps
                </h2>
                <div className="emergency-gallery-grid">
                  {emergency.gallery.map((photo, idx) => (
                    <div key={idx} className="emergency-gallery-item">
                      <img 
                        src={photo.src.startsWith('/') ? photo.src : `/${photo.src}`} 
                        alt={photo.caption || 'Emergency Documentation'} 
                        className="emergency-gallery-img"
                        loading="lazy"
                        onError={(e) => { e.target.src = '/pics/Emergency/KeralaFloods/1.jpg'; }}
                      />
                      {photo.caption && <p className="gallery-caption">{photo.caption}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
