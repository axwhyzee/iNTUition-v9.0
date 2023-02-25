import express from "express";

import {
    getAllUsers,
    createUser,
    getUserInfoByID
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);
userRouter.route('/').post(createUser);
userRouter.route('/:id').get(getUserInfoByID);

export default userRouter;