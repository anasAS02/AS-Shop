import express from 'express';
const router = express.Router();

import verifyToken from '../middlewares/verifyToken';
import { changeName, changePassword, changeCountry, changeAddress, changePhoneNumber, getInfo } from '../controllers/userControllers';

router.route('/getInfo')
        .post(verifyToken, getInfo);

router.route('/changeName')
        .put(verifyToken, changeName);

router.route('/changePassword')
        .put(verifyToken, changePassword);

router.route('/changeCountry')
        .put(verifyToken, changeCountry);

router.route('/changeAddress')
        .put(verifyToken, changeAddress);

router.route('/changePhoneNumber')
        .put(verifyToken, changePhoneNumber);

export { router as userRoute };