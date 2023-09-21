"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const keys_1 = __importDefault(require("../config/keys"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const types_1 = require("../types");
const stripe = new stripe_1.default(keys_1.default.stripeSecretKey, { apiVersion: "2023-08-16" });
const billingRoutes = (app) => {
    app.post("/api/stripe", requireLogin_1.default, async (req, res) => {
        (0, types_1.assertUserOrUserProps)(req);
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
exports.default = billingRoutes;
