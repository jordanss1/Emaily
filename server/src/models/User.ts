import { InferSchemaType, Schema, model } from "mongoose";

export const userSchema = new Schema({
  googleId: { type: String, required: true },
  credits: { type: Number, default: 0 },
});

export type UserType = InferSchemaType<typeof userSchema>;

model<UserType>("users", userSchema);
