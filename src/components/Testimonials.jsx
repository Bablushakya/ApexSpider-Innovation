import React from 'react';
import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The component layouts provided were highly structured and integrated seamlessly into our web systems. Excellent attention to clean styling parameters.",
      author: "Lead Architect",
      company: "Startup Alpha Demo",
      initials: "SA"
    },
    {
      quote: "A highly collaborative and transparent engineering cycle. The resulting dashboard prototype has become the blueprint for our internal production tools.",
      author: "VP of Engineering",
      company: "Enterprise Beta Concept",
      initials: "EB"
    },
    {
      quote: "Refined visual styling, solid React file structures, and rapid development cycles. An exceptional engineering resource for teams looking to build and iterate quickly.",
      author: "Product Director",
      company: "Digital Delta Sample",
      initials: "DD"
    }
  ];

  return (
    <section className="testimonials-section section-padding" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Testimonials</span>
          <h2>Client Feedback Mockup</h2>
          <p>Sample reviews representing design feedback, engineering quality, and collaboration outcomes.</p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-panel testimonial-card">
              {/* Quote mark icon */}
              <span className="quote-mark">“</span>
              
              <p className="testimonial-quote">{t.quote}</p>
              
              <div className="testimonial-footer">
                <div className="author-avatar">
                  {t.initials}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{t.author}</h4>
                  <span className="author-company">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
