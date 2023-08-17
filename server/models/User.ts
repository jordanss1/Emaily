import { model, Schema, InferSchemaType } from "mongoose";

export const userSchema = new Schema({
  googleId: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof userSchema>;

model<UserType>("users", userSchema);
