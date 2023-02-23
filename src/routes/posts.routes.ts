import { Router } from 'express';

import middleware from '../middleware';
import { getter, setter } from '../controllers/posts';

const router = Router();

// Routes
router.get('/:type', middleware, getter);
router.post('/:type', middleware, setter);

export default router;
