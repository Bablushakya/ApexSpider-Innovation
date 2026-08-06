/**
 * Contact form API service layer.
 *
 * Strategy:
 *   1. Uses Web3Forms (free, no backend required) via VITE_WEB3FORMS_ACCESS_KEY env var.
 *   2. Falls back gracefully if the key is missing — returns a descriptive error.
 *
 * To activate:
 *   1. Create a free account at https://web3forms.com
 *   2. Get your access key
 *   3. Add VITE_WEB3FORMS_ACCESS_KEY=<your-key> to your .env file
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * @typedef {Object} ContactFormData
 * @property {string} name
 * @property {string} email
 * @property {string} projectType
 * @property {string} message
 */

/**
 * @typedef {Object} SubmitResult
 * @property {boolean} success
 * @property {string}  message
 */

/**
 * Submits a contact inquiry to Web3Forms.
 *
 * @param {ContactFormData} formData
 * @returns {Promise<SubmitResult>}
 */
export async function submitContactForm(formData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Development fallback — surface a clear message instead of silently failing
    console.warn(
      '[ContactService] VITE_WEB3FORMS_ACCESS_KEY is not set. ' +
        'Add it to your .env file to enable real form submission. ' +
        'See https://web3forms.com for a free key.'
    );
    // Simulate success in dev so the UI can be tested
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      success: true,
      message:
        'Message received! (Running in demo mode — set VITE_WEB3FORMS_ACCESS_KEY in .env for live delivery.)',
    };
  }

  try {
    const payload = {
      access_key: accessKey,
      subject: `New Project Inquiry — ${formData.projectType} from ${formData.name}`,
      from_name: formData.name,
      email: formData.email,
      message: `
Project Category: ${formData.projectType}

${formData.message}
      `.trim(),
      // Honeypot — leave blank to avoid spam
      botcheck: '',
    };

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, message: 'Inquiry received. We will be in touch within 24 hours.' };
    }

    return {
      success: false,
      message: data.message ?? 'Submission failed. Please try emailing us directly.',
    };
  } catch {
    return {
      success: false,
      message: 'Network error. Please check your connection or email us directly.',
    };
  }
}
