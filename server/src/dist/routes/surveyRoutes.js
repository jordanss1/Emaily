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
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const requireCredits_1 = __importDefault(require("../middlewares/requireCredits"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const types_1 = require("../types");
const Survey = (0, mongoose_1.model)("surveys");
const surveyRoutes = (app) => {
    app.post("/api/surveys", requireLogin_1.default, requireCredits_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        (0, types_1.assertUserHasId)(req);
        const { title, subject, body, recipients } = req.body;
        const survey = yield new Survey({
            _user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            title,
            subject,
            body,
            recipients: recipients
                .split(",")
                .map((email) => ({ email: email.trim() })),
            dateSent: Date.now(),
        }).save();
    }));
    app.post("/api/surveys/webhook", body_parser_1.default.urlencoded(), (req, res) => { });
};
exports.default = surveyRoutes;
