import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/utils/ApiError.js';
import { env } from '@/config/environment.js';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Handle ApiError instances
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.message,
      },
    });
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ID',
        message: 'Invalid resource ID',
      },
    });
  }

  // Log unexpected errors
  console.error('❌ Unexpected error:', err);

  // Generic error response
  const statusCode = 500;
  const response = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message,
      ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  };

  return res.status(statusCode).json(response);
};
