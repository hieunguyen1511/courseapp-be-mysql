const express = require('express');

const paymentController = require('../controllers/paymentController');
const { checkAuth } = require('../middleware/check-auth');

const router = express.Router();

router.post(
  '/create-payment-intent',
  checkAuth,
  paymentController.createPayment,
);

router.post('/process-payment', paymentController.processPayment);

module.exports = router;
