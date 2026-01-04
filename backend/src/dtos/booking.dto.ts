
export type BookingDataDTO = {
    userId:string,
    source:string,
    destination:string,
    vehicleType:string
    selectedFare:number| undefined,
    distance:number,
    time:number,
    otp:string
}


export type BookingServiceDataDTO ={
    userId:string,
    source:string,
    destination:string,
    vehicleType:string
}