import { Express } from "express";

import { Document, ObjectId } from "mongoose";

declare global {
  export namespace Express {
    export interface User extends Document {
      id?: string;
      credits?: number;
    }
    export interface Request {
      user: Express.User;
    }
  }
}
