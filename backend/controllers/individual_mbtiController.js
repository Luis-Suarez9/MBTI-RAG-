// backend/controllers/individual_mbtiController.js
require('dotenv').config();
const individual_mbtiModel = require('../models/individual_mbtiModel');

// ─── CRUD ────────────────────────────────────────────────────────────────────

/**
 * Create a new Individual MBTI record.
 */
const createIndividual_mbti = async (req, res) => {
  try {
    const data = req.body; // fields matching Prisma model
    const newRecord = await individual_mbtiModel.createIndividual_mbti(data);
    res.status(201).json({ message: 'Individual MBTI created', individual_mbti: newRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve all Individual MBTI records.
 */
const getAllIndividual_mbtis = async (req, res) => {
  try {
    const records = await individual_mbtiModel.getAllIndividual_mbtis();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve a single Individual MBTI by ID.
 */
const getIndividual_mbtiById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await individual_mbtiModel.getIndividual_mbtiById(id);
    if (!record) {
      return res.status(404).json({ error: 'Individual MBTI not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an existing Individual MBTI record.
 */
const updateIndividual_mbti = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await individual_mbtiModel.updateIndividual_mbti(id, data);
    res.status(200).json({ message: 'Individual MBTI updated', individual_mbti: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete an Individual MBTI record.
 */
const deleteIndividual_mbti = async (req, res) => {
  try {
    const { id } = req.params;
    await individual_mbtiModel.deleteIndividual_mbti(id);
    res.status(200).json({ message: 'Individual MBTI deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIndividual_mbti,
  getAllIndividual_mbtis,
  getIndividual_mbtiById,
  updateIndividual_mbti,
  deleteIndividual_mbti,
};