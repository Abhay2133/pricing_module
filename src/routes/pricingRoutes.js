const express = require('express');
const { checkEmail } = require('../controllers/pricingController');

const router = express.Router();

router.post('/check-email', checkEmail);

module.exports = router;
