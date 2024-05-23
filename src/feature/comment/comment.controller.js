import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CommentRepository from "./comment.repository.js";

export default class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async addComment(req, res, next) {

        try {
            const postId = req.params.postId;
            const userId = req.userId;
            const comment = req.body.content;

            const obj = { comment, postId, userId }
            const isCommentAdded = await this.commentRepository.commentAdd(obj);
            if (isCommentAdded) {
                return res.status(200).send(isCommentAdded);
            } else {
                return res.status(400).send("comment not added");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }

    }

    async getComment(req, res, next) {

        try {
            const commentId = req.params.commentId;
            const userId = req.userId;

            const obj = { commentId, userId }
            const isCommentFound = await this.commentRepository.commentGet(obj);
            if (isCommentFound) {
                return res.status(200).send(isCommentFound);
            } else {
                return res.status(400).send("comment not found");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }

    }

    async updateComment(req, res, next) {

        try {
            const commentId = req.params.commentId;
            const userId = req.userId;
            const comment = req.body.content;

            const obj = { commentId, userId,comment }
            const isCommentUpdated = await this.commentRepository.commentUpdate(obj);
            if (isCommentUpdated) {
                return res.status(200).send(isCommentUpdated);
            } else {
                return res.status(400).send("comment not updated");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }

    }

    async deleteComment(req, res, next) {

        try {
            const commentId = req.params.commentId;
            const userId = req.userId;

            const obj = { commentId, userId }
            const isCommentDeleted = await this.commentRepository.commentDelete(obj);
            if (isCommentDeleted) {
                return res.status(200).send("Deleted comment is"+isCommentDeleted);
            } else {
                return res.status(400).send("comment not deleted");
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }

    }

}