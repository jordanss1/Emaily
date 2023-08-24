"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = __importDefault(require("./dev"));
const prod_1 = __importDefault(require("./prod"));
let keys;
if (process.env.NODE_ENV === "production") {
    keys = prod_1.default;
}
else {
    keys = dev_1.default;
}
exports.default = keys;
