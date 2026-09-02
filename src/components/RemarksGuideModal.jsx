import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { OAKSHOW_REMARKS_LIST } from '../utils/remarks';

export default function RemarksGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="review-reader-backdrop animate-fade-in" onClick={onClose}>
      <div className="review-reader-dialog remarks-guide-dialog" onClick={e => e.stopPropagation()}>
        <button className="reader-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="remarks-guide-header">
          <div className="remarks-guide-icon-wrap">
            <Award size={32} className="text-gold" />
          </div>
          <div>
            <h2 className="remarks-guide-title">Various Remarks at OakShow and Their Meanings</h2>
            <p className="remarks-guide-subtitle">
              Official OakShow Verdict Certificates — Introduced July 24th, 2018
            </p>
          </div>
        </div>

        <div className="remarks-guide-body">
          <p className="remarks-intro-text">
            Based on its performance and nature, we at <strong>OakShow</strong> give 4 different remarks to each Movie, Series, Game, or Book. We introduced this concept from <strong>July 24th, 2018</strong> to help users immediately identify critically acclaimed titles. The 4 official remarks and their meanings are:
          </p>

          <div className="remarks-cards-list">
            {OAKSHOW_REMARKS_LIST.map((remark, idx) => (
              <div key={idx} className={`remark-card glass-card ${remark.badgeClass}`}>
                <div className="remark-card-icon-col">
                  <img 
                    src={remark.icon} 
                    alt={remark.title} 
                    className="remark-cert-logo-large"
                    onError={(e) => { e.target.src = '/favicon.png'; }}
                  />
                  <span className="remark-range-pill">{remark.range}</span>
                </div>

                <div className="remark-card-info-col">
                  <div className="remark-card-top-row">
                    <h3 className="remark-card-title">{remark.title}</h3>
                    <span className={`verdict-badge ${remark.badgeClass}`}>
                      {remark.shortLabel}
                    </span>
                  </div>
                  <p className="remark-card-desc">
                    {remark.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="remarks-guide-footer">
          <button className="btn btn-gold" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
