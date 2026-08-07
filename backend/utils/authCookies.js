const SESSION_COOKIE_NAME = process.env.NODE_ENV === 'production'
  ? '__Host-mbti_session'
  : 'mbti_session';

const isSecureCookie = process.env.NODE_ENV === 'production' || process.env.COOKIE_SAME_SITE === 'none';
const sameSite = process.env.COOKIE_SAME_SITE || 'lax';

const cookieOptions = {
  httpOnly: true,
  secure: isSecureCookie,
  sameSite,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((cookies, item) => {
    const separator = item.indexOf('=');
    if (separator === -1) return cookies;

    const name = item.slice(0, separator).trim();
    const value = item.slice(separator + 1).trim();
    if (name) cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function getCookie(req, name) {
  return parseCookies(req.headers.cookie)[name];
}

function setAuthCookies(res, token) {
  res.cookie(SESSION_COOKIE_NAME, token, cookieOptions);
}

function clearAuthCookies(res) {
  const clearOptions = {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite,
    path: '/',
  };
  res.clearCookie(SESSION_COOKIE_NAME, clearOptions);
}

function verifyCsrfOrigin(req, res, next) {
  const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
  if (req.get('Origin') !== frontendOrigin) {
    return res.status(403).json({ error: 'Invalid request origin' });
  }

  next();
}

module.exports = {
  SESSION_COOKIE_NAME,
  clearAuthCookies,
  getCookie,
  setAuthCookies,
  verifyCsrfOrigin,
};
