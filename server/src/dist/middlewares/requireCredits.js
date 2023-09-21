"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireLoginMiddleware = function (req, res, next) {
    var _a;
    var credits = (_a = req.user) === null || _a === void 0 ? void 0 : _a.credits;
    if (credits && credits < 1) {
        return res.status(403).send({ error: "Not enough credits" });
    }
    next();
};
exports.default = requireLoginMiddleware;
