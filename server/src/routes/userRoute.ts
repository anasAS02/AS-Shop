import express from 'express';
const router = express.Router();

import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';
import { changeName, changePassword, changeCountry, changeAddress, changePhoneNumber, getInfo } from '../controllers/userControllers';

router.route('/getInfo')
        .post(verifyToken, allowedTo(userRoles.USER || userRoles.ADMIN || userRoles.MANAGER), getInfo);

router.route('/changeName')
        .put(verifyToken, allowedTo(userRoles.USER || userRoles.ADMIN || userRoles.MANAGER), changeName);

router.route('/changePassword')
        .put(verifyToken, allowedTo(userRoles.USER || userRoles.ADMIN || userRoles.MANAGER), changePassword);

router.route('/changeCountry')
        .put(verifyToken, allowedTo(userRoles.USER || userRoles.ADMIN || userRoles.MANAGER), changeCountry);

router.route('/changeAddress')
        .put(verifyToken, allowedTo(userRoles.USER || userRoles.ADMIN || userRoles.MANAGER), changeAddress);

router.route('/changePhoneNumber')
        .put(verifyToken, allowedTo(userRoles.USER || userRoles.ADMIN || userRoles.MANAGER), changePhoneNumber);

export { router as userRoute };