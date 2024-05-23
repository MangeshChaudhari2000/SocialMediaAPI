import mongoose from "mongoose";

import { postSchema } from "./post.schema.js";
import ApplicationError from "../../error-handler/applicationError.errorHandler.js";
import { ObjectId } from "mongodb";
import { UserSchema } from "../user/user.schema.js";

const postModel = new mongoose.model('post', postSchema);
const userModel=new mongoose.model('user',UserSchema)
export default class PostRepository {
    async addPost(postData) {
        const post = new postModel(postData);
        const isPostSaved = await post.save();
        if (isPostSaved) {
            const userId=postData.user;
            const addPostidToUser=await userModel.findById(userId);
            if (addPostidToUser) {
                addPostidToUser.post=isPostSaved._id
                await addPostidToUser.save();
            }
            return post;
        } else {
            throw new Error("Post Not Created");
        }
    }

    async getOnePost(postId) {
        const post = await postModel.findById(postId)
        if (post) {
            return await post;
        } else {
            throw new Error("PostID Not Found");
        }
    }

    async getPost(userId) {
        const post = await postModel.find({ user: new ObjectId(userId) })
        if (post) {
            return await post;
        } else {
            throw new Error("User has not posted anything");
        }
    }

    async getAllPost(postId) {
        const post = await postModel.find({})
        if (post) {
            return await post;
        } else {
            throw new Error("No Post found");
        }
    }



    async deletePost(userId, postId) {
        try {
            const post = await postModel.deleteOne(
                { _id: new ObjectId(postId) },
                { user: new ObjectId(userId) }
            )
            if (post) {
                return await post;
            } else {
                throw new Error("No Post found");
            }
        } catch (error) {
            throw new Error(error.message)
        }
       
    }

    async updatePost(userId, postId,updateData) {
        try {
            const post = await postModel.findOne(
                { _id: new ObjectId(postId) ,
                 user: new ObjectId(userId) }
            )
            if (post) {

                if (updateData.imageUrl) {
                    post.imageUrl=updateData.imageUrl;
                }

                if (updateData.caption) {
                    post.caption=updateData.caption;
                }

                const savePost=await post.save();
                return await savePost;
            } else {
                throw new Error("No Post found");
            }
        } catch (error) {
            throw new ApplicationError(error.message,400)
        }
      
    }
}