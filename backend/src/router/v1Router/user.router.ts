import express, { type Request, type Response } from 'express';
import {  getUserByIdHandler, getUserProfileHandler, signInHandler, signUpHandler } from '../../controllers/user.controller.js';
import { authRequest } from '../../middleware/auth.middleware.js';
import { createBooking } from '../../controllers/booking.controller.js';


const authRouter = express.Router();


authRouter.post('/signup',signUpHandler);
authRouter.post('/signin',signInHandler);
authRouter.get('/me',authRequest,getUserProfileHandler);

authRouter.post('/create',authRequest,createBooking)
authRouter.get('/:id',getUserByIdHandler);


export default authRouter;


