import express from 'express';
import { env } from '../env.js';
import { colorController } from '../controllers/color.controller.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { requestWrap } from '../middleware/requestWrap.js';

const admin = env.roles.adminRole;
const manager = env.roles.managerRole;

export const colorRouter = express.Router();

colorRouter.post('/', authRoleAccess([admin, manager]), requestWrap(colorController.create));
colorRouter.get('/', authRoleAccess([admin, manager]), requestWrap(colorController.readAll));
colorRouter.get('/id/:colorId', authRoleAccess([admin, manager]), requestWrap(colorController.readById));
colorRouter.get('/name/:colorName', authRoleAccess([admin, manager]), requestWrap(colorController.readByName));
colorRouter.delete('/id/:colorId', authRoleAccess([admin, manager]), requestWrap(colorController.deleteById));
colorRouter.delete('/name/:colorName', authRoleAccess([admin, manager]), requestWrap(colorController.deleteByName));
