import express, { type Request, type Response } from 'express';
import {  driverAuthRequest } from '../../middleware/auth.middleware.js';
import { confirmBookingHandler, signInDriverHandler, signUpDriverHandler, updateLocationHandler } from '../../controllers/driver.controller.js';


const driverRouter = express.Router();


driverRouter.post('/signup',signUpDriverHandler);
driverRouter.post('/signin',signInDriverHandler);
driverRouter.get('/me',driverAuthRequest,(_req:Request,res:Response)=>{
    console.log('hello')
    res.send('ok')
});
driverRouter.post('/location',driverAuthRequest,updateLocationHandler);
driverRouter.post('/confirm',driverAuthRequest,confirmBookingHandler);
export default driverRouter;


