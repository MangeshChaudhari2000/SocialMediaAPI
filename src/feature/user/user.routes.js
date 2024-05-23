import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

const userRouter = express.Router();

const userController = new UserController();


userRouter.post('/signup', (req, res) => {
    userController.signUp(req, res);
})

userRouter.post('/signin', (req, res) => {
    userController.signIn(req, res);
})

userRouter.get('/get-all-details', (req, res) => {
    userController.getAllDetails(req, res);
})

userRouter.get('/get-details/:userId', (req, res) => {
    userController.getDetails(req, res);
})

userRouter.put('/update-details/:userId', (req, res) => {
    userController.updateUserDetails(req, res);
})

userRouter.get('/logout',jwtAuth, (req, res) => {
    userController.logout(req, res);
})
export default userRouter;