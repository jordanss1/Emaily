"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    googleId: { type: String, required: true },
    credits: { type: Number, default: 0 },
});
(0, mongoose_1.model)("users", exports.userSchema);
