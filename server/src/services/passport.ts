import { model } from "mongoose";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import keys from "../config/keys";
import { UserType } from "../models/User";

const { googleClientID, googleClientSecret } = keys;

const GoogleStrategy = Strategy;

const User = model<UserType>("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user );
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
        return done(null, existingUser);
      }

      const newUser = await new User<UserType>({
        googleId: profile.id,
        credits: 0,
      }).save();

      done(null, newUser);
    }
  )
);
