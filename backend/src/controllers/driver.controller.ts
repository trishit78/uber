import type { Request, Response } from "express";
import { signInDriverService, signUpDriverService, updateLocationService } from "../services/driver.service.js";
import { getAddressCoordinate } from "../utils/map.js";

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
        res.status(201).json({
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