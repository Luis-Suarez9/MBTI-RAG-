// backend/routes/individual_mbtiRoute.js
const express = require('express');
const router = express.Router();
const individualMbtiController = require('../controllers/individual_mbtiController');

// Create
router.post('/', individualMbtiController.createIndividual_mbti);
// Read all
router.get('/', individualMbtiController.getAllIndividual_mbtis);
// Read by user id (placed before /:id to prevent route collisions)
router.get('/user/:userId', individualMbtiController.getIndividual_mbtiByUserId);
// Read by record id
router.get('/:id', individualMbtiController.getIndividual_mbtiById);
// Update
router.put('/:id', individualMbtiController.updateIndividual_mbti);
// Delete
router.delete('/:id', individualMbtiController.deleteIndividual_mbti);
// Submit (accept weird JSON)
router.post('/calculate', individualMbtiController.calculateIndividualMbti);

module.exports = router;
