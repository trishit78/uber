import type { Request, Response } from "express";
import { signInDriverService, signUpDriverService } from "../services/driver.service.js";



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

