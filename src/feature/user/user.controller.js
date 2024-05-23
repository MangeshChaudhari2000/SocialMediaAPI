import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserRepository from "./user.repository.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        try {

            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            req.body.password = hashedPassword;

            const isSignup = await this.userRepository.signUp(req.body);
            if (isSignup) {
                res.status(200).send(isSignup);
            } else {
                res.status(400).send("error with signUp");
            }
        } catch (error) {
            res.status(500).send("error with signUp" + error.message);
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const isSignIn = await this.userRepository.findByEmail(email);
            if (isSignIn) {
                const isPasswordMatch = await bcrypt.compare(password, isSignIn.password)
                if (isPasswordMatch) {
                    var token = jwt.sign(
                        {
                            userId: isSignIn._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )
                    return res.status(200).send(token);
                } else {
                    return res.status(400).send("Password did not Matched, check again!");
                }
            } else {
                return res.status(400).send("EmailID not found, check again!");

            }

        } catch (error) {
            res.status(500).send("error with signIn" + error.message);
        }
    }

    async getDetails(req, res) {
        try {
            const userId = req.params.userId;
            const findUserId = await this.userRepository.findUserId(userId);

            if (findUserId) {
                return res.status(200).send(findUserId);
            } else {
                return res.status(400).send("UserId does not exist");
            }
        } catch (error) {
            console.log(error);
        }

    }

    async getAllDetails(req, res) {
        try {
            const findUserId = await this.userRepository.findUser();

            if (findUserId) {
                return res.status(200).send(findUserId);
            } else {
                return res.status(400).send("UserId does not exist");
            }
        } catch (error) {
            console.log(error);
        }

    }
    async updateUserDetails(req, res) {
        try {
            const userId=req.params.userId;
            const update = await this.userRepository.updateUser(userId,req.body);
            if (update) {
                return res.status(200).send(update);
            } else {
                return res.status(400).send("UserId does not exist");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res) {
        try {
            var isDelete = res.cookie;
            isDelete = null;
            // const userToken = req.headers['authorization'];
            // const token =  jwt.destroy(userToken);
            if (!isDelete) {
                return res.status(200).send("you have log out successfully");

            }
        } catch (error) {
            console.log(error);
        }

    }


}