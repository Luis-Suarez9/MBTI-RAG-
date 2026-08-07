// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const { verifyCsrfOrigin } = require('../utils/authCookies');

// Google OAuth — public (this is how you get a token)
router.post('/google', userController.googleAuth);
router.post('/logout', verifyToken, verifyCsrfOrigin, userController.logout);

// User CRUD — public (no token required)
router.post('/',      userController.createUser);
router.get('/',       userController.getUsers);
router.get('/:id',    userController.getUserById);
router.put('/:id',    userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
