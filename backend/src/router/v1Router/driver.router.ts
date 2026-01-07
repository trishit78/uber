import express, { type Request, type Response } from 'express';
import {  driverAuthRequest } from '../../middleware/auth.middleware.js';
import { confirmBookingHandler, getDriverProfileHandler, signInDriverHandler, signUpDriverHandler, updateLocationHandler } from '../../controllers/driver.controller.js';
import { getBookingDetails } from '../../controllers/booking.controller.js';


const driverRouter = express.Router();


driverRouter.post('/signup',signUpDriverHandler);
driverRouter.post('/signin',signInDriverHandler);
driverRouter.get('/me',driverAuthRequest,getDriverProfileHandler);
driverRouter.post('/location',driverAuthRequest,updateLocationHandler);
driverRouter.post('/confirm',driverAuthRequest,confirmBookingHandler);
driverRouter.get('/details/:id',getBookingDetails);

export default driverRouter;


