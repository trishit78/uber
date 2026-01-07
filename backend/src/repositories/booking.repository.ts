import type { BookingDataDTO } from "../dtos/booking.dto.js";
import { Booking } from "../models/booking.model.js";


export const createBookingRepo = async(bookingData:BookingDataDTO)=>{
    try {
        if(!bookingData.selectedFare){
            throw new Error('fare is required');
        }
        const booking = await Booking.create({
            userId:bookingData.userId,
            source:bookingData.source,
            destination:bookingData.destination,
            vehicleType:bookingData.vehicleType,
            distance:bookingData.distance,
            duration:bookingData.time,
            fare:bookingData.selectedFare,
            otp:bookingData.otp
        });
        return booking;
    } catch (error) {
        console.log(error)
        throw new Error('Error occured while booking')
    }
}


export async function updateBookingStatus(bookingId:string, driverId:number, status:string) {
    return Booking.findOneAndUpdate(
      { _id: bookingId, status:'pending' },
      { driverId: driverId, status: 'accepted' }, 
      { new: true }
    ).populate('driverId');
  }


export async function getBookingDetailsById(bookingId:string) {
    try {
        const data = await Booking.findById(bookingId);
        return data
    } catch (error) {
         console.log(error)
        throw new Error('Error occured while fetching booking details')
    }
} 