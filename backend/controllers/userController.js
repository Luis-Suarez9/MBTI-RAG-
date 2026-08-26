// backend/controllers/userController.js
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { clearAuthCookies, setAuthCookies } = require('../utils/authCookies');

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

    setAuthCookies(res, token);
    res.status(200).json({
      message: 'Google auth successful',
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

const logout = (req, res) => {
  clearAuthCookies(res);
  res.status(204).end();
};

module.exports = {
  googleAuth,
  logout,
};
