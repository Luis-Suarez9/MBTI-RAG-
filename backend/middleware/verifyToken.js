// backend/middleware/verifyToken.js
const jwt = require('jsonwebtoken');
const { getCookie, SESSION_COOKIE_NAME } = require('../utils/authCookies');

/**
 * Express middleware that protects routes — the Express equivalent of
 * Django's @is_authenticated decorator.
 *
 * Expects the request to carry the HttpOnly session cookie set at login.
 *
 * On success  → attaches decoded payload to req.user and calls next()
 * On failure  → responds with 401 Unauthorized immediately
 */
const verifyToken = (req, res, next) => {
  const token = getCookie(req, SESSION_COOKIE_NAME);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, email, provider, iat, exp }
    next();             // ✅ token valid → continue to the actual controller
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: token has expired' });
    }
    return res.status(401).json({ error: 'Unauthorized: invalid token' });
  }
};

module.exports = verifyToken;
