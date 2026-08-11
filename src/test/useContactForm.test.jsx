import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../hooks/useContactForm';

// Mock contactService so no real HTTP calls are made
vi.mock('../services/contactService', () => ({
  submitContactForm: vi.fn(),
}));

import { submitContactForm } from '../services/contactService';

const INITIAL_FORM = {
  name:        '',
  email:       '',
  projectType: 'Custom Software',
  message:     '',
};

const VALID_DATA = {
  name:        'Jane Doe',
  email:       'jane@example.com',
  projectType: 'Custom Software',
  message:     'This is a valid project description.',
};

const CONFIG = { minMessageLength: 10 };

afterEach(() => {
  vi.clearAllMocks();
});

describe('useContactForm', () => {
  it('initialises with the provided initial form data', () => {
    const { result } = renderHook(() => useContactForm(INITIAL_FORM, CONFIG));
    expect(result.current.formData).toEqual(INITIAL_FORM);
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitResult).toBeNull();
  });

  it('handleChange updates formData and clears field error', () => {
    const { result } = renderHook(() => useContactForm(INITIAL_FORM, CONFIG));

    // Set an error first by submitting with empty data
    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Jane' } });
    });

    expect(result.current.formData.name).toBe('Jane');
    expect(result.current.errors.name).toBeFalsy();
  });

  it('handleSubmit sets errors and does NOT submit when validation fails', async () => {
    submitContactForm.mockResolvedValue({ success: true, message: 'OK' });
    const { result } = renderHook(() => useContactForm(INITIAL_FORM, CONFIG));

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.errors).not.toEqual({});
    expect(submitContactForm).not.toHaveBeenCalled();
  });

  it('handleSubmit calls submitContactForm and sets success result', async () => {
    submitContactForm.mockResolvedValue({ success: true, message: 'Sent!' });
    const { result } = renderHook(() => useContactForm(INITIAL_FORM, CONFIG));

    // Fill all fields
    act(() => {
      Object.entries(VALID_DATA).forEach(([name, value]) => {
        result.current.handleChange({ target: { name, value } });
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(submitContactForm).toHaveBeenCalledOnce();
    expect(result.current.submitResult).toEqual({ success: true, message: 'Sent!' });
    expect(result.current.isSubmitting).toBe(false);
    // On success, formData should be reset
    expect(result.current.formData).toEqual(INITIAL_FORM);
  });

  it('handleSubmit sets failure result when service returns success:false', async () => {
    submitContactForm.mockResolvedValue({ success: false, message: 'Error!' });
    const { result } = renderHook(() => useContactForm(INITIAL_FORM, CONFIG));

    act(() => {
      Object.entries(VALID_DATA).forEach(([name, value]) => {
        result.current.handleChange({ target: { name, value } });
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.submitResult).toEqual({ success: false, message: 'Error!' });
    // On failure, formData should NOT be reset
    expect(result.current.formData.name).toBe(VALID_DATA.name);
  });

  it('handleReset clears submitResult, formData, and errors', async () => {
    submitContactForm.mockResolvedValue({ success: true, message: 'Sent!' });
    const { result } = renderHook(() => useContactForm(INITIAL_FORM, CONFIG));

    act(() => {
      Object.entries(VALID_DATA).forEach(([name, value]) => {
        result.current.handleChange({ target: { name, value } });
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.submitResult).toBeNull();
    expect(result.current.formData).toEqual(INITIAL_FORM);
    expect(result.current.errors).toEqual({});
  });
});
