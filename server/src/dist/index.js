"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authRoutes_1 = require("./routes/authRoutes");
const keys_1 = __importDefault(require("./config/keys"));
const mongoose_1 = require("mongoose");
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./models/User");
require("./services/passport");
const { mongoURI, cookieKey } = keys_1.default;
(0, mongoose_1.connect)(mongoURI);
const app = (0, express_1.default)();
app.use((0, cookie_session_1.default)({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, authRoutes_1.googleAuthRoutes)(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
