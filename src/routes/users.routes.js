"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../controllers/accounts");
const router = (0, express_1.Router)();
router.post('/login', accounts_1.login);
router.post('/new', accounts_1.newUser);
exports.default = router;
