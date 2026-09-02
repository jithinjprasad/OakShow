import React from 'react';
import { ShieldCheck, X, FileText, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export default function CopyrightPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="policy-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="policy-modal-dialog glass-panel" onClick={e => e.stopPropagation()}>
        <button className="policy-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="policy-header">
          <div className="policy-icon-wrap">
            <ShieldCheck size={28} className="text-gold" />
          </div>
          <div>
            <h2 className="policy-title">Copyright & Intellectual Property Policy</h2>
            <span className="policy-subtitle">Official OakShow Content & Takedown Guidelines</span>
          </div>
        </div>

        <div className="policy-body">
          <div className="policy-notice-box">
            <AlertCircle size={20} className="text-gold flex-shrink-0" />
            <p>
              To the best of our knowledge, OakShow never intends to upload or distribute copyrighted content without authorization. All movie posters, trailers, logos, and promotional trademarks belong strictly to their respective production studios, artists, and distributors.
            </p>
          </div>

          <div className="policy-section">
            <h3>Our Commitment to Content Rights</h3>
            <p>
              OakShow is a cinema criticism, cataloging, and ratings directory. We respect the intellectual property of original content creators. If you believe any page, review banner, or media asset violates your copyright policies, please contact us with the relevant verification details.
            </p>
          </div>

          <div className="policy-section">
            <h3>Expedited Notice & Takedown Procedure</h3>
            <p>
              Upon receiving a valid copyright notification, our editorial and legal team will review the claim, immediately take down the disputed material, and restrict access until full compliance with your rights has been verified.
            </p>
          </div>

          <div className="policy-contact-box">
            <h4><Mail size={16} className="text-red inline-icon me-1" /> Submit a Copyright Notice or Takedown Request</h4>
            <p>Email our designated compliance desk directly with the affected link and proof of ownership:</p>
            <a href="mailto:oakshow0@gmail.com?subject=Copyright%20Inquiry%20-%20OakShow" className="policy-email-btn">
              <span>Contact Compliance Desk: oakshow0@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="policy-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
}
