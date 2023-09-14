"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertHasUser = void 0;
const assertHasUser = (req) => {
    if (typeof req.user === "undefined") {
        throw new Error("Request object not user type");
    }
};
exports.assertHasUser = assertHasUser;
