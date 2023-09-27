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
  app.get("/api/surveys", requireLoginMiddleware, async (req, res) => {
    const surveys = await Survey.find<SurveyType>({
      _user: req.user?._id,
    }).select(["-recipients", "-_user", "-_id"]);

    res.send(surveys);
  });

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
        surveyTemplate(survey)
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

  app.get("/api/surveys/thanks/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", bodyParser.urlencoded(), (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    const { recipient, event, url } = req.body["event-data"];

    const match = p.test(new URL(url).pathname);

    if (match && event === "clicked") {
      Survey.updateOne(
        {
          _id: match.surveyId,
          recipients: {
            $elemMatch: { email: recipient, responded: false },
          },
        },
        {
          $inc: { [match.choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    }

    res.send({});
  });
};

export default surveyRoutes;
