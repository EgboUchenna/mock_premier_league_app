import { Fixture } from '../models/Fixture';
import { Team } from '../models/Team';
import { validateFixture } from '../validation/fixture';
import { Request, Response } from 'express';

export const viewFixtures = async (req: Request, res: Response) => {
  const fixtures = await Fixture.find();

  res.send(fixtures);
};

export const createFixtures = async (req: Request, res: Response) => {
  const { error } = validateFixture(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    time,
    stadium,
    played,
  } = req.body;

  const home = await Team.findById(homeTeam).select({ name: 1, coach: 1 });
  if (!home) return res.status(400).send(`Home Team not found`);

  const away = await Team.findById(awayTeam).select({ name: 1, coach: 1 });
  if (!away) return res.status(400).send(`Away Team not found`);

  try {
    const fixture = new Fixture({
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      time,
      stadium,
      played,
    });

    await fixture.save();
    return res.status(200).send(fixture);
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
};

export const getFixture = (req: Request, res: Response) => {
  const { id } = req.query;
  const fixture = Fixture.findById({ id }).exec;
  res.send(fixture);
};

export const updateFixture = async (req: Request, res: Response) => {
  try {
    const updateFixture = await Fixture.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
    );
    res.status(200).send(`Fixture ${updateFixture._id} was updated succesfully.`);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteFixture = async (req: Request, res: Response) => {
  try {
    const deleteFixture = await Fixture.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(`Fixture ${deleteFixture._id} was deleted succesfully.`);
  } catch (error) {
    res.status(400).send(`delete failed :()`);
  }
};
