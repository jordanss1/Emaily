"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const googleAuthRoutes = (app) => {
    app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google"), (req, res) => {
        res.redirect("/");
    });
    app.get("/api/logout", requireLogin_1.default, (req, res) => {
        req.logOut({}, () => { });
        res.redirect("/");
    });
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
};
exports.default = googleAuthRoutes;
