const express = require('express');
const router = express.Router();
const userRecord = require('./controller');
const { verifyToken } = require('../config/verify_token');

// Create new training record
router.post('/create', verifyToken, userRecord.create);

router.get('/me', verifyToken, userRecord.find);

router.put('/payment/:orderId', userRecord.update);

module.exports = router;
