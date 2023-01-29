import jwt from 'jsonwebtoken';
import { env } from '../env.js';
import { StatusCodes } from 'http-status-codes';

export function authRoleAccess(roles) {
  //замыкание
  return function (req, res, next) {
    //проверяет, авторизован ли пользователь с учетом его ролей
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'User not authorized' });
      }
      const decodedData = jwt.verify(token, env.login.secret);
      const { userRoles } = decodedData;
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role.name)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: `You don't have access` });
      }
      req.payload = decodedData;
      next();
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'User not authorized' });
    }
  };
}
