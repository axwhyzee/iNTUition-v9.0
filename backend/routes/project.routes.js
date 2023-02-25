import express from "express";

import {
    getAllProjects,
    getProjectDetail,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller.js';

const projectRouter = express.Router();

projectRouter.route('/').get(getAllProjects);
projectRouter.route('/').post(createProject);
projectRouter.route('/:id').patch(updateProject);
projectRouter.route('/:id').get(getProjectDetail);
projectRouter.route('/:id').delete(deleteProject);

export default projectRouter;