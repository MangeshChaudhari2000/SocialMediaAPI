import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import PostRepository from "./post.repository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }

    async createPost(req, res) {
        try {
            const { caption } = req.body;
            const imageUrl = req.file.filename;
            const user = req.userId;
            const obj = { imageUrl, caption, user }

            const isPostCreated = await this.postRepository.addPost(obj);
            if (isPostCreated) {
                res.status(200).send(isPostCreated);
            } else {
                res.status(400).send("error with Creating Post");
            }

        } catch (error) {
            res.status(500).send(error.message);

        }
    }

    async getOnePost(req, res) {
        try {
            const { postId } = req.params;

            const isPostFound = await this.postRepository.getOnePost(postId);
            if (isPostFound) {
                res.status(200).send(isPostFound);
            } else {
                res.status(400).send("error with finding Post by ID");
            }

        } catch (error) {
            res.status(500).send(error.message);

        }
    }

    async getPost(req, res) {
        try {
            const userId = req.userId;
            const isPostFound = await this.postRepository.getPost(userId);

            if (isPostFound) {
                res.status(200).send(isPostFound);
            } else {
                res.status(400).send("error with finding posts of the user");
            }

        } catch (error) {
            res.status(500).send(error.message);

        }
    }

    async getAllPost(req, res) {
        try {
            const isPostFound = await this.postRepository.getAllPost();
            if (isPostFound) {
                res.status(200).send(isPostFound);
            } else {
                res.status(400).send("error with finding all Posts");
            }

        } catch (error) {
            res.status(500).send(error.message);

        }
    }

    async deleteOnePOst(req, res) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const isPostDeleted = await this.postRepository.deletePost(userId, postId);

            if (isPostDeleted) {
                res.status(200).send("Post has been deleted");
            } else {
                res.status(400).send("error with deleting posts of the user");
            }

        } catch (error) {
            res.status(500).send(error.message);

        }
    }



    async updatePost(req, res) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const { caption } = req.body;
            const imageUrl = req.file.filename;
            const tempObj={caption,imageUrl};
            const isPostUpdated = await this.postRepository.updatePost(userId, postId,tempObj);

            if (isPostUpdated) {
                res.status(200).send("Post updated successfully: " + isPostUpdated);
            } else {
                res.status(400).send("error with updating posts of the user");
            }

        } catch (error) {
            res.status(500).send(error.message);

        }
    }
}