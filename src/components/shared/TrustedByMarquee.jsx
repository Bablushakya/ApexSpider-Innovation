import React from 'react';
import { TRUSTED_LOGOS } from '../../constants/trustedLogos';
import './TrustedByMarquee.css';

export default function TrustedByMarquee({ title = "Trusted by modern enterprises & startup founders" }) {
  return (
    <div className="shared-trusted-section">
      {title && (
        <div className="shared-trusted-eyebrow">
          <span>{title}</span>
        </div>
      )}

      <div className="shared-trusted-marquee-container" aria-label="Trusted by partner organizations">
        <div className="shared-trusted-marquee-track">
          {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, idx) => (
            <div key={`${logo.id}-${idx}`} className="shared-trusted-card">
              <div className="shared-trusted-emblem" aria-hidden="true">
                {logo.icon}
              </div>
              <div className="shared-trusted-info">
                <span className="shared-trusted-name">{logo.name}</span>
                <span className="shared-trusted-sub">{logo.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
