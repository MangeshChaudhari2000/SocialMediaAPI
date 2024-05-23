import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import LikeRepository from "./like.repository.js";

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async getLike(req,res) {
        try {
            const likeId = req.params.likeId;

            const like = await this.likeRepository.likeGet(likeId);
            if (like) {
                return res.status(200).send(like);
            } else {
                return res.status(400).send("Like toggled successfully");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    async toggleLike(req, res) {
        try {
            const userId = req.userId;
            const typeId = req.params.typeId;
            const likeable = req.query.type.toLowerCase();

            const obj={userId,typeId,likeable}
            const toggle = await this.likeRepository.likeToggle(obj);
            if (toggle) {
                return res.status(200).send(toggle);
            } else {
                return res.status(400).send("Like toggled successfully");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }


    }

}