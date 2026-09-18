import React, { useEffect } from 'react';
import { Award, ArrowLeft } from 'lucide-react';
import { OAKSHOW_REMARKS_LIST } from '../utils/remarks';

export default function RemarksGuidePage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="remarks-page-container">
      <style>{`
        .remarks-page-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }
        
        .remarks-page-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .remarks-page-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.1);
          margin-bottom: 24px;
        }

        .remarks-page-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 16px;
        }

        .remarks-page-subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .remarks-intro-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-main);
          margin-bottom: 48px;
          text-align: center;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .remarks-cards-grid {
          display: grid;
          gap: 24px;
        }

        .remarks-page-card {
          display: flex;
          gap: 24px;
          padding: 32px;
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
          align-items: center;
        }

        .remarks-page-card-icon {
          width: 100px;
          height: 100px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .remarks-page-card-info {
          flex-grow: 1;
        }

        .remarks-page-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .remarks-page-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
        }

        .remarks-page-card-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-main);
          margin: 0;
        }

        .remarks-page-card .verdict-badge {
          position: static;
        }

        @media (max-width: 768px) {
          .remarks-page-title {
            font-size: 2rem;
          }
          .remarks-page-card {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }
          .remarks-page-card-header {
            flex-direction: column;
            justify-content: center;
          }
        }
      `}</style>

      <div className="remarks-page-header">
        <div className="remarks-page-icon-wrap">
          <Award size={40} className="text-gold" />
        </div>
        <h1 className="remarks-page-title">Various Remarks at OakShow and Their Meanings</h1>
        <p className="remarks-page-subtitle">
          Official OakShow Verdict Certificates — Introduced July 24th, 2018
        </p>
      </div>

      <p className="remarks-intro-text">
        Based on its performance and nature, we at <strong>OakShow</strong> give 4 different remarks to each Movie, Series, Game, or Book. We introduced this concept from <strong>July 24th, 2018</strong> to help users immediately identify critically acclaimed titles. The 4 official remarks and their meanings are:
      </p>

      <div className="remarks-cards-grid">
        {OAKSHOW_REMARKS_LIST.map((remark, idx) => (
          <div key={idx} className={`remarks-page-card ${remark.badgeClass}`}>
            <img 
              src={remark.icon} 
              alt={remark.title} 
              className="remarks-page-card-icon"
              onError={(e) => { e.target.src = '/favicon.png'; }}
            />
            <div className="remarks-page-card-info">
              <div className="remarks-page-card-header">
                <h3 className="remarks-page-card-title">{remark.title}</h3>
                <span className={`verdict-badge ${remark.badgeClass}`}>
                  {remark.range}
                </span>
              </div>
              <p className="remarks-page-card-desc">
                {remark.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
