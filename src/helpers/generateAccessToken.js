import jwt from 'jsonwebtoken';
import { env } from '../env.js';

export const generateAccessToken = (userId, userRoles) => {
  //полезные данные хранящиеся в токене
  const payload = {
    userId,
    userRoles,
  };
  return jwt.sign(payload, env.login.secret, { expiresIn: '1h' });
};
