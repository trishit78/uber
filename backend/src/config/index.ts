import dotenv from 'dotenv';

type ServerConfig = {
    PORT:number,
    MONGO_URI:string
    JWT_SECRET:string
    JWT_EXPIRY:string
};


function loadEnv(){
    dotenv.config()
}

loadEnv()

export const serverConfig:ServerConfig={
    PORT:Number(process.env.PORT)||3001,
    MONGO_URI:process.env.MONGO_URI|| '',
    JWT_SECRET:process.env.JWT_SECRET|| 'uber',
    JWT_EXPIRY:process.env.JWT_EXPIRY|| '1d',

}