import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import ApplicationError from "../../error-handler/applicationError.errorHandler.js";
import { ObjectId } from "mongodb";

const otpModel = new mongoose.model('otp', otpSchema);

export default class OtpRepository {

    async sendOtp(tempObj) {
        try {
            const add = new otpModel(tempObj);
            const save = await add.save();
            return save;

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw Error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }
    async checkEmail(emailId) {
        try {
            const email = await otpModel.findOne({ emailId: emailId})
            return email;

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw Error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }


    async otpVerification(tempObj) {
        try {
            const otp = await otpModel.findOne({ emailId: tempObj.email, otp: tempObj.otp })
            return otp;

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw Error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }
}