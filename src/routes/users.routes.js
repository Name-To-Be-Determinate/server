"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../controllers/accounts");
const middleware_1 = __importDefault(require("../middleware"));
const router = (0, express_1.Router)();
router.post('/login', accounts_1.login);
router.put('/new', middleware_1.default, accounts_1.newUser);
router.delete('/remove/:username', middleware_1.default, accounts_1.deleteUser);
exports.default = router;
