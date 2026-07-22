require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Recommended for handling frontend requests
const { testConnection } = require('./utils/mysql');

// 1. Import Routes
const userRoutes = require('./routes/userRoute');
const individualMbtiRoutes = require('./routes/individual_mbtiRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 3. Mount User API Routes
app.use('/api/users', userRoutes);

// 4. Simple Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: "OK", message: "Express server is running perfectly." });
});

// Match the port exposed in docker-compose.yml
const PORT = process.env.PORT || 5175;

async function startServer() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Express server is spinning up inside Docker on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();