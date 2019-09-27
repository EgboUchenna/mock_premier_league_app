import { Router } from 'express';
import {
  viewFixtures,
  createFixtures,
  getFixture,
} from '../../controllers/fixture';

const router = Router();

router
  .get('/', viewFixtures)
  .get('/one', getFixture)
  .post('/', createFixtures);

export default router;
