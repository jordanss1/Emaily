"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireLoginMiddleware = (req, res, next) => {
    const credits = req.user?.credits;
    if (credits && credits < 1) {
        return res.status(403).send({ error: "Not enough credits" });
    }
    next();
};
exports.default = requireLoginMiddleware;
