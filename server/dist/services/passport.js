"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("passport");
const mongoose_1 = require("mongoose");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = require("../config/keys");
const GoogleStrategy = passport_google_oauth20_1.Strategy;
const User = (0, mongoose_1.model)("users");
(0, passport_1.serializeUser)((user, done) => {
    done(null, user.id);
});
(0, passport_1.use)(new GoogleStrategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User.findOne({ googleId: profile.id });
    if (existingUser) {
        done(null, existingUser);
        return;
    }
    const newUser = yield new User({
        googleId: profile.id,
    }).save();
    done(null, newUser);
})));
