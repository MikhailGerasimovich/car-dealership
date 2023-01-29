import express from 'express';
import { env } from '../env.js';
import { requestWrap } from '../middleware/requestWrap.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { clientController } from '../controllers/client.controller.js';
import { emailValidation } from '../helpers/requestValidation.js';

const user = env.roles.userRole;
const admin = env.roles.adminRole;

export const clientRouter = express.Router();

clientRouter.post('/', authRoleAccess([user]), emailValidation, requestWrap(clientController.create));
clientRouter.get('/', authRoleAccess([user]), requestWrap(clientController.readByUserId));
clientRouter.delete('/', authRoleAccess([user]), requestWrap(clientController.deleteByUserId));

clientRouter.post('/select/car/:carId', authRoleAccess([user]), requestWrap(clientController.selectCar));
clientRouter.delete('/select/car/:carId', authRoleAccess([user]), requestWrap(clientController.deleteSelectedCar));
clientRouter.get('/selected/cars', authRoleAccess([user]), requestWrap(clientController.readAllSelectedCars));
clientRouter.get('/purchased/cars', authRoleAccess([user]), requestWrap(clientController.readAllPurchasedCars)); //купленные машины

clientRouter.get('/admin', authRoleAccess([admin]), requestWrap(clientController.readAllByAdmin));
clientRouter.get('/admin/:clientId', authRoleAccess([admin]), requestWrap(clientController.readByAdminByClientId));
clientRouter.delete('/admin/:clientId', authRoleAccess([admin]), requestWrap(clientController.deleteByAdmin));
