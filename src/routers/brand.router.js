import express from 'express';
import { env } from '../env.js';
import { brandController } from '../controllers/brand.controller.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { requestWrap } from '../middleware/requestWrap.js';

const admin = env.roles.adminRole;
const manager = env.roles.managerRole;

export const brandRouter = express.Router();

brandRouter.post('/', authRoleAccess([admin, manager]), requestWrap(brandController.create));
brandRouter.get('/', authRoleAccess([admin, manager]), requestWrap(brandController.readAll));
brandRouter.get('/id/:brandId', authRoleAccess([admin, manager]), requestWrap(brandController.readById));
brandRouter.delete('/id/:brandId', authRoleAccess([admin, manager]), requestWrap(brandController.deleteById));
brandRouter.delete('/name/:name', authRoleAccess([admin, manager]), requestWrap(brandController.deleteByName));
