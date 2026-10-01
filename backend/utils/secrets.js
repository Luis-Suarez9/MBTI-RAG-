const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const SECRET_DIR = '/run/secrets';

function loadSecretEnvFile(secretName) {
  const secretPath = path.join(SECRET_DIR, secretName);

  if (!fs.existsSync(secretPath)) {
    return;
  }

  const values = dotenv.parse(fs.readFileSync(secretPath, 'utf8'));
  for (const [name, value] of Object.entries(values)) {
    // A Docker secret is the source of truth when it is available.
    process.env[name] = value;
  }
}

function loadSecrets() {
  // The shared env file contains deployment-wide values. The backend env file
  // contains backend-specific values and intentionally wins on overlap.
  loadSecretEnvFile('app_env');
  loadSecretEnvFile('backend_env');
}

module.exports = { loadSecrets };
