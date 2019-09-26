import { Fixture } from '../models/Fixture';
import { Request, Response } from 'express';

export const viewFixtures = async (req: Request, res: Response) => {
  const fixtures = await Fixture.find();

  res.send(fixtures);
};
