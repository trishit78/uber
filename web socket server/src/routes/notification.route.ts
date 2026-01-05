import express from 'express';
import { notifyDriversHandler } from '../controllers/notification.controller.js';

const notificationRoute = express.Router();
notificationRoute.post('/notify-drivers',notifyDriversHandler);
//router.post('/remove-ride-notification',removeRideNotificationHandler);

export default notificationRoute;
