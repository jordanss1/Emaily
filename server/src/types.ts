import { Request } from "express";
import types from "./types/express";

type RequestWithUser = Request & { user: Express.User };

export type UserWithId = { user: { id: string } };

export type UserWithCredits = { user: { credits: number } };

type PropTypes = "id" | "credits";

export const assertUserOrUserProps: <UserHasProps>(
  req: Request,
  props?: PropTypes[]
) => asserts req is RequestWithUser & UserHasProps = (req, props) => {
  if (typeof req.user === "undefined") {
    throw new Error("Request object not user type");
  }

  if (props && props.some((prop) => typeof req.user?.[prop] === "undefined")) {
    throw new Error("Property(ies) is/are undefined on user");
  }
};
