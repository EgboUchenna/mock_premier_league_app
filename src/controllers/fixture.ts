import { Fixture } from '../models/Fixture';
import { Team } from '../models/Team';
import { validateFixture, validateUpdateFixture } from '../validation/fixture';
import { Request, Response } from 'express';

export const viewFixtures = async (req: Request, res: Response) => {
  const fixtures = await Fixture.find().populate(
    'homeTeam awayTeam',
    'name coach -_id',
  );
  res.status(200).send({ message: fixtures });
};

export const viewPlayedMatches = async (req: Request, res: Response) => {
  const playedMatches = await Fixture.find({ played: true }).populate(
    'homeTeam awayTeam',
    'name coach -_id',
  );

  res.status(200).send({ message: playedMatches });
};

export const viewPendingMatches = async (req: Request, res: Response) => {
  const pendingMatches = await Fixture.find({ played: false }).populate(
    'homeTeam awayTeam',
    'name coach -_id',
  );

  res.status(200).send({ message: pendingMatches });
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
  if (!home) return res.status(400).send({ message: `Home Team not found` });

  const away = await Team.findById(awayTeam).select({ name: 1, coach: 1 });
  if (!away) return res.status(400).send({ message: `Away Team not found` });

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
    return res.status(200).send({ message: fixture });
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
};

export const getFixture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fixture = await Fixture.findOne({
    link: `http://localhost:${process.env.PORT}/api/v1/fixtures/${id}`,
  })
    .populate('homeTeam awayTeam', 'name coach -_id')
    .select('-_id');
  if (!fixture) {
    return res.status(400).json({ message: 'Fixture does not exist' });
  }
  res.status(200).json({ message: fixture });
};

export const updateFixture = async (req: Request, res: Response) => {
  const { error } = validateUpdateFixture(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const { homeScore, awayScore, played } = req.body;

  try {
    const { homeTeam, awayTeam, time, stadium, _id } = await Fixture.findById({
      _id: req.params.id,
    });
    const updateFixture = await Fixture.findByIdAndUpdate(_id, {
      homeTeam,
      awayTeam,
      time,
      stadium,
      homeScore,
      awayScore,
      played,
    });

    if (updateFixture) {
      await updateFixture.save();

      const home = await Team.findById(homeTeam);
      const away = await Team.findById(awayTeam);

      // update match details if played
      if (played && home && away) {
        if (homeScore > awayScore) {
          home.wins += 1;
          away.losses += 1;
          home.goals += homeScore;
          away.goals += awayScore;
        } else if (homeScore < awayScore) {
          home.losses += 1;
          away.wins += 1;
          away.goals += awayScore;
          home.goals += homeScore;
        } else {
          away.goals += awayScore;
          home.goals += homeScore;
        }

        await home.save();
        await away.save();
      }

      res.status(200).send({ message: `Fixture ${updateFixture._id} was updated succesfully.` });
    }
  } catch (error) {
    res.status(400).send({ message: `Update failed` });
  }
};

export const deleteFixture = async (req: Request, res: Response) => {
  try {
    const deleteFixture = await Fixture.findByIdAndDelete({ _id: req.params.id });
    if (deleteFixture) {
      res.status(200).send({ message: `Fixture ${deleteFixture._id} was deleted succesfully.` });
    }
  } catch (error) {
    res.status(400).send({ message: `Deletion failed` });
  }
};
