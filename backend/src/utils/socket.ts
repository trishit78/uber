import { deleteBySocket, setDriverSocket } from "../services/location.service.js";

export function initSocket(io:any){
    io.on('connection',(socket:any)=>{
        console.log(`New socket connected:${socket.id}`);
        socket.on('registerDriver',async(driverId:any)=>{
            if(!driverId) return;
            await setDriverSocket(driverId,socket.id);
            console.log(`Registered driver ${driverId} with socket ${socket.id}`)
        })
    
        
        socket.on('disconnect',async()=>{
            const driverId = await deleteBySocket(socket.id);
            console.log(`Socket ${socket.id} disconnected ${driverId}`);
        })
        
    });
}
