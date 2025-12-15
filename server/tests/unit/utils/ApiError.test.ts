import { describe, it, expect } from 'vitest';
import { ApiError } from '@/utils/ApiError';

describe('ApiError', () => {
  it('should create an ApiError with correct properties', () => {
    const error = new ApiError(404, 'NOT_FOUND', 'Resource not found');

    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('Resource not found');
    expect(error.name).toBe('ApiError');
  });

  it('should include details when provided', () => {
    const details = { field: 'email', message: 'Invalid format' };
    const error = new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details);

    expect(error.details).toEqual(details);
  });

  it('should convert to JSON format correctly', () => {
    const error = new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong');
    const json = error.toJSON();

    expect(json).toEqual({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      },
    });
  });

  it('should include details in JSON when present', () => {
    const details = [{ field: 'name', message: 'Required' }];
    const error = new ApiError(400, 'VALIDATION_ERROR', 'Invalid data', details);
    const json = error.toJSON();

    expect(json).toEqual({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid data',
        details,
      },
    });
  });
});
