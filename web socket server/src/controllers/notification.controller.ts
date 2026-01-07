import type { Request, Response } from "express";
import { io } from "../config/app.config.js";
import { getDriverSocket } from "../services/driver.service.js";
import { getUserSocket } from "../services/user.service.js";

export async function notifyDriversHandler(req: Request, res: Response) {
  try {
    const { rideId, rideInfo, driverIds } = req.body;
    console.log('ride infoformations ',rideInfo)

    const notificationData = {
      rideId,
      rideInfo,
      timeStamp: new Date().toISOString(),
    };

    const notifiedDrivers = [];
    const failedDrivers = [];

    for (const driverId of driverIds) {
      const socketId = await getDriverSocket(driverId);
      if (socketId) {
        io.to(socketId).emit("new-ride-notification", notificationData);
        notifiedDrivers.push(driverId);
      } else {
        failedDrivers.push(driverId);
      }
    }
    const result = {
      notifiedDrivers,
      failedDrivers,
      totalNotified: notifiedDrivers.length,
    };

    
    res
      .status(200)
      .send({
        data: { rideId, ...result },
        success: true,
        error: null,
        message: "Successfully notified drivers",
      });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .send({
          data: null,
          success: false,
          error: error.message,
          message: "failed to notify drivers",
        });
    }
  }
}

export async function removeRideNotificationHandler(req:Request, res:Response) {

    try {
      const { rideId, driverIds } = req.body;
      
      if (!rideId || !driverIds || !Array.isArray(driverIds)) {
        return res.status(400).send({
          data: null,
          success: false,
          error: 'Ride ID and driver IDs array are required',
          message: null
        });
      }
  
      const removalData = {
        rideId,
        timestamp: new Date().toISOString()
      };
  
      const notifiedDrivers = [];
      const failedDrivers = [];
  
      for (const driverId of driverIds) {
        const socketId = await getDriverSocket(driverId);
        
        if (socketId && io.sockets.sockets.has(socketId)) {
          io.to(socketId).emit('remove-ride-notification', removalData);
          notifiedDrivers.push(driverId);
        } else {
          failedDrivers.push(driverId);
        }
      }
  
      console.log(`Removed ride notification ${rideId} from ${notifiedDrivers.length} drivers`);
  
      const result = {
        notifiedDrivers,
        failedDrivers,
        totalRequested: driverIds.length,
        totalNotified: notifiedDrivers.length
      };
      
      res.status(200).send({
        data: {
          rideId,
          ...result
        },
        success: true,
        error: null,
        message: "Successfully removed ride notifications"
      });
  
    } catch (error) {
        if(error instanceof Error)
      res.status(500).send({
        data: null,
        success: false,
        error: error.message,
        message: "Failed to remove notifications"
      });
    }
};

export async function notifyPassengerHandler(req: Request, res: Response) {
    try {
        const { userId, rideId, message, driverDetails } = req.body;
        console.log(`Attempting to notify passenger ${userId} for ride ${rideId}`);
        
        const socketId = await getUserSocket(userId);

        if (socketId) {
            console.log(`Socket found for passenger ${userId}: ${socketId}`);
            io.to(socketId).emit("ride-confirmed", { rideId, message, driverDetails });
            res.status(200).send({ success: true, message: "Passenger notified" });
        } else {
            console.warn(`Passenger socket NOT found for userId: ${userId}`);
            res.status(404).send({ success: false, message: "Passenger socket not found" });
        }
    } catch (error) {
        console.error('Error in notifyPassengerHandler:', error);
        if (error instanceof Error)
            res.status(500).send({ success: false, error: error.message });
    }
}