// tslint:disable: import-name
// tslint:disable: ter-arrow-parens
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';
import { Team } from '../models/Team';
import auth from '../middleware/auth';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import seed from '../db';

let token: string;
let adminToken: string;
let teamA: any;
let teamB: any;
let fixturesId: string;
let fixtureLink: string;
let session: object;

beforeAll(async () => {
  await User.deleteMany({});

  const user = await request(app)
    .post('/api/v1/users/signup')
    .send({
      name: 'Egbo Uchenna',
      email: 'uche@gmail.com',
      password: 'pass123456',
    });
  token = user.body.token;
  await seed();

  teamA = await Team.findOne({ name: 'Liverpool' });
  teamB = await Team.findOne({ name: 'Manchester City' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User SignUp Routes', () => {

  it('A user can sign up', () => {
    return request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Ben Mark',
        email: 'benmark@gmail.com',
        password: 'pass123456',
      })
      .expect(res => {
        expect(Object.keys(res.body.data)).toContain('name');
        expect(Object.keys(res.body.data)).toContain('email');
      });
  });

  it('Should display sign up success', () => {
    return request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Egbo Uchenna',
        email: 'uchenna@gmail.com',
        password: 'pass123456',
      })
      .expect(res => {
        expect(res.body.output).toBe('Sign up successful.');
      });
  });

  it('should warn if same user sign up again', () => {
    return request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'Egbo Uchenna',
        email: 'uchee@gmail.com',
        password: 'pass123456',
      })
      .expect(res => {
        expect(res.body.message).toBe(`Email already exists.`);
      });
  });
});

describe('User Login Routes', () => {
  it('A registered user can login', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'uchee@gmail.com',
        password: 'pass12345',
      })
      .expect(res => {
        expect(res.body.message).toBe(`Welcome Uchenna Matt`);
      });
  });

  it('A non registered user cannot login', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'bash@gmail.com',
        password: 'pass123456',
      })
      .expect(res => {
        expect(res.body.message).toBe(`Email does not exist.`);
      });
  });

  it('Admin can login', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'bash@example.com',
        password: 'pass12345',
      })
      .expect(res => {
        adminToken = res.body.token;
        expect(res.body.message).toBe(`Welcome Bash Phil`);
      });
  });

  it('Passwords should match', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'sewa@example.com',
        password: 'pass2',
      })
      .expect(res => {
        expect(res.body.message).toBe(`Password is incorrect.`);
      });
  });
});

// mocking the auth middleware
jest.mock('../middleware/auth');
const mockedAuth = auth as jest.Mocked<any>;
mockedAuth.mockImplementation(
  async (req: any, res: Response, next: NextFunction) => {
    // mock req.session

    // session store
    session = {};
    try {
      const payload = req.headers.authorization.split(' ')[1];
      if (!payload) {
        return res.status(401).send({ message: 'Access denied no token provided' },
        );
      }
      // @ts-ignore
      const decoded: any = jwt.verify(payload, process.env.KEY);

      // say the user has already logged in / sign up
      // @ts-ignore
      session[decoded._id] = { token: payload };

      if (decoded) {
        // check the session store
        // @ts-ignore
        if (!session[decoded._id]) {
          return res.status(401).send({ message: 'Session over, Pls login...' },
          );
        }
        // @ts-ignore
        if (payload !== session[decoded._id].token) {
          return res.status(401).send({ message: 'Invalid Token' },
          );
        }
        req['checkUser'] = decoded;
        next();

      } else {
        res.status(401).send({ message: 'user does not exist' });
      }
    } catch (error) {
      res.status(400).send({ data: { error } });
    }
  },
);

describe('Fixtures Routes', () => {
  it('Authenticated users should see fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures')
      .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.body.message).toHaveLength(10);
      });
  });

  it('Unauthorized users should not see fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures')
      .expect('Content-Type', /json/)
      .set('Authorization', `abcd`)
      .expect(res => {
        expect(res.body.message).toBe('Access denied no token provided');
      });
  });

  it('Unauthenticated users should not see fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures')
      .set('Authorization', `Bearer ${'gibberish'}`)
      .expect(res => {
        expect(res.body.data.error.message).toBe('jwt malformed');
      });
  });

  it('Users should see completed fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures/played')
      .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.body.message[0]).toHaveProperty('homeScore');
        expect(res.body.message[0]).toHaveProperty('awayScore');
        expect(res.body.message[0]).toHaveProperty('played');
        expect(res.body.message[0]).toHaveProperty('homeTeam');
        expect(res.body.message[0]).toHaveProperty('awayTeam');
        expect(res.body.message[0]).toHaveProperty('time');
        expect(res.body.message[0]).toHaveProperty('stadium');
      });
  });

  it('Users should see pending fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures/pending')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Admin should create fixtures', () => {
    return request(app)
      .post('/api/v1/fixtures')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        homeTeam: teamA._id,
        awayTeam: teamB._id,
        time: '7:00pm',
        homeScore: 0,
        awayScore: 0,
        stadium: 'Anfield',
        played: false,
      })
      .expect(res => {
        // add fixtures properties
        fixturesId = res.body.message._id;
        fixtureLink = res.body.message.link;
        expect(res.body.message).toMatchObject({
          homeScore: 0,
          awayScore: 0,
          stadium: 'Anfield',
          played: false,
        });
      });
  });

  it('Users should see a fixtures by link', () => {
    const link = fixtureLink.split('/');
    const linkID = link[link.length - 1];
    return request(app)
      .get(`/api/v1/fixtures/${linkID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.body.message).toMatchObject({
          homeScore: 0,
          awayScore: 0,
          stadium: 'Anfield',
          homeTeam: { name: 'Liverpool', coach: 'Jurgen Klopp' },
          awayTeam: { name: 'Manchester City', coach: 'Pep Guardiola' },
          time: '7:00pm',
          played: false,
        });
      });
  });

  it('Admin should update fixtures', () => {
    return request(app)
      .put(`/api/v1/fixtures/${fixturesId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        homeScore: 4,
        awayScore: 2,
        played: true,
      })
      .expect(res => {
        expect(res.body.message).toBe(
          `Fixture ${fixturesId} was updated successfully.`,
        );
      });
  });

  it('Admin should delete fixtures', () => {
    return request(app)
      .delete(`/api/v1/fixtures/${fixturesId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(res => {
        expect(res.body.message).toBe(
          `Fixture ${fixturesId} was deleted successfully.`,
        );
      });
  });
});

describe('Teams Routes', () => {
  it('Users should view teams', () => {
    return request(app)
      .get(`/api/v1/teams`)
      .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.body.message[0]).toHaveProperty('name');
        expect(res.body.message[0]).toHaveProperty('founded');
        expect(res.body.message[0]).toHaveProperty('website');
        expect(res.body.message[0]).toHaveProperty('nick_name');
      });
  });

  it('Admin should create teams', async () => {
    return request(app)
      .post(`/api/v1/teams`)
      .set('Authorization', `Bearer ${adminToken}`).send({
        name: 'Leeds United',
        nick_name: 'The Bulls',
        website: 'https://leedsunited.com',
        coach: 'Marcelo Bielsa',
        founded: 1908,
        stadium_name: 'Barlos Road',
        stadium_capacity: '43,000',
      }).expect(res => {
        expect(res.body.data.message).toBe(
          `Team Leeds United A.K.A "The Bulls" created successfully.`,
        );
      });
  });

  it('User should not create teams', () => {
    return request(app)
      .post(`/api/v1/teams`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Swansea',
        nick_name: 'The Swans',
        website: 'https://swanseafc.com',
        coach: 'Richard Greene',
        founded: 1970,
        stadium_name: 'Liberty Stadium',
        stadium_capacity: '45,050',
      })
      .expect(res => {
        expect(res.body.message).toBe(`Unauthorized access.`);
      });
  });

  it('Admin should update teams', () => {
    return request(app)
      .put(`/api/v1/teams/${teamA._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        coach: 'Jurgen Klopp',
        nick_name: 'The Reds',
        founded: 1892,
        stadium_name: 'Anfield',
        stadium_capacity: '60,234',
      })
      .expect(res => {
        expect(res.body.message).toBe(
          `Team Liverpool has been updated successfully.`,
        );
      });
  });

  it('Users should not update teams', () => {
    return request(app)
      .put(`/api/v1/teams/${teamA._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        coach: 'Willams James',
        website: 'https://brightonfc.com',
        founded: 1877,
        stadium_name: 'Seagulls',
        stadium_capacity: '30,033',
      })
      .expect(res => {
        expect(res.body.message).toBe(`Unauthorized access.`);
      });
  });

  it('Admin should remove team', () => {
    return request(app)
      .delete(`/api/v1/teams/${teamA._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(res => {
        expect(res.body.message).toBe(
          `Team Liverpool has been deleted successfully.`,
        );
      });
  });
});

describe('Search Routes', () => {
  it('All users can search team robustly (eg using coach name)', () => {
    return request(app)
      .get(`/api/v1/search/team/${'Jurgen'}`)
      .expect(res => {
        expect(res.body.message[0]).toMatchObject({
          wins: 10,
          losses: 0,
          goals: 29,
          name: 'Liverpool',
          nick_name: 'The Reds',
          coach: 'Jurgen Klopp',
          website: 'https://www.liverpoolfc.com',
          founded: 1892,
          stadium_name: 'Anfield',
          stadium_capacity: '54,074',
        });
      });
  });

  it('All users can search team robustly using team name', () => {
    return request(app)
      .get(`/api/v1/search/team/${'liver'}`)
      .expect(res => {
        expect(res.body.message[0]).toMatchObject({
          wins: 10,
          losses: 0,
          goals: 29,
          name: 'Liverpool',
          nick_name: 'The Reds',
          coach: 'Jurgen Klopp',
          website: 'https://www.liverpoolfc.com',
          founded: 1892,
          stadium_name: 'Anfield',
          stadium_capacity: '54,074',
        });
      });
  });

  it('All user can search team robustly using year founded', () => {
    return request(app)
      .get(`/api/v1/search/team/1980`)
      .expect(res => {
        expect(res.body.message[0]).toHaveProperty('coach');
        expect(res.body.message[0]).toHaveProperty('nick_name');
        expect(res.body.message[0]).toHaveProperty('wins');
      });
  });

  it('All users can search fixtures robustly using team name', () => {
    return request(app)
      .get(`/api/v1/search/fixtures/${'Chelsea'}`)
      .expect(res => {
        expect(res.body.message).toHaveProperty('homeScore');
        expect(res.body.message).toHaveProperty('awayScore');
        expect(res.body.message).toHaveProperty('time');
        expect(res.body.message).toHaveProperty('link');
      });
  });

  it('returns invalid input if user input id not valid', () => {
    return request(app)
      .get(`/api/v1/search/fixtures/${'ckkjf'}`)
      .expect(res => {
        console.log(res.body);
        expect(res.body.message).toBe('Invalid Input');
      });
  });
});
