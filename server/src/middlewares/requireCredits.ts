import { NextFunction, Request, Response } from "express";
import types from "../types/express";

const requireLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credits = req.user?.credits;

  if (credits && credits < 1) {
    return res.status(403).send({ error: "Not enough credits" });
  }

  next();
};

export default requireLoginMiddleware;
