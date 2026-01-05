import redisClient from "../utils/redis.client.js";

export const setDriverSocket = async(driverId:string,socketId:string)=>{
    try {
        await redisClient.hSet('driverSockets',driverId,socketId);
    } catch (error) {
        throw error;
    }
 }
 
export const getDriverSocket = async(driverId:string)=>{
  try {
    return await redisClient.hGet('driverSockets',driverId);
  } catch (error) {
    throw error;
  }  
 }