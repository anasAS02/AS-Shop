import express from 'express';
const router = express.Router();

import { register } from '../controllers/authControllers';

router.route('/register')
        .post(register);

export { router as authRoute };
