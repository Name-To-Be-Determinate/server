"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware"));
const posts_1 = require("../controllers/posts");
const router = (0, express_1.Router)();
// Routes
router.get('/:type', middleware_1.default, posts_1.getter);
router.post('/:type', middleware_1.default, posts_1.setter);
exports.default = router;
