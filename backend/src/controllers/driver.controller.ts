import type { Request, Response } from "express";
import { assignDriverService, signInDriverService, signUpDriverService, updateLocationService } from "../services/driver.service.js";
import { getAddressCoordinate } from "../utils/map.js";
import axios from "axios";
import { getNotifiedDrivers } from "../services/location.service.js";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}


export const signUpDriverHandler = async(req:Request,res:Response)=>{
    try {
        const response = await signUpDriverService(req.body);
        res.status(201).json({
            success:true,
            message:"User signed up successfully",
            data:response
        })
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({
                success:false,
                message:'Internal server error',
                data:error.message
            })
        }   
    }
}

export const signInDriverHandler = async(req:Request,res:Response)=>{
    try {
        const response = await signInDriverService(req.body);
        res.status(200).json({
            success:true,
            message:"User signed in successfully",
            data:response
        })
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({
                success:false,
                message:'Internal server error',
                data:error.message
            })
        }   
    }
}

export const updateLocationHandler = async(req:Request,res:Response)=>{
    try {
         const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
        const location = req.body;
        
        const coord = await getAddressCoordinate(location.location);
        const long :number = coord?.lng;
        const lat:number = coord?.ltd;
        const response= updateLocationService({passengerId: authReq.user.id.toString(), long, lat});

         
        res.status(200).json({
            data:response
        })
        
        
    } catch (error) {
         if(error instanceof Error){
            res.status(400).json({
                success:false,
                message:'Internal server error',
                data:error.message
            })
        }   
    }
}


export async function confirmBookingHandler(req:Request,res:Response) {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    const {bookingId} = req.body;

    const booking = await assignDriverService(bookingId,authReq.user.id);
    console.log(booking,bookingId);
    const notifiedDriverIds = await getNotifiedDrivers(bookingId);
    console.log('notified driver ids',notifiedDriverIds);
    try {
        const notificationResponse = await axios.post('http://localhost:3001/api/remove-ride-notification',{
            rideId:bookingId,
            driverIds:notifiedDriverIds
        })
        console.log('Successfully removed ride notifications',notificationResponse.data);

    } catch (error) {
        if(error instanceof Error)
        console.log('error in driver controllers',error.message);
    }


     res.status(201)
    .send({data:booking, success: true, error: null, message: "successfully confirmed booking"});

}
