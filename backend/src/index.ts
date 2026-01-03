import express from 'express';
import { serverConfig } from './config/index.js';
import cors from 'cors'
import v1Router from './router/v1Router/index.js';
import { connectDB } from './config/db.js';
import { getAutoCompleteSuggestions } from './utils/map.js';

const app= express();
app.use(express.json());
app.use(cors())



app.use('/api/v1',v1Router)


app.listen(serverConfig.PORT,async()=>{
    console.log(`server is running on ${serverConfig.PORT}`)
    await connectDB()

    getAutoCompleteSuggestions('belurma')
})