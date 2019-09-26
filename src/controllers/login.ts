import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { Response, Request } from 'express';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (!checkUser) return res.status(404).send({ message: 'Email does not exist.' });

  const passwordMatch = await bcrypt.compare(password, checkUser.password);
  if (!passwordMatch) {
    return res.status(404).send({ message: 'Password is incorrect.' });
  }

  // Send a token in the request header
  const token = checkUser.getAuthToken();
  return res.status(200).send({ message: `${token}` });
};
