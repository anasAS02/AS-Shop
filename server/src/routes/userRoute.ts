import express from 'express';
const router = express.Router();

import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';
import { changeName, changePassword, getInfo } from '../controllers/userControllers';

router.route('/getInfo')
        .post(verifyToken, allowedTo(userRoles.USER), getInfo);

router.route('/changeName')
        .post(verifyToken, allowedTo(userRoles.USER), changeName);

router.route('/changePassword')
        .post(verifyToken, allowedTo(userRoles.USER), changePassword);

export { router as userRoute };