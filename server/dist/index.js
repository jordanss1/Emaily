"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./routes/authRoutes");
const keys_1 = require("./config/keys");
const mongoose_1 = require("mongoose");
require("./models/User");
require("./services/passport");
(0, mongoose_1.connect)(keys_1.mongoURI);
const app = (0, express_1.default)();
(0, authRoutes_1.googleAuthRoutes)(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
