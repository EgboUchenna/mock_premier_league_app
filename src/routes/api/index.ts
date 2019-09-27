// tslint:disable: import-name
import fixturesRoute from './fixture';
import usersRoute from './user';
import teamsRoute from './team';

import { Router } from 'express';

const router = Router();

router.use('/fixtures', fixturesRoute);
router.use('/teams', teamsRoute);
router.use('/users', usersRoute);

export default router;
