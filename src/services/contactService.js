/**
 * Contact form API service layer.
 *
 * Strategy:
 *   1. Uses EmailJS (client-side email service) for sending contact form submissions.
 *   2. Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.
 *   3. Falls back gracefully if environment variables are missing.
 *
 * To activate:
 *   1. Create a free account at https://www.emailjs.com
 *   2. Add an email service (Gmail, Outlook, etc.) in EmailJS dashboard
 *   3. Create an email template with variables: {{name}}, {{email}}, {{projectType}}, {{message}}
 *   4. Add your Service ID, Template ID, and Public Key to your .env file
 */

import emailjs from '@emailjs/browser';

/**
 * @typedef {Object} ContactFormData
 * @property {string} name
 * @property {string} email
 * @property {string} projectType
 * @property {string} message
 * @property {string} [phone] - Optional phone/WhatsApp number
 * @property {string} [company] - Optional company/organization name
 * @property {string} [budget] - Optional budget range
 */

/**
 * @typedef {Object} SubmitResult
 * @property {boolean} success
 * @property {string}  message
 */

/**
 * Submits a contact inquiry via EmailJS.
 *
 * @param {ContactFormData} formData
 * @returns {Promise<SubmitResult>}
 */
export async function submitContactForm(formData) {
  // Get and trim environment variables (defensive against leading/trailing whitespace)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  // Check if EmailJS credentials are configured
  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      '[ContactService] EmailJS credentials are not set. ' +
        'Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file. ' +
        'See https://www.emailjs.com for setup instructions.'
    );
    
    console.warn('[ContactService] Missing credentials:', {
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
    });
    
    // Simulate success in demo mode so the UI can be tested
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      success: true,
      message:
        'Message received! (Running in demo mode — configure EmailJS credentials in .env for live delivery.)',
    };
  }

  try {
    // Log that we're attempting to send (without exposing full credentials)
    console.log('[ContactService] Attempting to send email via EmailJS...', {
      serviceId: serviceId.substring(0, 8) + '...',
      templateId: templateId.substring(0, 8) + '...',
      hasPublicKey: !!publicKey,
    });

    // Prepare template parameters for EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      message: formData.message,
      phone: formData.phone || 'Not provided',
      company: formData.company || 'Not provided',
      budget: formData.budget || 'Not specified',
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      {
        publicKey: publicKey,
      }
    );

    console.log('[ContactService] EmailJS response:', response);

    // EmailJS returns a response with status 200 on success
    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully. Our team will get back to you shortly.',
      };
    }

    // Unexpected response status
    console.error('[ContactService] Unexpected response status:', response.status);
    return {
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    };
  } catch (error) {
    console.error('[ContactService] EmailJS error:', error);
    console.error('[ContactService] Error details:', {
      name: error.name,
      message: error.message,
      text: error.text,
    });
    
    return {
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    };
  }
}
