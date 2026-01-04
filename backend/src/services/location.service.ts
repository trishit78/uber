import redisClient from "../config/redis.config.js";



export async function addDriverLocation(driverId:string,latitude:number,longitude:number) {

        try {
             await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                longitude.toString(),
                latitude.toString(),
                driverId.toString(),
            ]);
            
        }catch(error){
            console.log("Cannot add to redis", error);
        }
    
}


 export async function findNearByDrivers(latitude:number,longitude:number,radiusKm:number){
        

        const nearByDrivers = await redisClient.sendCommand([
            'GEORADIUS',
            'drivers',
            longitude.toString(),
            latitude.toString(),
            radiusKm.toString(),
            'km',
            'WITHCOORD'
        ])       
        console.log('near',nearByDrivers)
        
        return nearByDrivers
    }
