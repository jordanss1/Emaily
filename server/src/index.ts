import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express, { Express } from "express";
import { connect } from "mongoose";
import passport from "passport";
import path from "path";
import keys from "./config/keys";
import "./models/User";
import { googleAuthRoutes } from "./routes/authRoutes";
import { billingRoutes } from "./routes/billingRoutes";
import "./services/passport";

const { mongoURI, cookieKey } = keys;

connect(mongoURI);

const app: Express = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());

app.use(passport.session());

billingRoutes(app);

googleAuthRoutes(app);

if (process.env.NODE_ENV === "production") {
  // express will serve client assets such as
  // main.js or main.css files
  app.use(express.static("client/build"));

  // express will serve up index.html if it
  // doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
