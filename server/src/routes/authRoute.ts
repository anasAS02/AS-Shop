import express from 'express';
const router = express.Router();

import { verifyEmail, register, login, getInfo, changePassword, checkToken } from '../controllers/authControllers';
import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';

router.route('/register')
        .post(register);

router.route('/login')
        .post(login);

router.route('/getInfo')
        .post(verifyToken, allowedTo(userRoles.USER), getInfo);

router.route('/changePassword')
        .post(verifyToken, allowedTo(userRoles.USER), changePassword);

router.route('/checkToken')
        .post(checkToken);

router.route('/confirm/:token')
        .get(verifyEmail);

export { router as authRoute };
