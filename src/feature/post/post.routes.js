import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middleware/fileUpload.middleware.js'


const postRouter = express.Router();

const postController = new PostController();

postRouter.post('/', upload.single('imageUrl'), (req, res) => {
    postController.createPost(req, res);
})

postRouter.get('/', (req, res) => {
    postController.getPost(req, res);
})

postRouter.get('/all', (req, res) => {
    postController.getAllPost(req, res);
})

postRouter.get('/:postId', (req, res) => {
    postController.getOnePost(req, res);
})

postRouter.delete('/:postId', (req, res) => {
    postController.deleteOnePOst(req, res);
})

postRouter.put('/:postId', upload.single('imageUrl'), (req, res) => {
    postController.updatePost(req, res);
})

export default postRouter;