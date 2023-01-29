import express from 'express';
import { authRouter } from './auth.router.js';
import { userRouter } from './user.router.js';
import { clientRouter } from './client.router.js';
import { employeeRouter } from './employee.router.js';
import { colorRouter } from './color.router.js';
import { brandRouter } from './brand.router.js';
import { carRouter } from './car.router.js';
import { saleRouter } from './sale.router.js';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/employee', employeeRouter);
router.use('/color', colorRouter);
router.use('/brand', brandRouter);
router.use('/car', carRouter);
router.use('/sale', saleRouter);
