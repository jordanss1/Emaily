"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthRoutes = void 0;
const passport_1 = __importDefault(require("passport"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const googleAuthRoutes = (app) => {
    app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google"), (req, res) => {
        res.redirect("/surveys");
    });
    app.get("/api/logout", requireLogin_1.default, (req, res) => {
        req.logOut({}, () => { });
        res.redirect("/");
    });
    app.get("/api/current_user", requireLogin_1.default, (req, res) => {
        res.send(req.user);
    });
};
exports.googleAuthRoutes = googleAuthRoutes;
