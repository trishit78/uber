import type { Request, Response } from "express";
import {
  createBookingService,
  findNearByDriversService,
} from "../services/booking.service.js";
import { getFare } from "../utils/ride.js";
import { getDistanceTime } from "../utils/map.js";

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


export const getFareHandler = async(req:Request,res:Response)=>{
  try {

    const {pickup,destination} = req.query;

     const sourceData = typeof pickup === 'string' ? pickup : '';
     const destinationData = typeof destination === 'string' ? destination : '';

    const distanceTime = await getDistanceTime(sourceData, destinationData);
       // const distance = distanceTime.distance.value;
        //const time: number = distanceTime.duration.value;
        const fare: Record<string, number> = getFare(distanceTime);
        console.log(fare)
    res.status(200).json({
      success:true,
      message:"fare calculated successfully",
      data:fare
    })

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Internal server error",
        data: error.message,
      });
    }
  }
}