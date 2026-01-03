import express, { type Request, type Response } from 'express';
import {  signInHandler, signUpHandler } from '../../controllers/user.controller.js';
import { authRequest, driverAuthRequest } from '../../middleware/auth.middleware.js';
import { signInDriverHandler, signUpDriverHandler } from '../../controllers/driver.controller.js';


const driverRouter = express.Router();


driverRouter.post('/signup',signUpDriverHandler);
driverRouter.post('/signin',signInDriverHandler);
driverRouter.get('/me',driverAuthRequest,(_req:Request,res:Response)=>{
    console.log('hello')
    res.send('ok')
});

export default driverRouter;


