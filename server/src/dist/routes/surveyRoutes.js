"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const path_parser_1 = require("path-parser");
const requireCredits_1 = __importDefault(require("../middlewares/requireCredits"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const Mailgun_1 = __importDefault(require("../services/Mailgun"));
const surveyTemplate_1 = __importDefault(require("../services/emailTemplates/surveyTemplate"));
const types_1 = require("../types");
const Survey = (0, mongoose_1.model)("surveys");
const surveyRoutes = (app) => {
    app.get("/api/surveys", requireLogin_1.default, async (req, res) => {
        const surveys = await Survey.find({
            _user: req.user?._id,
        }).select(["-recipients", "-_user", "-_id"]);
        res.send(surveys.length ? surveys : false);
    });
    app.post("/api/surveys", requireLogin_1.default, requireCredits_1.default, async (req, res) => {
        (0, types_1.assertUserOrUserProps)(req, [
            "credits",
            "id",
        ]);
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            _user: req.user._id,
            title,
            subject,
            body,
            recipients: recipients
                .split(",")
                .map((email) => ({ email: email.trim(), responded: false })),
            dateSent: Date.now(),
        });
        const mailer = new Mailgun_1.default(survey.subject, survey.recipients, (0, surveyTemplate_1.default)(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        }
        catch (err) {
            if (err instanceof Error)
                res.status(422).send(err.message);
        }
    });
    app.get("/api/surveys/thanks/:surveyId/:choice", (req, res) => {
        res.send("Thanks for voting!");
    });
    app.post("/api/surveys/webhooks", body_parser_1.default.urlencoded(), (req, res) => {
        const p = new path_parser_1.Path("/api/surveys/:surveyId/:choice");
        const { recipient, event, url } = req.body["event-data"];
        const match = p.test(new URL(url).pathname);
        if (match && event === "clicked") {
            Survey.updateOne({
                _id: match.surveyId,
                recipients: {
                    $elemMatch: { email: recipient, responded: false },
                },
            }, {
                $inc: { [match.choice]: 1 },
                $set: { "recipients.$.responded": true },
                lastResponded: new Date(),
            }).exec();
        }
        res.send({});
    });
};
exports.default = surveyRoutes;
