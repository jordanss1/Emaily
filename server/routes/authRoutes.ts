import { Express } from "express";
import passport from "passport";

export const googleAuthRoutes = (app: Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
};
