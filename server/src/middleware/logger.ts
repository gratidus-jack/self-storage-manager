import type { Request, Response, NextFunction } from 'express';

/**
 * Simple request logging middleware
 */
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    console.log(
      `${method} ${originalUrl} ${statusCode} - ${duration}ms`
    );
  });

  next();
};
