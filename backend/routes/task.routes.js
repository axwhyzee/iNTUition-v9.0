import express from "express";

import {
    getAllTasks,
    getTaskDetail,
    createTask,
    setTaskCompleted,
} from '../controllers/task.controller.js';

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/').post(createTask);
router.route('/:id').patch(setTaskCompleted);
router.route('/:id').get(getTaskDetail);

export default router;