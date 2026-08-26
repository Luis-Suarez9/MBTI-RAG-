// backend/routes/individual_mbtiRoute.js
const express = require('express');
const router = express.Router();
const individualMbtiController = require('../controllers/individual_mbtiController');
const { verifyToken, optionalVerifyToken } = require('../middleware/verifyToken');
const { verifyCsrfOrigin } = require('../utils/authCookies');

// Submit quiz answers & compute MBTI result (guest or authenticated)
router.post('/calculate', optionalVerifyToken, individualMbtiController.calculateIndividualMbti);

// Read user test history (strictly authenticated for that user)
router.get('/user/:userId', verifyToken, individualMbtiController.getIndividual_mbtiByUserId);

// Read test detail by record ID
router.get('/:id', optionalVerifyToken, individualMbtiController.getIndividual_mbtiById);

// Delete test record (owner auth user or system guest cleanup)
router.delete('/:id', optionalVerifyToken, verifyCsrfOrigin, individualMbtiController.deleteIndividual_mbti);

module.exports = router;
