const { PrismaClient } = require('@prisma/client');

// Initialize the Prisma Client
const prisma = new PrismaClient();

/**
 * Verifies that the Express container can successfully 
 * communicate with the MySQL container over the Docker network.
 */
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to the MySQL database container!");
  } catch (error) {
    console.error("❌ Database connection failed! Check your Docker network or credentials.");
    console.error(error);
    process.exit(1); // Stop the container if it can't talk to the database
  }
}

module.exports = {
  prisma,
  testConnection
};