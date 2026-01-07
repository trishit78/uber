import type { Request, Response } from "express";
import { getUserByIdService, signInService, signUpService } from "../services/user.service.js";


export const signUpHandler = async(req:Request,res:Response)=>{
    try {
        const response = await signUpService(req.body);
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

export const signInHandler = async(req:Request,res:Response)=>{
    try {
        const response = await signInService(req.body);
        res.status(200).json({
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
export const getUserProfileHandler = async (req: Request, res: Response) => {
    try {
       
        const userId = (req as any).user.id;
        const user = await getUserByIdService(userId);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
}


export const getUserByIdHandler = async(req:Request,res:Response)=>{
     try {
       
      const {id}=req.params;
      if(!id){
        throw new Error('no userid found')
      }
        const user = await getUserByIdService(id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
}