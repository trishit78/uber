import React, {  useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRidePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios'

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
     const [panelOpen, setPanelOpen] = useState(false)
     const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
     const panelRef = useRef(null)
     const panelCloseRef = useRef(null)
     const [vehiclePanel, setVehiclePanel] = useState(false)
     const [confirmRidePanel, setConfirmRidePanel] = useState(false)
const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, _setWaitingForDriver] = useState(false)

     const [ pickupSuggestions, setPickupSuggestions ] = useState([])

    const [activeField,setActiveField] = useState(null)
const [ destinationSuggestions, setDestinationSuggestions ] = useState([])

const [ fare, setFare ] = useState({})

    const debounceRef = useRef(null);

const handlePickupChange = (e) => {
  const value = e.target.value;
  setPickup(value);

  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  debounceRef.current = setTimeout(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/map/suggestions",
        { params: { input: value } }
      );
      console.log(response.data)
      setPickupSuggestions(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, 500); 
};


    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
       if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  debounceRef.current = setTimeout(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/map/suggestions",
        { params: { input: e.target.value } }
      );
      console.log(response.data)
      setDestinationSuggestions(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, 500); 
    }

   async function findTrip(){
        setVehiclePanel(true);
        setPanelOpen(false);

          const response = await axios.get(`http://localhost:3000/api/v1/map/get-fare`, {
            params: { pickup, destination },
            
        })

        console.log(response.data)
        setFare(response.data.data)



    }


    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])


    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])




    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 
                     ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} 

                    className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={
                                handlePickupChange
                            }
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange }
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                                        <button
                         onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div 
                 ref={panelRef} 
                className='bg-white h-0'>
                    <LocationSearchPanel 
                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                    setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}
                    activeField={activeField}
                    setPickup={setPickup}
                    setDestination={setDestination}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel fare={fare} setConfirmRidePanel={setConfirmRidePanel}  SetVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                               <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver  waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home