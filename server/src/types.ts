import { Request } from "express";
import types from "./types/express";

type RequestWithUser = Request & { user: Express.User };

export const assertHasUser: (req: Request) => asserts req is RequestWithUser = (
  req
) => {
  if (typeof req.user === "undefined") {
    throw new Error("Request object not user type");
  }
};
