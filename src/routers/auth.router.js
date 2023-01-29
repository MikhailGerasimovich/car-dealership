import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { env } from '../env.js';
import { requestWrap } from '../middleware/requestWrap.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { loginValidation, passwordValidation } from '../helpers/requestValidation.js';

const admin = env.roles.adminRole;
const validation = [loginValidation, passwordValidation];

export const authRouter = express.Router();

authRouter.post('/registration/user', validation, requestWrap(authController.registrationUser));
authRouter.post(
  '/registration/employee',
  authRoleAccess([admin]),
  validation,
  requestWrap(authController.registrationEmployee),
);

authRouter.post('/login', requestWrap(authController.login));
