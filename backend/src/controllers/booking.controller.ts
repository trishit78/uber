import type { Request, Response } from "express";
import {
  createBookingService,
  findNearByDriversService,
} from "../services/booking.service.js";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const createBooking = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    const bookingData = {
      ...req.body,
      userId: authReq.user.id,
    };

    const response = await createBookingService(bookingData);


    

    res.status(201).json({
      message: "Booking done successfully",
      data: response,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Internal server error",
        data: error.message,
      });
    }
  }
};
