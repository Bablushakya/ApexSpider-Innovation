/**
 * Contact form API service layer.
 *
 * Strategy:
 *   1. Uses EmailJS (client-side email service) for sending contact form submissions.
 *   2. Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.
 *   3. Falls back gracefully if environment variables are missing.
 *
 * Email routing:
 *   - The EmailJS service/template must be configured in the EmailJS dashboard to
 *     deliver to info@apexspiderinnovation.com.
 *   - The visitor's email is passed as {{reply_to}} so the business can reply directly
 *     to the visitor without manual copy-paste.
 *
 * To activate:
 *   1. Create a free account at https://www.emailjs.com
 *   2. Add an email service connected to info@apexspiderinnovation.com
 *   3. Create an email template using the variables listed in templateParams below
 *   4. Set the template's "To Email" to info@apexspiderinnovation.com
 *   5. Set the template's "Reply To" field to {{reply_to}}
 *   6. Add your Service ID, Template ID, and Public Key to your .env file
 */

import emailjs from '@emailjs/browser';
import { logger } from '../utils/logger';

/**
 * @typedef {Object} ContactFormData
 * @property {string} name
 * @property {string} email
 * @property {string} projectType
 * @property {string} message
 * @property {string} [phone]   - Optional phone/WhatsApp number
 * @property {string} [company] - Optional company/organization name
 * @property {string} [budget]  - Optional budget range
 */

/**
 * @typedef {Object} SubmitResult
 * @property {boolean} success
 * @property {string}  message
 */

/**
 * Submits a contact inquiry via EmailJS.
 *
 * Template variables sent:
 *   {{subject}}      — Email subject line, e.g. "New Website Inquiry — Jane Doe"
 *   {{name}}         — Visitor's full name
 *   {{reply_to}}     — Visitor's email address (set as Reply-To so business can reply directly)
 *   {{email}}        — Visitor's email address (visible in email body)
 *   {{phone}}        — Phone/WhatsApp number, or "Not provided"
 *   {{company}}      — Company/organisation name, or "Not provided"
 *   {{projectType}}  — Selected project category
 *   {{budget}}       — Selected budget range, or "Not specified"
 *   {{message}}      — Visitor's project description
 *   {{submitted_at}} — ISO timestamp of submission
 *
 * @param {ContactFormData} formData
 * @returns {Promise<SubmitResult>}
 */
export async function submitContactForm(formData) {
  // Get and trim environment variables (defensive against leading/trailing whitespace)
  const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  // Check if EmailJS credentials are configured
  if (!serviceId || !templateId || !publicKey) {
    logger.warn(
      '[ContactService] EmailJS credentials are not set. ' +
        'Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file. ' +
        'See https://www.emailjs.com for setup instructions.'
    );
    logger.warn('[ContactService] Missing credentials:', {
      hasServiceId:  !!serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey:  !!publicKey,
    });

    // Simulate success in demo mode so the UI can be tested without live credentials
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      success: true,
      message:
        'Message received! (Running in demo mode — configure EmailJS credentials in .env for live delivery.)',
    };
  }

  try {
    logger.log('[ContactService] Attempting to send email via EmailJS...', {
      serviceId:    serviceId.substring(0, 8) + '...',
      templateId:   templateId.substring(0, 8) + '...',
      hasPublicKey: !!publicKey,
    });

    // Template parameters — all variables available to the EmailJS template.
    // reply_to is the visitor's email so the business can click Reply and respond directly.
    // subject is passed as a variable so the template can use it as the email subject line.
    const templateParams = {
      subject:       `New Website Inquiry — ${formData.name}`,
      name:          formData.name,
      reply_to:      formData.email,
      email:         formData.email,
      phone:         formData.phone    || 'Not provided',
      company:       formData.company  || 'Not provided',
      projectType:   formData.projectType,
      budget:        formData.budget   || 'Not specified',
      message:       formData.message,
      submitted_at:  new Date().toISOString(),
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      { publicKey }
    );

    logger.log('[ContactService] EmailJS response:', response);

    if (response.status === 200) {
      return {
        success: true,
        message:
          'Thank you! Your inquiry has been submitted successfully. Our team will get back to you soon.',
      };
    }

    logger.error('[ContactService] Unexpected response status:', response.status);
    return {
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    };
  } catch (error) {
    logger.error('[ContactService] EmailJS error:', error);
    logger.error('[ContactService] Error details:', {
      name:    error.name,
      message: error.message,
      text:    error.text,
    });

    return {
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    };
  }
}
