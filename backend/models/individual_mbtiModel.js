// backend/models/individual_mbtiModels.js
const prisma = require('../utils/prisma');

const individual_mbtiModel = {
  // Create Individual_mbti
  createIndividual_mbti: async (data) => {
    return await prisma.individual_mbti.create({ data });
  },

  // Read All Individual_mbtis
  getAllIndividual_mbtis: async () => {
    return await prisma.individual_mbti.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        provider: true,
        createdAt: true,
      },
    });
  },

  // Read Individual_mbti by ID
  getIndividual_mbtiById: async (id) => {
    return await prisma.individual_mbti.findUnique({
      where: { id },
    });
  },

  // Update Individual_mbti
  updateIndividual_mbti: async (id, data) => {
    return await prisma.individual_mbti.update({
      where: { id },
      data,
    });
  },

  // Delete Individual_mbti
  deleteIndividual_mbti: async (id) => {
    return await prisma.individual_mbti.delete({
      where: { id },
    });
  },
};

module.exports = individual_mbtiModel;