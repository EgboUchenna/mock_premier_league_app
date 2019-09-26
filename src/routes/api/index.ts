import user from './user';
import { Router } from 'express';

const router = Router();
router.use('/users', user);

export default router;
