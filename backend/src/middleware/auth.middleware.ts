import type { NextFunction, Request, Response } from "express";
import { serverConfig } from "../config/index.js";
import jwt from 'jsonwebtoken'
import { getUserById } from "../repositories/user.repositories.js";

export async function isAuthenticated(token:string){
    try {
        if(!token){
            throw new Error('missing jwt token');
        }

        const response = jwt.verify(token,serverConfig.JWT_SECRET);
        
        if(!response){
            throw new Error('Invalid token in payload');
        }

        const user = await getUserById((response as any).id);
     
        
        if(!user){
            throw new Error('No user found');
        }

        return user._id



    } catch (error:unknown) {
        if(error instanceof Error){
            if(error.name == 'JsonWebTokenError'){
                throw new Error('Invalid JWT Token');
            }
            if(error.name == 'TokenExpiredError'){
                throw new Error('JWT token expired');
            }
            throw error;
        }
        throw new Error('Internal server error in auth middleware')
    }
}

export const authRequest = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const authHeader =req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            res.status(401).json({
                success:false,
                message:"Invalid auth header"
            })
        };
        
        
        const token = authHeader?.split(" ")[1];
        
        if(!token){
            throw new Error("Bearer Token is missing")
        }
        
        if(typeof token !== "string"){
            res.status(401).json({
                success:false,
                message:"Missing or Invalid access token"
            })
        }
        
        const response =await isAuthenticated(token);
        if(!response){
            res.status(401).json({
                success:false,
                message:'Unauthorized'
            })
        };

        req.user ={id:response};
        next();


    } catch (error) {
        if(error instanceof Error){
            res.status(401).json({
                success:false,
                message:'Unauthorized',
                data:error.message
            })
        }
    }
}