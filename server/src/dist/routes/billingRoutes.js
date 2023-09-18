import Stripe from "stripe";
import keys from "../config/keys";
import requireLoginMiddleware from "../middlewares/requireLogin";
import { assertHasUser } from "../types";
const stripe = new Stripe(keys.stripeSecretKey, { apiVersion: "2023-08-16" });
const billingRoutes = (app) => {
    app.post("/api/stripe", requireLoginMiddleware, async (req, res) => {
        assertHasUser(req);
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "USD",
            description: "$5 for 5 credits",
            source: req.body.id,
        });
        req.user.credits ? (req.user.credits += 5) : (req.user.credits = 5);
        const user = await req.user.save();
        res.send(user);
    });
};
export default billingRoutes;
