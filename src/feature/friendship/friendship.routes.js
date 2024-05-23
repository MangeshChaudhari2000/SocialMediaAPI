import express from 'express';
import FriendController from './friendship.controller.js';


const friendshipRouter = express.Router();
const friendController = new FriendController();

friendshipRouter.get('/toggle-friendship/:friendId', (req, res) => {
    friendController.toggleFriend(req, res)
})

friendshipRouter.get('/response-to-request/:requestId', (req, res) => {
    friendController.response(req, res)
})

friendshipRouter.get('/get-pending-requests', (req, res) => {
    friendController.pendingRequest(req, res)
})

friendshipRouter.get('/get-friends/:userId', (req, res) => {
    friendController.getFriends(req, res)
})


export default friendshipRouter;