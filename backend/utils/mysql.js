const prisma = require('./prisma');

async function testConnection(retries = 20, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ MySQL connection successful');
      return true;
    } catch (error) {
      const message = error?.message || String(error);
      console.error(`❌ MySQL connection attempt ${attempt}/${retries} failed: ${message}`);

      if (attempt === retries) {
        throw new Error(`MySQL connection failed after ${retries} attempts: ${message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return false;
}

module.exports = {
  prisma,
  testConnection,
};
