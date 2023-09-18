import bodyParser from "body-parser";
import { model } from "mongoose";
import requireCredits from "../middlewares/requireCredits";
import requireLoginMiddleware from "../middlewares/requireLogin";
import { assertUserHasId } from "../types";
const Survey = model("surveys");
const surveyRoutes = (app) => {
    app.post("/api/surveys", requireLoginMiddleware, requireCredits, async (req, res) => {
        assertUserHasId(req);
        const { title, subject, body, recipients } = req.body;
        const survey = await new Survey({
            _user: req.user?.id,
            title,
            subject,
            body,
            recipients: recipients
                .split(",")
                .map((email) => ({ email: email.trim() })),
            dateSent: Date.now(),
        }).save();
    });
    app.post("/api/surveys/webhook", bodyParser.urlencoded(), (req, res) => { });
};
export default surveyRoutes;
