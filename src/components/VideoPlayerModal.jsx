import React from 'react';
import { X } from 'lucide-react';
import { getYoutubeId } from '../utils/mediaUtils';

export default function VideoPlayerModal({ video, onClose }) {
  const ytid = getYoutubeId(video);
  if (!video || !ytid) return null;

  return (
    <div className="video-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="video-modal-dialog" onClick={e => e.stopPropagation()}>
        <button className="video-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <div className="video-modal-iframe-wrap">
          <iframe
            title={video.title || 'Trailer'}
            src={`https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-modal-iframe"
          />
        </div>

        <div className="video-modal-info">
          <h3 className="video-modal-title">{video.title || 'Official Trailer'}</h3>
        </div>
      </div>

      <style>{`
        .video-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 5, 8, 0.92);
          backdrop-filter: blur(16px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .video-modal-dialog {
          width: 100%;
          max-width: 900px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(229, 9, 20, 0.2);
        }
        .video-modal-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-subtle);
          z-index: 10;
          transition: all var(--transition-fast);
        }
        .video-modal-close-btn:hover {
          background: var(--accent-red);
          transform: scale(1.1);
        }
        .video-modal-iframe-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 */
          background: #000000;
        }
        .video-modal-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .video-modal-info {
          padding: 16px 20px;
        }
        .video-modal-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
