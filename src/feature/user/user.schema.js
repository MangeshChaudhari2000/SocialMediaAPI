import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/.+\@.+\../, "Please entre Valid Email ID"],
        required: [true,"Please provide EmailID"],
        unique: [true, "emailID already exist"]
    },
    password: {
        type: String,
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/],
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
        error: "gender should between male,female & other"
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
    ]
    //frienship objectid
 

})
