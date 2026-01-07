import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [ 'pending', 'accepted', "ongoing", 'completed', 'cancelled' ],
        default: 'pending',
    },

    duration: {
        type: Number,
    }, 

    distance: {
        type: Number,
    }, 

    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
    },
    vehicleType:{
        type:String,
        required:true
    }
})

export const Booking = mongoose.model('Booking', bookingSchema);