const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers');
// Define product routes
router.get('/dashboard/leadTypeOverview', dashboardController.getLeadCountByType);
router.get('/dashboard/leadStatusOverview', dashboardController.getLeadStatusCount);
router.post('/dashboard/leadStatusWithPagination', dashboardController.getLeadsByStatusWithPagination);

module.exports = router;