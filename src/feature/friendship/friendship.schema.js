import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'friend'
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'reject'],
        required: "Please provide status",
        message: "status can either be accept or reject"
    }

})

friendSchema.index({ userId: 1, friendId: 1 }, { unique: true });
