import express from 'express';
const router = express.Router();

import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';
import { changeName, changePassword, changeCountry, changeAddress, changePhoneNumber, getInfo } from '../controllers/userControllers';

router.route('/getInfo')
        .post(verifyToken, allowedTo(userRoles.USER), getInfo);

router.route('/changeName')
        .post(verifyToken, allowedTo(userRoles.USER), changeName);

router.route('/changePassword')
        .post(verifyToken, allowedTo(userRoles.USER), changePassword);

router.route('/changeCountry')
        .post(verifyToken, allowedTo(userRoles.USER), changeCountry);

router.route('/changeAddress')
        .post(verifyToken, allowedTo(userRoles.USER), changeAddress);

router.route('/changePhoneNumber')
        .post(verifyToken, allowedTo(userRoles.USER), changePhoneNumber);

export { router as userRoute };