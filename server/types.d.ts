import { Request } from "express";
import { Document, Model, Models } from "mongoose";
import { UserType } from "./src/models/User";

export {};

declare global {
  namespace Express {
    interface User extends Document {
      id?: string;
      credits?: number;
    }
  }
}

type RequestWithUser = Request & { user: Express.User };

export const assertHasUser: (req: Request) => asserts req is RequestWithUser = (
  req
) => {
  if (typeof req.user === "undefined") {
    throw new Error("Request object not user type");
  }
};
