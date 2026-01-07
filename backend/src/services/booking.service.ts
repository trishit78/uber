import type { BookingServiceDataDTO } from "../dtos/booking.dto.js";
import { createBookingRepo, getBookingDetailsById } from "../repositories/booking.repository.js";
import { getAddressCoordinate, getDistanceTime } from "../utils/map.js";
import { getFare } from "../utils/ride.js";
import crypto from "crypto";
import { findNearByDrivers, storedNotifiedDrivers } from "./location.service.js";
import axios from "axios";

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
    const time: number = distanceTime.duration.value;
    const fare: Record<string, number> = getFare(distanceTime);
    if (!fare) {
      throw new Error("no fare calc");
    }
    const selectedFare = fare[bookingData.vehicleType];
    const otp = generateOtp(6);
    const data = {
      ...bookingData,
      distance,
      time,
      selectedFare,
      otp,
    };

    const booking = await createBookingRepo(data);

    const nearbyDrivers = await findNearByDriversService(source);
    if (!nearbyDrivers || !Array.isArray(nearbyDrivers)) {
      throw new Error("No nearby drivers found");
    }
    console.log("nearby drivers", nearbyDrivers);

    const driverIds = nearbyDrivers.map(driver =>driver[0])

     const rideInfo = {
        source,destination,passengerId:bookingData.userId,
        estimatedFare:selectedFare,
        distance:distance,
        pickupTime:new Date().toISOString()
    }
    console.log('ride info',rideInfo);

        try {
        const notificationResponse = await axios.post('http://localhost:3001/api/notify-drivers',{
            rideId:booking._id.toString(),
            rideInfo,
            driverIds
        });
        await storedNotifiedDrivers(booking._id.toString(),driverIds);
        console.log('Notification sent successfully', notificationResponse.data);

    } catch (error) {
      if(error instanceof Error)
        console.log('Failed to notify drivers:',error.message);
    }

    


    return booking;
  } catch (error) {
    throw new Error("error occured while creating a booking");
  }
};

export async function findNearByDriversService(location: string) {
  const details = await getAddressCoordinate(location);
  const longitude = details?.lng;
  const latitude = details?.ltd;

  const nearByDrivers = await findNearByDrivers(latitude, longitude, 5);

  return nearByDrivers;
}


export async function getBookingDetailsService(bookingId:string) {
 try {
        const bookingData = await getBookingDetailsById(bookingId);
        return bookingData;
    } catch (error) {
        throw new Error('Error occured in driver profile service');
    }
}