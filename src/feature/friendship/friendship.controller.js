import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import FriendRepository from "./friendship.repository.js";

export default class FriendController {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async toggleFriend(req, res) {
        try {
            const userId = req.userId;
            const friendId = req.params.friendId;
            const status = 'pending';

            const obj = { userId, friendId, status }
            const toggle = await this.friendRepository.toggleFriend(obj);
            if (toggle) {
                return res.status(200).send(toggle);
            } else {
                return res.status(400).send("Like toggled successfully");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    async response(req, res) {
        try {
            const userId = req.userId;
            const requestId = req.params.requestId;
            const status = req.query.status;

            const toggle = await this.friendRepository.response(requestId,userId,status);
            if (toggle) {
                return res.status(200).send(toggle);
            } else {
                return res.status(400).send("Response not added");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    
    async pendingRequest(req, res) {
        try {
            const request = await this.friendRepository.getPendingRequest();
            if (request) {
                return res.status(200).send(request);
            } else {
                return res.status(400).send("No Pending request found");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    
    async getFriends(req, res) {
        try {
            const userId = req.params.userId;

            const friends = await this.friendRepository.getFriends(userId);
            if (friends) {
                return res.status(200).send(friends);
            } else {
                return res.status(400).send("No Pending request found");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
}