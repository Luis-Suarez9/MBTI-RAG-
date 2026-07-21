// backend/controllers/userController.js
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ─── GOOGLE AUTH ────────────────────────────────────────────────────────────
// POST /api/users/google
// Body: { idToken: "<Google ID token from frontend>" }
const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'idToken is required' });
    }

    // Verify the token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: providerId, email, name, given_name } = payload;

    if (!providerId || !email) {
      return res.status(400).json({ error: 'Invalid Google token payload' });
    }

    // Use first name (given_name) or first part of full name, fallback to email prefix
    let baseUsername = given_name || (name ? name.split(' ')[0] : email.split('@')[0]);
    
    // Ensure uniqueness check if username is already taken in the DB
    let finalUsername = baseUsername;
    const existingUsername = await userModel.getUserById(finalUsername); // simplistic check or search
    if (existingUsername) {
      // Append a small random suffix to ensure DB constraint passes
      finalUsername = `${baseUsername}_${Math.random().toString(36).substring(2, 6)}`;
    }

    // Upsert: create if new, skip update if existing
    const user = await userModel.upsertGoogleUser({
      providerId,
      email,
      username: finalUsername,
    });

    // Issue your own JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, provider: user.provider },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Google auth successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error.message);
    res.status(401).json({ error: 'Google authentication failed', details: error.message });
  }
};

// ─── CRUD ────────────────────────────────────────────────────────────────────

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { email, username, password, provider, providerId } = req.body;

    if (!email || !username) {
      return res.status(400).json({ error: 'Email and username are required' });
    }

    const newUser = await userModel.createUser({
      email,
      username,
      password,
      provider: provider || 'LOCAL',
      providerId: providerId || null,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const updatedUser = await userModel.updateUser(id, { username, email });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  googleAuth,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};