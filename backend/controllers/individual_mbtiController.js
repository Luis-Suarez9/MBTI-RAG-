// backend/controllers/individual_mbtiController.js
require('dotenv').config();
const individual_mbtiModel = require('../models/individual_mbtiModel');

// ─── CRUD ────────────────────────────────────────────────────────────────────

/**
 * Create a new Individual MBTI record.
 */
const createIndividual_mbti = async (req, res) => {
  const data = req.body; // fields matching Prisma model
  const newRecord = await individual_mbtiModel.createIndividual_mbti(data);
  res.status(201).json({ message: 'Individual MBTI created', individual_mbti: newRecord });
};

/**
 * Retrieve all Individual MBTI records.
 */
const getAllIndividual_mbtis = async (req, res) => {
  const records = await individual_mbtiModel.getAllIndividual_mbtis();
  res.status(200).json(records);
};

/**
 * Retrieve a single Individual MBTI by ID.
 */
const getIndividual_mbtiById = async (req, res) => {
  const { id } = req.params;
  const record = await individual_mbtiModel.getIndividual_mbtiById(id);
  if (!record) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }
  res.status(200).json(record);
};

/**
 * Retrieve Individual MBTI records by User ID.
 */
const getIndividual_mbtiByUserId = async (req, res) => {
  const { userId } = req.params;
  const records = await individual_mbtiModel.getIndividual_mbtiByUserId(userId);
  if (!records || records.length === 0) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }
  res.status(200).json(records);
};

/**
 * Update an existing Individual MBTI record.
 */
const updateIndividual_mbti = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const existingRecord = await individual_mbtiModel.getIndividual_mbtiById(id);
  if (!existingRecord) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }

  const updated = await individual_mbtiModel.updateIndividual_mbti(id, data);
  res.status(200).json({ message: 'Individual MBTI updated', individual_mbti: updated });
};

/**
 * Delete an Individual MBTI record.
 */
const deleteIndividual_mbti = async (req, res) => {
  const { id } = req.params;

  const existingRecord = await individual_mbtiModel.getIndividual_mbtiById(id);
  if (!existingRecord) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }

  await individual_mbtiModel.deleteIndividual_mbti(id);
  res.status(200).json({ message: 'Individual MBTI deleted' });
};

/**
 * Calculate endpoint (GET) returning placeholder data.
 */
const calculateIndividualMbti = async (req, res) => {
  const payload = (req.body && Object.keys(req.body).length) ? req.body : req.query;
  res.status(200).json({ score: 69, MBTI: "ENFP" });
};

module.exports = {
  createIndividual_mbti,
  getAllIndividual_mbtis,
  getIndividual_mbtiById,
  getIndividual_mbtiByUserId,
  updateIndividual_mbti,
  deleteIndividual_mbti,
  calculateIndividualMbti,
};