"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = __importDefault(require("../config/keys"));
const { googleClientID, googleClientSecret } = keys_1.default;
const GoogleStrategy = passport_google_oauth20_1.Strategy;
const User = (0, mongoose_1.model)("users");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
passport_1.default.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true,
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }
    const newUser = await new User({
        googleId: profile.id,
        credits: 0,
    }).save();
    done(null, newUser);
}));
