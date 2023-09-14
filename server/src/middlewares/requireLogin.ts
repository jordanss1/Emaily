import { NextFunction, Request, Response } from "express";
import types from "../types/express";

export const requireLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  next();
};

export default requireLoginMiddleware;
