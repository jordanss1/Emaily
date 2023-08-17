import express, { Express } from "express";
import { googleAuthRoutes } from "./routes/authRoutes";
import { mongoURI } from "./config/keys";
import { connect } from "mongoose";
import "./models/User";
import "./services/passport";

const environment = process.env.NODE_ENV || "development";

connect(
  environment === "production" ? (process.env.mongoURI as string) : mongoURI
);

const app: Express = express();

googleAuthRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
