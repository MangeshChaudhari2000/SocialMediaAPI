import mongoose, { Error } from "mongoose";

import { likeSchema } from "./like.schema.js";
import ApplicationError from "../../error-handler/applicationError.errorHandler.js";
import { ObjectId } from "mongodb";

const likeModel = new mongoose.model('like', likeSchema);

export default class LikeRepository {

    async likeToggle(likeObj) {
        try {
            const like = new likeModel(likeObj);
            const saved = like.save();
            return saved;

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw Error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }

    async likeGet(likeId) {
        try {
            const like = await likeModel.findById(likeId);
            return like.
            populate('userId')
           
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw Error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }
}