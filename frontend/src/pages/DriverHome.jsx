import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import DriverDetails from '../components/DriverDetails'
import RidePopUp from '../components/RidePopUp'
// import CaptainDetails from '../components/CaptainDetails'
// import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { DriverDataContext } from '../context/driverContext'
import axios from 'axios'
//import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const DriverHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)

    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const [ driver, setDriver ] = useContext(DriverDataContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token && (!driver || !driver._id)) {
                    const response = await axios.get('http://localhost:3000/api/v1/driver/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data.success) {
                        setDriver(response.data.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching driver profile:', error);
                localStorage.removeItem('token');
                navigate('/driver-login');
            }
        };
        fetchDriver();
    }, [driver, setDriver, navigate]);

    useEffect(() => {
        if (driver?._id && socket) {
            console.log('Driver logging into socket:', driver._id);
            socket.emit('driver-login', {
                driverId: driver._id,
                name: driver.name
            })
        }
    }, [driver, socket])

    useEffect(() => {
        if (!socket) return;

        socket.on('new-ride-notification', (data) => {
            console.log('New ride notification received:', data)
            setRide(data)
            setRidePopupPanel(true)
        })

        socket.on('remove-ride-notification', (data) => {
            console.log('Remove ride notification received:', data)
            if (ride?._id === data.rideId) {
                setRidePopupPanel(false)
            }
        })

        return () => {
            socket.off('new-ride-notification')
            socket.off('remove-ride-notification')
        }
    }, [socket, ride])


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
             <div className='h-2/5 p-6'>
                <DriverDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp 
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}  
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
                />
            </div>
            {/*
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}  />
            </div> */}
        </div>
    )
}

export default DriverHome