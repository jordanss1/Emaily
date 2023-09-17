import { Request } from "express";
import { ObjectId } from "mongoose";
import types from "./types/express";

type RequestWithUser = Request & { user: Express.User };

type UserWithId = { user: { id: string } };

export const assertHasUser: (req: Request) => asserts req is RequestWithUser = (
  req
) => {
  if (typeof req.user === "undefined") {
    throw new Error("Request object not user type");
  }
};

export const assertUserHasId: (
  req: Request
) => asserts req is RequestWithUser & UserWithId = (req) => {
  if (typeof req.user?.id === "undefined") {
    throw new Error("Id property is undefined on user");
  }
};
