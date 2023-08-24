import express, { Express } from "express";
import passport from "passport";
import { googleAuthRoutes } from "./routes/authRoutes";
import keys from "./config/keys";
import { connect } from "mongoose";
import cookieSession from "cookie-session";
import "./models/User";
import "./services/passport";

const { mongoURI, cookieKey } = keys;

connect(mongoURI);

const app: Express = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());

app.use(passport.session());

googleAuthRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
