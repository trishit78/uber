import type { SignUpDTO } from "../dtos/auth.dto.js";
import { User } from "../models/user.model.js";

export const signUpRepo = async(signUpData:SignUpDTO)=>{
    try {
        
        const user = await User.create(signUpData);
        
        return user;
    } catch (error) {
        throw new Error('error occured in signup repo')
    }
}

export const getUserByEmail = async(email:string)=>{
    try {
        const user = await User.findOne({
            email:email
        });
        return user;
    } catch (error) {
        throw new Error('error occured in signup repo')
    }
}

export const getUserById = async(id:string)=>{
    try {
        const user = await User.findById(id)
        return user;
    } catch (error) {
        throw new Error('error occured in signup repo')
    }
}
