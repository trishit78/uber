import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app=express();


const server =http.createServer(app); 


const io =new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

app.use(cors())
app.use(express.json())

export {
    app,server,io
}