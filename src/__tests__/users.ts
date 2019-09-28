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
  token = user.body.data.token;
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
        expect(res.body.message).toBe('access denied no token provided');
      });
  });

  it('Unauthenticated users should not see fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures')
      .set('Authorization', `Bearer ${'gibberish'}`)
      .expect(res => {
        expect(res.body.error.message).toBe('jwt malformed');
      });
  });

  it('Users should see completed fixtures', () => {
    return request(app)
      .get('/api/v1/fixtures/complete')
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
      .get('/api/v1/fixtures/pend')
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
        stadium: 'boltonfield',
        played: false,
      })
      .expect(res => {
        // assign fixtures properties
        fixturesId = res.body.message._id;
        fixtureLink = res.body.message.link;

        expect(res.body.message).toMatchObject({
          homeScore: 0,
          awayScore: 0,
          stadium: 'boltonfield',
          played: false,
        });
      });
  });

  it('Users should see a fixtures by link', () => {
    const link = fixtureLink.split('/');
    const mainLink = link[link.length - 1];
    return request(app)
      .get(`/api/v1/fixtures/${mainLink}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(res => {
        expect(res.body.message).toMatchObject({
          homeScore: 0,
          awayScore: 0,
          stadium: 'boltonfield',
          homeTeam: { name: 'Brimingham City', coach: 'ochuko' },
          awayTeam: { name: 'Fulham', coach: 'Van gwart' },
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
          `Fixture ${fixturesId} updated successfully`,
        );
      });
  });

  it('Admin should delete fixtures', () => {
    return request(app)
      .delete(`/api/v1/fixtures/${fixturesId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(res => {
        expect(res.body.message).toBe(
          `Fixture ${fixturesId} deleted successfully`,
        );
      });
  });
});
