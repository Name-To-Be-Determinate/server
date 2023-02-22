import { Router } from 'express';

import { deleteUser, login, newUser } from '../controllers/accounts';
import middleware from '../middleware';

const router = Router();

router.post('/login', login);
router.put('/new', middleware, newUser);
router.delete('/remove/:username', middleware, deleteUser);

export default router;
