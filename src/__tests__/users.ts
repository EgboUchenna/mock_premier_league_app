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
