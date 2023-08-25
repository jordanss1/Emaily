import passport from "passport";
import keys from "../config/keys";
import { model } from "mongoose";
import { Strategy } from "passport-google-oauth20";
import { UserType } from "../models/User";

const { googleClientID, googleClientSecret } = keys;

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
      proxy: true,
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
