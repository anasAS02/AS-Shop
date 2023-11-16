import express from 'express';
const router = express.Router();

import { getUsers, addUser, removeRole } from "../controllers/managementControllers";
import allowedTo from "../middlewares/allowedTo";
import verifyToken from "../middlewares/verifyToken";
import { userRoles } from '../utils/userRoles';


router.route('/getUsers')
        .get(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), getUsers);

router.route('/addUser')
        .post(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), addUser);

router.route('/removeRole')
        .post(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), removeRole);

export { router as managementRoute };