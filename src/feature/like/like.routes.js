import express from 'express';
import LikeController from './like.controller.js';
import { upload } from '../../middleware/fileUpload.middleware.js'


const likeRouter = express.Router();

const likeController = new LikeController();



likeRouter.get('/toggle/:typeId',(req,res)=>{
    likeController.toggleLike(req,res);
})

likeRouter.get('/:likeId',(req,res)=>{
    likeController.getLike(req,res);
})

export default likeRouter;
