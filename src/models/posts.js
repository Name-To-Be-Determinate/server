"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirusSchema = exports.InfosSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.InfosSchema = mongoose_1.default.model('infos', new mongoose_1.default.Schema({
    content: String,
    name: String,
    slug: String,
}));
exports.VirusSchema = mongoose_1.default.model('virus', new mongoose_1.default.Schema({
    content: String,
    filename: String,
    name: String,
}));
