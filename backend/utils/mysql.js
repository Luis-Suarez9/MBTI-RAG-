const prisma = require('./prisma');

async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ MySQL connection successful');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = {
  prisma,
  testConnection,
};
