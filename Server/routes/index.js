import express from 'express';
const router = express.Router();
import authMiddleware from '../checkAuth';
import userCtrl from '../api/controller/user.controller';
import productCtrl from '../api/controller/product.controller';
import orderCtrl from '../api/controller/order.controller';

// user 
router.route('/api/v1/login').post(userCtrl.login);
router.route('/api/v1/register-user').post(userCtrl.registerUser);
router.route('/api/v1/user-details').get(authMiddleware.checkAuth,userCtrl.getUserInfo);
router.route('/api/v1/reset-password').post(authMiddleware.checkAuth,userCtrl.resetPassword);

// product
router.route('/api/v1/product').get(authMiddleware.checkAuth,productCtrl.getProductList);
router.route('/api/v1/productById').get(authMiddleware.checkAuth,productCtrl.getProductById);
router.route('/api/v1/paypal').post(authMiddleware.checkAuth,productCtrl.paypal);

// order
router.route('/api/v1/order-insert').post(authMiddleware.checkAuth,orderCtrl.insertOrder);
router.route('/api/v1/orders-list').post(authMiddleware.checkAuth,orderCtrl.getOrderByUserId);
router.route('/api/v1/order-details').post(authMiddleware.checkAuth,orderCtrl.getOrderByOrderId);

module.exports = router;
