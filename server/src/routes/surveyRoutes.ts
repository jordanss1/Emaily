import bodyParser from "body-parser";
import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { model } from "mongoose";
import { Path } from "path-parser";
import requireCredits from "../middlewares/requireCredits";
import requireLoginMiddleware from "../middlewares/requireLogin";
import {
  SurveyRequestType,
  SurveySaveType,
  SurveyType,
} from "../models/Survey";
import MailgunMailer from "../services/Mailgun";
import surveyTemplate from "../services/emailTemplates/surveyTemplate";
import { UserWithCredits, UserWithId, assertUserOrUserProps } from "../types";
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
      assertUserOrUserProps<UserWithCredits & UserWithId>(req, [
        "credits",
        "id",
      ]);

      const { title, subject, body, recipients }: SurveyRequestType = req.body;

      const survey = new Survey<SurveySaveType>({
        _user: req.user._id,
        title,
        subject,
        body,
        recipients: recipients
          .split(",")
          .map((email: string) => ({ email: email.trim(), responded: false })),
        dateSent: Date.now(),
      });

      const mailer = new MailgunMailer(
        survey.subject,
        survey.recipients,
        surveyTemplate(survey.body)
      );

      try {
        await mailer.send();

        await survey.save();

        req.user.credits -= 1;

        const user = await req.user.save();

        res.send(user);
      } catch (err) {
        if (err instanceof Error) res.status(422).send(err.message);
      }
    }
  );

  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhook", bodyParser.urlencoded(), (req, res) => {
    const p = new Path("/api/survey/:surveyId/:choice");
  });
};

export default surveyRoutes;
