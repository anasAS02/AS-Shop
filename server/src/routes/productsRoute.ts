import express from 'express';
const router = express.Router();

// import {getAllProjects, addProject, getProject, updateProject, deleteProject} from '../controllers/projectControllers';
import {getAllProducts} from '../controllers/productsControllers';

router.route('/')
        .get(getAllProducts);

// router.route('/add')
//         .post(addProject);

// router.route('/project/:projectId')
//         .get(getProject);

// router.route('/update/:projectId')
//         .put(updateProject);

// router.route('/delete/:projectId')
//         .delete(deleteProject);

export { router as productsRoute };
