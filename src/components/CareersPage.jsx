import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  Video, 
  Film, 
  Gamepad2, 
  Tv, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Globe, 
  ExternalLink, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  AlertCircle,
  HelpCircle,
  Heart
} from 'lucide-react';

export default function CareersPage({ onNavigate, onBack }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: 'Movies & Series',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      // Direct Formspree submission
      const response = await fetch('https://formspree.io/oakshow0@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'Your Name': formState.name,
          'Your Email': formState.email,
          'Phone Number': formState.phone,
          'Critic Specialty': formState.specialty,
          'Message': formState.message,
          '_subject': `New OakShow Critic Application from ${formState.name}`
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormState({
          name: '',
          email: '',
          phone: '',
          specialty: 'Movies & Series',
          message: ''
        });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // If CORS or client network issue, offer fallback notice or fallback submission
      setSubmitError(err.message || 'Submission failed. Please check your network connection or try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="careers-page-root animate-fade-in">
      <div className="container py-4">
        {/* Top Back Navigation Bar */}
        <div className="careers-top-nav">
          <button 
            type="button" 
            className="back-link-btn" 
            onClick={() => onBack ? onBack() : (onNavigate ? onNavigate('reviews') : null)}
          >
            <ArrowLeft size={16} />
            <span>Back to Critic Reviews</span>
          </button>

          <div className="careers-status-pill">
            <span className="live-ping" />
            <Sparkles size={14} className="text-gold" />
            <span>NOW WELCOMING NEW CRITICS & REVIEWERS</span>
          </div>
        </div>

        {/* Hero Header */}
        <header className="careers-hero-card glass-panel">
          <div className="careers-hero-content">
            <div className="careers-hero-badge">
              <Award size={14} className="badge-icon" />
              <span>BECOME A CRITIC WITH OAKSHOW</span>
            </div>

            <h1 className="careers-hero-title">
              Careers at <span className="text-gradient-gold">OakShow</span>
            </h1>
            <p className="careers-hero-subtitle">
              Turn your passion for cinema, series, video games, and literature into certified criticism. Join the <strong>OakForce</strong> today.
            </p>
          </div>
        </header>

        {/* Restored Video Section */}
        <section className="careers-video-section">
          <div className="section-title-wrap">
            <div className="badge badge-gold">
              <Video size={13} className="inline-icon me-1" />
              <span>OFFICIAL PROGRAM INTRODUCTION</span>
            </div>
            <h2 className="section-main-heading">Watch the Critic Program Video</h2>
            <p className="section-subtext">
              Discover how the OakShow platform empowers aspiring and experienced critics with verified identities, audience reach, and published credit.
            </p>
          </div>

          <div className="video-player-container glass-panel">
            <div className="video-iframe-wrapper">
              <iframe 
                src="https://player.vimeo.com/video/318354607?color=0284c7&title=1&byline=1&portrait=0" 
                title="Careers at OakShow — Become a Critic Video"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              />
            </div>
            <div className="video-player-footer">
              <div className="video-footer-info">
                <span className="video-tag">VIMEO HD</span>
                <span className="video-title-desc">Careers at OakShow | Become a Critic Video Presentation</span>
              </div>
              <a 
                href="https://vimeo.com/318354607" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-sm btn-outline-custom"
                title="Watch on Vimeo"
              >
                <span>Watch on Vimeo</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* Info & Mission + Restored Application Form Grid */}
        <div className="careers-main-grid">
          {/* Left Column: Mission Info & Sample Profile Layout */}
          <div className="careers-info-col">
            <div className="careers-info-card glass-panel">
              <h3 className="card-heading">
                <Film size={20} className="text-accent" />
                <span>Now Become a Critic</span>
              </h3>
              
              <div className="info-text-body">
                <p>
                  Have you ever dreamed of being a movie, series, or video game critic? Have you ever dreamed about the world reading and engaging with the reviews written by you?
                </p>
                <p>
                  What happened to that awesome dream? Did you drop it because you didn't know where to publish it, or how to get real readers? 
                </p>
                <p className="highlight-quote">
                  "Well, now with <strong>OakShow</strong>, you can make that dream a reality. We provide the dedicated platform for each and every film, show, and gaming buff to explore the world of becoming a certified critic."
                </p>
                <p>
                  All you have to do is verify your identity with us. We will publish your written reviews with full bylines, author credits, and a dedicated profile on our site.
                </p>
              </div>

              {/* Core Benefits */}
              <div className="critic-benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon-wrap">
                    <ShieldCheck size={18} className="text-accent" />
                  </div>
                  <div className="benefit-text">
                    <strong>100% Attribution & Byline</strong>
                    <span>Every review has your name, avatar, bio, and social links permanently attached.</span>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrap">
                    <Award size={18} className="text-gold" />
                  </div>
                  <div className="benefit-text">
                    <strong>Certified OakShow Verdicts</strong>
                    <span>Rate films using OakShow remarks: Must Watch, Safe to Watch, Above Average, or Warning.</span>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrap">
                    <Globe size={18} className="text-emerald" />
                  </div>
                  <div className="benefit-text">
                    <strong>Universal Multi-Genre Platform</strong>
                    <span>Review Bollywood, Hollywood, Mollywood, Kollywood, Anime, Web Series, and Games.</span>
                  </div>
                </div>
              </div>

              {/* Check Basic Layout for Critic's Profile */}
              <div className="critic-profile-preview-box">
                <div className="preview-box-header">
                  <img 
                    src="/Profiles/CriticProfiles/MsMrOakShow/pics/dummy-character-icon.png" 
                    alt="Sample Critic Profile Icon"
                    className="preview-avatar"
                    onError={(e) => { e.target.src = '/favicon.png'; }}
                  />
                  <div className="preview-header-meta">
                    <span className="preview-label">SAMPLE CRITIC PROFILE LAYOUT</span>
                    <h4 className="preview-name">Ms. / Mr. OakShow</h4>
                    <span className="preview-badge">Chief Editorial & Curatorial Critic</span>
                  </div>
                </div>
                <p className="preview-desc">
                  See how your personal critic showcase will appear with custom avatar, cover art, star ratings, and review archives.
                </p>
                <a 
                  href="/Profiles/CriticProfiles/MsMrOakShow/index.html" 
                  className="btn btn-secondary preview-action-btn"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('critic', 'ms-mr-oakshow');
                    }
                  }}
                >
                  <span>Check The Basic Layout for a Critic's Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Restored Application Form */}
          <div className="careers-form-col">
            <div className="application-form-card glass-panel">
              <div className="form-card-header">
                <div className="badge badge-gold">
                  <Send size={13} className="inline-icon me-1" />
                  <span>APPLICATION FORM</span>
                </div>
                <h3 className="form-title">Apply to Become a Critic</h3>
                <p className="form-subtitle">
                  Send your basic details here. Our editorial board will contact you based on the data provided.
                </p>
              </div>

              {submitSuccess ? (
                <div className="form-success-banner animate-fade-in">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={36} className="text-emerald" />
                  </div>
                  <h4>Application Submitted Successfully!</h4>
                  <p>
                    Thank you for applying to become an OakShow critic. Your details have been sent to <strong>oakshow0@gmail.com</strong>.
                  </p>
                  <p className="sub-text">
                    Our team will review your profile and reach out via email/phone regarding your onboarding.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-outline-custom mt-3"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form 
                  action="https://formspree.io/oakshow0@gmail.com" 
                  method="POST" 
                  onSubmit={handleSubmit}
                  className="critic-application-form"
                >
                  {submitError && (
                    <div className="form-error-banner">
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="form-group">
                    <label htmlFor="careers-name" className="form-label">
                      <User size={14} className="label-icon" />
                      <span>Your Full Name <span className="req">*</span></span>
                    </label>
                    <input 
                      id="careers-name"
                      type="text" 
                      name="name" 
                      className="form-control-custom" 
                      placeholder="e.g. Rahul Sharma" 
                      required 
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-group">
                    <label htmlFor="careers-email" className="form-label">
                      <Mail size={14} className="label-icon" />
                      <span>Your Email Address <span className="req">*</span></span>
                    </label>
                    <input 
                      id="careers-email"
                      type="email" 
                      name="email" 
                      className="form-control-custom" 
                      placeholder="e.g. critic@example.com" 
                      required 
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="form-group">
                    <label htmlFor="careers-phone" className="form-label">
                      <Phone size={14} className="label-icon" />
                      <span>Phone / WhatsApp Number <span className="req">*</span></span>
                    </label>
                    <input 
                      id="careers-phone"
                      type="tel" 
                      name="phone" 
                      className="form-control-custom" 
                      placeholder="e.g. +91 98765 43210" 
                      required 
                      value={formState.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Specialty Domain Select */}
                  <div className="form-group">
                    <label htmlFor="careers-specialty" className="form-label">
                      <Film size={14} className="label-icon" />
                      <span>Primary Area of Criticism</span>
                    </label>
                    <select
                      id="careers-specialty"
                      name="specialty"
                      className="form-control-custom select-custom"
                      value={formState.specialty}
                      onChange={handleChange}
                    >
                      <option value="Movies & Series">Indian & Hollywood Cinema / Web Series</option>
                      <option value="South Indian Cinema">South Indian Cinema (Malayalam, Tamil, Telugu, Kannada)</option>
                      <option value="Hollywood & International">Hollywood & World Cinema</option>
                      <option value="Video Games">Video Games & Interactive Media</option>
                      <option value="Books & Literature">Books, Novels & Screenplays</option>
                      <option value="All Entertainment">All of the above (Generalist)</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="form-group">
                    <label htmlFor="careers-message" className="form-label">
                      <MessageSquare size={14} className="label-icon" />
                      <span>Message & Review Experience <span className="req">*</span></span>
                    </label>
                    <textarea 
                      id="careers-message"
                      name="message" 
                      rows={5}
                      className="form-control-custom textarea-custom" 
                      placeholder="Tell us about yourself, your favorite films or games, and include links or a brief sample review..." 
                      required 
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-submit-row">
                    <button 
                      type="submit" 
                      className="btn btn-primary submit-app-btn"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send size={16} className="ms-2" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="form-privacy-note">
                    🔒 Your information is safely transmitted directly to the OakShow editorial desk via Formspree and will only be used to evaluate your critic application.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* OakForce Section & Deadpool 2 Tribute Quote */}
        <section className="oakforce-section mt-5">
          <div className="oakforce-quote-banner glass-panel">
            <div className="oakforce-quote-content">
              <span className="quote-mark">“</span>
              <h4 className="oakforce-quote-text">
                Just for the record, our force is "Gender Neutral", "Race Neutral", "Religious Neutral" and "Political Neutral". We are the <strong>OakForce</strong>.
              </h4>
              <span className="oakforce-quote-author">PS: Thanks Deadpool 2</span>
            </div>
          </div>

          <div className="oakforce-media-container glass-panel mt-4">
            <div className="oakforce-header">
              <h3 className="oakforce-title">The OakForce</h3>
              <p className="oakforce-desc">Our collective of independent thinkers, movie enthusiasts, and culture critics.</p>
            </div>
            <div className="oakforce-image-wrap">
              <img 
                src="/images/Deadpool-X-Force-OakForce.jpg" 
                alt="The OakForce — Deadpool X-Force Tribute" 
                className="oakforce-banner-img"
                onError={(e) => {
                  e.target.src = 'http://oakshow.in/images/Deadpool-X-Force-OakForce.jpg';
                }}
              />
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .careers-page-root {
          min-height: 80vh;
          padding-bottom: 60px;
        }

        .careers-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .back-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .back-link-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: var(--bg-surface);
          transform: translateX(-2px);
        }

        .careers-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(217, 119, 6, 0.12);
          border: 1px solid rgba(217, 119, 6, 0.28);
          color: var(--accent-gold);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .live-ping {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-gold);
          box-shadow: 0 0 10px var(--accent-gold);
          animation: pulsePing 2s infinite;
        }

        @keyframes pulsePing {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }

        .careers-hero-card {
          padding: 40px;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
          margin-bottom: 36px;
          position: relative;
          overflow: hidden;
        }

        .careers-hero-card::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, var(--accent-primary-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .careers-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(2, 132, 199, 0.12);
          color: var(--accent-primary);
          border: 1px solid rgba(2, 132, 199, 0.25);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .careers-hero-title {
          font-family: var(--font-display);
          font-size: 2.6rem;
          font-weight: 900;
          color: var(--text-heading);
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .text-gradient-gold {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .careers-hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 750px;
          line-height: 1.6;
          margin: 0;
        }

        /* Video Section */
        .careers-video-section {
          margin-bottom: 48px;
        }

        .section-title-wrap {
          margin-bottom: 20px;
        }

        .section-main-heading {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 8px 0 6px;
        }

        .section-subtext {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0;
        }

        .video-player-container {
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .video-iframe-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 45%; /* 16:9 ratio tuned for elegance */
          min-height: 320px;
          background: #000000;
        }

        .video-iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .video-player-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: var(--bg-surface-elevated);
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 12px;
        }

        .video-footer-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .video-tag {
          font-size: 0.72rem;
          font-weight: 800;
          background: #0284c7;
          color: #ffffff;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.05em;
        }

        .video-title-desc {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .btn-outline-custom {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          padding: 6px 14px;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-outline-custom:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: var(--bg-surface);
        }

        /* Main Grid */
        .careers-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: flex-start;
        }

        /* Left Info Column */
        .careers-info-card {
          padding: 32px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .card-heading {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-heading);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .info-text-body p {
          color: var(--text-main);
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .highlight-quote {
          background: rgba(2, 132, 199, 0.06);
          border-left: 4px solid var(--accent-primary);
          padding: 12px 16px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-style: italic;
          color: var(--text-heading) !important;
        }

        .critic-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 28px 0;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .benefit-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .benefit-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .benefit-text strong {
          font-size: 0.95rem;
          color: var(--text-heading);
        }

        .benefit-text span {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .critic-profile-preview-box {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-top: 24px;
        }

        .preview-box-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }

        .preview-avatar {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          object-fit: cover;
          border: 2px solid var(--accent-primary);
          background: #ffffff;
        }

        .preview-header-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .preview-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent-primary);
          font-weight: 800;
        }

        .preview-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
        }

        .preview-badge {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .preview-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .preview-action-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: var(--radius-md);
          text-decoration: none;
        }

        /* Right Column Form */
        .application-form-card {
          padding: 32px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .form-card-header {
          margin-bottom: 24px;
        }

        .form-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 8px 0 6px;
        }

        .form-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.5;
        }

        .critic-application-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-heading);
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 0;
        }

        .label-icon {
          color: var(--accent-primary);
        }

        .req {
          color: var(--accent-red);
        }

        .form-control-custom {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 0.92rem;
          font-family: inherit;
          transition: all var(--transition-fast);
          outline: none;
        }

        .form-control-custom:focus {
          border-color: var(--accent-primary);
          background: var(--bg-surface);
          box-shadow: 0 0 0 3px var(--border-glow);
        }

        .select-custom {
          cursor: pointer;
        }

        .textarea-custom {
          resize: vertical;
          min-height: 110px;
        }

        .form-submit-row {
          margin-top: 6px;
        }

        .submit-app-btn {
          width: 100%;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 800;
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-fast);
        }

        .submit-app-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .form-privacy-note {
          font-size: 0.76rem;
          color: var(--text-dim);
          margin: 8px 0 0;
          line-height: 1.45;
          text-align: center;
        }

        .form-success-banner {
          text-align: center;
          padding: 36px 20px;
          background: rgba(5, 150, 105, 0.08);
          border: 1px solid rgba(5, 150, 105, 0.25);
          border-radius: var(--radius-lg);
        }

        .success-icon-wrap {
          margin-bottom: 16px;
        }

        .form-success-banner h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 8px;
        }

        .form-success-banner p {
          color: var(--text-main);
          font-size: 0.92rem;
          margin-bottom: 6px;
        }

        .form-success-banner .sub-text {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .form-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(225, 29, 72, 0.1);
          border: 1px solid rgba(225, 29, 72, 0.3);
          color: var(--accent-red);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* OakForce Section */
        .oakforce-quote-banner {
          padding: 28px 36px;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, rgba(48, 48, 127, 0.15) 0%, rgba(2, 132, 199, 0.08) 100%);
          border: 1px solid rgba(48, 48, 127, 0.25);
          text-align: center;
          position: relative;
        }

        .quote-mark {
          font-size: 3rem;
          line-height: 1;
          color: var(--accent-primary);
          font-family: serif;
          opacity: 0.4;
          display: block;
          margin-bottom: -10px;
        }

        .oakforce-quote-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-heading);
          max-width: 800px;
          margin: 0 auto 10px;
          line-height: 1.6;
        }

        .oakforce-quote-author {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .oakforce-media-container {
          padding: 24px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          text-align: center;
        }

        .oakforce-header {
          margin-bottom: 20px;
        }

        .oakforce-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--text-heading);
          margin-bottom: 6px;
        }

        .oakforce-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }

        .oakforce-image-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #000000;
          box-shadow: var(--shadow-md);
        }

        .oakforce-banner-img {
          width: 100%;
          max-height: 550px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .oakforce-banner-img:hover {
          transform: scale(1.01);
        }

        @media (max-width: 992px) {
          .careers-main-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .careers-hero-card {
            padding: 28px;
          }
          .careers-hero-title {
            font-size: 2.1rem;
          }
        }

        @media (max-width: 640px) {
          .careers-hero-title {
            font-size: 1.8rem;
          }
          .careers-hero-subtitle {
            font-size: 1rem;
          }
          .video-iframe-wrapper {
            min-height: 240px;
          }
          .careers-info-card, .application-form-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
