// tslint:disable: import-name
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const { key } = require('../config/keys');
import { User } from '../models/User';

async function auth(req: any, res: Response, next: NextFunction) {
  try {
    if (req.headers.authorization) {
      const payload = req.headers.authorization.split(' ')[1];
      if (!payload) {
        return res.status(401).send(
          { message: 'Unauthorized Access' },
        );
      }

      const decoded: any = jwt.verify(payload, key);
      const user = await User.findById(decoded._id);

      if (user) {
        // check session store
        if (!req.session[user._id]) {
          return res.status(401).send({
            message: 'Session timed out. Please Login.',
          },
          );
        }

        if (payload !== req.session[user._id].token) {
          return res.status(401).send(
            { message: 'Invalid Token' },
          );
        }

        req['checkUser'] = user;
        next();
      }
    } else {
      res.status(401).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ data: { error } });
  }
}

export default auth;
