import React from 'react'

import car from '../../public/car.jpg' 
import auto from '../../public/auto.jpg' 
import bike from '../../public/bike.jpg' 

const LookingForDriver = (props) => {

      const truncatedPickup = props.pickup.length > 30 ? props.pickup.slice(0, 40) + "..." : props.pickup;
    const truncatedDestination = props.destination.length > 30 ? props.destination.slice(0, 40) + "..." : props.destination;

     let vehicle=null;
        if(props.vehicleType == 'car'){
            vehicle=car
        }
        else if(props.vehicleType == 'auto'){
            vehicle=auto
        }
        else{
            vehicle=bike
        }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src={vehicle} alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                           
                             <p className='text-sm font-bold'>{truncatedPickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            
                            <p className='text-sm font-bold'>{truncatedDestination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver