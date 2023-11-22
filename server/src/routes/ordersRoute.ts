import express  from "express";
const router = express.Router();
import ordersControllers from '../controllers/ordersControllers';
import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import {userRoles} from '../utils/userRoles';

router.route('/')
    .get(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), ordersControllers.getAllOrders);

router.route('/myOrders')
    .post(verifyToken, ordersControllers.getMyOrders);

router.route('/create')
    .post(verifyToken, ordersControllers.createOrder);

router.route('/confirm/:orderId')
    .get(ordersControllers.confirmOrder);

router.route('/update/:orderId')
    .put(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), ordersControllers.updateOrderStatus);

export { router as ordersRoute };