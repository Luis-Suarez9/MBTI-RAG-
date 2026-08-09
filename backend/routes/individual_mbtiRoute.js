// backend/routes/individual_mbtiRoute.js
const express = require('express');
const router = express.Router();
const individualMbtiController = require('../controllers/individual_mbtiController');
const { verifyToken, optionalVerifyToken } = require('../middleware/verifyToken');
const { verifyCsrfOrigin } = require('../utils/authCookies');

// Create
router.post('/', individualMbtiController.createIndividual_mbti);
// Read all
router.get('/', individualMbtiController.getAllIndividual_mbtis);
// Read by user id (placed before /:id to prevent route collisions)
router.get('/user/:userId', verifyToken, individualMbtiController.getIndividual_mbtiByUserId);
// Read by record id
router.get('/:id', verifyToken, individualMbtiController.getIndividual_mbtiById);
// Update
router.put('/:id', individualMbtiController.updateIndividual_mbti);
// Delete
router.delete('/:id', verifyToken, verifyCsrfOrigin, individualMbtiController.deleteIndividual_mbti);
// Submit (accept weird JSON)
router.post('/calculate', optionalVerifyToken, individualMbtiController.calculateIndividualMbti);

module.exports = router;
