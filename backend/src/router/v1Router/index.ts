import express from 'express';
import authRouter from './user.router.js';
import driverRouter from './driver.router.js';
import mapRouter from './maps.router.js';
import paymentRouter from './payment.router.js';

const v1Router = express.Router();

v1Router.use('/user',authRouter);
v1Router.use('/driver',driverRouter);
v1Router.use('/map',mapRouter);
v1Router.use('/payment',paymentRouter);

export default v1Router;