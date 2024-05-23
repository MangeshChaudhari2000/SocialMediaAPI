import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required:true
    },
    caption: {
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }

})
