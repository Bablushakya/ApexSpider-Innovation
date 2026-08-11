import { describe, it, expect } from 'vitest';
import { validateContactForm } from '../utils/formValidation';

const VALID = {
  name:        'Jane Doe',
  email:       'jane@example.com',
  projectType: 'Web Development',
  message:     'I need a scalable dashboard system.',
};

describe('validateContactForm', () => {
  // ── Name ──────────────────────────────────────────────────────
  it('returns name error when name is empty', () => {
    const errors = validateContactForm({ ...VALID, name: '' });
    expect(errors.name).toBeTruthy();
  });

  it('returns name error when name is only whitespace', () => {
    const errors = validateContactForm({ ...VALID, name: '   ' });
    expect(errors.name).toBeTruthy();
  });

  it('passes when name is valid', () => {
    const errors = validateContactForm(VALID);
    expect(errors.name).toBeUndefined();
  });

  // ── Email ─────────────────────────────────────────────────────
  it('returns email error when email is empty', () => {
    const errors = validateContactForm({ ...VALID, email: '' });
    expect(errors.email).toBeTruthy();
  });

  it('returns email error when email has no @', () => {
    const errors = validateContactForm({ ...VALID, email: 'notanemail' });
    expect(errors.email).toBeTruthy();
  });

  it('returns email error for email missing domain', () => {
    const errors = validateContactForm({ ...VALID, email: 'user@' });
    expect(errors.email).toBeTruthy();
  });

  it('passes for valid email', () => {
    const errors = validateContactForm(VALID);
    expect(errors.email).toBeUndefined();
  });

  // ── Message ───────────────────────────────────────────────────
  it('returns message error when message is empty', () => {
    const errors = validateContactForm({ ...VALID, message: '' });
    expect(errors.message).toBeTruthy();
  });

  it('returns message error when below minMessageLength (default 10)', () => {
    const errors = validateContactForm({ ...VALID, message: 'Short' });
    expect(errors.message).toBeTruthy();
  });

  it('passes when message meets default min length (10)', () => {
    const errors = validateContactForm({ ...VALID, message: '1234567890' });
    expect(errors.message).toBeUndefined();
  });

  // ── Config: minMessageLength ──────────────────────────────────
  it('enforces custom minMessageLength: 20', () => {
    const errors = validateContactForm(
      { ...VALID, message: 'Too short msg' },
      { minMessageLength: 20 }
    );
    expect(errors.message).toBeTruthy();
  });

  it('passes when message meets custom min length: 20', () => {
    const errors = validateContactForm(
      { ...VALID, message: 'This message is long enough for 20 chars.' },
      { minMessageLength: 20 }
    );
    expect(errors.message).toBeUndefined();
  });

  // ── Config: requireProjectType ────────────────────────────────
  it('does NOT error on missing projectType by default', () => {
    const errors = validateContactForm({ ...VALID, projectType: '' });
    expect(errors.projectType).toBeUndefined();
  });

  it('errors when projectType is empty and requireProjectType is true', () => {
    const errors = validateContactForm(
      { ...VALID, projectType: '' },
      { requireProjectType: true }
    );
    expect(errors.projectType).toBeTruthy();
  });

  // ── Happy path ────────────────────────────────────────────────
  it('returns empty errors object for fully valid data', () => {
    const errors = validateContactForm(VALID);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns empty errors for valid data with custom config', () => {
    const errors = validateContactForm(
      { ...VALID, message: 'This is a detailed project description.' },
      { minMessageLength: 20, requireProjectType: true }
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
