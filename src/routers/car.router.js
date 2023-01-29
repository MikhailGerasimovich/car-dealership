import express from 'express';
import { env } from '../env.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { requestWrap } from '../middleware/requestWrap.js';
import { carController } from '../controllers/car.controller.js';
import { carInfoValidation } from '../helpers/requestValidation.js';

const admin = env.roles.adminRole;
const manager = env.roles.managerRole;

export const carRouter = express.Router();

carRouter.get('/', requestWrap(carController.readAll));
carRouter.get('/:carId', requestWrap(carController.readById));
carRouter.post('/', authRoleAccess([admin, manager]), carInfoValidation, requestWrap(carController.create));
carRouter.put('/:carId', authRoleAccess([admin, manager]), requestWrap(carController.update));
carRouter.delete('/:carId', authRoleAccess([admin, manager]), requestWrap(carController.delete));
