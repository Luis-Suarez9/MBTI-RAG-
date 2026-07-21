// backend/middleware/verifyToken.js
const jwt = require('jsonwebtoken');

/**
 * Express middleware that protects routes — the Express equivalent of
 * Django's @is_authenticated decorator.
 *
 * Expects the request to carry:
 *   Authorization: Bearer <your_jwt>
 *
 * On success  → attaches decoded payload to req.user and calls next()
 * On failure  → responds with 401 Unauthorized immediately
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Header must exist and start with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' });
  }

  const token = authHeader.split(' ')[1]; // grab the part after "Bearer "

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
