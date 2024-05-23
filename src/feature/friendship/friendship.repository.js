import mongoose from "mongoose";

import { friendSchema } from "./friendship.schema.js";
import ApplicationError from "../../error-handler/applicationError.errorHandler.js";
import { ObjectId } from "mongodb";

const friendModel = new mongoose.model('friends', friendSchema);

export default class FriendRepository {

    async toggleFriend(obj) {
        try {
            const toggle = new friendModel(obj);
            const save = await toggle.save();
            return save;

        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw Error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }

    async response(requestId, userId, status1) {
        try {

            const isFound = await friendModel.findOne(
                {
                    _id: new ObjectId(requestId),
                    userId: new ObjectId(userId)
                }
            );
            if (isFound) {
                isFound.status = status1
                return await isFound.save();
            }
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }


    async getPendingRequest() {
        try {
            const isFound = await friendModel.find(
                {
                    status: 'pending'
                }
            );
            if (isFound) {

                return isFound
            }
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }

    
    async getFriends(userId) {
        try {
            const isFound = await friendModel.find(
                {
                    userId: new ObjectId(userId)
                }
            );
            if (isFound) {

                return {'frinedId':isFound.friendId,'status':isFound.status}
            }
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error;
            } else {
                throw new ApplicationError(error.message, 400)
            }
        }
    }
}