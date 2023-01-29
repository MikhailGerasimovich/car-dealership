import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { requestWrap } from '../middleware/requestWrap.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { env } from '../env.js';
import { loginValidation, passwordValidation } from '../helpers/requestValidation.js';

export const userRouter = express.Router();

const user = env.roles.userRole;
const admin = env.roles.adminRole;
const manager = env.roles.managerRole;

userRouter.get('/', authRoleAccess([user, manager]), requestWrap(userController.readById));
userRouter.put('/', authRoleAccess([user]), [loginValidation, passwordValidation], requestWrap(userController.update));
userRouter.put('/login', authRoleAccess([user]), [loginValidation], requestWrap(userController.updateLogin));
userRouter.put('/password', authRoleAccess([user]), [passwordValidation], requestWrap(userController.updatePassword));
userRouter.delete('/', authRoleAccess([user]), requestWrap(userController.delete));

userRouter.get('/admin', authRoleAccess([admin]), requestWrap(userController.readAll));
userRouter.delete('/admin/:userId', authRoleAccess([admin]), requestWrap(userController.deleteByAdmin));
