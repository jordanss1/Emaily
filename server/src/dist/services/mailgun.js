"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const keys_1 = __importDefault(require("../config/keys"));
const mailgun = new mailgun_js_1.default({
    apiKey: keys_1.default.mailgunKey,
    domain: keys_1.default.mailgunDomain,
});
exports.default = mailgun;
