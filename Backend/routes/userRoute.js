import express from 'express'
import { getUsers, addUser, claimPoints, getLeaderboard, getHistory, getHistoryByUser, clearHistory, DeleteOneHistory, DeleteOneUserAllHistory, deleteUser } from '../controllers/userController.js';
const userRouter = express.Router();


userRouter.get('/', getUsers);
userRouter.post('/', addUser);
userRouter.delete('/:userId', deleteUser);
userRouter.post('/claim/:userId', claimPoints);
userRouter.get('/leaderboard', getLeaderboard);
userRouter.get('/history', getHistory);
userRouter.get('/history/:userId', getHistoryByUser);
userRouter.delete('/history/:userId', DeleteOneUserAllHistory);
userRouter.delete('/history/:historyId', DeleteOneHistory);
userRouter.delete('/clearAllhistory', clearHistory);

export default userRouter