import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Send, 
  QrCode, 
  Smartphone, 
  Heart,
  Sparkles,
  Link2
} from 'lucide-react';
import ShareModal from './ShareModal';

// Custom SVG Icons for X / Twitter, Facebook & LinkedIn
export const XTwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M5.07 18.5h2.79v-8.37H5.07v8.37z"/>
  </svg>
);

export default function ShareBar({ 
  title, 
  type = 'movie', 
  rating = null, 
  poster = null, 
  description = null,
  customUrl = null,
  year = null,
  language = null 
}) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fullUrl = customUrl || window.location.href;
  const descSnippet = description ? `\n"${description.substring(0, 150)}${description.length > 150 ? '...' : ''}"` : '';
  const shareText = `Check out ${title} ${year ? `(${year})` : ''} on OakShow — complete verified ratings, critic reviews, trailers, and ticket bookings all in one place!${descSnippet}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(`${shareText}\n⭐ ${rating ? `Overall Score: ${rating} | ` : ''}Explore here: `);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
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
        if (err.name !== 'AbortError') console.error(err);
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <section className="share-suite-section glass-panel" id="share-section">
        <div className="share-suite-inner">
          {/* Header */}
          <div className="share-badge-pill">
            <Sparkles size={14} className="text-gold" />
            <span>Share With Friends</span>
          </div>
          <h3 className="share-suite-title">
            Enjoying <span>{title}</span>? Share this page!
          </h3>
          <p className="share-suite-desc">
            Send this single-place ratings & bookings link to your movie group, friends, or professional network.
          </p>

          {/* Action Row */}
          <div className="share-suite-buttons-row">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn-wa"
              title="Share on WhatsApp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=OakShow,${type === 'series' ? 'TVSeries' : 'Movies,Cinema'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn-tw"
              title="Post on X (Twitter)"
            >
              <XTwitterIcon size={18} />
              <span>Post to X</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn-li"
              title="Share on LinkedIn"
            >
              <LinkedInIcon size={18} />
              <span>LinkedIn</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn-tg"
              title="Share on Telegram"
            >
              <Send size={18} />
              <span>Telegram</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn-fb"
              title="Share on Facebook"
            >
              <FacebookIcon size={18} />
              <span>Facebook</span>
            </a>

            {/* Web Share Native Trigger (Mobile) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button 
                className="share-btn share-btn-native"
                onClick={handleNativeShare}
                title="Open native mobile share sheet"
              >
                <Smartphone size={18} />
                <span>Share via App</span>
              </button>
            )}

            {/* QR Code Trigger */}
            <button 
              className="share-btn share-btn-qr"
              onClick={() => setModalOpen(true)}
              title="Generate QR code for mobile scanning"
            >
              <QrCode size={18} />
              <span>QR Code</span>
            </button>

            {/* Direct Copy Link */}
            <button 
              className={`share-btn share-btn-copy ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title="Copy link to clipboard"
            >
              {copied ? <Check size={18} className="text-gold" /> : <Copy size={18} />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      <ShareModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        text={shareText}
        url={fullUrl}
        type={type}
        rating={rating}
        poster={poster}
        description={description}
      />
    </>
  );
}
