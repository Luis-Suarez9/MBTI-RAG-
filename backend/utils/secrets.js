const fs = require('fs');
const path = require('path');

const SECRET_DIR = '/run/secrets';

function loadSecret(secretName, environmentName) {
  const secretPath = path.join(SECRET_DIR, secretName);

  if (!fs.existsSync(secretPath)) {
    return;
  }

  // A Docker secret is the source of truth when it is available.
  process.env[environmentName] = fs.readFileSync(secretPath, 'utf8').trimEnd();
}

function loadSecrets() {
  loadSecret('database_url', 'DATABASE_URL');
  loadSecret('jwt_secret', 'JWT_SECRET');
  loadSecret('db_host', 'DB_HOST');
  loadSecret('db_port', 'DB_PORT');
  loadSecret('db_user', 'DB_USER');
  loadSecret('db_password', 'DB_PASSWORD');
  loadSecret('db_name', 'DB_NAME');
}

module.exports = { loadSecrets };
