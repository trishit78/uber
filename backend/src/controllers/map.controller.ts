import type { Request, Response } from "express";
import { getAutoCompleteSuggestions } from "../utils/map.js";

export const getAutoCompleteSuggestionsHandler = async(req:Request,res:Response)=>{
    try {
        const address= req.query;
        console.log('address',address.input)
        
        const input = typeof address.input === 'string' ? address.input : '';
        const response = await getAutoCompleteSuggestions(input);
        res.status(200).json({
            success:true,
            message:"Suggestions fetched successfully",
            data:response
        })
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({
                success:false,
                message:"Internal Server Error",
                data:error.message
            })
        }
    }
}