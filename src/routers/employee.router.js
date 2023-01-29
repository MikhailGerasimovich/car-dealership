import express from 'express';
import { employeeController } from '../controllers/employee.controller.js';
import { authRoleAccess } from '../middleware/authRoleAccess.js';
import { requestWrap } from '../middleware/requestWrap.js';
import { env } from '../env.js';

const manager = env.roles.managerRole;
const admin = env.roles.adminRole;

export const employeeRouter = express.Router();

employeeRouter.get('/', authRoleAccess([manager]), requestWrap(employeeController.readByUserId));
employeeRouter.delete('/', authRoleAccess([manager]), requestWrap(employeeController.delete));
employeeRouter.post('/sale/confirm/:saleId', authRoleAccess([manager]), requestWrap(employeeController.confirmSale));
employeeRouter.get('/sale/confirm', authRoleAccess([manager]), requestWrap(employeeController.readAllConfirmSales));

employeeRouter.post('/admin/:userId', authRoleAccess([admin]), requestWrap(employeeController.create));
employeeRouter.get('/admin', authRoleAccess([admin]), requestWrap(employeeController.readAll));
employeeRouter.delete('/admin/:employeeId', authRoleAccess([admin]), requestWrap(employeeController.deleteByAdmin));
