import express from 'express';
import { notifyDriversHandler, removeRideNotificationHandler } from '../controllers/notification.controller.js';

const notificationRoute = express.Router();
notificationRoute.post('/notify-drivers',notifyDriversHandler);
notificationRoute.post('/remove-ride-notification',removeRideNotificationHandler);

export default notificationRoute;
