import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEAM_CONTENT, TEAM_MEMBERS } from '../../constants/team';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Team.css';

function MobileTeamCard({ member, index }) {
  const [imgSrc, setImgSrc] = useState(member.image);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleImageError = () => {
    if (imgSrc !== member.fallbackImage && member.fallbackImage) {
      setImgSrc(member.fallbackImage);
    } else {
      setHasError(true);
    }
  };

  const hasSocials = member.socials && (member.socials.linkedin || member.socials.github);

  return (
    <motion.div
      className="mobile-team-card glass-panel"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: EASE.premium,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
    >
      {/* Photo Container */}
      <div className="mobile-team-photo-frame">
        {!hasError ? (
          <img
            src={imgSrc}
            alt={member.imageAlt}
            className="mobile-team-photo"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="mobile-team-photo-fallback" aria-label={member.name}>
            <div className="mobile-team-fallback-avatar">
              <span className="mobile-team-fallback-initials">{member.initials}</span>
            </div>
            <span className="mobile-team-fallback-tag">APEX SPIDER</span>
          </div>
        )}
        <div className="mobile-team-photo-overlay" aria-hidden="true" />
      </div>

      {/* Card Content */}
      <div className="mobile-team-card-content">
        <h3 className="mobile-team-member-name">{member.name}</h3>

        <div className="mobile-team-designation-badge">
          <span>{member.designation}</span>
        </div>

        <div className="mobile-team-role-row">
          <span className="mobile-team-meta-label">Role</span>
          <span className="mobile-team-role-value">{member.role}</span>
        </div>

        <div className="mobile-team-focus-block">
          <span className="mobile-team-meta-label">Focus</span>
          <p className="mobile-team-focus-value">{member.focus}</p>
        </div>

        {hasSocials && (
          <div className="mobile-team-social-links" aria-label={`${member.name} social profiles`}>
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-team-social-btn"
                aria-label={`${member.name} on LinkedIn`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.69c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-team-social-btn"
                aria-label={`${member.name} on GitHub`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MobileTeam() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mobile-team-section section-padding" id="team" aria-labelledby="mobile-team-heading">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: EASE.premium }}
        >
          <span className="tag">{TEAM_CONTENT.tag}</span>
          <h2 id="mobile-team-heading">{TEAM_CONTENT.title}</h2>
          <p>{TEAM_CONTENT.description}</p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="mobile-team-grid">
          {TEAM_MEMBERS.map((member, i) => (
            <MobileTeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
