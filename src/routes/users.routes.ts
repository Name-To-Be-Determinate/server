import { Router } from 'express';

import login from '../controllers/login';

const router = Router();

router.post('/login', login);
router.post('/new', (req, res) => {});

export default router;
