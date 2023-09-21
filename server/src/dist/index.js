"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = require("mongoose");
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
var keys_1 = __importDefault(require("./config/keys"));
require("./models/Survey");
require("./models/User");
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var billingRoutes_1 = __importDefault(require("./routes/billingRoutes"));
var surveyRoutes_1 = __importDefault(require("./routes/surveyRoutes"));
require("./services/passport");
var mongoURI = keys_1.default.mongoURI, cookieKey = keys_1.default.cookieKey;
(0, mongoose_1.connect)(mongoURI);
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_session_1.default)({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, billingRoutes_1.default)(app);
(0, authRoutes_1.default)(app);
(0, surveyRoutes_1.default)(app);
if (process.env.NODE_ENV === "production") {
    // express will serve client assets such as
    // main.js or main.css files
    app.use(express_1.default.static("client/build"));
    // express will serve up index.html if it
    // doesn't recognize the route
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, "../../client", "build", "index.html"));
    });
}
var PORT = process.env.PORT || 5000;
app.listen(PORT);
