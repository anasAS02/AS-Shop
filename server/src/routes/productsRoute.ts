import express from 'express';
const router = express.Router();

import {getAllProducts, getCategory, addProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productsControllers';
import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';

router.route('/')
        .get(getAllProducts);

router.route('/category/:category')
        .get(getCategory);

router.route('/add')
        .post(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), addProduct);

router.route('/project/:productId')
        .get(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), getProduct);

router.route('/update/:productId')
        .put(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), updateProduct);

router.route('/delete/:productId')
        .delete(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), deleteProduct);

export { router as productsRoute };
