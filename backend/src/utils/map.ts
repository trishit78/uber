import axios from "axios";
import { serverConfig } from "../config/index.js"

export const getAddressCoordinate = async(address:string)=>{
    try {
        const url = `${serverConfig.GOOGLE_MAPS_URL}/geocode/json?address=${encodeURIComponent(address)}&key=${serverConfig.GOOGLE_MAPS_API_KEY}`;


         const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
             
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
    }
}


export const getDistanceTime = async (origin:string,destination:string) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
  
    const url = `${serverConfig.GOOGLE_MAPS_URL}/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${serverConfig.GOOGLE_MAPS_API_KEY}`;
    
    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {

            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getAutoCompleteSuggestions = async (input:string) => {
    if (!input) {
        throw new Error('query is required');
    }

    const url = `${serverConfig.GOOGLE_MAPS_URL}/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${serverConfig.GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map((prediction:any) => prediction.description).filter((value: string) => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}