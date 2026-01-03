import express, { type Request, type Response } from 'express';
import {  signInHandler, signUpHandler } from '../../controllers/user.controller.js';
import { authRequest } from '../../middleware/auth.middleware.js';


const authRouter = express.Router();


authRouter.post('/signup',signUpHandler);
authRouter.post('/signin',signInHandler);
authRouter.get('/me',authRequest,(_req:Request,res:Response)=>{
    console.log('hello')
    res.send('ok')
});

export default authRouter;


