import express from 'express';
import { notifyDriversHandler, notifyPassengerHandler, removeRideNotificationHandler } from '../controllers/notification.controller.js';

const notificationRoute = express.Router();
notificationRoute.post('/notify-drivers',notifyDriversHandler);
notificationRoute.post('/remove-ride-notification',removeRideNotificationHandler);
notificationRoute.post('/notify-passenger', notifyPassengerHandler);

export default notificationRoute;
