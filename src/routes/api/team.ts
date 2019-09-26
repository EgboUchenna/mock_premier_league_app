import { Router } from 'express';
import {
  viewTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from '../../controllers/team';
const router = Router();

router
  .get('/api/view-teams/', viewTeams)
  .post('/api/create-team', createTeam)
  .put('/api/update-team/:id', updateTeam)
  .delete('/api/delete-team/:id', deleteTeam);

export default router;
