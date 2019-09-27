import teams from './seed/teams';
import fixtures from './seed/fixtures';
import users from './seed/users';
import { Team } from '../models/Team';
import { Fixture } from '../models/Fixture';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

const cleanDb = async () => {
  try {
    console.log('Succesfully cleared db');
    await Team.deleteMany({});
    await Fixture.deleteMany({});
    await User.deleteMany({});
  } catch (err) {
    console.log('Error occurred', err);
    return err;
  }
};

const seedTeam = async () => {
  try {
    const allTeams = teams.map(async (team) => {
      const newTeam = await new Team(team);
      return newTeam.save();
    });
    const res = await Promise.all(allTeams);
    return res;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

const seedUser = async () => {
  try {
    const allUsers = users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await new User(user);
      return newUser.save();
    });
    const res = await Promise.all(allUsers);
    return res;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

const seedFixture = async () => {
  try {
    const allfixtures = fixtures.map(async (fixture) => {
      const hometeam = await Team.findOne({ name: fixture.homeTeam }).exec();
      const awayteam = await Team.findOne({ name: fixture.awayTeam }).exec();
      if (hometeam && awayteam) {
        const newFixtures = new Fixture({
          ...fixture,
          homeTeam: hometeam.id,
          awayTeam: awayteam.id,
        });
        await newFixtures.save();
      }
    });
    const res = await Promise.all(allfixtures);
    return res;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

const seed = async () => {
  return await cleanDb()
    .then(async () => {
      await seedTeam();
      await seedUser();
      await seedFixture();
    })
    .then(() => console.log(`Database seeded successfully.`))
    .catch(err =>
      console.log({ err }),
    );
};

export default seed;
