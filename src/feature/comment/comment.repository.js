import mongoose from "mongoose";

import { commentSchema } from "./comment.schema.js";
import ApplicationError from "../../error-handler/applicationError.errorHandler.js";
import { ObjectId } from "mongodb";

const commentModel = new mongoose.model('comment', commentSchema);

export default class CommentRepository {

    async commentAdd(commentData) {
        try {
            const isAdded = new commentModel(commentData);
            const isSaved = await isAdded.save();

            return isSaved

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }

    }

    async commentGet(commentData) {
        try {
            const isFound = await commentModel.find({ _id: new ObjectId(commentData.commentId), userId: new ObjectId(commentData.userId) });
            return isFound

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }

    }

    async commentUpdate(commentData) {
        try {
            const isFound = await commentModel.findOne({ _id: new ObjectId(commentData.commentId), userId: new ObjectId(commentData.userId) });
            if (isFound) {
                isFound.comment = commentData.comment;
                return await isFound.save();
            }

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }

    }

    async commentDelete(commentData) {
        try {
            var isFound = await commentModel.findOneAndDelete({ _id: new ObjectId(commentData.commentId), userId: new ObjectId(commentData.userId) });
            if (isFound) {
                return isFound;
            }

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }

    }
}
