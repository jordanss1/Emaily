import { Schema, model } from "mongoose";
import { recipientSchema } from "./Recipient";
export const surveySchema = new Schema({
    title: { required: true, type: String },
    body: { required: true, type: String },
    subject: { required: true, type: String },
    recipients: [recipientSchema],
    yes: { required: true, type: Number, default: 0 },
    no: { required: true, type: Number, default: 0 },
    _user: { type: String, ref: "User", required: true },
    dateSent: { type: Number, required: true },
    lastResponded: { type: Date, required: true },
});
model("surveys", surveySchema);
