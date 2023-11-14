import express from 'express';
const router = express.Router();

import { getUsers, addUser, removeUser } from "../controllers/managementControllers";
import allowedTo from "../middlewares/allowedTo";
import verifyToken from "../middlewares/verifyToken";
import { userRoles } from '../utils/userRoles';


router.route('/getUsers')
        .get(verifyToken, allowedTo(userRoles.USER || userRoles.MANAGER), getUsers);

router.route('/addUser')
        .post(verifyToken, allowedTo(userRoles.USER || userRoles.MANAGER), addUser);

router.route('/removeUser')
        .post(verifyToken, allowedTo(userRoles.USER || userRoles.MANAGER), removeUser);

export { router as managementRoute };