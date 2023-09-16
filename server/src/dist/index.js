"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const keys_1 = __importDefault(require("./config/keys"));
require("./models/User");
const authRoutes_1 = require("./routes/authRoutes");
const billingRoutes_1 = require("./routes/billingRoutes");
require("./services/passport");
const { mongoURI, cookieKey } = keys_1.default;
(0, mongoose_1.connect)(mongoURI);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_session_1.default)({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, billingRoutes_1.billingRoutes)(app);
(0, authRoutes_1.googleAuthRoutes)(app);
if (process.env.NODE_ENV === "production") {
    // express will serve client assets such as
    // main.js or main.css files
    app.use(express_1.default.static("client/build"));
    // express will serve up index.html if it
    // doesn't recognize the route
    app.get("*", (req, res) => {
        console.log("prod");
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
