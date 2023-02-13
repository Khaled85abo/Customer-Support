import { NextFunction, Request, Response } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path);
  next();
};
