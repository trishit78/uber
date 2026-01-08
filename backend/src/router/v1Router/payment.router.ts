import express from 'express';
import { authRequest } from '../../middleware/auth.middleware.js';
import { paymentController } from '../../controllers/payment.controller.js';

const paymentRouter = express.Router();

paymentRouter.post('/order',authRequest,paymentController);


export default paymentRouter;