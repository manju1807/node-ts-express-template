import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

type SanitizeFunction = (value: any) => string;

const sanitizeObject = (
  obj: Record<string, any> | null | undefined,
  sanitizeFunc: SanitizeFunction
): void => {
  if (obj === null || obj === undefined) {
    return;
  }

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = sanitizeFunc(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key], sanitizeFunc);
    }
  });
};

const createSanitizer = (sanitizeFunc: SanitizeFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      sanitizeObject(req.body, sanitizeFunc);
      sanitizeObject(req.query, sanitizeFunc);
      sanitizeObject(req.params, sanitizeFunc);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const sanitizeXSS = createSanitizer(validator.escape);

export const sanitizeMongoDB = createSanitizer((value: string) => {
  // Remove MongoDB operators
  return value.replace(/\$[a-zA-Z0-9]+/g, '');
});
