import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { ROLES } from "../models/employee";
import { CLIENTROLES } from "../models/client";
import { ERRORS } from "../constants/errors";
// import { MissingHeader, Unauthorized } from "../errors";

export const validToken: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.header("Authorization")) throw new Error("Please authenticate");
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!process.env.JWT_SECRET || !token) throw new Error("No Env variables");
    const user = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = user;
    next();
  } catch (error: any) {
    console.log("error catched from json: ", error.message);
    switch (error.name) {
      case "JsonWebTokenError":
        throw new Error(ERRORS.unauthorized);
      case "TokenExpiredError":
        throw new Error(ERRORS.expired_token);
      case "invalid token":
        throw new Error(ERRORS.invalid_token);
      default:
        throw new Error(ERRORS.forbidden);
    }
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (user.role != ROLES.admin) {
    throw new Error(ERRORS.unauthorized);
  }
  next();
};

export const isClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (user.role != CLIENTROLES.client) {
    throw new Error(ERRORS.unauthorized);
  }
  next();
};

export const isAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (user.role != ROLES.support_agent) {
    throw new Error(ERRORS.unauthorized);
  }
  next();
};
