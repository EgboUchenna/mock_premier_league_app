// tslint:disable: import-name
import usersRoute from './user';
import teamsRoute from './team';

import { Router } from 'express';

const router = Router();
router.use('/users', usersRoute);
router.use('/teams', teamsRoute);

export default router;
