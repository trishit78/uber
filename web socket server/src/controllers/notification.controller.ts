import type { Request, Response } from "express";
import { io } from "../config/app.config.js";
import { getDriverSocket } from "../services/driver.service.js";

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
