// tslint:disable: import-name
import jwt from 'jsonwebtoken';
const { key } = require('../config/keys');

import { Request, Response, NextFunction } from 'express';
function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Permission unathorized');
  try {
    const decoded = jwt.verify(token, key);
    req['checkUser'] = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
}

export default auth;
