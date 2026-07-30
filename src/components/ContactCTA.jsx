import React, { useState } from 'react';
import './ContactCTA.css';

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Custom Software',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'Custom Software',
    'Web Application',
    'UI/UX Prototyping',
    'Workflow Automation',
    'Technical Consultation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error on input change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) {
      formErrors.message = 'Message details are required';
    } else if (formData.message.trim().length < 10) {
      formErrors.message = 'Please provide at least 10 characters of description';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Custom Software',
        message: ''
      });
    }, 1500);
  };

  return (
    <section className="contact-section section-padding" id="contact">
      {/* Glow background blobs */}
      <div className="glow-blob glow-blob-indigo contact-blob-1"></div>
      <div className="glow-blob glow-blob-teal contact-blob-2"></div>

      <div className="container contact-container">
        {/* Left Column: text and contact details */}
        <div className="contact-details">
          <span className="tag">Get In Touch</span>
          <h2 className="contact-title">Let's build something <span className="text-gradient-cyan">exceptional</span>.</h2>
          <p className="contact-desc">
            Submit your requirements to initiate an architecture layout review and obtain a prototype estimate.
          </p>

          <div className="contact-info-block">
            <h4 className="info-title">Primary Communications</h4>
            <a href="mailto:info@apexspiderinnovation.com" className="contact-email-link">
              info@apexspiderinnovation.com
            </a>
            <span className="email-fallback">Alternative: apexspiderinnovation@gmail.com</span>
          </div>

          <div className="contact-status-note">
            <span className="pulse-dot"></span>
            <span className="status-text">Available for custom sprints</span>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-wrapper">
          <div className="glass-panel contact-card">
            {isSubmitted ? (
              <div className="form-success-message">
                <div className="success-icon">✓</div>
                <h3>Prototype Inquiry Received</h3>
                <p>
                  Your message has been simulated successfully! In production, this form will trigger a secure webhook or database write.
                </p>
                <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="projectType" className="form-label">Project Category</label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="form-input form-select"
                    value={formData.projectType}
                    onChange={handleInputChange}
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Project Description</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-input form-textarea"
                    placeholder="Describe your architecture requirements, timeline details, or visual preferences..."
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Processing Simulation...
                    </>
                  ) : (
                    'Submit Scoping Form'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
