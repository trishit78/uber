import { response, type Request, type Response } from "express";
//import razorpay from '../config/razorpay.config.js'
import instance from "../config/razorpay.config.js";

export const paymentController = async(req:Request,res:Response)=>{
    try {
        console.log('hello',req.body)
        const amount = req.body.amount;
        const options = {
            amount:amount,
            currency:"INR"
        }
        console.log(options)

        const order = await instance.orders.create({
            amount:amount,
            currency:"INR"
        });
        console.log(order)
        res.status(200).json({
            success:true,
            data:order
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