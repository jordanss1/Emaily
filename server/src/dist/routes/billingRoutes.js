"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingRoutes = void 0;
const stripe_1 = __importDefault(require("stripe"));
const keys_1 = __importDefault(require("../config/keys"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const types_1 = require("../types");
const stripe = new stripe_1.default(keys_1.default.stripeSecretKey, { apiVersion: "2023-08-16" });
const billingRoutes = (app) => {
    app.post("/api/stripe", requireLogin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, types_1.assertHasUser)(req);
        const charge = yield stripe.charges.create({
            amount: 500,
            currency: "USD",
            description: "$5 for 5 credits",
            source: req.body.id,
        });
        req.user.credits ? (req.user.credits += 5) : (req.user.credits = 5);
        const user = yield req.user.save();
        res.send(user);
    }));
};
exports.billingRoutes = billingRoutes;
