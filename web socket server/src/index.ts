import { app,server,io } from "./config/app.config.js";
import notificationRoute from "./routes/notification.route.js";
import { setDriverSocket } from "./services/driver.service.js";
import { setUserSocket } from "./services/user.service.js";


app.use('/api',notificationRoute)

io.on('connection',(socket)=>{
    console.log('New Connection: ',socket.id);
    socket.on('driver-login',async(data)=>{
        try{
            const {driverId} = data;
            await setDriverSocket(driverId,socket.id);

            socket.emit('login-success',{
                message:'Successfully connected',
                driverId
            })
        }catch{
            socket.emit('error',{
                message:'Connection Failed'
            })
        }
    })

    socket.on('join', async (data) => {
        try {
            const { userId, userType } = data;
            if (userType === 'user') {
              
                await setUserSocket(userId, socket.id);
            } else if (userType === 'driver') {
                await setDriverSocket(userId, socket.id);
            }
            socket.emit('login-success', { message: 'Successfully connected', userId });
        } catch (error) {
            socket.emit('error', { message: 'Connection Failed' });
        }
    });

    // handle disconnection
})

const PORT = 3001;


server.listen(PORT,()=>{
    console.log(`Websocket server running on port ${PORT}`);
})