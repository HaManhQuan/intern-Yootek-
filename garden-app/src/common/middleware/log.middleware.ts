import { Request, Response, NextFunction } from 'express';

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`[LOG] :${req.method}, ${req.url}`);
  res.on('finish', () => {
    console.log(`${res.statusCode}`);
  });
  next();
}
