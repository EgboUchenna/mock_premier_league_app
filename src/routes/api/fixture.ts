import { Router } from 'express';
import {
  createFixtures,
  deleteFixture,
  getFixture,
  updateFixture,
  viewFixtures,
} from '../../controllers/fixture';

const router = Router();

router
  .get('/', viewFixtures)
  .get('/one', getFixture)
  .post('/', createFixtures)
  .put('/:id', updateFixture)
  .delete('/:id', deleteFixture);

export default router;
