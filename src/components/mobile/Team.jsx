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

  return (
    <motion.article
      className="mobile-team-card"
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
          </div>
        )}
        <div className="mobile-team-photo-gradient" aria-hidden="true" />
      </div>

      {/* Card Content: Name -> Role -> Focus */}
      <div className="mobile-team-card-info">
        <div className="mobile-team-header-block">
          <h3 className="mobile-team-member-name">{member.name}</h3>
          <p className="mobile-team-member-role">{member.role}</p>
        </div>
        <p className="mobile-team-member-focus">{member.focus}</p>
      </div>
    </motion.article>
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
