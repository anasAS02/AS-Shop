import express from 'express';
const router = express.Router();

import { verifyEmail, register, login, checkToken } from '../controllers/authControllers';

router.route('/register')
        .post(register);

router.route('/login')
        .post(login);

router.route('/checkToken')
        .post(checkToken);

router.route('/confirm/:token')
        .get(verifyEmail);

export { router as authRoute };
