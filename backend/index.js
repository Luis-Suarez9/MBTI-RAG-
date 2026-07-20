const express = require('express');
const { prisma, testConnection } = require('./utils/mysql');

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// 1. Verify the MySQL connection immediately on startup
testConnection();

// 2. Sample Route: Fetch all records from a table (e.g., users)
// Replace 'user' with whatever model name you define in your schema.prisma
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to retrieve data from MySQL", 
      details: error.message 
    });
  }
});

// 3. Simple Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: "OK", message: "Express server is running perfectly." });
});

// Match the port exposed in your docker-compose.yml
const PORT = process.env.PORT || 5175;

app.listen(PORT, () => {
  console.log(`🚀 Express server is spinning up inside Docker on port ${PORT}`);
});