import { Router } from 'express';
import {
  viewTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from '../../controllers/team';
const router = Router();

router
  .get('/', viewTeams)
  .post('/', createTeam)
  .put('/:id', updateTeam)
  .delete('/:id', deleteTeam);

export default router;
