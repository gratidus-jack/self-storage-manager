import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ApiError } from '@/utils/ApiError.js';

/**
 * Middleware to validate request body against a Zod schema
 */
export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const details = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      throw new ApiError(
        400,
        'VALIDATION_ERROR',
        'Invalid request data',
        details
      );
    }
    
    // Replace body with validated data
    req.body = result.data;
    next();
  };
};
