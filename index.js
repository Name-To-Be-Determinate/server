"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
const router_1 = __importDefault(require("./src/router"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// Encoding
app.use((0, body_parser_1.json)({ limit: '30mb' }));
app.use((0, body_parser_1.urlencoded)({ extended: true, limit: '30mb' })); // @ts-ignore
app.use((0, cors_1.default)());
// Routing
app.use('/', router_1.default);
// Run app
const PORT = process.env.PORT || 5000;
mongoose_1.default.set('strictQuery', true); // @ts-ignore
mongoose_1.default.connect(process.env.MONGO_DB || "", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log("Server running at port : " + PORT)))
    .catch(err => console.error(err));
