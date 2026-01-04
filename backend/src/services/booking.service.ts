import type { BookingServiceDataDTO } from "../dtos/booking.dto.js";
import { createBookingRepo } from "../repositories/booking.repository.js";
import { getAddressCoordinate, getDistanceTime } from "../utils/map.js";
import { getFare } from "../utils/ride.js";
import crypto from "crypto";
import { findNearByDrivers } from "./location.service.js";

function generateOtp(num: number) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

export const createBookingService = async (
  bookingData: BookingServiceDataDTO
) => {
  try {
      const source = bookingData.source;
      const destination = bookingData.destination;
      const distanceTime = await getDistanceTime(source, destination);
      const distance = distanceTime.distance.value;
      const time :number = distanceTime.duration.value
      const fare: Record<string, number> = getFare(distanceTime);
      if(!fare){
        throw new Error('no fare calc')
    }
    const selectedFare = fare[bookingData.vehicleType];
    const otp = generateOtp(6);
    const data = {
        ...bookingData,
        distance,
        time,
        selectedFare,
        otp
    }

    const booking = await createBookingRepo(data);
    return booking
  } catch (error) {
    throw new Error("error occured while creating a booking");
  }
};



export async function findNearByDriversService(location:string) {

  const details = await getAddressCoordinate(location);
  const longitude = details?.lng;
  const  latitude = details?.ltd;
  
  

  const nearByDrivers = await findNearByDrivers(
    latitude,
    longitude,
    5
  );

  return nearByDrivers;
}
