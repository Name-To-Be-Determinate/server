"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const router = (0, express_1.Router)();
// Base route
router.all('/', (_req, res) => res.sendFile(process.cwd() + "/utils/index.html"));
// Register all routers
const routerChilds = (0, fs_1.readdirSync)(__dirname + "/routes").filter(file => file.endsWith('.js'));
for (const file of routerChilds) {
    let script = require((0, path_1.resolve)(__dirname, 'routes', file)).default;
    router.use("/" + file.split('.')[0], script);
}
// 404 page
router.all('*', (_req, res) => res.status(404).json({ message: "Not found" }));
exports.default = router;
