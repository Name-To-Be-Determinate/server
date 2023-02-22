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
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const SECRET = process.env.SECRET || new Uint8Array(16).join('');
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (req.headers.authorization || '').split(" ")[1];
            let decodedData = (0, jsonwebtoken_1.verify)(token, SECRET);
            const existingUser = yield user_1.default.findOne({
                username: decodedData.username,
                _id: decodedData.id
            }).exec();
            if (!existingUser || !existingUser.admin)
                throw "Unauthorized";
            next();
        }
        catch (error) {
            res.status(403).json({ message: "Unauthorized action" });
        }
    });
}
exports.default = default_1;
;
