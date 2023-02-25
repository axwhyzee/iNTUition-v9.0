import express from "express";

import {
    getAllTasks,
    getTaskDetail,
    createTask,
    setTaskCompleted,
} from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.route('/').get(getAllTasks);
taskRouter.route('/').post(createTask);
taskRouter.route('/:id').patch(setTaskCompleted);
taskRouter.route('/:id').get(getTaskDetail);

export default taskRouter;