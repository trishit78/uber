import Razorpay from "razorpay";
import { serverConfig } from "./index.js";


const instance = new Razorpay({
    key_id: serverConfig.RAZORPAY_API_KEY,
    key_secret: serverConfig.RAZORPAY_SECRET_KEY,
});

export default instance;