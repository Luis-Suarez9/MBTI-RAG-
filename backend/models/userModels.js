// backend/models/userModels.js
const prisma = require('../utils/prisma');

const userModel = {
  // Create User
  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  // Read All Users
  getAllUsers: async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        provider: true,
        createdAt: true,
      },
    });
  },

  // Read User by ID
  getUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  // Update User
  updateUser: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  // Delete User
  deleteUser: async (id) => {
    return await prisma.user.delete({
      where: { id },
    });
  },

  // Upsert Google OAuth user (create if not exists, skip update if already there)
  upsertGoogleUser: async ({ providerId, email, username }) => {
    return await prisma.user.upsert({
      where: { providerId },
      update: {},
      create: {
        email,
        username,
        provider: 'GOOGLE',
        providerId,
        password: null,
      },
    });
  },
};

module.exports = userModel;