import { Team } from '../models/team';
import { Request, Response } from 'express';

export const viewTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.send(teams);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
