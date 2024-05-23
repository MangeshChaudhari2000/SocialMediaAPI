import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'likeable',
        unique: true,
        required: true
    },
    likeable: {
        type: String,
        enum: ['post', 'comment'],
        error: "likeable can only be POSt or COMMENT"
    }

})