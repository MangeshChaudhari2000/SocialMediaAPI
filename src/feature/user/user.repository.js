import mongoose from "mongoose";
import bcrypt from 'bcrypt';


import { UserSchema } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.errorHandler.js";

const userModel = new mongoose.model('user', UserSchema);

export default class UserRepository {

    async signUp(userData) {
        try {
            const addUser = new userModel(userData);
            const isAdded = await addUser.save();
            return isAdded
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                console.log(error);
                throw new ApplicationError(error.message, 500)
            }
        }
    }

    async findByEmail(email) {
        try {
            const findEmail = await userModel.findOne({ email });
            return findEmail;

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                console.log(error);
                throw new ApplicationError(error.message, 500)
            }
        }
    }

    async findUserId(userId) {
        try {
            return userModel.findById(userId);

        } catch (error) {
            throw new ApplicationError(error.message, 500)

        }
    }

    async findUser() {
        try {
            return userModel.find({});

        } catch (error) {
            throw new ApplicationError(error.message, 500)
        }
    }

    async updateUser(userId, userData) {
        try {
            const userDetails = await userModel.findById(userId);
            if (userData.name) {
                userDetails.name = userData.name
            }
            if (userData.password) {
                const hashedPassword=await bcrypt.hash(userData.password,12);
                userDetails.password=hashedPassword;
            }
            if (userData.gender) {
                userDetails.gender=userData.gender;
            }
            const saveDetails=await userDetails.save();
            return saveDetails;
        } catch (error) {
            throw new ApplicationError(error.message, 500)
        }
    }
}