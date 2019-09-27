import { Router } from 'express';
import auth from '../../middleware/auth';
import admin from '../../middleware/admin';

import {
  createFixtures,
  deleteFixture,
  getFixture,
  updateFixture,
  viewFixtures,
  viewPendingMatches,
  viewPlayedMatches,
} from '../../controllers/fixture';

const router = Router();

router
  .get('/', auth, viewFixtures)
  .get('/played', viewPlayedMatches)
  .get('/pending', viewPendingMatches)
  .get('/one', getFixture)
  .post('/', [auth, admin], createFixtures)
  .put('/:id', [auth, admin], updateFixture)
  .delete('/:id', [auth, admin], deleteFixture);

export default router;
