import { Request, Response, NextFunction, RequestHandler } from "express";

export const catchAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
