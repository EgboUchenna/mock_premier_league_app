// tslint:disable: import-name
import fixturesRoute from './fixture';
import searchRoute from './search';
import teamsRoute from './team';
import usersRoute from './user';

import { Router } from 'express';

const router = Router();

router.use('/fixtures', fixturesRoute);
router.use('/search', searchRoute);
router.use('/teams', teamsRoute);
router.use('/users', usersRoute);

export default router;
