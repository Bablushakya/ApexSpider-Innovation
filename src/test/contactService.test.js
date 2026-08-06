import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitContactForm } from '../services/contactService';

const VALID_FORM = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  projectType: 'Custom Software',
  message: 'I need a scalable dashboard system.',
};

describe('submitContactForm', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
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

  it('returns error on network failure when key is set', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'fake-key');
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));
    const result = await submitContactForm(VALID_FORM);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/network error/i);
  });

  it('returns error when API returns failure', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'fake-key');
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => ({ success: false, message: 'Invalid key' }),
    });
    const result = await submitContactForm(VALID_FORM);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid key');
  });

  it('returns success when API returns success', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'fake-key');
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });
    const result = await submitContactForm(VALID_FORM);
    expect(result.success).toBe(true);
    expect(result.message).toContain('24 hours');
  });
});
