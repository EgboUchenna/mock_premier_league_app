import { Team } from '../models/team';
import { validateTeam } from '../validation/team'
import { Request, Response } from 'express';

export const viewTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.send(teams);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  // since only the admin can create team I need to get the token of the user
  // but do this in a middleware and place it in your routes

  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    name,
    nick_name,
    website,
    coach,
    founded,
    stadium_name,
    stadium_capacity,
  } = req.body;

  const checkTeam = await Team.findOne({ nick_name });
  if (checkTeam) {
    return res.status(404).send({ message: `Nick name already in use` });
  }

  const newTeam = await new Team({
    name,
    nick_name,
    website,
    coach,
    founded,
    stadium_name,
    stadium_capacity,
  });

  await newTeam.save();

  res.send({ message: `Team ${name} created succesfully, A.K.A ${nick_name}` });
};
