const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

// Define user routes
router.get('/users/getUsers', userController.getUsers);
router.post('/users/login', userController.loginUser);
router.post('/users/forgot-password', userController.sendOtp);
router.post('/users/change-password', userController.changePassword);


module.exports = router;