"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLoginMiddleware = void 0;
var requireLoginMiddleware = function (req, res, next) {
    if (!req.user) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    next();
};
exports.requireLoginMiddleware = requireLoginMiddleware;
exports.default = exports.requireLoginMiddleware;
