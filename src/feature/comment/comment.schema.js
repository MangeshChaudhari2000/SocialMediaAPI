import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: [true,"comment is required"]
    },
    postId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})
