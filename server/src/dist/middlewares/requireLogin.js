"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLoginMiddleware = void 0;
const requireLoginMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    next();
};
exports.requireLoginMiddleware = requireLoginMiddleware;
exports.default = exports.requireLoginMiddleware;
