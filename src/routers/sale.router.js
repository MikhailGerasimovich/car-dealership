import express from 'express';
import { env } from '../env.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { requestWrap } from '../middleware/requestWrap.js';
import { saleController } from '../controllers/sale.controller.js';

const admin = env.roles.adminRole;
const manager = env.roles.managerRole;

export const saleRouter = express.Router();

saleRouter.get('/', authRoleAccess([admin, manager]), requestWrap(saleController.readAll));
saleRouter.get('/selected', authRoleAccess([admin, manager]), requestWrap(saleController.readAllSelectedSales));
saleRouter.get('/confirmed', authRoleAccess([admin, manager]), requestWrap(saleController.readAllConfirmedSales));
saleRouter.get('/:saleId', authRoleAccess([admin, manager]), requestWrap(saleController.readById));
