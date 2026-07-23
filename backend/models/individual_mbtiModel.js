// backend/models/individual_mbtiModel.js
const prisma = require('../utils/prisma');

const individual_mbtiModel = {
  // Create Individual_mbti
  createIndividual_mbti: async (data) => {
    return await prisma.individualMBTI.create({ data });
  },

  // Read All Individual_mbtis
  getAllIndividual_mbtis: async () => {
    return await prisma.individualMBTI.findMany();
  },

  // Read Individual_mbti by ID
  getIndividual_mbtiById: async (id) => {
    return await prisma.individualMBTI.findUnique({
      where: { id: Number(id) },
    });
  },

  // Read Individual_mbti by User ID
  getIndividual_mbtiByUserId: async (userId) => {
    return await prisma.individualMBTI.findMany({
      where: { userId },
    });
  },

  // Update Individual_mbti
  updateIndividual_mbti: async (id, data) => {
    return await prisma.individualMBTI.update({
      where: { id: Number(id) },
      data,
    });
  },

  // Delete Individual_mbti
  deleteIndividual_mbti: async (id) => {
    return await prisma.individualMBTI.delete({
      where: { id: Number(id) },
    });
  },
};

module.exports = individual_mbtiModel;