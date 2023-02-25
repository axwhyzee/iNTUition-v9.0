import express from "express";

import {
    getAllProjects,
    getProjectDetail,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller.js';

const router = express.Router();

router.route('/').get(getAllProjects);
router.route('/').post(createProject);
router.route('/:id').patch(updateProject);
router.route('/:id').get(getProjectDetail);
router.route('/:id').delete(deleteProject);

export default router;