import express from 'express';
import { serverConfig } from './config/index.js';
import cors from 'cors'

const app= express();
app.use(express.json());
app.use(cors())

app.listen(serverConfig.PORT,()=>{
    console.log(`server is running on ${serverConfig.PORT}`)
})