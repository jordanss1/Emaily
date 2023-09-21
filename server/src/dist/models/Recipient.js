"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipientSchema = void 0;
var mongoose_1 = require("mongoose");
exports.recipientSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    responded: { type: Boolean, required: true, default: false },
});
