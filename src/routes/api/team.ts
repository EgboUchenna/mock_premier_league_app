import { Router } from 'express';
import auth from '../../middleware/auth';
import admin from '../../middleware/admin';

import {
  viewTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from '../../controllers/team';
const router = Router();

router
  .get('/', auth, viewTeams)
  .post('/', [auth, admin], createTeam)
  .put('/:id', [auth, admin], updateTeam)
  .delete('/:id', [auth, admin], deleteTeam);

export default router;
