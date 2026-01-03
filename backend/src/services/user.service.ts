import type { SignInDTO, SignUpDTO } from "../dtos/auth.dto.js";
import bcrypt from "bcryptjs"; 
import jwt from 'jsonwebtoken'
import { getUserByEmail, signUpRepo } from "../repositories/user.repositories.js";
import { serverConfig } from "../config/index.js";

export const signUpService = async(signUpData:SignUpDTO)=>{
    try {
        const userData = signUpData;
        const password = userData.password;
        const hashedPassword = await bcrypt.hash(password,10);
        userData.password = hashedPassword
        const user = await signUpRepo(userData);
        const userDetails = {id:user.id.toString(),email:user.email}
        const signOptions: Record<string,string> = {expiresIn:serverConfig.JWT_EXPIRY};
        const token =  jwt.sign(userDetails,serverConfig.JWT_SECRET as string,signOptions);
        return {user,token} 

    } catch (error) {
        throw new Error('Error occured in signup service');
    }
}


export async function comparePassword(userPassword:string,encryptedPassword:string){
    return await bcrypt.compare(userPassword,encryptedPassword);
}

export const signInService = async(signInData:SignInDTO)=>{
    try {
        const user = await getUserByEmail(signInData.email);
        if(!user){
            throw new Error('User not found with the given email');
        }
        // console.log('hello',user)

        const isPasswordMatching =await comparePassword(signInData.password,user.password);
        if(!isPasswordMatching){
            throw new Error('Passwords did not matched');
        }
        // console.log('true',isPasswordMatching)
        const userData = {id:user.id.toString(),email:user.email};

        const signInExpiry:Record<string,string> = {expiresIn:serverConfig.JWT_EXPIRY};

        const token = jwt.sign(userData,String(serverConfig.JWT_SECRET),signInExpiry);

        return {token,user}
    } catch (error) {
    throw new Error('Error occured in signin service');
    }
}