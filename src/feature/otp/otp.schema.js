import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({

    otp: {
        type: String,
        max: 6,
    },
    emailId: {
        type: String,
        unique:true,
        match: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });







