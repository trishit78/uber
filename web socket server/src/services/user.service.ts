import redisClient from "../utils/redis.client.js";

export const setUserSocket = async(userId:string,socketId:string)=>{
    try {
        await redisClient.hSet('userSockets',userId,socketId);
    } catch (error) {
        throw error;
    }
 }
 
export const getUserSocket = async(userId:string)=>{
  try {
    return await redisClient.hGet('userSockets',userId);
  } catch (error) {
    throw error;
  }  
 }
