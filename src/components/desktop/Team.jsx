import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEAM_CONTENT, TEAM_MEMBERS } from '../../constants/team';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Team.css';

function TeamCard({ member, index }) {
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
    <motion.div
      className="team-card-wrapper"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: EASE.premium,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      }}
    >
      <article className="team-card">
        {/* Photo Container */}
        <div className="team-photo-frame">
          {!hasError ? (
            <img
              src={imgSrc}
              alt={member.imageAlt}
              className="team-photo"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="team-photo-fallback" aria-label={member.name}>
              <div className="team-fallback-avatar">
                <span className="team-fallback-initials">{member.initials}</span>
              </div>
            </div>
          )}
          <div className="team-photo-gradient" aria-hidden="true" />
        </div>

        {/* Card Content: Name -> Role -> Focus */}
        <div className="team-card-info">
          <div className="team-header-block">
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-role">{member.role}</p>
          </div>
          <p className="team-member-focus">{member.focus}</p>
        </div>
      </article>
    </motion.div>
  );
}

export default function Team() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="team-section section-padding" id="team" aria-labelledby="team-heading">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">{TEAM_CONTENT.tag}</span>
          <h2 id="team-heading">{TEAM_CONTENT.title}</h2>
          <p>{TEAM_CONTENT.description}</p>
        </motion.div>

        {/* 4-Card Grid */}
        <div className="team-grid">
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
