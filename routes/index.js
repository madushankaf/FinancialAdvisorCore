const express = require('express');
const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');
const router = express.Router();

// Use the user and product routes
router.use('/api', userRoutes);
router.use('/api', dashboardRoutes);

module.exports = router;