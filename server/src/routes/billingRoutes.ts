import { Express, Request } from "express";
import Stripe from "stripe";
import { assertHasUser } from "../../types";
import keys from "../config/keys";

const stripe = new Stripe(keys.stripeSecretKey, { apiVersion: "2023-08-16" });

export const billingRoutes = (app: Express) => {
  app.post("/api/stripe", async (req, res) => {
    assertHasUser(req);

    // let credits = req.user.credits

    const charge = await stripe.charges.create({
      amount: 500,
      currency: "USD",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    // credits ? (credits += 5) : (credits = 5);

    req.user.credits ? (req.user.credits += 5) : (req.user.credits = 5);
  });
};
