// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');
const { verifyCsrfOrigin } = require('../utils/authCookies');

// Google OAuth — public
router.post('/google', userController.googleAuth);

// Logout — authenticated
router.post('/logout', verifyToken, verifyCsrfOrigin, userController.logout);

module.exports = router;
