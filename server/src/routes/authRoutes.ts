import { Express } from "express";
import passport from "passport";
import requireLoginMiddleware from "../middlewares/requireLogin";

const googleAuthRoutes = (app: Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", requireLoginMiddleware, (req, res) => {
    req.logOut({}, () => {});
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

export default googleAuthRoutes;
