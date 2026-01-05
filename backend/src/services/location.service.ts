import redisClient from "../config/redis.config.js";

export async function addDriverLocation(
  driverId: string,
  latitude: number,
  longitude: number
) {
  try {
    await redisClient.sendCommand([
      "GEOADD",
      "drivers",
      longitude.toString(),
      latitude.toString(),
      driverId.toString(),
    ]);
  } catch (error) {
    console.log("Cannot add to redis", error);
  }
}

export async function findNearByDrivers(
  latitude: number,
  longitude: number,
  radiusKm: number
) {
  const nearByDrivers = await redisClient.sendCommand([
    "GEORADIUS",
    "drivers",
    longitude.toString(),
    latitude.toString(),
    radiusKm.toString(),
    "km",
    "WITHCOORD",
  ]);
  console.log("near", nearByDrivers);

  return nearByDrivers;
}

export async function setDriverSocket(driverId: string, socketId: string) {
  await redisClient.set(`driver:${driverId}`, socketId);
}
export async function getDriverSocket(driverId: string) {
  return await redisClient.get(`driver:${driverId}`);
}
export async function deleteDriverSocket(driverId: string) {
  await redisClient.del(`driver:${driverId}`);
}

export async function deleteBySocket(socketId: string) {
  const driverId: any = redisClient.get(socketId);
  redisClient.del(driverId);
}


export async function storedNotifiedDrivers(bookingId:string,driverIds:any[]){
        for (const driverId of driverIds){
            const addedCount = await redisClient.sAdd(`notifiedDrivers:${bookingId}`,driverId);
            console.log(`Added driver ${driverId} to the set for booking ${bookingId}. result: ${addedCount}` );
        }
    }

export     async function getNotifiedDrivers(bookingId:string){
        const nearByDrivers = await redisClient.sMembers(`notifiedDrivers:${bookingId}`);
        return nearByDrivers;
    }