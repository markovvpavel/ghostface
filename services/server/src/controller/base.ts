import { Request, Response, NextFunction } from "express";

export class BaseController {
  protected handleRequest = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };
}
