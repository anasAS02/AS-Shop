import express from 'express';
const router = express.Router();

import { getUsers, addUser, changeRole, removeRole } from "../controllers/managementControllers";
import allowedTo from "../middlewares/allowedTo";
import verifyToken from "../middlewares/verifyToken";
import { userRoles } from '../utils/userRoles';


router.route('/getUsers')
        .get(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), getUsers);

router.route('/addUser')
        .post(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), addUser);

router.route('/changeRole')
        .put(verifyToken, allowedTo(userRoles.MANAGER), changeRole);

router.route('/removeRole')
        .put(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), removeRole);

export { router as managementRoute };