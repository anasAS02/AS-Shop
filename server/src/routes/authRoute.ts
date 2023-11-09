import express from 'express';
const router = express.Router();

import { addAdmin, login, register } from '../controllers/authControllers';

router.route('/register')
        .post(register);

router.route('/login')
        .post(login);

router.route('/addAdmin')
        .post(addAdmin);

export { router as authRoute };
