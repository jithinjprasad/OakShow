import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Send, 
  QrCode, 
  ExternalLink,
  Sparkles,
  Smartphone
} from 'lucide-react';

const XTwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M5.07 18.5h2.79v-8.37H5.07v8.37z"/>
  </svg>
);

export default function ShareModal({ 
  isOpen, 
  onClose, 
  title, 
  text, 
  url, 
  type = 'movie',
  rating = null,
  poster = null,
  description = null
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullUrl = url || window.location.href;
  const descText = description ? `\n\n"${description.substring(0, 160)}${description.length > 160 ? '...' : ''}"` : '';
  const shareText = text || `Check out ${title} on OakShow — verified ratings, critic reviews, trailers, and ticket bookings all in one place!${descText}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(`${shareText}\n${rating ? `⭐ Overall Score: ${rating} | ` : ''}Explore here: `);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#ffb800', '#e50914', '#00e5ff', '#ffffff']
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} — OakShow`,
          text: shareText,
          url: fullUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    } else {
      handleCopy();
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUrl}&bgcolor=0d1117&color=ffb800&margin=10`;

  return (
    <div className="share-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="share-modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="share-modal-header">
          <div className="share-header-title-wrap">
            <div className="share-icon-circle">
              <Share2 size={20} className="text-gold" />
            </div>
            <div>
              <h3>Share with Friends</h3>
              <p className="share-subtitle">Spread the word about <strong>{title}</strong></p>
            </div>
          </div>
          <button className="share-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Media Preview Badge */}
        <div className="share-preview-card">
          {poster && (
            <img 
              src={poster.startsWith('/') ? poster : `/${poster}`} 
              alt={title} 
              className="share-preview-poster"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <div className="share-preview-info">
            <span className="share-media-tag">{type.toUpperCase()}</span>
            <h4 className="share-preview-title">{title}</h4>
            {rating && <span className="share-preview-rating">⭐ {rating} Overall Score</span>}
            {description && <p className="share-preview-desc">{description.substring(0, 120)}{description.length > 120 ? '...' : ''}</p>}
            <span className="share-preview-site">oakshow.in</span>
          </div>
        </div>

        {/* Social Grid */}
        <div className="share-social-grid">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-btn-whatsapp"
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>

          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=OakShow,${type === 'movie' ? 'Movies,Cinema' : 'Entertainment'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-btn-twitter"
          >
            <XTwitterIcon size={20} />
            <span>X / Twitter</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-btn-linkedin"
          >
            <LinkedInIcon size={20} />
            <span>LinkedIn</span>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-btn-telegram"
          >
            <Send size={20} />
            <span>Telegram</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-btn share-btn-facebook"
          >
            <FacebookIcon size={20} />
            <span>Facebook</span>
          </a>

          {/* Native Device Share */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <button
              className="share-social-btn share-btn-device"
              onClick={handleNativeShare}
            >
              <Smartphone size={20} />
              <span>More Apps...</span>
            </button>
          )}
        </div>

        {/* Copy Link Input Bar */}
        <div className="share-link-box">
          <input 
            type="text" 
            readOnly 
            value={fullUrl} 
            className="share-link-input"
            onClick={e => e.target.select()}
          />
          <button 
            className={`btn btn-primary share-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* QR Code Scan Area */}
        <div className="share-qr-section">
          <div className="qr-img-wrap">
            <img src={qrCodeUrl} alt="QR Code for Page" className="qr-image" />
          </div>
          <div className="qr-text">
            <div className="qr-badge">
              <QrCode size={13} />
              <span>Instant QR Scan</span>
            </div>
            <p>Scan with any phone camera or Google Lens to immediately open on mobile.</p>
          </div>
        </div>

        {/* Official OakShow Links Footer */}
        <div className="share-modal-official-links">
          <span>Connect with OakShow:</span>
          <a href="https://www.youtube.com/@OakShow" target="_blank" rel="noreferrer" className="official-link">
            YouTube (@OakShow)
          </a>
          <span>•</span>
          <a href="https://www.linkedin.com/company/oakshow" target="_blank" rel="noreferrer" className="official-link">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
