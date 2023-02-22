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
exports.deleteUser = exports.newUser = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const SECRET = process.env.SECRET || new Uint8Array(16).join('');
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, username } = req.body;
            const existingUser = yield user_1.default.findOne({ username }).exec();
            if (!existingUser)
                return res.status(404).json({ message: "User not found" });
            const correctPassword = (0, bcryptjs_1.compareSync)(password, existingUser.password || '');
            if (!correctPassword)
                return res.status(404).json({ message: "User not found" });
            const token = (0, jsonwebtoken_1.sign)({ username: existingUser.username, id: existingUser._id }, SECRET);
            res.status(200).json({ user: {
                    admin: existingUser.admin, username: existingUser.username, _id: existingUser._id
                }, token });
        }
        catch (error) {
            res.status(500).json({ message: "An unknown error has been encountered by the server." });
        }
    });
}
exports.login = login;
;
function newUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        try {
            const existingUser = yield user_1.default.findOne({ username: body.username }).exec();
            if (existingUser)
                return res.status(401).json({ message: "User already exists, choose an other username." });
            let encryptedPassword = (0, bcryptjs_1.hashSync)(body.password);
            const newUser = new user_1.default(Object.assign(Object.assign({}, body), { password: encryptedPassword }));
            yield newUser.save();
            res.status(201).json({ message: "User successfully added !" });
        }
        catch (error) {
            res.status(500).json({ message: "An unknown error has been encountered by the server." });
        }
    });
}
exports.newUser = newUser;
;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            const query = user_1.default.findOneAndRemove({ username });
            yield query.exec();
            res.status(200).json({ message: "User successfully removed from base." });
        }
        catch (error) {
            res.status(500).json({ message: "An unkown error has benn encountered by the server." });
        }
    });
}
exports.deleteUser = deleteUser;
;
