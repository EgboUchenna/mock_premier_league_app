import { Request, Response } from 'express';

export const logout = async (req: any, res: Response) => {
  if (req.session) {
    req.session[req['checkUser']._id] = false;
  }

  return res.status(200).send({
    data: {
      message: 'You have been logged out successfully',
    },
  });
};
