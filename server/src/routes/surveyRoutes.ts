import bodyParser from "body-parser";
import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { model } from "mongoose";
import requireCredits from "../middlewares/requireCredits";
import requireLoginMiddleware from "../middlewares/requireLogin";
import {
  SurveyRequestType,
  SurveySaveType,
  SurveyType,
} from "../models/Survey";
import mailgun from "../services/mailgun";
import { assertUserHasId } from "../types";
import types from "../types/express";

const Survey = model<SurveyType>("surveys");

const surveyRoutes = (app: Express) => {
  app.post(
    "/api/surveys",
    requireLoginMiddleware,
    requireCredits,
    async (
      req: Request<ParamsDictionary, {}, SurveyRequestType>,
      res: Response
    ) => {
      assertUserHasId(req);

      const { title, subject, body, recipients } = req.body;

      const survey = await new Survey<SurveySaveType>({
        _user: req.user?.id,
        title,
        subject,
        body,
        recipients: recipients
          .split(",")
          .map((email: string) => ({ email: email.trim() })),
        dateSent: Date.now(),
      }).save();
    }
  );

  app.post("/api/surveys/webhook", bodyParser.urlencoded(), (req, res) => {});
};

export default surveyRoutes;