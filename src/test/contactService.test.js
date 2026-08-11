import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import emailjs from '@emailjs/browser';
import { submitContactForm } from '../services/contactService';

const VALID_FORM = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  projectType: 'Custom Software',
  message: 'I need a scalable dashboard system.',
};

describe('submitContactForm', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', '');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns success in demo mode (no API key)', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = await submitContactForm(VALID_FORM);
    expect(result.success).toBe(true);
    expect(result.message).toContain('demo mode');
  });

  it('returns error on network failure when credentials are set', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_123');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_123');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_123');
    vi.spyOn(emailjs, 'send').mockRejectedValueOnce(new Error('Network error'));

    const result = await submitContactForm(VALID_FORM);
    expect(result.success).toBe(false);
    expect(result.message).toContain('Something went wrong');
  });

  it('returns success when API returns status 200', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_123');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_123');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_123');
    vi.spyOn(emailjs, 'send').mockResolvedValueOnce({ status: 200, text: 'OK' });

    const result = await submitContactForm(VALID_FORM);
    expect(result.success).toBe(true);
    expect(result.message).toContain('sent successfully');
  });
});

