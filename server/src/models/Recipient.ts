import { InferSchemaType, Schema } from "mongoose";

export const recipientSchema = new Schema({
  email: { type: String, required: true },
  responded: { type: Boolean, required: true, default: false },
});

export type RecipientSchemaType = InferSchemaType<typeof recipientSchema>;
