import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import OtpRepository from "./otp.repository.js";
import { generateOtp } from "../../service/otpGenerator.js";
import { sendMail } from "../../service/sendEmail.js";
import UserRepository from "../user/user.repository.js";

export default class OtpController {
    constructor() {
        this.otpRepository = new OtpRepository();
        this.userRepository = new UserRepository();

    }


    async sendOtp(req, res) {

        try {

            const emailId = req.body.email;
            const checkIfExist= await this.otpRepository.checkEmail(emailId);
            if (!checkIfExist) {
                const otp = generateOtp.generatedOtp();
                const obj = { emailId, otp }
                const isOtpSent = await this.otpRepository.sendOtp(obj);
    
                if (isOtpSent) {
                    const isMailsent = sendMail(isOtpSent._doc.otp, emailId);
                    if (isMailsent) {
                        return res.status(200).send({
                            'OTP details': isOtpSent,
                            'Mail details': isMailsent
                        });
    
                    } else {
                        return res.status(400).send("Mail Not sent");
    
                    }
                } else {
                    return res.status(400).send("Otp Not generated");
                }
            } else {
                const time=checkIfExist._doc.createdAt;
                const nowTime=Date.now();
                // const difference=nowTime.getTime()-time.getTime();
                const difference=nowTime-time;

                console.log("now: "+nowTime+" create: "+time
                );
              const val=60-(difference/1000)
                return res.status(400).send(`Otp already sent will expre after ${val} sec`);

            }
          
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }


    async verifyOtp(req, res) {

        try {
            const { otp, email } = req.body;

            const obj = { email, otp }
            const isOtpSent = await this.otpRepository.otpVerification(obj);

            if (isOtpSent) {
                return res.status(200).send({ "OTP Verified successfully": isOtpSent });

            } else {
                return res.status(400).send("OTP Not Verify");

            }

        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    async resetPassword(req, res) {

        try {
            const { otp, email } = req.body;
            const userId = req.userId;

            const obj = { email, otp }
            const isOtpSent = await this.otpRepository.otpVerification(obj);

            if (isOtpSent) {
                const reset = await this.userRepository.updateUser(userId, req.body);
                if (reset) {
                    return res.status(200).send({ "Password reset successfully": reset });
                } else {
                    return res.status(400).send("Not Reset");
                }
            } else {
                return res.status(400).send("Not reset password");

            }

        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

}