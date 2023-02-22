import { Router } from 'express';

import { login, newUser } from '../controllers/accounts';

const router = Router();

router.post('/login', login);
router.post('/new', newUser);

export default router;
