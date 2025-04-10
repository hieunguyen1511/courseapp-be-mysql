const express = require('express');
const statisticsController = require('../controllers/statisticsController');
const router = express.Router();
const { checkAuth } = require('../middleware/check-auth');

router.get('/', checkAuth, statisticsController.getAdminStats);

router.get(
  '/getTimeRangeStats',
  checkAuth,
  statisticsController.getTimeRangeStats,
);

module.exports = router;
