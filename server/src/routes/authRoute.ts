import express from 'express';
const router = express.Router();

import { sendEmail, login, register } from '../controllers/authControllers';

router.route('/register')
        .post(register);

router.route('/login')
        .post(login);

router.route('/sendEmail')
        .post(sendEmail);

export { router as authRoute };
