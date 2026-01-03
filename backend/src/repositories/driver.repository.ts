import type { SignUpDriverDTO } from "../dtos/auth.dto.js";
import { Driver } from "../models/driver.model.js";

export const signUpDriverRepo = async(signUpData:SignUpDriverDTO)=>{
    try {
        
        const user = await Driver.create({
            name:signUpData.name,
            email:signUpData.email,
            password:signUpData.password,
            vehicle:{
                color: signUpData.vehicle.color,
                plate: signUpData.vehicle.plate,
                capacity: signUpData.vehicle.capacity,
                vehicleType: signUpData.vehicle.vehicleType
            }
        })

        return user;
    } catch (error) {
        throw new Error('error occured while creating user');
    }
}









export const getUserByEmail = async(email:string)=>{
    try {
        const user = await Driver.findOne({
            email:email
        });
        return user;
    } catch (error) {
        throw new Error('error occured in signup repo')
    }
}

export const getDriverById = async(id:string)=>{
    try {
        const user = await Driver.findById(id)
        return user;
    } catch (error) {
        throw new Error('error occured in signup repo')
    }
}
