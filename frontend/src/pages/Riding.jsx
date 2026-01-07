import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
//import React from 'react';
import car from '../../public/car.jpg' 
import auto from '../../public/auto.jpg' 
import bike from '../../public/bike.jpg' 

const Riding = () => {
const { state } = useLocation();
  const ride = state?.ride;
console.log('riding page',ride.driverDetails.vehicle.vehicleType);
const id = ride.rideId
   const [rideDestination,setRideDestination] = useState('');
   const [fareDetails,setFareDetails] = useState(null);




     let vehicle=null;
           if(ride.driverDetails.vehicle.vehicleType == 'car'){
               vehicle=car
           }
           else if(ride.driverDetails.vehicle.vehicleType == 'auto'){
               vehicle=auto
           }
           else{
               vehicle=bike
           }
useEffect(()=>{
    
    async function fetchRideData() {
        const response = await axios.get(`http://localhost:3000/api/v1/driver/details/${id}`)
        console.log(response.data)
        setRideDestination(response.data.data.destination)
        setFareDetails(response.data.data.fare)
    }
    fetchRideData()
    
    
},[id])

 const truncatedDestination = rideDestination > 30 ? rideDestination.slice(0, 20) + "..." :rideDestination;



    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src={vehicle} alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>{ride.driverDetails.name}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride.driverDetails.vehicle.plate}</h4>
                        <h4 className='text-sm font-semibold text-gray-600'>Capacity {ride.driverDetails.vehicle.capacity}</h4>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                
                                <p className='text-sm font-bold -mt-1 text-gray-600'>{truncatedDestination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{fareDetails} </h3>
                                <p className='text-sm -mt-1 text-gray-600'> Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-3 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding


// riding page 
// {rideId: '695e5ddf42514d8ced628a0c', message: 'Your ride has been confirmed', driverDetails: {…}}
// driverDetails
// : 
// email
// : 
// "driver2@gmail.com"
// name
// : 
// "Trishit Bhowmik"
// password
// : 
// "$2b$10$oBCREpcrz68IIZGPu4WOdOgs.pxuJz4Gq0VWGalkzB2Tq4WTsmNM2"
// status
// : 
// "inactive"
// vehicle
// : 
// {color: 'black', plate: 'WB 23B 2345', capacity: 4, vehicleType: 'car'}
// __v
// : 
// 0
// _id
// : 
// "69591d61645e3d7fa461f180"
// [[Prototype]]
// : 
// Object
// message
// : 
// "Your ride has been confirmed"
// rideId
// : 
// "695e5ddf42514d8ced628a0c"
// [[Prototype]]
// : 
// Object