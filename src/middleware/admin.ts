import { Request, Response, NextFunction } from 'express';

function admin(req: any, res: Response, next: NextFunction) {
  if (!req['checkUser'].isAdmin) {
    return res.status(403).send({ data: { message: 'Unauthorized access.' } });
  }

  next();
}

export default admin;
