import passport from "passport";
import { model } from "mongoose";
import { Strategy } from "passport-google-oauth20";
import { googleClientID, googleClientSecret } from "../config/keys";
import { UserType } from "../models/User";

const GoogleStrategy = Strategy;

const User = model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      new User<UserType>({ googleId: profile.id }).save();
    }
  )
);
