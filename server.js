import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import jwtAuth from './src/middleware/jwt.middleware.js';
import userRouter from './src/feature/user/user.routes.js';
import postRouter from './src/feature/post/post.routes.js';
import { connectToMongoose } from './src/config/mongoose.config.js';
import ApplicationError from './src/error-handler/applicationError.errorHandler.js';
import commentRouter from './src/feature/comment/comment.routes.js';
import likeRouter from './src/feature/like/like.routes.js';
import friendshipRouter from './src/feature/friendship/friendship.routes.js';
import otpRouter from './src/feature/otp/otp.routes.js';

dotenv.config();

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.json())



server.use('/api/users',userRouter)
server.use('/api/posts',jwtAuth,postRouter)
server.use('/api/comments',jwtAuth,commentRouter)
server.use('/api/likes',jwtAuth,likeRouter)
server.use('/api/friends',jwtAuth,friendshipRouter)
server.use('/api/otp',jwtAuth,otpRouter)

server.get('/', function (req, res) {
    res.send('Hello World')
})

server.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(err.message);
    }
    if (err instanceof ApplicationError) {
       return res.status(err.code, err.message);
    }
   return res.status(500).send(err)
})

server.listen(8000,()=>{
    console.log("server running on 8000 port");
   connectToMongoose();
})