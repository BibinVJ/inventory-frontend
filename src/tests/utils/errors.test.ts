import { describe, it, expect } from 'vitest';
import { isApiError } from '../../utils/errors';
import { ApiError } from '../../types/Error';

describe('isApiError', () => {
  it('should return true for a valid ApiError object', () => {
    const error: ApiError = {
      name: 'ApiError',
      message: 'An error occurred',
      response: {
        data: {
          message: 'An error occurred',
        },
        status: 500,
      },
    };
    expect(isApiError(error)).toBe(true);
  });

  it('should return false for a non-ApiError object', () => {
    const error = { message: 'An error occurred' };
    expect(isApiError(error)).toBe(false);
  });

  it('should return false for a null value', () => {
    expect(isApiError(null)).toBe(false);
  });

  it('should return false for an undefined value', () => {
    expect(isApiError(undefined)).toBe(false);
  });
});
