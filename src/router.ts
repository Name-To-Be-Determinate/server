import { Router } from 'express';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const router = Router();

// Base route
router.all('/', (_req, res) => res.sendFile(process.cwd() + "/utils/index.html"));

// Register all routers
const routerChilds = readdirSync(__dirname + "/routes").filter(file => file.endsWith('.js'));

for (const file of routerChilds) {
    let script = require(resolve(__dirname, 'routes', file)).default as Router;

    router.use("/" + file.split('.')[0], script);
}

// 404 page
router.all('*', (_req, res) => res.status(404).json({ message: "Not found" }));

export default router;
