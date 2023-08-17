"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = require("mongoose");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = require("../config/keys");
const GoogleStrategy = passport_google_oauth20_1.Strategy;
const User = (0, mongoose_1.model)("users");
passport_1.default.use(new GoogleStrategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    new User({ googleId: profile.id }).save();
}));
