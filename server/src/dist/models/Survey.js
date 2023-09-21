"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveySchema = void 0;
var mongoose_1 = require("mongoose");
var Recipient_1 = require("./Recipient");
exports.surveySchema = new mongoose_1.Schema({
    title: { required: true, type: String },
    body: { required: true, type: String },
    subject: { required: true, type: String },
    recipients: [Recipient_1.recipientSchema],
    yes: { required: true, type: Number, default: 0 },
    no: { required: true, type: Number, default: 0 },
    _user: { type: String, ref: "User", required: true },
    dateSent: { type: Number, required: true },
    lastResponded: { type: Date },
});
(0, mongoose_1.model)("surveys", exports.surveySchema);
