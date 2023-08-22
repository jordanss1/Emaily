import passport from "passport";
import { model } from "mongoose";
import { Strategy } from "passport-google-oauth20";
import { googleClientID, googleClientSecret } from "../config/keys";
import { UserType } from "../models/User";

const GoogleStrategy = Strategy;

const User = model<UserType>("users");

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser);
        return;
      }

      const newUser = await new User<UserType>({
        googleId: profile.id,
      }).save();

      done(null, newUser);
    }
  )
);
