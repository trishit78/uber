import express from 'express';
import authRouter from './user.router.js';
import driverRouter from './driver.router.js';

const v1Router = express.Router();

v1Router.use('/user',authRouter);
v1Router.use('/driver',driverRouter);

export default v1Router;