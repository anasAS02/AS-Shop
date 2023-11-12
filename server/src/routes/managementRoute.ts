import express from 'express';
const router = express.Router();

import { getUsers, addAdmin, removeAdmin, addManager, removeManager } from "../controllers/managementControllers";
import allowedTo from "../middlewares/allowedTo";
import verifyToken from "../middlewares/verifyToken";
import { userRoles } from '../utils/userRoles';


router.route('/getUsers')
        .get(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), getUsers);

router.route('/addAdmin')
        .post(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), addAdmin);

router.route('/removeAdmin')
        .post(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), removeAdmin);

router.route('/addManager')
        .post(verifyToken, allowedTo(userRoles.MANAGER), addManager);

router.route('/removeManager')
        .post(verifyToken, allowedTo(userRoles.MANAGER), removeManager);

export { router as managementRoute };