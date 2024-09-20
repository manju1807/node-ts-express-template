import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      message: 'Server error',
      error: (err as Error).message,
      errorStack: (err as Error).stack
    });
  next();
};
